const model = require('../../model');
const UserModel = model.UserModel;


function updateUser(user) {
    return new Promise((resolve, reject) => {

        UserModel.updateOne({
            username: user.username
        }, {
                $set: {
                    nickname: user.nickname
                }
            }, (err) => {
                if (err) {
                    reject('修改失败');
                } else {
                    resolve('修改成功');
                }
            }
            )
    })
}

module.exports = {
    'POST /u/updateUser': async (ctx, next) => {
        let user = ctx.request.body || null;
        console.log('user', ctx.request.body);
        if (!user) {
            ctx.body = {
                code: 201,
                msg: '不能为空'
            };
            return false;
        }

        await updateUser(user).then(
            (data) => {
                ctx.body = {
                    code: 200,
                    msg: data
                };
            },
            (err) => {
                ctx.body = {
                    code: 202,
                    msg: err
                };
            }
        );

    }
}