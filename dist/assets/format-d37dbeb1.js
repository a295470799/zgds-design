import{Y as K}from"./index-3983a4e6.js";var R={},nt={get exports(){return R},set exports(v){R=v}};(function(v,Z){(function(w,p){v.exports=p()})(K,function(){var w=1e3,p=6e4,Y=36e5,F="millisecond",g="second",T="minute",f="hour",_="day",L="week",z="month",$="quarter",m="year",d="date",r="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,x=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,D={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var n=["th","st","nd","rd"],t=i%100;return"["+i+(n[(t-20)%10]||n[t]||n[0])+"]"}},M=function(i,n,t){var s=String(i);return!s||s.length>=n?i:""+Array(n+1-s.length).join(t)+i},I={s:M,z:function(i){var n=-i.utcOffset(),t=Math.abs(n),s=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+M(s,2,"0")+":"+M(e,2,"0")},m:function i(n,t){if(n.date()<t.date())return-i(t,n);var s=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(s,z),u=t-e<0,o=n.clone().add(s+(u?-1:1),z);return+(-(s+(t-e)/(u?e-o:o-e))||0)},a:function(i){return i<0?Math.ceil(i)||0:Math.floor(i)},p:function(i){return{M:z,y:m,w:L,d:_,D:d,h:f,m:T,s:g,ms:F,Q:$}[i]||String(i||"").toLowerCase().replace(/s$/,"")},u:function(i){return i===void 0}},S="en",H={};H[S]=D;var U=function(i){return i instanceof W},N=function i(n,t,s){var e;if(!n)return S;if(typeof n=="string"){var u=n.toLowerCase();H[u]&&(e=u),t&&(H[u]=t,e=u);var o=n.split("-");if(!e&&o.length>1)return i(o[0])}else{var c=n.name;H[c]=n,e=c}return!s&&e&&(S=e),e||!s&&S},l=function(i,n){if(U(i))return i.clone();var t=typeof n=="object"?n:{};return t.date=i,t.args=arguments,new W(t)},a=I;a.l=N,a.i=U,a.w=function(i,n){return l(i,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var W=function(){function i(t){this.$L=N(t.locale,null,!0),this.parse(t)}var n=i.prototype;return n.parse=function(t){this.$d=function(s){var e=s.date,u=s.utc;if(e===null)return new Date(NaN);if(a.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var o=e.match(h);if(o){var c=o[2]-1||0,O=(o[7]||"0").substring(0,3);return u?new Date(Date.UTC(o[1],c,o[3]||1,o[4]||0,o[5]||0,o[6]||0,O)):new Date(o[1],c,o[3]||1,o[4]||0,o[5]||0,o[6]||0,O)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return a},n.isValid=function(){return this.$d.toString()!==r},n.isSame=function(t,s){var e=l(t);return this.startOf(s)<=e&&e<=this.endOf(s)},n.isAfter=function(t,s){return l(t)<this.startOf(s)},n.isBefore=function(t,s){return this.endOf(s)<l(t)},n.$g=function(t,s,e){return a.u(t)?this[s]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,s){var e=this,u=!!a.u(s)||s,o=a.p(t),c=function(J,C){var k=a.w(e.$u?Date.UTC(e.$y,C,J):new Date(e.$y,C,J),e);return u?k:k.endOf(_)},O=function(J,C){return a.w(e.toDate()[J].apply(e.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(C)),e)},y=this.$W,b=this.$M,A=this.$D,j="set"+(this.$u?"UTC":"");switch(o){case m:return u?c(1,0):c(31,11);case z:return u?c(1,b):c(0,b+1);case L:var P=this.$locale().weekStart||0,B=(y<P?y+7:y)-P;return c(u?A-B:A+(6-B),b);case _:case d:return O(j+"Hours",0);case f:return O(j+"Minutes",1);case T:return O(j+"Seconds",2);case g:return O(j+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,s){var e,u=a.p(t),o="set"+(this.$u?"UTC":""),c=(e={},e[_]=o+"Date",e[d]=o+"Date",e[z]=o+"Month",e[m]=o+"FullYear",e[f]=o+"Hours",e[T]=o+"Minutes",e[g]=o+"Seconds",e[F]=o+"Milliseconds",e)[u],O=u===_?this.$D+(s-this.$W):s;if(u===z||u===m){var y=this.clone().set(d,1);y.$d[c](O),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else c&&this.$d[c](O);return this.init(),this},n.set=function(t,s){return this.clone().$set(t,s)},n.get=function(t){return this[a.p(t)]()},n.add=function(t,s){var e,u=this;t=Number(t);var o=a.p(s),c=function(b){var A=l(u);return a.w(A.date(A.date()+Math.round(b*t)),u)};if(o===z)return this.set(z,this.$M+t);if(o===m)return this.set(m,this.$y+t);if(o===_)return c(1);if(o===L)return c(7);var O=(e={},e[T]=p,e[f]=Y,e[g]=w,e)[o]||1,y=this.$d.getTime()+t*O;return a.w(y,this)},n.subtract=function(t,s){return this.add(-1*t,s)},n.format=function(t){var s=this,e=this.$locale();if(!this.isValid())return e.invalidDate||r;var u=t||"YYYY-MM-DDTHH:mm:ssZ",o=a.z(this),c=this.$H,O=this.$m,y=this.$M,b=e.weekdays,A=e.months,j=function(C,k,V,G){return C&&(C[k]||C(s,u))||V[k].slice(0,G)},P=function(C){return a.s(c%12||12,C,"0")},B=e.meridiem||function(C,k,V){var G=C<12?"AM":"PM";return V?G.toLowerCase():G},J={YY:String(this.$y).slice(-2),YYYY:this.$y,M:y+1,MM:a.s(y+1,2,"0"),MMM:j(e.monthsShort,y,A,3),MMMM:j(A,y),D:this.$D,DD:a.s(this.$D,2,"0"),d:String(this.$W),dd:j(e.weekdaysMin,this.$W,b,2),ddd:j(e.weekdaysShort,this.$W,b,3),dddd:b[this.$W],H:String(c),HH:a.s(c,2,"0"),h:P(1),hh:P(2),a:B(c,O,!0),A:B(c,O,!1),m:String(O),mm:a.s(O,2,"0"),s:String(this.$s),ss:a.s(this.$s,2,"0"),SSS:a.s(this.$ms,3,"0"),Z:o};return u.replace(x,function(C,k){return k||J[C]||o.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,s,e){var u,o=a.p(s),c=l(t),O=(c.utcOffset()-this.utcOffset())*p,y=this-c,b=a.m(this,c);return b=(u={},u[m]=b/12,u[z]=b,u[$]=b/3,u[L]=(y-O)/6048e5,u[_]=(y-O)/864e5,u[f]=y/Y,u[T]=y/p,u[g]=y/w,u)[o]||y,e?b:a.a(b)},n.daysInMonth=function(){return this.endOf(z).$D},n.$locale=function(){return H[this.$L]},n.locale=function(t,s){if(!t)return this.$L;var e=this.clone(),u=N(t,s,!0);return u&&(e.$L=u),e},n.clone=function(){return a.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},i}(),X=W.prototype;return l.prototype=X,[["$ms",F],["$s",g],["$m",T],["$H",f],["$W",_],["$M",z],["$y",m],["$D",d]].forEach(function(i){X[i[1]]=function(n){return this.$g(n,i[0],i[1])}}),l.extend=function(i,n){return i.$i||(i(n,W,l),i.$i=!0),l},l.locale=N,l.isDayjs=U,l.unix=function(i){return l(1e3*i)},l.en=H[S],l.Ls=H,l.p={},l})})(nt);const E=R;var q={},rt={get exports(){return q},set exports(v){q=v}};(function(v,Z){(function(w,p){v.exports=p()})(K,function(){var w={year:0,month:1,day:2,hour:3,minute:4,second:5},p={};return function(Y,F,g){var T,f=function($,m,d){d===void 0&&(d={});var r=new Date($),h=function(x,D){D===void 0&&(D={});var M=D.timeZoneName||"short",I=x+"|"+M,S=p[I];return S||(S=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:x,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:M}),p[I]=S),S}(m,d);return h.formatToParts(r)},_=function($,m){for(var d=f($,m),r=[],h=0;h<d.length;h+=1){var x=d[h],D=x.type,M=x.value,I=w[D];I>=0&&(r[I]=parseInt(M,10))}var S=r[3],H=S===24?0:S,U=r[0]+"-"+r[1]+"-"+r[2]+" "+H+":"+r[4]+":"+r[5]+":000",N=+$;return(g.utc(U).valueOf()-(N-=N%1e3))/6e4},L=F.prototype;L.tz=function($,m){$===void 0&&($=T);var d=this.utcOffset(),r=this.toDate(),h=r.toLocaleString("en-US",{timeZone:$}),x=Math.round((r-new Date(h))/1e3/60),D=g(h).$set("millisecond",this.$ms).utcOffset(15*-Math.round(r.getTimezoneOffset()/15)-x,!0);if(m){var M=D.utcOffset();D=D.add(d-M,"minute")}return D.$x.$timezone=$,D},L.offsetName=function($){var m=this.$x.$timezone||g.tz.guess(),d=f(this.valueOf(),m,{timeZoneName:$}).find(function(r){return r.type.toLowerCase()==="timezonename"});return d&&d.value};var z=L.startOf;L.startOf=function($,m){if(!this.$x||!this.$x.$timezone)return z.call(this,$,m);var d=g(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return z.call(d,$,m).tz(this.$x.$timezone,!0)},g.tz=function($,m,d){var r=d&&m,h=d||m||T,x=_(+g(),h);if(typeof $!="string")return g($).tz(h);var D=function(H,U,N){var l=H-60*U*1e3,a=_(l,N);if(U===a)return[l,U];var W=_(l-=60*(a-U)*1e3,N);return a===W?[l,a]:[H-60*Math.min(a,W)*1e3,Math.max(a,W)]}(g.utc($,r).valueOf(),x,h),M=D[0],I=D[1],S=g(M).utcOffset(I);return S.$x.$timezone=h,S},g.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},g.tz.setDefault=function($){T=$}}})})(rt);const tt=q;var Q={},it={get exports(){return Q},set exports(v){Q=v}};(function(v,Z){(function(w,p){v.exports=p()})(K,function(){var w="minute",p=/[+-]\d\d(?::?\d\d)?/g,Y=/([+-]|\d\d)/g;return function(F,g,T){var f=g.prototype;T.utc=function(r){var h={date:r,utc:!0,args:arguments};return new g(h)},f.utc=function(r){var h=T(this.toDate(),{locale:this.$L,utc:!0});return r?h.add(this.utcOffset(),w):h},f.local=function(){return T(this.toDate(),{locale:this.$L,utc:!1})};var _=f.parse;f.parse=function(r){r.utc&&(this.$u=!0),this.$utils().u(r.$offset)||(this.$offset=r.$offset),_.call(this,r)};var L=f.init;f.init=function(){if(this.$u){var r=this.$d;this.$y=r.getUTCFullYear(),this.$M=r.getUTCMonth(),this.$D=r.getUTCDate(),this.$W=r.getUTCDay(),this.$H=r.getUTCHours(),this.$m=r.getUTCMinutes(),this.$s=r.getUTCSeconds(),this.$ms=r.getUTCMilliseconds()}else L.call(this)};var z=f.utcOffset;f.utcOffset=function(r,h){var x=this.$utils().u;if(x(r))return this.$u?0:x(this.$offset)?z.call(this):this.$offset;if(typeof r=="string"&&(r=function(S){S===void 0&&(S="");var H=S.match(p);if(!H)return null;var U=(""+H[0]).match(Y)||["-",0,0],N=U[0],l=60*+U[1]+ +U[2];return l===0?0:N==="+"?l:-l}(r),r===null))return this;var D=Math.abs(r)<=16?60*r:r,M=this;if(h)return M.$offset=D,M.$u=r===0,M;if(r!==0){var I=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(M=this.local().add(D+I,w)).$offset=D,M.$x.$localOffset=I}else M=this.utc();return M};var $=f.format;f.format=function(r){var h=r||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return $.call(this,h)},f.valueOf=function(){var r=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*r},f.isUTC=function(){return!!this.$u},f.toISOString=function(){return this.toDate().toISOString()},f.toString=function(){return this.toDate().toUTCString()};var m=f.toDate;f.toDate=function(r){return r==="s"&&this.$offset?T(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():m.call(this)};var d=f.diff;f.diff=function(r,h,x){if(r&&this.$u===r.$u)return d.call(this,r,h,x);var D=this.local(),M=T(r).local();return d.call(D,M,h,x)}}})})(it);const et=Q,ot=(v,Z="eu")=>{const w=typeof v=="string"?Number(v):v;return Z==="us"?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(w??0):Z==="uk"?new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(w??0):new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(w??0)},ut=(v,Z)=>{if(v){E.extend(et),E.extend(tt);const w=E(),p=Intl.DateTimeFormat().resolvedOptions().timeZone,Y=E(v).tz(p),F=w.year(Y.year()).month(Y.month()).date(Y.date()).hour(Y.hour()).minute(Y.minute()).second(Y.second()),g=Z?"YYYY-MM-DD":"YYYY-MM-DD HH:mm:ss";return F.format(g)}return""},at=v=>v?(E.extend(et),E.extend(tt),E(v).tz("Asia/Shanghai").format("YYYY-MM-DD")):"",ft=v=>new Promise((Z,w)=>{const p=new FileReader;p.onload=()=>{try{const Y=p.result,F=JSON.parse(Y);Z(F)}catch(Y){w(Y)}},p.onerror=Y=>{w(Y)},p.readAsText(v)});export{ot as a,ft as b,ut as c,at as f};