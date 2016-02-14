MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.LayoutView = Marionette.LayoutView.extend({
        template: "#show-layout-template",
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
            "substitute:show": "onChildSubstituteShow"
        },
        onChildSubstituteShow: function (view, model) {
            this.trigger("substitute:show", model);
        }
    });
});