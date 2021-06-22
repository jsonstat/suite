import dataset from "./dataset.js";
import checkds from "./checkds.js";
import dcomma from "./dcomma.js";


//jsonstat, {rich, dsid, delimiter, decimal, na, [ignored if rich: vlabel, slabel, status], [ignored if not rich: separator]}
//Returns text (CSV or JSV[JSON-stat Comma Separed values or "CSV-stat" -Rich CSV-])
export default function toCSV(jsonstat, options){
	if(typeof jsonstat==="undefined"){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	var
		rich=(options.rich===true), //2.3.0 Default: false (backward compat)

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

		array=(options.array===true), //experimental

		dsid=options.dsid || 0,
		ds=dataset(jsonstat, dsid),

		csv=array ? [] : "", //experimental
		header=array ? ["jsonstat"] : "jsonstat" //experimental
	;

	if(!checkds(ds)){
		return null;
	}

	//If rich, include status if available
	if(rich){
		status=(ds.status!==null);
	}

	var
		table=ds.toTable({
			vlabel: vlabel,
			slabel: slabel,
			status: status,
			field: rich ? "id" : "label",
			content: rich ? "id" : "label",
			type: "array"
		}),
		vcol=table[0].indexOf(vlabel),
		scol=status ? table[0].indexOf(slabel) : -1
	;

	table.forEach(function(r, j){
		r.forEach(function(c, i){
			if(j && i===vcol){
				if( c===null ){
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
					r[i]=dcomma(r[i],delimiter);
				}
			}
		});

		if(array){
			csv.push(r.join(delimiter)); //experimental
		}else{
			csv+=r.join(delimiter)+"\n";
		}
	});

	if(rich){
		if(array){
			header.push(delimiter+decimal+delimiter+separator); //experimental
		}else{
			header+=delimiter+decimal+delimiter+separator+"\n";
		}

		["label", "source", "updated", "href"].forEach(function(s){
			if(ds[s]){
				if(array){
					header.push(s+delimiter+dcomma(ds[s],delimiter)); //experimental
				}else{
					header+=s+delimiter+dcomma(ds[s],delimiter)+"\n";
				}
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

			if(array){
				header.push(str);
			}else{
				header+=str+"\n";
			}
		});

		if(array){
			csv=header.concat(["data"], csv); //experimental
		}else{
			csv=header+"data\n"+csv;
		}
	}

	return csv;
}
