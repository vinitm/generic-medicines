var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
	template: require('./template.tpl'),
	tagName: 'div',
	id: 'title'
});
