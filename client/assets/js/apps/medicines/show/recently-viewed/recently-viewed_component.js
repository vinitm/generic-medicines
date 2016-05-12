var Marionette = require('backbone.marionette');
var View = require('./recently-viewed_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.collection = options.collection;
    },
    show: function () {
        this.view = new View({
            collection: this.collection
        });
        var self=this;
        this.view.on("link:click", function (suggestion) {
            self.trigger("link:click", suggestion);
        });
        this.region.show(this.view);
    }
}); 