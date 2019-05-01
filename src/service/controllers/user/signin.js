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
                resolve(true);
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
            ctx.render('index.html', {
                title: 'home',
                code: 201,
                msg: '请输入用户名和密码'
            });
            return false;
        }

        await check(username, pass).then(
            res => {
                if (res) {
                    ctx.render('user.html', {
                        code: 200,
                        user: {
                            username: username
                        }
                    });
                } else {
                    ctx.render('index.html', {
                        title: 'home',
                        msg: '账号或密码错误'
                    });
                }
            },
            () => {
                ctx.render('index.html', {
                    title: 'home',
                    code: 203,
                    msg: '用户不存在'
                });
            }
        )
    }
};