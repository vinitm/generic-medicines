MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Suggestion = Backbone.Model.extend({
        default: {
            suggestion: ""
        }
    });

    Entities.SuggestionCollection = Backbone.Collection.extend({
        model: Entities.Suggestion,
        /*filterBy: function (filterText) {
            var filtered = this.filter(function (medicine) {
                return medicine.get('suggestion').toLowerCase().match(new RegExp("^" + filterText.toLowerCase()));
            });

            return new Entities.SuggestionCollection(filtered);
        }*/
    });

    var API = {
        getSuggestions: function (medicine) {
            var suggestions = new Entities.SuggestionCollection();
            suggestions.url = "/medicine_suggestions/?id=" + encodeURIComponent(medicine);
            return suggestions.fetch().then(function () {
                return suggestions/*.filterBy(medicine)*/;
            });
        }
    };

    MedicineManager.reqres.setHandler("suggestion:entities", function (medicine) {
        return API.getSuggestions(medicine);
    });

});