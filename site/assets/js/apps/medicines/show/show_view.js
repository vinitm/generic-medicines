MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.LayoutView = Marionette.LayoutView.extend({
        template: "#show-layout-template",
        tagName: "div",
        id: "main",
        className: "row",
        regions: {
            "titleRegion": "#title-region",
            "detailsRegion": "#details-region",
            "cheapestSubstituteRegion": "#cheapest_substitute-region",
            "substitutesRegion": "#substitutes-region"
        }
    });

    Show.Title = Marionette.ItemView.extend({
        template: "#title-template",
        className: "mcard",
        tagName: "div",
        id: "title"
    });

    Show.Details = Marionette.ItemView.extend({
        template: "#details-template",
        className: "mcard",
        tagName: "div",
        id: "details"
    });

    Show.Chart = Marionette.ItemView.extend({
        template: false,
        tagName: "canvas",
        id: "chartContainer",
        onShow: function () {
            Chart.defaults.global.responsive = true;
            Chart.defaults.global.showTooltips = false;
            var ctx = this.$el.getContext("2d");
            var data = [{
                    value: this.set - this.subset,
                    color: "#bdc3c7",
                    label: "Grey"
                },
                {
                    value: this.set,
                    color: "#81C784",
                    label: "Green"
                }];
            new Chart(ctx).Pie(data);
        }
    });

    Show.CheapestSubstitute = Marionette.LayoutView.extend({
        template: "#cheapest_substitute-template",
        className: "mcard",
        tagName: "div",
        id: "cheapest_substitute",
        regions: {
            "chartRegion": "#chart-region"
        },
        getCheapest: function () {
            //var benchmark = this.medicine.get("unit_price");
            var attributeValue = null;
            return 48;
        },
        onShow: function () {
            var cheapestAlternatives = this.getCheapest();
            var cheapestPrice = 48; //cheapestAlternatives.get("unit_price");
            var medicinePrice = 19; //this.medicine.get("unit_price");

            var chartView = new Show.Chart({
                set: medicinePrice,
                subset: cheapestPrice
            });
            this.chartRegion.show(chartView);
        }
    });

    Show.Table = Marionette.ItemView.extend({
        template: false,
        className: "table table-striped table-bordered dt-responsive",
        tagName: "table",
        id: "substituteTable",
        attributes: function () {
            return {
                width: "100%"
            };
        },
        onShow: function () {
            this.$el.DataTable({
                responsive: true,
                data: this.collection.toJSON(),
                columns: [{
                        data: "brand",
                        title: "Brand"
                }, {
                        data: "package_qty",
                        title: "Pack"
                }, {
                        data: "package_price",
                        title: "Price"
                }
                    /*, {
                                        data:"",
                                        title: "Cheaper/Costlier"
                                    }*/
                    ]
            });
        }
    });

    Show.Substitutes = Marionette.LayoutView.extend({
        template: "#substitutes-template",
        className: "mcard",
        tagName: "div",
        id: "cheapest_substitute",
        regions: {
            "tableRegion": "#table-region"
        },
        onShow: function () {
            var tableView = new Show.Table({
                collection: this.collection
            });
            this.tableRegion.show(tableView);
        }
    });
});