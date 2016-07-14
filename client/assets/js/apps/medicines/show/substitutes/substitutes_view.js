var Marionette = require('backbone.marionette');
var $ = require('jquery');
require('bootstrap');
require('datatables.net-responsive')();
require('datatables.net-bs')(window, $);

var Table = Marionette.ItemView.extend({
	template: false,
	className: 'table table-striped table-bordered dt-responsive',
	tagName: 'table',
	id: 'substituteTable',
	events: {
		'click .show': 'linkClicked'
	},
	linkClicked: function(e) {
		e.preventDefault();
		e.stopPropagation();
		var text = $(e.currentTarget).text();
		this.triggerMethod('link:click', text);
	},
	attributes: function() {
		return {
			width: '100%'
		};
	},
	onShow: function() {
		this.$el.DataTable({
			responsive: true,
			data: this.collection.toJSON(),
			columns: [{
				data: 'brand',
				render: function(data) {
					return '<a class="show" href="#medicines/show/"' + encodeURI(data) + '>' + data + '</a>';
				},
				title: 'Brand'
			}, {
				data: 'package_qty',
				title: 'Pack'
			}, {
				data: 'package_price',
				title: 'Price',
				render: function(data) {
					var template = require('./price-column_template.tpl');
					return template({
						price: data
					});
				}.bind(this)
			}, {
				title: 'Cheaper/Costlier',
				data: 'cheaperOrCostlierPercentage',
				render: function(data) {
					var template = require('./cheaper-costlier-column_template.tpl');
					return template({
						difference: data
					});
				}.bind(this)
			}]
		});
	}
});

module.exports = Marionette.LayoutView.extend({
	template: require('./layout_template.tpl'),
	tagName: 'div',
	id: 'cheapest_substitute',
	regions: {
		'tableRegion': '#table-region'
	},
	childEvents: {
		'link:click': 'onChildLinkClick'
	},
	onChildLinkClick: function(view, text) {
		this.trigger('link:click', text);
	},
	initialize: function(options) {
		this.collection = options.collection;
	},
	onShow: function() {
		var tableView = new Table({
			collection: this.collection
		});
		this.tableRegion.show(tableView);
	}
});
