let serverTimestamp = require('./');
let koa = require('koa');
let app = koa();

app.use(serverTimestamp());

app.use(function *(next){
    yield next;
    this.body = this.response.get('X-Server-Timestamp');
});

app.listen(3000);

console.log('listening on port 3000');