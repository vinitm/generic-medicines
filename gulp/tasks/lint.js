var config = require('../config').lint;
module.exports = function(gulp, plugins) {
	return function() {
		//var production = plugins.gutil.env.production;
		return gulp.src(config.src)
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.eslint.failOnError());
	};
};
