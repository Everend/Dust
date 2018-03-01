var Koa = require('koa'),
    app = new Koa(),
    fun = require('./fun'),
    rest = require('./rest');
    bodyParser = require('koa-bodyparser'),
    isProduction = (process.env.NODE_ENV === 'production');
if (!isProduction) {
    var load = require('./load');
    app.use(load('/extra/'));
}
app.use(bodyParser());
app.use(rest());
app.use(fun());
app.listen(3000);
console.log('STRAT');