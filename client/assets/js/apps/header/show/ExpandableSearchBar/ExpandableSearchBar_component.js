var Marionette = require('backbone.marionette');
var View = require('./ExpandableSearchBar_view.js');
var CommonViews = require('common');

module.exports = Marionette.Object.extend({
	initialize: function(options) {
		this.region = options.region;
		this.view = new View();
	},
	events: {
		'click button.btn': 'onSearchButtonClick'
	},
	onSearchButtonClick: function() {
		this.hideSearch();
	},
	show: function() {
		this.region.show(this.view);
		var input = new CommonViews.Typeahead({
			scale: 0.1
		});
		this.view.searchRegion.show(input);
		input.hide();

		this.view.on('search:click', function(event) {
			event.preventDefault();
			input.toggleVisibility();
		});

		this.view.on('suggestion:select', function(suggest) {
			this.trigger('suggestion:select', suggest);
		}.bind(this));
	},
	hideComponent: function() {
		this.view.$el.hide();
	},
	showComponent: function() {
		this.view.$el.show();
	},
	hideSearch: function() {
		this.searchRegion.currentView.hide();
	},
	showSearch: function() {
		this.searchRegion.currentView.show();
	}
});
