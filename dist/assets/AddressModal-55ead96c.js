import{s as g,D as C,r as d,j as s,a as u,T as b,b as h}from"./index-7fc42087.js";import{D as E}from"./DialogContent-5deca1de.js";import{e as S,T as y,a as D,b as p,c as l,d as A}from"./TableRow-6318a9cb.js";const f=g(C)(({theme:i})=>({"& .MuiDialogContent-root":{padding:i.spacing(1),width:"700px"}})),B=i=>{const[x,a]=d.useState(!1),j=()=>{a(!0)},t=()=>{a(!1)},{type:c="shipping",addresses:r=[],onSelect:T,trigger:n=s.jsx(h,{variant:"outlined",children:"Open dialog"})}=i,m=d.cloneElement(n,{onClick:()=>{var e,o;(o=(e=n==null?void 0:n.props)==null?void 0:e.onClick)==null||o.call(e),j()}});return s.jsxs("div",{children:[m,s.jsxs(f,{open:x,maxWidth:"md",children:[s.jsx(u,{onClose:t,titleSx:{m:0,p:2},children:s.jsx(b,{color:"primary",fontWeight:500,children:`Select ${c=="shipping"?"Shipping":"Billing"} Address`})}),s.jsx(E,{children:s.jsx(S,{children:s.jsxs(y,{size:"small",children:[s.jsx(D,{children:s.jsxs(p,{children:[s.jsx(l,{children:"ITEM"}),s.jsx(l,{children:"CLIENT NAME"}),s.jsx(l,{children:"SHORT NAME"}),s.jsx(l,{children:"TAX CODE"}),s.jsx(l,{children:"SELECT"})]})}),s.jsx(A,{children:r==null?void 0:r.map((e,o)=>s.jsxs(p,{children:[s.jsxs(l,{children:[e.customerTypeCode=="T5"?"Ship to":"",e.customerTypeCode=="T6"?"Bill to":""]}),s.jsx(l,{children:e.customerName}),s.jsx(l,{children:e.customerShortName}),s.jsx(l,{children:c=="billing"&&e.taxNumber}),s.jsx(l,{children:s.jsx(h,{size:"small",onClick:()=>{T(e),t()},children:"Select"})})]},o))})]})})})]})]})},k=B;export{k as A};
