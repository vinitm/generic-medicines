var Marionette = require('backbone.marionette');
var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var $ = require('jquery');
var radio = require('backbone.radio');
var medicineChannel = radio.channel('medicine');
var globalChannel = radio.channel('global');

var LayoutView = require('./show_view');
var Loader = require('./loader/loader_view');
var RecentlyViewed = require('./recently-viewed/recently-viewed_component');
var Title = require('./title/title_component');
var Details = require('./details/details_component');
var Substitutes = require('./substitutes/substitutes_component');
var CheapestSubstitutes = require('./cheapest-substitutes/cheapest-substitute_component');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
    },
    showMedicine: function (medicine) {
        this.view = new LayoutView();
        this.region.show(this.view);

        var detailsFetched = medicineChannel.request("details", medicine);
        var recentlyViewed = medicineChannel.request("recentlyViewed");

        //show loading view while the information is loaded
        this.view.regionManager.each(function (region) {
            var loadingView = new Loader({
                width: 20
            });
            region.show(loadingView);
        });

        detailsFetched.then(function (details) {
            if (!$.contains(document, this.view.$el[0])) {
                //if layout is detached
                return;
            }

            var medicineDetails = new Backbone.Model(details.get('details'));
            var SubtituteCollection = medicineChannel.request('substitute');
            var medicineSubstitutes = new SubtituteCollection(details.get('alternatives'));


            //recently viewed
            var recentlyViewedComponent = new RecentlyViewed({
                region: this.view.recentlyViewedRegion,
                collection: recentlyViewed
            });
            this.listenTo(recentlyViewedComponent, "link:click", this.showSubstitute);
            recentlyViewedComponent.show();

            //medicine name in title
            var titleComponent = new Title({
                region: this.view.titleRegion,
                model: medicineDetails
            });
            titleComponent.show();

            //view showing details of medicine
            var detailsComponent = new Details({
                region: this.view.detailsRegion,
                model: medicineDetails
            });
            detailsComponent.show();


            //medicine substitutes
            var substitutesComponent = new Substitutes({
                region: this.view.substitutesRegion,
                collection: medicineSubstitutes,
                referencePrice: medicineDetails.get("medicine")["unit_price"]
            });
            this.listenTo(substitutesComponent, "link:click", this.showSubstitute);
            substitutesComponent.show();


            //cheapest substitutes
            var cheapestSubstitutesComponent = new CheapestSubstitutes({
                region: this.view.cheapestSubstitutesRegion,
                substitutes: medicineSubstitutes,
                medicine: medicineDetails
            });
            this.listenTo(cheapestSubstitutesComponent, "link:click", this.showSubstitute);
            cheapestSubstitutesComponent.show();


        }.bind(this));
    },
    showSubstitute: function (medicine) {
        globalChannel.request("medicine:show", medicine);
    }
});