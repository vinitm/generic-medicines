var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
	template: require('./layout_template.tpl'),
	className: 'container row'
});
