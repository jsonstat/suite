import JSONstat from "jsonstat-toolkit";

//SDMX-JSON flat flavor
//Options (ovalue, ostatus, instance). IE support requires polyfills for reduce, find and findIndex
export default function fromSDMX(sdmx, options){
	if(typeof sdmx!=="object" || !sdmx.hasOwnProperty("dataSets") || !Array.isArray(sdmx.dataSets)){
		return null;
	}

	//Support for 1 dataset only
	if(sdmx.dataSets.length!==1){
		return null;
	}
	//Experimental support for series
	if(!sdmx.dataSets[0].hasOwnProperty("observations")){
		//convert to flat flavor
		flatten(sdmx);
	}

	if(typeof options==="undefined"){
		options={
			ovalue: false, //array
			ostatus: false, //array
			instance: false //boolean
		};
	}else{
		if(typeof options.ovalue!=="boolean"){
			options.ovalue=false;
		}
		if(typeof options.ostatus!=="boolean"){
			options.ostatus=false;
		}
		if(typeof options.instance!=="boolean"){
			options.instance=false;
		}
	}

	var
		meta=sdmx.structure,
		data=sdmx.dataSets[0].observations, //assuming one dataset and flat flavor
		attr=meta.attributes.observation,
		dim=meta.dimensions
	;

	if(!dim.hasOwnProperty("observation")){
		return null;
	}
	//series not null or empty {}?
	if(dim.hasOwnProperty("series") && (dim.series!==null || Object.keys(dim.series).length) ){
		return null;
	}

	//find, findIndex, reduce for IE
	__IE__

	var
		length=1,
		id=[],
		size=[],
		dimension={},
		statusId=[],
		role={ time: [], geo: [] /*, metric: [] no metric so far*/ },
		assignStatus=function(){}, //void unless there's status info

		getValueIndex=function(jsonstat, indices){
			var size=jsonstat.size;

			//If metadata at the dataSet level, indices.length<size.length: difference must be filled with 0
			for( var j=size.length-indices.length; j--; ){
				indices.push(0);
			}

			for( var i=0, ndims=size.length, num=0, mult=1; i<ndims; i++ ){
				mult*=( i>0 ) ? size[ndims-i] : 1;
				num+=mult*indices[ndims-i-1];
			}

			return num;
		},
		getDimInfo=function(o){
			dimension[o.id]={ label: o.name };

			if(o.hasOwnProperty("role")){
				switch(o.role){
					case "REF_AREA": role.geo.push(o.id); break;
					case "TIME_PERIOD": role.time.push(o.id); break;
					//case "UNIT_MEASURE": attribute
				}
			}

			Object.defineProperty(dimension[o.id], "category", {
				value: { index: [], label: {} },
				writable: true,
				enumerable: true
			});

			id.push(o.id);
			size.push(o.values.length);
			length*=o.values.length;

			var cat=dimension[o.id].category;
			o.values.forEach(function(v){
				cat.index.push(v.id);

				Object.defineProperty(cat.label, v.id, {
					value: v.name,
					writable: true,
					enumerable: true
				});
			});
		},

		self=sdmx.header.links ? sdmx.header.links.find(function(e){return e.rel==="request";}) : null,
		statusPos=attr.findIndex(function(e){return e.id==="OBS_STATUS";})
	;

	if(statusPos!==-1){
		//any status value?
		if(!attr[statusPos].values.length){
			statusPos=-1;
		}else{
			statusId=attr[statusPos].values;
		}
	}

	//Metadata: obs level
	dim.observation.forEach(getDimInfo);

	//Metadata: dataset level [constant dimensions]
	//Even though in OECD's API "Dimensions and attributes with only one requested value are not yet moved to dataset level even though the draft specification (see example message) would allow this"
	if(dim.hasOwnProperty("dataSet")){
		dim.dataSet.forEach(getDimInfo);
	}

	//Void dataset
	var
		stat={
			version: "2.0",
			class: "dataset",
			updated: sdmx.header.prepared || null, //Not exactly the same thing... but publicationYear and publicationPeriod usually missing
			source: sdmx.header.sender.name || null, //Not exactly the same thing...
			label: meta.name || null,
			id: id,
			size: size,
			dimension: dimension,
			value: options.ovalue ? {} : new Array(length).fill(null)
		}
	;

	if(self){
		stat.link={
			alternate: [
				{
					type: "application/vnd.sdmx.data+json",
					href: self.href
				}
			]
		};
	}

	//No metric so far (metric treatment in SDMX/JSON-stat completely different)
	if(role.geo.length+role.time.length>0){
		if(!role.time.length){
			delete role.time;
		}
		if(!role.geo.length){
			delete role.geo;
		}
		stat.role=role;
	}

	//Keep status labels in extension (Eurostat-like)
	if(statusPos!==-1){
		stat.status=options.ostatus ? {} : new Array(length).fill(null);
		stat.extension={ status: { label: {} } };
		statusId.forEach(function(e){
			stat.extension.status.label[e.id]=e.name;
		});

		assignStatus=(options.ostatus) ?
			function(){
				var statusVal=data[ndx][statusPos];
				if(statusVal!==null){
					stat.status[ getValueIndex(stat, posArr) ] = statusId[ statusVal ].id;
				}
			}
			:
			function(){
				var statusVal=data[ndx][statusPos];
				stat.status[ getValueIndex(stat, posArr) ] = statusVal===null ? null : statusId[ statusVal ].id;
			}
		;
	}

	//Data+Status
	statusPos++; //index 1 instead of 0 because obs array has value in pos 0.
	for(var ndx in data){
		var posArr=ndx.split(":");

		if(!options.ovalue || data[ndx][0]!==null){
			stat.value[ getValueIndex(stat, posArr) ] = data[ndx][0];
		}

		assignStatus();
	}

	return options.instance ? JSONstat(stat) : stat;
}

function flatten(sdmx){
	var
	  ds=sdmx.dataSets[0],
	  series=ds.series,
	  meta=sdmx.structure,
	  dims=meta.dimensions,

	  observations={}
	;

	Object.keys(series).forEach(function(item){
	  var obs=series[item].observations;
	  Object.keys(obs).forEach(function(o){
			//obs index at the end
			observations[item+":"+o]=obs[o].concat(series[item].attributes);
	  });
	});

	ds.observations=observations;
	delete ds.series;

	//series+obs instead of obs+series because obs index is added at the end
	dims.observation=dims.series.concat(dims.observation);
	delete dims.series;

	meta.attributes.observation=meta.attributes.observation.concat(meta.attributes.series);
	delete meta.attributes.series;
  }
