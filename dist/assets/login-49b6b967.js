import{c as q,j as s,I as E,aT as R,b as D,B as N,g as T,s as m}from"./index-7fc42087.js";import{e as X,a as H,c as Y,b as _,S as K,d as U}from"./swiper.min-97854ef3.js";import{K as W,G as P}from"./index-74fd18b7.js";import{l as Z}from"./user-e54be159.js";import"./TextField-916ee773.js";function I(a=""){return`.${a.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function J({swiper:a,extendParams:L,on:c,emit:v}){const g="swiper-pagination";L({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${g}-bullet`,bulletActiveClass:`${g}-bullet-active`,modifierClass:`${g}-`,currentClass:`${g}-current`,totalClass:`${g}-total`,hiddenClass:`${g}-hidden`,progressbarFillClass:`${g}-progressbar-fill`,progressbarOppositeClass:`${g}-progressbar-opposite`,clickableClass:`${g}-clickable`,lockClass:`${g}-lock`,horizontalClass:`${g}-horizontal`,verticalClass:`${g}-vertical`,paginationDisabledClass:`${g}-disabled`}}),a.pagination={el:null,bullets:[]};let $,x=0;const h=e=>(Array.isArray(e)||(e=[e].filter(t=>!!t)),e);function j(){return!a.params.pagination.el||!a.pagination.el||Array.isArray(a.pagination.el)&&a.pagination.el.length===0}function S(e,t){const{bulletActiveClass:l}=a.params.pagination;e&&(e=e[`${t==="prev"?"previous":"next"}ElementSibling`],e&&(e.classList.add(`${l}-${t}`),e=e[`${t==="prev"?"previous":"next"}ElementSibling`],e&&e.classList.add(`${l}-${t}-${t}`)))}function F(e){const t=e.target.closest(I(a.params.pagination.bulletClass));if(!t)return;e.preventDefault();const l=H(t)*a.params.slidesPerGroup;if(a.params.loop){if(a.realIndex===l)return;const n=a.getSlideIndexByData(l),o=a.getSlideIndexByData(a.realIndex);n>a.slides.length-a.loopedSlides&&a.loopFix({direction:n>o?"next":"prev",activeSlideIndex:n,slideTo:!1}),a.slideToLoop(l)}else a.slideTo(l)}function y(){const e=a.rtl,t=a.params.pagination;if(j())return;let l=a.pagination.el;l=h(l);let n,o;const b=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,M=a.params.loop?Math.ceil(b/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(o=a.previousRealIndex||0,n=a.params.slidesPerGroup>1?Math.floor(a.realIndex/a.params.slidesPerGroup):a.realIndex):typeof a.snapIndex<"u"?(n=a.snapIndex,o=a.previousSnapIndex):(o=a.previousIndex||0,n=a.activeIndex||0),t.type==="bullets"&&a.pagination.bullets&&a.pagination.bullets.length>0){const i=a.pagination.bullets;let p,d,k;if(t.dynamicBullets&&($=X(i[0],a.isHorizontal()?"width":"height",!0),l.forEach(r=>{r.style[a.isHorizontal()?"width":"height"]=`${$*(t.dynamicMainBullets+4)}px`}),t.dynamicMainBullets>1&&o!==void 0&&(x+=n-(o||0),x>t.dynamicMainBullets-1?x=t.dynamicMainBullets-1:x<0&&(x=0)),p=Math.max(n-x,0),d=p+(Math.min(i.length,t.dynamicMainBullets)-1),k=(d+p)/2),i.forEach(r=>{const f=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(u=>`${t.bulletActiveClass}${u}`)].map(u=>typeof u=="string"&&u.includes(" ")?u.split(" "):u).flat();r.classList.remove(...f)}),l.length>1)i.forEach(r=>{const f=H(r);f===n&&r.classList.add(...t.bulletActiveClass.split(" ")),t.dynamicBullets&&(f>=p&&f<=d&&r.classList.add(...`${t.bulletActiveClass}-main`.split(" ")),f===p&&S(r,"prev"),f===d&&S(r,"next"))});else{const r=i[n];if(r&&r.classList.add(...t.bulletActiveClass.split(" ")),t.dynamicBullets){const f=i[p],u=i[d];for(let C=p;C<=d;C+=1)i[C]&&i[C].classList.add(...`${t.bulletActiveClass}-main`.split(" "));S(f,"prev"),S(u,"next")}}if(t.dynamicBullets){const r=Math.min(i.length,t.dynamicMainBullets+4),f=($*r-$)/2-k*$,u=e?"right":"left";i.forEach(C=>{C.style[a.isHorizontal()?u:"top"]=`${f}px`})}}l.forEach((i,p)=>{if(t.type==="fraction"&&(i.querySelectorAll(I(t.currentClass)).forEach(d=>{d.textContent=t.formatFractionCurrent(n+1)}),i.querySelectorAll(I(t.totalClass)).forEach(d=>{d.textContent=t.formatFractionTotal(M)})),t.type==="progressbar"){let d;t.progressbarOpposite?d=a.isHorizontal()?"vertical":"horizontal":d=a.isHorizontal()?"horizontal":"vertical";const k=(n+1)/M;let r=1,f=1;d==="horizontal"?r=k:f=k,i.querySelectorAll(I(t.progressbarFillClass)).forEach(u=>{u.style.transform=`translate3d(0,0,0) scaleX(${r}) scaleY(${f})`,u.style.transitionDuration=`${a.params.speed}ms`})}t.type==="custom"&&t.renderCustom?(i.innerHTML=t.renderCustom(a,n+1,M),p===0&&v("paginationRender",i)):(p===0&&v("paginationRender",i),v("paginationUpdate",i)),a.params.watchOverflow&&a.enabled&&i.classList[a.isLocked?"add":"remove"](t.lockClass)})}function B(){const e=a.params.pagination;if(j())return;const t=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length;let l=a.pagination.el;l=h(l);let n="";if(e.type==="bullets"){let o=a.params.loop?Math.ceil(t/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&o>t&&(o=t);for(let b=0;b<o;b+=1)e.renderBullet?n+=e.renderBullet.call(a,b,e.bulletClass):n+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`}e.type==="fraction"&&(e.renderFraction?n=e.renderFraction.call(a,e.currentClass,e.totalClass):n=`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),e.type==="progressbar"&&(e.renderProgressbar?n=e.renderProgressbar.call(a,e.progressbarFillClass):n=`<span class="${e.progressbarFillClass}"></span>`),a.pagination.bullets=[],l.forEach(o=>{e.type!=="custom"&&(o.innerHTML=n||""),e.type==="bullets"&&a.pagination.bullets.push(...o.querySelectorAll(I(e.bulletClass)))}),e.type!=="custom"&&v("paginationRender",l[0])}function A(){a.params.pagination=Y(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const e=a.params.pagination;if(!e.el)return;let t;typeof e.el=="string"&&a.isElement&&(t=a.el.shadowRoot.querySelector(e.el)),!t&&typeof e.el=="string"&&(t=[...document.querySelectorAll(e.el)]),t||(t=e.el),!(!t||t.length===0)&&(a.params.uniqueNavElements&&typeof e.el=="string"&&Array.isArray(t)&&t.length>1&&(t=[...a.el.querySelectorAll(e.el)],t.length>1&&(t=t.filter(l=>_(l,".swiper")[0]===a.el)[0])),Array.isArray(t)&&t.length===1&&(t=t[0]),Object.assign(a.pagination,{el:t}),t=h(t),t.forEach(l=>{e.type==="bullets"&&e.clickable&&l.classList.add(e.clickableClass),l.classList.add(e.modifierClass+e.type),l.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.type==="bullets"&&e.dynamicBullets&&(l.classList.add(`${e.modifierClass}${e.type}-dynamic`),x=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),e.type==="progressbar"&&e.progressbarOpposite&&l.classList.add(e.progressbarOppositeClass),e.clickable&&l.addEventListener("click",F),a.enabled||l.classList.add(e.lockClass)}))}function z(){const e=a.params.pagination;if(j())return;let t=a.pagination.el;t&&(t=h(t),t.forEach(l=>{l.classList.remove(e.hiddenClass),l.classList.remove(e.modifierClass+e.type),l.classList.remove(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&l.removeEventListener("click",F)})),a.pagination.bullets&&a.pagination.bullets.forEach(l=>l.classList.remove(...e.bulletActiveClass.split(" ")))}c("changeDirection",()=>{if(!a.pagination||!a.pagination.el)return;const e=a.params.pagination;let{el:t}=a.pagination;t=h(t),t.forEach(l=>{l.classList.remove(e.horizontalClass,e.verticalClass),l.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass)})}),c("init",()=>{a.params.pagination.enabled===!1?O():(A(),B(),y())}),c("activeIndexChange",()=>{typeof a.snapIndex>"u"&&y()}),c("snapIndexChange",()=>{y()}),c("snapGridLengthChange",()=>{B(),y()}),c("destroy",()=>{z()}),c("enable disable",()=>{let{el:e}=a.pagination;e&&(e=h(e),e.forEach(t=>t.classList[a.enabled?"remove":"add"](a.params.pagination.lockClass)))}),c("lock unlock",()=>{y()}),c("click",(e,t)=>{const l=t.target;let{el:n}=a.pagination;if(Array.isArray(n)||(n=[n].filter(o=>!!o)),a.params.pagination.el&&a.params.pagination.hideOnClick&&n&&n.length>0&&!l.classList.contains(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&l===a.navigation.nextEl||a.navigation.prevEl&&l===a.navigation.prevEl))return;const o=n[0].classList.contains(a.params.pagination.hiddenClass);v(o===!0?"paginationShow":"paginationHide"),n.forEach(b=>b.classList.toggle(a.params.pagination.hiddenClass))}});const G=()=>{a.el.classList.remove(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=h(e),e.forEach(t=>t.classList.remove(a.params.pagination.paginationDisabledClass))),A(),B(),y()},O=()=>{a.el.classList.add(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=h(e),e.forEach(t=>t.classList.add(a.params.pagination.paginationDisabledClass))),z()};Object.assign(a.pagination,{enable:G,disable:O,render:B,update:y,init:A,destroy:z})}const Q=m("div")`
  background-color: #0074a3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,V=m("div")`
  display: flex;
  justify-content: space-between;
  width: 1080px;
  height: 600px;
  background: #fff;
  border-radius: 6px;
`,w=m(U)`
  width: 680px;
  margin-right: -14px;
  .swiper-pagination-bullet {
    background-color: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    border-radius: 6px;
  }
`,aa=m("div")`
  flex: 1;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`,ea=m("div")`
  font-weight: 700;
  font-size: 2rem;
  line-height: 20px;
  color: #0074a3;
`,ta=m("div")`
  padding: 0 50px;
  margin: 0 auto;
  & > form {
    display: flex;
    flex-direction: column;
  }
  & .MuiTextField-root {
    width: 240px;
  }
  & .MuiFormHelperText-root.Mui-error {
    opacity: 0;
  }
`,la=m("div")`
  text-align: center;
  color: ${a=>a.theme.palette.primary.main};
  margin: 10px 0;
`,na=m("span")`
  display: inline-block;
  width: 2px;
  height: 8px;
  background: #0074a3;
  border-radius: 6px;
  margin: 0 12px;
`,ia=m("div")`
  font-weight: 700;
  font-size: 2rem;
  color: ${a=>a.theme.palette.primary.main};
  margin-bottom: 25px;
  text-align: center;
`;function fa(){const{data:a}=q(async()=>await["/image/login/1.jpg","/image/login/2.jpg"]);return s.jsx(Q,{children:s.jsxs(V,{children:[s.jsx(w,{modules:[J],pagination:{clickable:!0},children:a==null?void 0:a.map((L,c)=>s.jsx(K,{children:s.jsx(E,{src:L,alt:"banner",width:680,height:600})},c))}),s.jsxs(aa,{children:[s.jsx(ea,{children:"ZIEL Global Distributor System"}),s.jsxs(ta,{children:[s.jsx(ia,{children:"LOGIN"}),s.jsxs(W,{onSuccess:async L=>{const c=await Z(L);c.token&&(R(c.token),window.location.href="/")},children:[s.jsx(P,{required:!0,label:"Email",name:"email"}),s.jsx(P,{type:"password",required:!0,label:"Password",name:"password"}),s.jsx(D,{type:"submit",size:"medium",children:"LOGIN"}),s.jsx(la,{children:"OR"}),s.jsx(D,{href:"/register",size:"medium",color:"success",children:"REGISTER"})]})]}),s.jsxs(N,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[s.jsx(T,{href:"/about-us",children:"About us"}),s.jsx(na,{}),s.jsx(T,{href:"/contact-us",children:"Contact us"})]})]})]})})}export{fa as default};
