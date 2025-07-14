# Installation

> [JSON-stat JavaScript Utilities Suite v.3](https://github.com/jsonstat/suite/blob/master/README.md) ▸ **Installation**

<blockquote>This is the documentation of the JSON-stat JavaScript Utilities Suite version 3. Version 2 has slightly different installation procedures that are documented <a href="https://www.npmjs.com/package/jsonstat-utils">elsewhere</a>.</blockquote>

## Browser

### Script tag

<strong>jsonstat-suite</strong> is built on top of <strong>jsonstat-toolkit</strong>. Copy the latest version of the [jsonstat-toolkit code](https://raw.githubusercontent.com/jsonstat/toolkit/master/iife.js) and the latest version of the [jsonstat-suite code](https://raw.githubusercontent.com/jsonstat/suite/master/iife.js) to your server and use script tags in your webpage to link to them. Both are also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script src="https://unpkg.com/jsonstat-toolkit@1.4.2"></script>
<script src="https://unpkg.com/jsonstat-suite@3.5.0"></script>
```

```html
<script src="https://cdn.jsdelivr.net/combine/npm/jsonstat-toolkit@1.4.2,npm/jsonstat-suite@3.5.0"></script>
```

The Suite works on any modern browser.

### ECMAScript module

Very modern browsers support ECMAScript modules. Copy the latest version of the [ECMAScript module](https://raw.githubusercontent.com/jsonstat/suite/master/import.mjs) to your server and import it in your webpage. The module is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script type="module">
import * as JSONstatUtils from "https://cdn.jsdelivr.net/npm/jsonstat-suite@3.5.0/import.mjs";
</script>
```

```html
<script type="module">
import * as JSONstatUtils from "https://unpkg.com/jsonstat-suite@3.5.0/import.mjs";
</script>
```

The Suite ECMAScript module works on any browser that support ECMAScript modules.

## Node.js

```
$ npm install jsonstat-suite
```

#### CommonJS

```js
const JSONstatUtils = require("jsonstat-suite");
```

#### ES Module

```js
import * as JSONstatUtils from "jsonstat-suite";
```

## Observable

To use the jsonstat-suite in [Observable](https://observablehq.com/) simply import the functions you need from @jsonstat/euro. For example, to use toCSV, fromCSV and fromSDMX (renamed as SDMX):

```js
import { toCSV, fromCSV, fromSDMX as SDMX } from "@jsonstat/suite"
```

Or import all the functions of a particular version:

```js
JSONstatUtils = import("jsonstat-suite@3.5.0/import.mjs")
```
