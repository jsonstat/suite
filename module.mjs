// jsonstat-suite v3.1.6 Copyright 2021 Xavier Badosa https://jsonstat.com
import e from"jsonstat-toolkit";function t(t,n){return null==t?null:("string"!=typeof t&&void 0!==t.length||(t=e(t)),0===t.length||"dataset"!==t.class&&"collection"!==t.class&&"bundle"!==t.class?null:"dataset"===t.class?t:t.Dataset(n))}function n(e){if(null===e||0===e.length||"dataset"!==e.class)return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n===e.n}function l(e,t,n){var l,r,a,i,o;return(t.label||n).capitalize()+(r=t,o="",(l=e)&&"metric"===l.role&&r.unit&&(a=r.unit.hasOwnProperty("label")?r.unit.label:"")+(i=r.unit.hasOwnProperty("symbol")?r.unit.symbol:"")!==""&&(o=" ("+(o=""===i?a:""===a?i:"start"===r.unit.position?i+a:a+" "+i)+")"),o)}function r(e,t,n){var r,a='<select name="'+t+'">',i=[];if(null!==n[1]){if(r=e.id,i=e.Dimension(),2===r.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var o=e.Dimension(t);if(r=o.id,i=o.Category(),1===r.length)return}return r.forEach((function(e,t){var r=e!==n[0]?"":'selected="selected" ';null!==n[1]&&e===n[1]||(a+="<option "+r+'value="'+e+'">'+l(o,i[t],e)+"</option>")})),a+="</select>"}function a(e,a,i){function o(e){void 0!==a?a.innerHTML=s[e]:window.alert(s[e])}if(void 0!==e)if(void 0!==a){void 0===i&&(i={});var s=void 0===i.i18n||void 0===i.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:i.i18n.msgs,u=void 0===i.i18n||void 0===i.i18n.locale?"en-US":i.i18n.locale,c=i.dsid||0,d=i.status||!1,f=i.tblclass||"",h=i.nonconst||!1,v=t(e,c);if(n(v)){if(h)var p=function(e){var t=0,n=e.size.slice(0),l=[];return n.forEach((function(n,r){var a=r-t,i=e.Dimension(a);1===n&&(delete e.__tree__.dimension[e.id[a]],e.size.splice(a,1),e.id.splice(a,1),e.length--,t++,l.push(i.label.capitalize()+": "+i.Category(0).label.capitalize()))})),l}(v);1!==v.length?function e(t,n,a,i){var o="",c="",f="",v="",b=a.rows,g=n.Dimension(b),m=g.id,y=a.cols,w=n.Dimension(y),E=w.id,O=n.role&&n.role.metric?n.role.metric[0]:null,S=null!==O?n.Dimension(O):null,x=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},A=a.filter,D=JSON.parse(JSON.stringify(A)),P=[],j="",z="",N=n.source?s.source+": "+n.source:"",C=null!==n.label?'<span class="label">'+n.label.capitalize()+"</span>":"";for(var R in h&&p.length&&(C='<span class="label">'+p.join(". ")+"</span>"),""!==N&&"."!==N.slice(-1)&&(N+="."),f+="<caption>"+C+"<form>",A){var _=n.Dimension(R),L=_.label?_.label.capitalize():R.capitalize();_.length>1?j+="<p>"+r(n,R,[A[R],null])+" <strong>"+L+"</strong></p>":P.push({label:L,value:l(_,_.Category(0)),name:R,id:_.id[0]})}""!==j&&(j='<fieldset id="filters"><legend>'+s.filters+"</legend>"+j+"</fieldset>"),P.forEach((function(e){z+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'})),""!==z&&(z='<fieldset id="constants"><legend>'+s.constants+"</legend>"+z+"</fieldset>"),f+=z+j+'<fieldset id="rowscols"><legend>'+s.rc+"</legend>"+r(n,"rows",[b,y])+" <a>&#x2194;</a> "+r(n,"cols",[y,b])+"</fieldset></form></caption>",v+="<tbody>";var k=Number.toLocaleString&&"none"!==u?function(e,t){return null===t?e.toLocaleString(u):e.toLocaleString(u,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};if(m.forEach((function(e){D[b]=e;var t=n.Data(D),r=function(e,t){var n,l=y!==O?null===S?null:x(S.Category(D[O])):x(w.Category(t));null!==e.value?(n=k(e.value,l),d&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||s.na,v+="<td>"+n+"</td>"};null!==t?(v+='<tr><th scope="row">'+l(g,g.Category(e))+"</th>",Array.isArray(t)?t.forEach((function(e,t){r(e,t)})):r(t,0),v+="</tr>"):v="ERROR"})),"ERROR"===v)return s.dataerror;v+="</tbody>",o+="<thead><tr><th></th>",E.forEach((function(e){o+='<th scope="col">'+l(w,w.Category(e))+"</th>"})),o+="</tr></thead>",""!==N&&(c='<tfoot><tr><td colspan="'+(E.length+1)+'">'+N+"</td></tr></tfoot>"),t.innerHTML='<table class="'+i+'">'+f+o+v+c+"</table>",[].slice.call(t.querySelectorAll("select")).forEach((function(l){l.addEventListener("change",(function(l){var r,a;e(t,n,function(e,t,n){var l={filter:{}};return n.forEach((function(e){"rows"===e.name||"cols"===e.name?l[e.name]=e.value:l.filter[e.name]=e.value})),"rowscols"===t&&e.id.forEach((function(t,n){t!==l.rows&&t!==l.cols?void 0===l.filter[t]&&(l.filter[t]=e.Dimension(n).id[0]):delete l.filter[t]})),l}(n,l.target.parentElement.getAttribute("id"),(r=t,a=[],[].slice.call(r.querySelectorAll("select, input")).forEach((function(e){a.push({name:e.name,value:e.value})})),a)),i)}),!1)})),t.querySelector("a").addEventListener("click",(function(){a.cols=b,a.rows=y,e(t,n,a,i)}),!1)}(a,v,function(e,t){var n,l,r={},a=[],i=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach((function(e,t){a.push({id:i[t],len:e.length})})),a.sort(o),n=a[0].id,l=a[1].id}else n=i[0],l=i[1];return e.Dimension(n).length<e.Dimension(l).length&&(n=l+(l=n,"")),i.forEach((function(t){t!==n&&t!==l&&(r[t]=e.Dimension(t).id[0])})),{rows:n,cols:l,filter:r}}(v,i.preset),f):o("dimerror")}else o("jsonerror")}else o("selerror");else o("urierror")}function i(e,l){if(void 0===e)return null;void 0===l&&(l={});var r="",a="",i="",o=0,s=l.na||"n/a",u=l.dsid||0,c=l.vlabel||null,d=l.slabel||null,f=l.counter||!1,h=l.tblclass||"",v=l.numclass||"",p=l.valclass||"",b=l.status||!1,g=l.locale||"en-US",m=l.source||"Source",y=t(e,u),w=y.role&&y.role.metric?y.id.indexOf(y.role.metric[0]):null,E=y.Dimension({role:"metric"}),O={},S=Number.toLocaleString&&"none"!==g?function(e,t){return null===t?e.toLocaleString(g):e.toLocaleString(g,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)},x=function(e,t){var n=null;e.forEach((function(e,l){var i=P===l?' class="'+v+" "+p+'"':"",o=s;t?(w===l&&(n=O[e]),null!==e&&(o=P===l?S(e,n):e),a+="<td"+i+">"+o+"</td>"):r+="<th"+i+">"+e+"</th>"}))},A=f?function(e,t){a+="<tr>",r+="<tr>",t?a+='<td class="'+v+'">'+t+"</td>":r+='<th class="'+v+'">#</th>',x(e,t),a+="</tr>",r+="</tr>"}:function(e,t){a+="<tr>",r+="<tr>",x(e,t),a+="</tr>",r+="</tr>"};if(!n(y))return null;E&&E[0].Category().forEach((function(e){var t=e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null;O[e.label]=t}));var D=y.toTable({status:b,vlabel:c,slabel:d}),P=D[0].length-1;return D.forEach((function(e,t){A(e,t)})),y.source&&(o=y.length+1,f&&o++,b&&o++,"."!==(m+=": "+y.source).slice(-1)&&(m+="."),i='<tfoot><td colspan="'+o+'">'+m+"</td></tfoot>"),'<table class="'+h+'"><caption>'+(l.caption||y.label||"")+"</caption><thead>"+r+"</thead><tbody>"+a+"</tbody>"+i+"</table>"}function o(e,t){var n={};return Array.isArray(e[t])?(e[t].forEach((function(e,t){null!==e&&(n[String(t)]=e)})),n):e[t]}function s(t,n){if(void 0===t)return null;void 0===n&&(n={}),"boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1);var l=n.vlabel||"Value",r=n.slabel||"Status",a=n.type||"array",i=n.label||"",s=n.header||null,u=[],c=[],d=[],f=[],h={},v={},p=function(e,t){for(var n=1,l=0,r=0;r<O;r++)l+=(n*=r>0?t[O-r]:1)*e[O-r-1];return l},b=function(){var e=t[S][l];d[p(x,c)]=isNaN(e)?null:e};switch(a){case"array":t=function(e){for(var t=e[0],n=e.slice(1),l=[],r=0,a=n.length;r<a;r++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[r][i];l.push(s)}return l}(t);break;case"object":t=function(e){for(var t=e.cols.map((function(e){return e.id})),n=e.rows,l=[],r=0,a=n.length;r<a;r++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[r].c[i].v;l.push(s)}return l}(t)}var g,m=t.length;for(var y in n.hasOwnProperty("drop")&&Array.isArray(n.drop)&&n.drop.length&&t.forEach((function(e){n.drop.forEach((function(t){delete e[t]}))})),t[0])if(y!==l)if(y!==r){if(u.push(y),s)g=s.dimension[y],h[y]=g.category.index;else{h[y]=[];for(var w=0;w<m;w++){var E=t[w][y];-1===h[y].indexOf(E)&&h[y].push(E)}}c.push(h[y].length),v[y]={label:s?g.label:y,category:{index:h[y]}},s&&(v[y].category.label=g.category.label,g.category.unit&&(v[y].category.unit=g.category.unit))}else b=function(){var e=t[S][l],n=t[S][r];d[p(x,c)]=isNaN(e)?null:e,f[p(x,c)]=""===n?null:n};for(var O=u.length,S=0;S<m;S++){for(var x=[],A=0;A<O;A++){var D=u[A];x.push(h[D].indexOf(t[S][D]))}b()}var P={version:"2.0",class:"dataset",value:d,dimension:v,id:u,size:c};return i&&(P.label=i),f.length&&(P.status=f),s&&(s.label&&(P.label=s.label),s.source&&(P.source=s.source),s.updated&&(P.updated=s.updated),s.href&&(P.href=s.href),s.role&&(P.role=s.role)),n.ovalue&&(P.value=o(P,"value")),n.ostatus&&P.hasOwnProperty("status")&&(P.status=o(P,"status")),n.instance?e(P):P}function u(e,t){if(void 0===e)return null;void 0===t&&(t={});var n,l,r,a=[],i=null,o=null,u=!1,c={time:[],geo:[],metric:[]},d="jsonstat"===e.substring(0,8),f=d?"value":t.vlabel,h=d?"status":t.slabel,v=d?e.substring(8,9):t.delimiter||",",p=";"===v?t.decimal||",":t.decimal||".",b=function(e,t){t=t||",";for(var n,l,r=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),a=[[]],i=null;i=r.exec(e);)(l=i[1]).length&&l!=t&&a.push([]),n=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],a[a.length-1].push(n);return a}(e.trim(),v);if(d){for(p=b[0][1],r=b[0][2],b.shift();"data"!==b[0][0];)a.push(b.shift());b.shift(),o={dimension:{}},a.forEach((function(e){var t,n,l,a,i,s,d,f;switch(e[0]){case"dimension":if(o.dimension[e[1]]={},(a=o.dimension[e[1]]).label=e[2],a.category={},(i=a.category).index=[],n={},l=2*e[3]+3,e.length>=l){for(t=4;t<l;t++)d=e[t],f=e[++t],Object.defineProperty(n,d,{value:f,writable:!0,configurable:!0,enumerable:!0}),i.label=n,i.index.push(d);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(c[e[t]].push(e[1]),u=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(i.unit={},i.index.forEach((function(n,l){var a=e[t+l].split(r);i.unit[n]={},s=i.unit[n],void 0!==a[0]&&""!==a[0]&&(s.decimals=1*a[0]),void 0!==a[1]&&""!==a[1]&&(s.label=a[1]),void 0!==a[2]&&""!==a[2]&&(s.symbol=a[2]),void 0!==a[1]&&-1!==["start","end"].indexOf(a[3])&&(s.position=a[3])}))))}break;case"label":case"source":case"updated":case"href":o[e[0]]=e[1]||null}})),u&&(c.time.length||delete c.time,c.geo.length||delete c.geo,c.metric.length||delete c.metric,o.role=c)}if(n=b.length,l=b[0].length,void 0!==f){for(;l--;)if(b[0][l]===f){i=l;break}if(null===i)return null}else i=l-1,f=b[0][i];if(","===p)for(l=1;l<n;l++)b[l][i]=Number(b[l][i].replace(",","."));else for(l=1;l<n;l++)b[l][i]=Number(b[l][i]);return s(b,{header:o,vlabel:f,slabel:h,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1,instance:t.instance||!1})}function c(t,n){if("object"!=typeof t||!t.hasOwnProperty("dataSets")||!Array.isArray(t.dataSets))return null;if(1!==t.dataSets.length)return null;if(!t.dataSets[0].hasOwnProperty("observations"))return null;void 0===n?n={ovalue:!1,ostatus:!1,instance:!1}:("boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1));var l=t.structure,r=t.dataSets[0].observations,a=l.attributes.observation,i=l.dimensions;if(!i.hasOwnProperty("observation"))return null;if(i.hasOwnProperty("series")&&(null!==i.series||Object.keys(i.series).length))return null;var o=1,s=[],u=[],c={},d=[],f={time:[],geo:[]},h=function(){},v=function(e,t){for(var n=e.size,l=n.length-t.length;l--;)t.push(0);for(var r=0,a=n.length,i=0,o=1;r<a;r++)i+=(o*=r>0?n[a-r]:1)*t[a-r-1];return i},p=function(e){if(c[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":f.geo.push(e.id);break;case"TIME_PERIOD":f.time.push(e.id)}Object.defineProperty(c[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),s.push(e.id),u.push(e.values.length),o*=e.values.length;var t=c[e.id].category;e.values.forEach((function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})}))},b=t.header.links.find((function(e){return"request"===e.rel})),g=a.findIndex((function(e){return"OBS_STATUS"===e.id}));-1!==g&&(a[g].values.length?d=a[g].values:g=-1),i.observation.forEach(p),i.hasOwnProperty("dataSet")&&i.dataSet.forEach(p);var m=new Array(o),y={version:"2.0",class:"dataset",updated:t.header.prepared||null,source:t.header.sender.name||null,label:l.name||null,id:s,size:u,dimension:c,value:n.ovalue?{}:m.fill(null)};for(var w in b&&(y.link={alternate:[{type:"application/vnd.sdmx.data+json",href:b.href}]}),f.geo.length+f.time.length>0&&(f.time.length||delete f.time,f.geo.length||delete f.geo,y.role=f),-1!==g&&(y.status=n.ostatus?{}:[],y.extension={status:{label:{}}},d.forEach((function(e){y.extension.status.label[e.id]=e.name})),h=n.ostatus?function(){var e=r[w][g];null!==e&&(y.status[v(y,E)]=d[e].id)}:function(){var e=r[w][g];y.status[v(y,E)]=null===e?null:d[e].id}),g++,r){var E=w.split(":");n.ovalue&&null===r[w][0]||(y.value[v(y,E)]=r[w][0]),h()}return n.instance?e(y):y}function d(t,n){if(void 0===t||!Array.isArray(t))return null;var l=JSON.parse(JSON.stringify(t)),r=l[0];if(!r.hasOwnProperty("version")||!r.hasOwnProperty("class")||"dataset"!==r.class)return null;void 0===n&&(n={});var a=void 0===n.label?null:n.label,i=void 0===n.by?null:n.by,o=[];if(null===i){for(var u=1,c=l.length;u<c;u++)o=o.concat(l[u].value);return r.value=o,null!==a&&(r.label=a),r}var d,f,h,v=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var l in t)e[l]=0===t[l]?n:t[l];return e};l.forEach((function(t,n){var l=e(t).toTable({status:!0}),r=t.dimension[i].category;0===n?(o=[l[0]],d=r.index,f=r.label,h=r.unit):(d=v(d,r.index,n),f=v(f,r.label,n),h=v(h,r.unit,n)),o=o.concat(l.slice(1))}));var p=s(o);return r.value=p.value,r.size=p.size,r.status=p.status||null,r.label=a||"",r.href=null,r.dimension[i].category.index=d||null,r.dimension[i].category.label=f||null,r.dimension[i].category.unit=h||null,r}function f(e,t){return null==e?"":-1!==e.indexOf(t)?'"'+e+'"':e}function h(e,l){if(void 0===e)return null;void 0===l&&(l={});var r="",a="jsonstat",i=!0===l.rich,o=i?"value":l.vlabel||"Value",s=i?"status":l.slabel||"Status",u=!0===l.status,c=l.na||"n/a",d=l.delimiter||",",h=l.separator||"|",v=";"===d?l.decimal||",":l.decimal||".",p=t(e,l.dsid||0);if(!n(p))return null;i&&(u=null!==p.status);var b=p.toTable({vlabel:o,slabel:s,status:u,field:i?"id":"label",content:i?"id":"label",type:"array"}),g=b[0].indexOf(o),m=u?b[0].indexOf(s):-1;return b.forEach((function(e,t){e.forEach((function(n,l){t&&l===g?null===n?e[l]=f(c,d):"."!==v&&(e[l]=String(e[l]).replace(".",v)):e[l]=t&&l===m&&null===n?"":f(e[l],d)})),r+=e.join(d)+"\n"})),i&&(a+=d+v+d+h+"\n",["label","source","updated","href"].forEach((function(e){p[e]&&(a+=e+d+f(p[e],d)+"\n")})),p.id.forEach((function(e,t){var n=[],l=p.Dimension(t),r=l.role,i=!1;a+="dimension"+d+f(e,d)+d+f(l.label,d)+d+l.length,"metric"===r&&l.__tree__.category.unit&&(i=!0),l.id.forEach((function(e,t){var r=[],o=l.Category(t);a+=d+f(e,d)+d+f(o.label,d),i&&(r.push(o.unit.hasOwnProperty("decimals")?o.unit.decimals:""),r.push(o.unit.label||""),o.unit.symbol&&(r.push(o.unit.symbol),r.push(o.unit.position)),n.push(f(r.join(h),d)))})),null!==r&&"classification"!==r&&(a+=d+l.role,i&&(a+=d+n.join(d))),a+="\n"})),r=a+"data\n"+r),r}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};var v="3.1.6";export{i as datalist,u as fromCSV,c as fromSDMX,s as fromTable,d as join,a as tbrowser,h as toCSV,v as version};
