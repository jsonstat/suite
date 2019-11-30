import JSONstat from "jsonstat-toolkit";

//o object p property
function arr2obj(o,p){
	var ret={};

	if(Array.isArray(o[p])){
		o[p].forEach(function(e,i){
			if(e!==null){
				ret[String(i)]=e;
			}
		});

		return ret;
	}

	return o[p];
}

export default function fromTable(tbl, options){
	if(typeof tbl==="undefined"){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	if(typeof options.ovalue!=="boolean"){
		options.ovalue=false;
	}
	if(typeof options.ostatus!=="boolean"){
		options.ostatus=false;
	}
	if(typeof options.instance!=="boolean"){
		options.instance=false;
	}

	var
		vlabel=options.vlabel || "Value",
		slabel=options.slabel || "Status",
		type=options.type || "array", //default is array as in .toTable()
		label=options.label || "",
		header=options.header || null, //internal option for rich CSV (CSV-stat) v. 2.3.3

		id=[],
		size=[],
		value=[],
		status=[],
		odims={},
		dimension={},
		getPos=function(e,size){
			var
				mult=1,
				res=0
			;
			for(var i=0; i<dims; i++){
				mult*=(i>0) ? size[(dims-i)] : 1;
				res+=mult*e[dims-i-1];
			}
			return res;
		},
		valuestatus=function(){
			var v=tbl[dd][vlabel];
			value[getPos(pos, size)]=( isNaN(v) ) ? null : v;
		}
	;

	//Convert to "arrobj". Not efficient but simple.
	switch(type){
		case "array":
			//From array to arrobj
			tbl=(function(tbl){
				var
					head=tbl[0],
					arr=tbl.slice(1)
				;

				var arrobj=[];
				for(var d=0, dlen=arr.length; d<dlen; d++){
					for(var f=0, flen=head.length, o={}; f<flen; f++){
						o[head[f]]=arr[d][f];
					}
					arrobj.push(o);
				}
				return arrobj;
			})(tbl);
		break;

		case "object":
			//From object to arrobj
			tbl=(function(tbl){
				var
					head=tbl.cols.map(function(e) {return e.id;}),
					//Pending: retrieve labels
					arr=tbl.rows
				;

				var arrobj=[];
				for(var d=0, dlen=arr.length; d<dlen; d++){
					for(var f=0, flen=head.length, o={}; f<flen; f++){
						o[head[f]]=arr[d].c[f].v;
					}
					arrobj.push(o);
				}
				return arrobj;
			})(tbl);
		break;
	}

	var
		hdim,
		obs=tbl.length
	;

	if(options.hasOwnProperty("drop") && Array.isArray(options.drop) && options.drop.length){
		tbl.forEach(function(row){
			options.drop.forEach(function(d){
				delete row[d];
			});
		});
	}

	//Dimensions are taken from first observation
	for(var field in tbl[0]){
		if(field!==vlabel){
			if(field!==slabel){
				id.push(field);

				//if rich
				if(header){
					hdim=header.dimension[field];
					odims[field]=hdim.category.index;
				}else{
					odims[field]=[];
					for(var j=0; j<obs; j++){
						var e=tbl[j][field];

						if(odims[field].indexOf(e)===-1){
							odims[field].push(e);
						}
					}
				}
				size.push(odims[field].length);

				dimension[field]={
					"label": header ? hdim.label : field,
					"category": {
						"index": odims[field]
					}
				};

				if(header){
					dimension[field].category.label=hdim.category.label;
					if(hdim.category.unit){
						dimension[field].category.unit=hdim.category.unit;
					}
				}
			}else{ //status field is present
				valuestatus=function(){
					var
						v=tbl[dd][vlabel],
						s=tbl[dd][slabel]
					;
					value[getPos(pos, size)]=( isNaN(v) ) ? null : v;//when missing na string
					status[getPos(pos, size)]=( s==="" ) ? null : s; //when missing status, there will be a blank string
				};
			}
		}
	}

	var dims=id.length;

	for(var dd=0; dd<obs; dd++){
		var pos=[];
		for(var i=0; i<dims; i++){
			var d=id[i];
			pos.push( odims[d].indexOf(tbl[dd][d]) );
		}
		valuestatus();
	}

	/* For JSON-stat<2.00
	dimension.id=id;
	dimension.size=size;
	*/

	var ret={
		"version": "2.0",
		"class": "dataset",
		"value": value,
		"dimension": dimension,

		//JSON-stat 2.00+
		"id": id,
		"size": size
	};

	//Since 3.0.0 we don't write these optional properties if not set
	if(label){
		ret.label=label; //it will be rewritten if rich (header set)
	}
	if(status.length){
		ret.status=status;
	}

	if(header){
		if(header.label){
			ret.label=header.label;
		}
		if(header.source){
			ret.source=header.source;
		}
		if(header.updated){
			ret.updated=header.updated;
		}
		if(header.href){
			ret.href=header.href;
		}
		if(header.role){
			ret.role=header.role;
		}
	}


	//in fromTable (and as a consequence in fromCSV), vs. fromSDMX,
	//ovalue and ostatus is done in a post processing (because it as added mainly
	//for jsonstat-conv where speed is not super important)
	if(options.ovalue){
		ret.value=arr2obj(ret, "value");
	}
	if(options.ostatus && ret.hasOwnProperty("status")){
		ret.status=arr2obj(ret, "status");
	}

	return options.instance ? JSONstat(ret) : ret;
}
