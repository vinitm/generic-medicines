var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var medicineChannel = require('backbone.radio').channel('medicine');

module.exports = Marionette.Object.extend({
    initialize: function () {
        var self = this;
        medicineChannel.reply("details", function (medicine) {
            return self.getDetail(medicine);
        });
    },
    getDetail: function (medicine) {
        var detail = new Backbone.Model();
        detail.url = "/medicine_details/?id=" + encodeURIComponent(medicine);
        return detail.fetch().then(function () {
            return detail;
        });
    }
});