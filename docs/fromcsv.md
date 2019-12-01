# fromCSV

> Converts a string in the Comma-Separated Values (CSV) file format to the JSON-stat dataset format.

**<code><i>object</i> JSONstatUtils.fromCSV ( <i>string</i> csv [, <i>object</i> options] )
</code>**

```js
var csv="place of birth,age group,gender,year,province of residence,concept,value\n ...";

var jsonstat=JSONstatUtils.fromCSV(
  csv,
  {
    label: "Imported from a CSV"
  }
);

var ds=JSONstat( jsonstat );

console.log( ds.label ); //"Imported from a CSV"
console.log( ds.n ); //Number of data
```

***

## Parameters

### csv (string): required

It must be a string in the Comma-Separated Values (CSV) format with a first row for labels and a column for each dimension, a column for values and optionally a column for statuses.

By default, a CSV with values in the last column and no status column is expected. Use **vlabel** and **slabel** options when this is not the case.

CSV-stat is also supported. The [JSON-stat Comma-Separated Values format](https://github.com/badosa/CSV-stat) (CSV-stat, or JSV for short) is CSV plus a metadata header. CSV-stat supports all the JSON-stat dataset core semantics. This means that CSV-stat can be created using [toCSV](tocsv.md) and converted back to JSON-stat without loss of information (only the *note*, *link*, *child*, *coordinates* and *extension* properties are not currently supported).

When CSV-stat is detected, all options but **instance** are ignored.

### options (object)

#### vlabel (string)

It is the name of the value column. When not provided, the value column must be the last one.

When CSV-stat is detected, **vlabel** is ignored.

#### slabel (string)

It is the name of the status column. By default, "Status". If no column has the specified name, no status information will be included in the output.

When CSV-stat is detected, **slabel** is ignored.

#### delimiter (string)

It is the character that will be used as the column separator. By default, ",".

When CSV-stat is detected, **delimiter** is ignored.

#### decimal (string)

It is the character that will be used as the decimal mark. By default, it is ".", unless **delimiter** is ";" (default decimal mark is then ",").

When CSV-stat is detected, **decimal** is ignored.

#### label (string)

It is a text that will be used as the dataset label. By default, "".

When CSV-stat is detected, **label** is ignored.

#### ovalue (boolean)

When *true*, the *value* property in the resulting JSON-stat object will be an object instead of an array. By default, *false*.

(This option was mainly added for the [JSON-stat Command Line Conversion Tools](https://www.npmjs.com/package/jsonstat-conv) where speed is probably not critical. The way it is implemented in *fromCSV* requires post-processing the data. That's why it is not recommended unless size is more important than speed. Take into account that the resulting JSON-stat will be lighter using an object for *value* only if there are a lot of missing values.)

#### ostatus (boolean)

When *true*, the **status** property in the resulting JSON-stat object, if present, will be an object instead of an array. By default, *false*.

(This option was mainly added for the [JSON-stat Command Line Conversion Tools](https://www.npmjs.com/package/jsonstat-conv) where speed is probably not critical. The way it is implemented in [fromTable](fromtable.md) requires post-processing the data. That's why it is not recommended unless size is more important than speed. Usually, using an object for *status* returns a lighter JSON-stat because, usually, only a small amount of data has status information attached.)

#### instance (boolean)

When *true*, the return value of *fromCSV* is not a JSON-stat object but a *jsonstat* instance.

### Return Value

When **instance** is not specified or *false*, it returns an object in the JSON-stat format of class "dataset" that can be processed with [jsonstat-toolkit](https://www.npmjs.com/package/jsonstat-toolkit) to produce a *jsonstat* instance. When **instance** is *true*, it returns a *jsonstat* instance. On error it returns *null*.
