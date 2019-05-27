const model = require('../../model');
const UserModel = model.UserModel;


function updateUser(user) {
    return new Promise((resolve, reject) => {
console.log(user);
        UserModel.updateOne({
            username: user.username
        }, {
                $set: {
                    avatar: user.avatar
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
    'POST /u/updateAvatar': async (ctx, next) => {
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