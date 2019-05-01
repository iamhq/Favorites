// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/runoob";

// function createDataBase() {
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     var dbase = db.db("runoob");
//   });
// }

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dbtest', { useNewUrlParser: true });
exports.mongoose = mongoose;