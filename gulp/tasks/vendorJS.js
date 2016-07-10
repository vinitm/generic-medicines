var config = require('../config').vendorJS;

module.exports = function (gulp, plugins) {
    return function () {
          var production = plugins.gutil.env.production;
        var stream = plugins.browserify({
            debug: false,
            require: config.vendors
        });

        return stream.bundle()
            .pipe(plugins.source(config.destFile))
            .pipe(plugins.buffer())
            .pipe(production ? plugins.uglify() : plugins.gutil.noop())
            .pipe(gulp.dest(config.dest));
    };
};