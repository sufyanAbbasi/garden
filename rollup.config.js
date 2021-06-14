import summary from "rollup-plugin-summary";
// import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default {
  input: "docs/index.js",
  output: {
    file: "docs/index.bundled.js",
    format: "esm",
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ "Reflect.decorate": "undefined" }),
    resolve(),
    // Minifying the bundle breaks the ShadyCSS ApplyShim
    // terser({
    //   ecma: 2017,
    //   module: true,
    //   warnings: true,
    //   mangle: {
    //     properties: {
    //       regex: /^__/,
    //     },
    //   },
    // }),
    summary(),
  ],
};
