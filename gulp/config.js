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
var CLIENT_HTML_FOLDER = CLIENT_FOLDER;
var CLIENT_HTML = CLIENT_HTML_FOLDER + '/*.html';
var CLIENT_IMAGE = CLIENT_FOLDER + '/assets/images/*.*';


//build
var BUILD_FOLDER = './dist';
var BUILD_CSS_FOLDER = BUILD_FOLDER;
var BUILD_CSS = BUILD_CSS_FOLDER + '/**/*.css';
var BUILD_JS_FOLDER = BUILD_FOLDER;
var BUILD_JS = BUILD_JS_FOLDER + '/**/*.js';
var BUILD_HTML_FOLDER = BUILD_FOLDER;
var BUILD_HTML = BUILD_HTML_FOLDER + '/**/*.html';
var BUILD_IMAGE_FOLDER = BUILD_FOLDER;

var vendorFiles = ['jquery',
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
	'spin.js'
];

module.exports = {
	lint: {
		src: CLIENT_JS
	},
	clean: {
		src: BUILD_FOLDER
	},
	css: {
		src: CLIENT_SCSS,
		dest: BUILD_CSS_FOLDER
	},
	nodemon: {
		src: SERVER_MAIN_FILE,
		watch: [SERVER_FILES]
	},
	vendorJS: {
		dest: BUILD_JS_FOLDER,
		destFile: 'vendor.js',
		vendors: vendorFiles
	},
	appJS: {
		src: CLIENT_JS_FOLDER + '/main.js',
		dest: BUILD_JS_FOLDER,
		ignoreWatch: '**/**/*.tpl',
		vendors: vendorFiles
	},
	browserSync: {
		proxy: 'http://localhost:8000',
		port: 9000,
		browser: /^win/.test(process.platform) ? 'google chrome' : 'firefox'
	},
	image: {
		src: CLIENT_IMAGE,
		dest: BUILD_IMAGE_FOLDER
	},
	html: {
		src: CLIENT_HTML,
		dest: BUILD_HTML_FOLDER
	},
	watch: {
		buildCssFiles: BUILD_CSS,
		buildHtmlFiles: BUILD_HTML,
		buildJsFiles: BUILD_JS,
		clientHtmlFiles: CLIENT_HTML,
		clientScssFiles: CLIENT_SCSS_FOLDER + '/**/*.scss',
		clientTemplateFiles: CLIENT_FOLDER + '/**/*tpl'
	}
};
