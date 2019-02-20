const db = require('../db');
const mongoose = db.mongoose;

var favoritesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        default: '默认收藏夹'
    },
    sites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SiteModel'
    }]

})

var favoritesModel = mongoose.model('FavoritesModel', favoritesSchema);

module.exports = favoritesModel;
