MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    var RecentlyViewedItem = Marionette.ItemView.extend({
        template: "#recently-viewed-listItem-template",
        tagName: "li",
		events: {
            "click .show": "linkClicked"
        },
        linkClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("link:click", this.model);
        }
    });

    Show.RecentlyViewed = Marionette.CollectionView.extend({
        childView: RecentlyViewedItem,
        tagName: "ul",
        className: "material-list",
        id: "recently-viewed",
		onChildviewLinkClick:function(view,model){
			this.triggerMethod("link:click", model);
		}
    });

    Show.RecentlyViewedLayout = Marionette.LayoutView.extend({
        template: "#recently-viewed-template",
        regions: {
            "listRegion": "#list-region"
        },
        initialize: function (options) {
            options.collection = this.collection;
        },
		childEvents: {
            "link:click": "onChildLinkClick"
        },
        onChildLinkClick: function (view, model) {
            this.triggerMethod("substitute:show", model);
        },
        onShow: function () {
            var list = new Show.RecentlyViewed({
                collection: this.collection
            });
            this.listRegion.show(list);
        }
    });
});