const model = require('./../../model');
const FavoritesModel = model.FavoritesModel;

function findAllSites(favorites, index, pageSize, SiteModel) {
    return new Promise((resolve, reject) => {
        let start = (index - 1) * pageSize;
        let query = FavoritesModel.find(favorites);
        query.find().populate({
            path: 'sites'
          ,options: { sort: { name: -1 }, skip: start , limit: pageSize}}).exec((err, docs) => {
            if (err) {
                reject(err);
            } else {
                let data = {
                    list: docs
                }
                resolve(data);
            }
        
        });
    });

}

module.exports = {
    'GET /fs/findAllSites': async (ctx, next) => {
        let favorites = {
            _id: ctx.request.body.favoritesID
        }
        let index = ctx.request.body.index;
        let pageSize = ctx.request.body.pageSize;
        await findAllSites(favorites, index, pageSize).then(
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