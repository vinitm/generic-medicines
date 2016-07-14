var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var navChannel = require('backbone.radio').channel('nav');

module.exports = Marionette.Application.extend({
	initialize: function() {
		var self = this;
		this._subApps = {};
		this._services = {};
		navChannel.reply('navigate', function(route, options) {
			self._navigate(route, options);
		});
	},
	_getCurrentRoute: function() {
		return Backbone.history.fragment;
	},
	_navigate: function(route, options) {
		if (this._getCurrentRoute() === route) {
			return;
		}
		options || (options = {});
		Backbone.history.navigate(route, options);
	},
	getSubApp: function(name) {
		return this._subApps[name];
	},
	getService: function(name) {
		return this._services[name];
	},
	addService: function(name, options) {
		var serviceOptions = _.omit(options, 'serviceClass');
		var service = new options.serviceClass(serviceOptions);
		this._services[name] = service;
	},
	addSubApp: function(name, options) {
		var subAppOptions = _.omit(options, 'subAppClass');
		var subApp = new options.subAppClass(subAppOptions);
		this._subApps[name] = subApp;
	}
});
