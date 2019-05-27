const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const path = require('path')
const Config = require('./config/config')
const onerror = require('koa-error')
const koabody = require('koa-body')
var model = require('./model');
const controller = require('./controller')
var app = new Koa();
const isProduction = process.env.NODE_ENV === 'development';

// 错误信息处理
onerror(app);

// 控制台打印URL以及页面执行时间：
app.use(async (ctx, next) => {
  var
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...  ${execTime}ms`);
});

//处理静态文件：
if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/dist/', path.resolve(__dirname, '../dist')));
  // app.use(staticFiles('/assets/', path.resolve(__dirname, '../assets')));
  app.use(staticFiles('/uploads/', path.resolve(__dirname, '../assets/images/uploads')));
}

// 解析POST请求：,响应json
// koa-json中间件，它会自动将我们返回的数据转换为json格式
// app.use(json());
app.use(koabody({multipart:true}));
app.use(bodyParser());

// add controllers:
// 处理URL路由：
// app.use(Router);
app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.body = '';
  }
  await next();
});
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3012');
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  await next();
});
app.use(controller('user')); //   controllers/user
app.use(controller('userFavorites'));
app.use(controller('favorites'));
app.use(controller('favoritesSite'));
app.use(controller('site'));
app.use(controller()); //   controllers


app.listen(Config.node.port);
console.log('app started at port ' + Config.node.port + '...');