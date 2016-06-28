var Marionette = require('backbone.marionette');
var Show = require('./show');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.showFooter();
        this.listenTo(this.showController, "show:about", function () {
            this.trigger("show:about");
        });
    },
    showFooter: function () {
        this.showController.show();
    }
});