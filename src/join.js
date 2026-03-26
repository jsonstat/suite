import JSONstat from "jsonstat-toolkit";
import fromTable from "./fromtable.js";

export default function join(arrobj, options){
	if(typeof arrobj==="undefined" || !Array.isArray(arrobj)){
		return null;
	}

	const
		arr=JSON.parse( JSON.stringify(arrobj) ), //clone
		output=arr[0]
	;

	if(!output.hasOwnProperty("version") || //Not JSON-stat v.2.0
		!output.hasOwnProperty("class") ||
		output.class!=="dataset"
	){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	const
		dslabel=(typeof options.label==="undefined") ? null : options.label,
		dimid=(typeof options.by==="undefined") ? null : options.by
	;

	let input=[];

	//Join metadata+data1+data2+...
	if(dimid===null){
		for(let i=1, len=arr.length; i<len; i++){
			input=input.concat( arr[i].value ); //or .push.apply
		}

		output.value=input;

		if(dslabel!==null){
			output.label=dslabel;
		}

		return output;
	}

	//Join by dimension
	let index, label, unit;

	const
		addIndex=function(o, e, i){
			if(Array.isArray(o)){
				o=o.concat(e);
			}else{
				for(const p in e){
					o[p] = e[p] + i;
				}
			}
			return o;
		},
	  addLabelAndUnit=function(o, e, i){
			if(Array.isArray(o)){
				o=o.concat(e);
			}else{
				for(const p in e){
					o[p]=(e[p]===0) ? i : e[p];
				}
			}
			return o;
		}
	;

	arr.forEach(function(e, i){
		const
			tbl=JSONstat(e).Transform({ status: true }),
			cat=e.dimension[dimid].category
		;

		//header
		if(i===0){
			input=[tbl[0]];
			index=cat.index;
			label=cat.label;
			unit=cat.unit;
		}else{
			index=addIndex(index, cat.index, Object.keys(index).length);
			label=addLabelAndUnit(label, cat.label, i);
			unit=addLabelAndUnit(unit, cat.unit, i);
		}
		input=input.concat( tbl.slice(1) ); //or .push.apply
	});

	const ds=fromTable(input);

	output.value=ds.value;
	output.size=ds.size;
	output.status=ds.status || null;
	output.label=dslabel || "";
	output.href=null;

	output.dimension[dimid].category.index=index || null;
	output.dimension[dimid].category.label=label || null;
	output.dimension[dimid].category.unit=unit || null;

	return output;
}
