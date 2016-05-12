var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var navChannel = require('backbone.radio').channel('nav');

/*var MedicineManager = new Marionette.Application();

MedicineManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region"
});

MedicineManager.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

navChannel.reply('navigate', function (route, options) {
    MedicineManager.navigate(route, options);
});

MedicineManager.getCurrentRoute = function () {
    return Backbone.history.fragment;
};

$(function () {
    new HeaderApp({
        region: MedicineManager.headerRegion
    });
    new MedicineApp({
        region: MedicineManager.mainRegion
    });
    Backbone.history.start();
});

module.exports = MedicineManager;*/

module.exports = Marionette.Application.extend({
    initialize: function () {
        var self = this;
        this._subApps = {};
        this._services = {};
        navChannel.reply('navigate', function (route, options) {
            self._navigate(route, options);
        });
    },
    _getCurrentRoute: function () {
        return Backbone.history.fragment;
    },
    _navigate: function (route, options) {
        if (this._getCurrentRoute() === route) {
            return;
        }
        options || (options = {});
        Backbone.history.navigate(route, options);
    },
    addService: function (name, options) {
        var serviceOptions = _.omit(options, 'serviceClass');
        var service = new options.serviceClass(serviceOptions);
        this._services[name] = service;
    },
    addSubApp: function (name, options) {
        var subAppOptions = _.omit(options, 'subAppClass');
        var subApp = new options.subAppClass(subAppOptions);
        this._subApps[name] = subApp;
    }
});