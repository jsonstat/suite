import dataset from "./dataset.js";
import checkds from "./checkds.js";

String.prototype.capitalize=function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

function objectify(ds, id, arr){
	var o={ filter: {} };

	arr.forEach(function(e){
		if("rows"===e.name || "cols"===e.name){
			o[e.name]=e.value;
		}else{
			o.filter[e.name]=e.value;
		}
	});

	//Rows or cols changes affect filters
	if(id==="rowscols"){
		ds.id.forEach(function(e,i){
			if(e!==o.rows && e!==o.cols){
				//Assign only new filters (keep selected values in existing filters)
				if(typeof o.filter[ e ]==="undefined"){
					o.filter[ e ]=ds.Dimension(i).id[0];
				}
			}else{
				delete o.filter[ e ];
			}
		});
	}

	return o;
}

// Build a default setup
function setup(ds, preset){
	var
		filter={}, arr=[], rows, cols,
		ids=ds.id
	;

	if(preset){
		var order=(preset==="bigger") ?
			function(a,b){
				if(a.len < b.len){
					return 1;
				}
				return -1;
			}
			: //smaller
			function(a,b){
				if(a.len > b.len){
					return 1;
				}
				return -1;
			}
		;

		ds.Dimension().forEach(function(e,i){
			arr.push({ id: ids[i], len : e.length });
		});

		arr.sort(order);
		rows=arr[0].id;
		cols=arr[1].id;
	}else{ //Default: simpler
		rows=ids[0];
		cols=ids[1];
	}

	//Swap rows<->cols if needed
	if( ds.Dimension(rows).length<ds.Dimension(cols).length ){
		rows=cols+(cols=rows, ""); //http://jsperf.com/swap-array-vs-variable/33
	}

	ids.forEach(function(e){
		if(e!==rows && e!==cols){
			filter[e]=ds.Dimension(e).id[0];
		}
	});

	return { rows: rows, cols: cols, filter: filter };
}

function pairs(el){
	var
		arr=[],
		selects=[].slice.call(el.querySelectorAll("select, input"))
	;
	selects.forEach(function(e){
		arr.push( {name: e.name, value: e.value} );
	});

	return arr;
}

function labelize(dim, cat, name){
	var
		ulabel=function(d, c){//2.3.0 Support for symbol
			var lab, symb, ret="";
			if(d && d.role==="metric" && c.unit){
				lab=c.unit.hasOwnProperty("label") ? c.unit.label : "";
				symb=c.unit.hasOwnProperty("symbol") ? c.unit.symbol : "";
				if(lab+symb!==""){
					if(symb===""){
						ret=lab;
					}else if(lab===""){
						ret=symb;
					//lab & symb set
					}else{
						ret=(c.unit.position==="start") ? symb+lab : lab+" "+symb;
					}
					ret=" ("+ret+")";
				}
			}
			return ret;
		},
		label=cat.label || name
	;
	return label.capitalize()+ulabel(dim, cat);
}

function select(ds, name, v){
	var
		html='<select name="'+name+'">',
		arr=[],
		id
	;

	if( v[1]!==null ){ //row/col select
		id=ds.id;
		arr=ds.Dimension();

		//More than two dims are needed to display row/col select
		if(id.length===2){
			return (ds.Dimension(v[0]).label || v[0]).capitalize();
		}
	}else{ //Filter select
		var dim=ds.Dimension(name);
		id=dim.id;
		arr=dim.Category();
		//More than one dim is needed to display a category select (filter)
		if(id.length===1){
			return; //Constant dimensions have their own fieldset
		}
	}

	id.forEach(function(e, i){
		var selected=(e!==v[0]) ? '' : 'selected="selected" ';

		//If null is a filter select: all options must be included
		if(v[1]===null || e!==v[1]) {
			html+='<option '+selected+'value="'+e+'">'+labelize(dim, arr[i], e)+'</option>';
		}
	});

	html+="</select>";

	return html;
}

function killconst(ds){
	var
		del=0,
		size=ds.size.slice(0),
		killed=[]
	;

	size.forEach(function(e,i){
		var
			pos=i-del,
			dim=ds.Dimension(pos)
		;
		if(e===1){
			delete ds.__tree__.dimension[ds.id[pos]];
			ds.size.splice(pos,1);
			ds.id.splice(pos,1);
			ds.length--;
			del++;
			killed.push( dim.label.capitalize()+": "+dim.Category(0).label.capitalize() );
		}
	});

	return killed;
}

//jsonstat selector {i18n: {msgs: {}, locale: ""}, dsid: 0, status: false, preset: ""}
export default function tbrowser(jsonstat, selector, options){
	function msg(s){
		if(typeof selector!=="undefined"){
			selector.innerHTML=msgs[s];
		}else{
			window.alert(msgs[s]);
		}
	}


	function HTMLtable(element, ds, o, tblclass){
		var
			head="",
			foot="",
			caption="",
			body="",
			r=o.rows,
			rows=ds.Dimension(r),
			rid=rows.id,
			c=o.cols,
			cols=ds.Dimension(c),
			cid=cols.id,
			metricname=(ds.role && ds.role.metric) ? ds.role.metric[0] : null,
			metric=(metricname!==null) ? ds.Dimension(metricname) : null, /* only one dim can have metric role */
			dec=function(cat){
				return (cat.hasOwnProperty("unit") && cat.unit && cat.unit.hasOwnProperty("decimals")) ? cat.unit.decimals : null;
			},
			filter=o.filter,
			cell=JSON.parse(JSON.stringify(filter)), //clone filter
			constants=[],
			filtfield="",
			constfield="",
			source=(ds.source) ? msgs.source+": "+ds.source : "",
			title=(ds.label!==null) ? '<span class="label">'+ds.label.capitalize()+'</span>' : ''
		;

		if(nonconst && removed.length){
			title='<span class="label">'+removed.join(". ")+'</span>';
		}

		if(source!=="" && source.slice(-1)!==".") source+=".";

		//Caption
		caption+="<caption>"+title+'<form>';

		for(var name in filter){
			var
				dim=ds.Dimension(name),
				label=(dim.label) ? dim.label.capitalize() : name.capitalize()
			;

			if(dim.length>1){
				filtfield+="<p>"+select(ds, name, [filter[name], null])+" <strong>"+label+"</strong>"+"</p>";
			}else{
				constants.push({label: label, value: labelize(dim, dim.Category(0)), name: name, id: dim.id[0]});
			}
		}

		if(filtfield!==""){
			filtfield='<fieldset id="filters"><legend>'+msgs.filters+'</legend>'+filtfield+'</fieldset>';
		}

		constants.forEach(function(e){
			constfield+='<p>'+e.value+' <strong>'+e.label+'</strong></p><input type="hidden" name="'+e.name+'" value="'+e.id+'" />';
		});

		if(constfield!==""){
			constfield='<fieldset id="constants"><legend>'+msgs.constants+'</legend>'+constfield+'</fieldset>';
		}

		caption+=constfield+filtfield+'<fieldset id="rowscols"><legend>'+msgs.rc+'</legend>'+select(ds, "rows", [r, c])+' <a>&#x2194;</a> '+select(ds, "cols", [c, r])+"</fieldset></form></caption>";

		//Body
		body+="<tbody>";

		//If no decimal information, analyze all data for every metric and infer decimals? Not for the moment.
		var format=(Number.toLocaleString) ?
			function(v, d){
				//toLocaleString because has better support than new Intl.NumberFormat(locale, { minimumFractionDigits: d }).format(v)
				return (d===null) ?
					v.toLocaleString(locale)
					:
					v.toLocaleString(locale, {minimumFractionDigits: d, maximumFractionDigits: d})
				;
			}
			:
			//If browser does not support toLocaleString, locale is ignored, sorry.
			function(v, d){
				//If no decimal information, analyze all data for every metric and infer decimals? Not for the moment
				return (d===null) ? v : v.toFixed(d);
			}
		;

		rid.forEach(function(e){
			cell[r]=e;
			var
				data=ds.Data(cell),
				td=function(col, i){
					var
						val,
						decimals=(c!==metricname) ?
							//Metric is not in cols or no metric at all
							( (metric===null) ? null : dec( metric.Category( cell[metricname] ) ) )
							:
							//Metric dimension in columns
							dec( cols.Category(i) )
					;

					if(col.value!==null){
						val=format(col.value, decimals);

						if(shstatus && col.status!==null){
							val+=" ("+col.status+")";
						}
					}else{
						val=col.status || msgs.na;
					}

					body+="<td>"+val+"</td>";
				}
			;

			if(data===null){
				body="ERROR";
				return;
			}

			body+='<tr><th scope="row">'+labelize(rows, rows.Category(e))+'</th>';

			if(Array.isArray(data)){
				data.forEach(function(e, i){ td(e, i); });
			}else{
				td(data, 0);
			}

			body+="</tr>";
		});

		if(body==="ERROR"){
			return msgs.dataerror;
		}

		body+="</tbody>";

		//Head
		head+="<thead><tr><th></th>";
		cid.forEach(function(e){
			head+='<th scope="col">'+labelize(cols, cols.Category(e))+'</th>';
		});
		head+="</tr></thead>";

		//Foot
		if(source!==""){
			foot='<tfoot><tr><td colspan="'+(cid.length+1)+'">'+source+"</td></tr></tfoot>";
		}

		element.innerHTML='<table class="'+tblclass+'">'+caption+head+body+foot+"</table>";

		[].slice.call(element.querySelectorAll("select")).forEach(function(e){
			e.addEventListener("change", function(event) {

				HTMLtable(
					element,
					ds,
					objectify(
						ds,
						event.target.parentElement.getAttribute("id"),
						pairs(element)
					),
					tblclass
				);
			}, false);

		});

		element.querySelector("a").addEventListener("click", function() {
			o.cols=r;
			o.rows=c;
			HTMLtable( element, ds, o, tblclass );
		}, false);
	}

	if(typeof jsonstat==="undefined"){
		msg("urierror");
		return;
	}

	if(typeof selector==="undefined"){
		msg("selerror");
		return;
	}

	if(typeof options==="undefined"){
		options={};
	}

	var
		msgs=(typeof options.i18n==="undefined" || typeof options.i18n.msgs==="undefined") ?
			{
				"urierror": 'tbrowser: A valid JSON-stat input must be specified.',
				"selerror": 'tbrowser: A valid selector must be specified.',
				"jsonerror": "The request did not return a valid JSON-stat dataset.",
				"dimerror": "Only one dimension was found in the dataset. At least two are required.",
				"dataerror": "Selection returned no data!",
				"source": "Source",
				"filters": "Filters",
				"constants": "Constants",
				"rc": "Rows &amp; Columns",
				"na": "n/a"
			}
			:
			options.i18n.msgs,
		locale=(typeof options.i18n==="undefined" || typeof options.i18n.locale==="undefined") ? "en-US" : options.i18n.locale,
		dsid=options.dsid || 0,
		shstatus=options.status || false, //added in 1.2.1
		tblclass=options.tblclass || "",
		nonconst=options.nonconst || false //2.10.0
	;

	var ds=dataset(jsonstat, dsid);
	if(!checkds(ds)){
		msg("jsonerror");
		return;
	}

	//Remove constant dimensions
	if(nonconst){
		var removed=killconst(ds);
	}

	if(ds.length===1){
		msg("dimerror");
		return;
	}

	//Create table with default setup
	HTMLtable( selector, ds, setup(ds, options.preset), tblclass );
}
