const model = require('./../../model');
const SiteModel = model.SiteModel;

function updateSite(site) {
    return new Promise((resolve, reject) => {
        SiteModel.updateOne({
            _id: site._id
        }, {
            $set: {
                title: site.title,
                desc: site.desc
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
    'GET /s/updateSite': async (ctx, next) => {
        let site = ctx.request.body;

        await updateSite(site).then(
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