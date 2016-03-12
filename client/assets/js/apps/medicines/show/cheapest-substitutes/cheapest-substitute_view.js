var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Chart = require('chart.js');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.CheapestSubstitutesItem = Marionette.ItemView.extend({
        tagName: "li",
        template: "#cheapest-substitutes-list-template",
        events: {
            'click a': 'linkClicked'
        },
        linkClicked: function (e) {
            e.preventDefault();
            this.trigger("link:clicked");
        }
    });

    Show.CheapestSubstitutesList = Marionette.CollectionView.extend({
        tagName: "ul",
        className: "material-list",
        childView: Show.CheapestSubstitutesItem,
        onChildviewLinkClicked: function (childView) {
            this.triggerMethod("brand:clicked", childView.model.get('brand'));
        }
    });

    Show.Chart = Marionette.ItemView.extend({
        template: false,
        tagName: "canvas",
        id: "chartContainer",
        initialize: function (options) {
            this.set = options.set;
            this.subset = options.subset;
        },
        onShow: function () {
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.showTooltips = false;
            var ctx = this.$el.get(0).getContext("2d");
            var data = [{
                value: this.set - this.subset,
                color: "#bdc3c7",
                label: "Grey"
            }, {
                value: this.subset,
                color: "#81C784",
                label: "Green"
            }];
            this.chart = new Chart(ctx).Pie(data);
        },
        onDestroy: function () {
            this.chart.destroy();
        }
    });

    Show.ChartLayout = Marionette.LayoutView.extend({
        template: "#cheapest_substitute-chart-template",
        regions: {
            "chartRegion": "#chart-region"
        },
        initialize: function (options) {
            this.medicinePrice = options.medicinePrice;
            this.cheapestSubstitutePrice = options.cheapestSubstitutePrice;
        },
        onShow: function () {
            var chartView = new Show.Chart({
                set: this.medicinePrice,
                subset: this.cheapestSubstitutePrice
            });
            this.chartRegion.show(chartView);
        }
    });

    Show.CheapestSubstitutes = Marionette.LayoutView.extend({
        template: "#cheapest_substitute-template",
        tagName: "div",
        id: "cheapest_substitute",
        regions: {
            "chartRegion": "#chart-region",
            "listRegion": "#substitutes-list-region"
        },
        initialize: function (options) {
            this.medicine = options.medicine;
            this.substitutes = options.substitutes;
            this.cheapestSubstitutes = this.substitutes.getCheapestSubstitutes();
        },
        childEvents: {
            'brand:clicked': 'onChildBrandClicked'
        },
        onChildBrandClicked: function (childView, brand) {
            this.trigger("substitute:show", brand);
        },
        onShow: function () {
            var cheapestSubstitutePrice = this.cheapestSubstitutes[0].get("unit_price");
            var medicinePrice = this.medicine.get("medicine")["unit_price"];

            var chartView = new Show.ChartLayout({
                medicinePrice: medicinePrice,
                cheapestSubstitutePrice: cheapestSubstitutePrice
            });
            this.chartRegion.show(chartView);

            var listView = new Show.CheapestSubstitutesList({
                collection: new Backbone.Collection(this.cheapestSubstitutes)
            });
            this.listRegion.show(listView);
        }
    });
});