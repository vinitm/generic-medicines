var config = require('../config').html;

module.exports = function (gulp, plugins) {
    return function () {
        var production = plugins.gutil.env.production;
        return gulp.src(config.src)
            /*.pipe(inlinesource({
                rootpath: path.resolve(BUILD_FOLDER)
            }))*/
            .pipe(production ? plugins.htmlmin({collapseWhitespace: true}) : plugins.gutil.noop())
            .pipe(gulp.dest(config.dest));
    };
};