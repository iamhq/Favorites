const db = require('../db');
const mongoose = db.mongoose;

var siteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        default: '我的收藏',
    },
    desc: {
        type: String,
        default: '......',
    },
    url: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: '/assets/images/uploads/default.jpg'
    },
    f_id: {
        type: String,
        // default: '/assets/images/uploads/default.jpg'
    }

})
var SiteModel = mongoose.model('SiteModel', siteSchema);
// const site1 = new SiteModel({url: 'https://cn.mongoosedoc.top/docs/models.html'});
// site1.save(function (err, doc) {
//     console.log('save');
// });

module.exports = SiteModel;