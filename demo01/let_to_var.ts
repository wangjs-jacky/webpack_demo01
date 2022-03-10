// 导入 babel 三个处理 AST 树的API
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const code = `let a = 'let'; let b = 2`;
const ast = parse(code, { sourceType: "module" });

console.log(JSON.stringify(ast));

// 这里可以借助 chrome-dev-tools 查看 ast 具体的结构
console.log(ast); // 在 node 终端只能看到两层结构

// 在终端输入 node -r ts-node/register  --inspect-brk ./demo01/let_to_var.ts
// 注意的的是：需要始终保持 node 的运行，chrome才可以点击三角形展开

traverse(ast, {
  enter: (item) => {
    if (item.node.type === "VariableDeclaration") {
      if (item.node.kind === "let") {
        item.node.kind = "var";
      }
    }
  },
});

const result = generate(ast, {}, code);
console.log();

console.log(result.code);
