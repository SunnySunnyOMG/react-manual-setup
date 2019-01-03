// nodejs 中的 path 模块, 用于解析/组合路径，提供了多种方法
const path = require('path');

module.exports = {
  // webpack 解析的入口文件
  entry: './index.js',
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