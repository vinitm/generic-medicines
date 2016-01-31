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
                showLayout.titleRegion.show(titleView);
                
                //view showing details of medicine
                var detailsView = new Show.Details({
                    model: details
                });    
                showLayout.detailsRegion.show(detailsView);


                //medicine substitutes
                var substitutesView = new Show.Substitutes({
                    collection: alternatives,
                    referencePrice: details.get("medicine")["unit_price"]
                });
                substitutesView.on("substitute:show", this.showSubstitute);
                showLayout.substitutesRegion.show(substitutesView);


                //cheapest substitutes    
                var cheapestSubstitutesView = new Show.CheapestSubstitutes({
                    substitutes: alternatives,
                    medicine: details
                });
                showLayout.cheapestSubstitutesRegion.show(cheapestSubstitutesView);
            }.bind(this));
        },
        showSubstitute: function (medicine) {
            MedicineManager.trigger("medicine:show", medicine);
        }
    };
});