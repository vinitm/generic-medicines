//server
var SERVER_FOLDER = './server';
var SERVER_MAIN_FILE = SERVER_FOLDER + '/server.js';
var SERVER_FILES = SERVER_FOLDER + '/';



//client
var CLIENT_FOLDER = './client';
var CLIENT_SCSS = CLIENT_FOLDER + '/assets/css/**/*.scss';
var CLIENT_JS = CLIENT_FOLDER + '/assets/js/**/*.js';
var CLIENT_JS_VENDOR = CLIENT_FOLDER + '/assets/js/vendor/**/*.js';
var CLIENT_HTML = CLIENT_FOLDER + '/*.html';


//build
var BUILD_FOLDER = './public';
var BUILD_CSS_FOLDER = BUILD_FOLDER + '/assets/css';
var BUILD_JS_FOLDER = BUILD_FOLDER + '/assets/js';
var BUILD_HTML_FOLDER = BUILD_FOLDER;

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cache = require('gulp-cached'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    ignore = require('gulp-ignore'),
    print = require('gulp-print'),
    stream = require('event-stream'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream');


gulp.task('browserSync', ['nodemon'], function () {
    console.log('browserSync called');
    browserSync.init({
        proxy: 'http://localhost:8000',
        browser: 'google chrome',
        port: 9000
    })
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

gulp.task('my_js', function () {
    var fileOrder = ["*.js",
                     "entities/*.js",
                     "common/*.js",
                     "apps/medicines/search/*.js",
                     "apps/medicines/show/**/*.js",
                     "apps/medicines/*js",
                     ];
    var vendorFiles = "vendor/**/*.js";
    return gulp.src(CLIENT_JS)
        .pipe(order(fileOrder))
        .pipe(ignore.exclude(vendorFiles))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_JS_FOLDER));
});

gulp.task('vendor_js', function () {
    var fileOrder = ["jquery.js",
    "underscore.js",
     "backbone.js",
     "backbone.localStorage.js",
     "backbone.wreqr.js",
     "backbone.babysitter.js",
     "backbone.marionette.js",
     "bootstrap.min.js",
     'jquery.dataTables.min.js',
     'dataTables.bootstrap.min.js',
     'Chart.min.js',
     'typeahead.js'];
    return gulp.src(CLIENT_JS_VENDOR)
        .pipe(order(fileOrder))
        .pipe(print())
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_JS_FOLDER))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', ['my_js', 'vendor_js'], function () {
    console.log('js called');
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


gulp.task('build', ['sass', 'js', 'html']);

gulp.task('watch', function () {
    gulp.watch([CLIENT_SCSS, CLIENT_JS, CLIENT_HTML], ['build']);
});

gulp.task('default', ['build', 'browserSync', 'watch']);