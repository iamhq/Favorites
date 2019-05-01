const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    /* 输入文件 */
    // entry: {
    //     index: ['babel-polyfill', path.resolve(__dirname, '../main.js')]
    // }
    entry: {
        path: path.join(__dirname, 'main.js')
    },
    output: {
        /* 输出目录，没有则新建 */
        path: path.join(__dirname, './dist'),
        /* 文件名 */
        filename: 'bundle.js',
        // filename: 'js/[name].[hash].js',
        // chunkFilename: 'js/[name].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/views/index.html'),
            // inject: true
        }),
        new ExtractTextPlugin("style.css"),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     /* 排除模块安装目录的文件 */
            //     exclude: /node_modules/
            // },
            {
                test: /\.png$|\.jpg$|\.gif$|\.ico$/,
                loader: "file-loader",
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                // use: 'vue-loader'
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            }
            
        ]
    },
    resolve: {
        alias: {
            // "vue": path.join(__dirname, "./node_modules/vue/dist/vue.js") //导入vue结尾的包时导入文件的路径
        }
    }


}