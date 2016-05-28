var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template: require('./layout_template.tpl'),
    className: 'container',
    ui: {
        about: '.aboutLink'
    },
    events: {
        'click @ui.about': 'onAboutClick'
    },
    onAboutClick: function (e) {
        e.preventDefault();
        this.trigger('link:about');
    }
});