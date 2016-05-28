var Marionette = require('backbone.marionette');
var $ = require('jquery');
var radio = require('backbone.radio');
var medicineChannel = radio.channel('medicine');

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

        //recently viewed
        var recentlyViewedComponent = new RecentlyViewed({
            region: this.view.recentlyViewedRegion,
            collection: recentlyViewed
        });
        this.listenTo(recentlyViewedComponent, "link:click", this.showSubstitute);
        recentlyViewedComponent.show();

        detailsFetched.then(function (details) {
            if (!$.contains(document, this.view.$el[0])) {
                //if layout is detached
                return;
            }

            //medicine name in title
            var titleComponent = new Title({
                region: this.view.titleRegion,
                model: details
            });
            titleComponent.show();

            //view showing details of medicine
            var detailsComponent = new Details({
                region: this.view.detailsRegion,
                model: details
            });
            detailsComponent.show();


            //medicine substitutes
            var substitutesComponent = new Substitutes({
                region: this.view.substitutesRegion,
                model: details
            });
            this.listenTo(substitutesComponent, "link:click", this.showSubstitute);
            substitutesComponent.show();


            //cheapest substitutes
            var cheapestSubstitutesComponent = new CheapestSubstitutes({
                region: this.view.cheapestSubstitutesRegion,
                model: details
            });
            this.listenTo(cheapestSubstitutesComponent, "link:click", this.showSubstitute);
            cheapestSubstitutesComponent.show();


        }.bind(this));
    },
    showSubstitute: function (medicine) {
        this.trigger("suggestion:select", medicine);
    }
});