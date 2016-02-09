MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showMedicine: function (medicine) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);

            var detailsFetched= MedicineManager.request("details:entities", medicine);
            var substitutesFetched = MedicineManager.request("substitute:entities", medicine);
            var recentlyViewed = MedicineManager.request("recentlyViewed:entities");

            //show loading view while the information is loaded
            showLayout.regionManager.each(function (region) {
                var loadingView = new MedicineManager.Common.Views.Loading();
                region.show(loadingView);
            });

            $.when(detailsFetched, substitutesFetched).then(function (details, substitutes) {
                if (!$.contains(document, showLayout.$el[0])) {
                    //if layout is detached
                    return;
                }
                //medicine name in title
                var titleView = new Show.Title({
                    model: details
                });
                showLayout.titleRegion.show(titleView);

                //view showing details of medicine
                var detailsView = new Show.Details({
                    model: details
                });
                showLayout.detailsRegion.show(detailsView);


                //medicine substitutes
                var substitutesView = new Show.Substitutes({
                    collection: substitutes,
                    referencePrice: details.get("medicine")["unit_price"]
                });
                substitutesView.on("substitute:show", this.showSubstitute);
                showLayout.substitutesRegion.show(substitutesView);


                //cheapest substitutes    
                var cheapestSubstitutesView = new Show.CheapestSubstitutes({
                    substitutes: substitutes,
                    medicine: details
                });
                showLayout.cheapestSubstitutesRegion.show(cheapestSubstitutesView);

                //recently viewed
                var recentlyViewedView = new Show.RecentlyViewedLayout({
                    collection: recentlyViewed
                });
                recentlyViewedView.on("substitute:show", this.showSubstitute);
                showLayout.recentlyViewedRegion.show(recentlyViewedView);
            }.bind(this));
        },
        showSubstitute: function (medicine) {
            MedicineManager.trigger("medicine:show", medicine);
        }
    };
});