var Marionette = require('backbone.marionette');
var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.List", function (List) {

    List.Headers = Marionette.LayoutView.extend({
        template: "#header-template",
        className: "navbar navbar-default navbar-fixed-top",
        events: {
            "click a.navbar-brand": "brandClicked"
        },
        brandClicked: function (e) {
            e.preventDefault();
            this.trigger("brand:clicked");
        }
    });

});