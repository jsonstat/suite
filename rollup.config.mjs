import json from '@rollup/plugin-json';
import terser from "@rollup/plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import { readFileSync } from "fs";

const
  pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8")),
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
      ...plugins
    ]
  },
  {
    input: "./src/index.js",
    output: {
      file: "import.mjs",
      format: "esm",
    },
    plugins: [
      resolve({mainFields: ["browser"]}),
      ...plugins
    ]
  }
]
