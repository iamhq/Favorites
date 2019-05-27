// 处理图片上传
const path = require('path')
const fs = require('fs');
module.exports = {
    'POST /upload.json': async (ctx) => {
        const file = ctx.request.files.file;	// 获取上传文件
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const ext = file.name.split('.').pop();		// 获取上传文件扩展名
        let avatar = `/assets/images/uploads/${Math.random().toString()}.${ext}`;
        let uploadPath = path.resolve(__dirname, `../..${avatar}`);
        console.log('uploadPath',uploadPath)
        const upStream = fs.createWriteStream(uploadPath);		// 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
        return ctx.body = {
            msg: '上传成功',
            avatar: avatar
        };
    }
}