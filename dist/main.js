(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var navChannel = require('backbone.radio').channel('nav');

module.exports = Marionette.Application.extend({
    initialize: function () {
        var self = this;
        this._subApps = {};
        this._services = {};
        navChannel.reply('navigate', function (route, options) {
            self._navigate(route, options);
        });
    },
    _getCurrentRoute: function () {
        return Backbone.history.fragment;
    },
    _navigate: function (route, options) {
        if (this._getCurrentRoute() === route) {
            return;
        }
        options || (options = {});
        Backbone.history.navigate(route, options);
    },
    getSubApp: function (name) {
        return this._subApps[name];
    },
    getService: function (name) {
        return this._services[name];
    },
    addService: function (name, options) {
        var serviceOptions = _.omit(options, 'serviceClass');
        var service = new options.serviceClass(serviceOptions);
        this._services[name] = service;
    },
    addSubApp: function (name, options) {
        var subAppOptions = _.omit(options, 'subAppClass');
        var subApp = new options.subAppClass(subAppOptions);
        this._subApps[name] = subApp;
    }
});
},{"backbone":"backbone","backbone.marionette":"backbone.marionette","backbone.radio":55,"underscore":"underscore"}],2:[function(require,module,exports){
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
},{"backbone.marionette":"backbone.marionette"}],3:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Show = require('./show');
var Router = require('./router');
var navChannel = require('backbone.radio').channel('nav');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.router = new Router({
            controller: this
        });
    },
    show: function () {
        navChannel.request('navigate', "about");
        this.showController.show();
    }
});
},{"./router":4,"./show":5,"backbone.marionette":"backbone.marionette","backbone.radio":55}],4:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        "about": "show",
    }
});
},{"backbone.marionette":"backbone.marionette"}],5:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./show_view');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.view = new View();
        this.region = options.region;
    },
    show: function () {
        this.region.show(this.view);
    }
});
},{"./show_view":7,"backbone.marionette":"backbone.marionette"}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="mcard-container col-xs-12">\r\n    <div class="mcard">\r\n        <div class="mcard-title mcard-title-center">About</div>\r\n        <div id="details-region" class="mcard-content row">\r\n            <p>sdkhgslakvjbds;v.kjab;nsdlvka;sldfhbv;asjfdbvajksvb;</p>\r\n        </div>\r\n    </div>\r\n</div>';
}
return __p;
};

},{}],7:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template: require('./layout_template.tpl'),
    className: 'container row'
});
},{"./layout_template.tpl":6,"backbone.marionette":"backbone.marionette"}],8:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Show = require('./show');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.showFooter();
        this.listenTo(this.showController, "show:about", function () {
            this.trigger("show:about");
        });
    },
    showFooter: function () {
        this.showController.show();
    }
});
},{"./show":9,"backbone.marionette":"backbone.marionette"}],9:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./show_view');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.view = new View();
        var self = this;
        this.view.on("link:about", function () {
            self.trigger("show:about");
        });
        this.region = options.region;
    },
    show: function () {
        this.region.show(this.view);
    }
});
},{"./show_view":11,"backbone.marionette":"backbone.marionette"}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="container">\r\n    <p class="pull-left">© 2016 - Site Built By <a href="https://github.com/vinitm" target="_blank">Vinit</a></p>\r\n    <a href="#about" class="aboutLink pull-right">About</a>\r\n</div>';
}
return __p;
};

},{}],11:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template: require('./layout_template.tpl'),
    className: 'navbar navbar-default',
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
},{"./layout_template.tpl":10,"backbone.marionette":"backbone.marionette"}],12:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Show = require('./show');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.showHeader();
        this.listenTo(this.showController, "brand:clicked", function () {
            this.trigger("brand:clicked");
        });
        this.listenTo(this.showController, "suggestion:select", function (suggestion) {
            this.trigger("suggestion:select",suggestion.get("suggestion"));
        });
    },
    setSearchVisibility: function (visible) {
        this.showController.setSearchVisible(visible);
    },
    showHeader: function () {
        this.showController.show();
    }
});
},{"./show":16,"backbone.marionette":"backbone.marionette"}],13:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./ExpandableSearchBar_view.js');
var CommonViews = require('common');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.view = new View();
    },
    events: {
        'click button.btn': 'onSearchButtonClick'
    },
    onSearchButtonClick: function () {
        this.hideSearch();
    },
    show: function () {
        this.region.show(this.view);
        var input = new CommonViews.Typeahead({
            scale: 0.1
        });
        this.view.searchRegion.show(input);
        input.hide();

        this.view.on('search:click', function (event) {
            event.preventDefault();
            input.toggleVisibility();
        });

        this.view.on('suggestion:select', function (suggest,x) {
            this.trigger('suggestion:select', suggest);
        }.bind(this));
    },
    hideComponent: function () {
        this.view.$el.hide();
    },
    showComponent: function () {
        this.view.$el.show();
    },
    hideSearch: function () {
        this.searchRegion.currentView.hide();
    },
    showSearch: function () {
        this.searchRegion.currentView.show();
    }
});
},{"./ExpandableSearchBar_view.js":14,"backbone.marionette":"backbone.marionette","common":49}],14:[function(require,module,exports){
var Marionette = require('backbone.marionette');


module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
    tagName: "div",
    className: "row",
    regions: {
        "searchRegion": "#searchRegion"
    },
    events: {
        'click button.btn': 'onSearchButtonClick'
    },
    childEvents:{
        'suggestion:select':'onSuggestionSelect'
    },
    onSearchButtonClick: function (event) {
        this.trigger("search:click", event);
    },
    onSuggestionSelect: function (view,suggest) {
        this.trigger("suggestion:select", suggest);
    }
});
},{"./layout_template.tpl":15,"backbone.marionette":"backbone.marionette"}],15:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="col-xs-11" id="searchRegion"></span>\r\n<!--<div class="input-group-btn">-->\r\n<button class="btn col-xs-1">\r\n    <i class="fa fa-search" aria-hidden="true"></i>\r\n</button>\r\n<!--</div>-->';
}
return __p;
};

},{}],16:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var View = require('./show_view');
var ExpandableSearchBarComponent = require('./ExpandableSearchBar/ExpandableSearchBar_component');

var components = {};
module.exports = Marionette.Object.extend({
    addComponent: function (key, component) {
        components[key] = component;
    },
    removeComponent: function (key) {
        delete components[key];
    },
    getComponent: function (key) {
        return components[key];
    },
    initialize: function (options) {
        this.view = new View();
        var self = this;
        this.view.on("brand:clicked", function () {
            self.trigger("brand:clicked");
        });
        this.region = options.region;
    },
    show: function () {
        var self = this;
        this.region.show(this.view);
        var expandableSearchBarComponent = new ExpandableSearchBarComponent({
            region: this.view.inputRegion
        });
        expandableSearchBarComponent.on("suggestion:select", function (suggestion) {
            var model = new Backbone.Model(suggestion);
            self.trigger("suggestion:select", model);
        });

        this.addComponent('expandableSearchBar', expandableSearchBarComponent);
        expandableSearchBarComponent.show();
    },
    setSearchVisible: function (visible) {
        if (visible)
            this.getComponent('expandableSearchBar').showComponent();
        else
            this.getComponent('expandableSearchBar').hideComponent();
    }
});

/*events:
[
    show:"brand:clicked",
    show:"suggestion:select"
]
*/
},{"./ExpandableSearchBar/ExpandableSearchBar_component":13,"./show_view":18,"backbone":"backbone","backbone.marionette":"backbone.marionette"}],17:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="container" style="position: relative">\r\n    <div class="navbar-header pull-left">\r\n        <a class="navbar-brand" href="/">\r\n            <img alt="Brand" width="30" height="30" src="navbar_icon.png">\r\n            <span>MedAlt</span>\r\n        </a>\r\n    </div>\r\n    <div id="inputRegion">\r\n    </div>\r\n</div>';
}
return __p;
};

},{}],18:[function(require,module,exports){
var Marionette = require('backbone.marionette');


module.exports = Marionette.LayoutView.extend({
    template: require('./show_template.tpl'),
    className: "navbar navbar-default navbar-fixed-top",
    regions: {
        inputRegion: '#inputRegion',
        buttonRegion: '#buttonRegion'
    },
    events: {
        "click a.navbar-brand": "brandClicked"
    },
    brandClicked: function (e) {
        e.preventDefault();
        this.trigger("brand:clicked");
    }
});

/*events:
[
    events:"brand:clicked"
]
*/
},{"./show_template.tpl":17,"backbone.marionette":"backbone.marionette"}],19:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var radio = require('backbone.radio');
var medicineChannel = radio.channel('medicine');
var navChannel = radio.channel('nav');

var Search = require('./search/search_app');
var Show = require('./show/show_app');
var Router = require('./router');


module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.showController = new Show(options);
        this.searchController = new Search(options);
        this.router = new Router({
            controller: this
        });
        this._listenToControllers();
    },
    _listenToControllers: function () {
        var self = this;
        this.listenTo(this.searchController, "suggestion:select", function (suggestion) {
            self.showMedicine((suggestion.get && suggestion.get("suggestion")) || suggestion);
        });
        this.listenTo(this.showController, "suggestion:select", function (suggestion) {
            self.showMedicine((suggestion.get && suggestion.get("suggestion")) || suggestion);
        });
    },
    showSearchOption: function () {
        navChannel.request('navigate', "");
        this.searchController.showSearchOption();
        this.trigger('search');
    },
    showMedicine: function (medicine) {
        navChannel.request('navigate', "medicines/show/" + encodeURIComponent(medicine));
        medicineChannel.request("add:recentlyViewed", medicine);
        this.showController.showMedicine(medicine);
        this.trigger('show', medicine);
    }
});
},{"./router":20,"./search/search_app":21,"./show/show_app":38,"backbone.marionette":"backbone.marionette","backbone.radio":55}],20:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        "": "showSearchOption",
        "medicines/show/*id": "showMedicine"
    }
});
},{"backbone.marionette":"backbone.marionette"}],21:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./search_view');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
    },
    showSearchOption: function () {
        var self = this;
        this.view = new View();
        this.view.on("suggestion:select", function (suggestion) {
            self.trigger("suggestion:select", suggestion);
        });
        this.region.show(this.view);
    }
});

/*events:
[
    onChildSuggestionSelect : "suggestion:select"
]
*/
},{"./search_view":23,"backbone.marionette":"backbone.marionette"}],22:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id=\'search\'>\r\n    <img src="plus_icon.png" style="display: block;margin:auto;height:175px;width:175px;margin-bottom: 40px;" alt="background image">\r\n    <div id=\'inputRegion\'>\r\n\r\n    </div>\r\n</div>';
}
return __p;
};

},{}],23:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views=require('common');
module.exports = Marionette.LayoutView.extend({
    template: require('./search_template.tpl'),
    id: "searchContainer",
    regions: {
        inputRegion: "#inputRegion"
    },
    childEvents: {
        "suggestion:select": "onChildSuggestionSelect"
    },
    onChildSuggestionSelect: function (view, suggestion) {
        var model = new Backbone.Model(suggestion);
        this.trigger("suggestion:select", model);
    },
    onShow: function () {
        var search = new Views.Typeahead();
        this.inputRegion.show(search);

        //to page center
        this.inputRegion.$el.addClass('row');
        search.$el.parent().addClass('col-xs-12 col-md-offset-4 col-md-4');
    }
});


/*events:
[
    onChildSuggestionSelect : "suggestion:select"
]
*/
},{"./search_template.tpl":22,"backbone":"backbone","backbone.marionette":"backbone.marionette","common":49}],24:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="chart-region" class="col-sm-12">\r\n\r\n</div>\r\n<span class="text-success" style="display: inline-block;width: 100%;text-align: center;"><i class="fa fa-thumbs-up"></i><span> '+
((__t=(((1-(cheapestAlternatives[0].medicine.unit_price/medicine.unit_price))*100).toFixed(2)))==null?'':__t)+
'% Cheaper</span></span>\r\n\r\n\r\n\r\n\r\n\r\n\r\n';
}
return __p;
};

},{}],25:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var commonViews = require('common');
var View = require('./cheapest-substitute_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.model = options.model;
    },
    show: function () {
        if (this.model.get('cheapestAlternatives').length === 0) {
            this.view = new commonViews.EmptyView({
                message: "No substitutes found"
            });
        } else {
            this.view = new View({
                model: this.model
            });
            var self = this;
            this.view.on("link:click", function (suggestion) {
                self.trigger("link:click", suggestion);
            });
        }
        this.region.show(this.view);
    }
});
},{"./cheapest-substitute_view.js":26,"backbone.marionette":"backbone.marionette","common":49}],26:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Views = require('common');
var CheapestSubstitutesItem = Marionette.ItemView.extend({
    tagName: "li",
    template: require('./listItem_template.tpl'),
    initialize: function (model) {
        var Model = Backbone.Model.extend({
            mutators: {
                url: function () {
                    return '#medicines/show/' + encodeURI(this.get('brand'));
                }
            },
            parse: function (response) {
                return response.model.get('medicine');
            }
        });
        this.model = new Model(model, {
            parse: true
        });
    },
    events: {
        'click a': 'linkClicked'
    },
    linkClicked: function (e) {
        e.preventDefault();
        this.trigger("link:clicked");
    }
});

var CheapestSubstitutesList = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "material-list",
    childView: CheapestSubstitutesItem,
    onChildviewLinkClicked: function (childView) {
        this.triggerMethod("brand:clicked", childView.model.get('brand'));
    }
});

var ChartLayout = Marionette.LayoutView.extend({
    template: require('./chart_template.tpl'),
    regions: {
        "chartRegion": "#chart-region"
    },
    initialize: function (options) {
        this.model = options.model;
    },
    onShow: function () {
        var chartView = new Views.Chart({
            set: this.model.get('medicine').unit_price,
            subset: this.model.get('medicine').unit_price - this.model.get('cheapestAlternatives')[0].medicine.unit_price
        });
        this.chartRegion.show(chartView);
    }
});

module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
    tagName: "div",
    id: "cheapest_substitute",
    regions: {
        "chartRegion": "#chart-region",
        "listRegion": "#substitutes-list-region"
    },
    initialize: function (options) {
        this.model = options.model;
    },
    childEvents: {
        'brand:clicked': 'onChildBrandClicked'
    },
    onChildBrandClicked: function (childView, brand) {
        this.trigger("link:click", brand);
    },
    onShow: function () {

        var chartView = new ChartLayout({
            model: this.model
        });
        this.chartRegion.show(chartView);

        var listView = new CheapestSubstitutesList({
            collection: new Backbone.Collection(this.model.get('cheapestAlternatives'))
        });
        this.listRegion.show(listView);
    }
});
},{"./chart_template.tpl":24,"./layout_template.tpl":27,"./listItem_template.tpl":28,"backbone":"backbone","backbone.marionette":"backbone.marionette","common":49}],27:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="chart-region" class="col-sm-6">\r\n\r\n</div>\r\n<div id="substitutes-list-region" class="col-sm-6">\r\n\r\n</div>';
}
return __p;
};

},{}],28:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href=\''+
((__t=(url))==null?'':__t)+
'\'>\r\n    <h4>'+
((__t=( brand ))==null?'':__t)+
'</h4>\r\n</a>\r\n<i class="fa fa-inr"></i>\r\n'+
((__t=( unit_price ))==null?'':__t)+
'/unit';
}
return __p;
};

},{}],29:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./details_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.model = options.model;
    },
    show: function () {
        this.view = new View({
            model: this.model
        });
        this.region.show(this.view);
    }
}); 
},{"./details_view.js":30,"backbone.marionette":"backbone.marionette"}],30:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template: require('./template.tpl'),
    tagName: "div",
    id: "details"
}); 
},{"./template.tpl":31,"backbone.marionette":"backbone.marionette"}],31:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="details-item col-sm-6"><span class=\'tag\'>Brand:</span>\r\n'+
((__t=( medicine.brand ))==null?'':__t)+
'\r\n    </span>\r\n    <span class="details-item col-sm-6"><span class=\'tag\'>Manufacturer:</span>\r\n    '+
((__t=( medicine.manufacturer ))==null?'':__t)+
'\r\n        </span>\r\n        <span class="details-item col-sm-6"><span class=\'tag\'>Price:</span>\r\n        <i class="fa fa-inr"></i>\r\n        '+
((__t=( medicine.package_price ))==null?'':__t)+
'\r\n            </span>\r\n            <span class="details-item col-sm-6"><span class=\'tag\'>Package Quantity:</span>\r\n            '+
((__t=( medicine.package_qty ))==null?'':__t)+
'\r\n                </span>\r\n                <div class="details-item col-sm-12">\r\n                    <span class=\'tag\'>Constituents(Strength):&nbsp;</span>\r\n                    <div class=\'constituents\'>\r\n                        '+
((__t=(constituents.map(function(item){return "<span class='constituent'>"+item.name.trim()+"("+item.strength.trim()+")</span>";}).join("") ))==null?'':__t)+
'</div>\r\n                </div>';
}
return __p;
};

},{}],32:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<section id="sidebar" class="col-sm-3">\r\n    <div class="mcard-container">\r\n        <div class="mcard">\r\n            <div class="mcard-title mcard-title-center">Recently Viewed</div>\r\n            <div id="recently-viewed-region" class="mcard-content row"></div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<section id="content" class="row col-sm-9">\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div id="title-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Details</div>\r\n                <div id="details-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Cheapest Substitutes</div>\r\n                <div id="cheapest_substitutes-region" class="mcard-content clearfix"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Substitutes</div>\r\n                <div id="substitutes-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>';
}
return __p;
};

},{}],33:[function(require,module,exports){
var MedicineManager = require('MedicineManager');
var Views = require('common');
module.exports = Views.Loading.extend({
    attributes: {
        style: 'height: 100%;width: 100%;position: absolute;top: 0px;left: 0px;'
    }
});
},{"MedicineManager":1,"common":49}],34:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="list-region">\r\n\r\n</div>';
}
return __p;
};

},{}],35:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=(url))==null?'':__t)+
'" class="show">\r\n    '+
((__t=( medicine ))==null?'':__t)+
'\r\n</a>';
}
return __p;
};

},{}],36:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./recently-viewed_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.collection = options.collection;
    },
    show: function () {
        this.view = new View({
            collection: this.collection
        });
        var self=this;
        this.view.on("link:click", function (suggestion) {
            self.trigger("link:click", suggestion);
        });
        this.region.show(this.view);
    }
}); 
},{"./recently-viewed_view.js":37,"backbone.marionette":"backbone.marionette"}],37:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var $ = require('jquery');

var RecentlyViewedItem = Marionette.ItemView.extend({
    template: require("./listItem_template.tpl"),
    tagName: "li",
    events: {
        "click .show": "linkClicked"
    },
    linkClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var text = $(e.currentTarget).text().trim();
        this.trigger("link:click", text);
    }
});

var RecentlyViewed = Marionette.CollectionView.extend({
    childView: RecentlyViewedItem,
    tagName: "ul",
    className: "material-list",
    id: "recently-viewed",
    onChildviewLinkClick: function (view, text) {
        this.triggerMethod("link:click", text);
    }
});

module.exports = Marionette.LayoutView.extend({
    template: require("./layout_template.tpl"),
    regions: {
        "listRegion": "#list-region"
    },
    initialize: function (options) {
        options.collection = this.collection;
    },
    childEvents: {
        "link:click": "onChildLinkClick"
    },
    onChildLinkClick: function (view, text) {
        this.trigger("link:click", text);
    },
    onShow: function () {
        var list = new RecentlyViewed({
            collection: this.collection
        });
        this.listRegion.show(list);
    }
});
},{"./layout_template.tpl":34,"./listItem_template.tpl":35,"backbone.marionette":"backbone.marionette","jquery":"jquery"}],38:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var radio = require('backbone.radio');
var medicineChannel = radio.channel('medicine');

var LayoutView = require('./show_view');
var Loader = require('./loader/loader_view');
var RecentlyViewed = require('./recently-viewed/recently-viewed_component');
var Title = require('./title/title_component');
var Details = require('./details/details_component');
var Substitutes = require('./substitutes/substitutes_component');
var CheapestSubstitutes = require('./cheapest-substitutes/cheapest-substitute_component');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
    },
    showMedicine: function (medicine) {
        this.view = new LayoutView();
        this.region.show(this.view);

        var detailsFetched = medicineChannel.request("details", medicine);
        var recentlyViewed = medicineChannel.request("recentlyViewed");

        //show loading view while the information is loaded
        this.view.regionManager.each(function (region) {
            var loadingView = new Loader({
                width: 20
            });
            region.show(loadingView);
        });

        //recently viewed
        var recentlyViewedComponent = new RecentlyViewed({
            region: this.view.recentlyViewedRegion,
            collection: recentlyViewed
        });
        this.listenTo(recentlyViewedComponent, "link:click", this.showSubstitute);
        recentlyViewedComponent.show();

        detailsFetched.then(function (details) {
            if (!$.contains(document, this.view.$el[0])) {
                //if layout is detached
                return;
            }

            //medicine name in title
            var titleComponent = new Title({
                region: this.view.titleRegion,
                model: details
            });
            titleComponent.show();

            //view showing details of medicine
            var detailsComponent = new Details({
                region: this.view.detailsRegion,
                model: details
            });
            detailsComponent.show();


            //medicine substitutes
            var substitutesComponent = new Substitutes({
                region: this.view.substitutesRegion,
                model: details
            });
            this.listenTo(substitutesComponent, "link:click", this.showSubstitute);
            substitutesComponent.show();


            //cheapest substitutes
            var cheapestSubstitutesComponent = new CheapestSubstitutes({
                region: this.view.cheapestSubstitutesRegion,
                model: details
            });
            this.listenTo(cheapestSubstitutesComponent, "link:click", this.showSubstitute);
            cheapestSubstitutesComponent.show();


        }.bind(this));
    },
    showSubstitute: function (medicine) {
        this.trigger("suggestion:select", medicine);
    }
});
},{"./cheapest-substitutes/cheapest-substitute_component":25,"./details/details_component":29,"./loader/loader_view":33,"./recently-viewed/recently-viewed_component":36,"./show_view":39,"./substitutes/substitutes_component":43,"./title/title_component":46,"backbone.marionette":"backbone.marionette","backbone.radio":55,"jquery":"jquery"}],39:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.LayoutView.extend({
    template: require('./layout_template.tpl'),
    tagName: "div",
    id: "main",
    className: "row",
    regions: {
        "titleRegion": "#title-region",
        "detailsRegion": "#details-region",
        "cheapestSubstitutesRegion": "#cheapest_substitutes-region",
        "substitutesRegion": "#substitutes-region",
        "recentlyViewedRegion": "#recently-viewed-region"
    },
    childEvents: {
        "substitute:show": "onChildSubstituteShow",
    },
    onChildSubstituteShow: function (view, text) {
        this.trigger("substitute:show", text);
    }
});

/*events:
[
    onChildSubstituteShow : "substitute:show"
]
*/
},{"./layout_template.tpl":32,"backbone.marionette":"backbone.marionette"}],40:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="';
if(difference>=0){
__p+='text-success';
}else{
__p+='text-danger';
}
__p+='">\r\n';
if(difference>=0){
__p+='\r\n<span>'+
((__t=(difference))==null?'':__t)+
'% </span>\r\n';
}else{
__p+='\r\n<span>'+
((__t=((-1)*difference))==null?'':__t)+
'% </span>\r\n';
}
__p+='\r\n<i class="fa ';
if(difference>=0){
__p+='fa-thumbs-up';
}else{
__p+='fa-thumbs-down';
}
__p+='"></i></span>';
}
return __p;
};

},{}],41:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id="table-region">\r\n\r\n</div>';
}
return __p;
};

},{}],42:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<i class="fa fa-inr"></i><span>'+
((__t=( price ))==null?'':__t)+
'</span>';
}
return __p;
};

},{}],43:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var commonViews = require('common');
var View = require('./substitutes_view.js');
var Mutators = require('Backbone.Mutators');

module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this._generateCollection(options.model);
    },
    _generateCollection: function (model) {
        var Model = Backbone.Model.extend({
            mutators: {
                url: function () {
                    return '#medicines/show/' + encodeURI(this.get('brand'));
                },
                cheaperOrCostlierPercentage: function () {
                    var referenceUnitPrice = model.get('medicine')['unit_price'];
                    var unitPrice = this.get('unit_price');
                    var differencePercentage = (100 * (1 - (unitPrice / referenceUnitPrice))).toFixed(2);
                    return differencePercentage;
                }
            },
            parse: function (response) {
                return response.medicine;
            }
        });

        var Collection = Backbone.Collection.extend({
            model: Model
        });

        this.collection = new Collection(model.get('alternatives'), {
            parse: true
        });
    },
    show: function () {
        if (this.collection.length === 0) {
            this.view = new commonViews.EmptyView({
                message: "No substitutes found"
            });
        } else {
            this.view = new View({
                collection: this.collection
            });
            var self = this;
            this.view.on("link:click", function (suggestion) {
                self.trigger("link:click", suggestion);
            });
        }
        this.region.show(this.view);
    }
});
},{"./substitutes_view.js":44,"Backbone.Mutators":54,"backbone":"backbone","backbone.marionette":"backbone.marionette","common":49}],44:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var $ = require('jquery');
require('bootstrap');
require('datatables.net-responsive')();
require('datatables.net-bs')(window, $);

var Table = Marionette.ItemView.extend({
    template: false,
    className: "table table-striped table-bordered dt-responsive",
    tagName: "table",
    id: "substituteTable",
    events: {
        "click .show": "linkClicked"
    },
    linkClicked: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var text = $(e.currentTarget).text();
        this.triggerMethod("link:click", text);
    },
    attributes: function () {
        return {
            width: "100%"
        };
    },
    onShow: function () {
        this.$el.DataTable({
            responsive: true,
            data: this.collection.toJSON(),
            columns: [{
                    data: "brand",
                    render: function (data, type, row) {
                        return "<a class='show' href='#medicines/show/" + encodeURI(data) + "'>" + data + "</a>";
                    },
                    title: "Brand"
                    },
                {
                    data: "package_qty",
                    title: "Pack"
                    },
                {
                    data: "package_price",
                    title: "Price",
                    render: function (data, type, row) {
                        var template = require('./price-column_template.tpl');
                        return template({
                            price: data
                        });
                    }.bind(this)
                    },
                {
                    title: "Cheaper/Costlier",
                    data: "cheaperOrCostlierPercentage",
                    render: function (data, type, row) {
                        var template = require('./cheaper-costlier-column_template.tpl');
                        return template({
                            difference: data
                        });
                    }.bind(this)
					}
                ]
        });
    }
});

module.exports = Marionette.LayoutView.extend({
    template: require("./layout_template.tpl"),
    tagName: "div",
    id: "cheapest_substitute",
    regions: {
        "tableRegion": "#table-region"
    },
    childEvents: {
        "link:click": "onChildLinkClick"
    },
    onChildLinkClick: function (view, text) {
        this.trigger("link:click", text);
    },
    initialize: function (options) {
        this.collection = options.collection;
    },
    onShow: function () {
        var tableView = new Table({
            collection: this.collection
        });
        this.tableRegion.show(tableView);
    }
});
},{"./cheaper-costlier-column_template.tpl":40,"./layout_template.tpl":41,"./price-column_template.tpl":42,"backbone.marionette":"backbone.marionette","bootstrap":"bootstrap","datatables.net-bs":"datatables.net-bs","datatables.net-responsive":"datatables.net-responsive","jquery":"jquery"}],45:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h3><i class="text-primary fa fa-medkit" aria-hidden="true"></i>&nbsp;'+
((__t=( medicine.brand ))==null?'':__t)+
' <span class="label label-warning">'+
((__t=( medicine.category ))==null?'':__t)+
'</span></h3>';
}
return __p;
};

},{}],46:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var View = require('./title_view.js');
module.exports = Marionette.Object.extend({
    initialize: function (options) {
        this.region = options.region;
        this.model = options.model;
    },
    show: function () {
        this.view = new View({
            model: this.model
        });
        this.region.show(this.view);
    }
});
},{"./title_view.js":47,"backbone.marionette":"backbone.marionette"}],47:[function(require,module,exports){
var Marionette = require('backbone.marionette');
module.exports = Marionette.ItemView.extend({
    template: require('./template.tpl'),
    tagName: "div",
    id: "title"
});
},{"./template.tpl":45,"backbone.marionette":"backbone.marionette"}],48:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="empty-message text-danger">\r\n    No Result\r\n</div>';
}
return __p;
};

},{}],49:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var _ = require('underscore');
var Chartjs = require('chart.js');
var typeahead = require("typeahead.js-browserify");
var Spinner = require('spin.js');
var Bloodhound = typeahead.Bloodhound;
typeahead.loadjQueryPlugin();


var Loading = Marionette.ItemView.extend({
    template: false,
    initialize: function (options) {
        this.options = options;
    },
    onRender: function () {
        var opts = _.extend({
            length: 28, // The length of each line
            width: 14, // The line thickness
            radius: 42, // The radius of the inner circle
            scale: 0.12, // Scales overall size of the spinner
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
        }, this.options);
        new Spinner(opts).spin(this.$el.get(0));
    }
});

var EmptyView = Marionette.ItemView.extend({
    template: _.template("<p style='text-align:center'><%=message%></p>"),
    className: "col-xs-12 text-danger",
    initialize: function (options) {
        this.model = new Backbone.Model({
            message: options.message
        });
    }
});

var Typeahead = Marionette.ItemView.extend({
    template: false,
    tagName: "input",
    placeholder: "Search",
    className: "searchInput",
    loaderClass: "Typeahead-spinner",
    initialize: function (options) {
        this.loaderOptions = options;
    },
    events: {
        "typeahead:select": "onTypeheadSelect"
    },
    reset: function () {
        this.$el.typeahead('val', '');
    },
    onTypeheadSelect: function (event, suggest) {
        this.reset();
        this.triggerMethod('suggestion:select', suggest);
    },
    hide: function () {
        this.$el.parent('.twitter-typeahead').hide();
    },
    show: function () {
        this.$el.parent('.twitter-typeahead').show();
    },
    toggleVisibility: function () {
        this.$el.parent('.twitter-typeahead').toggle();
    },
    _addPlaceholder: function () {
        this.$el.attr('placeholder', this.placeholder);
    },
    _addLoader: function () {
        var loader = new Loading(this.loaderOptions).render().$el;
        loader.addClass(this.loaderClass);
        this.$el.parent().append(loader);
        loader.hide();
    },
    onShow: function () {
        // constructs the suggestion engine
        var engine = new Bloodhound({
            datumTokenizer: function (item) {
                return Bloodhound.tokenizers.whitespace(item.suggestion);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: '/medicine_suggestions/?id=%QUERY',
                wildcard: '%QUERY'
            }
        });

        var self = this;
        this.$el.typeahead({
                hint: true,
                highlight: true
            }, {
                limit: Infinity,
                displayKey: 'suggestion',
                name: 'suggestions',
                source: engine,
                templates: {
                    empty: require('./empty_typeahead.tpl')
                }
            })
            .on('typeahead:asyncrequest', function () {
                self.$el.parent().find('.Typeahead-spinner').show();
            })
            .on('typeahead:asynccancel typeahead:asyncreceive', function () {
                self.$el.parent().find('.Typeahead-spinner').hide();
            });

        this._addLoader();
        this._addPlaceholder();
    }
});

var Chart = Marionette.ItemView.extend({
    template: false,
    tagName: "canvas",
    id: "chartContainer",
    initialize: function (options) {
        this.set = options.set;
        this.subset = options.subset;
    },
    onShow: function () {
        Chartjs.defaults.global.responsive = true;
        Chartjs.defaults.global.showTooltips = false;
        var ctx = this.$el.get(0).getContext("2d");
        var data = [{
            value: this.set - this.subset,
            color: "#bdc3c7",
            label: "Grey"
            }, {
            value: this.subset,
            color: "#009688",
            label: "Green"
            }];
        this.chart = new Chartjs(ctx).Pie(data);
    },
    onDestroy: function () {
        this.chart.destroy();
    }
});

module.exports = {

    Loading: Loading,

    EmptyView: EmptyView,

    Typeahead: Typeahead,

    Chart: Chart

};
},{"./empty_typeahead.tpl":48,"backbone":"backbone","backbone.marionette":"backbone.marionette","chart.js":"chart.js","spin.js":"spin.js","typeahead.js-browserify":"typeahead.js-browserify","underscore":"underscore"}],50:[function(require,module,exports){
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var cache = require('../helpers/cache')(15);
var medicineChannel = require('backbone.radio').channel('medicine');



var Detail = Backbone.Model.extend({
    fetch: function (options) {
        options = options || {};
        var success = options.success;
        var value = cache.get(this.url);
        if (value !== undefined) {
            this.set(this.parse(value, options), options);
            if (success)
                success(this, value, options);

            // Returns deferred as the original fetch
            return Promise.resolve(value);
        }


        return Backbone.Model.prototype.fetch.apply(this, options)
            .then(function (result) {
                cache.add(this.url, result);
                return result;
            });
    }
});
module.exports = Marionette.Object.extend({
    initialize: function () {
        var self = this;
        medicineChannel.reply("details", function (medicine) {
            return self.getDetail(medicine);
        });
    },
    getDetail: function (medicine) {
        var detail = new Detail();
        detail.url = "/medicine_details/?id=" + encodeURIComponent(medicine);
        return detail.fetch().then(function () {
            return detail;
        });
    }
});
},{"../helpers/cache":52,"backbone":"backbone","backbone.marionette":"backbone.marionette","backbone.radio":55}],51:[function(require,module,exports){
var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");
var Marionette = require('backbone.marionette');
var Mutators = require('Backbone.Mutators');
var medicineChannel = require('backbone.radio').channel('medicine');


var RecentlyViewedItem = Backbone.Model.extend({
    mutators: {
        url: function () {
            return '#medicines/show/' + encodeURI(this.get('medicine'));
        }
    },
    default: {
        medicine: null
    }
});


var RecentlyViewed = Backbone.Collection.extend({
    model: RecentlyViewedItem,
    localStorage: new Backbone.LocalStorage("RecentlyViewed"),
    comparator: function (one, two) {
        return one.get('time') <= two.get('time');
    }
});

var capacity = 5;
var collection = new RecentlyViewed();

module.exports = Marionette.Object.extend({
    initialize: function () {
        var self = this;
        medicineChannel.reply("recentlyViewed", function () {
            return self.getRecentlyViewed();
        });
        medicineChannel.reply("add:recentlyViewed", function (medicine) {
            self.addItem(medicine);
        });
    },
    getRecentlyViewed: function () {
        return collection;
    },
    addItem: function (item) {
        collection.fetch();
        var model = collection.findWhere({
            medicine: item
        });
        if (model) {
            model.destroy();
        } else if (collection.length == capacity)
            collection.at(collection.length - 1).destroy();
        model = new RecentlyViewedItem({
            medicine: item,
            time: new Date().getTime()
        });
        collection.unshift(model);
        model.save();
    }
});
},{"Backbone.Mutators":54,"backbone":"backbone","backbone.localstorage":"backbone.localstorage","backbone.marionette":"backbone.marionette","backbone.radio":55}],52:[function(require,module,exports){
module.exports = function (size) {
    var cache = {};

    var _exists = function (key) {
        return cache[key] !== undefined;
    };

    return {
        get: function (key) {
            return cache[key];
        },
        add: function (key, value) {

            if (_exists(key)) {
                delete cache[key];
                cache[key] = value;
            }

            var keys = Object.keys(cache);
            if (keys.length < size) {
                cache[key] = value;
            } else {
                delete cache[keys[size - 1]];
                cache[key] = value;
            }
        }
    };
};
},{}],53:[function(require,module,exports){
(function (global){
// main.js
var $ = global.jQuery = require('jquery');

// Load up app...
var App = require('./app');
var Backbone = require('backbone');
var AppLayout = require('./app_layout');

var DetailsService = require('./entities/details');
var RecentlyViewedService = require('./entities/recently-viewed');

var HeaderApp = require('./apps/header/header_app');
var FooterApp = require('./apps/footer/footer_app');
var MedicineApp = require('./apps/medicines/medicines_app');
var AboutApp = require('./apps/about/about_app');

var app = new App();
var layout = new AppLayout();

app.addService('detailsService', {
    serviceClass: DetailsService
});
app.addService('recentlyViewedService', {
    serviceClass: RecentlyViewedService
});

app.addSubApp('headerApp', {
    subAppClass: HeaderApp,
    region: layout.getRegion('headerRegion')
});

app.addSubApp('footerApp', {
    subAppClass: FooterApp,
    region: layout.getRegion('footerRegion')
});

app.addSubApp('aboutApp', {
    subAppClass: AboutApp,
    region: layout.getRegion('mainRegion')
});

app.addSubApp('medicineApp', {
    subAppClass: MedicineApp,
    region: layout.getRegion('mainRegion')
});

var headerApp = app.getSubApp('headerApp');
var medicineApp = app.getSubApp('medicineApp');
var footerApp = app.getSubApp('footerApp');
var aboutApp = app.getSubApp('aboutApp');

var recentlyViewedService = app.getService('recentlyViewedService');

app.listenTo(headerApp, "brand:clicked", function () {
    medicineApp.showSearchOption();
});
app.listenTo(headerApp, "suggestion:select", function (suggestion) {
    medicineApp.showMedicine(suggestion);
});

app.listenTo(footerApp, "show:about", function () {
    aboutApp.show();
});

app.listenTo(medicineApp, "search", function () {
    headerApp.setSearchVisibility(false);
});
app.listenTo(medicineApp, "show", function (medicine) {
    headerApp.setSearchVisibility(true);
    recentlyViewedService.addItem(medicine);
});

Backbone.history.start();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./app":1,"./app_layout":2,"./apps/about/about_app":3,"./apps/footer/footer_app":8,"./apps/header/header_app":12,"./apps/medicines/medicines_app":19,"./entities/details":50,"./entities/recently-viewed":51,"backbone":"backbone","jquery":"jquery"}],54:[function(require,module,exports){
/*! Backbone.Mutators - v0.4.4
------------------------------
Build @ 2015-02-03
Documentation and Full License Available at:
http://asciidisco.github.com/Backbone.Mutators/index.html
git://github.com/asciidisco/Backbone.Mutators.git
Copyright (c) 2015 Sebastian Golasch <public@asciidisco.com>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the

Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.*/
(function (root, factory, undef) {
    'use strict';

    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('underscore'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function (_, Backbone) {
            // Check if we use the AMD branch of Back
            _ = _ === undef ? root._ : _;
            Backbone = Backbone === undef ? root.Backbone : Backbone;
            return (root.returnExportsGlobal = factory(_, Backbone, root));
        });
    } else {
        // Browser globals
        root.returnExportsGlobal = factory(root._, root.Backbone);
    }

// Usage:
//
// Note: This plugin is UMD compatible, you can use it in node, amd and vanilla js envs
//
// Vanilla JS:
// <script src="underscore.js"></script>
// <script src="backbone.js"></script>
// <script src="backbone.mutators.js"></script>
//
// Node:
// var _ = require('underscore');
// var Backbone = require('backbone');
// var Mutators = require('backbone.mutators');
//
//
// AMD:
// define(['underscore', 'backbone', 'backbone.mutators'], function (_, Backbone, Mutators) {
//    // insert sample from below
//    return User;
// });
//
// var User = Backbone.Model.extend({
//    mutators: {
//        fullname: function () {
//            return this.firstname + ' ' + this.lastname;
//        }
//    },
//
//    defaults: {
//        firstname: 'Sebastian',
//        lastname: 'Golasch'
//    }
// });
//
// var user = new User();
// user.get('fullname') // returns 'Sebastian Golasch'
// user.toJSON() // return '{firstname: 'Sebastian', lastname: 'Golasch', fullname: 'Sebastian Golasch'}'

}(this, function (_, Backbone, root, undef) {
    'use strict';

    // check if we use the amd branch of backbone and underscore
    Backbone = Backbone === undef ? root.Backbone : Backbone;
    _ = _ === undef ? root._ : _;

    // extend backbones model prototype with the mutator functionality
    var Mutator     = function () {},
        oldGet      = Backbone.Model.prototype.get,
        oldSet      = Backbone.Model.prototype.set,
        oldToJson   = Backbone.Model.prototype.toJSON;

    // This is necessary to ensure that Models declared without the mutators object do not throw and error
    Mutator.prototype.mutators = {};

    // override get functionality to fetch the mutator props
    Mutator.prototype.get = function (attr) {
        var isMutator = this.mutators !== undef;

        // check if we have a getter mutation
        if (isMutator === true && _.isFunction(this.mutators[attr]) === true) {
            return this.mutators[attr].call(this);
        }

        // check if we have a deeper nested getter mutation
        if (isMutator === true && _.isObject(this.mutators[attr]) === true && _.isFunction(this.mutators[attr].get) === true) {
            return this.mutators[attr].get.call(this);
        }

        return oldGet.call(this, attr);
    };

    // override set functionality to set the mutator props
    Mutator.prototype.set = function (key, value, options) {
        var isMutator = this.mutators !== undef,
            ret = null,
            attrs = null;

		ret = oldSet.call(this, key, value, options);

        // seamleassly stolen from backbone core
        // check if the setter action is triggered
        // using key <-> value or object
        if (_.isObject(key) || key === null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        // check if we have a deeper nested setter mutation
        if (isMutator === true && _.isObject(this.mutators[key]) === true) {

            // check if we need to set a single value
            if (_.isFunction(this.mutators[key].set) === true) {
                ret = this.mutators[key].set.call(this, key, attrs[key], options, _.bind(oldSet, this));
            } else if(_.isFunction(this.mutators[key])){
                ret = this.mutators[key].call(this, key, attrs[key], options, _.bind(oldSet, this));
            }
        }

        if (isMutator === true && _.isObject(attrs)) {
            _.each(attrs, _.bind(function (attr, attrKey) {
                if (_.isObject(this.mutators[attrKey]) === true) {
                    // check if we need to set a single value

                    var meth = this.mutators[attrKey];
                    if(_.isFunction(meth.set)){
                        meth = meth.set;
                    }

                    if(_.isFunction(meth)){
                        if (options === undef || (_.isObject(options) === true && options.silent !== true && (options.mutators !== undef && options.mutators.silent !== true))) {
                            this.trigger('mutators:set:' + attrKey);
                        }
                        meth.call(this, attrKey, attr, options, _.bind(oldSet, this));
                    }

                }
            }, this));
        }

        return ret;
    };

    // override toJSON functionality to serialize mutator properties
    Mutator.prototype.toJSON = function (options) {
        // fetch ye olde values
        var attr = oldToJson.call(this),
            isSaving,
            isTransient;
        // iterate over all mutators (if there are some)
        _.each(this.mutators, _.bind(function (mutator, name) {
            // check if we have some getter mutations
            if (_.isObject(this.mutators[name]) === true && _.isFunction(this.mutators[name].get)) {
                isSaving = (this.isSaving) ? this.isSaving(options, mutator, name) : _.has(options || {}, 'emulateHTTP');
                isTransient = this.mutators[name].transient;
                if (!isSaving || !isTransient) {
                  attr[name] = _.bind(this.mutators[name].get, this)();
                }
            } else if (_.isFunction(this.mutators[name])) {
                attr[name] = _.bind(this.mutators[name], this)();
            }
        }, this));

        return attr;
    };

    // override get functionality to get HTML-escaped the mutator props
    Mutator.prototype.escape = function (attr){
        var val = this.get(attr);
        return _.escape(val == null ? '' : '' + val);
    };

    // extend the models prototype
    _.extend(Backbone.Model.prototype, Mutator.prototype);

    // make mutators globally available under the Backbone namespace
    Backbone.Mutators = Mutator;
    return Mutator;
}));

},{"backbone":"backbone","underscore":"underscore"}],55:[function(require,module,exports){
// Backbone.Radio v1.0.4

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('underscore'), require('backbone')) :
  typeof define === 'function' && define.amd ? define(['underscore', 'backbone'], factory) :
  (global.Backbone = global.Backbone || {}, global.Backbone.Radio = factory(global._,global.Backbone));
}(this, function (_,Backbone) { 'use strict';

  _ = 'default' in _ ? _['default'] : _;
  Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  babelHelpers;

  var previousRadio = Backbone.Radio;

  var Radio = Backbone.Radio = {};

  Radio.VERSION = '1.0.4';

  // This allows you to run multiple instances of Radio on the same
  // webapp. After loading the new version, call `noConflict()` to
  // get a reference to it. At the same time the old version will be
  // returned to Backbone.Radio.
  Radio.noConflict = function () {
    Backbone.Radio = previousRadio;
    return this;
  };

  // Whether or not we're in DEBUG mode or not. DEBUG mode helps you
  // get around the issues of lack of warnings when events are mis-typed.
  Radio.DEBUG = false;

  // Format debug text.
  Radio._debugText = function (warning, eventName, channelName) {
    return warning + (channelName ? ' on the ' + channelName + ' channel' : '') + ': "' + eventName + '"';
  };

  // This is the method that's called when an unregistered event was called.
  // By default, it logs warning to the console. By overriding this you could
  // make it throw an Error, for instance. This would make firing a nonexistent event
  // have the same consequence as firing a nonexistent method on an Object.
  Radio.debugLog = function (warning, eventName, channelName) {
    if (Radio.DEBUG && console && console.warn) {
      console.warn(Radio._debugText(warning, eventName, channelName));
    }
  };

  var eventSplitter = /\s+/;

  // An internal method used to handle Radio's method overloading for Requests.
  // It's borrowed from Backbone.Events. It differs from Backbone's overload
  // API (which is used in Backbone.Events) in that it doesn't support space-separated
  // event names.
  Radio._eventsApi = function (obj, action, name, rest) {
    if (!name) {
      return false;
    }

    var results = {};

    // Handle event maps.
    if ((typeof name === 'undefined' ? 'undefined' : babelHelpers.typeof(name)) === 'object') {
      for (var key in name) {
        var result = obj[action].apply(obj, [key, name[key]].concat(rest));
        eventSplitter.test(key) ? _.extend(results, result) : results[key] = result;
      }
      return results;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        results[names[i]] = obj[action].apply(obj, [names[i]].concat(rest));
      }
      return results;
    }

    return false;
  };

  // An optimized way to execute callbacks.
  Radio._callHandler = function (callback, context, args) {
    var a1 = args[0],
        a2 = args[1],
        a3 = args[2];
    switch (args.length) {
      case 0:
        return callback.call(context);
      case 1:
        return callback.call(context, a1);
      case 2:
        return callback.call(context, a1, a2);
      case 3:
        return callback.call(context, a1, a2, a3);
      default:
        return callback.apply(context, args);
    }
  };

  // A helper used by `off` methods to the handler from the store
  function removeHandler(store, name, callback, context) {
    var event = store[name];
    if ((!callback || callback === event.callback || callback === event.callback._callback) && (!context || context === event.context)) {
      delete store[name];
      return true;
    }
  }

  function removeHandlers(store, name, callback, context) {
    store || (store = {});
    var names = name ? [name] : _.keys(store);
    var matched = false;

    for (var i = 0, length = names.length; i < length; i++) {
      name = names[i];

      // If there's no event by this name, log it and continue
      // with the loop
      if (!store[name]) {
        continue;
      }

      if (removeHandler(store, name, callback, context)) {
        matched = true;
      }
    }

    return matched;
  }

  /*
   * tune-in
   * -------
   * Get console logs of a channel's activity
   *
   */

  var _logs = {};

  // This is to produce an identical function in both tuneIn and tuneOut,
  // so that Backbone.Events unregisters it.
  function _partial(channelName) {
    return _logs[channelName] || (_logs[channelName] = _.partial(Radio.log, channelName));
  }

  _.extend(Radio, {

    // Log information about the channel and event
    log: function log(channelName, eventName) {
      if (typeof console === 'undefined') {
        return;
      }
      var args = _.drop(arguments, 2);
      console.log('[' + channelName + '] "' + eventName + '"', args);
    },

    // Logs all events on this channel to the console. It sets an
    // internal value on the channel telling it we're listening,
    // then sets a listener on the Backbone.Events
    tuneIn: function tuneIn(channelName) {
      var channel = Radio.channel(channelName);
      channel._tunedIn = true;
      channel.on('all', _partial(channelName));
      return this;
    },

    // Stop logging all of the activities on this channel to the console
    tuneOut: function tuneOut(channelName) {
      var channel = Radio.channel(channelName);
      channel._tunedIn = false;
      channel.off('all', _partial(channelName));
      delete _logs[channelName];
      return this;
    }
  });

  /*
   * Backbone.Radio.Requests
   * -----------------------
   * A messaging system for requesting data.
   *
   */

  function makeCallback(callback) {
    return _.isFunction(callback) ? callback : function () {
      return callback;
    };
  }

  Radio.Requests = {

    // Make a request
    request: function request(name) {
      var args = _.rest(arguments);
      var results = Radio._eventsApi(this, 'request', name, args);
      if (results) {
        return results;
      }
      var channelName = this.channelName;
      var requests = this._requests;

      // Check if we should log the request, and if so, do it
      if (channelName && this._tunedIn) {
        Radio.log.apply(this, [channelName, name].concat(args));
      }

      // If the request isn't handled, log it in DEBUG mode and exit
      if (requests && (requests[name] || requests['default'])) {
        var handler = requests[name] || requests['default'];
        args = requests[name] ? args : arguments;
        return Radio._callHandler(handler.callback, handler.context, args);
      } else {
        Radio.debugLog('An unhandled request was fired', name, channelName);
      }
    },

    // Set up a handler for a request
    reply: function reply(name, callback, context) {
      if (Radio._eventsApi(this, 'reply', name, [callback, context])) {
        return this;
      }

      this._requests || (this._requests = {});

      if (this._requests[name]) {
        Radio.debugLog('A request was overwritten', name, this.channelName);
      }

      this._requests[name] = {
        callback: makeCallback(callback),
        context: context || this
      };

      return this;
    },

    // Set up a handler that can only be requested once
    replyOnce: function replyOnce(name, callback, context) {
      if (Radio._eventsApi(this, 'replyOnce', name, [callback, context])) {
        return this;
      }

      var self = this;

      var once = _.once(function () {
        self.stopReplying(name);
        return makeCallback(callback).apply(this, arguments);
      });

      return this.reply(name, once, context);
    },

    // Remove handler(s)
    stopReplying: function stopReplying(name, callback, context) {
      if (Radio._eventsApi(this, 'stopReplying', name)) {
        return this;
      }

      // Remove everything if there are no arguments passed
      if (!name && !callback && !context) {
        delete this._requests;
      } else if (!removeHandlers(this._requests, name, callback, context)) {
        Radio.debugLog('Attempted to remove the unregistered request', name, this.channelName);
      }

      return this;
    }
  };

  /*
   * Backbone.Radio.channel
   * ----------------------
   * Get a reference to a channel by name.
   *
   */

  Radio._channels = {};

  Radio.channel = function (channelName) {
    if (!channelName) {
      throw new Error('You must provide a name for the channel.');
    }

    if (Radio._channels[channelName]) {
      return Radio._channels[channelName];
    } else {
      return Radio._channels[channelName] = new Radio.Channel(channelName);
    }
  };

  /*
   * Backbone.Radio.Channel
   * ----------------------
   * A Channel is an object that extends from Backbone.Events,
   * and Radio.Requests.
   *
   */

  Radio.Channel = function (channelName) {
    this.channelName = channelName;
  };

  _.extend(Radio.Channel.prototype, Backbone.Events, Radio.Requests, {

    // Remove all handlers from the messaging systems of this channel
    reset: function reset() {
      this.off();
      this.stopListening();
      this.stopReplying();
      return this;
    }
  });

  /*
   * Top-level API
   * -------------
   * Supplies the 'top-level API' for working with Channels directly
   * from Backbone.Radio.
   *
   */

  var channel;
  var args;
  var systems = [Backbone.Events, Radio.Requests];
  _.each(systems, function (system) {
    _.each(system, function (method, methodName) {
      Radio[methodName] = function (channelName) {
        args = _.rest(arguments);
        channel = this.channel(channelName);
        return channel[methodName].apply(channel, args);
      };
    });
  });

  Radio.reset = function (channelName) {
    var channels = !channelName ? this._channels : [this._channels[channelName]];
    _.invoke(channels, 'reset');
  };

  return Radio;

}));

},{"backbone":"backbone","underscore":"underscore"}]},{},[53]);
