import JSONstat from "jsonstat-toolkit";

//SDMX-JSON flat flavor
//Options (ovalue, ostatus, instance). IE support requires polyfills for reduce, find and findIndex
export default function fromSDMX(sdmx, options){
	if(typeof sdmx!=="object"){
		return null;
	}

	//SDMX-JSON v.2.0.0. Convert to v.1
	if(sdmx.hasOwnProperty("data") && sdmx.hasOwnProperty("meta") && sdmx.data.hasOwnProperty("dataSets") && sdmx.data.hasOwnProperty("structures") && Array.isArray(sdmx.data.structures)){
		sdmx.dataSets=sdmx.data.dataSets;
		sdmx.structure=sdmx.data.structures[0];
		sdmx.header=sdmx.meta;
	}

	if(!sdmx.hasOwnProperty("dataSets") || !Array.isArray(sdmx.dataSets)){
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

	const
		meta=sdmx.structure,
		data=sdmx.dataSets[0].observations, //assuming one dataset and flat flavor
		attr=meta.attributes.observation,
		dim=meta.dimensions
	;

	if(!dim.hasOwnProperty("observation")){
		return null;
	}
	//series not null nor empty {} nor empty []?
	if(dim.hasOwnProperty("series") && Object.keys(dim.series).length){
		return null;
	}

	let
		length=1,
		statusId=[],
		assignStatus=function(){}, //void unless there's status info
		statusPos=attr.findIndex(function(e){return e.id==="OBS_STATUS";})
	;

	const
		id=[],
		size=[],
		dimension={},
		role={ time: [], geo: [] /*, metric: [] no metric so far*/ },

		getValueIndex=function(jsonstat, indices){
			const size=jsonstat.size;

			//If metadata at the dataSet level, indices.length<size.length: difference must be filled with 0
			for( let j=size.length-indices.length; j--; ){
				indices.push(0);
			}

			let num=0, mult=1;
			for( let i=0, ndims=size.length; i<ndims; i++ ){
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

			const cat=dimension[o.id].category;
			o.values.forEach(function(v){
				cat.index.push(v.id);

				Object.defineProperty(cat.label, v.id, {
					value: v.name,
					writable: true,
					enumerable: true
				});
			});
		},

		self=sdmx.header.links ? sdmx.header.links.find(function(e){return e.rel==="request";}) : null
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
	const stat={
		version: "2.0",
		class: "dataset",
		updated: sdmx.header.prepared || null, //Not exactly the same thing... but publicationYear and publicationPeriod usually missing
		source: sdmx.header.sender.name || null, //Not exactly the same thing...
		label: meta.name || null,
		id: id,
		size: size,
		dimension: dimension,
		value: options.ovalue ? {} : new Array(length).fill(null)
	};

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
			function(ndx, posArr){
				const statusVal=data[ndx][statusPos];
				if(statusVal!==null){
					stat.status[ getValueIndex(stat, posArr) ] = statusId[ statusVal ].id;
				}
			}
			:
			function(ndx, posArr){
				const statusVal=data[ndx][statusPos];
				stat.status[ getValueIndex(stat, posArr) ] = statusVal===null ? null : statusId[ statusVal ].id;
			}
		;
	}

	//Data+Status
	statusPos++; //index 1 instead of 0 because obs array has value in pos 0.
	for(let ndx in data){
		const posArr=ndx.split(":");

		if(!options.ovalue || data[ndx][0]!==null){
			stat.value[ getValueIndex(stat, posArr) ] = data[ndx][0];
		}

		assignStatus(ndx, posArr);
	}

	return options.instance ? JSONstat(stat) : stat;
}

function flatten(sdmx){
	const
	  ds=sdmx.dataSets[0],
	  series=ds.series,
	  meta=sdmx.structure,
	  dims=meta.dimensions,

	  observations={}
	;

	Object.keys(series).forEach(function(item){
	  const obs=series[item].observations;
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
