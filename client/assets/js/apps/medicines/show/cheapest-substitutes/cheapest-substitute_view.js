var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views = require('common');
var CheapestSubstitutesItem = Marionette.ItemView.extend({
	tagName: 'li',
	template: require('./listItem_template.tpl'),
	initialize: function(model) {
		var Model = Backbone.Model.extend({
			mutators: {
				url: function() {
					return '#medicines/show/' + encodeURI(this.get('brand'));
				}
			},
			parse: function(response) {
				return response.model.get('medicine');
			}
		});
		this.model = new Model(model, {
			parse: true
		});
	},
	events: {
		'click a': 'linkClicked'
	},
	linkClicked: function(e) {
		e.preventDefault();
		this.trigger('link:clicked');
	}
});

var CheapestSubstitutesList = Marionette.CollectionView.extend({
	tagName: 'ul',
	className: 'material-list',
	childView: CheapestSubstitutesItem,
	onChildviewLinkClicked: function(childView) {
		this.triggerMethod('brand:clicked', childView.model.get('brand'));
	}
});

var ChartLayout = Marionette.LayoutView.extend({
	template: require('./chart_template.tpl'),
	regions: {
		'chartRegion': '#chart-region'
	},
	initialize: function(options) {
		this.model = options.model;
	},
	onShow: function() {
		var chartView = new Views.Chart({
			set: this.model.get('medicine').unit_price,
			subset: this.model.get('medicine').unit_price - this.model.get('cheapestAlternatives')[0].medicine.unit_price
		});
		this.chartRegion.show(chartView);
	}
});

module.exports = Marionette.LayoutView.extend({
	template: require('./layout_template.tpl'),
	tagName: 'div',
	id: 'cheapest_substitute',
	regions: {
		'chartRegion': '#chart-region',
		'listRegion': '#substitutes-list-region'
	},
	initialize: function(options) {
		this.model = options.model;
	},
	childEvents: {
		'brand:clicked': 'onChildBrandClicked'
	},
	onChildBrandClicked: function(childView, brand) {
		this.trigger('link:click', brand);
	},
	onShow: function() {

		var chartView = new ChartLayout({
			model: this.model
		});
		this.chartRegion.show(chartView);

		var listView = new CheapestSubstitutesList({
			collection: new Backbone.Collection(this.model.get('cheapestAlternatives'))
		});
		this.listRegion.show(listView);
	}
});
