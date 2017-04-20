let serverTimestamp = require('./');
let koa = require('koa');
let app = koa();

app.use(serverTimestamp());

app.use(function (ctx, next){
    return next().then(function () {
        ctx.body = ctx.response.get('X-Server-Timestamp');;
    });
});

app.listen(3000);

console.log('listening on port 3000');