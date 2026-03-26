var
  JSONstatUtils=require("../main.cjs"),
  https=require("https"),
  url="https://sdmx.oecd.org/public/rest/data/OECD.SDD.TPS,DSD_PRICES@DF_PRICES_ALL,1.0/.M.N.CPI.._T.N.GY+_Z?startPeriod=2025-02&dimensionAtObservation=AllDimensions&format=jsondata",
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
