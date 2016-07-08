//server
var SERVER_FOLDER = './server';
var SERVER_MAIN_FILE = SERVER_FOLDER + '/server.js';
var SERVER_FILES = SERVER_FOLDER + '/';



//client
var CLIENT_FOLDER = './client';
var CLIENT_SCSS_FOLDER = CLIENT_FOLDER + '/assets/scss';
var CLIENT_SCSS = CLIENT_SCSS_FOLDER + '/application.scss';
var CLIENT_JS_FOLDER = CLIENT_FOLDER + '/assets/js';
var CLIENT_JS = CLIENT_JS_FOLDER + '/**/*.js';
var CLIENT_HTML = CLIENT_FOLDER + '/*.html';
var CLIENT_IMAGE = CLIENT_FOLDER + '/assets/images/*.*';


//build
var BUILD_FOLDER = './dist';
var BUILD_CSS_FOLDER = BUILD_FOLDER;
var BUILD_JS_FOLDER = BUILD_FOLDER;
var BUILD_HTML_FOLDER = BUILD_FOLDER;
var BUILD_IMAGE_FOLDER = BUILD_FOLDER;

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    flatten = require('gulp-flatten'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    print = require('gulp-print'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    buffer = require('vinyl-buffer'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    underscorify = require('node-underscorify').transform({
        extensions: ['tpl']
    });

var env = gutil.env.env || 'development';

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

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon({
        script: SERVER_MAIN_FILE,
        watch: [SERVER_FILES]
    }).on('start', function () {
        //to avoid nodemon being started multiple times
        if (!started) {
            started = true;
        }
        cb();
    }).on('restart', reload);
});


gulp.task('browserSync', gulp.series('nodemon', function (cb) {
    var config = {
        proxy: 'http://localhost:8000',
        port: 9000
    };
    if (/^win/.test(process.platform)) {
        config.browser = 'google chrome';
    } else {
        config.browser = 'firefox';
    }
    return browserSync.init(config, cb);
}));



gulp.task('reload', function (done) {
    reload();
    done();
});


gulp.task('css', function () {
    return gulp.src(CLIENT_SCSS)
        .pipe(print())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest(BUILD_CSS_FOLDER));
});



gulp.task('vendor', function () {
    var stream = browserify({
        debug: false,
        require: vendors
    });

    return stream.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_JS_FOLDER));
});

gulp.task('app', function () {

    var stream = browserify({
        entries: [CLIENT_JS_FOLDER + '/main.js'],
        cache: {},
        packageCache: {}
    });
    stream.plugin(watchify, {
        ignoreWatch: ['**/**/*.tpl']
    });
    stream.on('update', function () {
        console.log('update');
        bundle();
    });


    function bundle() {
        vendors.forEach(function (vendor) {
            stream.external(vendor);
        });
        return stream
            .transform(underscorify)
            .bundle()
            .on('error', gutil.log)
            .pipe(plumber())
            .pipe(source(CLIENT_JS_FOLDER + '/main.js'))
            .pipe(buffer())
            .pipe(flatten())
            //.pipe(uglify())
            .pipe(gulp.dest(BUILD_JS_FOLDER));
    }

    return bundle();
});

gulp.task('browserify', gulp.series('vendor', 'app', function (done) {
    done();
}));


gulp.task('js', gulp.series('browserify', function (done) {
    done();
}));

gulp.task('image', function () {
    return gulp.src(CLIENT_IMAGE)
        .pipe(imagemin())
        .pipe(plumber({
            errorHandler: gutil.log
        }))
        .pipe(gulp.dest(BUILD_IMAGE_FOLDER));
});

gulp.task('html', function () {
    return gulp.src(CLIENT_HTML)
        /*.pipe(inlinesource({
            rootpath: path.resolve(BUILD_FOLDER)
        }))*/
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(BUILD_HTML_FOLDER));
});



gulp.task('clean', function () {
    return del([BUILD_FOLDER]);
});


gulp.task('build', gulp.series('clean', 'image', 'css', 'js', 'html', 'reload'));

gulp.task('watch', function (done) {
    gulp.watch([CLIENT_HTML], gulp.series('html'));
    gulp.watch([CLIENT_SCSS_FOLDER + '/**/*.scss'], gulp.series('css'));
    gulp.watch([CLIENT_FOLDER + '/**/*.tpl'], gulp.series('app'));
    gulp.watch([BUILD_JS_FOLDER + '/*.js'], gulp.series('html'));
    gulp.watch([BUILD_CSS_FOLDER + '/*.css'], gulp.series('html'));
    gulp.watch([BUILD_HTML_FOLDER + '/*.html'], gulp.series('reload'));
    done();
});


gulp.task('default', gulp.series('build', 'browserSync', 'watch', function (done) {
    done();
}));