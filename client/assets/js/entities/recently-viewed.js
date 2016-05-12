var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");
var Marionette = require('backbone.marionette');
var Mutators = require('Backbone.Mutators');
var medicineChannel = require('backbone.radio').channel('medicine');


var RecentlyViewedItem = Backbone.Model.extend({
    mutators: {
        url: function () {
            return '#medicines/show/' + encodeURI(this.get('medicine'));
        }
    },
    default: {
        medicine: null,
    }
});

var RecentlyViewed = Backbone.Collection.extend({
    model: RecentlyViewedItem,
    localStorage: new Backbone.LocalStorage("RecentlyViewed")
});

var capacity = 5;
var data = new RecentlyViewed();

module.exports = Marionette.Object.extend({
    initialize: function () {
        var self = this;
        medicineChannel.reply("recentlyViewed", function () {
            return self.getRecentlyViewed();
        });
        medicineChannel.reply("add:recentlyViewed", function (medicine) {
            self.addItem(medicine);
        });
    },
    getRecentlyViewed: function () {
        return data;
    },
    addItem: function (item) {
        data.fetch();
        var model = data.findWhere({
            medicine: item
        });
        if (model) {
            model.destroy();
        } else if (data.length == capacity)
            data.at(data.length - 1).destroy();
        model = new RecentlyViewedItem({
            medicine: item
        });
        data.unshift(model);
        model.save();
    }
});