import{r as ee,g as ae,j as e,u as ne,a as se,N as v,s as te,L as B,O as re}from"./index-Dppbq8ve.js";import{G as j,M as L,a as W,b as le,c as ie}from"./index-Bf0SCmEq.js";import{s as ce}from"./cartSelectors-BDjwKbbE.js";import"./reselect-CiXCCDx7.js";function oe(n){return j({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(n)}var C={},$;function de(){if($)return C;$=1;function n(c){if(typeof window>"u")return;const o=document.createElement("style");return o.setAttribute("type","text/css"),o.innerHTML=c,document.head.appendChild(o),c}Object.defineProperty(C,"__esModule",{value:!0});var a=ee();function f(c){return c&&typeof c=="object"&&"default"in c?c:{default:c}}var i=f(a);n(`.rfm-marquee-container {
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
}`);const t=a.forwardRef(function({style:o={},className:g="",autoFill:s=!1,play:u=!0,pauseOnHover:k=!1,pauseOnClick:R=!1,direction:r="left",speed:b=50,delay:_=0,loop:q=0,gradient:U=!1,gradientColor:D="white",gradientWidth:N=200,onFinish:V,onCycleComplete:X,onMount:O,children:y},G){const[E,Z]=a.useState(0),[w,K]=a.useState(0),[M,F]=a.useState(1),[S,P]=a.useState(!1),Y=a.useRef(null),d=G||Y,x=a.useRef(null),p=a.useCallback(()=>{if(x.current&&d.current){const l=d.current.getBoundingClientRect(),A=x.current.getBoundingClientRect();let m=l.width,h=A.width;(r==="up"||r==="down")&&(m=l.height,h=A.height),F(s&&m&&h&&h<m?Math.ceil(m/h):1),Z(m),K(h)}},[s,d,r]);a.useEffect(()=>{if(S&&(p(),x.current&&d.current)){const l=new ResizeObserver(()=>p());return l.observe(d.current),l.observe(x.current),()=>{l&&l.disconnect()}}},[p,d,S]),a.useEffect(()=>{p()},[p,y]),a.useEffect(()=>{P(!0)},[]),a.useEffect(()=>{typeof O=="function"&&O()},[]);const H=a.useMemo(()=>s?w*M/b:w<E?E/b:w/b,[s,E,w,M,b]),J=a.useMemo(()=>Object.assign(Object.assign({},o),{"--pause-on-hover":!u||k?"paused":"running","--pause-on-click":!u||k&&!R||R?"paused":"running","--width":r==="up"||r==="down"?"100vh":"100%","--transform":r==="up"?"rotate(-90deg)":r==="down"?"rotate(90deg)":"none"}),[o,u,k,R,r]),Q=a.useMemo(()=>({"--gradient-color":D,"--gradient-width":typeof N=="number"?`${N}px`:N}),[D,N]),I=a.useMemo(()=>({"--play":u?"running":"paused","--direction":r==="left"?"normal":"reverse","--duration":`${H}s`,"--delay":`${_}s`,"--iteration-count":q?`${q}`:"infinite","--min-width":s?"auto":"100%"}),[u,r,H,_,q,s]),z=a.useMemo(()=>({"--transform":r==="up"?"rotate(90deg)":r==="down"?"rotate(-90deg)":"none"}),[r]),T=a.useCallback(l=>[...Array(Number.isFinite(l)&&l>=0?l:0)].map((A,m)=>i.default.createElement(a.Fragment,{key:m},a.Children.map(y,h=>i.default.createElement("div",{style:z,className:"rfm-child"},h)))),[z,y]);return S?i.default.createElement("div",{ref:d,style:J,className:"rfm-marquee-container "+g},U&&i.default.createElement("div",{style:Q,className:"rfm-overlay"}),i.default.createElement("div",{className:"rfm-marquee",style:I,onAnimationIteration:X,onAnimationEnd:V},i.default.createElement("div",{className:"rfm-initial-child-container",ref:x},a.Children.map(y,l=>i.default.createElement("div",{style:z,className:"rfm-child"},l))),T(M-1)),i.default.createElement("div",{className:"rfm-marquee",style:I},T(M))):null});return C.default=t,C}var me=de();const he=ae(me);function fe(){return e.jsx("div",{className:" bg-dark  py-2 ",children:e.jsx(he,{pauseOnHover:!0,direction:"left",children:e.jsx("a",{className:"text",href:"#",onClick:n=>{n.preventDefault()},children:e.jsx("h6",{className:"fs-8 text-center text-white",children:"夏季熱血促銷 |滿千免運，現在買板送腳繩 ; 購買兩萬以上的衝浪板，鰭 (FINs) 打8折"})})})})}function ue(){var t,c,o,g;const n=ne(),a=se(ce),f=[{path:"/",name:"最新衝浪板",event:()=>{n(te())}},{path:"products",name:"所有商品",event:""},{path:"wave",name:"即時浪況",event:""},{path:"shower-map",name:"沖澡地圖",event:""}],i=[{path:"/cart",name:"購物車"},{path:"/member",name:"會員登入"}];return e.jsxs(e.Fragment,{children:[e.jsx(fe,{}),e.jsx("nav",{className:"navbar navbar-expand-lg bg-body-tertiary sticky-top py-lg-4 navbar-cust shadow-sm",children:e.jsxs("div",{className:"container",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{className:"logo-img",src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsxs("ul",{className:"d-flex align-items-center d-md-none ms-auto",children:[e.jsx("li",{children:e.jsx("a",{onClick:s=>{s.preventDefault()},href:"#",className:"p-3",children:e.jsx(L,{})})}),e.jsx("li",{children:e.jsx(v,{to:"/cart",className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(W,{}),((t=a==null?void 0:a.carts)==null?void 0:t.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(c=a==null?void 0:a.carts)==null?void 0:c.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})]}),e.jsx("button",{className:"navbar-toggler p-3",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar","aria-label":"Toggle navigation",children:e.jsx(le,{})}),e.jsxs("div",{className:"offcanvas offcanvas-end",tabIndex:"-1",id:"offcanvasNavbar","aria-labelledby":"offcanvasNavbarLabel",children:[e.jsxs("div",{className:"offcanvas-header p-2",children:[e.jsx("a",{className:"navbar-brand p-2",href:"#",children:e.jsx("img",{style:{width:"42px",height:"42px"},src:"img/logo/nomad-logo-black.svg",alt:"nomad-logo-sm"})}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})]}),e.jsxs("div",{className:"offcanvas-body px-7 py-3",children:[e.jsx("ul",{className:"navbar-nav  pe-3 me-auto ",children:f.map(s=>e.jsx("li",{className:"nav-item ",children:e.jsx(v,{className:"nav-link py-3 py-lg-5 px-lg-4",to:s.path,onClick:s.event,children:e.jsx("h6",{className:"fw-semibold",children:s.name})})},s.path))}),e.jsx("hr",{}),e.jsx("ul",{className:"navbar-nav d-sm-none",children:i.map(s=>e.jsx("li",{className:"nav-item",children:e.jsx(v,{className:"nav-link",to:s.path,children:e.jsx("h6",{className:"fw-semibold",children:s.name})})},s.path))}),e.jsxs("ul",{className:" d-none d-lg-flex align-items-center ms-auto gap-7",children:[e.jsx("li",{children:e.jsx("a",{href:"",className:"p-3",children:e.jsx(L,{})})}),e.jsx("li",{children:e.jsx(v,{to:"/members",className:"p-3",children:e.jsx(oe,{})})}),e.jsx("li",{children:e.jsx(v,{to:"/cart",className:"p-3",children:e.jsxs("div",{className:"position-relative",children:[e.jsx(W,{}),((o=a==null?void 0:a.carts)==null?void 0:o.length)>0&&e.jsxs("span",{className:"position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary-100 text-white",children:[(g=a==null?void 0:a.carts)==null?void 0:g.length,e.jsx("span",{className:"visually-hidden",children:"unread messages"})]})]})})})]})]})]})]})})]})}function xe(n){return j({attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"},child:[]}]})(n)}function pe(n){return j({attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"},child:[]}]})(n)}function ve(n){return j({attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"},child:[]}]})(n)}function je(n){return j({attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"},child:[]}]})(n)}function ge(){const n=[{path:"admin",name:"後台管理入口"}],a=[{path:"/products",name:"衝浪板"},{path:"/",name:"配件"},{path:"/",name:"周邊"}],f=[{path:"/wave",name:"全台浪點"},{path:"/shower-map",name:"沖澡地圖"}],i=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"footerBg py-7",children:e.jsxs("div",{className:"container d-flex flex-column",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-9 mb-sm-12",children:[e.jsxs("div",{className:"footerHeader d-flex align-items-center",children:[e.jsx("div",{className:"p-1",children:e.jsx("img",{src:"img/logo/nomad-logo-white.svg",alt:"nomad-logo-sm"})}),e.jsx("div",{children:e.jsx("p",{style:{letterSpacing:"0.15rem",lineHeight:"1.2"},className:"fs-5 ps-2",children:"NOMAD SURFER"})})]}),e.jsx("div",{children:e.jsxs("a",{className:"d-flex flex-column align-items-center px-3 py-4 btn fs-7",onClick:i,children:[e.jsx(ie,{}),e.jsx("p",{className:"d-none d-sm-block",children:"回到頂端"})]})})]}),e.jsx("div",{className:"flex-column",children:e.jsxs("div",{className:"d-flex justify-content-sm-between flex-column flex-sm-row",children:[e.jsxs("div",{className:"d-flex flex-column flex-sm-row gap-sm-14",children:[e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-sm-5",children:"關於我們"}),e.jsx("div",{className:"d-flex flex-column gap-sm-2",children:n.map(t=>e.jsx("p",{className:"py-2",children:e.jsx(B,{to:t.path,children:t.name})},t.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-sm-5",children:"商品"}),e.jsx("div",{className:"d-flex flex-column gap-sm-2",children:a.map(t=>e.jsx("p",{className:"py-2",children:e.jsx(B,{to:t.path,children:t.name})},t.name))})]}),e.jsxs("div",{className:"mb-7",children:[e.jsx("p",{className:"fw-semibold pb-sm-5",children:"衝浪資訊"}),e.jsx("div",{className:"d-flex flex-column gap-sm-2 ",children:f.map(t=>e.jsx("p",{className:"py-2",children:e.jsx(B,{to:t.path,children:t.name})},t.name))})]})]}),e.jsxs("div",{className:"pb-7",children:[e.jsx("div",{className:"pb-3 pb-sm-5",children:e.jsx("p",{className:"text-sm-end",children:"追蹤我們"})}),e.jsxs("div",{className:"d-flex gap-sm-7 gap-7  text-white me-auto",children:[e.jsx(xe,{size:24}),e.jsx(pe,{size:24}),e.jsx(ve,{size:24}),e.jsx(je,{size:24})]})]})]})}),e.jsxs("div",{className:" d-flex flex-column flex-sm-row gap-2 fs-9 ",children:[e.jsx("p",{children:"Copyright © 2024 Wings of the Sea. All rights reserved."}),e.jsx("div",{className:"d-flex flex-column flex-sm-row",children:e.jsx("p",{children:"網站電商僅作為Demo不具商業目的"})})]})]})})})}function Me(){return e.jsx(e.Fragment,{children:e.jsxs("div",{id:"app",children:[e.jsx(ue,{}),e.jsx("div",{children:e.jsx(re,{})}),e.jsx(ge,{})]})})}export{Me as default};
