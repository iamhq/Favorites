// webpack.base.conf.js：开发和生产环境相同配置写这个里边

/* 引入操作路径模块和webpack */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 清除文件
// const CleanWebpackPlugin = require('clean-webpack-plugin');

console.log('__dirname_', path.resolve(__dirname, '../dist'));


module.exports = {
    mode: 'production',
    /* 输入文件 */
    entry: {
        index: ['./src/views/main.js']
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: '[name].js',
        // chunkFilename: 'js/[name].[chunkhash].js'
    },
    devServer: {
        index: "index.html",
        publicPath: "/",
        contentBase: path.join(__dirname, "src")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            },
            { //页面中import css文件打包需要用到
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: "../",

                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                /* 排除模块安装目录的文件 */
                exclude: /node_modules/
            },
            {
                test: /\.png$|\.jpg$|\.gif$|\.ico$/,
                // loader: "file-loader",
                use: 'url-loader?limit=8192&context=assets&name=[path][name].[ext]',
                exclude: /node_modules/
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../views/index.html'),
            inject: true
        }),
        new ExtractTextPlugin("style.css"),
        new VueLoaderPlugin(),
        // 删除文件 保留新文件
        // new CleanWebpackPlugin(),

    ]
};