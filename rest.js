module.exports = (prefix) => {
    var prefix = prefix || '/main/data-';//默认URL为'/main/data-'
    return async (ctx, next) => {
        if (ctx.request.path.startsWith(prefix)){
            ctx.render = (data) => {//如果请求路径为'/main/data-'，则给参数ctx添加render()方法，用于发送JSON格式的数据。
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            }
        }
        await next();
    };
}