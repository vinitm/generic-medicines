var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var jQuery = require("jquery");
var Chart = require('chart.js');
var typeahead = require("typeahead.js-browserify");
var Bloodhound=typeahead.Bloodhound;
typeahead.loadjQueryPlugin();
MedicineManager.module("Common.Views", function (Views) {

    Views.Loading = Marionette.ItemView.extend({
        template: require('./loading_template.tpl'),
        className: "col-xs-12"
    });

    Views.EmptyView = Marionette.ItemView.extend({
        template: _.template("<p style='text-align:center'><%=message%></p>"),
        className: "col-xs-12 text-danger",
        initialize: function (options) {
            this.model = new Backbone.Model({
                message: options.message
            });
        }
    });
    
    
    Views.Typeahead = Marionette.ItemView.extend({
        template: false,
        tagName: "input",
        className: "searchInput",
        events: {
            "typeahead:select": "onTypeheadSelect"
        },
        onTypeheadSelect: function (event, suggest) {
            this.triggerMethod('suggestion:select', suggest);
        },
        onShow: function () {
            console.log('onshow');
            // constructs the suggestion engine
            var engine = new Bloodhound({
                datumTokenizer: function (item) {
                    return Bloodhound.tokenizers.whitespace(item.suggestion);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/medicine_suggestions/?id=%QUERY',
                    wildcard: '%QUERY'
                },
                transform: function (response) {
                    return response.suggestions;
                }
            });

            this.$el.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                limit: "50",
                displayKey: 'suggestion',
                name: 'suggestions',
                source: engine
            });
        }
    });
    
    

    Views.Chart = Marionette.ItemView.extend({
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

});