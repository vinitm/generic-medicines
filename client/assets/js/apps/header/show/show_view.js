var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views = require('common');

module.exports = Marionette.LayoutView.extend({
    template: require('./show_template.tpl'),
    className: "navbar navbar-default navbar-fixed-top",
    regions: {
        inputRegion: '#inputRegion'
    },
    childEvents: {
        "suggestion:select": "onChildSuggestionSelect"
    },
    onChildSuggestionSelect: function (view, suggestion) {
        var model = new Backbone.Model(suggestion);
        this.trigger("suggestion:select", model);
    },
    events: {
        "click a.navbar-brand": "brandClicked"
    },
    brandClicked: function (e) {
        e.preventDefault();
        this.trigger("brand:clicked");
    },
    onShow: function () {
        var search = new Views.Typeahead({
            scale: 0.1
        });
        this.inputRegion.show(search);
    },
    hideSearchbar: function () {
        this.inputRegion.currentView.hide();
    },
    showSearchbar: function () {
        this.inputRegion.currentView.show();
    }
});

/*events:
[
    events:"brand:clicked",
    onChildSuggestionSelect : "suggestion:select"
]
*/