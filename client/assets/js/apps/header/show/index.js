var Marionette = require('backbone.marionette');
var View = require('./show_view');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.view = new View();
        var self = this;
        this.view.on("brand:clicked", function () {
            self.trigger("brand:clicked");
        });
        this.view.on("suggestion:select", function (suggestion) {
            self.trigger("suggestion:select", suggestion);
        });
        this.region = options.region;
    },
    show: function () {
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