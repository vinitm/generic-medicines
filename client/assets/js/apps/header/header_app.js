var MedicineManager = require('MedicineManager');
var headerChannel = require('backbone.radio').channel('header');
var Show = require('./show');
MedicineManager.module("HeaderApp", function (Header) {
    var API = {
        showHeader: function () {
            Show.showHeader();
        }
    };

    headerChannel.reply("set:search:visiblity", Show.setSearchVisibility);

    Header.on("start", function () {
        API.showHeader();
    });
});