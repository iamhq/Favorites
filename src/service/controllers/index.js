const fs = require('fs');

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', 'http://localhost:3011');
        ctx.response.body = fs.createReadStream('./src/views/index.html');
        ctx.response.type = 'text/html';

    }
}