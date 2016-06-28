var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend({
    el: '#app',
    regions: {
        headerRegion: "#header-region",
        mainRegion: "#main-region",
        modalRegion: "#modal-region",
        footerRegion:"#footer-region"
    }
});