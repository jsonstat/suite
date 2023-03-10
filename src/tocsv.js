import dataset from "./dataset.js";
import checkds from "./checkds.js";
import dcomma from "./dcomma.js";


//jsonstat, {rich, dsid, delimiter, decimal, na, field, content ("id", "label" and since 3.4.0 "[id] label"), [ignored if rich: vlabel, slabel, status, field, content], [ignored if not rich: separator]}
//Returns text (CSV or JSV[JSON-stat Comma Separed values or "CSV-stat" -Rich CSV-])
export default function toCSV(jsonstat, options){
	if(typeof jsonstat==="undefined"){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	var
		idlabel={ content: false, field: false }, //3.4.1
		rich=(options.rich===true), //2.3.0 Default: false (backward compat)

		//3.3.0
		content=options.content || "label",
		field=options.field || "label",

		//The following options are ignored when rich
		//When rich, toTable uses field=id and vlabel/slabel are ignored
		vlabel=rich ? "value" : (options.vlabel || "Value"), //Same default as .toTable()
		slabel=rich ? "status" : (options.slabel || "Status"), //Same default as .toTable()
		status=(options.status===true), //Same default as .toTable(). If rich, it will be rewritten and set according to ds content

		na=options.na || "n/a",

		delimiter=options.delimiter || ",",
		separator=options.separator || "|", //2.3.0 only if rich
		decimal=(delimiter===";") ?
			(options.decimal || ",")
			:
			(options.decimal || "."),

		array=(options.array===true),

		dsid=options.dsid || 0,
		ds=dataset(jsonstat, dsid),

		csv=array ? [] : "",
		header=array ? [] : "",

		CSVline=array ?
			function(s){
				csv.push(s);
			}
			:
			function(s){
				csv+=s+"\n";
			},
		HEADline=array ?
			function(s){
				header.push(s);
			}
			:
			function(s){
				header+=s+"\n";
			}
	;

	if(!checkds(ds)){
		return null;
	}

	//If rich, include status if available
	if(rich){
		status=(ds.status!==null);
	}else{//3.4.0
		if(content==="[id] label"){
			idlabel.content=true;
			content="id";
		}
		if(field==="[id] label"){
			idlabel.field=true;
			field="id";
		}
	}

	var
		table=ds.toTable({
			vlabel: vlabel,
			slabel: slabel,
			status: status,
			field: rich || idlabel.field ? "id" : field, //3.3.0
			content: rich || idlabel.content ? "id" : content, //3.3.0
			type: "array"
		}),
		vcol=table[0].indexOf(field==="id" ? "value" : vlabel), //3.3.0
		scol=status ? table[0].indexOf(field==="id" ? "status" : slabel) : -1 //3.3.0
	;

	table.forEach(function(r, j){
		r.forEach(function(c, i){
			var dim=ds.Dimension(i);

			if(j && i===vcol){
				if(c===null){
					r[i]=dcomma(na,delimiter);
				}else{
					if(decimal!=="."){
						r[i]=String(r[i]).replace(".", decimal);
					}
				}
			}else{
				if(j && i===scol && c===null){
					r[i]=""; //Status does not use n/a because usually lacking of status means "normal".
				}else{
					if(idlabel.content && j && dim){
						//if(r[i]!==dim.Category(r[i]).label){
						r[i]="[" + r[i] + "] " + dim.Category(r[i]).label;
						//}
					}else{
						if(idlabel.field && j===0){
							if(dim){
								r[i]="[" + r[i] + "] " + dim.label;
							}else{
								r[i]=(r[i]==="value") ? vlabel : slabel;
							}
						}						
					}

					r[i]=dcomma(r[i], delimiter);
				}
			}
		});

		CSVline(r.join(delimiter));
	});

	if(rich){
		HEADline("jsonstat"+delimiter+decimal+delimiter+separator);

		["label", "source", "updated", "href"].forEach(function(s){
			if(ds[s]){
				HEADline(s+delimiter+dcomma(ds[s],delimiter));
			}
		});

		//dimensions
		ds.id.forEach(function(e,i){
			var
				unit=[],
				dim=ds.Dimension(i),
				role=dim.role,
				hasUnit=false,
				str=""
			;

			str+="dimension"+delimiter+dcomma(e,delimiter)+delimiter+dcomma(dim.label,delimiter)+delimiter+dim.length;

			if(role==="metric" && dim.__tree__.category.unit){
				hasUnit=true;
			}

			//categories
			dim.id.forEach(function(e,i){
				var
					u=[],
					cat=dim.Category(i)
				;
				str+=delimiter+dcomma(e,delimiter)+delimiter+dcomma(cat.label,delimiter);
				if(hasUnit){
					u.push(
						cat.unit.hasOwnProperty("decimals") ? cat.unit.decimals : ""
					);
					u.push(cat.unit.label||"");
					if(cat.unit.symbol){
						u.push(cat.unit.symbol);
						u.push(cat.unit.position);
					}
					unit.push(dcomma( u.join(separator), delimiter));
				}
			});

			if(role!==null && role!=="classification"){
				str+=delimiter+dim.role;
				if(hasUnit){
					str+=delimiter+unit.join(delimiter);
				}
			}

			HEADline(str);
		});

		if(array){
			csv=header.concat(["data"], csv);
		}else{
			csv=header+"data\n"+csv;
		}
	}

	return csv;
}
