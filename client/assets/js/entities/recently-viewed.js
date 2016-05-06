var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Mutators = require('Backbone.Mutators');
var medicineChannel = require('backbone.radio').channel('medicine');

Backbone.LocalStorage = require("backbone.localstorage");
MedicineManager.module("Entities", function (Entities) {
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

    Entities.RecentlyViewed = Backbone.Collection.extend({
        model: RecentlyViewedItem,
        localStorage: new Backbone.LocalStorage("RecentlyViewed")
    });

    var capacity = 5;
    var data = new Entities.RecentlyViewed();

    var API = {
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
    };

    medicineChannel.reply("recentlyViewed", function () {
        return API.getRecentlyViewed();
    });

    medicineChannel.reply("add:recentlyViewed", function (medicine) {
        API.addItem(medicine);
    });

});