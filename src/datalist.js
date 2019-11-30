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
		trs="",
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

		format=(Number.toLocaleString) ?
			function(n){
				return n.toLocaleString(locale);
			}
			:
			function(n){
				return n;
			},

		trows=(counter) ?
			function(r,i){
				trs+=(i) ? '<tr><td class="'+numclass+'">'+i+'</td>' : '<tr><th class="'+numclass+'">#</th>';
				r.forEach(function(e,c){
					var
						cls=(colvalue===c) ? ' class="'+numclass+" "+valclass+'"' : '',
						val=(e===null) ? na : format(e)
					;

					trs+=(i) ? '<td'+cls+'>'+val+'</td>' : '<th'+cls+'>'+val+'</th>';
				});
				trs+="</tr>";
			}
			:
			function(r,i){
				trs+='<tr>';
				r.forEach(function(e,c){
					var
						cls=(colvalue===c) ? ' class="'+numclass+" "+valclass+'"' : '',
						val=(e===null) ? na : format(e)
					;

					trs+=(i) ? '<td'+cls+'>'+val+'</td>' : '<th'+cls+'>'+val+'</th>';
				});
				trs+="</tr>";
			}
	;

	if(!checkds(ds)){
		return null;
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

	return '<table class="'+tblclass+'"><caption>'+(options.caption || ds.label || "")+'</caption>'+tfoot+'<tbody>'+trs+"</tbody></table>";
}
