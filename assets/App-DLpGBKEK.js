import{r as ne,g as ae,j as e,a as b,u as se,b as W,c as te,N as S,s as re,d as le,L as $,O as ie}from"./index-CPSsFzsY.js";import{G as oe,M as K,a as X,b as ce,c as de}from"./index-C6AMSYZX.js";import{s as me}from"./cartSelectors-CS9rDrmx.js";import{s as ue,a as fe}from"./userSelectors-CwSstDsl.js";import{O as he}from"./bootstrap.esm-D2MXRMDr.js";import{B as pe,a as xe,b as ve,c as ge}from"./index-ChnpTBLv.js";import{S as je,M as be}from"./MessageToast-CvrJt15D.js";import"./reselect-CiXCCDx7.js";function Ne(c){return oe({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(c)}var T={},P;function ye(){if(P)return T;P=1;function c(s){if(typeof window>"u")return;const m=document.createElement("style");return m.setAttribute("type","text/css"),m.innerHTML=s,document.head.appendChild(m),s}Object.defineProperty(T,"__esModule",{value:!0});var n=ne();function f(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var l=f(n);c(`.rfm-marquee-container {
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
}`);const t=n.forwardRef(function({style:m={},className:d="",autoFill:u=!1,play:i=!0,pauseOnHover:N=!1,pauseOnClick:w=!1,direction:r="left",speed:h=50,delay:y=0,loop:k=0,gradient:p=!1,gradientColor:M="white",gradientWidth:x=200,onFinish:q,onCycleComplete:O,onMount:R,children:a},A){const[_,Y]=n.useState(0),[I,Z]=n.useState(0),[D,G]=n.useState(1),[B,J]=n.useState(!1),Q=n.useRef(null),v=A||Q,E=n.useRef(null),C=n.useCallback(()=>{if(E.current&&v.current){const o=v.current.getBoundingClientRect(),F=E.current.getBoundingClientRect();let g=o.width,j=F.width;(r==="up"||r==="down")&&(g=o.height,j=F.height),G(u&&g&&j&&j<g?Math.ceil(g/j):1),Y(g),Z(j)}},[u,v,r]);n.useEffect(()=>{if(B&&(C(),E.current&&v.current)){const o=new ResizeObserver(()=>C());return o.observe(v.current),o.observe(E.current),()=>{o&&o.disconnect()}}},[C,v,B]),n.useEffect(()=>{C()},[C,a]),n.useEffect(()=>{J(!0)},[]),n.useEffect(()=>{typeof R=="function"&&R()},[]);const L=n.useMemo(()=>u?I*D/h:I<_?_/h:I/h,[u,_,I,D,h]),V=n.useMemo(()=>Object.assign(Object.assign({},m),{"--pause-on-hover":!i||N?"paused":"running","--pause-on-click":!i||N&&!w||w?"paused":"running","--width":r==="up"||r==="down"?"100vh":"100%","--transform":r==="up"?"rotate(-90deg)":r==="down"?"rotate(90deg)":"none"}),[m,i,N,w,r]),ee=n.useMemo(()=>({"--gradient-color":M,"--gradient-width":typeof x=="number"?`${x}px`:x}),[M,x]),U=n.useMemo(()=>({"--play":i?"running":"paused","--direction":r==="left"?"normal":"reverse","--duration":`${L}s`,"--delay":`${y}s`,"--iteration-count":k?`${k}`:"infinite","--min-width":u?"auto":"100%"}),[i,r,L,y,k,u]),z=n.useMemo(()=>({"--transform":r==="up"?"rotate(90deg)":r==="down"?"rotate(-90deg)":"none"}),[r]),H=n.useCallback(o=>[...Array(Number.isFinite(o)&&o>=0?o:0)].map((F,g)=>l.default.createElement(n.Fragment,{key:g},n.Children.map(a,j=>l.default.createElement("div",{style:z,className:"rfm-child"},j)))),[z,a]);return B?l.default.createElement("div",{ref:v,style:V,className:"rfm-marquee-container "+d},p&&l.default.createElement("div",{style:ee,className:"rfm-overlay"}),l.default.createElement("div",{className:"rfm-marquee",style:U,onAnimationIteration:O,onAnimationEnd:q},l.default.createElement("div",{className:"rfm-initial-child-container",ref:E},n.Children.map(a,o=>l.default.createElement("div",{style:z,className:"rfm-child"},o))),H(D-1)),l.default.createElement("div",{className:"rfm-marquee",style:U},H(D))):null});return T.default=t,T}var we=ye();const ke=ae(we);function Me(){return e.jsx("div",{className:" bg-dark  py-2 ",children:e.jsx(ke,{pauseOnHover:!1,direction:"left",children:e.jsx("a",{className:"text",href:"#",onClick:c=>{c.preventDefault()},children:e.jsx("h6",{className:"fs-8 text-center text-white",children:"夏季熱血促銷 |滿千免運，現在買板送腳繩 ; 購買兩萬以上的衝浪板，鰭 (FINs) 打8折"})})})})}function Re(){var x,q,O,R;const c=b.useRef(null),n=b.useRef(null),f=b.useRef(null),l=b.useRef(null),t=se(),s=W(me),m=W(ue),d=W(fe),u=te(),[i,N]=b.useState(!1),w=[{path:"/",name:"最新衝浪板",event:()=>{t(re()),p()}},{path:"products",name:"所有商品",event:()=>{p()}}],r=[{path:"cart",name:"購物車",event:()=>{p()}},{path:"members",name:"會員登入",event:()=>{p()}}],h=a=>{t(le(a.target.value))},y=a=>{a.key==="Enter"&&a.target.value&&u("products")};b.useEffect(()=>{n.current=new he(c.current)},[]);const k=()=>{n.current.show()},p=()=>{n.current.hide()},M=()=>{N(!0)};return b.useEffect(()=>{if(i){const a=A=>{f.current&&!f.current.contains(A.target)&&l.current&&!l.current.contains(A.target)&&N(!1)};return document.addEventListener("mousedown",a,!0),()=>{document.removeEventListener("mousedown",a,!0)}}},[i]),e.jsxs(e.Fragment,{children:[e.jsx(Me,{}),e.jsx("nav",{className:"navbar navbar-expand-lg bg-body-tertiary sticky-top py-lg-4 navbar-cust shadow-sm",children:e.jsxs("div",{className:"container",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{className:"logo-img",src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsxs("ul",{className:" d-flex align-items-center d-md-none ms-auto p-0",children:[e.jsx("li",{children:e.jsxs("div",{style:{maxWidth:"270px"},ref:f,className:"input-group rounded-pill",children:[i&&e.jsx("input",{type:"text",className:"form-control border-end-0 rounded-start-pill focus-ring search-input",placeholder:"輸入關鍵字","aria-label":"Input group example","aria-describedby":"btnGroupAddon",onChange:h,onKeyDown:y}),e.jsx("button",{onClick:y,onMouseEnter:M,className:`input-group-text border-start-0 ${i?"":"border-0"} rounded-end-pill`,id:"btnGroupAddon",children:e.jsx(K,{})})]})}),!i&&e.jsx("li",{children:e.jsx(S,{to:"/cart",children:e.jsx("div",{className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(X,{}),((x=s==null?void 0:s.carts)==null?void 0:x.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(q=s==null?void 0:s.carts)==null?void 0:q.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})}),!i&&e.jsx("li",{children:e.jsx("button",{className:"navbar-toggler p-3",type:"button",onClick:k,"aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation",children:e.jsx(ce,{})})})]}),e.jsxs("div",{ref:c,className:"offcanvas offcanvas-end",tabIndex:"-1","aria-labelledby":"offcanvasNavbarLabel",children:[e.jsxs("div",{className:"offcanvas-header p-2",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{style:{width:"42px",height:"42px"},src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsx("button",{type:"button",className:"btn-close p-4",onClick:p})]}),e.jsxs("div",{className:"offcanvas-body px-7 py-3",children:[e.jsx("ul",{className:"navbar-nav  pe-3 me-auto ",children:w.map(a=>e.jsx("li",{className:"nav-item ",children:e.jsx(S,{disable:a.disable,className:"nav-link py-3 py-lg-5 px-lg-4",to:a.path,onClick:a.event,children:e.jsx("h6",{className:"fw-semibold",children:a.name})})},a.path))}),e.jsx("hr",{}),e.jsx("ul",{className:"navbar-nav d-md-none",children:r.map(a=>e.jsx("li",{className:"nav-item",children:e.jsx(S,{className:"nav-link",to:a.path,onClick:a.event,children:e.jsx("h6",{className:"fw-semibold",children:a.name})})},a.path))}),e.jsxs("ul",{className:" d-none d-lg-flex align-items-center ms-auto gap-7",children:[e.jsx("li",{children:e.jsxs("div",{ref:l,className:"input-group rounded-pill",children:[i&&e.jsx("input",{type:"text",className:"form-control border-end-0 rounded-start-pill focus-ring search-input",placeholder:"輸入關鍵字","aria-label":"Input group example","aria-describedby":"btnGroupAddon",onChange:h,onKeyDown:y}),e.jsx("button",{onMouseEnter:M,className:`input-group-text border-start-0 ${i?"":"border-0"} rounded-end-pill`,id:"btnGroupAddon",children:e.jsx(K,{})})]})}),e.jsx("li",{children:m?e.jsxs("div",{className:"d-flex justify-content-center align-items-center",children:[e.jsx("div",{className:"user-icon rounded-circle border border-dark bg-dark fs-5 me-3 p-2 text-white position-relative",children:e.jsx("span",{className:"position-absolute top-50 start-50 translate-middle",children:d!=null&&d.name?d.name.charAt(0).toUpperCase():""})}),e.jsx("div",{className:"fs-6",children:d==null?void 0:d.name})]}):e.jsx(S,{to:"/members",className:"p-3",children:e.jsx(Ne,{})})}),e.jsx("li",{children:e.jsx(S,{to:"/cart",className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(X,{}),((O=s==null?void 0:s.carts)==null?void 0:O.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(R=s==null?void 0:s.carts)==null?void 0:R.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})]})]})]})]})})]})}function Ee(){const c=[{path:"admin",name:"後台管理入口"}],n=[{path:"/",name:"最新衝浪板"},{path:"/products",name:"衝浪板"}],f=[],l=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"footerBg py-7",children:e.jsxs("div",{className:"container d-flex flex-column",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-9 mb-md-12",children:[e.jsxs("div",{className:"footerHeader d-flex align-items-center",children:[e.jsx("div",{className:"p-1",children:e.jsx("img",{src:"img/logo/nomad-logo-white.svg",alt:"nomad-logo-sm"})}),e.jsx("div",{children:e.jsx("p",{style:{letterSpacing:"0.15rem",lineHeight:"1.2"},className:"fs-5 ps-2",children:"NOMAD SURFER"})})]}),e.jsx("div",{children:e.jsxs("a",{className:"d-flex flex-column align-items-center px-3 py-4 btn fs-7",onClick:l,children:[e.jsx(de,{}),e.jsx("p",{className:"d-none d-md-block",children:"回到頂端"})]})})]}),e.jsx("div",{className:"flex-column",children:e.jsxs("div",{className:"d-flex justify-content-md-between flex-column flex-md-row",children:[e.jsxs("div",{className:"d-flex flex-column flex-md-row gap-md-14",children:[e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"關於我們"}),e.jsx("div",{className:"d-flex flex-column gap-md-2",children:c.map(t=>e.jsx("p",{className:"py-2",children:e.jsx($,{to:t.path,children:t.name})},t.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"商品"}),e.jsx("div",{className:"d-flex flex-column gap-md-2",children:n.map(t=>e.jsx("p",{className:"py-2",children:e.jsx($,{to:t.path,children:t.name})},t.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-md-5",children:"衝浪資訊"}),e.jsx("div",{className:"d-flex flex-column gap-md-2 ",children:f.map(t=>e.jsx("p",{className:"py-2",children:e.jsx($,{to:t.path,children:t.name})},t.name))})]})]}),e.jsxs("div",{className:"pb-7",children:[e.jsx("div",{className:"pb-3 pb-md-5",children:e.jsx("p",{className:"text-md-end",children:"追蹤我們"})}),e.jsxs("div",{className:"d-flex gap-md-7 gap-7  text-white me-auto",children:[e.jsx(pe,{size:24}),e.jsx(xe,{size:24}),e.jsx(ve,{size:24}),e.jsx(ge,{size:24})]})]})]})}),e.jsxs("div",{className:" d-flex flex-column flex-md-row gap-2 fs-9 ",children:[e.jsx("p",{children:"Copyright © 2024 Wings of the Sea. All rights reserved."}),e.jsx("div",{className:"d-flex flex-column flex-md-row",children:e.jsx("p",{children:"網站電商僅作為Demo不具商業目的"})})]})]})})})}function _e(){return e.jsxs(e.Fragment,{children:[e.jsx(je,{}),e.jsxs("div",{id:"app",children:[e.jsx(Re,{}),e.jsx(be,{}),e.jsx("div",{children:e.jsx(ie,{})}),e.jsx(Ee,{})]})]})}export{_e as default};
