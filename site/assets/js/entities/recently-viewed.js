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
	
	var capacity = 5;
    var data = new Entities.RecentlyViewed();
	data.fetch();
	
    var API = {
        getRecentlyViewed: function () {
            return data;
        },
        addItem: function (item) {
			var model=data.findWhere({medicine: item});
			if(model){
				model.destroy();
			}
			else if (data.length == capacity)
				data.pop().destroy();
				model=new RecentlyViewedItem({
                medicine: item
            });
			data.unshift(model);
			model.save();
        }
    };

    MedicineManager.reqres.setHandler("recentlyViewed:entities", function () {
        return API.getRecentlyViewed();
    });

    MedicineManager.on("medicine:show", function (medicine) {
        API.addItem(medicine);
    });

});