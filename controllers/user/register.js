/**
 * 注册用户
 */
// const userModel = require('./../models/UserModel')
const mongoose = require('mongoose');
const model = require('../../model');
const UserModel = model.UserModel;
const FavoritesModel = model.FavoritesModel;

var f = new FavoritesModel({
    _id: new mongoose.Types.ObjectId(),
});


function insertUser(user) {
    return new Promise((resolve, reject) => {
        f.save(function (err, doc) {
            user.favorites = [f];
            user.save(function (err, doc) {
                if (err) {
                    console.log('err ' + err);
                    reject(err);
                } else {
                    UserModel.
                    findOne({
                        username: user.username
                    }).
                    populate('favorites').
                    exec(function (err, doc) {
                        if (err) return handleError(err);
                    });
                    resolve();
                }
            })
        });
    });

}

module.exports = {
    'POST /register': async (ctx, next) => {
        let name = ctx.request.body.username || '';
        let pass = ctx.request.body.password || '';
        let nickname = ctx.request.body.nickname || '';

        if (name === '' || pass === '' || nickname === '') {
            ctx.render('index.html', {
                title: 'home',
                code: 201,
                msg: '用户信息不能为空'
            });
            return false;
        }

        let user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: name,
            password: pass,
            nickname: nickname,
            sites: '11'
        })

        await insertUser(user).then(
            (data) => {
                ctx.body = {
                    code: 200,
                    msg: '注册成功'
                }
            },
            (err) => {
                ctx.body = {
                    code: 201,
                    // msg: '注册失败，请重新注册',
                    msg: '注册失败，请重新注册' + err
                }
            }
        )
    }
};

// UserModel.update({ username: 'user12' }, { $set: { favorites: [f, f2] }}, function() {
//   UserModel.findOne({username: 'user12'}).populate('favorites').exec(function (err, docs) {
//     console.log(docs);
//     resolve();

//   });
// });