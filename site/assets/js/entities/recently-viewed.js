MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {

    var RecentlyViewedItem = Backbone.Model.extend({
        default: {
            medicineId: 'default',
            brandName: 'default',
            link: ''
        },
        getId: function () {
            return this.get('medicineId');
        },
        getBrandName: function () {
            return this.get('brandName');
        },
        getLink: function () {
            return this.get('link');
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
                medicineId: item.getId()
            });
            if (model) {
                model.destroy();
            } else if (data.length == capacity)
                data.at(data.length - 1).destroy();
            model = new RecentlyViewedItem({
                medicineId: item.getId(),
                brandName: item.getBrandName(),
                link: 'show/' + item.getId()
            });
            data.unshift(model);
            model.save();
        }
    };

    MedicineManager.reqres.setHandler("recentlyViewed:entities", function () {
        return API.getRecentlyViewed();
    });

    MedicineManager.commands.setHandler("add:recentlyViewed", function (medicine) {
        API.addItem(medicine);
    });

});