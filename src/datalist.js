import dataset from "./dataset.js";
import checkds from "./checkds.js";

//on error returns null; on success, html table string
//jsonstat {dsid: , na:, caption:, vlabel:, slabel:, status:, }
export default function datalist(jsonstat, options){
	if(typeof jsonstat==="undefined"){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	var
		thead="",
		tbody="",
		tfoot="",
		ncols=0,
		na=options.na || "n/a", //for empty cells in the resulting datalist table
		dsid=options.dsid || 0,
		vlabel=options.vlabel || null, //take default value from toTable
		slabel=options.slabel || null, //take default value from toTable
		counter=options.counter || false,
		tblclass=options.tblclass || "",
		numclass=options.numclass || "",
		valclass=options.valclass || "",
		shstatus=options.status || false,
		locale=options.locale || "en-US",
		source=options.source || "Source",
		ds=dataset(jsonstat, dsid),
		colmetric=ds.role && ds.role.metric ? ds.id.indexOf(ds.role.metric[0]) : null,
		metric=ds.Dimension({ role : "metric"} ),
		decs={},

		//If no decimal information, analyze all data for every metric and infer decimals? Not for the moment.
		format=(Number.toLocaleString && locale!=="none") ?
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
				//If no decimal information, analyze all data for every metric and infer decimals? Not for the moment.
				return (d===null) ? v : v.toFixed(d);
			}
		,
		tcols=function(r,i){
			var decimals=null;
			r.forEach(function(e,c){
				var
					cls=(colvalue===c) ? ' class="'+numclass+" "+valclass+'"' : '',
					val=na
				;

				if(i){
					if(colmetric===c){
						decimals=decs[e];
					}
					//fromSDMX can return undefined (not anymore since 3.1.5)
					if(/*3.1.5 typeof e!=="undefined" &&*/ e!==null){
						val=(colvalue===c) ? format(e, decimals) : e;
					}

					tbody+='<td'+cls+'>'+val+'</td>';
				}else{
					thead+='<th'+cls+'>'+e+'</th>';
				}
			});
		},

		trows=(counter) ?
			function(r,i){
				tbody+="<tr>";
				thead+="<tr>";

				if(i){
					tbody+='<td class="'+numclass+'">'+i+'</td>';
				}else{
					thead+='<th class="'+numclass+'">#</th>';
				}

				tcols(r,i);

				tbody+="</tr>";
				thead+="</tr>";
			}
			:
			function(r,i){
				tbody+="<tr>";
				thead+="<tr>";

				tcols(r,i);

				tbody+="</tr>";
				thead+="</tr>";
			}
	;

	if(!checkds(ds)){
		return null;
	}

	if(metric){
		metric[0].Category().forEach(function(e){
			//e.unit is always defined (null or object)
			var decimals=e.unit && e.unit.hasOwnProperty("decimals") ? e.unit.decimals : null;
			decs[e.label]=decimals;
		});
	}

	var
		table=ds.toTable({
			status: shstatus,
			vlabel: vlabel,
			slabel: slabel
		}),
		colvalue=table[0].length-1
	;

	table.forEach( function(r,i){ trows(r,i); } );

	if(ds.source){
		ncols=ds.length+1;
		if(counter) ncols++;
		if(shstatus) ncols++;

		source+=": "+ds.source;
		if(source.slice(-1)!==".") source+=".";

		tfoot='<tfoot><td colspan="'+ncols+'">'+source+'</td></tfoot>';
	}

	return '<table class="'+tblclass+'"><caption>'+(options.caption || ds.label || "")+'</caption>'+'<thead>'+thead+'</thead><tbody>'+tbody+'</tbody>'+tfoot+'</table>';
}
