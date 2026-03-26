import JSONstat from "jsonstat-toolkit";

export default function dataset(j, dsid){
	if(typeof j==="undefined" || j===null){
		return null;
	}
	if(
		typeof j==="string" || //uri (synchronous!)
		typeof j.length==="undefined" //JSON-stat response
		){
		j=JSONstat(j);
	}

	if(j.length===0 ||
		(
			j.class!=="dataset" &&
			j.class!=="collection" &&
			j.class!=="bundle"
		)
	){
		return null;
	}

	//Accept metadata-only datasets (if no data, create an empty array)
	if(j.value===null){
		j.value = Array(j.n).fill(null);
	}

	return (j.class==="dataset") ? j : j.Dataset(dsid);
}
