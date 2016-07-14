var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var cache = require('../helpers/cache')(15);
var medicineChannel = require('backbone.radio').channel('medicine');



var Detail = Backbone.Model.extend({
	fetch: function(options) {
		options = options || {};
		var success = options.success;
		var value = cache.get(this.url);
		if (value !== undefined) {
			this.set(this.parse(value, options), options);
			if (success)
				success(this, value, options);

			// Returns deferred as the original fetch
			return Promise.resolve(value);// eslint-disable-line
		}


		return Backbone.Model.prototype.fetch.apply(this, options)
			.then(function(result) {
				cache.add(this.url, result);
				return result;
			});
	}
});
module.exports = Marionette.Object.extend({
	initialize: function() {
		var self = this;
		medicineChannel.reply('details', function(medicine) {
			return self.getDetail(medicine);
		});
	},
	getDetail: function(medicine) {
		var detail = new Detail();
		detail.url = '/medicine_details/?id=' + encodeURIComponent(medicine);
		return detail.fetch().then(function() {
			return detail;
		});
	}
});
