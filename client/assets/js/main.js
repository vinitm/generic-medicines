// main.js
require('./bootstrap');

// Load up app...
var App = require('./app');
var Backbone = require('backbone');
var AppLayout = require('./app_layout');

var DetailsService = require('./entities/details');
var RecentlyViewedService = require('./entities/recently-viewed');
var SubstituteService = require('./entities/substitute');

var HeaderApp = require('./apps/header/header_app');
var MedicineApp = require('./apps/medicines/medicines_app');

var app = new App();
var layout = new AppLayout();

app.addService('detailsService', {
    serviceClass: DetailsService
});
app.addService('recentlyViewedService', {
    serviceClass: RecentlyViewedService
});
app.addService('substituteService', {
    serviceClass: SubstituteService
});

app.addSubApp('headerApp', {
    subAppClass: HeaderApp,
    region: layout.getRegion('headerRegion')
});

app.addSubApp('medicineApp', {
    subAppClass: MedicineApp,
    region: layout.getRegion('mainRegion')
});

Backbone.history.start();