var MedicineManager=require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
MedicineManager.module("Entities", function (Entities) {
    Entities.Detail = Backbone.Model.extend({
        default: {
            medicine: {},
            constituents:{}
        }
    });

    var API = {
        getDetail: function (medicine) {
            var detail = new Entities.Detail();
            detail.url = "/medicine_details/?id=" +encodeURIComponent(medicine);
            return detail.fetch().then(function() {
            return detail;
        });
        }
    };

    MedicineManager.reqres.setHandler("details:entities", function (medicine) {
        return API.getDetail(medicine);
    });

});