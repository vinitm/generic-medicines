MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showMedicine: function (medicine) {
            var showLayout = new Show.LayoutView();
            MedicineManager.mainRegion.show(showLayout);
           /* MedicineManager.request("details:entities", medicine).then(function (details) {
                var detailsView = new Show.Details({
                    model: details
                });
                showLayout.detailsRegion.show(detailsView);
            });*/
            
            MedicineManager.request("alternative:entities", medicine).then(function (alternatives) {
                var alternativesView = new Show.Alternatives({
                    collection: alternatives
                });
                showLayout.detailsRegion.show(alternativesView);
            });
        }
    };
});