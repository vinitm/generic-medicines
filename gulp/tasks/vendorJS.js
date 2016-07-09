var config = require('../config').vendorJS;

module.exports = function (gulp, plugins) {
    return function () {
        var stream = plugins.browserify({
            debug: false,
            require: config.vendors
        });

        return stream.bundle()
            .pipe(plugins.source(config.destFile))
            .pipe(plugins.buffer())
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.dest));
    };
};