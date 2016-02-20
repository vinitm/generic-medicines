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
	
    var API = {
        getRecentlyViewed: function () {
            return data;
        },
        addItem: function (item) {
		data.fetch();
			var model=data.findWhere({medicine: item});
			if(model){
				model.destroy();
			}
			else if (data.length == capacity)
				data.at(data.length-1).destroy();
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

    MedicineManager.commands.setHandler("add:recentlyViewed", function (medicine) {
        API.addItem(medicine);
    });

});