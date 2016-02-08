MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {

    Search.SearchLayout = Marionette.LayoutView.extend({
        template: "#search-layout-template",
        regions: {
            inputRegion: "#search"
        },
        childEvents: {
            "suggestion:select": "onChildSuggestionSelect"
        },
        onChildSuggestionSelect: function (view, suggestion) {
            var suggest = new Backbone.Model({
                suggestion: suggestion
            });
            this.trigger("suggestion:select", suggest);
        },
        onShow: function () {
            var search = new Search.Input();
            search.on('all', function (e) {
                console.log(e);
            });
            this.inputRegion.show(search);
        }
    });

    Search.Input = Marionette.ItemView.extend({
        template: false,
        tagName: "input",
        className: "searchInput",
        triggers: {
            "typeahead:select": "suggestion:select"
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
                displayKey: 'suggestion',
                name: 'suggestions',
                source: engine
            });
        }
    });

});