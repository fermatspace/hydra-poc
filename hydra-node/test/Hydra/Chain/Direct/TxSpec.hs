{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE TypeApplications #-}
{-# OPTIONS_GHC -Wno-incomplete-uni-patterns #-}
{-# OPTIONS_GHC -Wno-orphans #-}

-- | Unit tests for our "hand-rolled" transactions as they are used in the
-- "direct" chain component.
module Hydra.Chain.Direct.TxSpec where

import Hydra.Cardano.Api
import Hydra.Chain.Direct.Tx
import Hydra.Prelude hiding (label)
import Test.Hydra.Prelude

import qualified Cardano.Api.UTxO as UTxO
import qualified Cardano.Ledger.Alonzo.Scripts as Ledger
import qualified Cardano.Ledger.Alonzo.Tools as Ledger
import qualified Cardano.Ledger.Alonzo.TxWitness as Ledger
import Data.List (intersectBy)
import qualified Data.Map as Map
import qualified Data.Text as T
import Hydra.Chain (HeadParameters (..))
import Hydra.Chain.Direct.Contract.Mutation (cardanoCredentialsFor)
import Hydra.Chain.Direct.Fixture (
  costModels,
  epochInfo,
  maxTxExecutionUnits,
  pparams,
  systemStart,
  testNetworkId,
  testPolicyId,
  testSeedInput,
 )
import Hydra.Chain.Direct.Wallet (ErrCoverFee (..), coverFee_)
import qualified Hydra.Contract.Commit as Commit
import qualified Hydra.Contract.Head as Head
import qualified Hydra.Contract.HeadState as Head
import qualified Hydra.Contract.Initial as Initial
import Hydra.Data.ContestationPeriod (contestationPeriodFromDiffTime)
import Hydra.Data.Party (partyFromVerKey)
import Hydra.Ledger.Cardano (
  adaOnly,
  genOneUTxOFor,
  genUTxO,
  hashTxOuts,
  renderTx,
  simplifyUTxO,
 )
import Hydra.Party (Party, vkey)
import Plutus.V1.Ledger.Api (toBuiltin, toData)
import Test.Cardano.Ledger.Alonzo.Serialisation.Generators ()
import Test.QuickCheck (
  Property,
  checkCoverage,
  choose,
  conjoin,
  counterexample,
  cover,
  elements,
  forAll,
  label,
  oneof,
  property,
  resize,
  suchThat,
  vectorOf,
  withMaxSuccess,
 )
import Test.QuickCheck.Instances ()

spec :: Spec
spec =
  parallel $ do
    describe "collectComTx" $ do
      modifyMaxSuccess (const 10) $
        prop "validates" $ \headInput cperiod ->
          forAll (vectorOf 3 arbitrary) $ \parties ->
            forAll (cardanoCredentialsFor <$> elements parties) $ \(signer, _) ->
              forAll (generateCommitUTxOs parties) $ \commitsUTxO ->
                let onChainUTxO = UTxO $ Map.singleton headInput headOutput <> fmap fst commitsUTxO
                    headOutput = mkHeadOutput testNetworkId testPolicyId $ toUTxOContext $ mkTxOutDatum headDatum
                    onChainParties = partyFromVerKey . vkey <$> parties
                    headDatum = Head.Initial cperiod onChainParties
                    tx =
                      collectComTx
                        testNetworkId
                        signer
                        ( headInput
                        , headOutput
                        , fromPlutusData $ toData headDatum
                        , onChainParties
                        )
                        commitsUTxO
                 in case validateTxScriptsUnlimited onChainUTxO tx of
                      Left basicFailure ->
                        property False & counterexample ("Basic failure: " <> show basicFailure)
                      Right redeemerReport ->
                        conjoin
                          [ withinTxExecutionBudget redeemerReport
                          , length commitsUTxO + 1 == length (rights $ Map.elems redeemerReport)
                              & counterexample (prettyRedeemerReport redeemerReport)
                              & counterexample ("Tx: " <> renderTx tx)
                          ]

    describe "fanoutTx" $ do
      prop "validates" $ \headInput ->
        forAll (resize 70 $ simplifyUTxO <$> genUTxO) $ \inHeadUTxO ->
          let tx =
                fanoutTx
                  inHeadUTxO
                  (headInput, headOutput, fromPlutusData $ toData headDatum)
                  (mkHeadTokenScript testSeedInput)
              onChainUTxO = UTxO.singleton (headInput, headOutput)
              headScript = fromPlutusScript Head.validatorScript
              -- FIXME: Ensure the headOutput contains enough value to fanout all inHeadUTxO
              headOutput =
                TxOut
                  (mkScriptAddress @PlutusScriptV1 testNetworkId headScript)
                  ( lovelaceToValue (Lovelace 10_000_000)
                      <> valueFromList
                        [ (AssetId (headPolicyId testSeedInput) hydraHeadV1AssetName, 1)
                        ]
                  )
                  (toUTxOContext $ mkTxOutDatum headDatum)
              headDatum =
                Head.Closed
                  { snapshotNumber = 1
                  , utxoHash = toBuiltin (hashTxOuts $ toList inHeadUTxO)
                  }
           in checkCoverage $ case validateTxScriptsUnlimited onChainUTxO tx of
                Left basicFailure ->
                  property False & counterexample ("Basic failure: " <> show basicFailure)
                Right redeemerReport ->
                  conjoin
                    [ 1 == length (successfulRedeemersSpending redeemerReport)
                        & counterexample "Wrong count of spend redeemer(s)"
                    , 1 == length (successfulRedeemersMinting redeemerReport)
                        & counterexample "Wrong count of mint redeemer(s)"
                    , withinTxExecutionBudget redeemerReport
                    ]
                    & label (show (length inHeadUTxO) <> " UTXO")
                    & label (show (valueSize $ foldMap txOutValue inHeadUTxO) <> " Assets")
                    & counterexample ("Redeemer report: " <> show redeemerReport)
                    & counterexample ("Tx: " <> renderTx tx)
                    & cover 80 True "Success"

    describe "abortTx" $ do
      prop "validates" $
        forAll (vectorOf 4 arbitrary) $ \parties ->
          \txIn contestationPeriod -> forAll (genAbortableOutputs parties) $
            \(resolvedInitials, resolvedCommits) -> forAll (cardanoCredentialsFor <$> elements parties) $
              \(signer, _) ->
                let headUTxO = (txIn :: TxIn, headOutput)
                    headOutput = mkHeadOutput testNetworkId testPolicyId $ toUTxOContext $ mkTxOutDatum headDatum
                    headDatum =
                      Head.Initial
                        (contestationPeriodFromDiffTime contestationPeriod)
                        (map (partyFromVerKey . vkey) parties)
                    initials = Map.fromList (drop2nd <$> resolvedInitials)
                    initialsUTxO = drop3rd <$> resolvedInitials
                    commits = Map.fromList (drop2nd <$> resolvedCommits)
                    commitsUTxO = drop3rd <$> resolvedCommits
                    utxo = UTxO $ Map.fromList (headUTxO : initialsUTxO <> commitsUTxO)
                    headInfo = (txIn, headOutput, fromPlutusData $ toData headDatum)
                    headScript = mkHeadTokenScript testSeedInput
                    abortableCommits = Map.fromList $ map tripleToPair resolvedCommits
                    abortableInitials = Map.fromList $ map tripleToPair resolvedInitials
                 in checkCoverage $ case abortTx signer headInfo headScript abortableInitials abortableCommits of
                      Left OverlappingInputs ->
                        property (isJust $ txIn `Map.lookup` initials)
                      Right tx ->
                        case validateTxScriptsUnlimited utxo tx of
                          Left basicFailure ->
                            property False & counterexample ("Basic failure: " <> show basicFailure)
                          Right redeemerReport ->
                            -- NOTE: There's 1 redeemer report for the head + 1 for the mint script +
                            -- 1 for each of either initials or commits
                            conjoin
                              [ withinTxExecutionBudget redeemerReport
                              , 2 + (length initials + length commits) == length (rights $ Map.elems redeemerReport)
                                  & counterexample ("Redeemer report: " <> show redeemerReport)
                                  & counterexample ("Tx: " <> renderTx tx)
                                  & counterexample ("Input utxo: " <> decodeUtf8 (encodePretty utxo))
                              ]
                              & cover 80 True "Success"

      prop "cover fee correctly handles redeemers" $
        withMaxSuccess 60 $ \txIn cperiod (party :| parties) cardanoKeys walletUTxO ->
          forAll (cardanoCredentialsFor <$> elements (party : parties)) $ \(signer, _) ->
            let params = HeadParameters cperiod (party : parties)
                tx = initTx testNetworkId cardanoKeys params txIn
             in case observeInitTx testNetworkId cardanoKeys party tx of
                  Just (_, InitObservation{initials, threadOutput}) -> do
                    let (headInput, headOutput, headDatum, _) = threadOutput
                        initials' = Map.fromList [(a, (b, c)) | (a, b, c) <- initials]
                        lookupUTxO =
                          ((headInput, headOutput) : [(a, b) | (a, b, _) <- initials])
                            & Map.fromList
                            & Map.mapKeys toLedgerTxIn
                            & Map.map toLedgerTxOut
                     in case abortTx signer (headInput, headOutput, headDatum) (mkHeadTokenScript testSeedInput) initials' mempty of
                          Left err ->
                            property False & counterexample ("AbortTx construction failed: " <> show err)
                          Right (toLedgerTx -> txAbort) ->
                            case coverFee_ pparams systemStart epochInfo lookupUTxO walletUTxO txAbort of
                              Left err ->
                                True
                                  & label
                                    ( case err of
                                        ErrNoAvailableUTxO -> "No available UTxO"
                                        ErrNoPaymentUTxOFound -> "No payment UTxO found"
                                        ErrNotEnoughFunds{} -> "Not enough funds"
                                        ErrUnknownInput{} -> "Unknown input"
                                        ErrScriptExecutionFailed{} -> "Script(s) execution failed"
                                    )
                              Right (_, fromLedgerTx -> txAbortWithFees) ->
                                let actualExecutionCost = totalExecutionCost pparams txAbortWithFees
                                    fee = txFee' txAbortWithFees
                                 in actualExecutionCost > Lovelace 0 && fee > actualExecutionCost
                                      & label "Ok"
                                      & counterexample ("Execution cost: " <> show actualExecutionCost)
                                      & counterexample ("Fee: " <> show fee)
                                      & counterexample ("Tx: " <> show txAbortWithFees)
                                      & counterexample ("Input utxo: " <> show (walletUTxO <> lookupUTxO))
                  _ ->
                    property False
                      & counterexample "Failed to construct and observe init tx."
                      & counterexample (renderTx tx)

withinTxExecutionBudget :: Map Ledger.RdmrPtr (Either (Ledger.ScriptFailure StandardCrypto) Ledger.ExUnits) -> Property
withinTxExecutionBudget redeemers =
  ( mem <= maxMem
      && cpu <= maxCpu
  )
    & counterexample
      ( "Ex. Cost Limits exceeded, mem: "
          <> show mem
          <> "/"
          <> show maxMem
          <> ", cpu: "
          <> show cpu
          <> "/"
          <> show maxCpu
      )
 where
  ExecutionUnits{executionSteps = cpu, executionMemory = mem} = fromLedgerExUnits $ mconcat $ rights $ Map.elems redeemers
  maxMem = executionMemory maxTxExecutionUnits
  maxCpu = executionSteps maxTxExecutionUnits

-- | Generate a UTXO representing /commit/ outputs for a given list of `Party`.
-- FIXME: This function is very complicated and it's hard to understand it after a while
generateCommitUTxOs :: [Party] -> Gen (Map.Map TxIn (TxOut CtxUTxO, ScriptData))
generateCommitUTxOs parties = do
  txins <- vectorOf (length parties) (arbitrary @TxIn)
  let vks = (\p -> (fst (cardanoCredentialsFor p), p)) <$> parties
  committedUTxO <-
    vectorOf (length parties) $
      oneof
        [ do
            singleUTxO <- fmap adaOnly <$> (genOneUTxOFor =<< arbitrary)
            pure $ head <$> nonEmpty (UTxO.pairs singleUTxO)
        , pure Nothing
        ]
  let commitUTxO =
        zip txins $
          uncurry mkCommitUTxO <$> zip vks committedUTxO
  pure $ Map.fromList commitUTxO
 where
  mkCommitUTxO :: (VerificationKey PaymentKey, Party) -> Maybe (TxIn, TxOut CtxUTxO) -> (TxOut CtxUTxO, ScriptData)
  mkCommitUTxO (vk, party) utxo =
    ( toUTxOContext $
        TxOut
          (mkScriptAddress @PlutusScriptV1 testNetworkId commitScript)
          commitValue
          (mkTxOutDatum commitDatum)
    , fromPlutusData (toData commitDatum)
    )
   where
    commitValue =
      mconcat
        [ lovelaceToValue (Lovelace 2000000)
        , maybe mempty (txOutValue . snd) utxo
        , valueFromList
            [ (AssetId testPolicyId (assetNameFromVerificationKey vk), 1)
            ]
        ]
    commitScript = fromPlutusScript Commit.validatorScript
    commitDatum = mkCommitDatum party Head.validatorHash utxo

-- | Evaluate all plutus scripts and return execution budgets of a given
-- transaction (any included budgets are ignored).
--
-- TODO: We may want to define a full cardano-api version of that one somewhere
-- else (that is, which also return cardano-api types and not ledger ones).
validateTxScriptsUnlimited ::
  -- | UTxO set used to create context for any tx inputs.
  UTxO ->
  Tx ->
  Either
    (Ledger.BasicFailure StandardCrypto)
    (Map Ledger.RdmrPtr (Either (Ledger.ScriptFailure StandardCrypto) Ledger.ExUnits))
validateTxScriptsUnlimited (toLedgerUTxO -> utxo) (toLedgerTx -> tx) =
  runIdentity $
    Ledger.evaluateTransactionExecutionUnits
      pparams
      tx
      utxo
      epochInfo
      systemStart
      costModels

prettyRedeemerReport ::
  Map Ledger.RdmrPtr (Either (Ledger.ScriptFailure StandardCrypto) Ledger.ExUnits) ->
  String
prettyRedeemerReport (Map.toList -> xs) =
  "Script Evaluation(s):\n" <> intercalate "\n" (prettyKeyValue <$> xs)
 where
  prettyKeyValue (ptr, result) =
    toString ("  - " <> show ptr <> ": " <> prettyResult result)
  prettyResult =
    either (T.replace "\n" " " . show) show

successfulRedeemersSpending ::
  Map Ledger.RdmrPtr (Either (Ledger.ScriptFailure StandardCrypto) Ledger.ExUnits) ->
  [Ledger.RdmrPtr]
successfulRedeemersSpending =
  Map.foldrWithKey onlySuccessfulSpending []
 where
  onlySuccessfulSpending ptr = \case
    Left{} -> identity
    Right{} ->
      case ptr of
        Ledger.RdmrPtr Ledger.Spend _ -> (ptr :)
        Ledger.RdmrPtr _ _ -> identity

successfulRedeemersMinting ::
  Map Ledger.RdmrPtr (Either (Ledger.ScriptFailure StandardCrypto) Ledger.ExUnits) ->
  [Ledger.RdmrPtr]
successfulRedeemersMinting =
  Map.foldrWithKey onlySuccessfulMinting []
 where
  onlySuccessfulMinting ptr = \case
    Left{} -> identity
    Right{} ->
      case ptr of
        Ledger.RdmrPtr Ledger.Mint _ -> (ptr :)
        Ledger.RdmrPtr _ _ -> identity

genAbortableOutputs :: [Party] -> Gen ([UTxOWithScript], [UTxOWithScript])
genAbortableOutputs parties =
  go `suchThat` notConflict
 where
  go = do
    (initParties, commitParties) <- (`splitAt` parties) <$> choose (0, length parties)
    initials <- mapM genInitial initParties
    commits <- fmap (\(a, (b, c)) -> (a, b, c)) . Map.toList <$> generateCommitUTxOs commitParties
    pure (initials, commits)

  notConflict (is, cs) =
    null $ intersectBy (\(i, _, _) (c, _, _) -> i == c) is cs

  genInitial p = mkInitial (cardanoCredentialsFor p) <$> arbitrary

  mkInitial ::
    (VerificationKey PaymentKey, SigningKey PaymentKey) ->
    TxIn ->
    UTxOWithScript
  mkInitial (vk, _) txin =
    ( txin
    , initialTxOut vk
    , fromPlutusData (toData initialDatum)
    )

  initialTxOut :: VerificationKey PaymentKey -> TxOut CtxUTxO
  initialTxOut vk =
    toUTxOContext $
      TxOut
        (mkScriptAddress @PlutusScriptV1 testNetworkId initialScript)
        ( headValue
            <> valueFromList
              [ (AssetId testPolicyId (assetNameFromVerificationKey vk), 1)
              ]
        )
        (mkTxOutDatum initialDatum)

  initialScript = fromPlutusScript Initial.validatorScript

  initialDatum = Initial.datum ()

drop2nd :: (a, b, c) -> (a, c)
drop2nd (a, _, c) = (a, c)

drop3rd :: (a, b, c) -> (a, b)
drop3rd (a, b, _) = (a, b)

tripleToPair :: (a, b, c) -> (a, (b, c))
tripleToPair (a, b, c) = (a, (b, c))
