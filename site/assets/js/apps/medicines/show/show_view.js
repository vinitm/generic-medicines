MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.LayoutView = Marionette.LayoutView.extend({
        template: "#show-template",
        regions: {
            "detailsRegion": "#details",
            "alternativesRegion": "#alternatives"
        }
    });
    Show.Details = Marionette.ItemView.extend({
        /*Add template*/
    });

    Show.Alternative = Marionette.ItemView.extend({
        tagName:"li",
        template:"#alternative-template"
    });
    Show.Alternatives = Marionette.CollectionView.extend({
        tagName: "ul",
        childView: Show.Alternative
    });
});