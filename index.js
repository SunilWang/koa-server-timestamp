/**
 * Expose `serverTimestamp()`.
 */

module.exports = serverTimestamp;

/**
 * Add X-Server-Timestamp header field.
 *
 * @return {Function}
 * @api public
 */

function serverTimestamp() {
    return function * serverTimestamp(next){
        this.set('X-Server-Timestamp', Date.now());
        yield next;
    };
}