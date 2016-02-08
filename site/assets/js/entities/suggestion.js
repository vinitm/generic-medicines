MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Suggestion = Backbone.Model.extend({
        default: {
            suggestion: ""
        }
    });

    Entities.SuggestionCollection = Backbone.Collection.extend({
        model: Entities.Suggestion,
        fetch: function (options) {
            return this.xhr = Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

    var API = {
        getSuggestions: function (medicine) {
            var suggestions = new Entities.SuggestionCollection();
            if (!(medicine.trim()))// hack to get empty response when medicine is empty
                medicine = "$%^&";
            suggestions.url = "/medicine_suggestions/?id=" + encodeURIComponent(medicine);
            return suggestions.fetch().then(function () {
                return suggestions;
            });
        }
    };

    MedicineManager.reqres.setHandler("suggestion:entities", function (medicine) {
        return API.getSuggestions(medicine);
    });

});