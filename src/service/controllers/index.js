const fs = require('fs');

module.exports = {
    'GET /': async (ctx, next) => {
        ctx.response.body = fs.createReadStream('./src/views/index.html');
        ctx.response.type = 'text/html';

    }
}