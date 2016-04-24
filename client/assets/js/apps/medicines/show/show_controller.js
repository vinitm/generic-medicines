var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.Controller = {
        showMedicine: function (medicine) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);

            var detailsFetched = MedicineManager.request("details:entities", medicine);
            var recentlyViewed = MedicineManager.request("recentlyViewed:entities");

            //show loading view while the information is loaded
            showLayout.regionManager.each(function (region) {
                var loadingView = new Show.Loader({width:20});
                region.show(loadingView);
            });

            detailsFetched.then(function (details) {
                if (!$.contains(document, showLayout.$el[0])) {
                    //if layout is detached
                    return;
                }

                var medicineDetails=new Backbone.Model(details.get('details'));
                var medicineSubstitutes=new MedicineManager.Entities.SubtituteCollection(details.get('alternatives'));
                //recently viewed
                var recentlyViewedView = new Show.RecentlyViewedLayout({
                    collection: recentlyViewed
                });
                recentlyViewedView.on("substitute:show", this.showSubstitute);
                showLayout.recentlyViewedRegion.show(recentlyViewedView);

                //medicine name in title
                var titleView = new Show.Title({
                    model: medicineDetails
                });
                showLayout.titleRegion.show(titleView);

                //view showing details of medicine
                var detailsView = new Show.Details({
                    model: medicineDetails
                });
                showLayout.detailsRegion.show(detailsView);


                if (medicineSubstitutes.length === 0) {
                    showLayout.substitutesRegion.show(new MedicineManager.Common.Views.EmptyView({
                        message: "No substitutes found"
                    }));
                    showLayout.cheapestSubstitutesRegion.show(new MedicineManager.Common.Views.EmptyView({
                        message: "No substitutes found"
                    }));
                } else {
                    //medicine substitutes
                    var substitutesView = new Show.Substitutes({
                        collection: medicineSubstitutes,
                        referencePrice: medicineDetails.get("medicine")["unit_price"]
                    });
                    substitutesView.on("substitute:show", this.showSubstitute);
                    showLayout.substitutesRegion.show(substitutesView);


                    //cheapest substitutes    
                    var cheapestSubstitutesView = new Show.CheapestSubstitutes({
                        substitutes: medicineSubstitutes,
                        medicine: medicineDetails
                    });
                    cheapestSubstitutesView.on("substitute:show", this.showSubstitute);
                    showLayout.cheapestSubstitutesRegion.show(cheapestSubstitutesView);
                }

            }.bind(this));
        },
        showSubstitute: function (medicine) {
            MedicineManager.trigger("medicine:show", medicine);
        }
    };
});