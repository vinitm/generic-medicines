var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var medicineChannel = require('backbone.radio').channel('medicine');
MedicineManager.module("Entities", function (Entities) {
    Entities.Detail = Backbone.Model;

    var API = {
        getDetail: function (medicine) {
            var detail = new Entities.Detail();
            detail.url = "/medicine_details/?id=" + encodeURIComponent(medicine);
            return detail.fetch().then(function () {
                return detail;
            });
        }
    };

    medicineChannel.reply("details", function (medicine) {
        return API.getDetail(medicine);
    });

});