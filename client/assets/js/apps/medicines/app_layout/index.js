var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend({
    template: require('./layout.tpl'),
    regions: {
        mainRegion: "#medicine-main-region"
    }
});