const model = require('./../../model');
const UserModel = model.UserModel;

function findALLFavorites(user) {
    return new Promise((resolve, reject) => {
        UserModel.findOne(user).populate('favorites', 'name', null, {
            sort: {
                name: -1
            }
        }).exec(function (err, docs) {
            if (err) {
                reject(err);
            } else {
                let data = {
                    list: docs.favorites
                }
                resolve(data);
            }

        })
    });

}

module.exports = {
    'POST /u/findALLFavorites': async (ctx, next) => {
        let user = {
            username: ctx.request.body.username
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