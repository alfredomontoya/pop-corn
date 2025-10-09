import{r as p,u as N,j as x}from"./app-BdN3KFFc.js";import{D as S,a as _,b as O,c as I,d as T}from"./dialog-BeLorP08.js";import M from"./ClienteForm-DXdJyPbB.js";/* empty css            */import"./index-CCsJL7g1.js";import"./createLucideIcon-C6ckYpXG.js";import"./index-C1iwO0xC.js";import"./index-BQOpE9VR.js";import"./button-HnChx-uO.js";import"./input-CreckB4S.js";import"./label-TE6-Onk7.js";import"./select-BH7Vr4Kx.js";import"./index-D6oCJvBO.js";import"./index-BalnnUkV.js";import"./chevron-up-BW39-yz5.js";let L={data:""},P=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||L,R=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,H=/\/\*[^]*?\*\/|  +/g,k=/\n+/g,g=(e,t)=>{let r="",o="",s="";for(let a in e){let i=e[a];a[0]=="@"?a[1]=="i"?r=a+" "+i+";":o+=a[1]=="f"?g(i,a):a+"{"+g(i,a[1]=="k"?"":t)+"}":typeof i=="object"?o+=g(i,t?t.replace(/([^,])+/g,n=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):a):i!=null&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=g.p?g.p(a,i):a+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+o},u={},A=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+A(e[r]);return t}return e},U=(e,t,r,o,s)=>{let a=A(e),i=u[a]||(u[a]=(l=>{let c=0,m=11;for(;c<l.length;)m=101*m+l.charCodeAt(c++)>>>0;return"go"+m})(a));if(!u[i]){let l=a!==e?e:(c=>{let m,h,y=[{}];for(;m=R.exec(c.replace(H,""));)m[4]?y.shift():m[3]?(h=m[3].replace(k," ").trim(),y.unshift(y[0][h]=y[0][h]||{})):y[0][m[1]]=m[2].replace(k," ").trim();return y[0]})(e);u[i]=g(s?{["@keyframes "+i]:l}:l,r?"":"."+i)}let n=r&&u.g?u.g:null;return r&&(u.g=u[i]),((l,c,m,h)=>{h?c.data=c.data.replace(h,l):c.data.indexOf(l)===-1&&(c.data=m?l+c.data:c.data+l)})(u[i],t,o,n),i},q=(e,t,r)=>e.reduce((o,s,a)=>{let i=t[a];if(i&&i.call){let n=i(r),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;i=l?"."+l:n&&typeof n=="object"?n.props?"":g(n,""):n===!1?"":n}return o+s+(i??"")},"");function w(e){let t=this||{},r=e.call?e(t.p):e;return U(r.unshift?r.raw?q(r,[].slice.call(arguments,1),t.p):r.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):r,P(t.target),t.g,t.o,t.k)}let z,j,E;w.bind({g:1});let f=w.bind({k:1});function J(e,t,r,o){g.p=t,z=e,j=r,E=o}function b(e,t){let r=this||{};return function(){let o=arguments;function s(a,i){let n=Object.assign({},a),l=n.className||s.className;r.p=Object.assign({theme:j&&j()},n),r.o=/ *go\d+/.test(l),n.className=w.apply(r,o)+(l?" "+l:"");let c=e;return e[0]&&(c=n.as||e,delete n.as),E&&c[0]&&E(n),z(c,n)}return s}}var V=e=>typeof e=="function",C=(e,t)=>V(e)?e(t):e,W=(()=>{let e=0;return()=>(++e).toString()})(),Y=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),Z=20,F=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,Z)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===t.toast.id?{...a,...t.toast}:a)};case 2:let{toast:r}=t;return F(e,{type:e.toasts.find(a=>a.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(a=>a.id===o||o===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+s}))}}},B=[],$={toasts:[],pausedAt:void 0},D=e=>{$=F($,e),B.forEach(t=>{t($)})},G=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||W()}),v=e=>(t,r)=>{let o=G(t,e,r);return D({type:2,toast:o}),o.id},d=(e,t)=>v("blank")(e,t);d.error=v("error");d.success=v("success");d.loading=v("loading");d.custom=v("custom");d.dismiss=e=>{D({type:3,toastId:e})};d.remove=e=>D({type:4,toastId:e});d.promise=(e,t,r)=>{let o=d.loading(t.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let a=t.success?C(t.success,s):void 0;return a?d.success(a,{id:o,...r,...r?.success}):d.dismiss(o),s}).catch(s=>{let a=t.error?C(t.error,s):void 0;a?d.error(a,{id:o,...r,...r?.error}):d.dismiss(o)}),e};var K=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Q=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ee=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Q} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${X} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,te=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,re=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${te} 1s linear infinite;
`,ae=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,oe=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ie=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ae} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${oe} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,se=b("div")`
  position: absolute;
`,ne=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,le=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ce=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${le} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,de=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?p.createElement(ce,null,t):t:r==="blank"?null:p.createElement(ne,null,p.createElement(re,{...o}),r!=="loading"&&p.createElement(se,null,r==="error"?p.createElement(ee,{...o}):p.createElement(ie,{...o})))},pe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,me=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ue="0%{opacity:0;} 100%{opacity:1;}",fe="0%{opacity:1;} 100%{opacity:0;}",ge=b("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,be=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,he=(e,t)=>{let r=e.includes("top")?1:-1,[o,s]=Y()?[ue,fe]:[pe(r),me(r)];return{animation:t?`${f(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};p.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?he(e.position||t||"top-center",e.visible):{opacity:0},a=p.createElement(de,{toast:e}),i=p.createElement(be,{...e.ariaProps},C(e.message,e));return p.createElement(ge,{className:e.className,style:{...s,...r,...e.style}},typeof o=="function"?o({icon:a,message:i}):p.createElement(p.Fragment,null,a,i))});J(p.createElement);w`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;function ye(e){const{data:t,setData:r,post:o,processing:s,errors:a,reset:i}=N({tipo_documento:"CI",tipo:"NATURAL",numero_documento:"",nombre_razon_social:"",direccion:"",telefono:"",email:"",estado:"activo",notas:""});return{data:t,setData:r,handleSubmit:l=>{l.preventDefault(),o(route("clientes.store"),{onSuccess:()=>{d.success("Cliente creado correctamente!"),e&&e(),i()},onError:()=>{d.error("Ocurrió un error al crear el cliente")}})},processing:s,errors:a,reset:i}}function Oe({open:e,onClose:t,onSuccess:r}){const{data:o,setData:s,handleSubmit:a,processing:i,errors:n,reset:l}=ye(r);return x.jsx(S,{open:e,onOpenChange:t,children:x.jsxs(_,{className:"max-w-lg max-h-[90vh] overflow-y-auto",children:[x.jsxs(O,{children:[x.jsx(I,{children:"Registrar cliente"}),x.jsx(T,{children:"Complete los datos para registrar un nuevo cliente."})]}),x.jsx(M,{data:o,setData:s,errors:n,processing:i,onSubmit:a,reset:l})]})})}export{Oe as default};
