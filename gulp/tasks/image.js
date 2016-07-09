var config = require('../config').image;

module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src(config.src)
            .pipe(plugins.imagemin())
            .pipe(plugins.plumber({
                errorHandler: plugins.gutil.log
            }))
            .pipe(gulp.dest(config.dest));
    };
};