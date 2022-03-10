## 案例1：使用`babel`完成`AST`转换
调用：

``` shell
node -r ts-node/register  ./demo01/let_to_var.ts
```

熟悉 babel 三个库的使用
> 注意导入方式
```javascript
import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import generate from "@babel/generator"
```

使用`--inspect-brk` 触发 `Chrome-dev-tools` 对 `node` 代码进行 `Debug` 调试，尝试执行如下指令：

```shell
node -r ts-node/register  --inspect-brk ./demo.js/let_to_var.ts
```

随意打开一个 `Chrome` 页面，点击`Node`图标，在 `source` 面板内打断点，执行调试功能。



## 案例2：调用`@babel/preset-env`转化es5代码

调用：

```shell
node -r ts-node/register ./demo02/to_es5.ts  
```



## 案例3：模拟读入/写出 `js` 文件

调用：

```shell
node -r ts-node/register ./demo03/file_to_es5.ts  
```
其中，`test.js` 是 `es6` 代码文件, `test.ej5.js` 是新生成的`es5` 代码。



## 案例4：核心目标完成一个功能比较完善的 `deps.ts` 依赖分析模块

1. 调用如下代码，分析`project_1`文件夹下`index.js`模块的依赖。
    ```shell
    node -r ts-node/register ./demo04/deps.ts  
    ```

2. 修改`deps_2.ts` 文件中的，`projectRoot`为`project_2`

    ```shell
    node -r ts-node/register ./demo04/deps_2.ts  
    ```
    可以递归的分析依赖文件。


3. 修改`deps_2.ts` 文件中的，`projectRoot`为`project_3`

    ```shell
    node -r ts-node/register ./demo04/deps_2.ts  
    ```
    观察当`project_3`中的`index.js`存在循环依赖时的报错

    ```bash
    RangeError: Maximum call stack size exceeded
    ```

4. 使用`deps_3.ts`去分析`project_3`文件夹，正常

    ```shell
    node -r ts-node/register ./demo04/deps_3.ts  
    ```

5. 执行下列指令：

    ```shell
    node ./demo04/index.js
    ```
    旨在说明，即使存在`循环依赖`函数也可以正常执行，只要不出现循环计算即可。


## 总结

在后面的案例中，直接使用`deps_3.ts`对模块进行依赖分析。

