var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var commonViews = require('common');
var View = require('./substitutes_view.js');
var Mutators = require('Backbone.Mutators');// eslint-disable-line

module.exports = Marionette.Object.extend({
	initialize: function(options) {
		this.region = options.region;
		this._generateCollection(options.model);
	},
	_generateCollection: function(model) {
		var Model = Backbone.Model.extend({
			mutators: {
				url: function() {
					return '#medicines/show/' + encodeURI(this.get('brand'));
				},
				cheaperOrCostlierPercentage: function() {
					var referenceUnitPrice = model.get('medicine')['unit_price'];
					var unitPrice = this.get('unit_price');
					var differencePercentage = (100 * (1 - (unitPrice / referenceUnitPrice))).toFixed(2);
					return differencePercentage;
				}
			},
			parse: function(response) {
				return response.medicine;
			}
		});

		var Collection = Backbone.Collection.extend({
			model: Model
		});

		this.collection = new Collection(model.get('alternatives'), {
			parse: true
		});
	},
	show: function() {
		if (this.collection.length === 0) {
			this.view = new commonViews.EmptyView({
				message: 'No substitutes found'
			});
		} else {
			this.view = new View({
				collection: this.collection
			});
			var self = this;
			this.view.on('link:click', function(suggestion) {
				self.trigger('link:click', suggestion);
			});
		}
		this.region.show(this.view);
	}
});
