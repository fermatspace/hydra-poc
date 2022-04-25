"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2037],{9257:function(e,n,t){t.d(n,{Z:function(){return c}});var a=t(7294),o=t(1736),r="terminalWindow_wGrl",i="terminalWindowHeader_o9Cs",l="terminalWindowBody_tzdS",d="buttons_IGLB",s="dot_fGZE";function c(e){var n=e.children,t=e.minHeight,c="string"==typeof n?a.createElement(o.Z,null,n):n;return a.createElement("div",{className:r,style:{minHeight:t}},a.createElement("div",{className:i},a.createElement("div",{className:d},a.createElement("span",{className:s,style:{background:"#f25f58"}}),a.createElement("span",{className:s,style:{background:"#fbbe3c"}}),a.createElement("span",{className:s,style:{background:"#58cb42"}}))),a.createElement("div",{className:l},c))}},7989:function(e,n,t){t.r(n),t.d(n,{assets:function(){return f},contentTitle:function(){return g},default:function(){return N},frontMatter:function(){return v},metadata:function(){return y},toc:function(){return b}});var a=t(7462),o=t(3366),r=t(7294),i=t(3905),l=t(9257),d=t(2389),s=t(3725),c=t(6010),u="tabItem_LplD";function p(e){var n,t,o,i=e.lazy,l=e.block,d=e.defaultValue,p=e.values,k=e.groupId,m=e.className,h=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),v=null!=p?p:h.map((function(e){var n=e.props;return{value:n.value,label:n.label,attributes:n.attributes}})),g=(0,s.lx)(v,(function(e,n){return e.value===n.value}));if(g.length>0)throw new Error('Docusaurus error: Duplicate values "'+g.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===d?d:null!=(n=null!=d?d:null==(t=h.find((function(e){return e.props.default})))?void 0:t.props.value)?n:null==(o=h[0])?void 0:o.props.value;if(null!==y&&!v.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+v.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var f=(0,s.UB)(),b=f.tabGroupChoices,w=f.setTabGroupChoices,N=(0,r.useState)(y),T=N[0],x=N[1],C=[],E=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=k){var _=b[k];null!=_&&_!==T&&v.some((function(e){return e.value===_}))&&x(_)}var D=function(e){var n=e.currentTarget,t=C.indexOf(n),a=v[t].value;a!==T&&(E(n),x(a),null!=k&&w(k,a))},Z=function(e){var n,t=null;switch(e.key){case"ArrowRight":var a=C.indexOf(e.currentTarget)+1;t=C[a]||C[0];break;case"ArrowLeft":var o=C.indexOf(e.currentTarget)-1;t=C[o]||C[C.length-1]}null==(n=t)||n.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,c.Z)("tabs",{"tabs--block":l},m)},v.map((function(e){var n=e.value,t=e.label,o=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:T===n?0:-1,"aria-selected":T===n,key:n,ref:function(e){return C.push(e)},onKeyDown:Z,onFocus:D,onClick:D},o,{className:(0,c.Z)("tabs__item",u,null==o?void 0:o.className,{"tabs__item--active":T===n})}),null!=t?t:n)}))),i?(0,r.cloneElement)(h.filter((function(e){return e.props.value===T}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},h.map((function(e,n){return(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==T})}))))}function k(e){var n=(0,d.Z)();return r.createElement(p,(0,a.Z)({key:String(n)},e))}function m(e){var n=e.children,t=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:t,className:a},n)}var h=["components"],v={sidebar_position:3},g="Without Docker",y={unversionedId:"getting-started/demo/without-docker",id:"getting-started/demo/without-docker",title:"Without Docker",description:"Running the demo without Docker containers, but with plain executables and scripts.",source:"@site/docs/getting-started/demo/without-docker.md",sourceDirName:"getting-started/demo",slug:"/getting-started/demo/without-docker",permalink:"/head-protocol/docs/getting-started/demo/without-docker",editUrl:"https://github.com/input-output-hk/hydra-poc/tree/master/docs/docs/docs/getting-started/demo/without-docker.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"With Docker",permalink:"/head-protocol/docs/getting-started/demo/with-docker"},next:{title:"Haskell Packages",permalink:"/head-protocol/docs/haskell_packages"}},f={},b=[],w={toc:b};function N(e){var n=e.components,t=(0,o.Z)(e,h);return(0,i.kt)("wrapper",(0,a.Z)({},w,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"without-docker"},"Without Docker"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Running the demo without Docker containers, but with plain executables and scripts.")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Context")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"All commands below are written as if executed from the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo")," folder in the project repository, so make sure to clone the repository and ",(0,i.kt)("inlineCode",{parentName:"p"},"cd demo")," before doing anything."))),(0,i.kt)("h1",{id:"setting-up-the-network"},"Setting-up The Network"),(0,i.kt)("p",null,"One needs to prepare a ",(0,i.kt)("inlineCode",{parentName:"p"},"cardano-node")," (devnet) and a ",(0,i.kt)("inlineCode",{parentName:"p"},"hydra-node"),' "manually". These instructions assume you have both built and in scope for ',(0,i.kt)("inlineCode",{parentName:"p"},"cabal exec"),"."),(0,i.kt)("p",null,"First, let's prepare and start an ad-hoc, single ",(0,i.kt)("inlineCode",{parentName:"p"},"cardano-node")," devnet using our configuration. Note that this will create a ",(0,i.kt)("inlineCode",{parentName:"p"},"devnet")," directory in your current working directory:"),(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"./prepare-devnet.sh\ncd devnet\ncabal exec cardano-node -- run \\\n  --config cardano-node.json \\\n  --topology topology.json \\\n  --database-path db \\\n  --socket-path ipc/node.socket \\\n  --shelley-operational-certificate credentials/opcert1.cert \\\n  --shelley-kes-key credentials/delegate1.kes.skey \\\n  --shelley-vrf-key credentials/delegate1.vrf.skey\n"))),(0,i.kt)("p",null,"Then, in 3 different terminals, start 3 Hydra nodes from the ",(0,i.kt)("inlineCode",{parentName:"p"},"demo/")," directory:"),(0,i.kt)(k,{mdxType:"Tabs"},(0,i.kt)(m,{value:"Alice",mdxType:"TabItem"},(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cabal exec hydra-node -- \\\n  --node-id 1 --port 5001 --api-port 4001 --monitoring-port 6001 \\\n  --peer localhost:5002 \\\n  --peer localhost:5003 \\\n  --hydra-signing-key alice.sk \\\n  --hydra-verification-key bob.vk \\\n  --hydra-verification-key carol.vk \\\n  --cardano-signing-key devnet/credentials/alice.sk \\\n  --cardano-verification-key devnet/credentials/bob.vk \\\n  --cardano-verification-key devnet/credentials/carol.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/ipc/node.socket\n")))),(0,i.kt)(m,{value:"Bob",mdxType:"TabItem"},(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cabal exec hydra-node -- \\\n  --node-id 2 --port 5002 --api-port 4002 --monitoring-port 6002 \\\n  --peer localhost:5001 \\\n  --peer localhost:5003 \\\n  --hydra-signing-key bob.sk \\\n  --hydra-verification-key alice.vk \\\n  --hydra-verification-key carol.vk \\\n  --cardano-signing-key devnet/credentials/bob.sk \\\n  --cardano-verification-key devnet/credentials/alice.vk \\\n  --cardano-verification-key devnet/credentials/carol.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/ipc/node.socket\n")))),(0,i.kt)(m,{value:"Carol",mdxType:"TabItem"},(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cabal exec hydra-node -- \\\n  --node-id 3 --port 5003 --api-port 4003 --monitoring-port 6003 \\\n  --peer localhost:5001 \\\n  --peer localhost:5002 \\\n  --hydra-signing-key carol.sk \\\n  --hydra-verification-key alice.vk \\\n  --hydra-verification-key bob.vk \\\n  --cardano-signing-key devnet/credentials/carol.sk \\\n  --cardano-verification-key devnet/credentials/alice.vk \\\n  --cardano-verification-key devnet/credentials/bob.vk \\\n  --ledger-genesis devnet/genesis-shelley.json \\\n  --ledger-protocol-parameters devnet/protocol-parameters.json \\\n  --network-id 42 \\\n  --node-socket devnet/ipc/node.socket\n"))))),(0,i.kt)("p",null,"If things go well, the nodes should start logging once connected to the chain."),(0,i.kt)("h1",{id:"seeding-the-network"},"Seeding The Network"),(0,i.kt)("p",null,"You can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"seed-devnet.sh")," script by passing it the path to a cardano-cli executable to use, instead of having it using the Docker container. For example:"),(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},"./seed-devnet.sh $(which cardano-cli)"),(0,i.kt)("p",null,"Running The Clients\nConnect to the nodes using hydra-tui. For example, to use Alice's hydra-node and her on-chain credentials:"),(0,i.kt)(l.Z,{mdxType:"TerminalWindow"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"cabal exec hydra-tui -- \\\n  --connect 0.0.0.0:4001 \\\n  --cardano-signing-key devnet/credentials/alice.sk \\\n  --network-id 42 \\\n  --node-socket devnet/ipc/node.socket\n"))),(0,i.kt)("p",null,"Replace port ",(0,i.kt)("inlineCode",{parentName:"p"},"4001")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"4002")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"4003")," to connect to the other 2 nodes and ",(0,i.kt)("inlineCode",{parentName:"p"},"alice.sk")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"bob.sk")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"carol.sk")," respectively."))}N.isMDXComponent=!0}}]);