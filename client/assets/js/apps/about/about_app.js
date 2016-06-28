var Marionette = require('backbone.marionette');
var Show = require('./show');
var Router = require('./router');
var navChannel = require('backbone.radio').channel('nav');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.router = new Router({
            controller: this
        });
    },
    show: function () {
        navChannel.request('navigate', "about");
        this.showController.show();
    }
});