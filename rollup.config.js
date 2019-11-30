import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import {terser} from "rollup-plugin-terser";
import resolve from 'rollup-plugin-node-resolve'
import * as pkg from "./package.json";

const
  globals={ "jsonstat-toolkit": "JSONstat" },
  external=["jsonstat-toolkit"],
  preamble=`// ${pkg.name} v${pkg.version} Copyright ${(new Date).getFullYear()} ${pkg.author.name} ${pkg.homepage}`,
  plugins=[
    json(),
    terser({
      output: { preamble }
    })
  ]
;

export default [
  {
    input: "./src/index.js",
    external,
    output: [
      {
        name: "JSONstatUtils",
        file: pkg.unpkg,
        format: "iife",
        globals
      }
    ],
    plugins: [
      replace({__IE__: 'Array.prototype.reduce||Object.defineProperty(Array.prototype,"reduce",{value:function(r){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof r)throw new TypeError(r+" is not a function");var e,t=Object(this),n=t.length>>>0,o=0;if(arguments.length>=2)e=arguments[1];else{for(;o<n&&!(o in t);)o++;if(o>=n)throw new TypeError("Reduce of empty array with no initial value");e=t[o++]}for(;o<n;)o in t&&(e=r(e,t[o],o,t)),o++;return e}}),Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(r){if(null==this)throw TypeError(\'"this" is null or not defined\');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<t;){var i=e[o];if(r.call(n,i,o,e))return i;o++}},configurable:!0,writable:!0}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(r){if(null==this)throw new TypeError(\'"this" is null or not defined\');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],o=0;o<t;){var i=e[o];if(r.call(n,i,o,e))return o;o++}return-1},configurable:!0,writable:!0});'}),
      ...plugins
    ]
  },
  {
    input: "./src/index.js",
    external,
    output: [
      {
        file: pkg.module,
        format: "esm",
        globals
      },
      {
        file: pkg.main,
        format: "cjs",
        globals
      },
    ],
    plugins: [
      replace({__IE__: ''}),
      ...plugins
    ]
  },
  {
    input: "./src/index.js",
    external: ["node-fetch"],
    output: {
      file: "import.mjs",
      format: "esm"
    },
    plugins: [
      replace({__IE__: ''}),
      resolve(),
      ...plugins
    ]
  }
]
