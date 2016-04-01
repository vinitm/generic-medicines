var MedicineManager = require('MedicineManager');
MedicineManager.module("MedicineApp.Show", function (Show) {
    Show.Loader = MedicineManager.Common.Views.Loading.extend({
        attributes: {
            style: 'height: 100%;width: 100%;position: absolute;top: 0px;left: 0px;'
        }
    });
});