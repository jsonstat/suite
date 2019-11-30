var
  JSONstatUtils=require("../main.cjs"),
  https=require("https"),
  url="https://stats.oecd.org/SDMX-JSON/data/LFS_SEXAGE_I_R/DNK+FIN+NOR.MW.900000.UR.A/all?startTime=2010&dimensionAtObservation=allDimensions",
  main=function(sdmx){
      var
        ds=JSONstatUtils.fromSDMX(sdmx, {instance: true}),
        csv=JSONstatUtils.toCSV(ds)
      ;
      console.log("\n"+ds.label);
      console.log(ds.source);
      console.log("\n"+csv);
  }
;

getSDMX(url, main);

function getSDMX(url, callback){
  https.get(url, function(res) {
  	var
  		str="",
  		s=res.statusCode
  	;
  	if(s>=200 && s<300 || s===304){
  		res.on("data", function(chunk){
  			str+=chunk;
  		});
  		res.on("end", function(){
        callback(JSON.parse(str));
      });
    }else{
  		console.log("Can't retrieve document (error "+s+")");
  	}
  }).on("error", function(e) {
  	console.log("Connection error: " + e.message);
  });
}
