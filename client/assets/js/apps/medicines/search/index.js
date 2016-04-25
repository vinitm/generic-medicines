var MedicineManager = require('MedicineManager');
var SearchLayout = require('./search_view');
module.exports = {
    showSearchOption: function () {
        var searchLayout = new SearchLayout();
        searchLayout.on("suggestion:select", this.showMedicine);
        MedicineManager.mainRegion.show(searchLayout);
    },
    showMedicine: function (suggestion) {
        MedicineManager.trigger("medicine:show", suggestion.get("suggestion"));
    }
};