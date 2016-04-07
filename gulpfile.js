//server
var SERVER_FOLDER = './server';
var SERVER_MAIN_FILE = SERVER_FOLDER + '/server.js';
var SERVER_FILES = SERVER_FOLDER + '/';



//client
var CLIENT_FOLDER = './client';
var CLIENT_CSS = CLIENT_FOLDER + '/assets/css/**/*.css';
var CLIENT_JS_FOLDER = CLIENT_FOLDER + '/assets/js';
var CLIENT_JS = CLIENT_JS_FOLDER + '/**/*.js';
var CLIENT_HTML = CLIENT_FOLDER + '/*.html';
var CLIENT_IMAGE = CLIENT_FOLDER + '/assets/images/*.*';


//build
var BUILD_FOLDER = './public';
var BUILD_CSS_FOLDER = BUILD_FOLDER;
var BUILD_JS_FOLDER = BUILD_FOLDER;
var BUILD_HTML_FOLDER = BUILD_FOLDER;
var BUILD_IMAGE_FOLDER = BUILD_FOLDER;

var gulp = require('gulp'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-cssnano'),
    cache = require('gulp-cached'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    order = require('gulp-order'),
    print = require('gulp-print'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    buffer = require('vinyl-buffer'),
    inlinesource = require('gulp-inline-source'),
    imagemin = require('gulp-imagemin'),
    underscorify = require('node-underscorify').transform({
        extensions: ['tpl']
    });

var vendors = ['jquery',
               'underscore',
               'backbone',
               'backbone.localstorage',
               'backbone.select',
               'backbone.marionette',
               'bootstrap',
               'chart.js',
               'datatables.net',
               'datatables.net-responsive',
               'datatables.net-bs',
               'typeahead.js-browserify',
               'spin.js'];

gulp.task('browserSync', ['nodemon'], function () {
    console.log('browserSync called');
    browserSync.init({
        proxy: 'http://localhost:8000',
        browser: 'google chrome',
        port: 9000
    });
});

gulp.task('nodemon', function (cb) {
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


gulp.task('css', function () {
    var fileOrder = [
        "dataTables.bootstrap.min.css",
        "loader.css",
        "autocomplete.css",
        "application.css"
    ];
    return gulp.src(CLIENT_CSS)
        .pipe(order(fileOrder))
        //.pipe(cache()) //only pass changed files
        .pipe(print())
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(BUILD_CSS_FOLDER));
});



gulp.task('vendor', function () {
    var stream = browserify({
        debug: false,
        require: vendors
    });

    stream.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_JS_FOLDER));

    return stream;
});

gulp.task('app', function () {

    var stream = browserify({
        entries: [CLIENT_JS_FOLDER + '/main.js'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    });
    stream.on('update', bundle);
    bundle();

    function bundle() {
        vendors.forEach(function (vendor) {
            stream.external(vendor);
        });
        stream
            .transform(underscorify)
            .bundle()
            .pipe(source(CLIENT_JS_FOLDER + '/main.js'))
            .pipe(buffer())
            .pipe(flatten())
            .pipe(uglify())
            .pipe(gulp.dest(BUILD_JS_FOLDER));
    }
});

gulp.task('browserify', ['vendor', 'app']);


gulp.task('js', ['browserify'], function () {
});

gulp.task('image', function () {
    gulp.src(CLIENT_IMAGE)
        .pipe(imagemin())
        .pipe(gulp.dest(BUILD_IMAGE_FOLDER));
});

gulp.task('html', function () {
    return gulp.src(CLIENT_HTML)
        .pipe(cache()) //only pass changed files
        .pipe(gulp.dest(BUILD_HTML_FOLDER))
        .pipe(inlinesource())
     .pipe(print())
        .pipe(gulp.dest(BUILD_HTML_FOLDER));
});


gulp.task('build', ['clean', 'image', 'css', 'js', 'html'], function () {
    reload();
});


gulp.task('clean', function () {
    if (!/^win/.test(process.platform)) {
        return del(['public/**/*.*']); //doesn't work on windows
    }
});


gulp.task('watch', function () {
    gulp.watch([CLIENT_CSS, CLIENT_JS, CLIENT_HTML], ['build']);
});

gulp.task('default', ['build', 'browserSync', 'watch']);