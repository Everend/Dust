var fs = require('fs'),
    url = require('url');
function addFuns(router, dir) {
    var files = fs.readdirSync(`./${dir}`);
    var js = files.filter((result) => {
        return result.endsWith('.js');
    });
    var api = require(`./${dir}/${js[0]}`);
    addMapping(router, api);
}
function addMapping(router, api){//建立映射
    for(var url in api){
        if(url.startsWith('GET')){
            router.get(url.slice(3), api[url]);
        }else if(url.startsWith('POST')){
            router.post(url.slice(4), api[url]);
        }else if(url.startsWith('PUT')){
            router.put(url.slice(3), api[url]);
        }else if(url.startsWith('DELETE')){
            router.del(url.slice(6), api[url]); 
        }else{
            //...
        }
    }
}
module.exports = function(dir) {
    var dir = dir || 'funs',
        router = require('koa-router')();
    addFuns(router, dir);
    return router.routes();
};