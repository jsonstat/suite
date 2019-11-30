//s string del delimiter
export default function dcomma(s,del){
	if(typeof s==="undefined" || s===null){
		return "";
	}
	return (s.indexOf(del)!==-1) ? '"'+ s +'"' : s;
}
