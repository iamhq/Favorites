var server = require('./src/service/server');

const koaWebpack = require('koa-webpack');
const webpackDevConf = require('./src/build/webpack.dev.conf');
const Koa = require('koa');
const app = new Koa();

const isProduction = process.env.NODE_ENV === 'development';




