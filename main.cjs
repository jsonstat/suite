// jsonstat-suite v3.4.0 Copyright 2023 Xavier Badosa https://jsonstat.com
"use strict";var e=require("jsonstat-toolkit");function t(t,n){return null==t?null:("string"!=typeof t&&void 0!==t.length||(t=e(t)),0===t.length||"dataset"!==t.class&&"collection"!==t.class&&"bundle"!==t.class?null:"dataset"===t.class?t:t.Dataset(n))}function n(e){if(null===e||0===e.length||"dataset"!==e.class)return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n===e.n}function r(e,t,n){var r,a,l,i,o;return(t.label||n).capitalize()+(a=t,o="",(r=e)&&"metric"===r.role&&a.unit&&(l=a.unit.hasOwnProperty("label")?a.unit.label:"")+(i=a.unit.hasOwnProperty("symbol")?a.unit.symbol:"")!==""&&(o=" ("+(o=""===i?l:""===l?i:"start"===a.unit.position?i+l:l+" "+i)+")"),o)}function a(e,t,n){var a,l='<select name="'+t+'">',i=[];if(null!==n[1]){if(a=e.id,i=e.Dimension(),2===a.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var o=e.Dimension(t);if(a=o.id,i=o.Category(),1===a.length)return}return a.forEach((function(e,t){var a=e!==n[0]?"":'selected="selected" ';null!==n[1]&&e===n[1]||(l+="<option "+a+'value="'+e+'">'+r(o,i[t],e)+"</option>")})),l+="</select>"}function l(e,t){var n={};return Array.isArray(e[t])?(e[t].forEach((function(e,t){null!==e&&(n[String(t)]=e)})),n):e[t]}function i(t,n){if(void 0===t)return null;void 0===n&&(n={}),"boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1);var r=n.vlabel||"Value",a=n.slabel||"Status",i=n.type||"array",o=n.label||"",s=n.header||null,u=[],c=[],d=[],f=[],h={},v={},b=function(e,t){for(var n=1,r=0,a=0;a<E;a++)r+=(n*=a>0?t[E-a]:1)*e[E-a-1];return r},p=function(){var e=t[S][r];d[b(x,c)]=isNaN(e)?null:e};switch(i){case"array":t=function(e){for(var t=e[0],n=e.slice(1),r=[],a=0,l=n.length;a<l;a++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[a][i];r.push(s)}return r}(t);break;case"object":t=function(e){for(var t=e.cols.map((function(e){return e.id})),n=e.rows,r=[],a=0,l=n.length;a<l;a++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[a].c[i].v;r.push(s)}return r}(t)}var g,m=t.length;for(var y in n.hasOwnProperty("drop")&&Array.isArray(n.drop)&&n.drop.length&&t.forEach((function(e){n.drop.forEach((function(t){delete e[t]}))})),t[0])if(y!==r)if(y!==a){if(u.push(y),s)g=s.dimension[y],h[y]=g.category.index;else{h[y]=[];for(var w=0;w<m;w++){var O=t[w][y];-1===h[y].indexOf(O)&&h[y].push(O)}}c.push(h[y].length),v[y]={label:s?g.label:y,category:{index:h[y]}},s&&(v[y].category.label=g.category.label,g.category.unit&&(v[y].category.unit=g.category.unit))}else p=function(){var e=t[S][r],n=t[S][a];d[b(x,c)]=isNaN(e)?null:e,f[b(x,c)]=""===n?null:n};for(var E=u.length,S=0;S<m;S++){for(var x=[],A=0;A<E;A++){var D=u[A];x.push(h[D].indexOf(t[S][D]))}p()}var P={version:"2.0",class:"dataset",value:d,dimension:v,id:u,size:c};return o&&(P.label=o),f.length&&(P.status=f),s&&(s.label&&(P.label=s.label),s.source&&(P.source=s.source),s.updated&&(P.updated=s.updated),s.href&&(P.href=s.href),s.role&&(P.role=s.role)),n.ovalue&&(P.value=l(P,"value")),n.ostatus&&P.hasOwnProperty("status")&&(P.status=l(P,"status")),n.instance?e(P):P}function o(e,t){return null==e?"":-1!==e.indexOf(t)?'"'+e+'"':e}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};exports.datalist=function(e,r){if(void 0===e)return null;void 0===r&&(r={});var a="",l="",i="",o=0,s=r.na||"n/a",u=r.dsid||0,c=r.vlabel||null,d=r.slabel||null,f=r.counter||!1,h=r.tblclass||"",v=r.numclass||"",b=r.valclass||"",p=r.status||!1,g=r.locale||"en-US",m=r.source||"Source",y=t(e,u),w=y.role&&y.role.metric?y.id.indexOf(y.role.metric[0]):null,O=y.Dimension({role:"metric"}),E={},S=Number.toLocaleString&&"none"!==g?function(e,t){return null===t?e.toLocaleString(g):e.toLocaleString(g,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)},x=function(e,t){var n=null;e.forEach((function(e,r){var i=P===r?' class="'+v+" "+b+'"':"",o=s;t?(w===r&&(n=E[e]),null!==e&&(o=P===r?S(e,n):e),l+="<td"+i+">"+o+"</td>"):a+="<th"+i+">"+e+"</th>"}))},A=f?function(e,t){t?l+='<tr><td class="'+v+'">'+t+"</td>":a+='<th class="'+v+'">#</th>',x(e,t),l+="</tr>"}:function(e,t){l+="<tr>",x(e,t),l+="</tr>"};if(!n(y))return null;O&&O[0].Category().forEach((function(e){var t=e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null;E[e.label]=t}));var D=y.toTable({status:p,vlabel:c,slabel:d}),P=D[0].length-1;return D.forEach((function(e,t){A(e,t)})),y.source&&(o=y.length+1,f&&o++,p&&o++,"."!==(m+=": "+y.source).slice(-1)&&(m+="."),i='<tfoot><td colspan="'+o+'">'+m+"</td></tfoot>"),'<table class="'+h+'"><caption>'+(r.caption||y.label||"")+"</caption><thead><tr>"+a+"</tr></thead><tbody>"+l+"</tbody>"+i+"</table>"},exports.fromCSV=function(e,t){if(void 0===e)return null;void 0===t&&(t={});var n,r,a,l=[],o=null,s=null,u=!1,c={time:[],geo:[],metric:[]},d="jsonstat"===e.substring(0,8),f=d?"value":t.vlabel,h=d?"status":t.slabel,v=d?e.substring(8,9):t.delimiter||",",b=";"===v?t.decimal||",":t.decimal||".",p=function(e,t){t=t||",";for(var n,r,a=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),l=[[]],i=null;i=a.exec(e);)(r=i[1]).length&&r!=t&&l.push([]),n=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],l[l.length-1].push(n);return l}(e.trim(),v);if(d){for(b=p[0][1],a=p[0][2],p.shift();"data"!==p[0][0];)l.push(p.shift());p.shift(),s={dimension:{}},l.forEach((function(e){var t,n,r,l,i,o,d,f;switch(e[0]){case"dimension":if(s.dimension[e[1]]={},(l=s.dimension[e[1]]).label=e[2],l.category={},(i=l.category).index=[],n={},r=2*e[3]+3,e.length>=r){for(t=4;t<r;t++)d=e[t],f=e[++t],Object.defineProperty(n,d,{value:f,writable:!0,configurable:!0,enumerable:!0}),i.label=n,i.index.push(d);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(c[e[t]].push(e[1]),u=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(i.unit={},i.index.forEach((function(n,r){var l=e[t+r].split(a);i.unit[n]={},o=i.unit[n],void 0!==l[0]&&""!==l[0]&&(o.decimals=1*l[0]),void 0!==l[1]&&""!==l[1]&&(o.label=l[1]),void 0!==l[2]&&""!==l[2]&&(o.symbol=l[2]),void 0!==l[1]&&-1!==["start","end"].indexOf(l[3])&&(o.position=l[3])}))))}break;case"label":case"source":case"updated":case"href":s[e[0]]=e[1]||null}})),u&&(c.time.length||delete c.time,c.geo.length||delete c.geo,c.metric.length||delete c.metric,s.role=c)}if(n=p.length,r=p[0].length,void 0!==f){for(;r--;)if(p[0][r]===f){o=r;break}if(null===o)return null}else o=r-1,f=p[0][o];if(","===b)for(r=1;r<n;r++)p[r][o]=Number(p[r][o].replace(",","."));else for(r=1;r<n;r++)p[r][o]=Number(p[r][o]);return i(p,{header:s,vlabel:f,slabel:h,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1,instance:t.instance||!1})},exports.fromSDMX=function(t,n){if("object"!=typeof t)return null;if(t.hasOwnProperty("data")&&t.hasOwnProperty("meta")&&t.data.hasOwnProperty("dataSets")&&t.data.hasOwnProperty("structures")&&Array.isArray(t.data.structures)&&(t.dataSets=t.data.dataSets,t.structure=t.data.structures[0],t.header=t.meta),!t.hasOwnProperty("dataSets")||!Array.isArray(t.dataSets))return null;if(1!==t.dataSets.length)return null;t.dataSets[0].hasOwnProperty("observations")||function(e){var t=e.dataSets[0],n=t.series,r=e.structure,a=r.dimensions,l={};Object.keys(n).forEach((function(e){var t=n[e].observations;Object.keys(t).forEach((function(r){l[e+":"+r]=t[r].concat(n[e].attributes)}))})),t.observations=l,delete t.series,a.observation=a.series.concat(a.observation),delete a.series,r.attributes.observation=r.attributes.observation.concat(r.attributes.series),delete r.attributes.series}(t),void 0===n?n={ovalue:!1,ostatus:!1,instance:!1}:("boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1));var r=t.structure,a=t.dataSets[0].observations,l=r.attributes.observation,i=r.dimensions;if(!i.hasOwnProperty("observation"))return null;if(i.hasOwnProperty("series")&&Object.keys(i.series).length)return null;var o=1,s=[],u=[],c={},d=[],f={time:[],geo:[]},h=function(){},v=function(e,t){for(var n=e.size,r=n.length-t.length;r--;)t.push(0);for(var a=0,l=n.length,i=0,o=1;a<l;a++)i+=(o*=a>0?n[l-a]:1)*t[l-a-1];return i},b=function(e){if(c[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":f.geo.push(e.id);break;case"TIME_PERIOD":f.time.push(e.id)}Object.defineProperty(c[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),s.push(e.id),u.push(e.values.length),o*=e.values.length;var t=c[e.id].category;e.values.forEach((function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})}))},p=t.header.links?t.header.links.find((function(e){return"request"===e.rel})):null,g=l.findIndex((function(e){return"OBS_STATUS"===e.id}));-1!==g&&(l[g].values.length?d=l[g].values:g=-1),i.observation.forEach(b),i.hasOwnProperty("dataSet")&&i.dataSet.forEach(b);var m={version:"2.0",class:"dataset",updated:t.header.prepared||null,source:t.header.sender.name||null,label:r.name||null,id:s,size:u,dimension:c,value:n.ovalue?{}:new Array(o).fill(null)};for(var y in p&&(m.link={alternate:[{type:"application/vnd.sdmx.data+json",href:p.href}]}),f.geo.length+f.time.length>0&&(f.time.length||delete f.time,f.geo.length||delete f.geo,m.role=f),-1!==g&&(m.status=n.ostatus?{}:new Array(o).fill(null),m.extension={status:{label:{}}},d.forEach((function(e){m.extension.status.label[e.id]=e.name})),h=n.ostatus?function(){var e=a[y][g];null!==e&&(m.status[v(m,w)]=d[e].id)}:function(){var e=a[y][g];m.status[v(m,w)]=null===e?null:d[e].id}),g++,a){var w=y.split(":");n.ovalue&&null===a[y][0]||(m.value[v(m,w)]=a[y][0]),h()}return n.instance?e(m):m},exports.fromTable=i,exports.join=function(t,n){if(void 0===t||!Array.isArray(t))return null;var r=JSON.parse(JSON.stringify(t)),a=r[0];if(!a.hasOwnProperty("version")||!a.hasOwnProperty("class")||"dataset"!==a.class)return null;void 0===n&&(n={});var l=void 0===n.label?null:n.label,o=void 0===n.by?null:n.by,s=[];if(null===o){for(var u=1,c=r.length;u<c;u++)s=s.concat(r[u].value);return a.value=s,null!==l&&(a.label=l),a}var d,f,h,v=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var r in t)e[r]=0===t[r]?n:t[r];return e};r.forEach((function(t,n){var r=e(t).toTable({status:!0}),a=t.dimension[o].category;0===n?(s=[r[0]],d=a.index,f=a.label,h=a.unit):(d=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var r in t)e[r]=t[r]+n;return e}(d,a.index,Object.keys(d).length),f=v(f,a.label,n),h=v(h,a.unit,n)),s=s.concat(r.slice(1))}));var b=i(s);return a.value=b.value,a.size=b.size,a.status=b.status||null,a.label=l||"",a.href=null,a.dimension[o].category.index=d||null,a.dimension[o].category.label=f||null,a.dimension[o].category.unit=h||null,a},exports.tbrowser=function(e,l,i){function o(e){void 0!==l?l.innerHTML=s[e]:window.alert(s[e])}if(void 0!==e)if(void 0!==l){void 0===i&&(i={});var s=void 0===i.i18n||void 0===i.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:i.i18n.msgs,u=void 0===i.i18n||void 0===i.i18n.locale?"en-US":i.i18n.locale,c=i.dsid||0,d=i.status||!1,f=i.tblclass||"",h=i.nonconst||!1,v=t(e,c);if(n(v)){if(h)var b=function(e){var t=0,n=e.size.slice(0),r=[];return n.forEach((function(n,a){var l=a-t,i=e.Dimension(l);1===n&&(delete e.__tree__.dimension[e.id[l]],e.size.splice(l,1),e.id.splice(l,1),e.length--,t++,r.push(i.label.capitalize()+": "+i.Category(0).label.capitalize()))})),r}(v);1!==v.length?function e(t,n,l,o){"function"==typeof i.callback&&i.callback(l);var c="",f="",v="",p="",g=l.rows,m=n.Dimension(g),y=m.id,w=l.cols,O=n.Dimension(w),E=O.id,S=n.role&&n.role.metric?n.role.metric[0]:null,x=null!==S?n.Dimension(S):null,A=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},D=l.filters,P=JSON.parse(JSON.stringify(D)),j=[],k="",z="",C=n.source?s.source+": "+n.source:"",N=null!==n.label?'<span class="label">'+n.label.capitalize()+"</span>":"";for(var R in h&&b.length&&(N='<span class="label">'+b.join(". ")+"</span>"),""!==C&&"."!==C.slice(-1)&&(C+="."),v+="<caption>"+N+"<form>",D){var _=n.Dimension(R),L=_.label?_.label.capitalize():R.capitalize();_.length>1?k+="<p>"+a(n,R,[D[R],null])+" <strong>"+L+"</strong></p>":j.push({label:L,value:r(_,_.Category(0)),name:R,id:_.id[0]})}""!==k&&(k='<fieldset id="filters"><legend>'+s.filters+"</legend>"+k+"</fieldset>"),j.forEach((function(e){z+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'})),""!==z&&(z='<fieldset id="constants"><legend>'+s.constants+"</legend>"+z+"</fieldset>"),v+=z+k+'<fieldset id="rowscols"><legend>'+s.rc+"</legend>"+a(n,"rows",[g,w])+" <a>&#x2194;</a> "+a(n,"cols",[w,g])+"</fieldset></form></caption>",p+="<tbody>";var T=Number.toLocaleString&&"none"!==u?function(e,t){return null===t?e.toLocaleString(u):e.toLocaleString(u,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};if(y.forEach((function(e){P[g]=e;var t=n.Data(P),a=function(e,t){var n,r=w!==S?null===x?null:A(x.Category(P[S])):A(O.Category(t));null!==e.value?(n=T(e.value,r),d&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||s.na,p+="<td>"+n+"</td>"};null!==t?(p+='<tr><th scope="row">'+r(m,m.Category(e))+"</th>",Array.isArray(t)?t.forEach((function(e,t){a(e,t)})):a(t,0),p+="</tr>"):p="ERROR"})),"ERROR"===p)return s.dataerror;p+="</tbody>",c+="<thead><tr><th></th>",E.forEach((function(e){c+='<th scope="col">'+r(O,O.Category(e))+"</th>"})),c+="</tr></thead>",""!==C&&(f='<tfoot><tr><td colspan="'+(E.length+1)+'">'+C+"</td></tr></tfoot>"),t.innerHTML='<table class="'+o+'">'+v+c+p+f+"</table>",[].slice.call(t.querySelectorAll("select")).forEach((function(r){r.addEventListener("change",(function(r){var a,l;e(t,n,function(e,t,n){var r={filters:{}};return n.forEach((function(e){"rows"===e.name||"cols"===e.name?r[e.name]=e.value:r.filters[e.name]=e.value})),"rowscols"===t&&e.id.forEach((function(t,n){t!==r.rows&&t!==r.cols?void 0===r.filters[t]&&(r.filters[t]=e.Dimension(n).id[0]):delete r.filters[t]})),r}(n,r.target.parentElement.getAttribute("id"),(a=t,l=[],[].slice.call(a.querySelectorAll("select, input")).forEach((function(e){l.push({name:e.name,value:e.value})})),l)),o)}),!1)})),t.querySelector("a").addEventListener("click",(function(){l.cols=g,l.rows=w,e(t,n,l,o)}),!1)}(l,v,function(e,t){if("object"==typeof t)return{rows:t.rows,cols:t.cols,filters:t.filters};var n,r,a={},l=[],i=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach((function(e,t){l.push({id:i[t],len:e.length})})),l.sort(o),n=l[0].id,r=l[1].id}else n=i[0],r=i[1];return e.Dimension(n).length<e.Dimension(r).length&&(n=r+(r=n,"")),i.forEach((function(t){t!==n&&t!==r&&(a[t]=e.Dimension(t).id[0])})),{rows:n,cols:r,filters:a}}(v,i.preset),f):o("dimerror")}else o("jsonerror")}else o("selerror");else o("urierror")},exports.toCSV=function(e,r){if(void 0===e)return null;void 0===r&&(r={});var a=!1,l=!0===r.rich,i=r.content||"label",s=r.field||"label",u=l?"value":r.vlabel||"Value",c=l?"status":r.slabel||"Status",d=!0===r.status,f=r.na||"n/a",h=r.delimiter||",",v=r.separator||"|",b=";"===h?r.decimal||",":r.decimal||".",p=!0===r.array,g=t(e,r.dsid||0),m=p?[]:"",y=p?[]:"",w=p?function(e){m.push(e)}:function(e){m+=e+"\n"},O=p?function(e){y.push(e)}:function(e){y+=e+"\n"};if(!n(g))return null;l?d=null!==g.status:"[id] label"===i&&(a=!0,i="id");var E=g.toTable({vlabel:u,slabel:c,status:d,field:l?"id":s,content:l||a?"id":i,type:"array"}),S=E[0].indexOf("id"===s?"value":u),x=d?E[0].indexOf("id"===s?"status":c):-1;return E.forEach((function(e,t){e.forEach((function(n,r){var l,i=g.Dimension(r);t&&r===S?null===n?e[r]=o(f,h):"."!==b&&(e[r]=String(e[r]).replace(".",b)):t&&r===x&&null===n?e[r]="":(a&&t&&(l=i.Category(e[r]).label,e[r]="["+e[r]+"] "+l),e[r]=o(e[r],h))})),w(e.join(h))})),l&&(O("jsonstat"+h+b+h+v),["label","source","updated","href"].forEach((function(e){g[e]&&O(e+h+o(g[e],h))})),g.id.forEach((function(e,t){var n=[],r=g.Dimension(t),a=r.role,l=!1,i="";i+="dimension"+h+o(e,h)+h+o(r.label,h)+h+r.length,"metric"===a&&r.__tree__.category.unit&&(l=!0),r.id.forEach((function(e,t){var a=[],s=r.Category(t);i+=h+o(e,h)+h+o(s.label,h),l&&(a.push(s.unit.hasOwnProperty("decimals")?s.unit.decimals:""),a.push(s.unit.label||""),s.unit.symbol&&(a.push(s.unit.symbol),a.push(s.unit.position)),n.push(o(a.join(v),h)))})),null!==a&&"classification"!==a&&(i+=h+r.role,l&&(i+=h+n.join(h))),O(i)})),m=p?y.concat(["data"],m):y+"data\n"+m),m},exports.version="3.4.0";
