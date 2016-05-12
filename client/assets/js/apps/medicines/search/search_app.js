var Marionette = require('backbone.marionette');
var View = require('./search_view');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
    },
    showSearchOption: function () {
        var self = this;
        this.view = new View();
        this.view.on("suggestion:select", function (suggestion) {
            self.trigger("suggestion:select", suggestion);
        });
        this.region.show(this.view);
    }
});

/*events:
[
    onChildSuggestionSelect : "suggestion:select"
]
*/