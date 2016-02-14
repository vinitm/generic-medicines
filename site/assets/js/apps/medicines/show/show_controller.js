MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showMedicine: function (medicineId) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);

            var detailsFetched = MedicineManager.request("details:entities", medicineId);
            var substitutesFetched = MedicineManager.request("substitute:entities", medicineId);
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


                //recently viewed
                var recentlyViewedView = new Show.RecentlyViewedLayout({
                    collection: recentlyViewed
                });
                recentlyViewedView.on("substitute:show", this.showSubstitute);
                showLayout.recentlyViewedRegion.show(recentlyViewedView);


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


				/*if(substitutes.length===0){
					showLayout.substitutesRegion.show(new MedicineManager.Common.Views.EmptyView({message:"No substitutes found"}));
					showLayout.cheapestSubstitutesRegion.show(new MedicineManager.Common.Views.EmptyView({message:"No substitutes found"}));
				}
				else{
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
				}*/

                MedicineManager.trigger('medicine:shown', details);
            }.bind(this));
        },
        showSubstitute: function (medicineModel) {
            console.dir(medicineModel);
            MedicineManager.trigger("medicine:show", medicineModel);
        }
    };
});