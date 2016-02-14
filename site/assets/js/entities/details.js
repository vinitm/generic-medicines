MedicineManager.module("Entities", function (Entities, MedicineManager, Backbone, Marionette, $, _) {
    Entities.Detail = Backbone.Model.extend({
        default: {
            "productId": "default",
            "productName": "default",
            "manufacturer": "default",
            "compositionName": "default",
            "compositionId": null,
            "productAuditForm": "default",
            "mrp": -1,
            "unitPrice": -1,
            "packSize": -1,
            "molecules": [],
            "formGroups": null,
            "invoiceCategoryId": "default",
            "tax": -1,
            "productType": "default",
            "drugSchedule": null,
            "productFullName": null,
            "productLongDescription": null,
            "brandName": null,
            "productFormName": "default",
            "productVariants": null,
            "productCategoryIds": null,
            "productResonMessages": null
        },
        getId: function () {
            return this.get('productId');
        },
        getUnitPrice: function () {
            return this.get('mrp') / this.get('packSize');
        },
        getConstituents: function () {
            var arr = this.get('compositionName').split('+');
            return arr;
        },
        getPackPrice: function () {
            return this.get('mrp');
        },
        getType: function () {
            return this.get('productAuditForm');
        },
        getBrandName: function () {
            return this.get('productName');
        },
        getPackSize: function () {
            return this.get('packSize');
        },
        getManufacturer: function () {
            return this.get('manufacturer');
        },
        mutators: {
            id: {
                get: function () {
                    return this.get('productId');
                },
                transient: true
            },
            unitPrice: {
                get: function () {
                    return this.get('mrp') / this.get('packSize');
                },
                transient: true
            },
            constituents: {
                get: function () {
                    var arr = this.get('compositionName').split('+');
                    return arr;
                },
                transient: true
            },
            packPrice: {
                get: function () {
                    return this.get('mrp');
                },
                transient: true
            },
            type: {
                get: function () {
                    return this.get('productAuditForm');
                },
                transient: true
            },
            brandName: {
                get: function () {
                    return this.get('productName');
                },
                transient: true
            }
        }
    });

    var API = {
        getDetail: function (medicine) {
            var detail = new Entities.Detail();
            detail.url = "/medicine_details/?id=" + encodeURIComponent(medicine);
            return detail.fetch().then(function () {
                return detail;
            });
        }
    };

    MedicineManager.reqres.setHandler("details:entities", function (medicine) {
        return API.getDetail(medicine);
    });

});