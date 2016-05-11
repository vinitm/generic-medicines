var Marionette = require('backbone.marionette');
var headerChannel = require('backbone.radio').channel('header');
var View = require('./show_view');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        var links = headerChannel.request("header:entities");
        this.view = new View({
            collection: links
        });
        this.region = options.region;
    },
    show: function () {
        var self = this;
        this.view.on("brand:clicked", function () {
            self.trigger("brand:clicked");
        });
        this.view.on("suggestion:select", function (suggestion) {
            self.trigger("suggestion:select", suggestion);
        });
        this.region.show(this.view);
    },
    setSearchVisible: function (visible) {
        if (visible)
            this.view.showSearchbar();
        else
            this.view.hideSearchbar();
    }
});

/*events:
[
    show:"brand:clicked",
    show:"suggestion:select"
]
*/