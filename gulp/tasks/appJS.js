var config = require('../config').appJS;
module.exports = function(gulp, plugins) {
	return function() {
		var production = plugins.gutil.env.production;
		var stream = plugins.browserify({
			entries: [config.src],
			cache: {},
			packageCache: {}
		});


		if (!production) {
			stream.plugin(plugins.watchify, {
				ignoreWatch: [config.ignoreWatch]
			});
		}

		stream.on('update', function() {
			console.log('update');
			gulp.series('lint')();
			bundle();
		});

		function bundle() {
			config.vendors.forEach(function(vendor) {
				stream.external(vendor);
			});
			return stream
				.transform(plugins.underscorify)
				.bundle()
				.on('error', plugins.gutil.log)
				.pipe(plugins.plumber())
				.pipe(plugins.source(config.src))
				.pipe(plugins.buffer())
				.pipe(plugins.flatten())
				.pipe(plugins.uglify())
				.pipe(gulp.dest(config.dest));
		}

		return bundle();
	};
};
