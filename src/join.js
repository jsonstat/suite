__TOOLKIT__

export default function join(arrobj, options){
	if(typeof arrobj==="undefined" || !Array.isArray(arrobj)){
		return null;
	}

	var
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

	var
		dslabel=(typeof options.label==="undefined") ? null : options.label,
		dimid=(typeof options.by==="undefined") ? null : options.by,
		input=[]
	;

	//Join metadata+data1+data2+...
	if(dimid===null){
		for(var i=1, len=arr.length; i<len; i++){
			input=input.concat( arr[i].value ); //or .push.apply
		}

		output.value=input;

		if(dslabel!==null){
			output.label=dslabel;
		}

		return output;
	}

	//Join by dimension
	var
		index, label, unit,
		oAdd=function(o, e, i){
			if(Array.isArray(o)){
				o=o.concat(e);
			}else{
				for(var p in e){
					o[p]=(e[p]===0) ? i : e[p];
				}
			}
			return o;
		}
	;

	arr.forEach(function(e, i){
		var
			tbl=JSONstat(e).toTable({ status: true }),
			cat=e.dimension[dimid].category
		;

		//header
		if(i===0){
			input=[tbl[0]];
			index=cat.index;
			label=cat.label;
			unit=cat.unit;
		}else{
			index=oAdd(index, cat.index, i);
			label=oAdd(label, cat.label, i);
			unit=oAdd(unit, cat.unit, i);
		}
		input=input.concat( tbl.slice(1) ); //or .push.apply
	});

	var ds=fromTable(input);

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
