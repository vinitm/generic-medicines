var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var $ = require('jquery');
require('bootstrap');
require('datatables.net-responsive')();
MedicineManager.module("MedicineApp.Show", function (Show) {
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
                            return "<a class='show' href='show/" + encodeURI(data) + "'>" + data + "</a>";
                        },
                        title: "Brand"
                    }, {
                        data: "package_qty",
                        title: "Pack"
                    }, {
                        data: "package_price",
                        title: "Price",
                        render: function (data, type, row) {
                            var template = require('./price-column_template.tpl');
                            return template({
                                price: data
                            });
                        }.bind(this)
                    }, {
                        render: function (data, type, row) {
                            var difference = (row.unit_price * 100 / this.referencePrice).toFixed(1);
                            var template = require('./cheaper-costlier-column_template.tpl');
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
        template: require("./layout_template.tpl"),
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