var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var MedicineManager = require('MedicineManager');
MedicineManager.module("HeaderApp.Show", function (Show) {

    Show.Header = Marionette.LayoutView.extend({
        template: require('./show_template.tpl'),
        className: "navbar navbar-default navbar-fixed-top",
        regions: {
            inputRegion: '#inputRegion'
        },
        childEvents: {
            "suggestion:select": "onChildSuggestionSelect"
        },
        onChildSuggestionSelect: function (view, suggestion) {
            var model = new Backbone.Model(suggestion);
            this.trigger("suggestion:select", model);
        },
        events: {
            "click a.navbar-brand": "brandClicked"
        },
        brandClicked: function (e) {
            e.preventDefault();
            this.trigger("brand:clicked");
        },
        onShow: function () {
            var search = new MedicineManager.Common.Views.Typeahead({scale:0.1});
            this.inputRegion.show(search);
        }
    });

});