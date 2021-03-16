# Installation

> [JSON-stat Javascript Utilities Suite v.3](https://github.com/jsonstat/suite/blob/master/README.md) ▸ **Installation**

<blockquote>This is the documentation of the JSON-stat Javascript Utilities Suite version 3. Version 2 has slightly different installation procedures that are documented <a href="https://www.npmjs.com/package/jsonstat-utils">elsewhere</a>.</blockquote>

## Browser

### Script tag

<strong>jsonstat-suite</strong> is built on top of <strong>jsonstat-toolkit</strong>. Copy the latest version of the [jsonstat-toolkit code](https://raw.githubusercontent.com/jsonstat/toolkit/master/iife.js) and the latest version of the [jsonstat-suite code](https://raw.githubusercontent.com/jsonstat/suite/master/iife.js) to your server and use script tags in your webpage to link to them. Both are also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script src="https://unpkg.com/jsonstat-toolkit@1.2.5"></script>
<script src="https://unpkg.com/jsonstat-suite@3.1.5"></script>
```

```html
<script src="https://cdn.jsdelivr.net/combine/npm/jsonstat-toolkit@1.2.5,npm/jsonstat-suite@3.1.5"></script>
```

The Suite works on any modern browser. The oldest browser supported is Internet Explorer 9.

### ECMAScript module

Very modern browsers support ECMAScript modules. Copy the latest version of the [ECMAScript module](https://raw.githubusercontent.com/jsonstat/suite/master/import.mjs) to your server and import it in your webpage. The module is also available from several CDNs ([unpkg](https://unpkg.com), [jsDelivr](https://www.jsdelivr.com/)):

```html
<script type="module">
import * as JSONstatUtils from "https://cdn.jsdelivr.net/npm/jsonstat-suite@3.1.5/import.mjs";
</script>
```

```html
<script type="module">
import * as JSONstatUtils from "https://unpkg.com/jsonstat-suite@3.1.5/import.mjs";
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

The safest way to load the jsonstat-toolkit in [Observable](https://observablehq.com/) is:

```js
JSONstat = require('jsonstat-toolkit@1.2.5').catch(() => window["JSONstat"])
JSONstatUtils = import('jsonstat-suite@3.1.5/import.mjs')
```
