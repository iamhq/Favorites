const db = require('./../db');

const mongoose = db.mongoose;

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    follow: {
        type: Array,
        default: []
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FavoritesModel'
    }]
})

var UserModel = mongoose.model('UserModel', userSchema);



module.exports = UserModel;