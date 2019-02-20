
function getPageBySkip (index, pageSize, Model, preID) {
    // if (!preID || index == 1) {
    //     Model.find().limit(pageSize).exec((err, docs) => {
    //         console.log('doc: '+docs)
    //     });
    //     return
    // }

    // Model.find({_id: {$lt: preID}}).limit(pageSize).exec((err, docs) => {
    //     console.log('doc: '+docs);
    // });
    // let start = (index - 1) * pageSize;
    // Model.find().skip(start).limit(pageSize).exec((err, docs) => {
    //     console.log('doc: '+docs)
    // });
}

var global = {
    getPageBySkip: getPageBySkip
}

module.exports = global;
