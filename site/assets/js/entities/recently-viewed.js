MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {

    var RecentlyViewedItem = Backbone.Model.extend({
        default: {
            medicine: null
        }
    });

    Entities.RecentlyViewed = Backbone.Collection.extend({
        model: RecentlyViewedItem,
        localStorage: new Backbone.LocalStorage("RecentlyViewed")
    });
	
	var capacity = 4;
    var data = new Entities.RecentlyViewed();

    var API = {
        getRecentlyViewed: function () {
            return data;
        },
        addItem: function (item) {
			var model=data.findWhere({medicine: item});
			if(model)
				data.remove(model);
			else if (data.length == capacity)
				data.pop();
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