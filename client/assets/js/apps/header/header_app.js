var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('backbone.marionette');
MedicineManager.module("HeaderApp", function (Header) {
    var API = {
		listHeader: function(){
			Header.List.Controller.listHeader();
		}
    };
	
	MedicineManager.commands.setHandler("set:active:header", function(name){
		MedicineManager.HeaderApp.List.Controller.setActiveHeader(name);
	});

	Header.on("start", function(){
		API.listHeader();
	});
});