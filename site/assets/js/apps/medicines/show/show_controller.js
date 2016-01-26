MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showMedicine: function (medicine) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);
            MedicineManager.request("details:entities", medicine).then(function (details) {
                var titleView = new Show.Title({
                    model: details
                });
                var detailsView = new Show.Details({
                    model: details
                });
                showLayout.titleRegion.show(titleView);
                showLayout.detailsRegion.show(detailsView);
            });

            MedicineManager.request("alternative:entities", medicine).then(function (alternatives) {

                var substitutesView = new Show.Substitutes({});
                var tableView = new Show.Table({
                    collection: alternatives
                });
                showLayout.substitutesRegion.show(substitutesView);
                substitutesView.tableRegion.show(tableView);


                var cheapestSubstituteView = new Show.CheapestSubstitute({
                    collection: alternatives
                });
                showLayout.cheapestSubstituteRegion.show(cheapestSubstituteView);
            });
        }
    };
});