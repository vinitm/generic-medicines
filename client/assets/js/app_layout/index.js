var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend({
    template: require('./layout.tpl'),
    regions: {
        headerRegion: "#header-region",
        mainRegion: "#main-region"
    }
});