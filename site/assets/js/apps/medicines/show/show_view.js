MedicineManager.module("MedicineApp.Show", function (Show, MedicineManager, Backbone, Marionette, $, _) {
    Show.LayoutView = Marionette.LayoutView.extend({
        template: "#show-layout-template",
        tagName: "div",
        id: "main",
        className: "row",
        regions: {
            "titleRegion": "#title-region",
            "detailsRegion": "#details-region",
            "cheapestSubstitutesRegion": "#cheapest_substitutes-region",
            "substitutesRegion": "#substitutes-region"
        },
        childEvents: {
            "substitute:show": "onChildSubstituteShow"
        },
        onChildSubstituteShow: function (view, text) {
            this.trigger("substitute:show", text);
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

    Show.CheapestSubstitutesItem = Marionette.ItemView.extend({
        tagName: "li",
        template: "#cheapest-substitutes-list-template"
    });

    Show.CheapestSubstitutesList = Marionette.CollectionView.extend({
        tagName: "ul",
        className: "material-list",
        childView: Show.CheapestSubstitutesItem
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

    Show.Table = Marionette.ItemView.extend({
        template: false,
        className: "table table-striped table-bordered dt-responsive",
        tagName: "table",
        id: "substituteTable",
        events: {
            "click .show": "linkClicked"
        },
        linkClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var text = $(e.currentTarget).text();
            this.triggerMethod("link:click", text);
        },
        attributes: function () {
            return {
                width: "100%"
            };
        },
        initialize: function (options) {
            this.referencePrice = options.referencePrice;
        },
        onShow: function () {
            this.$el.DataTable({
                responsive: true,
                data: this.collection.toJSON(),
                columns: [{
                        data: "brand",
                        render: function (data, type, row) {
                            return "<a class='show' href='#'>" + data + "</a>";
                        },
                        title: "Brand"
                    }, {
                        data: "package_qty",
                        title: "Pack"
                    }, {
                        data: "package_price",
                        title: "Price"
                    }, {
                        render: function (data, type, row) {
                            var difference = (row.unit_price * 100 / this.referencePrice).toFixed(1);
                            var template = _.template('<span class="<%if(difference<=100){%>text-success<%}else{%>text-danger<%}%>"><span><%=difference%>% </span><span class="glyphicon <%if(difference<=100){%>glyphicon-thumbs-up<%}else{%>glyphicon-thumbs-down<%}%>"></span></span>');
                            return template({
                                difference: difference
                            });
                        }.bind(this),
                        title: "Cheaper/Costlier"
					}
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
        childEvents: {
            "link:click": "onChildLinkClick"
        },
        onChildLinkClick: function (view, text) {
            this.triggerMethod("substitute:show", text);
        },
        initialize: function (options) {
            this.referencePrice = options.referencePrice;
        },
        onShow: function () {
            var tableView = new Show.Table({
                collection: this.collection,
                referencePrice: this.referencePrice
            });
            this.tableRegion.show(tableView);
        }
    });
});