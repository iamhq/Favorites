const model = require('../../model');
const FavoritesModel = model.FavoritesModel;
const SiteModel = model.SiteModel;

function deleteSite(favoriteID, siteID) {
    return new Promise((resolve, reject) => {
        FavoritesModel.findOne({
            _id: favoriteID
        }, function (err, doc) {
            let array = doc.sites;
            let i = array.findIndex((f) => f == siteID)
            if (i === -1) {
                reject('不存在该记录');
                return;
            }
            array.splice(i, 1);
            doc.updateOne({
                sites: array
            }, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('删除成功');
                SiteModel.deleteOne({
                    _id: siteID
                }, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })

            });

        })
    });

}

module.exports = {
    'POST /fs/deleteSite': async (ctx, next) => {
        let siteID = ctx.request.body.siteID;
        let favoriteID = ctx.request.body.favoriteID;

        await deleteSite(favoriteID, siteID).then(
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