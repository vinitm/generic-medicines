// main.js
var $ = global.jQuery = require('jquery');

// Load up app...
var App = require('./app');
var Backbone = require('backbone');
var AppLayout = require('./app_layout');

var DetailsService = require('./entities/details');
var RecentlyViewedService = require('./entities/recently-viewed');

var HeaderApp = require('./apps/header/header_app');
var FooterApp = require('./apps/footer/footer_app');
var MedicineApp = require('./apps/medicines/medicines_app');
var AboutApp = require('./apps/about/about_app');

var app = new App();
var layout = new AppLayout();

app.addService('detailsService', {
    serviceClass: DetailsService
});
app.addService('recentlyViewedService', {
    serviceClass: RecentlyViewedService
});

app.addSubApp('headerApp', {
    subAppClass: HeaderApp,
    region: layout.getRegion('headerRegion')
});

app.addSubApp('footerApp', {
    subAppClass: FooterApp,
    region: layout.getRegion('footerRegion')
});

app.addSubApp('aboutApp', {
    subAppClass: AboutApp,
    region: layout.getRegion('mainRegion')
});

app.addSubApp('medicineApp', {
    subAppClass: MedicineApp,
    region: layout.getRegion('mainRegion')
});

var headerApp = app.getSubApp('headerApp');
var medicineApp = app.getSubApp('medicineApp');
var footerApp = app.getSubApp('footerApp');
var aboutApp = app.getSubApp('aboutApp');

var recentlyViewedService = app.getService('recentlyViewedService');

app.listenTo(headerApp, "brand:clicked", function () {
    medicineApp.showSearchOption();
});
app.listenTo(headerApp, "suggestion:select", function (suggestion) {
    medicineApp.showMedicine(suggestion);
});

app.listenTo(footerApp, "show:about", function () {
    aboutApp.show();
});

app.listenTo(medicineApp, "search", function () {
    headerApp.setSearchVisibility(false);
});
app.listenTo(medicineApp, "show", function (medicine) {
    headerApp.setSearchVisibility(true);
    recentlyViewedService.addItem(medicine);
});

Backbone.history.start();