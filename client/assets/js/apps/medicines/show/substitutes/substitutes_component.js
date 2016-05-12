var Marionette = require('backbone.marionette');
var commonViews = require('common');
var View = require('./substitutes_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.collection = options.collection;
        this.referencePrice = options.referencePrice;
    },
    show: function () {
        if (this.collection.length === 0) {
            this.view = new commonViews.EmptyView({
                message: "No substitutes found"
            });
        } else {
            this.view = new View({
                collection: this.collection,
                referencePrice: this.referencePrice
            });
            var self = this;
            this.view.on("link:click", function (suggestion) {
                self.trigger("link:click", suggestion);
            });
        }
        this.region.show(this.view);
    }
});