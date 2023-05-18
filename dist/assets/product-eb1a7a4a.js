import{R as z,j as s,s as c,V as N,t as l,aX as j,_ as I,n as A,m as E,T as O,r as p,p as U,J as _,v as L,w as q,a5 as B}from"./index-3983a4e6.js";import"./TextField-abba5161.js";const H=z(s.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),V=["slots","slotProps"],W=c(N)(({theme:e})=>l({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},e.palette.mode==="light"?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":l({},e.palette.mode==="light"?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":l({boxShadow:e.shadows[0]},e.palette.mode==="light"?{backgroundColor:j(e.palette.grey[200],.12)}:{backgroundColor:j(e.palette.grey[600],.12)})})),F=c(H)({width:24,height:16});function J(e){const{slots:r={},slotProps:n={}}=e,a=I(e,V),t=e;return s.jsx("li",{children:s.jsx(W,l({focusRipple:!0},a,{ownerState:t,children:s.jsx(F,l({as:r.CollapsedIcon,ownerState:t},n.collapsedIcon))}))})}function X(e){return E("MuiBreadcrumbs",e)}const D=A("MuiBreadcrumbs",["root","ol","li","separator"]),G=D,K=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],Q=e=>{const{classes:r}=e;return q({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},X,r)},Y=c(O,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,r)=>[{[`& .${G.li}`]:r.li},r.root]})({}),Z=c("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,r)=>r.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),ee=c("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,r)=>r.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function re(e,r,n,a){return e.reduce((t,u,d)=>(d<e.length-1?t=t.concat(u,s.jsx(ee,{"aria-hidden":!0,className:r,ownerState:a,children:n},`separator-${d}`)):t.push(u),t),[])}const oe=p.forwardRef(function(r,n){const a=U({props:r,name:"MuiBreadcrumbs"}),{children:t,className:u,component:d="nav",slots:C={},slotProps:v={},expandText:S="Show path",itemsAfterCollapse:g=1,itemsBeforeCollapse:b=1,maxItems:x=8,separator:y="/"}=a,M=I(a,K),[P,k]=p.useState(!1),i=l({},a,{component:d,expanded:P,expandText:S,itemsAfterCollapse:g,itemsBeforeCollapse:b,maxItems:x,separator:y}),m=Q(i),T=_({elementType:C.CollapsedIcon,externalSlotProps:v.collapsedIcon,ownerState:i}),w=p.useRef(null),$=o=>{const h=()=>{k(!0);const R=w.current.querySelector("a[href],button,[tabindex]");R&&R.focus()};return b+g>=o.length?o:[...o.slice(0,b),s.jsx(J,{"aria-label":S,slots:{CollapsedIcon:C.CollapsedIcon},slotProps:{collapsedIcon:T},onClick:h},"ellipsis"),...o.slice(o.length-g,o.length)]},f=p.Children.toArray(t).filter(o=>p.isValidElement(o)).map((o,h)=>s.jsx("li",{className:m.li,children:o},`child-${h}`));return s.jsx(Y,l({ref:n,component:d,color:"text.secondary",className:L(m.root,u),ownerState:i},M,{children:s.jsx(Z,{className:m.ol,ref:w,ownerState:i,children:re(P||x&&f.length<=x?f:$(f),m.separator,y,i)})}))}),se=oe,te=c(se)`
  font-size: 12px;
  margin-block-end: 20px;
`,ae=({children:e})=>s.jsx(te,{"aria-label":"breadcrumb",separator:">",children:e}),ce=ae,de=e=>B({method:"POST",url:"/api/product/getProductsPaginate",data:e}).then(r=>r.data),ie=e=>B({method:"POST",url:"/api/product/getProduct",data:{sku:e}}).then(r=>r.data),pe=e=>B({method:"POST",url:"/api/product/getProductBomInstructionFileUrl",data:{product_id:e}}).then(r=>r.data);export{ce as B,ie as a,pe as d,de as g};