const model = require('../model');
const UserModel = model.UserModel;
const fs = require('fs');



module.exports = {
    'GET /user': async (ctx, next) => {
        let results = await UserModel.findOne({username: 'user1'});
        // ctx.render('user.html', {
        //     user: results[0]
        // });
        ctx.response.body = fs.createReadStream('./views/user.html');
        ctx.response.type = 'text/html';

    }
}