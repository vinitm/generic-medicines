var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');


MedicineManager.module("MedicineApp.Search", function (Search) {
    Search.SearchLayout = Marionette.LayoutView.extend({
        template: '#search-layout-template',
        id: "searchContainer",
        regions: {
            inputRegion: "#search"
        },
        childEvents: {
            "suggestion:select": "onChildSuggestionSelect"
        },
        onChildSuggestionSelect: function (view, suggestion) {
            var model = new Backbone.Model(suggestion);
            this.trigger("suggestion:select", model);
        },
        onShow: function () {
            console.log('search onshow');
            var search = new MedicineManager.Common.Views.Typeahead();
            this.inputRegion.show(search);
        }
    });

    

});