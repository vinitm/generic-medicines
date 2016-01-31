MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {

    var capacity = 4;
    var data = [];

    var RecentlyViewedItem = Backbone.Model.extend({
        default: {
            medicine: null
        }
    });

    Entities.RecentlyViewed = Backbone.Collection.extend({
        sizeLimit: 4,
        model: RecentlyViewedItem,
        add: function (items, options) {
            if(this.sizeLimit<)
            Backbone.Collection.prototype.add.call(items, options);
        },
        localStorage: new Backbone.LocalStorage("RecentlyViewed")
    });

    var API = {
        getRecentlyViewed: function () {
            return new Entities.RecentlyViewed(data);
        },
        addItem: function (item) {
            if (data.length == capacity)
                data.po
            data.unshift(new RecentlyViewedItem({
                medicine: item
            }));
        }
    };

    MedicineManager.reqres.setHandler("recentlyViewed:entities", function () {
        return API.getRecentlyViewed();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        API.addItem(medicine);
    });

});