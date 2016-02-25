var MedicineManager=require('MedicineManager');
MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {

    Search.SearchLayout = Marionette.LayoutView.extend({
        template: '#search-layout-template',
        id:"searchContainer",
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