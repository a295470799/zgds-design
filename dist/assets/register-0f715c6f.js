import{c as s,aX as y,j as e,B as n,T as g,b as _,s as h,aY as f}from"./index-7fc42087.js";import{K as W,l as t,G as l,i as m,x as q,t as C}from"./index-74fd18b7.js";import{a as w,g as c}from"./country-dc060b12.js";import{G as r}from"./Grid-cdf432e8.js";import{a as b}from"./TextField-916ee773.js";const T=h(f)`
  margin: 40px auto;
  & .MuiFormControl-root {
    margin: 0;
  }
  & .MuiFormHelperText-root.Mui-error {
    opacity: 0;
    white-space: nowrap;
  }
  & .MuiFormControlLabel-root {
    margin-right: 40px;
  }
`,R=h("h1")`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: ${a=>a.theme.palette.primary.main};
  margin-bottom: 70px;
  ::before {
    content: "";
    width: 10px;
    height: 30px;
    background: #ed5933;
    border-radius: 6px;
    margin: 0 20px 0 40px;
  }
`;function F(){const{data:a=[]}=s(async()=>{const i=await w();return i==null?void 0:i.map(x=>({id:x.area_code,label:x.area_name_en}))},{debounceWait:500}),{data:o=[]}=s(y,{defaultParams:[1],debounceWait:500}),{data:d=[],run:p}=s(async i=>await c(i),{manual:!0,debounceWait:500}),{data:u=[],run:j}=s(async i=>await c(i),{manual:!0,debounceWait:500});return e.jsxs(T,{children:[e.jsx(R,{children:"Registration application"}),e.jsxs(W,{onSuccess:i=>console.log(i),children:[e.jsxs(r,{container:!0,rowSpacing:1,columnSpacing:5,children:[e.jsx(r,{item:!0,xs:3,children:e.jsx(t,{label:"I am a",name:"type",fullWidth:!0,required:!0,options:[{label:"Traditional Retailer",id:"Traditional Retailer"},{label:"Ecommerce Retailer",id:"Ecommerce Retailer"},{label:"Both",id:"Both"}]})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"First Name",name:"firstname",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Last Name",name:"lastname",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Email",name:"email",type:"email",fullWidth:!0,sx:{"& .MuiFormHelperText-root.Mui-error":{opacity:1}}})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Phone",name:"phone",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Company Name",name:"company_name",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Website",name:"website",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"VAT Number",name:"vat_number",fullWidth:!0})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(l,{label:"Company Address",name:"company_address_address",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(t,{label:"Country",name:"company_address_country_id",sx:{minWidth:230},required:!0,options:a,onChange:i=>{p(i)}})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"City",name:"company_address_city"})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(t,{label:"State",name:"company_address_zone_id",sx:{minWidth:230},options:d==null?void 0:d.map(i=>({id:i.area_code,label:i.area_name_en}))})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Postal Code",name:"company_address_postcode"})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(l,{label:"Company Address",name:"company_address_address",fullWidth:!0})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(t,{label:"Country",name:"bill_to_country_id",sx:{minWidth:230},required:!0,options:a,onChange:i=>{j(i)}})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"City",name:"bill_to_city"})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(t,{label:"State",name:"bill_to_zone_id",sx:{minWidth:230},options:u==null?void 0:u.map(i=>({id:i.id,label:i.area_name_en}))})}),e.jsx(r,{item:!0,xs:3,children:e.jsx(l,{required:!0,label:"Postal Code",name:"bill_to_postcode"})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(l,{required:!0,label:"Billing Address",name:"bill_to_address",fullWidth:!0})}),e.jsx(r,{item:!0,xs:4,children:e.jsx(t,{label:"Annual Sales",name:"annual_sales",required:!0,options:[{label:">10billion",id:">10billion"},{label:"1billion~10billion",id:"1billion~10billion"},{label:"5million~1billion",id:"5million~1billion"},{label:"3million~5million",id:"3million~5million"},{label:"1million~3million",id:"1million~3million"},{label:"1~1million",id:"1~1million"},{label:"0",id:"0"}],fullWidth:!0})}),e.jsx(r,{item:!0,xs:4,children:e.jsx(t,{label:"Number of Employees",name:"number_of_employees",required:!0,options:[{label:">500",id:">500"},{label:"100~500",id:"100~500"},{label:"5million~1billion",id:"5million~1billion"},{label:"50~100",id:"50~100"},{label:"10~50",id:"10~50"},{label:"1~10",id:"1~10"}],fullWidth:!0})}),e.jsx(r,{item:!0,xs:4,children:e.jsx(t,{label:"Cooperation Method",name:"method",required:!0,options:[{label:"Dropship Order",id:"Dropship Order"},{label:"Batch Order",id:"Batch Order"},{label:"Both",id:"Both"}],fullWidth:!0})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(m,{label:"Category of Interest",name:"interest_category_ids",row:!0,required:!0,options:o==null?void 0:o.map(i=>({label:i.name,id:i.id})),helperText:" "})}),e.jsx(r,{item:!0,xs:12,pt:"0!important",children:e.jsx(m,{label:"Main Sales Channels",name:"sales",row:!0,required:!0,options:[{id:"E-commerce",label:"E-commerce"},{id:"Chain store",label:"Chain store"},{id:"Engineering contractor",label:"Engineering contractor"},{id:"Wholesaler",label:"Wholesaler"},{id:"Distributor",label:"Distributor"}],helperText:" "})}),e.jsxs(r,{item:!0,xs:12,display:"flex",pt:"0!important",children:[e.jsx(m,{label:"How to know",name:"Vasagle",row:!0,required:!0,options:[{id:"Vasagle",label:"vasagleb2b.com"},{id:"Feandrea",label:"songmicshome.com"}],helperText:" "}),e.jsxs(n,{mr:"40px",children:[e.jsx(b,{children:" "}),e.jsx(l,{label:"Other websites",name:"websites"})]}),e.jsxs(n,{children:[e.jsx(b,{children:" "}),e.jsx(l,{label:"Sales recommended",name:"recommended"})]})]}),e.jsx(r,{item:!0,xs:12,children:e.jsx(q,{label:"Your Message",name:"message",multiline:!0,rows:5,size:"medium",fullWidth:!0,placeholder:"Max 800 characters"})}),e.jsx(r,{item:!0,xs:12,children:e.jsx(C,{name:"agree",label:e.jsxs(n,{children:["By creating an account, you are agreeing to our Terms of Use and Privacy Policy."," ",e.jsx(g,{color:"secondary",component:"span",children:"*"})]}),required:!0})})]}),e.jsx(n,{textAlign:"center",width:"100%",mt:3,children:e.jsx(_,{type:"submit",color:"success",size:"large",sx:{width:240},children:"REGISTER"})})]})]})}export{F as default};
