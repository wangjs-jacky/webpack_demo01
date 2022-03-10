//  使用 @babel/core 和 @babel/preset-env 转化为 es5 代码
import { parse } from "@babel/parser";
import * as babel from "@babel/core";

const es6Code = `let a = 'let';let b = 2; const c= 3`;
const ast = parse(es6Code, { sourceType: "module" });

// 使用 babel 核心中的 transformFromAstSync 函数，指定转化器(preset-env)
const result = babel.transformFromAstSync(ast, es6Code, {
  presets: ["@babel/preset-env"],
});

// https://www.babeljs.cn/docs/babel-core
// babel.transform(es6Code, {}, function (err, result) {
//   console.log("es5Code", result && result.code);
// });

// 结果就在 .code 属性上
console.log(result && result.code); // 该写法是为了解决 ts 的报错
