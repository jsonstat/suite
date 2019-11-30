import fromTable from "./fromtable.js";

//CSVToArray by Ben Nadel: http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
function CSVToArray( strData, strDelimiter ){
	// Check to see if the delimiter is defined. If not,
	// then default to comma.
	strDelimiter = (strDelimiter || ",");

	// Create a regular expression to parse the CSV values.
	var
		objPattern = new RegExp(
			(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
		),
		// Create an array to hold our data. Give the array
		// a default empty first row.
		arrData = [[]],
		// Create an array to hold our individual pattern
		// matching groups.
		arrMatches = null,
		strMatchedValue,
		strMatchedDelimiter
	;

	// Keep looping over the regular expression matches
	// until we can no longer find a match.
	while (arrMatches = objPattern.exec( strData )){
		// Get the delimiter that was found.
		strMatchedDelimiter = arrMatches[ 1 ];

		// Check to see if the given delimiter has a length
		// (is not the start of string) and if it matches
		// field delimiter. If id does not, then we know
		// that this delimiter is a row delimiter.
		if (
			strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){
			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );
		}

		// Now that we have our delimiter out of the way,
		// let's check to see which kind of value we
		// captured (quoted or unquoted).
		if (arrMatches[ 2 ]){
			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),
				"\""
			);
		}else{
			// We found a non-quoted value.
			strMatchedValue = arrMatches[ 3 ];
		}

		// Now that we have our value string, let's add
		// it to the data array.
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}

	// Return the parsed data.
	return( arrData );
}


//csv, {delimiter, decimal, vlabel, slabel, label, ostatus, ovalue, instance} All options but instance ignored if rich
//Returns JSONstat
export default function fromCSV(csv, options){
	if(typeof csv==="undefined"){
		return null;
	}

	if(typeof options==="undefined"){
		options={};
	}

	var
		header=[],
		vcol=null,
		obj=null,
		nrows,
		i,
		roleExist=false,
		role={ time: [], geo: [], metric: [] },
		separator,

		rich=(csv.substring(0,8)==="jsonstat"), //Rich CSV (CSV-stat)
		//All options will be ignored if rich
		vlabel=rich ? "value" : options.vlabel,
		slabel=rich ? "status" : options.slabel,

		delimiter=rich ? csv.substring(8,9) : (options.delimiter || ","), //CSV column delimiter
		decimal=(delimiter===";") ?
			(options.decimal || ",")
			:
			(options.decimal || "."),
		table=CSVToArray( csv.trim(), delimiter )
	;

	if(rich){
		decimal=table[0][1];
		separator=table[0][2];

		table.shift();
		while(table[0][0]!=="data"){
			header.push(table.shift());
		}
		table.shift();

		obj={ dimension: {} };
		header.forEach(function(e){
			var i, label, len, dim, cat, unit, id, lab;
			switch (e[0]) {
				case "dimension":
					obj.dimension[e[1]]={};
					dim=obj.dimension[e[1]];
					dim.label=e[2];
					dim.category={};
					cat=dim.category;
					cat.index=[]; //Ignore index returned by fromTable(): take ids order from header

					label={};
					len=(e[3]*2)+3;
					if(e.length>=len){
						for(i=4; i<len; i++){ //3=4-1
							id=e[i];
							lab=e[++i];
							Object.defineProperty( label, id, {
								value: lab,
								writable: true,
								configurable: true,
								enumerable: true
							});

							cat.label=label;
							cat.index.push(id);
						}

						//role info available?
						if(typeof e[i]==="string" && ["time", "geo", "metric"].indexOf(e[i])!==-1){
							role[e[i]].push(e[1]);
							roleExist=true;

							//Unit info available?
							if(e[i]==="metric" && typeof e[++i]==="string"){
								cat.unit={};
								//For each category extract unit info
								cat.index.forEach(function(c,j){
									var u=e[i+j].split(separator);
									cat.unit[c]={};
									unit=cat.unit[c];

									if(typeof u[0]!=="undefined" && u[0]!==""){
										unit.decimals=u[0]*1;
									}
									if(typeof u[1]!=="undefined" && u[1]!==""){
										unit.label=u[1];
									}
									if(typeof u[2]!=="undefined" && u[2]!==""){
										unit.symbol=u[2];
									}
									if(typeof u[1]!=="undefined" && ["start","end"].indexOf(u[3])!==-1){
										unit.position=u[3];
									}
								});
							}
						}
					}
				break;
				case "label":
				case "source":
				case "updated":
				case "href":
					obj[e[0]]=e[1] || null;
				break;
				//No default case: ignore lines with unknown tags. If known tags are void, empty string
			}
		});

		if(roleExist){
			if(!role.time.length){
				delete role.time;
			}
			if(!role.geo.length){
				delete role.geo;
			}
			if(!role.metric.length){
				delete role.metric;
			}
			obj.role=role;
		}
	}

	nrows=table.length;
	i=table[0].length;

	//2.1.3: If no vlabel, last column used
	if(typeof vlabel!=="undefined"){
		for(;i--;){
			if(table[0][i]===vlabel){
				vcol=i;
				break;
			}
		}
		if(vcol===null){
			return null; //vlabel not found in the CSV
		}
	}else{//simple standard CSV without status: value is last column
		vcol=i-1;
		vlabel=table[0][vcol];
	}

	if(decimal===","){
		for(i=1; i<nrows; i++){
			table[i][vcol]=Number(table[i][vcol].replace(",", "."));
		}
	}else{
		for(i=1; i<nrows; i++){
			table[i][vcol]=Number(table[i][vcol]);
		}
	}

	return fromTable(
		table, {
			header: obj, //internal option for rich (CSV-stat)
			vlabel: vlabel,
			slabel: slabel,
			type: "array",
			label: options.label || "", //It will be rewritten if rich,
			ovalue: options.ovalue || false,
			ostatus: options.ostatus || false,
			instance: options.instance || false
		})
	;
}
