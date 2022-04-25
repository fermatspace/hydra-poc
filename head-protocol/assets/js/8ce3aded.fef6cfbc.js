"use strict";(self.webpackChunkhydra_head_protocol_docs=self.webpackChunkhydra_head_protocol_docs||[]).push([[2876],{3905:function(e,t,a){a.d(t,{Zo:function(){return d},kt:function(){return u}});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(a),u=r,m=c["".concat(l,".").concat(u)]||c[u]||h[u]||i;return a?n.createElement(m,o(o({ref:t},d),{},{components:a})):n.createElement(m,o({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},7796:function(e,t,a){a.r(t),a.d(t,{assets:function(){return d},contentTitle:function(){return l},default:function(){return u},frontMatter:function(){return s},metadata:function(){return p},toc:function(){return h}});var n=a(7462),r=a(3366),i=(a(7294),a(3905)),o=["components"],s={sidebar_label:"Star-shaped Network",sidebar_position:3},l="Star-Shaped Head Network",p={unversionedId:"star-shaped/index",id:"star-shaped/index",title:"Star-Shaped Head Network",description:"This document is a work in progress",source:"@site/topologies/star-shaped/index.md",sourceDirName:"star-shaped",slug:"/star-shaped/",permalink:"/head-protocol/topologies/star-shaped/",editUrl:"https://github.com/input-output-hk/hydra-poc/tree/master/docs/topologies/topologies/star-shaped/index.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_label:"Star-shaped Network",sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"Basic Hydra Head",permalink:"/head-protocol/topologies/basic/"}},d={},h=[{value:"Summary",id:"summary",level:2},{value:"On-Chain Transactions",id:"on-chain-transactions",level:2},{value:"Off-Chain Transactions",id:"off-chain-transactions",level:2}],c={toc:h};function u(e){var t=e.components,s=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},c,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"star-shaped-head-network"},"Star-Shaped Head Network"),(0,i.kt)("p",null,"\ud83d\udee0\ufe0f This document is a work in progress"),(0,i.kt)("p",null,"This document details the behaviour of so-called ",(0,i.kt)("em",{parentName:"p"},"Star-shaped Hydra Network"),"."),(0,i.kt)("h2",{id:"summary"},"Summary"),(0,i.kt)("p",null,"A ",(0,i.kt)("em",{parentName:"p"},"Star-shaped Hydra Network")," or more precisely a Star-shaped Heads Network is comprised of:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A central ",(0,i.kt)("em",{parentName:"li"},"Server"),' node providing "Head-as-a-service", with low expected downtime, probably operated by some company or organisation with enough resources to host this service,'),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("em",{parentName:"li"},"Client")," nodes, either DApp instances, or mobile/personal wallets, which might not be always online and possibly can come and go.")),(0,i.kt)("p",null,(0,i.kt)("img",{loading:"lazy",alt:"Star-shaped Heads Network",src:a(1799).Z,width:"4862",height:"3290"})),(0,i.kt)("p",null,'Client nodes want to be able to interact with each other efficiently, at a low cost, using L2 solution, with all the Hydra safety guarantees, but without bearing the operational burden of operating an always online "full" Hydra node (eg. using an embedded version of the node, or a lighweight version). There might be a lot of them, say in the 100s or even 1000s but they are not always all live and up at the same time.'),(0,i.kt)("p",null,"Client nodes establish pairwise Heads (eg. ",(0,i.kt)("em",{parentName:"p"},"channels"),") with the server: This setup is simpler than with a normal multiparty head because the server has as a well-known identity and the client can always provide the needed parameters (keys, IP) to the server when setting up the Head using some specific service whose definition is outside of the scope of this document."),(0,i.kt)("p",null,'Transactions a client node posts in "its" Head should be ',(0,i.kt)("em",{parentName:"p"},"reflected")," by the server into the other Heads it maintain."),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Questions"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},'Is it expected the pairwise Heads to have varying "durations", eg. a client comes, opens a Head, does some stuff, and closes it but the other Heads maintained by the same server stay ',(0,i.kt)("em",{parentName:"li"},"Open"),"?"),(0,i.kt)("li",{parentName:"ul"},"How does the server provided guarantees preserving the basic ",(0,i.kt)("em",{parentName:"li"},"Safety property")," of Hydra Heads for each of the pairwise heads?",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"What the diagram suggest is to use ",(0,i.kt)("em",{parentName:"li"},"Hash Time-Lock Contracts")," (",(0,i.kt)("a",{parentName:"li",href:"https://docs.lightning.engineering/the-lightning-network/multihop-payments/hash-time-lock-contract-htlc"},"HTLC"),") which ensures the Client can always get its UTxO back if the server does not properly route the transaction to its destination"))),(0,i.kt)("li",{parentName:"ul"},"What kind of transaction should be supported? HTLC are good for payments-style transactions but not for DApps for example, or they would need to be adapted",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},'There seems to be an implicit assumption that the server can "route" a transaction in one Head to the proper Head which implies it "understands" the addresses of UTxO posted in Heads')))),(0,i.kt)("h2",{id:"on-chain-transactions"},"On-Chain Transactions"),(0,i.kt)("p",null,"The following transaction diagram represents the lifecycle of 2 pairwise Heads between ",(0,i.kt)("strong",{parentName:"p"},"A"),"lice, ",(0,i.kt)("strong",{parentName:"p"},"B"),"ob and ",(0,i.kt)("strong",{parentName:"p"},"S"),"erver."),(0,i.kt)("p",null,(0,i.kt)("img",{loading:"lazy",alt:"Star-shaped Network On-Chain",src:a(5277).Z,width:"1897",height:"413"})),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Remarks"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This assumes the transactions happening in one head are reflected in the other head, thus resulting in a (strongly) consistent final UTxO ",(0,i.kt)("inlineCode",{parentName:"li"},"c"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"This means both heads must start with the ",(0,i.kt)("em",{parentName:"li"},"same")," $U_0$ set which I don't know how can be done (highlighted in red in the diagram)"),(0,i.kt)("li",{parentName:"ul"},"If the final UTxO set is consistent, then it can be fanned-out by any party, which means one ",(0,i.kt)("inlineCode",{parentName:"li"},"\u03bd_head")," can stay dangling and become unspendable as it would recreating an already existing UTxO (grayed out transaction in the diagram)"))),(0,i.kt)("li",{parentName:"ul"},"The lifecycle of the heads are tied: When one is closed, the other is closed. The server will ensure that it is the case.")),(0,i.kt)("h2",{id:"off-chain-transactions"},"Off-Chain Transactions"),(0,i.kt)("p",null,"The following picture represents the sequence of messages exchanged between the various ",(0,i.kt)("inlineCode",{parentName:"p"},"Node"),"s in order to ensure propagation of transactions."),(0,i.kt)("p",null,(0,i.kt)("img",{loading:"lazy",alt:"Star-shaped Network Off-Chain Protocol",src:a(3970).Z,width:"520",height:"757"})),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Remarks"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The Server is represented by 2 nodes, ",(0,i.kt)("inlineCode",{parentName:"li"},"M(A)")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"M(B)"),","),(0,i.kt)("li",{parentName:"ul"},"The ",(0,i.kt)("inlineCode",{parentName:"li"},"newTx")," issued by ",(0,i.kt)("inlineCode",{parentName:"li"},"Alice")," through her node will be propagated by Server to ",(0,i.kt)("inlineCode",{parentName:"li"},"Bob"),"'s node as ",(0,i.kt)("inlineCode",{parentName:"li"},"newTx")," too"),(0,i.kt)("li",{parentName:"ul"},"This diagram does not represent any possible additional transactions the Server would need to post in order to provide guarantees to either or both ",(0,i.kt)("inlineCode",{parentName:"li"},"Alice")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"Bob")," (e.g an in-head HTLC transaction)"),(0,i.kt)("li",{parentName:"ul"},"In order to ensure consistency of snapshots, the Server is assumed to always be the leader, ie. the one triggering the emission of a snapshot.")))}u.isMDXComponent=!0},3970:function(e,t,a){t.Z=a.p+"assets/images/off-chain-protocol-e3962146cdd4905688da7c366154f834.png"},1799:function(e,t,a){t.Z=a.p+"assets/images/star-shaped-general-532cfafec07585ab262bbbee9acee8eb.jpg"},5277:function(e,t,a){t.Z=a.p+"assets/images/star-shaped-txs-bef2a52039a88dc3cbd49358322377bd.png"}}]);