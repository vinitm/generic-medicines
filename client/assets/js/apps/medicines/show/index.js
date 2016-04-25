var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var $ = require('jquery');
var medicineChannel = require('backbone.radio').channel('medicine');

var LayoutView = require('./show_view');
var Loader = require('./loader/loader_view');
var RecentlyViewedLayout = require('./recently-viewed/recently-viewed_view');
var Title = require('./title/title_view');
var Details = require('./details/details_view');
var Substitutes = require('./substitutes/substitutes_view');
var CheapestSubstitutes = require('./cheapest-substitutes/cheapest-substitute_view');
module.exports = {
    showMedicine: function (medicine) {
        var showLayout = new LayoutView();
        MedicineManager.mainRegion.show(showLayout);

        var detailsFetched = medicineChannel.request("details", medicine);
        var recentlyViewed = medicineChannel.request("recentlyViewed");

        //show loading view while the information is loaded
        showLayout.regionManager.each(function (region) {
            var loadingView = new Loader({
                width: 20
            });
            region.show(loadingView);
        });

        detailsFetched.then(function (details) {
            if (!$.contains(document, showLayout.$el[0])) {
                //if layout is detached
                return;
            }

            var medicineDetails = new Backbone.Model(details.get('details'));
            var medicineSubstitutes = new MedicineManager.Entities.SubtituteCollection(details.get('alternatives'));
            //recently viewed
            var recentlyViewedView = new RecentlyViewedLayout({
                collection: recentlyViewed
            });
            recentlyViewedView.on("substitute:show", this.showSubstitute);
            showLayout.recentlyViewedRegion.show(recentlyViewedView);

            //medicine name in title
            var titleView = new Title({
                model: medicineDetails
            });
            showLayout.titleRegion.show(titleView);

            //view showing details of medicine
            var detailsView = new Details({
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
                var substitutesView = new Substitutes({
                    collection: medicineSubstitutes,
                    referencePrice: medicineDetails.get("medicine")["unit_price"]
                });
                substitutesView.on("substitute:show", this.showSubstitute);
                showLayout.substitutesRegion.show(substitutesView);


                //cheapest substitutes    
                var cheapestSubstitutesView = new CheapestSubstitutes({
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