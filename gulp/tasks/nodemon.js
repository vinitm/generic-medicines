var config = require('../config').nodemon;
module.exports = function (gulp, plugins) {
    return function (cb) {
        var started = false;

        return plugins.nodemon({
            script: config.src,
            watch: config.watch
        }).on('start', function () {
            //to avoid nodemon being started multiple times
            if (!started) {
                started = true;
            }
            cb();
        }).on('restart', function () {
            setTimeout(plugins.reload, 200);
        });
    };
};