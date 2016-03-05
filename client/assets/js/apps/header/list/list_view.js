var Marionette = require('backbone.marionette');
var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.List", function (List) {
    List.Header = Marionette.ItemView.extend({
        template: "#header-link",
        tagName: "li"
    });

    List.Headers = Marionette.CompositeView.extend({
        template: "#header-template",
        className: "navbar navbar-default navbar-fixed-top",
        childView: List.Header,
        childViewContainer: "ul",
        events: {
            "click a.navbar-brand": "brandClicked"
        },
        brandClicked: function (e) {
            e.preventDefault();
            this.trigger("brand:clicked");
        }
    });

});