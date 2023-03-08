# toCSV

> Converts JSON-stat to the Comma-Separated Values (CSV) file format. The JSON-stat input must be of class "dataset", "collection" (and have some embedded dataset) or "bundle".

**<code><i>string</i> or <i>object</i> JSONstatUtils.toCSV ( <i>object</i> jsonstat [, <i>object</i> options] )
</code>**

```js
JSONstat("https://json-stat.org/samples/oecd.json").then(
  function(j){
    var csv=JSONstatUtils.toCSV(
      j,
      {
        status: true, //Include status info
        slabel: "status",
        vlabel: "value"
      }
    );
    document.getElementsByTagName("body")[0].innerHTML="<pre>"+csv+"</pre>";
  }
);
```

***

## Parameters

### jsonstat (object, string): required

It can be an object in the JSON-stat format,

```js
var csv=JSONstatUtils.toCSV( {
  	"version" : "2.0",
  	"class" : "dataset",
  	"href" : "https://json-stat.org/samples/canada.json",
  	"label" : "Population by sex and age group. Canada. 2012",
    ...
} );
```

or a *jsonstat* instance (the result of a JSON-stat object processed by [jsonstat-toolkit](https://www.npmjs.com/package/jsonstat-toolkit)).

```js
var
  jsonstat={
    "version" : "2.0",
    "class" : "dataset",
    "href" : "https://json-stat.org/samples/canada.json",
    "label" : "Population by sex and age group. Canada. 2012",
    ...
  },
  csv=JSONstatUtils.toCSV( JSONstat( jsonstat ) )
;
```

### options (object)

#### status (boolean)

It determines if a status column should be included. By default, *false*.

#### vlabel (string)

It is the name of the value column. By default, "Value".

#### slabel (string)

It is the name of the status column when **status** is *true*. By default, "Status".

#### content (string: "label", "id", "[id] label")

Default value is "label". It determines whether categories in the CSV file are identified by label, ID or both in the form "[id] label" (example: "[DE] Germany").

#### field (string: "label", "id")

Default value is "label". It determines whether dimensions, value and status are identified by label or by ID in the CSV file.

#### na (string)

It is the string that will be used when a value is not available. By default, "n/a".

#### delimiter (string)

It is the character that will be used as the column separator. By default, ",".

#### decimal (string)

It is the character that will be used as the decimal mark. By default, it is ".", unless **delimiter** is ";" (default decimal mark is then ",").

#### dsid (positive integer or string)

It is used to select a dataset when the JSON-stat input is of class "collection" or "bundle". When a positive integer is specified, it is interpreted as an index. By default, it is 0 (first dataset). When a string is specified, it is the id of the selected dataset.

#### rich (boolean)

It is used to set the CSV flavor. See the [Return Value section](#return-value). By default, *false*.

When **rich** is *true*, **vlabel**, **slabel**, **status**, **field** and **content** are ignored.

#### separator (string)

It is the character that will be used as the unit fields (number of decimals, unit label, symbol, symbol position) separator. It must be different from **delimiter** and cannot be a character present in the unit fields. When **rich** is *false*, it is ignored. By default, "|".

### Return Value

It returns a string in the CSV format. When **rich** is *true*, it returns a rich CSV string in the [JSON-stat Comma-Separated Values format](https://github.com/badosa/CSV-stat) (CSV-stat, or JSV for short). CSV-stat is CSV plus a metadata header. CSV-stat supports all the JSON-stat dataset core semantics. This means that CSV-stat can be converted back to JSON-stat (using [fromCSV](fromcsv.md)) without loss of information (only the *note*, *link*, *child*, *coordinates* and *extension* properties are not currently supported).

On error it returns *null*.
