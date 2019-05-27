const mongoose = require('mongoose');
const model = require('./../../model');
const FavoritesModel = model.FavoritesModel;
const SiteModel = model.SiteModel;

function addSite(favoritesID, site) {
    return new Promise((resolve, reject) => {
        let s = new SiteModel(site);
        s.save(function (err) {
            if (err) {
                reject('save s: ' + err);
            }

            FavoritesModel.findOne({
                _id: favoritesID
            }).exec(function (err, doc) {
                let array = doc.sites || [];
                array.push(s._id);

                doc.updateOne({
                    sites: array
                }, function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                });

            })

        })
    });

}

module.exports = {
    'POST /fs/addSite': async (ctx, next) => {
        let site = ctx.request.body;
        let favoritesID = ctx.request.body.favoriteID;
        site.user_id = ctx.request.body.user_id;
        site.avatar = ctx.request.body.avatar;
        site.f_id = ctx.request.body.favoritesID;
        site._id = new mongoose.Types.ObjectId();

        await addSite(favoritesID, site).then(
            (response) => {
                ctx.body = {
                    code: 200,
                    msg: '添加成功',
                    favorite: response
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