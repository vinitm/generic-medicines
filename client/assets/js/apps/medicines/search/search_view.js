var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views=require('common');
module.exports = Marionette.LayoutView.extend({
    template: require('./search_template.tpl'),
    id: "searchContainer",
    regions: {
        inputRegion: "#inputRegion"
    },
    childEvents: {
        "suggestion:select": "onChildSuggestionSelect"
    },
    onChildSuggestionSelect: function (view, suggestion) {
        var model = new Backbone.Model(suggestion);
        this.trigger("suggestion:select", model);
    },
    onShow: function () {
        var search = new Views.Typeahead();
        this.inputRegion.show(search);

        //to page center
        this.inputRegion.$el.addClass('row');
        search.$el.parent().addClass('col-xs-12 col-md-offset-4 col-md-4');
    }
});


/*events:
[
    onChildSuggestionSelect : "suggestion:select"
]
*/