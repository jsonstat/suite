// jsonstat-suite v3.2.3 Copyright 2021 Xavier Badosa https://jsonstat.com
import e from"jsonstat-toolkit";function t(t,n){return null==t?null:("string"!=typeof t&&void 0!==t.length||(t=e(t)),0===t.length||"dataset"!==t.class&&"collection"!==t.class&&"bundle"!==t.class?null:"dataset"===t.class?t:t.Dataset(n))}function n(e){if(null===e||0===e.length||"dataset"!==e.class)return!1;for(var t=e.length,n=1;t--;)n*=e.Dimension(t).length;return n===e.n}function r(e,t,n){var r,l,a,i,o;return(t.label||n).capitalize()+(l=t,o="",(r=e)&&"metric"===r.role&&l.unit&&(a=l.unit.hasOwnProperty("label")?l.unit.label:"")+(i=l.unit.hasOwnProperty("symbol")?l.unit.symbol:"")!==""&&(o=" ("+(o=""===i?a:""===a?i:"start"===l.unit.position?i+a:a+" "+i)+")"),o)}function l(e,t,n){var l,a='<select name="'+t+'">',i=[];if(null!==n[1]){if(l=e.id,i=e.Dimension(),2===l.length)return(e.Dimension(n[0]).label||n[0]).capitalize()}else{var o=e.Dimension(t);if(l=o.id,i=o.Category(),1===l.length)return}return l.forEach((function(e,t){var l=e!==n[0]?"":'selected="selected" ';null!==n[1]&&e===n[1]||(a+="<option "+l+'value="'+e+'">'+r(o,i[t],e)+"</option>")})),a+="</select>"}function a(e,a,i){function o(e){void 0!==a?a.innerHTML=s[e]:window.alert(s[e])}if(void 0!==e)if(void 0!==a){void 0===i&&(i={});var s=void 0===i.i18n||void 0===i.i18n.msgs?{urierror:"tbrowser: A valid JSON-stat input must be specified.",selerror:"tbrowser: A valid selector must be specified.",jsonerror:"The request did not return a valid JSON-stat dataset.",dimerror:"Only one dimension was found in the dataset. At least two are required.",dataerror:"Selection returned no data!",source:"Source",filters:"Filters",constants:"Constants",rc:"Rows &amp; Columns",na:"n/a"}:i.i18n.msgs,u=void 0===i.i18n||void 0===i.i18n.locale?"en-US":i.i18n.locale,c=i.dsid||0,d=i.status||!1,f=i.tblclass||"",h=i.nonconst||!1,v=t(e,c);if(n(v)){if(h)var b=function(e){var t=0,n=e.size.slice(0),r=[];return n.forEach((function(n,l){var a=l-t,i=e.Dimension(a);1===n&&(delete e.__tree__.dimension[e.id[a]],e.size.splice(a,1),e.id.splice(a,1),e.length--,t++,r.push(i.label.capitalize()+": "+i.Category(0).label.capitalize()))})),r}(v);1!==v.length?function e(t,n,a,i){var o="",c="",f="",v="",p=a.rows,g=n.Dimension(p),m=g.id,y=a.cols,w=n.Dimension(y),E=w.id,O=n.role&&n.role.metric?n.role.metric[0]:null,S=null!==O?n.Dimension(O):null,x=function(e){return e.hasOwnProperty("unit")&&e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null},A=a.filter,D=JSON.parse(JSON.stringify(A)),P=[],j="",z="",N=n.source?s.source+": "+n.source:"",k=null!==n.label?'<span class="label">'+n.label.capitalize()+"</span>":"";for(var C in h&&b.length&&(k='<span class="label">'+b.join(". ")+"</span>"),""!==N&&"."!==N.slice(-1)&&(N+="."),f+="<caption>"+k+"<form>",A){var R=n.Dimension(C),_=R.label?R.label.capitalize():C.capitalize();R.length>1?j+="<p>"+l(n,C,[A[C],null])+" <strong>"+_+"</strong></p>":P.push({label:_,value:r(R,R.Category(0)),name:C,id:R.id[0]})}""!==j&&(j='<fieldset id="filters"><legend>'+s.filters+"</legend>"+j+"</fieldset>"),P.forEach((function(e){z+="<p>"+e.value+" <strong>"+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />'})),""!==z&&(z='<fieldset id="constants"><legend>'+s.constants+"</legend>"+z+"</fieldset>"),f+=z+j+'<fieldset id="rowscols"><legend>'+s.rc+"</legend>"+l(n,"rows",[p,y])+" <a>&#x2194;</a> "+l(n,"cols",[y,p])+"</fieldset></form></caption>",v+="<tbody>";var L=Number.toLocaleString&&"none"!==u?function(e,t){return null===t?e.toLocaleString(u):e.toLocaleString(u,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)};if(m.forEach((function(e){D[p]=e;var t=n.Data(D),l=function(e,t){var n,r=y!==O?null===S?null:x(S.Category(D[O])):x(w.Category(t));null!==e.value?(n=L(e.value,r),d&&null!==e.status&&(n+=" ("+e.status+")")):n=e.status||s.na,v+="<td>"+n+"</td>"};null!==t?(v+='<tr><th scope="row">'+r(g,g.Category(e))+"</th>",Array.isArray(t)?t.forEach((function(e,t){l(e,t)})):l(t,0),v+="</tr>"):v="ERROR"})),"ERROR"===v)return s.dataerror;v+="</tbody>",o+="<thead><tr><th></th>",E.forEach((function(e){o+='<th scope="col">'+r(w,w.Category(e))+"</th>"})),o+="</tr></thead>",""!==N&&(c='<tfoot><tr><td colspan="'+(E.length+1)+'">'+N+"</td></tr></tfoot>"),t.innerHTML='<table class="'+i+'">'+f+o+v+c+"</table>",[].slice.call(t.querySelectorAll("select")).forEach((function(r){r.addEventListener("change",(function(r){var l,a;e(t,n,function(e,t,n){var r={filter:{}};return n.forEach((function(e){"rows"===e.name||"cols"===e.name?r[e.name]=e.value:r.filter[e.name]=e.value})),"rowscols"===t&&e.id.forEach((function(t,n){t!==r.rows&&t!==r.cols?void 0===r.filter[t]&&(r.filter[t]=e.Dimension(n).id[0]):delete r.filter[t]})),r}(n,r.target.parentElement.getAttribute("id"),(l=t,a=[],[].slice.call(l.querySelectorAll("select, input")).forEach((function(e){a.push({name:e.name,value:e.value})})),a)),i)}),!1)})),t.querySelector("a").addEventListener("click",(function(){a.cols=p,a.rows=y,e(t,n,a,i)}),!1)}(a,v,function(e,t){var n,r,l={},a=[],i=e.id;if(t){var o="bigger"===t?function(e,t){return e.len<t.len?1:-1}:function(e,t){return e.len>t.len?1:-1};e.Dimension().forEach((function(e,t){a.push({id:i[t],len:e.length})})),a.sort(o),n=a[0].id,r=a[1].id}else n=i[0],r=i[1];return e.Dimension(n).length<e.Dimension(r).length&&(n=r+(r=n,"")),i.forEach((function(t){t!==n&&t!==r&&(l[t]=e.Dimension(t).id[0])})),{rows:n,cols:r,filter:l}}(v,i.preset),f):o("dimerror")}else o("jsonerror")}else o("selerror");else o("urierror")}function i(e,r){if(void 0===e)return null;void 0===r&&(r={});var l="",a="",i="",o=0,s=r.na||"n/a",u=r.dsid||0,c=r.vlabel||null,d=r.slabel||null,f=r.counter||!1,h=r.tblclass||"",v=r.numclass||"",b=r.valclass||"",p=r.status||!1,g=r.locale||"en-US",m=r.source||"Source",y=t(e,u),w=y.role&&y.role.metric?y.id.indexOf(y.role.metric[0]):null,E=y.Dimension({role:"metric"}),O={},S=Number.toLocaleString&&"none"!==g?function(e,t){return null===t?e.toLocaleString(g):e.toLocaleString(g,{minimumFractionDigits:t,maximumFractionDigits:t})}:function(e,t){return null===t?e:e.toFixed(t)},x=function(e,t){var n=null;e.forEach((function(e,r){var i=P===r?' class="'+v+" "+b+'"':"",o=s;t?(w===r&&(n=O[e]),null!==e&&(o=P===r?S(e,n):e),a+="<td"+i+">"+o+"</td>"):l+="<th"+i+">"+e+"</th>"}))},A=f?function(e,t){t?a+='<tr><td class="'+v+'">'+t+"</td>":l+='<th class="'+v+'">#</th>',x(e,t),a+="</tr>"}:function(e,t){a+="<tr>",x(e,t),a+="</tr>"};if(!n(y))return null;E&&E[0].Category().forEach((function(e){var t=e.unit&&e.unit.hasOwnProperty("decimals")?e.unit.decimals:null;O[e.label]=t}));var D=y.toTable({status:p,vlabel:c,slabel:d}),P=D[0].length-1;return D.forEach((function(e,t){A(e,t)})),y.source&&(o=y.length+1,f&&o++,p&&o++,"."!==(m+=": "+y.source).slice(-1)&&(m+="."),i='<tfoot><td colspan="'+o+'">'+m+"</td></tfoot>"),'<table class="'+h+'"><caption>'+(r.caption||y.label||"")+"</caption><thead><tr>"+l+"</tr></thead><tbody>"+a+"</tbody>"+i+"</table>"}function o(e,t){var n={};return Array.isArray(e[t])?(e[t].forEach((function(e,t){null!==e&&(n[String(t)]=e)})),n):e[t]}function s(t,n){if(void 0===t)return null;void 0===n&&(n={}),"boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1);var r=n.vlabel||"Value",l=n.slabel||"Status",a=n.type||"array",i=n.label||"",s=n.header||null,u=[],c=[],d=[],f=[],h={},v={},b=function(e,t){for(var n=1,r=0,l=0;l<O;l++)r+=(n*=l>0?t[O-l]:1)*e[O-l-1];return r},p=function(){var e=t[S][r];d[b(x,c)]=isNaN(e)?null:e};switch(a){case"array":t=function(e){for(var t=e[0],n=e.slice(1),r=[],l=0,a=n.length;l<a;l++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[l][i];r.push(s)}return r}(t);break;case"object":t=function(e){for(var t=e.cols.map((function(e){return e.id})),n=e.rows,r=[],l=0,a=n.length;l<a;l++){for(var i=0,o=t.length,s={};i<o;i++)s[t[i]]=n[l].c[i].v;r.push(s)}return r}(t)}var g,m=t.length;for(var y in n.hasOwnProperty("drop")&&Array.isArray(n.drop)&&n.drop.length&&t.forEach((function(e){n.drop.forEach((function(t){delete e[t]}))})),t[0])if(y!==r)if(y!==l){if(u.push(y),s)g=s.dimension[y],h[y]=g.category.index;else{h[y]=[];for(var w=0;w<m;w++){var E=t[w][y];-1===h[y].indexOf(E)&&h[y].push(E)}}c.push(h[y].length),v[y]={label:s?g.label:y,category:{index:h[y]}},s&&(v[y].category.label=g.category.label,g.category.unit&&(v[y].category.unit=g.category.unit))}else p=function(){var e=t[S][r],n=t[S][l];d[b(x,c)]=isNaN(e)?null:e,f[b(x,c)]=""===n?null:n};for(var O=u.length,S=0;S<m;S++){for(var x=[],A=0;A<O;A++){var D=u[A];x.push(h[D].indexOf(t[S][D]))}p()}var P={version:"2.0",class:"dataset",value:d,dimension:v,id:u,size:c};return i&&(P.label=i),f.length&&(P.status=f),s&&(s.label&&(P.label=s.label),s.source&&(P.source=s.source),s.updated&&(P.updated=s.updated),s.href&&(P.href=s.href),s.role&&(P.role=s.role)),n.ovalue&&(P.value=o(P,"value")),n.ostatus&&P.hasOwnProperty("status")&&(P.status=o(P,"status")),n.instance?e(P):P}function u(e,t){if(void 0===e)return null;void 0===t&&(t={});var n,r,l,a=[],i=null,o=null,u=!1,c={time:[],geo:[],metric:[]},d="jsonstat"===e.substring(0,8),f=d?"value":t.vlabel,h=d?"status":t.slabel,v=d?e.substring(8,9):t.delimiter||",",b=";"===v?t.decimal||",":t.decimal||".",p=function(e,t){t=t||",";for(var n,r,l=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),a=[[]],i=null;i=l.exec(e);)(r=i[1]).length&&r!=t&&a.push([]),n=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],a[a.length-1].push(n);return a}(e.trim(),v);if(d){for(b=p[0][1],l=p[0][2],p.shift();"data"!==p[0][0];)a.push(p.shift());p.shift(),o={dimension:{}},a.forEach((function(e){var t,n,r,a,i,s,d,f;switch(e[0]){case"dimension":if(o.dimension[e[1]]={},(a=o.dimension[e[1]]).label=e[2],a.category={},(i=a.category).index=[],n={},r=2*e[3]+3,e.length>=r){for(t=4;t<r;t++)d=e[t],f=e[++t],Object.defineProperty(n,d,{value:f,writable:!0,configurable:!0,enumerable:!0}),i.label=n,i.index.push(d);"string"==typeof e[t]&&-1!==["time","geo","metric"].indexOf(e[t])&&(c[e[t]].push(e[1]),u=!0,"metric"===e[t]&&"string"==typeof e[++t]&&(i.unit={},i.index.forEach((function(n,r){var a=e[t+r].split(l);i.unit[n]={},s=i.unit[n],void 0!==a[0]&&""!==a[0]&&(s.decimals=1*a[0]),void 0!==a[1]&&""!==a[1]&&(s.label=a[1]),void 0!==a[2]&&""!==a[2]&&(s.symbol=a[2]),void 0!==a[1]&&-1!==["start","end"].indexOf(a[3])&&(s.position=a[3])}))))}break;case"label":case"source":case"updated":case"href":o[e[0]]=e[1]||null}})),u&&(c.time.length||delete c.time,c.geo.length||delete c.geo,c.metric.length||delete c.metric,o.role=c)}if(n=p.length,r=p[0].length,void 0!==f){for(;r--;)if(p[0][r]===f){i=r;break}if(null===i)return null}else i=r-1,f=p[0][i];if(","===b)for(r=1;r<n;r++)p[r][i]=Number(p[r][i].replace(",","."));else for(r=1;r<n;r++)p[r][i]=Number(p[r][i]);return s(p,{header:o,vlabel:f,slabel:h,type:"array",label:t.label||"",ovalue:t.ovalue||!1,ostatus:t.ostatus||!1,instance:t.instance||!1})}function c(t,n){if("object"!=typeof t||!t.hasOwnProperty("dataSets")||!Array.isArray(t.dataSets))return null;if(1!==t.dataSets.length)return null;t.dataSets[0].hasOwnProperty("observations")||function(e){var t=e.dataSets[0],n=t.series,r=e.structure,l=r.dimensions,a={};Object.keys(n).forEach(e=>{var t=n[e].observations;Object.keys(t).forEach(r=>{a[e+":"+r]=t[r].concat(n[e].attributes)})}),t.observations=a,delete t.series,l.observation=l.series.concat(l.observation),delete l.series,r.attributes.observation=r.attributes.observation.concat(r.attributes.series),delete r.attributes.series}(t),void 0===n?n={ovalue:!1,ostatus:!1,instance:!1}:("boolean"!=typeof n.ovalue&&(n.ovalue=!1),"boolean"!=typeof n.ostatus&&(n.ostatus=!1),"boolean"!=typeof n.instance&&(n.instance=!1));var r=t.structure,l=t.dataSets[0].observations,a=r.attributes.observation,i=r.dimensions;if(!i.hasOwnProperty("observation"))return null;if(i.hasOwnProperty("series")&&(null!==i.series||Object.keys(i.series).length))return null;var o=1,s=[],u=[],c={},d=[],f={time:[],geo:[]},h=function(){},v=function(e,t){for(var n=e.size,r=n.length-t.length;r--;)t.push(0);for(var l=0,a=n.length,i=0,o=1;l<a;l++)i+=(o*=l>0?n[a-l]:1)*t[a-l-1];return i},b=function(e){if(c[e.id]={label:e.name},e.hasOwnProperty("role"))switch(e.role){case"REF_AREA":f.geo.push(e.id);break;case"TIME_PERIOD":f.time.push(e.id)}Object.defineProperty(c[e.id],"category",{value:{index:[],label:{}},writable:!0,enumerable:!0}),s.push(e.id),u.push(e.values.length),o*=e.values.length;var t=c[e.id].category;e.values.forEach((function(e){t.index.push(e.id),Object.defineProperty(t.label,e.id,{value:e.name,writable:!0,enumerable:!0})}))},p=t.header.links?t.header.links.find((function(e){return"request"===e.rel})):null,g=a.findIndex((function(e){return"OBS_STATUS"===e.id}));-1!==g&&(a[g].values.length?d=a[g].values:g=-1),i.observation.forEach(b),i.hasOwnProperty("dataSet")&&i.dataSet.forEach(b);var m={version:"2.0",class:"dataset",updated:t.header.prepared||null,source:t.header.sender.name||null,label:r.name||null,id:s,size:u,dimension:c,value:n.ovalue?{}:new Array(o).fill(null)};for(var y in p&&(m.link={alternate:[{type:"application/vnd.sdmx.data+json",href:p.href}]}),f.geo.length+f.time.length>0&&(f.time.length||delete f.time,f.geo.length||delete f.geo,m.role=f),-1!==g&&(m.status=n.ostatus?{}:new Array(o).fill(null),m.extension={status:{label:{}}},d.forEach((function(e){m.extension.status.label[e.id]=e.name})),h=n.ostatus?function(){var e=l[y][g];null!==e&&(m.status[v(m,w)]=d[e].id)}:function(){var e=l[y][g];m.status[v(m,w)]=null===e?null:d[e].id}),g++,l){var w=y.split(":");n.ovalue&&null===l[y][0]||(m.value[v(m,w)]=l[y][0]),h()}return n.instance?e(m):m}function d(t,n){if(void 0===t||!Array.isArray(t))return null;var r=JSON.parse(JSON.stringify(t)),l=r[0];if(!l.hasOwnProperty("version")||!l.hasOwnProperty("class")||"dataset"!==l.class)return null;void 0===n&&(n={});var a=void 0===n.label?null:n.label,i=void 0===n.by?null:n.by,o=[];if(null===i){for(var u=1,c=r.length;u<c;u++)o=o.concat(r[u].value);return l.value=o,null!==a&&(l.label=a),l}var d,f,h,v=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var r in t)e[r]=0===t[r]?n:t[r];return e};r.forEach((function(t,n){var r=e(t).toTable({status:!0}),l=t.dimension[i].category;0===n?(o=[r[0]],d=l.index,f=l.label,h=l.unit):(d=function(e,t,n){if(Array.isArray(e))e=e.concat(t);else for(var r in t)e[r]=t[r]+n;return e}(d,l.index,Object.keys(d).length),f=v(f,l.label,n),h=v(h,l.unit,n)),o=o.concat(r.slice(1))}));var b=s(o);return l.value=b.value,l.size=b.size,l.status=b.status||null,l.label=a||"",l.href=null,l.dimension[i].category.index=d||null,l.dimension[i].category.label=f||null,l.dimension[i].category.unit=h||null,l}function f(e,t){return null==e?"":-1!==e.indexOf(t)?'"'+e+'"':e}function h(e,r){if(void 0===e)return null;void 0===r&&(r={});var l=!0===r.rich,a=l?"value":r.vlabel||"Value",i=l?"status":r.slabel||"Status",o=!0===r.status,s=r.na||"n/a",u=r.delimiter||",",c=r.separator||"|",d=";"===u?r.decimal||",":r.decimal||".",h=!0===r.array,v=t(e,r.dsid||0),b=h?[]:"",p=h?[]:"",g=h?function(e){b.push(e)}:function(e){b+=e+"\n"},m=h?function(e){p.push(e)}:function(e){p+=e+"\n"};if(!n(v))return null;l&&(o=null!==v.status);var y=v.toTable({vlabel:a,slabel:i,status:o,field:l?"id":"label",content:l?"id":"label",type:"array"}),w=y[0].indexOf(a),E=o?y[0].indexOf(i):-1;return y.forEach((function(e,t){e.forEach((function(n,r){t&&r===w?null===n?e[r]=f(s,u):"."!==d&&(e[r]=String(e[r]).replace(".",d)):e[r]=t&&r===E&&null===n?"":f(e[r],u)})),g(e.join(u))})),l&&(m("jsonstat"+u+d+u+c),["label","source","updated","href"].forEach((function(e){v[e]&&m(e+u+f(v[e],u))})),v.id.forEach((function(e,t){var n=[],r=v.Dimension(t),l=r.role,a=!1,i="";i+="dimension"+u+f(e,u)+u+f(r.label,u)+u+r.length,"metric"===l&&r.__tree__.category.unit&&(a=!0),r.id.forEach((function(e,t){var l=[],o=r.Category(t);i+=u+f(e,u)+u+f(o.label,u),a&&(l.push(o.unit.hasOwnProperty("decimals")?o.unit.decimals:""),l.push(o.unit.label||""),o.unit.symbol&&(l.push(o.unit.symbol),l.push(o.unit.position)),n.push(f(l.join(c),u)))})),null!==l&&"classification"!==l&&(i+=u+r.role,a&&(i+=u+n.join(u))),m(i)})),b=h?p.concat(["data"],b):p+"data\n"+b),b}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};var v="3.2.3";export{i as datalist,u as fromCSV,c as fromSDMX,s as fromTable,d as join,a as tbrowser,h as toCSV,v as version};
