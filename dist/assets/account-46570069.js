import{a5 as r}from"./index-7fc42087.js";const n=async t=>r({method:"POST",url:"/api/account/getInvoicesPaginate",data:t}).then(a=>a.data),o=async t=>r({method:"POST",url:"/api/account/getInvoice",data:{invoiceNumber:t},showError:!0}).then(a=>a.data),s=async t=>r({method:"POST",url:"/api/account/getWishList",data:t}).then(a=>a.data),u=async t=>r({method:"POST",url:"/api/account/deleteWish",data:{product_id:t},showError:!0}).then(a=>a.data),c=async t=>r({method:"POST",url:"/api/account/addWish",data:{product_id:t},showError:!0}).then(a=>a.data),d=async t=>r({method:"POST",url:"/api/account/feedback",data:t,showError:!0}).then(a=>a.data),h=async()=>r({method:"POST",url:"/api/account/getDashboard"}).then(t=>t.data),i=async()=>r({method:"POST",url:"/api/account/getInformation"}).then(t=>t.data),p=async t=>r({method:"POST",url:"/api/account/updateFirstName",data:{firstname:t},showError:!0}).then(a=>a.data),m=async t=>r({method:"POST",url:"/api/account/updateLastName",data:{lastname:t},showError:!0}).then(a=>a.data),l=async t=>r({method:"POST",url:"/api/account/updateEmail",data:{email:t},showError:!0}).then(a=>a.data),P=async t=>r({method:"POST",url:"/api/account/updatePassword",data:t,showError:!0}).then(a=>a.data),w=async t=>r({method:"POST",url:"/api/account/downPiInvoice",responseType:"blob",data:{ids:t},showError:!0}).then(a=>a),y=async t=>r({method:"POST",url:"/api/account/downCiInvoice",responseType:"blob",data:{ids:t},showError:!0}).then(a=>a);export{n as a,h as b,i as c,y as d,l as e,m as f,o as g,p as h,w as i,s as j,d as k,c as l,u as r,P as u};