var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var jQuery = require("jquery");
var typeahead = require("typeahead.js-browserify");
typeahead.loadjQueryPlugin();

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
            var search = new Search.Input();
            this.inputRegion.show(search);
        }
    });

    Search.Input = Marionette.ItemView.extend({
        template: false,
        tagName: "input",
        className: "searchInput",
        events: {
            "typeahead:select": "onTypeheadSelect"
        },
        onTypeheadSelect: function (event, suggest) {
            this.triggerMethod('suggestion:select', suggest);
        },
        onShow: function () {
            console.log('onshow');
            // constructs the suggestion engine
            var engine = new Bloodhound({
                datumTokenizer: function (item) {
                    return Bloodhound.tokenizers.whitespace(item.suggestion);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/medicine_suggestions/?id=%QUERY',
                    wildcard: '%QUERY'
                },
                transform: function (response) {
                    return response.suggestions;
                }
            });

            this.$el.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                limit: "50",
                displayKey: 'suggestion',
                name: 'suggestions',
                source: engine
            });
        }
    });

});