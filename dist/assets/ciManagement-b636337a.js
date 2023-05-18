import{r as O,j as e,D as v,a as F,B as l,s as M,b as I,T as S,e as T,u as z,q as R,c as _,P as k}from"./index-7fc42087.js";import{A as G}from"./AccountWrapper-5da3dd84.js";import{d as B,g as E,a as L}from"./account-46570069.js";import{f as U,b as W,a as K,c as Z}from"./format-97287686.js";import{A as j,z as q,M as A,C as H}from"./CheckSquare-r-40e57cf3.js";import{K as V,C as Q,G as J,M as Y}from"./index-74fd18b7.js";import{u as $}from"./index-8757bede.js";import{T as X,a as w}from"./Tabs-bd82aa97.js";import{D as ee}from"./DialogContent-5deca1de.js";import{T as ae,S as re}from"./TextField-916ee773.js";import{P as te}from"./Pagination-fa08d295.js";function P(f){const{children:o,value:u,index:t,...C}=f;return e.jsx("div",{role:"tabpanel",hidden:u!==t,...C,children:u===t&&e.jsx(l,{width:980,children:o})})}const oe=f=>{const{open:o,onClose:u,detailData:t=[],partnersData:C=[],detailOptions:D,partnersOptions:y}=f,[N,b]=O.useState(0),n=(i,p)=>{b(p)};return e.jsxs(v,{open:o,maxWidth:"lg",children:[e.jsx(F,{onClose:u,children:e.jsx(l,{sx:{borderBottom:1,borderColor:"divider"},children:e.jsxs(X,{value:N,onChange:n,children:[e.jsx(w,{label:"CI Detail"}),e.jsx(w,{label:"Partners"})]})})}),e.jsxs(ee,{children:[e.jsx(P,{value:N,index:0,children:e.jsx(l,{width:980,height:370,className:"ag-theme-alpine",sx:i=>({".ag-header-cell-text, .ag-cell-value, .ag-group-value":{color:i.palette.text.third}}),children:e.jsx(j,{rowData:t,gridOptions:D,onFirstDataRendered:i=>{var g,h,x;const p=((h=(g=i.columnApi)==null?void 0:g.getColumns())==null?void 0:h.map(a=>a.getId()))??[];(x=i.columnApi)==null||x.autoSizeColumns(p,!1)}})})}),e.jsx(P,{value:N,index:1,children:e.jsx(l,{width:980,height:370,className:"ag-theme-alpine",sx:i=>({".ag-header-cell-text, .ag-cell-value, .ag-group-value":{color:i.palette.text.third}}),children:e.jsx(j,{rowData:C,gridOptions:y,onFirstDataRendered:i=>{var g,h,x;const p=((h=(g=i.columnApi)==null?void 0:g.getColumns())==null?void 0:h.map(a=>a.getId()))??[];(x=i.columnApi)==null||x.autoSizeColumns(p,!1)}})})})]})]})},ie=M(I)`
  height: 22px;
  font-size: 1.2rem;
  padding: 0 10px;
  min-width: auto;
  font-weight: 400;
`,ne=f=>{var h,x;const{rowData:o,onChange:u}=f,t=a=>K(a.value),C=a=>Z(a.value,!0),D=async a=>{i({open:!0,gridDetailData:[],gridPartnersData:[]});const r=await E(a);i({gridDetailData:r.items,gridPartnersData:r.partners})},y=[{field:"invoiceNumber",headerName:"CI NO.",width:200,checkboxSelection:!0,headerCheckboxSelection:!0},{headerName:"Action",cellRenderer:a=>e.jsx(l,{children:e.jsx(ie,{color:"primary",onClick:()=>D(a.data.invoiceNumber),children:"Detail"})})},{field:"orderNumber",headerName:"Order"},{field:"orderId",headerName:"Order ID"},{field:"oldOrderId",headerName:"Order ID (old)"},{field:"oldInvoiceNumber",headerName:"CI NO. (old)"},{field:"customContractId",headerName:"PO NO."},{field:"customerName",headerName:"Client name"},{field:"invoiceBusinessTypeValue",headerName:"Invoice type"},{field:"currencyCode",headerName:"Currency"},{field:"fromCountryCode",headerName:"From country"},{field:"fromProvinceCode",headerName:"From province"},{field:"destCountryCode",headerName:"To country"},{field:"destProvinceCode",headerName:"To province"},{field:"paymentConditionValue",headerName:"Price term"},{field:"tradeClauseCode",headerName:"Trade term"},{field:"orderTotalAmount",headerName:"Order total",valueFormatter:t},{field:"orderTaxAmount",headerName:"Tax",valueFormatter:t},{field:"orderTaxRadio",headerName:"Tax rate"},{field:"orderFreight",headerName:"Shipping",valueFormatter:t},{field:"invoiceDate",headerName:"Invoice Date",sortable:!0,unSortIcon:!0,valueFormatter:C}],N=[{field:"orderId",headerName:"Order ID"},{field:"invoiceNumberCode",headerName:"CI NO."},{field:"productMainCode",headerName:"SKU"},{field:"productNameEn",headerName:"Product"},{field:"skuNumber",headerName:"Qty"},{field:"customDisplayCode",headerName:"Customer's SKU"},{field:"excludingTaxPrices",headerName:"ex.Tax Total",valueFormatter:t},{field:"skuFreight",headerName:"Shipping",valueFormatter:t},{field:"skuTaxAmount",headerName:"Tax",valueFormatter:t},{field:"includingTaxPrices",headerName:"incl.Tax Total",valueFormatter:t},{field:"skuTaxRadio",headerName:"Tax rate"},{field:"sellingPrice",headerName:"Selling Price",valueFormatter:t},{field:"includeTaxPrice",headerName:"incl.Tax Unit",valueFormatter:t},{field:"excludeTaxPrice",headerName:"ex.Tax Unit",valueFormatter:t}],b=[{field:"partnerType",headerName:"Partner type"},{field:"partnerName",headerName:"Partner name"},{field:"contractName",headerName:"Contact name"},{field:"contractAddress1",headerName:"Add1"},{field:"contractAddress2",headerName:"Add2"},{field:"contractPhone",headerName:"Phone"},{field:"contractEmail",headerName:"Mail"},{field:"contractCountryCode",headerName:"Country"},{field:"contractStateyCode",headerName:"Province"},{field:"contractCityCode",headerName:"City"},{field:"contractPostalCode",headerName:"Postcode"}],[n,i]=$({open:!1,params:{page:1,page_size:50},gridOptions:{defaultColDef:{initialWidth:160,resizable:!0},rowSelection:"multiple",ensureDomOrder:!0,enableCellTextSelection:!0,multiSortKey:"ctrl",onSortChanged:u,columnDefs:y},gridDetailOptions:{defaultColDef:{initialWidth:140,resizable:!0,filter:!0,sortable:!0,floatingFilter:!0},ensureDomOrder:!0,enableCellTextSelection:!0,columnDefs:N,rowData:[]},gridPartnersOptions:{defaultColDef:{initialWidth:140,resizable:!0},ensureDomOrder:!0,enableCellTextSelection:!0,columnDefs:b,rowData:[]}}),p=a=>{const r={...n.params,...a};Array.isArray(r.search_date)&&r.search_date.length>0&&(r.search_date=r.search_date.filter(d=>d).map(d=>U(d))),i({params:r}),u(r)},g=async()=>{var r,d;const a=(r=n.gridOptions.api)==null?void 0:r.getSelectedRows().map(s=>s.id);if(Array.isArray(a)&&a.length>0){const s=await B(a);if(((d=s==null?void 0:s.data)==null?void 0:d.type)=="application/pdf"){const c=window.URL.createObjectURL(new Blob([s.data])),m=document.createElement("a");m.href=c,m.setAttribute("download",`${Math.round(new Date().valueOf()/1e3)}.pdf`),document.body.appendChild(m),m.click()}else W(s.data).then(c=>{T((c==null?void 0:c.message)||"System busy, please retry",{variant:"error"})}).catch(c=>{console.error(c),T("System busy, please retry",{variant:"error"})})}};return e.jsxs(e.Fragment,{children:[e.jsx(V,{onSuccess:p,values:{ship_to:[],freeFaxNumber:[]},children:e.jsxs(l,{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",padding:"0 20px",columnGap:"25px",sx:{"& .MuiFormHelperText-root":{display:"none"}},children:[e.jsxs(l,{display:"flex",flexWrap:"wrap",justifyContent:"space-between",flex:1,sx:{"> .MuiFormControl-root":{marginTop:"15px"}},children:[e.jsx(l,{width:"48%",marginTop:"15px",sx:{"& .mui__clear_icon":{"&::after":{content:'""',width:"20px",height:"20px",padding:"3px",background:"url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzcwNzA3MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiPjwvcGF0aD4KPC9zdmc+)"},"&:hover::after":{backgroundColor:"rgba(0, 0, 0, 0.04)"}}},children:e.jsx(Q,{name:"search_date",render:({field:{value:a,onChange:r,ref:d}})=>e.jsx(q,{selected:a==null?void 0:a[0],onChange:r,startDate:a==null?void 0:a[0],endDate:a==null?void 0:a[1],selectsRange:!0,customInput:e.jsx(ae,{label:"Invoice Date",value:a??"",inputRef:d,InputProps:{autoComplete:"off"},fullWidth:!0}),dateFormat:"yyyy/MM/dd",monthsShown:2,showMonthDropdown:!0,showYearDropdown:!0,dropdownMode:"select",dateFormatCalendar:"yyyy/MM/dd",isClearable:!0,clearButtonTitle:"Clear",clearButtonClassName:"mui__clear_icon"})})}),e.jsx(l,{width:"48%",marginTop:"15px",children:e.jsx(A,{name:"ship_to",options:[{id:"DE",label:"DE"},{id:"FR",label:"FR"},{id:"FI",label:"FI"},{id:"GR",label:"GR"}],label:"Ship to"})}),e.jsx(l,{width:"48%",marginTop:"15px",children:e.jsx(A,{name:"freeFaxNumber",options:[{id:"DE266182271",label:"DE266182271"}],label:"VAT NO"})}),e.jsx(J,{sx:{width:"48%"},name:"keyword",label:"Search for",type:"search",placeholder:"Input CI NO./Order/Order ID",InputProps:{autoComplete:"off"}})]}),e.jsx(I,{type:"submit",color:"success",size:"medium",children:"Search"})]})}),e.jsx(l,{display:"flex",columnGap:2,padding:"20px 20px 0",children:e.jsxs(I,{color:"success",size:"medium",onClick:g,children:[e.jsx("img",{src:H,style:{marginRight:"5px"}}),"Download CI PDF"]})}),e.jsx(l,{width:930,height:500,className:"ag-theme-alpine",marginTop:"20px",sx:a=>({".ag-header-cell-text, .ag-cell-value, .ag-group-value":{color:a.palette.text.third}}),children:e.jsx(j,{rowData:o==null?void 0:o.data,onGridReady:()=>u(n.params),gridOptions:n.gridOptions,onSortChanged:a=>{var d,s,c;var r=(c=(s=(d=n.gridOptions)==null?void 0:d.columnApi)==null?void 0:s.getColumnState())==null?void 0:c.filter(function(m){return m.sort!=null}).map(function(m){return{name:m.colId,order:m.sort}});p({sort:r??[]})},onFirstDataRendered:a=>{var d,s,c;const r=((s=(d=a.columnApi)==null?void 0:d.getColumns())==null?void 0:s.map(m=>m.getId()))??[];(c=a.columnApi)==null||c.autoSizeColumns(r,!1)}})}),e.jsxs(l,{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",children:[e.jsxs(l,{display:"flex",alignItems:"center",columnGap:1,children:[e.jsx(S,{fontSize:"1.4rem",children:"View"}),e.jsx(re,{sx:{height:"30px",fontSize:"1.4rem"},value:(h=n.params)==null?void 0:h.page_size,onChange:a=>{p({page:1,page_size:a.target.value})},children:[50,100,200,300,500].map(a=>e.jsx(Y,{value:a,children:a},a))}),e.jsx(S,{fontSize:"1.4rem",children:"Per Page"})]}),(o==null?void 0:o.last_page)&&e.jsx(te,{count:o==null?void 0:o.last_page,variant:"outlined",shape:"rounded",onChange:(a,r)=>{p({page:r})},defaultPage:Number((x=n.params)==null?void 0:x.page)??1})]}),e.jsx(oe,{open:n.open,onClose:()=>i({open:!1}),detailOptions:n.gridDetailOptions,partnersOptions:n.gridPartnersOptions,detailData:n.gridDetailData,partnersData:n.gridPartnersData})]})},de=ne;function Ne(){var t;const f=z();(t=R.parse(f.search))==null||t.type;const{data:o,runAsync:u}=_(L,{manual:!0});return e.jsx(G,{code:"ci",children:e.jsx(k,{children:e.jsx(de,{rowData:o,onChange:u})})})}export{Ne as default};