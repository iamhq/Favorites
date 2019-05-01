const model = require('./../../model');
const FavoritesModel = model.FavoritesModel;

function findALLFavorites() {
  return new Promise((resolve, reject) => {
    FavoritesModel.find((err, doc) => {
      if (err) {
        reject(err);
      }else {
        let data = {
            list: doc
        }
        resolve(data);
      }
    });
  });

}

module.exports = {
  'GET /f/findALLFavorites': async (ctx, next) => {

    await findALLFavorites().then(
      (data) => {
        ctx.body = {
          code: 200,
          data: data,
          msg: 'success'
        };
      },
      (err) => {
        ctx.body = {
          code: 201,
          msg: err
        };
      }
    );

  }
}