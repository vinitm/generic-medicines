var MedicineManager=require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
MedicineManager.module("Common.Views",function(Views){

	Views.Loading=Marionette.ItemView.extend({
		template:"#loading-template",
		className:"col-xs-12"
	});
	
	Views.EmptyView=Marionette.ItemView.extend({
		template:_.template("<p style='text-align:center'><%=message%></p>"),
		className:"col-xs-12 text-danger",
		initialize:function(options){
			this.model=new Backbone.Model({message:options.message});
		}
	});

});