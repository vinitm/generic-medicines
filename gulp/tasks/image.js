var config = require('../config').image;

module.exports = function (gulp, plugins) {
    return function () {
        var production = plugins.gutil.env.production;
        return gulp.src(config.src)
            .pipe(plugins.imagemin())
            .pipe(production ?  plugins.plumber({errorHandler: plugins.gutil.log}) : plugins.gutil.noop())
            .pipe(gulp.dest(config.dest));
    };
};