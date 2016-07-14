var Marionette = require('backbone.marionette');
var Show = require('./show');
module.exports = Marionette.Object.extend({
	initialize: function(options) {
		this.showController = new Show(options);
		this.showHeader();
		this.listenTo(this.showController, 'brand:clicked', function() {
			this.trigger('brand:clicked');
		});
		this.listenTo(this.showController, 'suggestion:select', function(suggestion) {
			this.trigger('suggestion:select', suggestion.get('suggestion'));
		});
	},
	setSearchVisibility: function(visible) {
		this.showController.setSearchVisible(visible);
	},
	showHeader: function() {
		this.showController.show();
	}
});
