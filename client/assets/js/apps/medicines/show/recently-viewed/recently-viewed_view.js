var Marionette = require('backbone.marionette');
var $ = require('jquery');

var RecentlyViewedItem = Marionette.ItemView.extend({
    template: require("./listItem_template.tpl"),
    tagName: "li",
    events: {
        "click .show": "linkClicked"
    },
    linkClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var text = $(e.currentTarget).text().trim();
        this.trigger("link:click", text);
    }
});

var RecentlyViewed = Marionette.CollectionView.extend({
    childView: RecentlyViewedItem,
    tagName: "ul",
    className: "material-list",
    id: "recently-viewed",
    onChildviewLinkClick: function (view, text) {
        this.triggerMethod("link:click", text);
    }
});

module.exports = Marionette.LayoutView.extend({
    template: require("./layout_template.tpl"),
    regions: {
        "listRegion": "#list-region"
    },
    initialize: function (options) {
        options.collection = this.collection;
    },
    childEvents: {
        "link:click": "onChildLinkClick"
    },
    onChildLinkClick: function (view, text) {
        this.trigger("link:click", text);
    },
    onShow: function () {
        var list = new RecentlyViewed({
            collection: this.collection
        });
        this.listRegion.show(list);
    }
});