const model = require('./../../model');
const FavoritesModel = model.FavoritesModel;

function updateFavorites(favorites) {
    return new Promise((resolve, reject) => {
        FavoritesModel.updateOne({
            _id: favorites._id
        }, {
            $set: {
                name: favorites.name
            }
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('修改成功');
            }
        });
    });

}

module.exports = {
    'POST /u/updateFavorites': async (ctx, next) => {
        let favorites = {
            _id: ctx.request.body._id,
            name: ctx.request.body.name
        }

        await updateFavorites(favorites).then(
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