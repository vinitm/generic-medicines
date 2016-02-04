MedicineManager.module("Common.Views",function(Views,MedicineManager, Backbone, Marionette, $, _){

	Views.Loading=Marionette.ItemView.extend({
		template:"#loading-template",
		className:"col-xs-12"
	});

});