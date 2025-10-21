import{c as l}from"./createLucideIcon-CSAcrkPz.js";import{j as e,L as n}from"./app-CZ5wKpKF.js";import{A as r}from"./app-logo-icon-B8Qs5zSS.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],g=l("LoaderCircle",i),c="/build/assets/fondo-login-small-BF6A95Bd.jpg",d="/build/assets/fondo-login-medium-o90QG2EO.jpg",m="/build/assets/fondo-login-large-CGa15io7.jpg";function u({children:a,title:s,description:t}){return e.jsxs("div",{className:"auth-bg relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden",children:[e.jsx("div",{className:"relative p-3 rounded z-10 text-center bg-black/40",children:e.jsx("div",{className:"w-full max-w-sm",children:e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsxs(n,{href:route("home"),className:"flex flex-col items-center gap-2 font-medium",children:[e.jsx("div",{className:"mb-1 flex h-[128px] w-[128px] items-center justify-center rounded-md",children:e.jsx(r,{className:"fill-current text-[var(--foreground)] dark:text-white"})}),e.jsx("span",{className:"sr-only",children:s})]}),e.jsxs("div",{className:"space-y-2 text-center",children:[e.jsx("h1",{className:"text-xl font-medium",children:s}),e.jsx("p",{className:"text-center text-sm text-muted-foreground",children:t})]})]}),a]})})}),e.jsx("style",{children:`
              .auth-bg {
                background-image: url(${c});
                background-size: cover;
                background-position: center;
              }
              @media (min-width: 768px) {
                .auth-bg {
                  background-image: url(${d});
                }
              }
              @media (min-width: 1920px) {
                .auth-bg {
                  background-image: url(${m});
                }
              }
            `})]})}function p({children:a,title:s,description:t,...o}){return e.jsx(u,{title:s,description:t,...o,children:a})}export{p as A,g as L};
