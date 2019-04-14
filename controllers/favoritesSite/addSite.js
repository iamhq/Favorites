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
                let array = doc.sites;
                array.push(s._id);

                doc.updateOne({
                    sites: array
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
    'POST /fs/addSite': async (ctx, next) => {
        let site = ctx.request.body;
        let favoritesID = ctx.request.body.favoritesID;
        site._id = new mongoose.Types.ObjectId();

        await addSite(favoritesID, site).then(
            () => {
                ctx.body = {
                    code: 200,
                    msg: '添加成功'
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