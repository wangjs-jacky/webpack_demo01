// 版本3： 支持分析循环依赖

import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import { readFileSync } from "fs";
import { resolve, relative, dirname } from "path";

const projectRoot = resolve(__dirname, "project_3");
type DepRelation = { [key: string]: { deps: string[]; code: string } };
const depRelation: DepRelation = {};

collectCodeAndDeps(resolve(projectRoot, "index.js"));

console.log(depRelation);
console.log("done");

function collectCodeAndDeps(filepath: string) {
  const key = getProjectPath(filepath); // 文件的项目路径，如 index.js

  if (Object.keys(depRelation).includes(key)) {
    console.warn(`duplicated dependency: ${key}`);
    return;
  }

  // 获取文件内容，将内容放至 depRelation
  const code = readFileSync(filepath).toString();
  // 初始化 depRelation[key]
  depRelation[key] = { deps: [], code: code };
  // 将代码转为 AST
  const ast = parse(code, { sourceType: "module" });
  // 分析文件依赖，将内容放至 depRelation
  traverse(ast, {
    enter: (path) => {
      if (path.node.type === "ImportDeclaration") {
        // path.node.source.value 往往是一个相对路径，如 ./a.js，需要先把它转为一个绝对路径
        const depAbsolutePath = resolve(
          dirname(filepath),
          path.node.source.value
        );
        // 然后转为项目路径
        const depProjectPath = getProjectPath(depAbsolutePath);
        // 把依赖写进 depRelation
        // console.log("将",depProjectPath,"添加到 depRelation 数组中");
        depRelation[key].deps.push(depProjectPath);
        collectCodeAndDeps(depAbsolutePath);
      }
    },
  });
}
// 获取文件相对于根目录的相对路径
function getProjectPath(path: string) {
  // console.log("获取相对路径：", relative(projectRoot, path));
  return relative(projectRoot, path).replace(/\\/g, "/");
}
