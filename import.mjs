// jsonstat-suite v3.1.7 Copyright 2021 Xavier Badosa https://jsonstat.com
function e(t){var n,i,r,l,a=function(e,t){var n,i=[];if("string"==typeof e&&(e=[e]),Array.isArray(e)){if(e.length===t)return e;if(1===e.length){for(n=0;n<t;n++)i.push(e[0]);return i}}for(n=0;n<t;n++){var r=void 0===e[n]?null:e[n];i.push(r)}return i};if(this.length=0,this.id=[],null!=t)switch(this.class=t.class||"bundle",this.class){case"bundle":var s=[],o=0;if(this.error=null,this.length=0,null===t||"object"!=typeof t)return void(this.class=null);if(t.hasOwnProperty("error"))return void(this.error=t.error);if("dataset"===t.class||"collection"===t.class||"dimension"===t.class)return new e(t);for(i in t)o++,s.push(i);this.__tree__=t,this.length=o,this.id=s;break;case"dataset":t.hasOwnProperty("__tree__")?this.__tree__=n=t.__tree__:this.__tree__=n=t,this.label=n.label||null,this.note=n.note||null,this.link=n.link||null,this.href=n.href||null,this.updated=n.updated||null,this.source=n.source||null,this.extension=n.extension||null;var u,c=0,f=n.size||n.dimension&&n.dimension.size;if(this.size=f,this.value=n.hasOwnProperty("value")&&null!==n.value&&0!==n.value.length?n.value:{},Array.isArray(this.value))c=this.value.length;else{var h=1;for(u=f.length;u--;)h*=f[u];c=h}if(this.value=a(this.value,c),this.status=n.hasOwnProperty("status")?a(n.status,c):null,n.hasOwnProperty("dimension")){var d=n.dimension,v=n.role||!n.version&&d.role||null,p=n.id||d.id,y=f.length,g=function(e){v.hasOwnProperty(e)||(v[e]=null)};if(!Array.isArray(p)||!Array.isArray(f)||p.length!=y)return;if(this.length=y,this.id=p,v&&(g("time"),g("geo"),g("metric"),g("classification")),v&&null===v.classification){var b=[],m=["time","geo","metric"],_=function(e,t){for(var n=t.length;n--;)if(e===t[n])return!0;return!1};for(u=0;u<3;u++){var w=v[m[u]];null!==w&&(b=b.concat(w))}for(v.classification=[],u=0;u<y;u++)_(p[u],b)||v.classification.push(p[u]);0===v.classification.length&&(v.classification=null)}this.role=v,this.n=c;for(var O=0,x=this.length;O<x;O++)if(d[p[O]].category.hasOwnProperty("index")){if(Array.isArray(d[p[O]].category.index)){var E={},A=d[p[O]].category.index;for(r=A.length,l=0;l<r;l++)E[A[l]]=l;d[p[O]].category.index=E}}else{var S=0;for(i in d[p[O]].category.index={},d[p[O]].category.label)d[p[O]].category.index[i]=S++}}else this.length=0;break;case"dimension":if(!t.hasOwnProperty("__tree__"))return new e({version:"2.0",class:"dataset",dimension:{d:t},id:["d"],size:[function(e){var t=void 0===e.index?e.label:e.index;return Array.isArray(t)?t.length:Object.keys(t).length}(t.category)],value:[null]}).Dimension(0);var D=[],P=(n=t.__tree__).category;if(!n.hasOwnProperty("category"))return;if(!P.hasOwnProperty("label"))for(i in P.label={},P.index)P.label[i]=i;for(i in P.index)D[P.index[i]]=i;this.__tree__=n,this.label=n.label||null,this.note=n.note||null,this.link=n.link||null,this.href=n.href||null,this.id=D,this.length=D.length,this.role=t.role,this.hierarchy=P.hasOwnProperty("child"),this.extension=n.extension||null;break;case"category":var j=t.child;this.id=j,this.length=null===j?0:j.length,this.index=t.index,this.label=t.label,this.note=t.note||null,this.unit=t.unit,this.coordinates=t.coord;break;case"collection":if(this.length=0,this.label=t.label||null,this.note=t.note||null,this.link=t.link||null,this.href=t.href||null,this.updated=t.updated||null,this.source=t.source||null,this.extension=t.extension||null,null!==this.link&&t.link.item){var k=t.link.item;if(this.length=Array.isArray(k)?k.length:0,this.length)for(l=0;l<this.length;l++)this.id[l]=k[l].href}}}function t(e){if(!e.ok)throw new Error(e.status+" "+e.statusText);return e.json()}function n(n,i){return"object"==typeof n?new e(n):"version"===n?"1.2.7":fetch?fetch(n,i).then(t).then((function(t){return new e(t)})):void 0}function i(e,t){return null==e?null:("string"!=typeof e&&void 0!==e.length||(e=n(e)),0===e.length||"dataset"!==e.class&&"collection"!==e.class&&"bundle"!==e.class?null:"dataset"===e.class?e:e.Dataset(t))}function r(e){if(null===e||0===e.length||"dataset"!==e.class)return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n===e.n}function l(e,t,n){var i,r,l,a,s;return(t.label||n).capitalize()+(r=t,s="",(i=e)&&"metric"===i.role&&r.unit&&(l=r.unit.hasOwnProperty("label")?r.unit.label:"")+(a=r.unit.hasOwnProperty("symbol")?r.unit.symbol:"")!==""&&(s=" ("+(s=""===a?l:""===l?a:"start"===r.unit.position?a+l:l+" "+a)+")"),s)}function a(e,t,n){var i,r='<select name="'+t+'">',a=[];if(null!==n[1]){if(i=e.id,a=e.Dimension(),2===i.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var s=e.Dimension(t);if(i=s.id,a=s.Category(),1===i.length)return}return i.forEach((function(e,t){var i=e!==n[0]?"":'selected="selected" ';null!==n[1]&&e===n[1]||(r+="<option "+i+'value="'+e+'">'+l(s,a[t],e)+"</option>")})),r+="</select>"}function s(e,t,n){function s(e){void 0!==t?t.innerHTML=o[e]:window.alert(o[e])}if(void 0!==e)if(void 0!==t){void 0===n&&(n={});var o=void 0===n.i18n||void 0===n.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:n.i18n.msgs,u=void 0===n.i18n||void 0===n.i18n.locale?"en-US":n.i18n.locale,c=n.dsid||0,f=n.status||!1,h=n.tblclass||"",d=n.nonconst||!1,v=i(e,c);if(r(v)){if(d)var p=function(e){var t=0,n=e.size.slice(0),i=[];return n.forEach((function(n,r){var l=r-t,a=e.Dimension(l);1===n&&(delete e.__tree__.dimension[e.id[l]],e.size.splice(l,1),e.id.splice(l,1),e.length--,t++,i.push(a.label.capitalize()+": "+a.Category(0).label.capitalize()))})),i}(v);1!==v.length?function e(t,n,i,r){var s="",c="",h="",v="",y=i.rows,g=n.Dimension(y),b=g.id,m=i.cols,_=n.Dimension(m),w=_.id,O=n.role&&n.role.metric?n.role.metric[0]:null,x=null!==O?n.Dimension(O):null,E=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},A=i.filter,S=JSON.parse(JSON.stringify(A)),D=[],P="",j="",k=n.source?o.source+": "+n.source:"",z=null!==n.label?'<span class="label">'+n.label.capitalize()+"</span>":"";for(var N in d&&p.length&&(z='<span class="label">'+p.join(". ")+"</span>"),""!==k&&"."!==k.slice(-1)&&(k+="."),h+="<caption>"+z+"<form>",A){var C=n.Dimension(N),T=C.label?C.label.capitalize():N.capitalize();C.length>1?P+="<p>"+a(n,N,[A[N],null])+" <strong>"+T+"</strong></p>":D.push({label:T,value:l(C,C.Category(0)),name:N,id:C.id[0]})}""!==P&&(P='<fieldset id="filters"><legend>'+o.filters+"</legend>"+P+"</fieldset>"),D.forEach((function(e){j+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'})),""!==j&&(j='<fieldset id="constants"><legend>'+o.constants+"</legend>"+j+"</fieldset>"),h+=j+P+'<fieldset id="rowscols"><legend>'+o.rc+"</legend>"+a(n,"rows",[y,m])+" <a>&#x2194;</a> "+a(n,"cols",[m,y])+"</fieldset></form></caption>",v+="<tbody>";var R=Number.toLocaleString&&"none"!==u?function(e,t){return null===t?e.toLocaleString(u):e.toLocaleString(u,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};if(b.forEach((function(e){S[y]=e;var t=n.Data(S),i=function(e,t){var n,i=m!==O?null===x?null:E(x.Category(S[O])):E(_.Category(t));null!==e.value?(n=R(e.value,i),f&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||o.na,v+="<td>"+n+"</td>"};null!==t?(v+='<tr><th scope="row">'+l(g,g.Category(e))+"</th>",Array.isArray(t)?t.forEach((function(e,t){i(e,t)})):i(t,0),v+="</tr>"):v="ERROR"})),"ERROR"===v)return o.dataerror;v+="</tbody>",s+="<thead><tr><th></th>",w.forEach((function(e){s+='<th scope="col">'+l(_,_.Category(e))+"</th>"})),s+="</tr></thead>",""!==k&&(c='<tfoot><tr><td colspan="'+(w.length+1)+'">'+k+"</td></tr></tfoot>"),t.innerHTML='<table class="'+r+'">'+h+s+v+c+"</table>",[].slice.call(t.querySelectorAll("select")).forEach((function(i){i.addEventListener("change",(function(i){var l,a;e(t,n,function(e,t,n){var i={filter:{}};return n.forEach((function(e){"rows"===e.name||"cols"===e.name?i[e.name]=e.value:i.filter[e.name]=e.value})),"rowscols"===t&&e.id.forEach((function(t,n){t!==i.rows&&t!==i.cols?void 0===i.filter[t]&&(i.filter[t]=e.Dimension(n).id[0]):delete i.filter[t]})),i}(n,i.target.parentElement.getAttribute("id"),(l=t,a=[],[].slice.call(l.querySelectorAll("select, input")).forEach((function(e){a.push({name:e.name,value:e.value})})),a)),r)}),!1)})),t.querySelector("a").addEventListener("click",(function(){i.cols=y,i.rows=m,e(t,n,i,r)}),!1)}(t,v,function(e,t){var n,i,r={},l=[],a=e.id;if(t){var s="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach((function(e,t){l.push({id:a[t],len:e.length})})),l.sort(s),n=l[0].id,i=l[1].id}else n=a[0],i=a[1];return e.Dimension(n).length<e.Dimension(i).length&&(n=i+(i=n,"")),a.forEach((function(t){t!==n&&t!==i&&(r[t]=e.Dimension(t).id[0])})),{rows:n,cols:i,filter:r}}(v,n.preset),h):s("dimerror")}else s("jsonerror")}else s("selerror");else s("urierror")}function o(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",l="",a="",s=0,o=t.na||"n/a",u=t.dsid||0,c=t.vlabel||null,f=t.slabel||null,h=t.counter||!1,d=t.tblclass||"",v=t.numclass||"",p=t.valclass||"",y=t.status||!1,g=t.locale||"en-US",b=t.source||"Source",m=i(e,u),_=m.role&&m.role.metric?m.id.indexOf(m.role.metric[0]):null,w=m.Dimension({role:"metric"}),O={},x=Number.toLocaleString&&"none"!==g?function(e,t){return null===t?e.toLocaleString(g):e.toLocaleString(g,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)},E=function(e,t){var i=null;e.forEach((function(e,r){var a=D===r?' class="'+v+" "+p+'"':"",s=o;t?(_===r&&(i=O[e]),null!==e&&(s=D===r?x(e,i):e),l+="<td"+a+">"+s+"</td>"):n+="<th"+a+">"+e+"</th>"}))},A=h?function(e,t){l+="<tr>",n+="<tr>",t?l+='<td class="'+v+'">'+t+"</td>":n+='<th class="'+v+'">#</th>',E(e,t),l+="</tr>",n+="</tr>"}:function(e,t){l+="<tr>",n+="<tr>",E(e,t),l+="</tr>",n+="</tr>"};if(!r(m))return null;w&&w[0].Category().forEach((function(e){var t=e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null;O[e.label]=t}));var S=m.toTable({status:y,vlabel:c,slabel:f}),D=S[0].length-1;return S.forEach((function(e,t){A(e,t)})),m.source&&(s=m.length+1,h&&s++,y&&s++,"."!==(b+=": "+m.source).slice(-1)&&(b+="."),a='<tfoot><td colspan="'+s+'">'+b+"</td></tfoot>"),'<table class="'+d+'"><caption>'+(t.caption||m.label||"")+"</caption><thead>"+n+"</thead><tbody>"+l+"</tbody>"+a+"</table>"}function u(e,t){var n={};return Array.isArray(e[t])?(e[t].forEach((function(e,t){null!==e&&(n[String(t)]=e)})),n):e[t]}function c(e,t){if(void 0===e)return null;void 0===t&&(t={}),"boolean"!=typeof t.ovalue&&(t.ovalue=!1),"boolean"!=typeof t.ostatus&&(t.ostatus=!1),"boolean"!=typeof t.instance&&(t.instance=!1);var i=t.vlabel||"Value",r=t.slabel||"Status",l=t.type||"array",a=t.label||"",s=t.header||null,o=[],c=[],f=[],h=[],d={},v={},p=function(e,t){for(var n=1,i=0,r=0;r<O;r++)i+=(n*=r>0?t[O-r]:1)*e[O-r-1];return i},y=function(){var t=e[x][i];f[p(E,c)]=isNaN(t)?null:t};switch(l){case"array":e=function(e){for(var t=e[0],n=e.slice(1),i=[],r=0,l=n.length;r<l;r++){for(var a=0,s=t.length,o={};a<s;a++)o[t[a]]=n[r][a];i.push(o)}return i}(e);break;case"object":e=function(e){for(var t=e.cols.map((function(e){return e.id})),n=e.rows,i=[],r=0,l=n.length;r<l;r++){for(var a=0,s=t.length,o={};a<s;a++)o[t[a]]=n[r].c[a].v;i.push(o)}return i}(e)}var g,b=e.length;for(var m in t.hasOwnProperty("drop")&&Array.isArray(t.drop)&&t.drop.length&&e.forEach((function(e){t.drop.forEach((function(t){delete e[t]}))})),e[0])if(m!==i)if(m!==r){if(o.push(m),s)g=s.dimension[m],d[m]=g.category.index;else{d[m]=[];for(var _=0;_<b;_++){var w=e[_][m];-1===d[m].indexOf(w)&&d[m].push(w)}}c.push(d[m].length),v[m]={label:s?g.label:m,category:{index:d[m]}},s&&(v[m].category.label=g.category.label,g.category.unit&&(v[m].category.unit=g.category.unit))}else y=function(){var t=e[x][i],n=e[x][r];f[p(E,c)]=isNaN(t)?null:t,h[p(E,c)]=""===n?null:n};for(var O=o.length,x=0;x<b;x++){for(var E=[],A=0;A<O;A++){var S=o[A];E.push(d[S].indexOf(e[x][S]))}y()}var D={version:"2.0",class:"dataset",value:f,dimension:v,id:o,size:c};return a&&(D.label=a),h.length&&(D.status=h),s&&(s.label&&(D.label=s.label),s.source&&(D.source=s.source),s.updated&&(D.updated=s.updated),s.href&&(D.href=s.href),s.role&&(D.role=s.role)),t.ovalue&&(D.value=u(D,"value")),t.ostatus&&D.hasOwnProperty("status")&&(D.status=u(D,"status")),t.instance?n(D):D}function f(e,t){if(void 0===e)return null;void 0===t&&(t={});var n,i,r,l=[],a=null,s=null,o=!1,u={time:[],geo:[],metric:[]},f="jsonstat"===e.substring(0,8),h=f?"value":t.vlabel,d=f?"status":t.slabel,v=f?e.substring(8,9):t.delimiter||",",p=";"===v?t.decimal||",":t.decimal||".",y=function(e,t){t=t||",";for(var n,i,r=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),l=[[]],a=null;a=r.exec(e);)(i=a[1]).length&&i!=t&&l.push([]),n=a[2]?a[2].replace(new RegExp('""',"g"),'"'):a[3],l[l.length-1].push(n);return l}(e.trim(),v);if(f){for(p=y[0][1],r=y[0][2],y.shift();"data"!==y[0][0];)l.push(y.shift());y.shift(),s={dimension:{}},l.forEach((function(e){var t,n,i,l,a,c,f,h;switch(e[0]){case"dimension":if(s.dimension[e[1]]={},(l=s.dimension[e[1]]).label=e[2],l.category={},(a=l.category).index=[],n={},i=2*e[3]+3,e.length>=i){for(t=4;t<i;t++)f=e[t],h=e[++t],Object.defineProperty(n,f,{value:h,writable:!0,configurable:!0,enumerable:!0}),a.label=n,a.index.push(f);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(u[e[t]].push(e[1]),o=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(a.unit={},a.index.forEach((function(n,i){var l=e[t+i].split(r);a.unit[n]={},c=a.unit[n],void 0!==l[0]&&""!==l[0]&&(c.decimals=1*l[0]),void 0!==l[1]&&""!==l[1]&&(c.label=l[1]),void 0!==l[2]&&""!==l[2]&&(c.symbol=l[2]),void 0!==l[1]&&-1!==["start","end"].indexOf(l[3])&&(c.position=l[3])}))))}break;case"label":case"source":case"updated":case"href":s[e[0]]=e[1]||null}})),o&&(u.time.length||delete u.time,u.geo.length||delete u.geo,u.metric.length||delete u.metric,s.role=u)}if(n=y.length,i=y[0].length,void 0!==h){for(;i--;)if(y[0][i]===h){a=i;break}if(null===a)return null}else a=i-1,h=y[0][a];if(","===p)for(i=1;i<n;i++)y[i][a]=Number(y[i][a].replace(",","."));else for(i=1;i<n;i++)y[i][a]=Number(y[i][a]);return c(y,{header:s,vlabel:h,slabel:d,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1,instance:t.instance||!1})}function h(e,t){if("object"!=typeof e||!e.hasOwnProperty("dataSets")||!Array.isArray(e.dataSets))return null;if(1!==e.dataSets.length)return null;if(!e.dataSets[0].hasOwnProperty("observations"))return null;void 0===t?t={ovalue:!1,ostatus:!1,instance:!1}:("boolean"!=typeof t.ovalue&&(t.ovalue=!1),"boolean"!=typeof t.ostatus&&(t.ostatus=!1),"boolean"!=typeof t.instance&&(t.instance=!1));var i=e.structure,r=e.dataSets[0].observations,l=i.attributes.observation,a=i.dimensions;if(!a.hasOwnProperty("observation"))return null;if(a.hasOwnProperty("series")&&(null!==a.series||Object.keys(a.series).length))return null;var s=1,o=[],u=[],c={},f=[],h={time:[],geo:[]},d=function(){},v=function(e,t){for(var n=e.size,i=n.length-t.length;i--;)t.push(0);for(var r=0,l=n.length,a=0,s=1;r<l;r++)a+=(s*=r>0?n[l-r]:1)*t[l-r-1];return a},p=function(e){if(c[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":h.geo.push(e.id);break;case"TIME_PERIOD":h.time.push(e.id)}Object.defineProperty(c[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),o.push(e.id),u.push(e.values.length),s*=e.values.length;var t=c[e.id].category;e.values.forEach((function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})}))},y=e.header.links.find((function(e){return"request"===e.rel})),g=l.findIndex((function(e){return"OBS_STATUS"===e.id}));-1!==g&&(l[g].values.length?f=l[g].values:g=-1),a.observation.forEach(p),a.hasOwnProperty("dataSet")&&a.dataSet.forEach(p);var b=new Array(s),m={version:"2.0",class:"dataset",updated:e.header.prepared||null,source:e.header.sender.name||null,label:i.name||null,id:o,size:u,dimension:c,value:t.ovalue?{}:b.fill(null)};for(var _ in y&&(m.link={alternate:[{type:"application/vnd.sdmx.data+json",href:y.href}]}),h.geo.length+h.time.length>0&&(h.time.length||delete h.time,h.geo.length||delete h.geo,m.role=h),-1!==g&&(m.status=t.ostatus?{}:[],m.extension={status:{label:{}}},f.forEach((function(e){m.extension.status.label[e.id]=e.name})),d=t.ostatus?function(){var e=r[_][g];null!==e&&(m.status[v(m,w)]=f[e].id)}:function(){var e=r[_][g];m.status[v(m,w)]=null===e?null:f[e].id}),g++,r){var w=_.split(":");t.ovalue&&null===r[_][0]||(m.value[v(m,w)]=r[_][0]),d()}return t.instance?n(m):m}function d(e,t){if(void 0===e||!Array.isArray(e))return null;var i=JSON.parse(JSON.stringify(e)),r=i[0];if(!r.hasOwnProperty("version")||!r.hasOwnProperty("class")||"dataset"!==r.class)return null;void 0===t&&(t={});var l=void 0===t.label?null:t.label,a=void 0===t.by?null:t.by,s=[];if(null===a){for(var o=1,u=i.length;o<u;o++)s=s.concat(i[o].value);return r.value=s,null!==l&&(r.label=l),r}var f,h,d,v=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var i in t)e[i]=0===t[i]?n:t[i];return e};i.forEach((function(e,t){var i=n(e).toTable({status:!0}),r=e.dimension[a].category;0===t?(s=[i[0]],f=r.index,h=r.label,d=r.unit):(f=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var i in t)e[i]=t[i]+n;return e}(f,r.index,Object.keys(f).length),h=v(h,r.label,t),d=v(d,r.unit,t)),s=s.concat(i.slice(1))}));var p=c(s);return r.value=p.value,r.size=p.size,r.status=p.status||null,r.label=l||"",r.href=null,r.dimension[a].category.index=f||null,r.dimension[a].category.label=h||null,r.dimension[a].category.unit=d||null,r}function v(e,t){return null==e?"":-1!==e.indexOf(t)?'"'+e+'"':e}function p(e,t){if(void 0===e)return null;void 0===t&&(t={});var n="",l="jsonstat",a=!0===t.rich,s=a?"value":t.vlabel||"Value",o=a?"status":t.slabel||"Status",u=!0===t.status,c=t.na||"n/a",f=t.delimiter||",",h=t.separator||"|",d=";"===f?t.decimal||",":t.decimal||".",p=i(e,t.dsid||0);if(!r(p))return null;a&&(u=null!==p.status);var y=p.toTable({vlabel:s,slabel:o,status:u,field:a?"id":"label",content:a?"id":"label",type:"array"}),g=y[0].indexOf(s),b=u?y[0].indexOf(o):-1;return y.forEach((function(e,t){e.forEach((function(n,i){t&&i===g?null===n?e[i]=v(c,f):"."!==d&&(e[i]=String(e[i]).replace(".",d)):e[i]=t&&i===b&&null===n?"":v(e[i],f)})),n+=e.join(f)+"\n"})),a&&(l+=f+d+f+h+"\n",["label","source","updated","href"].forEach((function(e){p[e]&&(l+=e+f+v(p[e],f)+"\n")})),p.id.forEach((function(e,t){var n=[],i=p.Dimension(t),r=i.role,a=!1;l+="dimension"+f+v(e,f)+f+v(i.label,f)+f+i.length,"metric"===r&&i.__tree__.category.unit&&(a=!0),i.id.forEach((function(e,t){var r=[],s=i.Category(t);l+=f+v(e,f)+f+v(s.label,f),a&&(r.push(s.unit.hasOwnProperty("decimals")?s.unit.decimals:""),r.push(s.unit.label||""),s.unit.symbol&&(r.push(s.unit.symbol),r.push(s.unit.position)),n.push(v(r.join(h),f)))})),null!==r&&"classification"!==r&&(l+=f+i.role,a&&(l+=f+n.join(f))),l+="\n"})),n=l+"data\n"+n),n}e.prototype.Item=function(e){if(null===this||"collection"!==this.class||!this.length)return null;if("number"==typeof e)return e>this.length||e<0?null:this.link.item[e];var t,n=[];if("object"==typeof e){if(!e.class&&!e.follow)return null;e.class&&(t="dataset"===e.class&&"boolean"==typeof e.embedded?!0===e.embedded?function(e,t,i){var r=e.link.item[t];i.class===r.class&&r.id&&r.size&&r.dimension&&n.push(r)}:function(e,t,i){var r=e.link.item[t];i.class!==r.class||r.id&&r.size&&r.dimension||n.push(r)}:function(e,t,i){i.class===e.link.item[t].class&&n.push(e.link.item[t])})}else t=function(e,t){n.push(e.link.item[t])};for(var i=0;i<this.length;i++)t(this,i,e);return n},e.prototype.Dataset=function(t){if(null===this)return null;if("dataset"===this.class)return void 0!==t?this:[this];var n,i=[],r=0;if("collection"===this.class){var l=this.Item({class:"dataset",embedded:!0});if(void 0===t){for(n=l.length;r<n;r++)i.push(new e(l[r]));return i}if("number"==typeof t&&t>=0&&t<l.length)return new e(l[t]);if("string"==typeof t)for(n=l.length;r<n;r++)if(l[r].href===t)return new e(l[r]);return null}if("bundle"!==this.class)return null;if(void 0===t){for(n=this.id.length;r<n;r++)i.push(this.Dataset(this.id[r]));return i}if("number"==typeof t){var a=this.id[t];return void 0!==a?this.Dataset(a):null}var s=this.__tree__[t];return void 0===s?null:new e({class:"dataset",__tree__:s})},e.prototype.Dimension=function(t,n){n="boolean"!=typeof n||n;var i,r=[],l=this.id.length,a=function(e,t){if(null!==e)for(var n in e)for(var i=null!==e[n]?e[n].length:0;i--;)if(e[n][i]===t)return n;return null};if(null===this||"dataset"!==this.class)return null;if(void 0===t){for(i=0;i<l;i++)r.push(this.Dimension(this.id[i]));return r}if("number"==typeof t){var s=this.id[t];return void 0!==s?this.Dimension(s,n):null}var o=this.role;if("object"==typeof t){if(t.hasOwnProperty("role")){for(i=0;i<l;i++){var u=this.id[i];a(o,u)===t.role&&r.push(this.Dimension(u,n))}return void 0===r[0]?null:r}return null}var c=this.__tree__.dimension;if(void 0===c)return null;var f=c[t];return void 0===f?null:n?new e({class:"dimension",__tree__:f,role:a(o,t)}):function(e,t){var n=[];for(var i in e)n[e[i]]=t[i];return n}(f.category.index,f.category.label)},e.prototype.Category=function(t){if(null===this||"dimension"!==this.class)return null;if(void 0===t){for(var n=[],i=0,r=this.id.length;i<r;i++)n.push(this.Category(this.id[i]));return n}if("number"==typeof t){var l=this.id[t];return void 0!==l?this.Category(l):null}var a=this.__tree__.category;if(void 0===a)return null;var s=a.index[t];if(void 0===s)return null;var o=a.unit&&a.unit[t]||null,u=a.coordinates&&a.coordinates[t]||null,c=a.child&&a.child[t]||null,f=a.note&&a.note[t]||null;return new e({class:"category",index:s,label:a.label[t],note:f,child:c,unit:o,coord:u})},e.prototype.Dice=function(t,n,i){var r,l,a,s,o=function(e,t){return e.hasOwnProperty(t)&&!!e[t]};if(null===this||"dataset"!==this.class)return null;if("object"!=typeof t)return this;"object"!=typeof n?("boolean"==typeof n&&!0===n&&(r=!0),"boolean"==typeof i&&!0===i||(i=!1)):(r=o(n,"clone"),i=o(n,"drop"),l=o(n,"stringify"),a=o(n,"ovalue"),s=o(n,"ostatus"));var u,c=r?new e(JSON.parse(JSON.stringify(this))):this,f=c.status,h=[],d=[],v=function(e,t){var n,i,r,l=(n=e,i=t,r={},"[object Array]"===Object.prototype.toString.call(n[i])?(n[i].forEach((function(e,t){null!==e&&(r[String(t)]=e)})),r):n[i]);delete e[t],e[t]=l};Array.isArray(t)&&(t=function(e){var t={};return e.forEach((function(e){t[e[0]]=e[1]})),t}(t)),null===t&&(t={});var p=Object.keys(t);return p.length>0&&(p.forEach((function(e){var n=t[e];Array.isArray(n)||(t[e]=[n]),0===t[e].length&&delete t[e]})),i&&(t=function(e){var t={};return Object.keys(e).forEach(n=>t[n]=c.Dimension(n).id.filter(t=>-1===e[n].indexOf(t))),t}(t)),c.toTable({type:"arrobj",content:"id",status:!0}).forEach((function(e,n){var i=[];p.forEach((function(n){var r=t[n],l=[];r.forEach((function(t){l.push(e[n]===t)})),i.push(-1!==l.indexOf(!0))})),-1===i.indexOf(!1)&&(h.push(e.value),d.push(e.status))})),p.forEach((function(e){var n=c.Dimension(e).id,i=0,r={};c.size[c.id.indexOf(e)]=t[e].length,n.forEach((function(n){-1!==t[e].indexOf(n)&&(r[n]=i,i++)})),c.__tree__.dimension[e].category.index=r})),c.n=h.length,c.value=c.__tree__.value=h,c.status=c.__tree__.status=null!==f?d:null),l?((u=c.__tree__).hasOwnProperty("id")||(u.version="2.0",u.hasOwnProperty("class")||(u.class="dataset"),u.id=u.dimension.id,u.size=u.dimension.size,delete u.dimension.id,delete u.dimension.size,u.dimension.hasOwnProperty("role")&&(u.role=u.dimension.role,delete u.dimension.role)),u.hasOwnProperty("status")&&-1!==["null","{}","[]"].indexOf(JSON.stringify(u.status))&&delete u.status,u.hasOwnProperty("role")&&(delete u.role.classification,["geo","time","metric"].forEach((function(e){null===u.role[e]&&delete u.role[e]}))),a&&v(u,"value"),s&&u.hasOwnProperty("status")&&v(u,"status"),JSON.stringify(u)):c},e.prototype.Slice=function(e){if(null===this||"dataset"!==this.class)return null;if(void 0===e)return this;if(!Array.isArray(e)){var t,n=[];for(t in e)n.push([t,e[t]]);e=n}return this.Dice(e.map((function(e){return[e[0],[e[1]]]})))},e.prototype.Data=function(e,t){var n,i,r=[],l=function(e){for(var t in e)if(e.hasOwnProperty(t))return t};if(null===this||"dataset"!==this.class)return null;if(void 0===e){for(i=this.value.length,n=0;n<i;n++)r.push(this.Data(n));return r}if("boolean"!=typeof t&&(t=!0),"number"==typeof e){var a=this.value[e];return void 0===a?null:t?{value:a,status:this.status?this.status[e]:null}:a}var s="object",o=this.__tree__,u=o.size||o.dimension&&o.dimension.size,c=u.length;if(Array.isArray(e)){if(!Array.isArray(e[0])){if(this.length!==e.length)return null;var f=1,h=0,d=[],v=[];for(n=0;n<c;n++)if(void 0!==e[n]){if("number"!=typeof e[n]||e[n]>=u[n])return null;h+=(f*=n>0?u[c-n]:1)*e[c-n-1]}else d.push(n),v.push(u[n]);if(d.length>1)return null;if(1===d.length){for(var p=0,y=v[0];p<y;p++){var g=[];for(n=0;n<c;n++)n!==d[0]?g.push(e[n]):g.push(p);r.push(this.Data(g,t))}return r}return t?{value:this.value[h],status:this.status?this.status[h]:null}:this.value[h]}s="array"}var b=function(e,t,n){var i,r=[],a={},s=e.dimension,o=e.id||s.id,u=e.size||s&&s.size;if("array"===n){for(i=t.length;i--;)a[t[i][0]]=t[i][1];t=a}for(var c=0,f=o.length;c<f;c++){var h=o[c],d=t[h];r.push("string"==typeof d?d:1===u[c]?l(s[h].category.index):null)}return r}(o,e,s),m=[],_=o.dimension,w=o.id||_.id;for(n=0,i=b.length;n<i;n++)m.push(_[w[n]].category.index[b[n]]);return this.Data(m,t)},e.prototype.toTable=function(e,t){if(null===this||"dataset"!==this.class)return null;1==arguments.length&&"function"==typeof e&&(t=e,e=null),e=e||{field:"label",content:"label",vlabel:"Value",slabel:"Status",type:"array",status:!1,unit:!1,by:null,prefix:"",drop:[],meta:!1,comma:!1,bylabel:!1};var n,i,r,l,a,s=this.__tree__,o=!0===e.status;if("function"==typeof t){n=this.toTable(e);var u=[],c="array"!==e.type?0:1;for(a=(z="object"!==e.type?n.slice(c):n.rows.slice(0)).length,i=0;i<a;i++){var f=t.call(this,z[i],i);void 0!==f&&u.push(f)}return"object"===e.type?{cols:n.cols,rows:u}:("array"===e.type&&u.unshift(n[0]),u)}if("arrobj"===e.type){var h=[],d=(n=this.toTable({field:"id",content:e.content,status:o})).shift(),v=s.role&&s.role.metric,p=function(){},y={},g=this,b=g.id,m=e.by&&-1!==b.indexOf(e.by)?e.by:null,_=!0===e.meta,w=void 0!==e.drop&&Array.isArray(e.drop)?e.drop:[],O=!0===e.comma,x=!0===e.bylabel,E=function(t){if(_){var n={};return b.forEach((function(e){var t=g.Dimension(e);n[e]={label:t.label,role:t.role,categories:{id:t.id,label:g.Dimension(e,!1)}}})),{meta:{label:g.label,source:g.source,updated:g.updated,id:b,status:o,unit:e.unit,by:m,bylabel:x,drop:null!==m&&w.length>0?w:null,prefix:null!==m?C||"":null,comma:O,dimensions:n},data:t}}return t};if(null===m&&e.unit&&v){if("id"!==e.content)for(var A=v.length;A--;){var S=this.Dimension(v[A]);y[v[A]]={};for(var D=S.length;D--;)y[v[A]][S.Category(D).label]=S.id[D]}p=function(t,n){if(-1!==v.indexOf(t)){var i=s.dimension[t].category;i.unit?P.unit=i.unit["id"!==e.content?y[t][n]:n]:P.unit=null}},e.unit=!0}else e.unit=!1;for(a=n.length,i=0;i<a;i++){var P={};for(r=n[i].length;r--;)P[d[r]]=n[i][r],p(d[r],n[i][r]);h.push(P)}if(O&&h.forEach((function(e){null!==e.value&&(e.value=(""+e.value).replace(".",","))})),null!==m){var j,k={},z=[],N={},C=void 0!==e.prefix?e.prefix:"";w.forEach((function(e,t){(!g.Dimension(e)||g.Dimension(e).length>1)&&(w[t]="")}));var T=b.filter((function(e){return e!==m&&-1===w.indexOf(e)})),R=g.Dimension(m),J=function(e,t){var n=[];return t.forEach((function(t){n.push(e[t])})),n.join("\t")},L=function(e,t){var n={};return t.forEach((function(t){n[t]=e[t]})),n};for(var F in"id"!==e.content?x?j=function(e,t,n){e[t][C+n[m]]=n.value}:(R.Category().forEach((function(e,t){N[e.label]=R.id[t]})),j=function(e,t,n){e[t][C+N[n[m]]]=n.value}):j=function(e,t,n){e[t][C+n[m]]=n.value},h.forEach((function(e){var t=J(e,T);void 0===k[t]&&(k[t]=L(e,T)),j(k,t,e,m)})),k)z.push(k[F]);return o=!1,E(z)}return E(h)}var q,I,V,U,M="id"===e.field;if("object"===e.type){var H="number"==typeof this.value[0]||null===this.value[0]?"number":"string";q=function(e,t){var n=M&&e||t||e;te.push({id:e,label:n,type:"string"})},I=function(e,t,n){var i=(M?"value":e)||"Value",r=(M?"status":t)||"Status";n&&te.push({id:"status",label:r,type:"string"}),te.push({id:"value",label:i,type:H})},V=function(e){ve.push({v:e})},U=function(e){ve.push({v:e}),ne.push({c:ve})}}else q=function(e,t){var n=M&&e||t||e;te.push(n)},I=function(e,t,n){var i=(M?"value":e)||"Value",r=(M?"status":t)||"Status";n&&te.push(r),te.push(i),ee.push(te)},V=function(e){ve.push(e)},U=function(e){ve.push(e),ee.push(ve)};var B=s.dimension,G=s.id||B.id,K=s.size||B.size,Q=G.length;if(Q!=K.length)return!1;var W=[],X=1,Y=(A=1,[]),Z=[],$=[],ee=[],te=[],ne=[];for(i=0;i<Q;i++){var ie=G[i],re=B[ie].label;q(ie,re),X*=K[i],A*=K[i];var le=[];for(r=0;r<K[i];r++)for(var ae in B[G[i]].category.index)if(B[G[i]].category.index[ae]===r){var se="id"!==e.content&&B[G[i]].category.label?B[G[i]].category.label[ae]:ae;le.push(se)}W.push(le),Y.push(A)}for(I(e.vlabel,e.slabel,o),a=W.length,i=0;i<a;i++){for(var oe=[],ue=0,ce=W[i].length;ue<ce;ue++)for(var fe=0;fe<X/Y[i];fe++)oe.push(W[i][ue]);Z.push(oe)}for(a=Z.length,i=0;i<a;i++){var he=[],de=0;for(l=0;l<X;l++)he.push(Z[i][de]),++de===Z[i].length&&(de=0);$.push(he)}for(l=0;l<X;l++){var ve=[];a=Z.length;for(var pe=0;pe<a;pe++)V($[pe][l]);o&&V(this.status?this.status[l]:null),U(this.value[l])}return"object"===e.type?{cols:te,rows:ne}:ee},e.prototype.node=function(){return this.__tree__},e.prototype.toString=function(){return this.class},String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};var y="3.1.7";export{o as datalist,f as fromCSV,h as fromSDMX,c as fromTable,d as join,s as tbrowser,p as toCSV,y as version};
