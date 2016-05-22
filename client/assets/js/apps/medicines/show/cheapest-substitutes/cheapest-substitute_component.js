var Marionette = require('backbone.marionette');
var commonViews = require('common');
var View = require('./cheapest-substitute_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.model = options.model;
    },
    show: function () {
        if (this.model.get('cheapestAlternatives').length === 0) {
            this.view = new commonViews.EmptyView({
                message: "No substitutes found"
            });
        } else {
            this.view = new View({
                model: this.model
            });
            var self = this;
            this.view.on("link:click", function (suggestion) {
                self.trigger("link:click", suggestion);
            });
        }
        this.region.show(this.view);
    }
});