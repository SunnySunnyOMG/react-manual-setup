# React App 配置流程

## 初始化
### 1. 初始化npm项目，在项目目录下运行

```
npm init
```

### 2. 配置项目基本信息

```
package name: (react-manual-config)
version: (1.0.0)
description: An example to show how to init a react app without create-react-app
entry point: (index.js)
test command:
git repository:
keywords: react, manual configuration
author: zhexu
license: (ISC) MIT
About to write to /Users/zhexu/wooko/TEST/react-manual-config/package.json:

{
  "name": "react-manual-config",
  "version": "1.0.0",
  "description": "An example to show how to init a react app without create-react-app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "react",
    "manual",
    "configuration"
  ],
  "author": "zhexu",
  "license": "MIT"
}
```

### 3. 安装必要依赖， 运行

```
npm install react react-dom 
```

##### 第三方依赖说明

- **react**
- **react-dom**

### 4. 安装开发环境依赖，运行

```
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react 
```

##### 开发环境依赖说明

- **webpack**

  打包工具，没啥好说的

- **webpack-cli**

  webpack的命令行工具

- **babel-loader**

webpack 打包时， 自动使用babel进行代码解析的loader
  
- **@babel/core**

Babel 7.X 核心库

- **@babel/preset-env**

  几乎必装的babel插件预配置，是你可以0配置直接使用es6，es7中的新特性而不必但担心兼容性问题

- **@babel/preset-react**

使用react的babel插件预配置，集成了JSX语法转换

## 配置项目

### 1. 配置项目结构

- 在根目录下新建文件 `index.js` 与文件夹 `/src`
- 在文件夹下新建文件 `app.js`

### 2. 配置webpack
在根目录下新建`webpack.config.js`，按以下配置

```js
// nodejs 中的 path 模块, 用于解析/组合路径，提供了多种方法
const path = require('path');

module.exports = {
  // webpack 解析的入口文件
  entry: 'index.js',
  // 输出目录
  output:{
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 用到的loader和plugin
  module:{
    // 使用loader的规则：
    // 除了node_modules文件夹下的
    // 所有以.js结尾的文件，都应使用babel-loader进行预编译
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use:{
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```

### 3. 配置babel
已经告诉webpack在打包的时候使用babel进行预编译，那么我们还需要具体配置一下babel的编辑规则

在根目录下新建 `.babelrc`, 按以下配置，用于支持es6/7和JSX语法：

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

配置完成后，目前的项目结构应为(忽略node_modules文件夹)：

```
├── index.js
├── package-lock.json
├── package.json
├── src
│   └── app.js
├── .babelrc
└── webpack.config.js
```

## 写点React代码
写一个在页面上打印` 'hello wooko' `的react app

### 1. `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/app';


ReactDOM.render(<App/>, document.getElementById('app'))
```
### 2. `app.js`

```js
import React from 'react';


export default class App extends React.Component {
  render(){
    return(
      <div> hello wooko </div>
    )
  }
}
```

## 尝试构建项目

### 1. 修改`package.json`,添加`build`快捷命令

```
{
  "name": "react-manual-config",
  "version": "1.0.0",
  "description": "An example to show how to init a react app without create-react-app",
  "main": "index.js",
  "scripts": {
  + "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "react",
    "manual",
    "configuration"
  ],
  "author": "zhexu",
  "license": "MIT",
  "dependencies": {
    "react": "^16.6.3",
    "react-dom": "^16.6.3"
  },
  "devDependencies": {
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.4",
    "webpack": "^4.27.1",
    "webpack-cli": "^3.1.2"
  }
}
```

当然你可以直接在命令行运行 `npx webpack`

### 2. 打个包试试
运行

```
npm run build
```

一切顺利的话，应该可以看到根目录下，出现了一个带有`bundle.js`文件的`dist`文件夹

```
.
├── dist
    └── bundle.js

```

成功啦！ 那么本教程... 等等！

好像只是js打包成功了而已，html还没有配置呢

## 搞一个HTML，用我们打包好的JS文件

你当然可以自己新建一个.html，文件然后手动引入bundle.js

然而在本例中，我们可以通过进一步配置webpack，使其在build时自动生成一个.html文件，引入`bundle.js`作为` script` 标签内容引入

### 安装webpack插件

运行

```
npm install html-webpack-plugin html-loader --save-dev
```
这里用到了一个自动生成html文件的

 - webpack plugin: [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/) 

 -  webpack loader: [html-loader](https://webpack.js.org/loaders/html-loader/)

















