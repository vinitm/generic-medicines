var Marionette = require('backbone.marionette');
var headerChannel = require('backbone.radio').channel('header');
var globalChannel = require('backbone.radio').channel('global');
var Show = require('./show');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.showHeader();
        headerChannel.reply("set:search:visible", this.setSearchVisibility.bind(this));
        this.listenTo(this.showController, "brand:clicked", function () {
            globalChannel.request("medicine:search");
        });
        this.listenTo(this.showController, "suggestion:select", function (suggestion) {
            globalChannel.request("medicine:show", suggestion.get("suggestion"));
        });
    },
    setSearchVisibility: function (visible) {
        this.showController.setSearchVisible(visible);
    },
    showHeader: function () {
        this.showController.show();
    }
});