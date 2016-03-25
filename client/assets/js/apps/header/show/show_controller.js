var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.Show", function (Show) {
    Show.Controller = {
        showHeader: function () {
            var links = MedicineManager.request("header:entities");
            var headers = new Show.Header({
                collection: links
            });

            headers.on("brand:clicked", function () {
                MedicineManager.trigger("medicine:search");
            });
            headers.on("suggestion:select", this.showMedicine);
            MedicineManager.headerRegion.show(headers);
        },
        showMedicine: function (suggestion) {
                MedicineManager.trigger("medicine:show", suggestion.get("suggestion"));
            }
            /*,

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