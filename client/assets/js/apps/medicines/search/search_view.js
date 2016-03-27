var MedicineManager = require('MedicineManager');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

MedicineManager.module("MedicineApp.Search", function (Search) {
    Search.SearchLayout = Marionette.LayoutView.extend({
        template: require('./search_template.tpl'),
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
            
            //to page center
            this.inputRegion.$el.addClass('row');
            search.$el.parent().addClass('col-xs-12 col-md-offset-4 col-md-4');
        }
    });



});