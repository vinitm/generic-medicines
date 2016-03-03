var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.List", function (List) {
    List.Controller = {
        listHeader: function () {
            var links = MedicineManager.request("header:entities");
            var headers = new List.Headers({
                collection: links
            });

            MedicineManager.headerRegion.show(headers);
        }
    };
});