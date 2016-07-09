var config = require('../config').clean;
module.exports = function (gulp, plugins) {
    return function () {
        return plugins.del([config.src]);
    };
};