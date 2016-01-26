MedicineManager.module("MedicineApp.Search", function (Search, MedicineManager, Backbone, Marionette, $, _) {
    Search.SearchLayout = Marionette.LayoutView.extend({
        template: "#search-layout-template",
        regions: {
            inputRegion: "#search",
            suggestionRegion: "#suggestion"
        },
        childEvents: {
            "search:change": "onChildSearchChange",
            "suggestion:select": "onChildSuggestionSelect"
        },
        onChildSearchChange: function (view, search) {
            this.trigger("search:change", search);
        },
        onChildSuggestionSelect: function (view, suggestion) {
            this.trigger("suggestion:select", suggestion);
        },
        onShow: function () {
            this.inputRegion.show(new Search.Input());
        }
    });

    Search.Input = Marionette.ItemView.extend({
        template: false,
        tagName: "input",
        className: "input-xxlarge",
        events: {
            "input": "searchChanged"
        },
        searchChanged: function () {
            var search = this.$el.val().trim();
            this.triggerMethod("search:change", search);
        }
    });

});