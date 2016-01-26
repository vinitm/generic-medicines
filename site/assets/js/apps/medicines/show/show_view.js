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

    Show.CheapestSubstitute = Marionette.LayoutView.extend({
        template: "#cheapest_substitute-template",
        className: "mcard",
        tagName: "div",
        id: "cheapest_substitute",
        regions: {
        "chartRegion":"#chart-region"
        },
        onShow: function () {
         //this.$el.
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
        }
    });
});