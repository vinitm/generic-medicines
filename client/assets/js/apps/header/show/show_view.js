var Marionette = require('backbone.marionette');


module.exports = Marionette.LayoutView.extend({
    template: require('./show_template.tpl'),
    className: "navbar navbar-default navbar-fixed-top",
    regions: {
        inputRegion: '#inputRegion',
        buttonRegion: '#buttonRegion'
    },
    events: {
        "click a.navbar-brand": "brandClicked"
    },
    brandClicked: function (e) {
        e.preventDefault();
        this.trigger("brand:clicked");
    }
});

/*events:
[
    events:"brand:clicked"
]
*/