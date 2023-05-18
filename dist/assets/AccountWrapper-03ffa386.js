import{s as o,B as t,j as e,h as s,L as a}from"./index-736c7350.js";const c="/assets/dashboard-2319fd41.svg",i="/assets/dashboard-active-a9cad500.svg",d="/assets/information-56df3637.svg",l="/assets/information-active-1fc7e1e2.svg",u="/assets/orders-bcf1dfc3.svg",h="/assets/orders-active-fb3c4d04.svg",b="/assets/ci-3e76302d.svg",g="/assets/ci-active-346288fb.svg",f="/assets/wishlist-0b069e63.svg",p="/assets/wishlist-active-0a72d6d7.svg",x="/assets/sign_out-fb9d2a40.svg",v="/assets/sign_out-active-b1692d59.svg",m=o(t)`
  li {
    margin-bottom: 20px;
    &:hover,
    &.active {
      background: #fff;
      box-shadow: 0 5px 8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      a {
        font-weight: 700;
      }
      &.dashboard a::before {
        background: url(${i}) no-repeat center;
      }
      &.information a::before {
        background: url(${l}) no-repeat center;
      }
      &.orders a::before {
        background: url(${h}) no-repeat center;
      }
      &.ci a::before {
        background: url(${g}) no-repeat center;
      }
      &.wishlist a::before {
        background: url(${p}) no-repeat center;
      }
      &.sign-out a::before {
        background: url(${v}) no-repeat center;
      }
    }
    &.dashboard a::before {
      background: url(${c}) no-repeat center;
    }
    &.information a::before {
      background: url(${d}) no-repeat center;
    }
    &.orders a::before {
      background: url(${u}) no-repeat center;
    }
    &.ci a::before {
      background: url(${b}) no-repeat center;
    }
    &.wishlist a::before {
      background: url(${f}) no-repeat center;
    }
    &.sign-out a::before {
      background: url(${x}) no-repeat center;
    }
    a {
      display: flex;
      align-items: center;
      width: 200px;
      height: 42px;
      padding-left: 10px;
      color: ${r=>r.theme.palette.primary.main};
      font-size: 1.2rem;
      font-weight: 500;
      ::before {
        content: "";
        width: 30px;
        height: 30px;
        margin-right: 14px;
      }
    }
  }
`,$=r=>{const{code:n="dashboard"}=r;return e.jsx(m,{width:"200px",children:e.jsxs("ul",{children:[e.jsx("li",{className:`dashboard${n=="dashboard"?" active":""}`,children:e.jsx(s,{href:"/account",underline:"none",children:"Dashboard"})}),e.jsx("li",{className:`information${n=="information"?" active":""}`,children:e.jsx(s,{href:"/account/information",underline:"none",children:"Account Information"})}),e.jsx("li",{className:`orders${n=="orders"?" active":""}`,children:e.jsx(s,{href:"/account/orders",underline:"none",children:"My Orders"})}),e.jsx("li",{className:`ci${n=="ci"?" active":""}`,children:e.jsx(s,{href:"/account/ciManagement",underline:"none",children:"CI Management"})}),e.jsx("li",{className:`wishlist${n=="wishlist"?" active":""}`,children:e.jsx(s,{href:"/account/wishlist",underline:"none",children:"My Wishlist"})}),e.jsx("li",{className:`sign-out${n=="signout"?" active":""}`,children:e.jsx(s,{href:"#",underline:"none",children:"Sign Out"})})]})})},j=r=>e.jsxs(a,{title:r.title??"My Account",spaceBetween:!0,bodyWrapperSx:n=>({background:n.palette.background.paper}),children:[e.jsx($,{code:r.code}),e.jsx(t,{width:"930px",marginBottom:3,children:r.children})]}),I=j;export{I as A};
