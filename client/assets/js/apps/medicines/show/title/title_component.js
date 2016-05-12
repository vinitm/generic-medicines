var Marionette = require('backbone.marionette');
var View = require('./title_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.model = options.model;
    },
    show: function () {
        this.view = new View({
            model: this.model
        });
        this.region.show(this.view);
    }
});