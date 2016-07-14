var Marionette = require('backbone.marionette');
module.exports = Marionette.AppRouter.extend({
	appRoutes: {
		'': 'showSearchOption',
		'medicines/show/*id': 'showMedicine'
	}
});
