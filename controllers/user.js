const model = require('./../model');


module.exports = {
    'GET /user': async (ctx, next) => {
        let results = await model.UserModel.findByName('user1');
        ctx.render('user.html', {
            user: results[0]
        });

    }
}