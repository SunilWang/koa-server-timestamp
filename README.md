
# koa-server-timestamp

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

Create a middleware to add a server timestamp header in milliseconds. Use for Koa v1

## Note
This branch is use to [Koa v0.x & v1.x](https://github.com/koajs/koa/tree/v1.x).
To use  Koa v2.x, please check the [master](https://github.com/SunilWang/koa-server-timestamp/tree/master) branch.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install --save koa-server-timestamp@1
```

___The default koa-server-timestamp is for [koa v2.x](https://github.com/koajs/koa/tree/master)___
```
$ npm i --save koa-server-timestamp
```

## API

```js
let serverTimestamp = require('koa-server-timestamp');
```
### serverTimestamp([options])

Create a middleware that adds a `X-Server-Timestamp` header to responses. If
you don't want to use this module to automatically set a header, please
see the section about [`Options format`](#format)

#### Options

The `serverTimestamp` function accepts an optional `options` object that may
contain any of the following keys:

##### header

The name of the header to set, defaults to X-Server-Timestamp.

##### format

This is a function that formats timestamps.

## Examples

### default

```js
const serverTimestamp = require('./');
const koa = require('koa');
const app = koa();

app.use(serverTimestamp());

app.use(function *(next){
    yield next;
    /*
     Body results:

     {
        "x-server-timestamp": "1493344844811",
        "content-type": "application/json; charset=utf-8"
     }
     */
    this.body = this.response.header;
});

app.listen(3000);
```

### set header

```js
const serverTimestamp = require('./');
const koa = require('koa');
const app = koa();

app.use(serverTimestamp({header: 'Example-Server-Timestamp'}));

app.use(function *(next){
    yield next;
    /*
     Body results:

     {
        "example-server-timestamp": "1493344844812",
        "content-type": "application/json; charset=utf-8"
     }
     */
    this.body = this.response.header;
});

app.listen(3000);
```

### set header and format

```js
const serverTimestamp = require('./');
const koa = require('koa');
const app = koa();

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
app.use(function *(next){
    yield next;
    /*
     Body results:
     {
        "example-format-server-timestamp": "2017-4-28 10:3:44",
        "content-type": "application/json; charset=utf-8"
     }
     */
    this.body = this.response.header;
});
```

## Full Example
Check [this repo](https://github.com/SunilWang/koa-server-timestamp/blob/v1.x/example.js) for full example with `Koa v1`.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/koa-server-timestamp.svg
[npm-url]: https://www.npmjs.com/package/koa-server-timestamp
[downloads-image]: https://img.shields.io/npm/dt/koa-server-timestamp.svg
[downloads-url]: https://npmjs.org/package/koa-server-timestamp