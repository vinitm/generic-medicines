var MedicineManager=require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
MedicineManager.module("MedicineApp.Show", function (Show) {
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
        onChildSubstituteShow: function (view, text) {
            this.trigger("substitute:show", text);
        }
    });
});