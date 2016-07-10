var config = require('../config').css;
module.exports = function (gulp, plugins) {
    return function () {
        var production = plugins.gutil.env.production;
        return gulp.src(config.src)
            .pipe(plugins.print())
            .pipe((production ? plugins.sass({
                outputStyle: 'compressed'
            }) : plugins.sass()).on('error', plugins.sass.logError))
            .pipe(gulp.dest(config.dest));
    };
};