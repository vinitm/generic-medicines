MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    var RecentlyViewedItem = Marionette.ItemView.extend({
        template: "#recently-viewed-listItem-template",
        tagName: "li"
    });

    Show.RecentlyViewed = Marionette.CollectionView.extend({
        childView: RecentlyViewedItem,
        tagName: "ul",
        className: "material-list",
        id: "recently-viewed"
    });

    Show.RecentlyViewedLayout = Marionette.LayoutView.extend({
        className: "mcard",
        template: "#recently-viewed-template",
        regions: {
            "listRegion": "#list-region"
        },
        initialize: function (options) {
            options.collection = this.collection;
        },
        onShow: function () {
            var list = new Show.RecentlyViewed({
                collection: this.collection
            });
            this.listRegion.show(list);
        }
    });
});