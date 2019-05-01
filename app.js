var server = require('./src/service/server');

const koaWebpack = require('koa-webpack');
const webpackDevConf = require('./src/build/webpack.dev.conf');
const Koa = require('koa');
require('./src/views/main');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'development';

// 注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
process.env.NODE_ENV = 'production';

// 开发环境用webpack编译和热加载插件
const options = {
  config: webpackDevConf,
};
app.use(async (ctx, next) => {
  await koaWebpack(options);
});

