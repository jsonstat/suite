# fromSDMX

> Converts an object in the SDMX-JSON format to the JSON-stat dataset format.

**<code><i>object</i> JSONstatUtils.fromSDMX ( <i>object</i> sdmx [, <i>object</i> options] )
</code>**

```js
var
  jsonstat=JSONstatUtils.fromSDMX( sdmx ),
  ds=JSONstat( jsonstat )
;

console.log( ds.class ); //"dataset"
```

***

## Parameters

### sdmx (object): required

It must be an object in the SDMX-JSON format. Objects with more than one dataset are not supported. Only SDMX-JSON with a flat list of observations without any grouping (*dimensionAtObservation=allDimensions*) is fully supported. Support for intermediate grouping of observations (*series*) is experimental. 

### options (object)

#### ovalue (boolean)

When *true*, the *value* property in the resulting JSON-stat object will be an object instead of an array. By default, *false*.

(Using an object for *value* returns a lighter JSON-stat only if there are a lot of missing values. Unlike [fromTable](fromtable.md) and [fromCSV](fromcsv.md), this option does not require post-processing the data in *fromSDMX*.)

#### ostatus (boolean)

When *true*, the *status* property in the resulting JSON-stat object, if present, will be an object instead of an array. By default, *false*.

(Usually, using an object for *status* returns a lighter JSON-stat because, usually, only a small amount of data has status information attached.)

#### instance (boolean)

When *true*, the return value of *fromSDMX* is not a JSON-stat object but a *jsonstat* instance.

### Return Value

When **instance** is not specified or *false*, it returns an object in the JSON-stat format of class "dataset" that can be processed with [jsonstat-toolkit](https://www.npmjs.com/package/jsonstat-toolkit) to produce a *jsonstat* instance. When **instance** is *true*, it returns a *jsonstat* instance. On error it returns *null*.
