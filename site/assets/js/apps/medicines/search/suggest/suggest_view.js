MedicineManager.module("MedicineApp.Search.Suggest", function (Suggest, MedicineManager, Backbone, Marionette, $, _) {

    Suggest.Suggestion = Marionette.ItemView.extend({
        tagName: "li",
        template: "#suggestions-list-item-template",
        events: {
            "click": "suggestionClicked"
        },
        suggestionClicked: function (e) {
            e.stopPropagation();
            this.triggerMethod("suggestion:select", this.model);
        }
    });

    Suggest.Suggestions = Marionette.CollectionView.extend({
        tagName: "ul",
        childView: Suggest.Suggestion,
        abort: function () {
            var xhr = this.collection.xhr;
            xhr.abort();
        }
    });

});