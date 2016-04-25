var MedicineManager = require('MedicineManager');
var Backbone = require('backbone');
require('backbone.select');
var headerChannel = require('backbone.radio').channel('header');
MedicineManager.module("Entities", function (Entities) {
    Entities.Header = Backbone.Model.extend({
        initialize: function () {
            Backbone.Select.Me.applyTo(this);
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function (models, options) {
            Backbone.Select.One.applyTo(this, models, options);
        }
    });

    var initializeHeaders = function () {
        Entities.headers = new Entities.HeaderCollection([
            {
                name: "About",
                url: "about"
            }
        ]);
    };

    var API = {
        getHeaders: function () {
            if (Entities.headers === undefined) {
                initializeHeaders();
            }
            return Entities.headers;
        }
    };

    headerChannel.reply("header", function () {
        return API.getHeaders();
    });
});