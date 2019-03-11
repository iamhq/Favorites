// 针对开发时配置的文件
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');

let devConfig =  merge(baseConfig, {
output: {
    path: '/'
},
plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
]
});

console.log('webpackDevConf,,,');
module.exports = devConfig;