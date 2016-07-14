var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var Marionette = require('backbone.marionette');
var Mutators = require('Backbone.Mutators');// eslint-disable-line
var medicineChannel = require('backbone.radio').channel('medicine');


var RecentlyViewedItem = Backbone.Model.extend({
	mutators: {
		url: function() {
			return '#medicines/show/' + encodeURI(this.get('medicine'));
		}
	},
	default: {
		medicine: null
	}
});


var RecentlyViewed = Backbone.Collection.extend({
	model: RecentlyViewedItem,
	localStorage: new Backbone.LocalStorage('RecentlyViewed'),
	comparator: function(one, two) {
		return one.get('time') <= two.get('time');
	}
});

var capacity = 5;
var collection = new RecentlyViewed();

module.exports = Marionette.Object.extend({
	initialize: function() {
		var self = this;
		medicineChannel.reply('recentlyViewed', function() {
			return self.getRecentlyViewed();
		});
		medicineChannel.reply('add:recentlyViewed', function(medicine) {
			self.addItem(medicine);
		});
	},
	getRecentlyViewed: function() {
		return collection;
	},
	addItem: function(item) {
		collection.fetch();
		var model = collection.findWhere({
			medicine: item
		});
		if (model) {
			model.destroy();
		} else if (collection.length == capacity)
			collection.at(collection.length - 1).destroy();
		model = new RecentlyViewedItem({
			medicine: item,
			time: new Date().getTime()
		});
		collection.unshift(model);
		model.save();
	}
});
