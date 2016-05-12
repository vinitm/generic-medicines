var Marionette = require('backbone.marionette');
var radio = require('backbone.radio');
var headerChannel = radio.channel('header');
var medicineChannel = radio.channel('medicine');
var globalChannel = radio.channel('global');
var navChannel = radio.channel('nav');

var Search = require('./search/search_app');
var Show = require('./show/show_app');
var Router = require('./router');


module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.searchController = new Search(options);
        this.router = new Router({
            controller: this
        });
        this._initializeChannels();
        var self = this;
        this.listenTo(this.searchController, "suggestion:select", function (suggestion) {
            self.showMedicine(suggestion.get("suggestion") || suggestion);
        });
        this.listenTo(this.showController, "suggestion:select", function (suggestion) {
            self.showMedicine(suggestion.get("suggestion") || suggestion);
        });
    },
    _initializeChannels: function () {
        var self = this;
        globalChannel.reply("medicine:search", function () {
            self.showSearchOption();
        });
        globalChannel.reply("medicine:show", function (medicine) {
            self.showMedicine(medicine);
        });
    },
    showSearchOption: function () {
        navChannel.request('navigate', "");
        headerChannel.request("set:search:visible", false);
        this.searchController.showSearchOption();
    },
    showMedicine: function (medicine) {
        navChannel.request('navigate', "medicines/show/" + encodeURIComponent(medicine));
        headerChannel.request("set:search:visible", true);
        medicineChannel.request("add:recentlyViewed", medicine);
        this.showController.showMedicine(medicine);
    }
});