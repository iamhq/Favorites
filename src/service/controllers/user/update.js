const model = require('../../model');
const UserModel = model.UserModel;


function updateUser(user) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({
            username: user.username
        }, function (err, data) {
            console.log('data',data);
            if (err) {
                reject('用户不存在');
                return;
            }
            if (data && data.password !== user.password) {
                reject('密码不正确');
                return;
            } 
            if(data){
                UserModel.updateOne({
                    username: user.username
                }, {
                    $set: {
                        password: user.newPassword
                    }
                }, (err) => {
                    if (err) {
                        reject('修改失败');
                    } else {
                        resolve('修改成功');
                    }
                });
            }else {
                reject('未知错误');
            }
        });
        
    });

}

module.exports = {
    'POST /u/update': async (ctx, next) => {
        let user = ctx.request.body || null;
        console.log('user',  ctx.request.body);
        if(!user) {
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