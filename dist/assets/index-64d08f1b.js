import{d as j,j as e,P as s,B as o,T as n,b as p,s as i}from"./index-736c7350.js";import{A as y}from"./AccountWrapper-03ffa386.js";import{a as u}from"./format-122126ae.js";import{D as m}from"./pdf-download-188a0ff4.js";import{c as w}from"./account-7328c4f5.js";const b="/assets/csv-c2b48baf.svg",T="/assets/xls-02b3d587.svg",r=i(s)`
  width: ${t=>(t==null?void 0:t.width)??220}px;
  height: 120px;
  padding: 20px 20px 30px 20px;
`,l=i("p")`
  font-size: 1.2rem;
  color: ${t=>t.theme.palette.primary.main};
  font-weight: 500;
`,d=i("p")`
  color: ${t=>t.theme.palette.text.secondary};
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 20px;
`,c=i(s)`
  margin-top: 50px;
  padding: 20px;
`,a=i("p")`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${t=>t.theme.palette.primary.main};
  margin-bottom: 9px;
`,f=i(s)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 25px;
  width: 190;
  height: 160;
  background: #f8f9fa;
`,g=i("p")`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${t=>t.theme.palette.text.secondary};
`;i("ul")`
  & .table-head {
    color: ${t=>t.theme.palette.primary.light};
  }
  li {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${t=>t.theme.palette.text.secondary};
    padding: 8px 0;
    border-bottom: 1px solid rgba(102, 102, 102, 0.2);
    :last-child {
      border-bottom: 0;
    }
    span {
      flex: 0 0 auto;
      box-sizing: border-box;
      padding-right: 10px;
      :nth-of-type(1) {
        width: 40%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :nth-of-type(2) {
        width: 20%;
      }
      :nth-of-type(3) {
        width: 15%;
      }
      :nth-of-type(4) {
        width: 25%;
        padding-right: 0;
      }
    }
  }
`;function z(){var x;const{data:t}=j(w);return e.jsxs(y,{children:[e.jsx(s,{sx:h=>({background:h.palette.primary.light,height:"150px",padding:"20px 30px 20px 40px",color:h.palette.common.white}),children:e.jsxs(o,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[e.jsxs(n,{fontSize:"2.0rem",fontWeight:700,children:["Hello ",(x=t==null?void 0:t.user)==null?void 0:x.company_name,"!"]}),e.jsx(n,{fontSize:"1.6rem",fontWeight:500,children:"Welcome to ZIEL Global Distributor System"})]})}),e.jsxs(o,{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 30px",marginTop:"-40px",children:[e.jsxs(r,{children:[e.jsx(l,{children:"TOTAL ORDERS"}),e.jsx(d,{children:t==null?void 0:t.order_count})]}),e.jsxs(r,{width:300,children:[e.jsx(l,{children:"TOTAL AMOUNTS"}),e.jsx(d,{children:u(t==null?void 0:t.order_total_price)})]}),e.jsxs(r,{children:[e.jsx(l,{children:"TOTAL UNITS"}),e.jsx(d,{children:t==null?void 0:t.order_snaps_count})]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"Document DOWNLOAD"}),e.jsxs(o,{display:"flex",justifyContent:"space-evenly",children:[e.jsxs(f,{children:[e.jsx(g,{children:"PRODUCTS INFO"}),e.jsx("img",{src:b}),e.jsxs(p,{variant:"outlined",children:[e.jsx(n,{color:"#4d9ebf",fontSize:"1.2rem",fontWeight:500,sx:{marginRight:1},children:"DOWNLOAD"}),e.jsx("img",{src:m})]})]}),e.jsxs(f,{children:[e.jsx(g,{children:"STOCK TEMPLATE"}),e.jsx("img",{src:T}),e.jsxs(p,{variant:"outlined",children:[e.jsx(n,{color:"#4d9ebf",fontSize:"1.2rem",fontWeight:500,sx:{marginRight:1},children:"DOWNLOAD"}),e.jsx("img",{src:m})]})]})]})]}),e.jsxs(c,{children:[e.jsx(a,{children:"TOP ITEMS YOU BOUGHT"}),e.jsx(n,{children:"---"})]}),e.jsxs(c,{children:[e.jsx(a,{children:"TOP COOPERATIVE CUSTOMERS"}),e.jsx(n,{children:"---"})]})]})}export{z as default};
