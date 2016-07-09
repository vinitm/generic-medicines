var config = require('../config').css;
module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src(config.src)
            .pipe(plugins.print())
            .pipe(plugins.sass({
                outputStyle: 'compressed'
            }).on('error', plugins.sass.logError))
            .pipe(gulp.dest(config.dest));
    };
};