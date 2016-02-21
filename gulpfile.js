//server
var SERVER_FOLDER = './server';
var SERVER_MAIN_FILE = SERVER_FOLDER + '/server.js';
var SERVER_FILES = SERVER_FOLDER + '/';



//client
var CLIENT_FOLDER = './client';
var CLIENT_SCSS = CLIENT_FOLDER + '/assets/css/**/*.scss';
var CLIENT_JS = CLIENT_FOLDER + '/assets/js/**/*.js';
var CLIENT_HTML = CLIENT_FOLDER + '/*.html';


//build
var BUILD_FOLDER = './public';
var BUILD_CSS_FOLDER = BUILD_FOLDER + '/assets/css';
var BUILD_JS_FOLDER = BUILD_FOLDER + '/assets/js';
var BUILD_HTML_FOLDER = BUILD_FOLDER;

var gulp = require('gulp');
var sass = require('gulp-sass');
var cache = require('gulp-cached');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');


gulp.task('browserSync', ['nodemon'], function () {
    console.log('browserSync called');
    browserSync.init({
        proxy: 'http://localhost:8000',
        browser: 'google chrome',
        port: 9000
    })
});


gulp.task('sass', function () {
    console.log('sass called');
    return gulp.src(CLIENT_SCSS)
        .pipe(cache()) //only pass changed files
        .pipe(sass())
        .pipe(gulp.dest(BUILD_CSS_FOLDER))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js', function () {
    console.log('js called');
    return gulp.src(CLIENT_JS)
        .pipe(cache()) //only pass changed files
        .pipe(gulp.dest(BUILD_JS_FOLDER))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function () {
    console.log('html called');
    return gulp.src(CLIENT_HTML)
        .pipe(cache()) //only pass changed files
        .pipe(gulp.dest(BUILD_HTML_FOLDER))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('nodemon', function (cb) {
    console.log('nodemon called');
    var started = false;

    return nodemon({
        script: SERVER_MAIN_FILE,
        watch: [SERVER_FILES]
    }).on('start', function () {
        //to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', reload);
});

gulp.task('build', ['sass', 'js', 'html']);

gulp.task('watch', function () {
    gulp.watch([CLIENT_SCSS, CLIENT_JS, CLIENT_HTML], ['build']);
});

gulp.task('default', ['build', 'browserSync', 'watch']);