let serverTimestamp = require('./');
let koa = require('koa');
let app = koa();

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

app.use(function *(next){
    yield next;
    /*
     Body results:

     {
        "x-server-timestamp": "1493344844811",
        "example-server-timestamp": "1493344844812",
        "example-format-server-timestamp": "2017-4-28 10:3:44",
        "content-type": "application/json; charset=utf-8"
     }
     */
    this.body = this.response.header;
});

app.listen(3000);

console.log('listening on port 3000');