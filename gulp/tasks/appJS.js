var config = require('../config').appJS;
module.exports = function (gulp, plugins) {
    return function () {
        var env = plugins.gutil.env.env || 'development';
        var stream = plugins.browserify({
            entries: [config.src],
            cache: {},
            packageCache: {}
        });


        if (env === 'development') {
            stream.plugin(plugins.watchify, {
                ignoreWatch: [config.ignoreWatch]
            });
            stream.on('update', function () {
                console.log('update');
                bundle();
            });
        }

        function bundle() {
            config.vendors.forEach(function (vendor) {
                stream.external(vendor);
            });
            return stream
                .transform(plugins.underscorify)
                .bundle()
                .on('error', plugins.gutil.log)
                .pipe(plugins.plumber())
                .pipe(plugins.source(config.src))
                .pipe(plugins.buffer())
                .pipe(plugins.flatten())
                .pipe(plugins.uglify())
                .pipe(gulp.dest(config.dest));
        }

        return bundle();
    };
};