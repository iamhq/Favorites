const model = require('../../model');
const FavoritesModel = model.FavoritesModel;
const UserModel = model.UserModel;

function deleteFavorites(username, _id) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({
            username: username
        }, function (err, doc) {
            let array = doc.favorites;
            let i = array.findIndex((f) => f == _id)
            if (i === -1) {
                reject('不存在该记录');
                return;
            }
            array.splice(i, 1);
            doc.updateOne({
                favorites: array
            }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('删除成功')
                FavoritesModel.deleteOne({
                    _id: _id
                }, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })

            });

        })
    });

}

module.exports = {
    'POST /f/deleteFavorites': async (ctx, next) => {
        let _id = ctx.request.body._id;
        let username = ctx.request.body.username;

        await deleteFavorites(username, _id).then(
            (data) => {
                ctx.body = {
                    code: 200,
                    msg: data
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