import{a5 as a}from"./index-736c7350.js";const n=async t=>a({method:"POST",url:"/api/account/login",data:t,showError:!0}).then(r=>r.data),o=async t=>a({method:"POST",url:"/api/account/getEyaUsers",data:{customerTypeCode:t}}).then(r=>r.data),s=async()=>a({method:"POST",url:"/api/account/getLoginUser"}).then(t=>t.data);export{s as a,o as g,n as l};