export default function checkds(ds){
	if(ds===null || ds.length===0 || ds.class!=="dataset"){
		return false;
	}

	for(var i=ds.length, len=1; i--;){
		len*=ds.Dimension(i).length;
	}
	if(len!==ds.n){
		return false;
	}
	return true;
}
