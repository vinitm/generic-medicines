var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var View = require('./show_view');
var ExpandableSearchBarComponent = require('./ExpandableSearchBar/ExpandableSearchBar_component');

var components = {};
module.exports = Marionette.Object.extend({
    addComponent: function (key, component) {
        components[key] = component;
    },
    removeComponent: function (key) {
        delete components[key];
    },
    getComponent: function (key) {
        return components[key];
    },
    initialize: function (options) {
        this.view = new View();
        var self = this;
        this.view.on("brand:clicked", function () {
            self.trigger("brand:clicked");
        });
        this.region = options.region;
    },
    show: function () {
        var self = this;
        this.region.show(this.view);
        var expandableSearchBarComponent = new ExpandableSearchBarComponent({
            region: this.view.inputRegion
        });
        expandableSearchBarComponent.on("suggestion:select", function (suggestion) {
            var model = new Backbone.Model(suggestion);
            self.trigger("suggestion:select", model);
        });

        this.addComponent('expandableSearchBar', expandableSearchBarComponent);
        expandableSearchBarComponent.show();
    },
    setSearchVisible: function (visible) {
        if (visible)
            this.getComponent('expandableSearchBar').showComponent();
        else
            this.getComponent('expandableSearchBar').hideComponent();
    }
});

/*events:
[
    show:"brand:clicked",
    show:"suggestion:select"
]
*/