var mzfs = require('mz/fs'),
    mime = require('mime'),
    path = require('path');
function load(dir){
    return async (ctx, next) => {
        var requestPath = ctx.request.path;// '/extra/js/xx.js'
        if(requestPath.startsWith(dir)){// '/extra/'
            var fullPath = path.join(__dirname, requestPath);// 'D:\...\extra\js\xx.js'
            if(await mzfs.exists(fullPath)){
                ctx.response.type = mime.getType(requestPath);
                ctx.response.body = await mzfs.readFile(fullPath);
            }
        }else{
            await next();
        }
    };
}
module.exports = load;