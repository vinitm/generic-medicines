var Marionette=require('backbone.marionette');
var MedicineManager=require('app');
MedicineManager.module("HeaderApp.List", function(List){
 List.Header = Marionette.ItemView.extend({
 template: "#header-link",
 tagName: "li"
 });

 List.Headers = Marionette.CompositeView.extend({
 template: "#header-template",
 className: "navbar navbar-inverse navbar-fixed-top",
 itemView: List.Header,
 itemViewContainer: "ul"
 });
 });