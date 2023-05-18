import{d as q,aT as E,j as s,I as R,aU as N,b as D,B as U,h as T,s as m}from"./index-736c7350.js";import{e as X,a as H,c as Y,b as _,S as K,d as W}from"./swiper.min-f3007f88.js";import{K as Z,G as P}from"./index-d2f8e32e.js";import{l as J}from"./user-d70f4f12.js";import"./TextField-ddf87520.js";function I(a=""){return`.${a.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function Q({swiper:a,extendParams:h,on:u,emit:C}){const f="swiper-pagination";h({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${f}-bullet`,bulletActiveClass:`${f}-bullet-active`,modifierClass:`${f}-`,currentClass:`${f}-current`,totalClass:`${f}-total`,hiddenClass:`${f}-hidden`,progressbarFillClass:`${f}-progressbar-fill`,progressbarOppositeClass:`${f}-progressbar-opposite`,clickableClass:`${f}-clickable`,lockClass:`${f}-lock`,horizontalClass:`${f}-horizontal`,verticalClass:`${f}-vertical`,paginationDisabledClass:`${f}-disabled`}}),a.pagination={el:null,bullets:[]};let $,y=0;const x=e=>(Array.isArray(e)||(e=[e].filter(t=>!!t)),e);function j(){return!a.params.pagination.el||!a.pagination.el||Array.isArray(a.pagination.el)&&a.pagination.el.length===0}function S(e,t){const{bulletActiveClass:l}=a.params.pagination;e&&(e=e[`${t==="prev"?"previous":"next"}ElementSibling`],e&&(e.classList.add(`${l}-${t}`),e=e[`${t==="prev"?"previous":"next"}ElementSibling`],e&&e.classList.add(`${l}-${t}-${t}`)))}function F(e){const t=e.target.closest(I(a.params.pagination.bulletClass));if(!t)return;e.preventDefault();const l=H(t)*a.params.slidesPerGroup;if(a.params.loop){if(a.realIndex===l)return;const n=a.getSlideIndexByData(l),o=a.getSlideIndexByData(a.realIndex);n>a.slides.length-a.loopedSlides&&a.loopFix({direction:n>o?"next":"prev",activeSlideIndex:n,slideTo:!1}),a.slideToLoop(l)}else a.slideTo(l)}function b(){const e=a.rtl,t=a.params.pagination;if(j())return;let l=a.pagination.el;l=x(l);let n,o;const v=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,M=a.params.loop?Math.ceil(v/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(o=a.previousRealIndex||0,n=a.params.slidesPerGroup>1?Math.floor(a.realIndex/a.params.slidesPerGroup):a.realIndex):typeof a.snapIndex<"u"?(n=a.snapIndex,o=a.previousSnapIndex):(o=a.previousIndex||0,n=a.activeIndex||0),t.type==="bullets"&&a.pagination.bullets&&a.pagination.bullets.length>0){const i=a.pagination.bullets;let p,c,k;if(t.dynamicBullets&&($=X(i[0],a.isHorizontal()?"width":"height",!0),l.forEach(r=>{r.style[a.isHorizontal()?"width":"height"]=`${$*(t.dynamicMainBullets+4)}px`}),t.dynamicMainBullets>1&&o!==void 0&&(y+=n-(o||0),y>t.dynamicMainBullets-1?y=t.dynamicMainBullets-1:y<0&&(y=0)),p=Math.max(n-y,0),c=p+(Math.min(i.length,t.dynamicMainBullets)-1),k=(c+p)/2),i.forEach(r=>{const d=[...["","-next","-next-next","-prev","-prev-prev","-main"].map(g=>`${t.bulletActiveClass}${g}`)].map(g=>typeof g=="string"&&g.includes(" ")?g.split(" "):g).flat();r.classList.remove(...d)}),l.length>1)i.forEach(r=>{const d=H(r);d===n&&r.classList.add(...t.bulletActiveClass.split(" ")),t.dynamicBullets&&(d>=p&&d<=c&&r.classList.add(...`${t.bulletActiveClass}-main`.split(" ")),d===p&&S(r,"prev"),d===c&&S(r,"next"))});else{const r=i[n];if(r&&r.classList.add(...t.bulletActiveClass.split(" ")),t.dynamicBullets){const d=i[p],g=i[c];for(let L=p;L<=c;L+=1)i[L]&&i[L].classList.add(...`${t.bulletActiveClass}-main`.split(" "));S(d,"prev"),S(g,"next")}}if(t.dynamicBullets){const r=Math.min(i.length,t.dynamicMainBullets+4),d=($*r-$)/2-k*$,g=e?"right":"left";i.forEach(L=>{L.style[a.isHorizontal()?g:"top"]=`${d}px`})}}l.forEach((i,p)=>{if(t.type==="fraction"&&(i.querySelectorAll(I(t.currentClass)).forEach(c=>{c.textContent=t.formatFractionCurrent(n+1)}),i.querySelectorAll(I(t.totalClass)).forEach(c=>{c.textContent=t.formatFractionTotal(M)})),t.type==="progressbar"){let c;t.progressbarOpposite?c=a.isHorizontal()?"vertical":"horizontal":c=a.isHorizontal()?"horizontal":"vertical";const k=(n+1)/M;let r=1,d=1;c==="horizontal"?r=k:d=k,i.querySelectorAll(I(t.progressbarFillClass)).forEach(g=>{g.style.transform=`translate3d(0,0,0) scaleX(${r}) scaleY(${d})`,g.style.transitionDuration=`${a.params.speed}ms`})}t.type==="custom"&&t.renderCustom?(i.innerHTML=t.renderCustom(a,n+1,M),p===0&&C("paginationRender",i)):(p===0&&C("paginationRender",i),C("paginationUpdate",i)),a.params.watchOverflow&&a.enabled&&i.classList[a.isLocked?"add":"remove"](t.lockClass)})}function B(){const e=a.params.pagination;if(j())return;const t=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length;let l=a.pagination.el;l=x(l);let n="";if(e.type==="bullets"){let o=a.params.loop?Math.ceil(t/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&o>t&&(o=t);for(let v=0;v<o;v+=1)e.renderBullet?n+=e.renderBullet.call(a,v,e.bulletClass):n+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`}e.type==="fraction"&&(e.renderFraction?n=e.renderFraction.call(a,e.currentClass,e.totalClass):n=`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),e.type==="progressbar"&&(e.renderProgressbar?n=e.renderProgressbar.call(a,e.progressbarFillClass):n=`<span class="${e.progressbarFillClass}"></span>`),a.pagination.bullets=[],l.forEach(o=>{e.type!=="custom"&&(o.innerHTML=n||""),e.type==="bullets"&&a.pagination.bullets.push(...o.querySelectorAll(I(e.bulletClass)))}),e.type!=="custom"&&C("paginationRender",l[0])}function A(){a.params.pagination=Y(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const e=a.params.pagination;if(!e.el)return;let t;typeof e.el=="string"&&a.isElement&&(t=a.el.shadowRoot.querySelector(e.el)),!t&&typeof e.el=="string"&&(t=[...document.querySelectorAll(e.el)]),t||(t=e.el),!(!t||t.length===0)&&(a.params.uniqueNavElements&&typeof e.el=="string"&&Array.isArray(t)&&t.length>1&&(t=[...a.el.querySelectorAll(e.el)],t.length>1&&(t=t.filter(l=>_(l,".swiper")[0]===a.el)[0])),Array.isArray(t)&&t.length===1&&(t=t[0]),Object.assign(a.pagination,{el:t}),t=x(t),t.forEach(l=>{e.type==="bullets"&&e.clickable&&l.classList.add(e.clickableClass),l.classList.add(e.modifierClass+e.type),l.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.type==="bullets"&&e.dynamicBullets&&(l.classList.add(`${e.modifierClass}${e.type}-dynamic`),y=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),e.type==="progressbar"&&e.progressbarOpposite&&l.classList.add(e.progressbarOppositeClass),e.clickable&&l.addEventListener("click",F),a.enabled||l.classList.add(e.lockClass)}))}function z(){const e=a.params.pagination;if(j())return;let t=a.pagination.el;t&&(t=x(t),t.forEach(l=>{l.classList.remove(e.hiddenClass),l.classList.remove(e.modifierClass+e.type),l.classList.remove(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&l.removeEventListener("click",F)})),a.pagination.bullets&&a.pagination.bullets.forEach(l=>l.classList.remove(...e.bulletActiveClass.split(" ")))}u("changeDirection",()=>{if(!a.pagination||!a.pagination.el)return;const e=a.params.pagination;let{el:t}=a.pagination;t=x(t),t.forEach(l=>{l.classList.remove(e.horizontalClass,e.verticalClass),l.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass)})}),u("init",()=>{a.params.pagination.enabled===!1?O():(A(),B(),b())}),u("activeIndexChange",()=>{typeof a.snapIndex>"u"&&b()}),u("snapIndexChange",()=>{b()}),u("snapGridLengthChange",()=>{B(),b()}),u("destroy",()=>{z()}),u("enable disable",()=>{let{el:e}=a.pagination;e&&(e=x(e),e.forEach(t=>t.classList[a.enabled?"remove":"add"](a.params.pagination.lockClass)))}),u("lock unlock",()=>{b()}),u("click",(e,t)=>{const l=t.target;let{el:n}=a.pagination;if(Array.isArray(n)||(n=[n].filter(o=>!!o)),a.params.pagination.el&&a.params.pagination.hideOnClick&&n&&n.length>0&&!l.classList.contains(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&l===a.navigation.nextEl||a.navigation.prevEl&&l===a.navigation.prevEl))return;const o=n[0].classList.contains(a.params.pagination.hiddenClass);C(o===!0?"paginationShow":"paginationHide"),n.forEach(v=>v.classList.toggle(a.params.pagination.hiddenClass))}});const G=()=>{a.el.classList.remove(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=x(e),e.forEach(t=>t.classList.remove(a.params.pagination.paginationDisabledClass))),A(),B(),b()},O=()=>{a.el.classList.add(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=x(e),e.forEach(t=>t.classList.add(a.params.pagination.paginationDisabledClass))),z()};Object.assign(a.pagination,{enable:G,disable:O,render:B,update:b,init:A,destroy:z})}const V=m("div")`
  background-color: #0074a3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`,w=m("div")`
  display: flex;
  justify-content: space-between;
  width: 1080px;
  height: 600px;
  background: #fff;
  border-radius: 6px;
`,aa=m(W)`
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
`,ea=m("div")`
  flex: 1;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`,ta=m("div")`
  font-weight: 700;
  font-size: 2rem;
  line-height: 20px;
  color: #0074a3;
`,la=m("div")`
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
`,na=m("div")`
  text-align: center;
  color: ${a=>a.theme.palette.primary.main};
  margin: 10px 0;
`,ia=m("span")`
  display: inline-block;
  width: 2px;
  height: 8px;
  background: #0074a3;
  border-radius: 6px;
  margin: 0 12px;
`,sa=m("div")`
  font-weight: 700;
  font-size: 2rem;
  color: ${a=>a.theme.palette.primary.main};
  margin-bottom: 25px;
  text-align: center;
`;function ga(){const{data:a}=q(E);return s.jsx(V,{children:s.jsxs(w,{children:[s.jsx(aa,{modules:[Q],pagination:{clickable:!0},children:a==null?void 0:a.map(h=>s.jsx(K,{children:s.jsx(R,{src:h==null?void 0:h.image,alt:"banner",width:680,height:600})},h.id))}),s.jsxs(ea,{children:[s.jsx(ta,{children:"ZIEL Global Distributor System"}),s.jsxs(la,{children:[s.jsx(sa,{children:"LOGIN"}),s.jsxs(Z,{onSuccess:async h=>{const u=await J(h);u.token&&(N(u.token),window.location.href="/")},children:[s.jsx(P,{required:!0,label:"Email",name:"email"}),s.jsx(P,{type:"password",required:!0,label:"Password",name:"password"}),s.jsx(D,{type:"submit",size:"medium",children:"LOGIN"}),s.jsx(na,{children:"OR"}),s.jsx(D,{href:"/register",size:"medium",color:"success",children:"REGISTER"})]})]}),s.jsxs(U,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[s.jsx(T,{href:"/about-us",children:"About us"}),s.jsx(ia,{}),s.jsx(T,{href:"/contact-us",children:"Contact us"})]})]})]})})}export{ga as default};
