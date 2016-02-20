var SERVER_PATH = 'applications/server';
var SERVER_FILE_PATH = SERVER_PATH + '/server.js';
var CLIENT_PATH = 'applications/client';
var CSS_PATH = CLIENT_PATH + '/assets/css/**/*.scss';
var BUILD_CSS_PATH = 'public_html/css/**/*.css';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');


gulp.task('browserSync', ['sass', 'nodemon'], function () {
    console.log('browserSync called');
    browserSync.init({
        proxy: 'http://localhost:8000',
        files: [BUILD_CSS_PATH],
        browser: 'google chrome',
        port: 9000
    })
});


gulp.task('sass', function () {
    console.log('sass called');
    return gulp.src(CSS_PATH) // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('public_html/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('nodemon', function (cb) {
    console.log('nodemon called');
    var started = false;

    return nodemon({
        script: SERVER_FILE_PATH,
        watch: [SERVER_PATH + '/**/*.*'],
        ext: 'js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(CSS_PATH, ['sass']);
    // Other watchers
});

gulp.task('default', ['sass', 'browserSync','watch'], function () {
    //gulp.watch(['public/*.html'], reload);
});