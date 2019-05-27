/**
 * 查询某个用户所有收藏夹
 */
const model = require('./../../model');
const UserModel = model.UserModel;

function findALLFavorites(user) {
    return new Promise((resolve, reject) => {
        console.log('user',user)
        UserModel.findOne(user).exec(function (err, docs) {
            var opts = [{
                path: 'favorites',
                // select : 'title'
            }];
            if (err) {
                reject(err);
            }
            docs.populate(opts, function (err, populatedDoc) {
                console.log(populatedDoc.favorites);
                if (err) {
                    reject(err);
                } else {
                    let data = {
                        list: docs.favorites
                    }
                    resolve(data);
                }
            });


        })
    });

}

module.exports = {
    'POST /u/findALLFavorites': async (ctx, next) => {
        console.log('ctx-body',ctx.request.body)
        let body = ctx.request.body;
        let user = {
            username: body.username
        }
        await findALLFavorites(user).then(
            (data) => {
                ctx.body = {
                    code: 200,
                    data: data,
                    msg: 'success'
                };
            },
            (err) => {
                ctx.body = {
                    code: 201,
                    msg: err
                };
            }
        );

    }
}