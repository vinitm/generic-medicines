var config = require('../config').watch;

module.exports = function (gulp, plugins) {
    return function (done) {
        gulp.watch([config.clientHtmlFiles], gulp.series('html'));
        gulp.watch([config.clientScssFiles], gulp.series('css'));
        gulp.watch([config.clientTemplateFiles], gulp.series('appJS'));
        gulp.watch([config.buildJsFiles], gulp.series('html'));
        gulp.watch([config.buildCssFiles], gulp.series('html'));
        gulp.watch([config.buildHtmlFiles], gulp.series('reload'));
        done();
    };
};