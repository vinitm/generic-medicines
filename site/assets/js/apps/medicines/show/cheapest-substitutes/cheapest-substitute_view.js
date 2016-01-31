MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.CheapestSubstitutesItem = Marionette.ItemView.extend({
        tagName: "li",
        template: "#cheapest-substitutes-list-template"
    });

    Show.CheapestSubstitutesList = Marionette.CollectionView.extend({
        tagName: "ul",
        className: "material-list",
        childView: Show.CheapestSubstitutesItem
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
            new Chart(ctx).Pie(data);
        }
    });

    Show.CheapestSubstitutes = Marionette.LayoutView.extend({
        template: "#cheapest_substitute-template",
        className: "mcard",
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
        onShow: function () {
            var cheapestSubstitutePrice = this.cheapestSubstitutes[0].get("unit_price");
            var medicinePrice = this.medicine.get("medicine")["unit_price"];

            var chartView = new Show.Chart({
                set: medicinePrice,
                subset: cheapestSubstitutePrice
            });
            this.chartRegion.show(chartView);

            var listView = new Show.CheapestSubstitutesList({
                collection: new Backbone.Collection(this.cheapestSubstitutes)
            });
            this.listRegion.show(listView);
        }
    });
});