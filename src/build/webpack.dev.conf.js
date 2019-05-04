// 针对开发时配置的文件
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
// const WebpackDevServerOutput = require("webpack-dev-server-output");


// 开发模式
baseConfig.mode = "development";
// 打包文件在内存中的输出路径,可以通过http://localhost: 端口号/assets/访问
// baseConfig.output.publicPath = "/assets/";

let devConfig =  merge(baseConfig, {
plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
]
});

// baseConfig.plugins.push(
//     [
//         new WebpackDevServerOutput({
//             path: "./dist/assets",
//             isDel: true
//           })
//     ]
// )

console.log('webpackDevConf,,,');
module.exports = devConfig;