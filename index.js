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

function responseTime() {
    return function responseTime(ctx, next){
        return next().then(function () {
            ctx.set('X-Server-Timestamp', Date.now());
        });
    }
}