import { parse } from "@babel/parser";
import * as babel from "@babel/core";
import * as fs from "fs";
import path from "path";

// 由外部导入，必须使用 绝对路径
// 注释：const es6Code = `let a = 'let';let b = 2; const c= 3`;
const filePath = path.resolve(__dirname, "test.js");
console.log("filePath", filePath);

const es6Code = fs.readFileSync(filePath).toString();
const ast = parse(es6Code, { sourceType: "module" });

const result = babel.transformFromAstSync(ast, es6Code, {
  presets: ["@babel/preset-env"],
});

console.log(result && result.code);

const outPath = path.resolve(__dirname, "test.es5.js");
result && result.code && fs.writeFileSync(outPath, result.code);
