let serverTimestamp = require('./');
const Koa = require('koa');
const app = new Koa();

//default
app.use(serverTimestamp());

//set header
app.use(serverTimestamp({header: 'Example-Server-Timestamp'}));

//set header and format
app.use(serverTimestamp({
    header: 'Example-Format-Server-Timestamp',
    format: (timestamp) => {
        let now = new Date(timestamp);
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();

        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    }
}));

// response
app.use(ctx => {
    /*
     Body results:
     {
        "x-server-timestamp": "1493344844811",
        "example-server-timestamp": "1493344844812",
        "example-format-server-timestamp": "2017-4-28 10:3:44",
     }
     */
    ctx.body = ctx.response.headers;
});

app.listen(3000);

console.log('listening on port 3000');