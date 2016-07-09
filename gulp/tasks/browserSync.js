var config = require('../config').browserSync;

module.exports = function (gulp, plugins) {
    return function (cb) {
        return plugins.browserSync.init(config, cb);
    };
};