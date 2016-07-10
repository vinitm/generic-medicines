var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: ['*'],
        scope: ['devDependencies'],
        rename: {
            'gulp-util': 'gutil',
            'gulp-flatten': 'flatten',
            'gulp-uglify': 'uglify',
            'gulp-cssnano': 'minifyCss',
            'gulp-concat': 'concat',
            'gulp-order': 'order',
            'gulp-print': 'print',
            'gulp-htmlmin': 'htmlmin',
            'browser-sync': 'browserSync',
            'browserify': 'browserify',
            'watchify': 'watchify',
            'vinyl-source-stream': 'source',
            'vinyl-buffer': 'buffer',
            'gulp-imagemin': 'imagemin',
            'gulp-plumber': 'plumber',
            'gulp-sass': 'sass',
            'node-underscorify': 'underscorify'
        }
    });

plugins.browserSync = plugins.browserSync.create();
plugins.reload = plugins.browserSync.reload;
plugins.underscorify = plugins.underscorify.transform({
    extensions: ['tpl']
});

function getTask(task) {
    return require('./gulp/tasks/' + task)(gulp, plugins);
}

gulp.task('nodemon', getTask('nodemon'));


gulp.task('browserSync', gulp.series('nodemon', getTask('browserSync')));


gulp.task('reload', getTask('reload'));

gulp.task('clean', getTask('clean'));

gulp.task('css', getTask('css'));

gulp.task('vendorJS', getTask('vendorJS'));

gulp.task('appJS', getTask('appJS'));

gulp.task('js', gulp.series('vendorJS', 'appJS', function (done) {
    done();
}));

gulp.task('image', getTask('image'));

gulp.task('html', getTask('html'));

gulp.task('build', gulp.series('clean', 'image', 'css', 'js', 'html'));

gulp.task('watch', getTask('watch'));

gulp.task('default', gulp.series('build', 'browserSync', 'watch', function (done) {
    done();
}));