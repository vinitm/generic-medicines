MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {

    Search.SearchLayout = Marionette.LayoutView.extend({
        template: '#search-layout-template',
        id: "searchContainer",
        regions: {
            inputRegion: "#search"
        },
        childEvents: {
            "suggestion:select": "onChildSuggestionSelect"
        },
        onChildSuggestionSelect: function (view, suggestModel) {
            this.trigger("suggestion:select", suggestModel);
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
        onTypeheadSelect: function (event, suggestModel) {
            this.triggerMethod('suggestion:select', suggestModel);
        },
        onShow: function () {
            // constructs the suggestion engine
            var engine = new Bloodhound({
                datumTokenizer: function (suggestion) {
                    return Bloodhound.tokenizers.whitespace(suggestion.getBrandName());
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/medicine_suggestions/?id=%QUERY',
                    wildcard: '%QUERY',
                    transform: function (suggestions) {
                        var collection = new MedicineManager.Entities.Suggestions(suggestions);
                        return collection.models;
                    }
                }
            });

            this.$el.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                limit: "50",
                displayKey: function (suggestion) {
                    return suggestion.getBrandName();
                },
                name: 'suggestions',
                source: engine
            });
        }
    });

});