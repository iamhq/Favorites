// 注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
// process.env.NODE_ENV = 'production';
const isProduction = process.env.NODE_ENV === 'production';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');
var app = new Koa();

// 记录URL以及页面执行时间：
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
  app.use(staticFiles('/static/', __dirname + '/static'));
}

// 解析POST请求：,响应json
// koa-json中间件，它会自动将我们返回的数据转换为json格式
// app.use(json());
// app.use(koabody());
app.use(bodyParser());


// 给ctx加上render()来使用Nunjucks：
app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));

// add controllers:
// 处理URL路由：
// app.use(Router);
app.use(controller('user')); //   controllers/user
app.use(controller('userFavorites'));
app.use(controller('favorites')); 
app.use(controller('favoritesSite'));
app.use(controller('site'));
app.use(controller()); //   controllers


app.listen(3000);
console.log('app started at port 3000...');