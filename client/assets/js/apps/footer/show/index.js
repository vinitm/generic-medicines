var Marionette = require('backbone.marionette');
var View = require('./show_view');
module.exports = Marionette.Object.extend({
	initialize: function(options) {
		this.view = new View();
		var self = this;
		this.view.on('link:about', function() {
			self.trigger('show:about');
		});
		this.region = options.region;
	},
	show: function() {
		this.region.show(this.view);
	}
});
