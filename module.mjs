// jsonstat-suite v3.4.1 Copyright 2023 Xavier Badosa https://jsonstat.com
import e from"jsonstat-toolkit";function t(t,n){return null==t?null:("string"!=typeof t&&void 0!==t.length||(t=e(t)),0===t.length||"dataset"!==t.class&&"collection"!==t.class&&"bundle"!==t.class?null:"dataset"===t.class?t:t.Dataset(n))}function n(e){if(null===e||0===e.length||"dataset"!==e.class)return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n===e.n}function a(e,t,n){var a,r,l,i,o;return(t.label||n).capitalize()+(r=t,o="",(a=e)&&"metric"===a.role&&r.unit&&(l=r.unit.hasOwnProperty("label")?r.unit.label:"")+(i=r.unit.hasOwnProperty("symbol")?r.unit.symbol:"")!==""&&(o=" ("+(o=""===i?l:""===l?i:"start"===r.unit.position?i+l:l+" "+i)+")"),o)}function r(e,t,n){var r,l='<select name="'+t+'">',i=[];if(null!==n[1]){if(r=e.id,i=e.Dimension(),2===r.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var o=e.Dimension(t);if(r=o.id,i=o.Category(),1===r.length)return}return r.forEach((function(e,t){var r=e!==n[0]?"":'selected="selected" ';null!==n[1]&&e===n[1]||(l+="<option "+r+'value="'+e+'">'+a(o,i[t],e)+"</option>")})),l+="</select>"}function l(e,l,i){function o(e){void 0!==l?l.innerHTML=s[e]:window.alert(s[e])}if(void 0!==e)if(void 0!==l){void 0===i&&(i={});var s=void 0===i.i18n||void 0===i.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:i.i18n.msgs,u=void 0===i.i18n||void 0===i.i18n.locale?"en-US":i.i18n.locale,c=i.dsid||0,d=i.status||!1,f=i.tblclass||"",h=i.nonconst||!1,v=t(e,c);if(n(v)){if(h)var b=function(e){var t=0,n=e.size.slice(0),a=[];return n.forEach((function(n,r){var l=r-t,i=e.Dimension(l);1===n&&(delete e.__tree__.dimension[e.id[l]],e.size.splice(l,1),e.id.splice(l,1),e.length--,t++,a.push(i.label.capitalize()+": "+i.Category(0).label.capitalize()))})),a}(v);1!==v.length?function e(t,n,l,o){"function"==typeof i.callback&&i.callback(l);var c="",f="",v="",p="",g=l.rows,m=n.Dimension(g),y=m.id,w=l.cols,O=n.Dimension(w),E=O.id,S=n.role&&n.role.metric?n.role.metric[0]:null,x=null!==S?n.Dimension(S):null,A=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},D=l.filters,P=JSON.parse(JSON.stringify(D)),j=[],k="",z="",N=n.source?s.source+": "+n.source:"",C=null!==n.label?'<span class="label">'+n.label.capitalize()+"</span>":"";for(var R in h&&b.length&&(C='<span class="label">'+b.join(". ")+"</span>"),""!==N&&"."!==N.slice(-1)&&(N+="."),v+="<caption>"+C+"<form>",D){var _=n.Dimension(R),L=_.label?_.label.capitalize():R.capitalize();_.length>1?k+="<p>"+r(n,R,[D[R],null])+" <strong>"+L+"</strong></p>":j.push({label:L,value:a(_,_.Category(0)),name:R,id:_.id[0]})}""!==k&&(k='<fieldset id="filters"><legend>'+s.filters+"</legend>"+k+"</fieldset>"),j.forEach((function(e){z+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'})),""!==z&&(z='<fieldset id="constants"><legend>'+s.constants+"</legend>"+z+"</fieldset>"),v+=z+k+'<fieldset id="rowscols"><legend>'+s.rc+"</legend>"+r(n,"rows",[g,w])+" <a>&#x2194;</a> "+r(n,"cols",[w,g])+"</fieldset></form></caption>",p+="<tbody>";var T=Number.toLocaleString&&"none"!==u?function(e,t){return null===t?e.toLocaleString(u):e.toLocaleString(u,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};if(y.forEach((function(e){P[g]=e;var t=n.Data(P),r=function(e,t){var n,a=w!==S?null===x?null:A(x.Category(P[S])):A(O.Category(t));null!==e.value?(n=T(e.value,a),d&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||s.na,p+="<td>"+n+"</td>"};null!==t?(p+='<tr><th scope="row">'+a(m,m.Category(e))+"</th>",Array.isArray(t)?t.forEach((function(e,t){r(e,t)})):r(t,0),p+="</tr>"):p="ERROR"})),"ERROR"===p)return s.dataerror;p+="</tbody>",c+="<thead><tr><th></th>",E.forEach((function(e){c+='<th scope="col">'+a(O,O.Category(e))+"</th>"})),c+="</tr></thead>",""!==N&&(f='<tfoot><tr><td colspan="'+(E.length+1)+'">'+N+"</td></tr></tfoot>"),t.innerHTML='<table class="'+o+'">'+v+c+p+f+"</table>",[].slice.call(t.querySelectorAll("select")).forEach((function(a){a.addEventListener("change",(function(a){var r,l;e(t,n,function(e,t,n){var a={filters:{}};return n.forEach((function(e){"rows"===e.name||"cols"===e.name?a[e.name]=e.value:a.filters[e.name]=e.value})),"rowscols"===t&&e.id.forEach((function(t,n){t!==a.rows&&t!==a.cols?void 0===a.filters[t]&&(a.filters[t]=e.Dimension(n).id[0]):delete a.filters[t]})),a}(n,a.target.parentElement.getAttribute("id"),(r=t,l=[],[].slice.call(r.querySelectorAll("select, input")).forEach((function(e){l.push({name:e.name,value:e.value})})),l)),o)}),!1)})),t.querySelector("a").addEventListener("click",(function(){l.cols=g,l.rows=w,e(t,n,l,o)}),!1)}(l,v,function(e,t){if("object"==typeof t)return{rows:t.rows,cols:t.cols,filters:t.filters};var n,a,r={},l=[],i=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach((function(e,t){l.push({id:i[t],len:e.length})})),l.sort(o),n=l[0].id,a=l[1].id}else n=i[0],a=i[1];return e.Dimension(n).length<e.Dimension(a).length&&(n=a+(a=n,"")),i.forEach((function(t){t!==n&&t!==a&&(r[t]=e.Dimension(t).id[0])})),{rows:n,cols:a,filters:r}}(v,i.preset),f):o("dimerror")}else o("jsonerror")}else o("selerror");else o("urierror")}function i(e,a){if(void 0===e)return null;void 0===a&&(a={});var r="",l="",i="",o=0,s=a.na||"n/a",u=a.dsid||0,c=a.vlabel||null,d=a.slabel||null,f=a.counter||!1,h=a.tblclass||"",v=a.numclass||"",b=a.valclass||"",p=a.status||!1,g=a.locale||"en-US",m=a.source||"Source",y=t(e,u),w=y.role&&y.role.metric?y.id.indexOf(y.role.metric[0]):null,O=y.Dimension({role:"metric"}),E={},S=Number.toLocaleString&&"none"!==g?function(e,t){return null===t?e.toLocaleString(g):e.toLocaleString(g,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)},x=function(e,t){var n=null;e.forEach((function(e,a){var i=P===a?' class="'+v+" "+b+'"':"",o=s;t?(w===a&&(n=E[e]),null!==e&&(o=P===a?S(e,n):e),l+="<td"+i+">"+o+"</td>"):r+="<th"+i+">"+e+"</th>"}))},A=f?function(e,t){t?l+='<tr><td class="'+v+'">'+t+"</td>":r+='<th class="'+v+'">#</th>',x(e,t),l+="</tr>"}:function(e,t){l+="<tr>",x(e,t),l+="</tr>"};if(!n(y))return null;O&&O[0].Category().forEach((function(e){var t=e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null;E[e.label]=t}));var D=y.toTable({status:p,vlabel:c,slabel:d}),P=D[0].length-1;return D.forEach((function(e,t){A(e,t)})),y.source&&(o=y.length+1,f&&o++,p&&o++,"."!==(m+=": "+y.source).slice(-1)&&(m+="."),i='<tfoot><td colspan="'+o+'">'+m+"</td></tfoot>"),'<table class="'+h+'"><caption>'+(a.caption||y.label||"")+"</caption><thead><tr>"+r+"</tr></thead><tbody>"+l+"</tbody>"+i+"</table>"}function o(e,t){var n={};return Array.isArray(e[t])?(e[t].forEach((function(e,t){null!==e&&(n[String(t)]=e)})),n):e[t]}function s(t,n){if(void 0===t)return null;void 0===n&&(n={}),"boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1);var a=n.vlabel||"Value",r=n.slabel||"Status",l=n.type||"array",i=n.label||"",s=n.header||null,u=[],c=[],d=[],f=[],h={},v={},b=function(e,t){for(var n=1,a=0,r=0;r<E;r++)a+=(n*=r>0?t[E-r]:1)*e[E-r-1];return a},p=function(){var e=t[S][a];d[b(x,c)]=isNaN(e)?null:e};switch(l){case"array":t=function(e){for(var t=e[0],n=e.slice(1),a=[],r=0,l=n.length;r<l;r++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[r][i];a.push(s)}return a}(t);break;case"object":t=function(e){for(var t=e.cols.map((function(e){return e.id})),n=e.rows,a=[],r=0,l=n.length;r<l;r++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[r].c[i].v;a.push(s)}return a}(t)}var g,m=t.length;for(var y in n.hasOwnProperty("drop")&&Array.isArray(n.drop)&&n.drop.length&&t.forEach((function(e){n.drop.forEach((function(t){delete e[t]}))})),t[0])if(y!==a)if(y!==r){if(u.push(y),s)g=s.dimension[y],h[y]=g.category.index;else{h[y]=[];for(var w=0;w<m;w++){var O=t[w][y];-1===h[y].indexOf(O)&&h[y].push(O)}}c.push(h[y].length),v[y]={label:s?g.label:y,category:{index:h[y]}},s&&(v[y].category.label=g.category.label,g.category.unit&&(v[y].category.unit=g.category.unit))}else p=function(){var e=t[S][a],n=t[S][r];d[b(x,c)]=isNaN(e)?null:e,f[b(x,c)]=""===n?null:n};for(var E=u.length,S=0;S<m;S++){for(var x=[],A=0;A<E;A++){var D=u[A];x.push(h[D].indexOf(t[S][D]))}p()}var P={version:"2.0",class:"dataset",value:d,dimension:v,id:u,size:c};return i&&(P.label=i),f.length&&(P.status=f),s&&(s.label&&(P.label=s.label),s.source&&(P.source=s.source),s.updated&&(P.updated=s.updated),s.href&&(P.href=s.href),s.role&&(P.role=s.role)),n.ovalue&&(P.value=o(P,"value")),n.ostatus&&P.hasOwnProperty("status")&&(P.status=o(P,"status")),n.instance?e(P):P}function u(e,t){if(void 0===e)return null;void 0===t&&(t={});var n,a,r,l=[],i=null,o=null,u=!1,c={time:[],geo:[],metric:[]},d="jsonstat"===e.substring(0,8),f=d?"value":t.vlabel,h=d?"status":t.slabel,v=d?e.substring(8,9):t.delimiter||",",b=";"===v?t.decimal||",":t.decimal||".",p=function(e,t){t=t||",";for(var n,a,r=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),l=[[]],i=null;i=r.exec(e);)(a=i[1]).length&&a!=t&&l.push([]),n=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],l[l.length-1].push(n);return l}(e.trim(),v);if(d){for(b=p[0][1],r=p[0][2],p.shift();"data"!==p[0][0];)l.push(p.shift());p.shift(),o={dimension:{}},l.forEach((function(e){var t,n,a,l,i,s,d,f;switch(e[0]){case"dimension":if(o.dimension[e[1]]={},(l=o.dimension[e[1]]).label=e[2],l.category={},(i=l.category).index=[],n={},a=2*e[3]+3,e.length>=a){for(t=4;t<a;t++)d=e[t],f=e[++t],Object.defineProperty(n,d,{value:f,writable:!0,configurable:!0,enumerable:!0}),i.label=n,i.index.push(d);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(c[e[t]].push(e[1]),u=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(i.unit={},i.index.forEach((function(n,a){var l=e[t+a].split(r);i.unit[n]={},s=i.unit[n],void 0!==l[0]&&""!==l[0]&&(s.decimals=1*l[0]),void 0!==l[1]&&""!==l[1]&&(s.label=l[1]),void 0!==l[2]&&""!==l[2]&&(s.symbol=l[2]),void 0!==l[1]&&-1!==["start","end"].indexOf(l[3])&&(s.position=l[3])}))))}break;case"label":case"source":case"updated":case"href":o[e[0]]=e[1]||null}})),u&&(c.time.length||delete c.time,c.geo.length||delete c.geo,c.metric.length||delete c.metric,o.role=c)}if(n=p.length,a=p[0].length,void 0!==f){for(;a--;)if(p[0][a]===f){i=a;break}if(null===i)return null}else i=a-1,f=p[0][i];if(","===b)for(a=1;a<n;a++)p[a][i]=Number(p[a][i].replace(",","."));else for(a=1;a<n;a++)p[a][i]=Number(p[a][i]);return s(p,{header:o,vlabel:f,slabel:h,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1,instance:t.instance||!1})}function c(t,n){if("object"!=typeof t)return null;if(t.hasOwnProperty("data")&&t.hasOwnProperty("meta")&&t.data.hasOwnProperty("dataSets")&&t.data.hasOwnProperty("structures")&&Array.isArray(t.data.structures)&&(t.dataSets=t.data.dataSets,t.structure=t.data.structures[0],t.header=t.meta),!t.hasOwnProperty("dataSets")||!Array.isArray(t.dataSets))return null;if(1!==t.dataSets.length)return null;t.dataSets[0].hasOwnProperty("observations")||function(e){var t=e.dataSets[0],n=t.series,a=e.structure,r=a.dimensions,l={};Object.keys(n).forEach((function(e){var t=n[e].observations;Object.keys(t).forEach((function(a){l[e+":"+a]=t[a].concat(n[e].attributes)}))})),t.observations=l,delete t.series,r.observation=r.series.concat(r.observation),delete r.series,a.attributes.observation=a.attributes.observation.concat(a.attributes.series),delete a.attributes.series}(t),void 0===n?n={ovalue:!1,ostatus:!1,instance:!1}:("boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1));var a=t.structure,r=t.dataSets[0].observations,l=a.attributes.observation,i=a.dimensions;if(!i.hasOwnProperty("observation"))return null;if(i.hasOwnProperty("series")&&Object.keys(i.series).length)return null;var o=1,s=[],u=[],c={},d=[],f={time:[],geo:[]},h=function(){},v=function(e,t){for(var n=e.size,a=n.length-t.length;a--;)t.push(0);for(var r=0,l=n.length,i=0,o=1;r<l;r++)i+=(o*=r>0?n[l-r]:1)*t[l-r-1];return i},b=function(e){if(c[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":f.geo.push(e.id);break;case"TIME_PERIOD":f.time.push(e.id)}Object.defineProperty(c[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),s.push(e.id),u.push(e.values.length),o*=e.values.length;var t=c[e.id].category;e.values.forEach((function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})}))},p=t.header.links?t.header.links.find((function(e){return"request"===e.rel})):null,g=l.findIndex((function(e){return"OBS_STATUS"===e.id}));-1!==g&&(l[g].values.length?d=l[g].values:g=-1),i.observation.forEach(b),i.hasOwnProperty("dataSet")&&i.dataSet.forEach(b);var m={version:"2.0",class:"dataset",updated:t.header.prepared||null,source:t.header.sender.name||null,label:a.name||null,id:s,size:u,dimension:c,value:n.ovalue?{}:new Array(o).fill(null)};for(var y in p&&(m.link={alternate:[{type:"application/vnd.sdmx.data+json",href:p.href}]}),f.geo.length+f.time.length>0&&(f.time.length||delete f.time,f.geo.length||delete f.geo,m.role=f),-1!==g&&(m.status=n.ostatus?{}:new Array(o).fill(null),m.extension={status:{label:{}}},d.forEach((function(e){m.extension.status.label[e.id]=e.name})),h=n.ostatus?function(){var e=r[y][g];null!==e&&(m.status[v(m,w)]=d[e].id)}:function(){var e=r[y][g];m.status[v(m,w)]=null===e?null:d[e].id}),g++,r){var w=y.split(":");n.ovalue&&null===r[y][0]||(m.value[v(m,w)]=r[y][0]),h()}return n.instance?e(m):m}function d(t,n){if(void 0===t||!Array.isArray(t))return null;var a=JSON.parse(JSON.stringify(t)),r=a[0];if(!r.hasOwnProperty("version")||!r.hasOwnProperty("class")||"dataset"!==r.class)return null;void 0===n&&(n={});var l=void 0===n.label?null:n.label,i=void 0===n.by?null:n.by,o=[];if(null===i){for(var u=1,c=a.length;u<c;u++)o=o.concat(a[u].value);return r.value=o,null!==l&&(r.label=l),r}var d,f,h,v=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var a in t)e[a]=0===t[a]?n:t[a];return e};a.forEach((function(t,n){var a=e(t).toTable({status:!0}),r=t.dimension[i].category;0===n?(o=[a[0]],d=r.index,f=r.label,h=r.unit):(d=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var a in t)e[a]=t[a]+n;return e}(d,r.index,Object.keys(d).length),f=v(f,r.label,n),h=v(h,r.unit,n)),o=o.concat(a.slice(1))}));var b=s(o);return r.value=b.value,r.size=b.size,r.status=b.status||null,r.label=l||"",r.href=null,r.dimension[i].category.index=d||null,r.dimension[i].category.label=f||null,r.dimension[i].category.unit=h||null,r}function f(e,t){return null==e?"":-1!==e.indexOf(t)?'"'+e+'"':e}function h(e,a){if(void 0===e)return null;void 0===a&&(a={});var r={content:!1,field:!1},l=!0===a.rich,i=a.content||"label",o=a.field||"label",s=l?"value":a.vlabel||"Value",u=l?"status":a.slabel||"Status",c=!0===a.status,d=a.na||"n/a",h=a.delimiter||",",v=a.separator||"|",b=";"===h?a.decimal||",":a.decimal||".",p=!0===a.array,g=t(e,a.dsid||0),m=p?[]:"",y=p?[]:"",w=p?function(e){m.push(e)}:function(e){m+=e+"\n"},O=p?function(e){y.push(e)}:function(e){y+=e+"\n"};if(!n(g))return null;l?c=null!==g.status:("[id] label"===i&&(r.content=!0,i="id"),"[id] label"===o&&(r.field=!0,o="id"));var E=g.toTable({vlabel:s,slabel:u,status:c,field:l||r.field?"id":o,content:l||r.content?"id":i,type:"array"}),S=E[0].indexOf("id"===o?"value":s),x=c?E[0].indexOf("id"===o?"status":u):-1;return E.forEach((function(e,t){e.forEach((function(n,a){var l=g.Dimension(a);t&&a===S?null===n?e[a]=f(d,h):"."!==b&&(e[a]=String(e[a]).replace(".",b)):t&&a===x&&null===n?e[a]="":(r.content&&t&&l&&(e[a]="["+e[a]+"] "+l.Category(e[a]).label),r.field&&0===t&&(e[a]=l?"["+e[a]+"] "+l.label:"value"===e[a]?s:u),e[a]=f(e[a],h))})),w(e.join(h))})),l&&(O("jsonstat"+h+b+h+v),["label","source","updated","href"].forEach((function(e){g[e]&&O(e+h+f(g[e],h))})),g.id.forEach((function(e,t){var n=[],a=g.Dimension(t),r=a.role,l=!1,i="";i+="dimension"+h+f(e,h)+h+f(a.label,h)+h+a.length,"metric"===r&&a.__tree__.category.unit&&(l=!0),a.id.forEach((function(e,t){var r=[],o=a.Category(t);i+=h+f(e,h)+h+f(o.label,h),l&&(r.push(o.unit.hasOwnProperty("decimals")?o.unit.decimals:""),r.push(o.unit.label||""),o.unit.symbol&&(r.push(o.unit.symbol),r.push(o.unit.position)),n.push(f(r.join(v),h)))})),null!==r&&"classification"!==r&&(i+=h+a.role,l&&(i+=h+n.join(h))),O(i)})),m=p?y.concat(["data"],m):y+"data\n"+m),m}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};var v="3.4.1";export{i as datalist,u as fromCSV,c as fromSDMX,s as fromTable,d as join,l as tbrowser,h as toCSV,v as version};
