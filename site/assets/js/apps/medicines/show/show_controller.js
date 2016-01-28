MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showMedicine: function (medicine) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);

            var details = MedicineManager.request("details:entities", medicine);
            var alternatives = MedicineManager.request("alternative:entities", medicine);

            $.when(details, alternatives).then(function (details, alternatives) {
			//medicine name in title
                var titleView = new Show.Title({
                    model: details
                });
                var detailsView = new Show.Details({
                    model: details
                });
                showLayout.titleRegion.show(titleView);
                showLayout.detailsRegion.show(detailsView);


			//medicine substitutes
                var substitutesView = new Show.Substitutes({
                collection:alternatives
                });
                showLayout.substitutesRegion.show(substitutesView);
                
                
            //cheapest substitute    
                var cheapestSubstituteView = new Show.CheapestSubstitute({
                    collection: alternatives,
                    medicine: details
                });

                showLayout.cheapestSubstituteRegion.show(cheapestSubstituteView);
            });
        }
    };
});