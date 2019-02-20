const mongoose = require('mongoose');
const model = require('./../../model');
const UserModel = model.UserModel;
const FavoritesModel = model.FavoritesModel;

function addFavorites(username, favorites) {
    return new Promise((resolve, reject) => {
        let f = new FavoritesModel(favorites);
        f.save(function (err) {
            if (err) {
                reject('save f: ' + err);
            }

            UserModel.findOne({
                // _id: _id
                username: username
            }).exec(function (err, doc) {
                let array = doc.favorites;
                array.push(f._id);

                doc.updateOne({
                    favorites: array
                }, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });

            })

        })
    });

}

module.exports = {
    'POST /uf/addFavorites': async (ctx, next) => {
        let username = ctx.request.body.username;
        let favorites = {
            _id: new mongoose.Types.ObjectId(),
            name: ctx.request.body.favorites.name,
            sites: [],
        }

        await addFavorites(username, favorites).then(
            () => {
                ctx.body = {
                    code: 200,
                    msg: ''
                };
            },
            (err) => {
                ctx.body = {
                    code: 201,
                    msg: err
                }
            }
        );

    }
}