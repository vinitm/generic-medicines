var config = require('../config').html;

module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src(config.src)
            /*.pipe(inlinesource({
                rootpath: path.resolve(BUILD_FOLDER)
            }))*/
            .pipe(plugins.htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(config.dest));
    };
};