import{d as Ss,i as _s,j as s,c as Ts,f as vs,P as ys,B as a,T as o,g as Is,h as u,D as As,k as Ps,b as js,s as y}from"./index-7fc42087.js";import{A as Ws}from"./AccountWrapper-5da3dd84.js";import{u as Es,K as Ds,W as fs,F as ks,G as j}from"./index-74fd18b7.js";import{u as Fs}from"./index-8757bede.js";import{c as Rs,u as Os,e as zs,f as Ms,h as qs}from"./account-46570069.js";import{T as Bs,a as ms}from"./Tabs-bd82aa97.js";import{D as Gs}from"./DialogContent-5deca1de.js";import{D as Ls}from"./DialogActions-a6386e18.js";import"./TextField-916ee773.js";const Hs="/assets/exchange-three-a904a0e4.svg",f="/assets/edit-d7e765cc.svg";var C={},Us=_s;Object.defineProperty(C,"__esModule",{value:!0});var m=C.default=void 0,Vs=Us(Ss()),$s=s,Ks=(0,Vs.default)((0,$s.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");m=C.default=Ks;const x=y(ys)`
  margin-top: 50px;
  padding: 20px;
`,t=y("div")`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${l=>l.theme.palette.primary.main};
  margin-bottom: 9px;
`,r=y("li")`
  width: 33.33%;
  margin-top: 20px;
  &.fullWidth {
    width: 100%;
  }
  span {
    font-size: 1.4rem;
    font-weight: 500;
    &:first-of-type {
      font-weight: 400;
      color: ${l=>l.theme.palette.text.secondary};
    }
  }
`;function le(){var b,N,S,_,T,v,I,A,P,W,E,D,k,F,R,O,z,M,q,B,G,L,H,U,V,$,K,J,Q,X,Y,Z,ss,es,ns,rs,ls,as,is,cs,os,ds,ps,xs,ts,hs,us;const[l,h]=Fs({open:!1,tabValue:0}),{data:n}=Ts(Rs),{msg:Cs}=vs(),g=Es({values:{firstname:(b=n==null?void 0:n.user)==null?void 0:b.firstname,lastname:(N=n==null?void 0:n.user)==null?void 0:N.lastname,email:(S=n==null?void 0:n.user)==null?void 0:S.email}}),d=e=>{e=="password"&&g.reset(),h({type:e,open:!0})},gs=()=>{h({open:!1})},w=e=>{const{children:i,value:c,index:p,...Ns}=e;return s.jsx("div",{role:"tabpanel",hidden:c!==p,id:`tabpanel-${p}`,"aria-labelledby":`tab-${p}`,...Ns,children:c===p&&s.jsx(s.Fragment,{children:i})})},ws=(e,i)=>{h({tabValue:i})},bs=async e=>{switch(l.type){case"first name":e!=null&&e.firstname&&await qs(e.firstname);break;case"last name":e!=null&&e.lastname&&await Ms(e.lastname);break;case"email":e!=null&&e.email&&await zs(e.email);break;case"password":await Os({old_password:e.old_password,new_password:e.new_password,confirm_password:e.confirm_password});break}Cs({message:"Update successfully!",onConfirm(){window.location.reload()}})};return s.jsxs(Ws,{code:"information",children:[s.jsxs(ys,{sx:e=>({background:e.palette.primary.light,height:"150px",padding:"20px 30px 20px 40px",color:e.palette.common.white}),children:[s.jsxs(a,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[s.jsx(o,{fontSize:"2.0rem",fontWeight:700,children:"PERSONAL INFO"}),s.jsxs(Is,{href:"#",color:"inherit",underline:"always",fontSize:"1.2rem",fontWeight:500,display:"flex",columnGap:1,onClick:()=>d("password"),children:["CHANGE PASSWORD",s.jsx("img",{src:Hs})]})]}),s.jsxs(a,{display:"flex",justifyContent:"space-between",padding:"28px 30px 44px",children:[s.jsxs(a,{display:"flex",alignItems:"center",columnGap:1,children:[s.jsxs(o,{fontSize:"1.2rem",children:["FIRST NAME:",(_=n==null?void 0:n.user)==null?void 0:_.firstname]}),s.jsx(u,{onClick:()=>d("first name"),children:s.jsx("img",{src:f})})]}),s.jsxs(a,{display:"flex",alignItems:"center",columnGap:1,children:[s.jsxs(o,{fontSize:"1.2rem",children:["LAST NAME:",(T=n==null?void 0:n.user)==null?void 0:T.lastname]}),s.jsx(u,{onClick:()=>d("last name"),children:s.jsx("img",{src:f})})]}),s.jsxs(a,{display:"flex",alignItems:"center",columnGap:1,children:[s.jsxs(o,{fontSize:"1.2rem",children:["EMAIL:",(v=n==null?void 0:n.user)==null?void 0:v.email]}),s.jsx(u,{onClick:()=>d("email"),children:s.jsx("img",{src:f})})]})]})]}),s.jsxs(x,{children:[s.jsx(t,{children:"BASIC CUSTOMER INFORMATION"}),s.jsxs(a,{component:"ul",display:"flex",flexWrap:"wrap",children:[s.jsxs(r,{children:[s.jsx("span",{children:"Client Code:"})," ",s.jsx("span",{children:(A=(I=n==null?void 0:n.user)==null?void 0:I.eya_t2)==null?void 0:A.customerCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Client Type:"})," ",s.jsx("span",{children:(W=(P=n==null?void 0:n.user)==null?void 0:P.eya_t2)==null?void 0:W.customerTypeCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Client Name:"})," ",s.jsx("span",{children:(D=(E=n==null?void 0:n.user)==null?void 0:E.eya_t2)==null?void 0:D.customerName})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tel:"})," ",s.jsx("span",{children:(F=(k=n==null?void 0:n.user)==null?void 0:k.eya_t2)==null?void 0:F.telephoneInfo})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tax Code:"})," ",s.jsx("span",{children:(O=(R=n==null?void 0:n.user)==null?void 0:R.eya_t2)==null?void 0:O.taxNumber})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Currency:"})," ",s.jsx("span",{children:(M=(z=n==null?void 0:n.user)==null?void 0:z.eya_t2)==null?void 0:M.currencyCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Price Term Code:"})," ",s.jsx("span",{children:(B=(q=n==null?void 0:n.user)==null?void 0:q.eya_t2)==null?void 0:B.paymentConditionCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Business Scope:"})," ",s.jsx("span",{children:(L=(G=n==null?void 0:n.user)==null?void 0:G.eya_t2)==null?void 0:L.customerBusinessScopeCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Sales Range:"})," ",s.jsx("span",{children:(U=(H=n==null?void 0:n.user)==null?void 0:H.eya_t2)==null?void 0:U.customerSalesChannelCode})]})]})]}),s.jsxs(x,{children:[s.jsx(t,{children:"BASIC CUSTOMER INFORMATION-ADD."}),s.jsxs(a,{component:"ul",display:"flex",flexWrap:"wrap",children:[s.jsxs(r,{children:[s.jsx("span",{children:"Country:"})," ",s.jsx("span",{children:($=(V=n==null?void 0:n.user)==null?void 0:V.eya_t2)==null?void 0:$.countryAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Province/State:"})," ",s.jsx("span",{children:(J=(K=n==null?void 0:n.user)==null?void 0:K.eya_t2)==null?void 0:J.provinceAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Post code:"})," ",s.jsx("span",{children:(X=(Q=n==null?void 0:n.user)==null?void 0:Q.eya_t2)==null?void 0:X.postCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tel:"})," ",s.jsx("span",{children:(Z=(Y=n==null?void 0:n.user)==null?void 0:Y.eya_t2)==null?void 0:Z.telephoneInfo})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tax Code:"})," ",s.jsx("span",{children:(es=(ss=n==null?void 0:n.user)==null?void 0:ss.eya_t2)==null?void 0:es.taxNumber})]}),s.jsxs(r,{children:[s.jsx("span",{children:"ADD.:"})," ",s.jsx("span",{children:(rs=(ns=n==null?void 0:n.user)==null?void 0:ns.eya_t2)==null?void 0:rs.addressDetail})]})]})]}),s.jsxs(x,{children:[s.jsx(t,{children:"CLIENT ATTRIBUTION"}),s.jsxs(a,{component:"ul",display:"flex",flexWrap:"wrap",children:[s.jsxs(r,{children:[s.jsx("span",{children:"Sale Group:"})," ",s.jsx("span",{children:(as=(ls=n==null?void 0:n.user)==null?void 0:ls.eya_t2)==null?void 0:as.businessGroupCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Saler:"})," ",s.jsx("span",{children:(cs=(is=n==null?void 0:n.user)==null?void 0:is.eya_t2)==null?void 0:cs.businessEmptName_en})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Sales Assistant:"})," ",s.jsx("span",{children:(ds=(os=n==null?void 0:n.user)==null?void 0:os.eya_t2)==null?void 0:ds.assistantEmptName_en})]})]})]}),s.jsxs(x,{children:[s.jsxs(t,{children:[s.jsx("span",{children:"PARTNERS INFORMATION"}),s.jsxs(Bs,{value:l.tabValue,onChange:ws,centered:!0,"aria-label":"partners information tabs",sx:{minHeight:"auto",marginTop:"-10px"},children:[s.jsx(ms,{icon:s.jsx(m,{fontSize:"small"}),iconPosition:"start",label:"Ship-to Party",sx:{fontSize:"1.2rem",minHeight:"auto"}}),s.jsx(ms,{icon:s.jsx(m,{fontSize:"small"}),iconPosition:"start",label:"Bill-to Party",sx:{fontSize:"1.2rem",minHeight:"auto"}})]})]}),s.jsx(w,{value:l.tabValue,index:0,children:(xs=(ps=n==null?void 0:n.eya_users)==null?void 0:ps.T5)==null?void 0:xs.map((e,i)=>s.jsxs(a,{component:"ul",display:"flex",flexWrap:"wrap",sx:c=>({background:c.palette.background.paper,padding:"0 40px 25px",marginTop:"30px"}),children:[s.jsx(r,{className:"fullWidth",children:s.jsx(o,{fontWeight:500,children:e==null?void 0:e.customerName})}),s.jsxs(r,{children:[s.jsx("span",{children:"Client Code:"})," ",s.jsx("span",{children:e==null?void 0:e.partnerCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Short Name:"})," ",s.jsx("span",{children:e==null?void 0:e.customerShortName})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tax Code:"})," ",s.jsx("span",{children:e==null?void 0:e.taxNumber})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Country:"})," ",s.jsx("span",{children:e==null?void 0:e.countryAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Province/State:"})," ",s.jsx("span",{children:e==null?void 0:e.provinceAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Post code:"})," ",s.jsx("span",{children:e==null?void 0:e.postCode})]}),s.jsxs(r,{className:"fullWidth",children:[s.jsx("span",{children:"Tel:"})," ",s.jsx("span",{children:e==null?void 0:e.telephoneInfo})]}),s.jsxs(r,{className:"fullWidth",children:[s.jsx("span",{children:"Detailed address:"})," ",s.jsx("span",{children:e==null?void 0:e.addressDetail})]})]},i))}),s.jsx(w,{value:l.tabValue,index:1,children:(hs=(ts=n==null?void 0:n.eya_users)==null?void 0:ts.T6)==null?void 0:hs.map((e,i)=>s.jsxs(a,{component:"ul",display:"flex",flexWrap:"wrap",sx:c=>({background:c.palette.background.paper,padding:"0 40px 25px",marginTop:"30px"}),children:[s.jsx(r,{className:"fullWidth",children:s.jsx(o,{fontWeight:500,children:e==null?void 0:e.customerName})}),s.jsxs(r,{children:[s.jsx("span",{children:"Client Code:"})," ",s.jsx("span",{children:e==null?void 0:e.partnerCode})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Short Name:"})," ",s.jsx("span",{children:e==null?void 0:e.customerShortName})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Tax Code:"})," ",s.jsx("span",{children:e==null?void 0:e.taxNumber})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Country:"})," ",s.jsx("span",{children:e==null?void 0:e.countryAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Province/State:"})," ",s.jsx("span",{children:e==null?void 0:e.provinceAreaNameEn})]}),s.jsxs(r,{children:[s.jsx("span",{children:"Post code:"})," ",s.jsx("span",{children:e==null?void 0:e.postCode})]}),s.jsxs(r,{className:"fullWidth",children:[s.jsx("span",{children:"Tel:"})," ",s.jsx("span",{children:e==null?void 0:e.telephoneInfo})]}),s.jsxs(r,{className:"fullWidth",children:[s.jsx("span",{children:"Detailed address:"})," ",s.jsx("span",{children:e==null?void 0:e.addressDetail})]})]},i))})]}),s.jsxs(As,{open:l.open,children:[s.jsxs(Ps,{children:["CHANGE ",(us=l.type)==null?void 0:us.toUpperCase()]}),s.jsxs(Ds,{onSuccess:bs,formContext:g,children:[s.jsxs(Gs,{sx:{pt:"10px!important"},children:[l.type=="password"&&s.jsxs(s.Fragment,{children:[s.jsx(fs,{autoFocus:!0,required:!0,label:"Old Password",name:"old_password",fullWidth:!0,sx:{mb:2}}),s.jsx(fs,{required:!0,label:"New Password",name:"new_password",fullWidth:!0,sx:{mb:2},validation:{validate:e=>/(\w){6,25}$/.test(e)?!0:"Password between 6-25 characters"}}),s.jsx(ks,{passwordFieldName:"new_password",required:!0,label:"Confirm Password",name:"confirm_password",fullWidth:!0})]}),l.type=="first name"&&s.jsx(j,{required:!0,label:"First Name",name:"firstname",fullWidth:!0,autoFocus:!0,sx:{width:350}}),l.type=="last name"&&s.jsx(j,{required:!0,label:"Last Name",name:"lastname",fullWidth:!0,autoFocus:!0,sx:{width:350}}),l.type=="email"&&s.jsx(j,{required:!0,label:"Email",name:"email",fullWidth:!0,autoFocus:!0,type:"email",sx:{width:350}})]}),s.jsxs(Ls,{children:[s.jsx(js,{variant:"outlined",onClick:gs,children:"Cancel"}),s.jsx(js,{type:"submit",children:"Submit"})]})]})]})]})}export{le as default};
