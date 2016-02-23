var MedicineManager = new Marionette.Application();

MedicineManager.addRegions({
  mainRegion: "#main-region"
});

MedicineManager.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

MedicineManager.getCurrentRoute = function(){
  return Backbone.history.fragment;
};

MedicineManager.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();
  }
});