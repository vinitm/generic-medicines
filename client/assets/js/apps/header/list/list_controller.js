var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.List", function (List) {
    List.Controller = {
        listHeader: function () {
            var links = MedicineManager.request("header:entities");
            var headers = new List.Headers({
                collection: links
            });

            headers.on("brand:clicked", function () {
                MedicineManager.trigger("medicine:search");
            });

            MedicineManager.headerRegion.show(headers);
        }/*,

        setActiveHeader: function (headerUrl) {
            var links = ContactManager.request("header:entities");
            var headerToSelect = links.find(function (header) {
                return header.get("url") === headerUrl;
            });
            headerToSelect.select();
            links.trigger("reset");
        }*/
    };
});