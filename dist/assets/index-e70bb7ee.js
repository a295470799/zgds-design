import{aK as E,r as g,aL as N,aM as H,aN as B,aO as q,aP as O,j as e,B as p,s as b,P as R,T as f,g as _,I as U,h as I,b as K,u as Q,x as Y,c as G,q as S,z as J,L as X,e as W}from"./index-7fc42087.js";import{u as Z}from"./index-8757bede.js";import{g as V,B as ee}from"./product-d8e65c85.js";import{a as re}from"./cart-d8d9654d.js";import{S as j}from"./Skeleton-a445679c.js";import{l as ne,r as te}from"./account-46570069.js";import{S as T}from"./TextField-916ee773.js";import{M as w,K as ae,i as C}from"./index-74fd18b7.js";import{S as se}from"./Stepper-c3f17ee0.js";import{c as oe}from"./format-97287686.js";import{P as ie}from"./Pagination-fa08d295.js";function ce(n,a){n===void 0&&(n=!1);var t=E(g.useState(n),2),c=t[0],o=t[1],s=g.useMemo(function(){var l=a===void 0?!n:a,h=function(){return o(function(i){return i===n?l:n})},u=function(i){return o(i)},r=function(){return o(n)},d=function(){return o(l)};return{toggle:h,set:u,setLeft:r,setRight:d}},[]);return[c,s]}function le(n){n===void 0&&(n=!1);var a=E(ce(!!n),2),t=a[0],c=a[1],o=c.toggle,s=c.set,l=g.useMemo(function(){var h=function(){return s(!0)},u=function(){return s(!1)};return{toggle:o,set:function(r){return s(!!r)},setTrue:h,setFalse:u}},[]);return[t,l]}function F(n,a){if(N){if(!n)return a;var t;return H(n)?t=n():"current"in n?t=n.current:t=n,t}}var de=function(n){var a=function(t,c,o){var s=g.useRef(!1),l=g.useRef([]),h=g.useRef([]),u=g.useRef();n(function(){var r,d=Array.isArray(o)?o:[o],i=d.map(function(v){return F(v)});if(!s.current){s.current=!0,l.current=i,h.current=c,u.current=t();return}(i.length!==l.current.length||!B(i,l.current)||!B(c,h.current))&&((r=u.current)===null||r===void 0||r.call(u),l.current=i,h.current=c,u.current=t())}),q(function(){var r;(r=u.current)===null||r===void 0||r.call(u),s.current=!1})};return a};const ue=de;var he=ue(g.useEffect);const ge=he;function P(n,a,t){t===void 0&&(t={});var c=O(a);ge(function(){var o=F(t.target,window);if(o!=null&&o.addEventListener){var s=function(l){return c.current(l)};return o.addEventListener(n,s,{capture:t.capture,once:t.once,passive:t.passive}),function(){o.removeEventListener(n,s,{capture:t.capture})}}},[n,t.capture,t.once,t.passive],t.target)}const A=function(n,a){var t=a||{},c=t.onEnter,o=t.onLeave,s=t.onChange,l=E(le(!1),2),h=l[0],u=l[1],r=u.setTrue,d=u.setFalse;return P("mouseenter",function(){c==null||c(),r(),s==null||s(!0)},{target:n}),P("mouseleave",function(){o==null||o(),d(),s==null||s(!1)},{target:n}),h},xe="/assets/empty-af8d3933.svg";function fe(){return e.jsx(p,{sx:{display:"flex",flexWrap:"wrap",gap:"20px 10px"},children:[1,2,3].map(n=>e.jsxs(p,{children:[e.jsx(j,{variant:"rounded",width:270,height:270,sx:{marginBlockEnd:"20px"}}),e.jsx(j,{variant:"text",sx:{marginBlockEnd:"5px",fontSize:"1.4rem"}}),e.jsx(j,{variant:"text",sx:{marginBlockEnd:"10px",fontSize:"1.2rem"}}),e.jsxs(p,{sx:{display:"fex",justifyContent:"space-between",alignItems:"center",marginBlockEnd:"10px"},children:[e.jsx(j,{variant:"rectangular",width:50,height:18}),e.jsx(j,{variant:"rectangular",width:95,height:30})]}),e.jsx(j,{variant:"rounded",width:270,height:30})]},n))})}const $=b("div")`
  position: relative;
  display: inline-block;
  & .MuiSelect-select {
    width: ${n=>(n==null?void 0:n.width)??170}px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 1.4rem;
    box-sizing: border-box;
    cursor: pointer;
  }
  & .dropdown__paper {
    position: absolute;
    border: 1px solid ${n=>n.theme.palette.grey[400]};
    border-top: 0;
    width: ${n=>(n==null?void 0:n.width)??170}px;
    z-index: 1;
    .MuiMenuItem-root {
      font-size: 1.2rem;
      color: ${n=>n.theme.palette.grey[500]};
    }
  }
`,pe=n=>{const{urlState:a,onChange:t}=n,c=g.useRef(null),o=A(c),s=g.useRef(null),l=A(s),h=i=>{t({order:i})},u=i=>{t({page_size:i})},r=[{id:"discount",label:"Discount: High to Low"},{id:"price_lowToheight",label:"Price: Low to High"},{id:"price_heightTolow",label:"Price: High to Low"},{id:"point",label:"Avg: Customer Rating"}],d=[30,60,90,150].map(i=>({id:i,label:i}));return e.jsxs(p,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBlockEnd:"20px"},children:[e.jsxs($,{ref:c,children:[e.jsx(T,{defaultValue:0,readOnly:!0,children:e.jsx(w,{value:"0",children:"Sort By"})}),e.jsx(R,{hidden:!o,className:"dropdown__paper",children:r.map(i=>e.jsx(w,{onClick:()=>h(i.id),children:e.jsx(f,{color:a.order==i.id?"secondary":"inherit",children:i.label})},i.id))})]}),e.jsxs($,{ref:s,width:90,children:[e.jsx(T,{defaultValue:0,readOnly:!0,children:e.jsx(w,{value:"0",children:"Show"})}),e.jsx(R,{hidden:!l,className:"dropdown__paper",children:d.map(i=>e.jsx(w,{onClick:()=>u(i.id),children:e.jsx(f,{color:a.page_size==i.id?"secondary":"inherit",children:i.label})},i.id))})]})]})},M="/assets/wished-16cd8303.svg",me=b("div")`
  flex: 0 0 auto;
  width: 300px;
`,k=b("div")`
  display: flex;
  flex-direction: column;
  margin-block-end: 20px;
  & > .MuiFormControl-root {
    margin-top: -5px;
  }
  .MuiCheckbox-root {
    padding: 6px 9px;
  }
`,D=b("span")(({theme:n,bold:a})=>({color:n.palette.text.secondary,fontSize:"1.4rem",paddingLeft:"16px",marginBottom:"8px",fontWeight:a==1?500:400,cursor:"pointer",["&:hover"]:{textDecoration:"underline"}})),ve=n=>{var s,l,h,u;const{urlState:a,onChange:t,productsInfo:c}=n,o=(r,d="other")=>d=="image"?e.jsx("img",{src:M}):e.jsx(f,{bgcolor:d=="other"?"secondary.main":"primary.main",color:"white",p:"1px 10px",fontSize:"1.2rem",children:r});return e.jsxs(me,{children:[e.jsxs(k,{children:[e.jsx(f,{fontSize:"1.4rem",color:"text.secondary",fontWeight:500,mb:1,children:((s=c==null?void 0:c.category)==null?void 0:s.name)??"All Category"}),(l=c==null?void 0:c.categorys)==null?void 0:l.map((r,d)=>e.jsxs(D,{onClick:()=>{t({category_id:r.id})},bold:a.category_id==r.id?1:0,children:[r.name," (",r.product_count,")"]},d))]}),e.jsxs(k,{children:[e.jsx(f,{fontSize:"1.4rem",color:"text.secondary",fontWeight:500,mb:1,children:"Brand"}),(h=c==null?void 0:c.brands)==null?void 0:h.map((r,d)=>e.jsxs(D,{onClick:()=>{t({brand:r.name})},bold:a.brand==r.name?1:0,children:[r.name," (",r.product_count,")"]},d))]}),e.jsx(k,{children:e.jsx(ae,{defaultValues:{tags:a!=null&&a.tags?[a.tags]:[],wished:a!=null&&a.wished?[a.wished]:[],labels:a!=null&&a.labels?(u=a.labels)==null?void 0:u.split(","):[]},children:e.jsxs(k,{children:[e.jsx(C,{name:"tags",options:[{id:"bought",label:o("Bought","bought")}],onChange:r=>{t({tags:r==null?void 0:r[0]})}}),e.jsx(C,{name:"wished",options:[{id:"1",label:o("wished","image")}],onChange:r=>{t({wished:r==null?void 0:r[0]})}}),e.jsx(C,{name:"labels",options:[{id:"NEW",label:o("NEW")},{id:"Top Rated",label:o("Top Rated")},{id:"Clearance",label:o("Clearance")},{id:"Discount",label:o("Discount")}],onChange:r=>{t({labels:r.join(",")})}})]})})})]})},je="/assets/wish-a77800de.svg",be=b("ul")`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  margin-block-end: 50px;
`,ye=b("li")`
  flex: 0 0 auto;
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & img {
    display: block;
  }
  & .badge {
    position: absolute;
    font-size: 1.2rem;
    padding: 0 10px;
    line-height: 20px;
    border: 1px solid ${n=>n.theme.palette.secondary.main};
  }
  & .badge-sale {
    top: 0;
    left: 0;
    background: ${n=>n.theme.palette.secondary.main};
    color: #fff;
  }
  & .badge-wish {
    top: 0;
    right: 0;
    border: 0;
  }
  & .badge-back {
    bottom: 0;
    left: 0;
    background: #fff;
    color: ${n=>n.theme.palette.secondary.main};
  }
`,we=n=>{var u;const{urlState:a,products:t,onAddCart:c,onAddWish:o,onPaginationChange:s}=n,[l,h]=g.useState(new Array(30).fill(1));return g.useEffect(()=>{a!=null&&a.page_size&&h(new Array(Number(a.page_size)).fill(1))},[a]),e.jsxs(e.Fragment,{children:[e.jsx(be,{children:(u=t==null?void 0:t.data)==null?void 0:u.map((r,d)=>{var i,v;return e.jsxs(ye,{children:[e.jsxs(p,{sx:{position:"relative",display:"block",marginBlockEnd:"22px"},children:[e.jsx(_,{href:`/product/${r.sku}`,children:e.jsx(U,{src:r.cover,alt:r.short_name,width:270,height:270,loadingType:"loading"})}),(r==null?void 0:r.label)&&e.jsx("div",{className:"badge badge-sale",children:r==null?void 0:r.label}),e.jsx("div",{className:"badge badge-wish",children:e.jsx(I,{onClick:()=>o(r.id,r.wished),children:e.jsx("img",{src:r.wished==0?je:M})})}),r.stock==0&&e.jsx("div",{className:"badge badge-back",children:"Backorder"})]}),e.jsxs(p,{children:[e.jsx(_,{color:"text.secondary",href:`/product/${r.sku}`,sx:{textOverflow:"ellipsis",fontSize:"1.4rem",fontWeight:500,display:"block",marginBlockEnd:"10px"},children:r.short_name}),e.jsxs(f,{color:"text.secondary",fontSize:"1.4rem",sx:{marginBlockEnd:"10px"},children:["Wholesale Price: ",e.jsx("b",{children:r.price_str})]}),e.jsxs(f,{color:"text.fourth",fontSize:"1.2rem",sx:{marginBlockEnd:"10px"},children:["SKU: ",r.sku]}),((i=r==null?void 0:r.restock)==null?void 0:i.restock_date)&&e.jsxs(f,{color:"text.fourth",fontSize:"1.2rem",sx:{marginBlockEnd:"10px"},children:["Restock Date: ",oe(r.restock.restock_date,!0)]}),((v=r==null?void 0:r.restock)==null?void 0:v.restock_quantity)&&e.jsxs(f,{color:"text.fourth",fontSize:"1.2rem",sx:{marginBlockEnd:"10px"},children:["Restock Quantity: ",r.restock.restock_quantity]}),e.jsxs(p,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBlockEnd:"10px"},children:[e.jsxs(f,{color:"text.fourth",fontSize:"1.2rem",children:[r.cart_count," in cart"]}),e.jsx(se,{value:l[d]??1,onChange:y=>{l[d]=y,h(l)}})]}),e.jsx(K,{fullWidth:!0,color:"dark",onClick:()=>{c(r.id,l[d])},children:"ADD TO CART"})]})]},d)})}),((t==null?void 0:t.last_page)??0)>1&&e.jsx(ie,{count:t.last_page,variant:"outlined",shape:"rounded",onChange:(r,d)=>{s({page:d})},page:Number(a==null?void 0:a.page)})]})},ke=({id:n})=>{var v,y,L,z;const a=Q(),t=Y(),[c,o]=g.useState(!1),{data:s,refresh:l,run:h}=G(async x=>{const m=await V(x);return o(!1),m},{defaultParams:[{category_id:n}],debounceWait:300}),u=async(x,m)=>{await re(x,m),l(),W(`You've added ${m} item(s) to your cart.`)},r=async(x,m)=>{m==0?(await ne(x),W("Added successfuly.")):await te(x),l()},[d,i]=Z({category_id:n,page:1,page_size:30,...S.parse(a.search)});return J(()=>{t(`?${S.stringify(d)}`)},[d]),g.useEffect(()=>{const x={category_id:n,page:1,page_size:30,...S.parse(a.search)};o(!0),h(x)},[a]),e.jsxs(X,{title:(v=s==null?void 0:s.category)==null?void 0:v.name,children:[e.jsxs(ee,{children:[e.jsx(_,{href:"/",color:"inherit",children:"Home"}),(y=s==null?void 0:s.nav)==null?void 0:y.map((x,m)=>x.current==1?e.jsx(f,{color:"secondary.main",fontSize:"1.2rem",children:x.name},m):e.jsx(_,{href:`/list/${x.id}`,color:"inherit",children:x.name},m))]}),e.jsxs(p,{display:"flex",justifyContent:"space-between",pb:6,children:[e.jsx(ve,{urlState:d,onChange:i,productsInfo:s}),e.jsxs(p,{flex:"0 0 auto",width:840,children:[e.jsx(pe,{urlState:d,onChange:i}),c?e.jsx(fe,{}):((z=(L=s==null?void 0:s.products)==null?void 0:L.data)==null?void 0:z.length)>0?e.jsx(e.Fragment,{children:e.jsx(we,{urlState:d,products:s==null?void 0:s.products,onAddCart:u,onAddWish:r,onPaginationChange:i})}):e.jsxs(p,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,children:[e.jsx(p,{children:e.jsx("img",{src:xe})}),e.jsx(f,{children:"No data"})]})]})]})]})},Ae=ke;export{Ae as P};
