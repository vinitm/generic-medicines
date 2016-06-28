var Marionette = require('backbone.marionette');
var radio = require('backbone.radio');
var medicineChannel = radio.channel('medicine');
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
        this._listenToControllers();
    },
    _listenToControllers: function () {
        var self = this;
        this.listenTo(this.searchController, "suggestion:select", function (suggestion) {
            self.showMedicine((suggestion.get && suggestion.get("suggestion")) || suggestion);
        });
        this.listenTo(this.showController, "suggestion:select", function (suggestion) {
            self.showMedicine((suggestion.get && suggestion.get("suggestion")) || suggestion);
        });
    },
    showSearchOption: function () {
        navChannel.request('navigate', "");
        this.searchController.showSearchOption();
        this.trigger('search');
    },
    showMedicine: function (medicine) {
        navChannel.request('navigate', "medicines/show/" + encodeURIComponent(medicine));
        medicineChannel.request("add:recentlyViewed", medicine);
        this.showController.showMedicine(medicine);
        this.trigger('show', medicine);
    }
});