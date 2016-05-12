var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
    tagName: "div",
    id: "main",
    className: "row",
    regions: {
        "titleRegion": "#title-region",
        "detailsRegion": "#details-region",
        "cheapestSubstitutesRegion": "#cheapest_substitutes-region",
        "substitutesRegion": "#substitutes-region",
        "recentlyViewedRegion": "#recently-viewed-region"
    },
    childEvents: {
        "substitute:show": "onChildSubstituteShow",
    },
    onChildSubstituteShow: function (view, text) {
        this.trigger("substitute:show", text);
    }
});

/*events:
[
    onChildSubstituteShow : "substitute:show"
]
*/