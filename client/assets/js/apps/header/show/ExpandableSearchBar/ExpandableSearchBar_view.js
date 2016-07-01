var Marionette = require('backbone.marionette');


module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
    tagName: "div",
    className: "input-group",
    regions: {
        "searchRegion": "#searchRegion"
    },
    events: {
        'click button.btn': 'onSearchButtonClick'
    },
    childEvents:{
        'suggestion:select':'onSuggestionSelect'
    },
    onSearchButtonClick: function (event) {
        this.trigger("search:click", event);
    },
    onSuggestionSelect: function (view,suggest) {
        this.trigger("suggestion:select", suggest);
    }
});