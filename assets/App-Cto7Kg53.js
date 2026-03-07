import{r as ae,g as ne,j as e,a as k,u as se,b as A,N as S,s as te,L as z,O as re}from"./index-CGoUxD2s.js";import{G as le,M as L,a as ie,b as ce}from"./index-PV3zd3GG.js";import{s as oe}from"./cartSelectors-B4Fj8Mx_.js";import{s as de,a as me}from"./userSelectors-CI1qrXop.js";import{O as fe}from"./bootstrap.esm-D2MXRMDr.js";import{S as H}from"./SearchBar-CoGDv1jU.js";import{B as he,a as ue,b as pe,c as xe}from"./index-Cjs513VC.js";import{S as ve,M as je}from"./MessageToast-Bbp-nn-y.js";function ge(o){return le({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(o)}var C={},X;function be(){if(X)return C;X=1;function o(t){if(typeof window>"u")return;const d=document.createElement("style");return d.setAttribute("type","text/css"),d.innerHTML=t,document.head.appendChild(d),t}Object.defineProperty(C,"__esModule",{value:!0});var a=ae();function v(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var n=v(a);o(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const r=a.forwardRef(function({style:d={},className:I="",autoFill:m=!1,play:f=!0,pauseOnHover:j=!1,pauseOnClick:g=!1,direction:l="left",speed:c=50,delay:b=0,loop:x=0,gradient:M=!1,gradientColor:N="white",gradientWidth:s=200,onFinish:G,onCycleComplete:K,onMount:D,children:R},P){const[O,V]=a.useState(0),[E,Y]=a.useState(0),[q,F]=a.useState(1),[B,Z]=a.useState(!1),J=a.useRef(null),h=P||J,y=a.useRef(null),w=a.useCallback(()=>{if(y.current&&h.current){const i=h.current.getBoundingClientRect(),_=y.current.getBoundingClientRect();let u=i.width,p=_.width;(l==="up"||l==="down")&&(u=i.height,p=_.height),F(m&&u&&p&&p<u?Math.ceil(u/p):1),V(u),Y(p)}},[m,h,l]);a.useEffect(()=>{if(B&&(w(),y.current&&h.current)){const i=new ResizeObserver(()=>w());return i.observe(h.current),i.observe(y.current),()=>{i&&i.disconnect()}}},[w,h,B]),a.useEffect(()=>{w()},[w,R]),a.useEffect(()=>{Z(!0)},[]),a.useEffect(()=>{typeof D=="function"&&D()},[]);const U=a.useMemo(()=>m?E*q/c:E<O?O/c:E/c,[m,O,E,q,c]),Q=a.useMemo(()=>Object.assign(Object.assign({},d),{"--pause-on-hover":!f||j?"paused":"running","--pause-on-click":!f||j&&!g||g?"paused":"running","--width":l==="up"||l==="down"?"100vh":"100%","--transform":l==="up"?"rotate(-90deg)":l==="down"?"rotate(90deg)":"none"}),[d,f,j,g,l]),ee=a.useMemo(()=>({"--gradient-color":N,"--gradient-width":typeof s=="number"?`${s}px`:s}),[N,s]),W=a.useMemo(()=>({"--play":f?"running":"paused","--direction":l==="left"?"normal":"reverse","--duration":`${U}s`,"--delay":`${b}s`,"--iteration-count":x?`${x}`:"infinite","--min-width":m?"auto":"100%"}),[f,l,U,b,x,m]),T=a.useMemo(()=>({"--transform":l==="up"?"rotate(90deg)":l==="down"?"rotate(-90deg)":"none"}),[l]),$=a.useCallback(i=>[...Array(Number.isFinite(i)&&i>=0?i:0)].map((_,u)=>n.default.createElement(a.Fragment,{key:u},a.Children.map(R,p=>n.default.createElement("div",{style:T,className:"rfm-child"},p)))),[T,R]);return B?n.default.createElement("div",{ref:h,style:Q,className:"rfm-marquee-container "+I},M&&n.default.createElement("div",{style:ee,className:"rfm-overlay"}),n.default.createElement("div",{className:"rfm-marquee",style:W,onAnimationIteration:K,onAnimationEnd:G},n.default.createElement("div",{className:"rfm-initial-child-container",ref:y},a.Children.map(R,i=>n.default.createElement("div",{style:T,className:"rfm-child"},i))),$(q-1)),n.default.createElement("div",{className:"rfm-marquee",style:W},$(q))):null});return C.default=r,C}var Ne=be();const ye=ne(Ne);function we(){return e.jsx("div",{className:" bg-dark  py-2 ",children:e.jsx(ye,{pauseOnHover:!1,direction:"left",children:e.jsx("a",{className:"text",href:"#",onClick:o=>{o.preventDefault()},children:e.jsx("h6",{className:"fs-8 text-center text-white",children:"夏季熱血促銷 |滿千免運，現在買板送腳繩 ; 購買兩萬以上的衝浪板，鰭 (FINs) 打8折"})})})})}function ke(){var b,x,M,N;const o=k.useRef(null),a=k.useRef(null),v=se(),n=A(oe),r=A(de),t=A(me),[d,I]=k.useState(!1),[m,f]=k.useState(!1),j=[{path:"/",name:"最新衝浪板",event:()=>{v(te()),c(),setTimeout(()=>{const s=document.getElementById("latest-surfboards");s&&s.scrollIntoView({behavior:"smooth",block:"start"})},100)}},{path:"products",name:"所有商品",event:()=>{c()}},{path:"/wave",name:"即時浪況",event:()=>{c()}},{path:"shower-map",name:"沖澡地圖",event:()=>{c()}}],g=[{path:"cart",name:"購物車",event:()=>{c()}},{path:"members",name:"會員登入",event:()=>{c()}}];k.useEffect(()=>{a.current=new fe(o.current)},[]);const l=()=>{a.current.show()},c=()=>{a.current.hide()};return e.jsxs(e.Fragment,{children:[e.jsx(we,{}),e.jsx("nav",{className:"navbar navbar-expand-lg bg-body-tertiary sticky-top py-lg-4 navbar-cust shadow-sm",children:e.jsxs("div",{className:"container",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{className:"logo-img",src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsxs("ul",{className:" d-flex align-items-center d-md-none ms-auto p-0",children:[e.jsx("li",{children:e.jsx(H,{showInput:d,setShowInput:I,searchBarType:"navbar-search"})}),!d&&e.jsx("li",{children:e.jsx(S,{to:"/cart",children:e.jsx("div",{className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(L,{}),((b=n==null?void 0:n.carts)==null?void 0:b.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(x=n==null?void 0:n.carts)==null?void 0:x.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})}),!d&&e.jsx("li",{children:e.jsx("button",{className:"navbar-toggler p-3",type:"button",onClick:l,"aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation",children:e.jsx(ie,{})})})]}),e.jsxs("div",{ref:o,className:"offcanvas offcanvas-end",tabIndex:"-1","aria-labelledby":"offcanvasNavbarLabel",children:[e.jsxs("div",{className:"offcanvas-header p-2",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{style:{width:"42px",height:"42px"},src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsx("button",{type:"button",className:"btn-close p-4",onClick:c})]}),e.jsxs("div",{className:"offcanvas-body px-7 py-3",children:[e.jsx("ul",{className:"navbar-nav  pe-3 me-auto ",children:j.map(s=>e.jsx("li",{className:"nav-item ",children:e.jsx(S,{disable:s.disable,className:"nav-link py-3 py-lg-5 px-lg-4",to:s.path,onClick:s.event,children:e.jsx("h6",{className:"fw-semibold",children:s.name})})},s.path))}),e.jsx("hr",{}),e.jsx("ul",{className:"navbar-nav d-md-none",children:g.map(s=>e.jsx("li",{className:"nav-item",children:e.jsx(S,{className:"nav-link",to:s.path,onClick:s.event,children:e.jsx("h6",{className:"fw-semibold",children:s.name})})},s.path))}),e.jsxs("ul",{className:" d-none d-lg-flex align-items-center ms-auto gap-7",children:[e.jsx("li",{children:e.jsx(H,{showInput:m,setShowInput:f,searchBarType:"navbar-search"})}),e.jsx("li",{children:r?e.jsxs("div",{className:"d-flex justify-content-center align-items-center",children:[e.jsx("div",{className:"user-icon rounded-circle border border-dark bg-dark fs-5 me-3 p-2 text-white position-relative",children:e.jsx("span",{className:"position-absolute top-50 start-50 translate-middle",children:t!=null&&t.name?t.name.charAt(0).toUpperCase():""})}),e.jsx("div",{className:"fs-6",children:t==null?void 0:t.name})]}):e.jsx(S,{to:"/members",className:"p-3",children:e.jsx(ge,{})})}),e.jsx("li",{children:e.jsx(S,{to:"/cart",className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(L,{}),((M=n==null?void 0:n.carts)==null?void 0:M.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(N=n==null?void 0:n.carts)==null?void 0:N.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})]})]})]})]})})]})}function Se(){const o=[{path:"admin",name:"後台管理入口"}],a=[{path:"/",name:"最新衝浪板"},{path:"/products",name:"衝浪板"}],v=[{path:"/shower-map",name:"沖澡地圖"}],n=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"footerBg py-7",children:e.jsxs("div",{className:"container d-flex flex-column",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-9 mb-md-12",children:[e.jsxs("div",{className:"footerHeader d-flex align-items-center",children:[e.jsx("div",{className:"p-1",children:e.jsx("img",{src:"img/logo/nomad-logo-white.svg",alt:"nomad-logo-sm"})}),e.jsx("div",{children:e.jsx("p",{style:{letterSpacing:"0.15rem",lineHeight:"1.2"},className:"fs-5 ps-2",children:"NOMAD SURFER"})})]}),e.jsx("div",{children:e.jsxs("a",{className:"d-flex flex-column align-items-center px-3 py-4 btn fs-7",onClick:n,children:[e.jsx(ce,{}),e.jsx("p",{className:"d-none d-md-block",children:"回到頂端"})]})})]}),e.jsx("div",{className:"flex-column",children:e.jsxs("div",{className:"d-flex justify-content-md-between flex-column flex-md-row",children:[e.jsxs("div",{className:"d-flex flex-column flex-md-row gap-md-14",children:[e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"關於我們"}),e.jsx("div",{className:"d-flex flex-column gap-md-2",children:o.map(r=>e.jsx("p",{className:"py-2",children:e.jsx(z,{to:r.path,children:r.name})},r.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"商品"}),e.jsx("div",{className:"d-flex flex-column gap-md-2",children:a.map(r=>e.jsx("p",{className:"py-2",children:e.jsx(z,{to:r.path,children:r.name})},r.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"衝浪資訊"}),e.jsx("div",{className:"d-flex flex-column gap-md-2 ",children:v.map(r=>e.jsx("p",{className:"py-2",children:e.jsx(z,{to:r.path,children:r.name})},r.name))})]})]}),e.jsxs("div",{className:"pb-7",children:[e.jsx("div",{className:"pb-3 pb-md-5",children:e.jsx("p",{className:"text-md-end",children:"追蹤我們"})}),e.jsxs("div",{className:"d-flex gap-md-7 gap-7  text-white me-auto",children:[e.jsx(he,{size:24}),e.jsx(ue,{size:24}),e.jsx(pe,{size:24}),e.jsx(xe,{size:24})]})]})]})}),e.jsxs("div",{className:" d-flex flex-column flex-md-row gap-2 fs-9 ",children:[e.jsx("p",{children:"Copyright © 2024 Wings of the Sea. All rights reserved."}),e.jsx("div",{className:"d-flex flex-column flex-md-row",children:e.jsx("p",{children:"網站電商僅作為Demo不具商業目的"})})]})]})})})}function Te(){return e.jsxs(e.Fragment,{children:[e.jsx(ve,{}),e.jsxs("div",{id:"app",children:[e.jsx(ke,{}),e.jsx(je,{}),e.jsx("div",{children:e.jsx(re,{})}),e.jsx(Se,{})]})]})}export{Te as default};
