import{a5 as T,j as e,P as C,T as m,B as d,f as I,c,r as q,L as z,b as k,A as W,e as h}from"./index-7fc42087.js";import{a as G}from"./country-dc060b12.js";import{a as F,g as y}from"./user-e54be159.js";import{A as _}from"./AddressModal-55ead96c.js";import{C as M}from"./CartSummary-1a4e1a14.js";import{O as R}from"./OrderTypeSelect-9fdf6280.js";import{T as l}from"./TextField-916ee773.js";import{u as H}from"./index-8757bede.js";import{K as U,G as s,l as D,p as K}from"./index-74fd18b7.js";import{C as $}from"./CircularProgress-1ef4c344.js";import"./DialogContent-5deca1de.js";import"./TableRow-6318a9cb.js";import"./format-97287686.js";import"./DialogActions-a6386e18.js";const J=async n=>T({method:"POST",url:"/api/account/getCheckoutData",data:{area_code:n}}).then(p=>p.data),Q=async n=>T({method:"POST",url:"/api/account/createOrder",data:n,showError:!0}).then(p=>p.data),V=n=>{const{label:p="BILLING INFORMATION",addressInfo:i,children:a}=n;return e.jsxs(C,{sx:{padding:"20px 10px",background:"#fff",marginBottom:"40px",width:"800px"},children:[e.jsx(m,{color:"primary",fontWeight:500,fontSize:"1.2rem",marginBottom:"20px",children:p}),a,i&&e.jsxs(d,{sx:{display:"flex",flexWrap:"wrap",columnGap:"45px"},children:[e.jsx(l,{label:"Client Name",InputLabelProps:{shrink:!0},value:i==null?void 0:i.customerName,inputProps:{readOnly:!0}}),e.jsx(l,{label:"Short Name",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.customerShortName,readOnly:!0}}),e.jsx(l,{label:"Phone",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.telephoneInfo,readOnly:!0}}),e.jsx(l,{label:"Tax Code",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.taxNumber,readOnly:!0}}),e.jsx(l,{label:"Country",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.countryAreaNameEn,readOnly:!0}}),e.jsx(l,{label:"City",InputLabelProps:{shrink:!0},inputProps:{value:"",readOnly:!0}}),e.jsx(l,{label:"State",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.provinceAreaNameEn,readOnly:!0}}),e.jsx(l,{label:"Postal Code",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.postCode,readOnly:!0}}),e.jsx(l,{label:"Address",InputLabelProps:{shrink:!0},inputProps:{value:i==null?void 0:i.addressDetail,readOnly:!0}})]})]})},S=V;function ce(){var b,f,j;const[n,p]=H({dialogOpen:!0}),{msg:i}=I(),{data:a,run:g}=c(J,{onFinally(r,t){t!=null&&t.total_price&&Number((t==null?void 0:t.total_price)??0)>0||(window.location.href="/cart")}}),{data:x}=c(F,{ready:!n.dialogOpen}),{data:o}=c(async r=>{if(r=="Dropship"){const t=await y("T6");return t.length==1&&p({billing:t[0]}),{billing:t}}else{const t=await y("T5"),u=await y("T6");return t.length==1&&p({shipping:t[0]}),u.length==1&&p({billing:u[0]}),{shipping:t,billing:u}}},{defaultParams:[n.checkOutType],ready:!n.dialogOpen}),{data:B,run:N}=c(async()=>{const r=await G();return r==null?void 0:r.map(t=>({id:t.id,label:t.area_name_en}))},{ready:!n.dialogOpen,manual:!0});q.useEffect(()=>{var r;(r=n.shipping)!=null&&r.countryCode?g(n.shipping.countryCode):n.checkOutType=="Dropship"&&(N(),g())},[(b=n.shipping)==null?void 0:b.countryCode,n.checkOutType]);const w=r=>{p({checkOutType:r,dialogOpen:!1})},{loading:v,runAsync:L}=c(Q,{manual:!0}),E=async r=>{var t,u,O,P;if(n.checkOutType=="Batch order"&&!((t=n.shipping)!=null&&t.partnerCode)&&h("Please select Shipping Information",{variant:"error"}),!((u=n.billing)!=null&&u.partnerCode)){h("Please select Billing Information",{variant:"error"});return}await L({orderTypeCode:n.checkOutType??"",shipTo:((O=n.shipping)==null?void 0:O.partnerCode)??"",billTo:((P=n.billing)==null?void 0:P.partnerCode)??"",fulfillmentChannelCode:r.fulfillmentChannelCode??"",shipping_name:r.shipping_name??"",shipping_email:r.shipping_email??"",shipping_phone:r.shipping_phone??"",shipping_country_code:r.shipping_country_code??"",shipping_city:r.shipping_city??"",shipping_zone:r.shipping_zone??"",shipping_postcode:r.shipping_postcode??"",shipping_address:r.shipping_address??"",tradeClauseCode:r.tradeClauseCode??"",pricingTradeClauseCode:r.pricingTradeClauseCode??"",customContractId:r.customContractId??""}),i({message:"Order placed, please go to My Orders to confirm!",onConfirm(){window.location.href="/account/orders"}})},A=r=>{r!=null&&r.fulfillmentChannelCode&&h("Please select Shipment method",{variant:"error"}),r!=null&&r.tradeClauseCode&&h("Please select Trade term",{variant:"error"})};return(a==null?void 0:a.total_price)>0?e.jsxs(z,{title:"Checkout",bodySx:{marginBlockStart:0},children:[e.jsx(R,{open:n.dialogOpen,onSelect:w}),n.checkOutType&&e.jsx(U,{onSuccess:E,onError:A,children:e.jsxs(d,{sx:r=>({position:"relative",background:r.palette.background.paper,padding:"0 10px",minHeight:"100vh",display:"flex",justifyContent:"space-between"}),children:[e.jsxs(d,{children:[e.jsx(m,{variant:"h1",color:"primary",fontWeight:700,fontSize:"3.2rem",padding:"20px 0 34px 0",children:n.checkOutType}),e.jsx(s,{label:"PO NO.",name:"customContractId"}),n.checkOutType=="Dropship"&&e.jsxs(C,{sx:{padding:"20px 10px",background:"#fff",marginBottom:"40px",width:"800px"},children:[e.jsx(m,{color:"primary",fontWeight:500,fontSize:"1.2rem",marginBottom:"20px",children:"SHIPPING INFORMATION"}),e.jsxs(d,{sx:{display:"flex",flexWrap:"wrap",columnGap:"45px"},children:[e.jsx(s,{required:!0,label:"Name",name:"shipping_name"}),e.jsx(s,{label:"Email",name:"shipping_email"}),e.jsx(s,{label:"Phone",name:"shipping_phone"}),e.jsx(D,{label:"Country",name:"shipping_country_code",sx:{minWidth:230},required:!0,options:B,onChange:r=>{g(r)}}),e.jsx(s,{required:!0,label:"City",name:"shipping_city"}),e.jsx(s,{label:"State",name:"shipping_zone"}),e.jsx(s,{required:!0,label:"Postal Code",name:"shipping_postcode"}),e.jsx(s,{required:!0,label:"Address",name:"shipping_address",sx:{minWidth:505}})]})]}),n.checkOutType=="Batch order"&&e.jsx(S,{label:"SHIPPING INFORMATION",addressInfo:n.shipping,children:(((f=o==null?void 0:o.shipping)==null?void 0:f.length)??0)>1&&e.jsx(_,{type:"shipping",addresses:(o==null?void 0:o.shipping)??[],onSelect:r=>{p({shipping:r})},trigger:e.jsx(k,{sx:{marginBlockEnd:"35px"},children:"Select Shipping Information"})})}),e.jsx(S,{addressInfo:n.billing,children:(((j=o==null?void 0:o.billing)==null?void 0:j.length)??0)>1&&e.jsx(_,{type:"billing",addresses:(o==null?void 0:o.billing)??[],onSelect:r=>{p({billing:r})},trigger:e.jsx(k,{sx:{marginBlockEnd:"35px"},children:"Select Billing Information"})})}),n.checkOutType=="Batch order"&&e.jsxs(C,{sx:{padding:"20px 10px",background:"#fff",marginBottom:"40px",width:"800px"},children:[e.jsx(m,{color:"primary",fontWeight:500,fontSize:"1.2rem",marginBottom:"20px",children:"Shipment method"}),e.jsx(K,{name:"fulfillmentChannelCode",row:!0,required:!0,options:[{id:"代发",label:"Ship by supplier"},{id:"自提",label:"Self-pickup"}]})]})]}),e.jsx(M,{summary:{count:a==null?void 0:a.snaps_count,totalPrice:a==null?void 0:a.total_price,tradeClauseCodePrice:x==null?void 0:x.eya_t2.tradeClauseCodePrice},type:"checkout",sx:{marginTop:"95px",top:"25px"}})]})}),e.jsx(W,{sx:{color:"#fff",zIndex:r=>r.zIndex.drawer+1},open:v,children:e.jsx($,{color:"inherit"})})]}):e.jsx(e.Fragment,{})}export{ce as default};