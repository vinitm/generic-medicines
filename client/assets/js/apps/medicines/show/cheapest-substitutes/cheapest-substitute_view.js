var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views = require('common');
var CheapestSubstitutesItem = Marionette.ItemView.extend({
    tagName: "li",
    template: require('./listItem_template.tpl'),
    events: {
        'click a': 'linkClicked'
    },
    linkClicked: function (e) {
        e.preventDefault();
        this.trigger("link:clicked");
    }
});

var CheapestSubstitutesList = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "material-list",
    childView: CheapestSubstitutesItem,
    onChildviewLinkClicked: function (childView) {
        this.triggerMethod("brand:clicked", childView.model.get('brand'));
    }
});

var ChartLayout = Marionette.LayoutView.extend({
    template: require('./chart_template.tpl'),
    regions: {
        "chartRegion": "#chart-region"
    },
    initialize: function (options) {
        this.medicinePrice = options.medicinePrice;
        this.cheapestSubstitutePrice = options.cheapestSubstitutePrice;
        this.model = new Backbone.Model({
            medicinePrice: this.medicinePrice,
            cheapestSubstitutePrice: this.cheapestSubstitutePrice
        });
    },
    onShow: function () {
        var chartView = new Views.Chart({
            set: this.medicinePrice,
            subset: this.cheapestSubstitutePrice
        });
        this.chartRegion.show(chartView);
    }
});
module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
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

        var chartView = new ChartLayout({
            medicinePrice: medicinePrice,
            cheapestSubstitutePrice: cheapestSubstitutePrice
        });
        this.chartRegion.show(chartView);

        var listView = new CheapestSubstitutesList({
            collection: new Backbone.Collection(this.cheapestSubstitutes)
        });
        this.listRegion.show(listView);
    }
});