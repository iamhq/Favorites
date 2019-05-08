// sign in:
/**
 * 
 */
const model = require('../../model');
const UserModel = model.UserModel;

function check(username, pass) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({
            username: username
        }, function (err, data) {
            if (!data) {
                reject(err);
            }
            if (data && data.username == username && data.password == pass) {
                resolve(data);
            } else {
                resolve(false);
            }
        });
    });
}

module.exports = {
    'POST /signin': async (ctx, next) => {
        let username = ctx.request.body.username || '';
        let pass = ctx.request.body.password || '';
        if (username === '' || pass === '') {
            
            ctx.body = {
                code: 201,
                msg: '请输入用户名和密码' 
            }
            return false;
        }

        await check(username, pass).then(
            res => {
                if (res) {
                    ctx.body = {
                        code: 200,
                        user: {
                            username: username,
                            nickname: res.nickname
                        }
                    };
                } else {
                    ctx.body =  {
                        code: 202,
                        title: 'home',
                        msg: '账号或密码错误'
                    };
                }
            },
            (err) => {
                ctx.body =  {
                    code: 203,
                    msg: '用户不存在'+err
                };
            }
        )
    }
};