export default function checkds(ds){
	if(ds===null || ds.length===0 || ds.class!=="dataset"){
		return false;
	}

	let len=1;
	for(let i=ds.length; i--;){
		len*=ds.Dimension(i).length;
	}
	if(len!==ds.n){
		return false;
	}
	return true;
}
