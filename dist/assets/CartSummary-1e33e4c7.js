import{j as e,P as p,T as o,B as x,b as j,s as d}from"./index-736c7350.js";import{a as c}from"./format-122126ae.js";import{l as f}from"./index-d2f8e32e.js";const i=d("li")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  border-bottom: 1px dashed rgba(102, 102, 102, 0.2);
  & > span {
    color: ${l=>l.theme.palette.text.secondary};
    font-weight: 500;
  }
`,r=d("span")`
  font-size: 1.2rem;
`,n=d("span")`
  font-size: 1.4rem;
`;function m(l){const{summary:t,type:s="cart",onPlaceOrder:a,sx:h}=l;return e.jsxs(p,{elevation:4,sx:{position:"sticky",top:15,width:280,padding:"10px 25px 36px",height:"fit-content",...h},children:[e.jsx(o,{textAlign:"center",fontWeight:500,color:"primary",paddingBottom:"10px",borderBottom:"1px solid rgba(102,102,102,.2)",children:"CART SUMMARY"}),e.jsxs(x,{component:"ul",children:[e.jsxs(i,{children:[e.jsx(r,{children:"Selected Items"}),e.jsx(n,{children:t==null?void 0:t.count})]}),e.jsxs(i,{children:[e.jsx(r,{children:"Subtotal"}),e.jsx(n,{children:c(t==null?void 0:t.totalPrice)})]}),s=="checkout"&&e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx(r,{children:"Tax"}),e.jsx(n,{children:c(t==null?void 0:t.taxPrice)})]}),e.jsxs(i,{children:[e.jsx(r,{children:"Order Total"}),e.jsx(n,{children:e.jsx(o,{color:"secondary",fontSize:"1.4rem",fontWeight:700,children:c(t==null?void 0:t.totalPrice)})})]})]}),e.jsx(i,{children:e.jsxs(o,{color:"secondary",fontSize:"1.2rem",textAlign:"center",width:"100%",children:[s=="checkout"&&"Shipping Not Included",s=="cart"&&"Tax and Shipping Not Included"]})}),s=="checkout"&&e.jsxs(e.Fragment,{children:[e.jsxs(i,{children:[e.jsx(r,{children:"Price term"}),e.jsx(n,{children:t==null?void 0:t.tradeClauseCodePrice})]}),e.jsxs(i,{children:[e.jsx(r,{children:e.jsxs(x,{sx:{display:"flex"},children:[e.jsx(o,{color:"secondary",children:"*"}),"Trade term"]})}),e.jsx(n,{children:e.jsx(f,{name:"tradeClauseCode",required:!0,options:[{id:"EXW",label:"EXW"},{id:"DDP",label:"DDP"},{id:"DDU",label:"DDU"}],sx:{width:"77px",fontSize:"1.2rem","& .MuiInputBase-root":{height:"25px"},"& .MuiFormHelperText-root, .MuiFormLabel-asterisk":{display:"none"},"& .MuiInputBase-input":{fontSize:"1.2rem"}}})})]})]})]}),e.jsx(j,{size:"medium",fullWidth:!0,sx:{marginTop:"25px"},onClick:a,type:"submit",disabled:Number(t==null?void 0:t.totalPrice)<=0,children:"PLACE ORDER"})]})}export{m as C};
