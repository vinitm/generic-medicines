!function e(t,n,i){function o(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=n[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return o(n?n:e)},u,u.exports,e,t,n,i)}return n[a].exports}for(var r="function"==typeof require&&require,a=0;a<i.length;a++)o(i[a]);return o}({1:[function(e,t,n){var i=e("underscore"),o=e("backbone"),r=e("backbone.marionette"),a=e("backbone.radio").channel("nav");t.exports=r.Application.extend({initialize:function(){var e=this;this._subApps={},this._services={},a.reply("navigate",function(t,n){e._navigate(t,n)})},_getCurrentRoute:function(){return o.history.fragment},_navigate:function(e,t){this._getCurrentRoute()!==e&&(t||(t={}),o.history.navigate(e,t))},getSubApp:function(e){return this._subApps[e]},getService:function(e){return this._services[e]},addService:function(e,t){var n=i.omit(t,"serviceClass"),o=new t.serviceClass(n);this._services[e]=o},addSubApp:function(e,t){var n=i.omit(t,"subAppClass"),o=new t.subAppClass(n);this._subApps[e]=o}})},{backbone:"backbone","backbone.marionette":"backbone.marionette","backbone.radio":55,underscore:"underscore"}],2:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.LayoutView.extend({el:"#app",regions:{headerRegion:"#header-region",mainRegion:"#main-region",modalRegion:"#modal-region",footerRegion:"#footer-region"}})},{"backbone.marionette":"backbone.marionette"}],3:[function(e,t,n){var i=e("backbone.marionette"),o=e("./show"),r=e("./router"),a=e("backbone.radio").channel("nav");t.exports=i.Object.extend({initialize:function(e){this.showController=new o(e),this.router=new r({controller:this})},show:function(){a.request("navigate","about"),this.showController.show()}})},{"./router":4,"./show":5,"backbone.marionette":"backbone.marionette","backbone.radio":55}],4:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.AppRouter.extend({appRoutes:{about:"show"}})},{"backbone.marionette":"backbone.marionette"}],5:[function(e,t,n){var i=e("backbone.marionette"),o=e("./show_view");t.exports=i.Object.extend({initialize:function(e){this.view=new o,this.region=e.region},show:function(){this.region.show(this.view)}})},{"./show_view":7,"backbone.marionette":"backbone.marionette"}],6:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div class="mcard-container col-xs-12">\r\n    <div class="mcard">\r\n        <div class="mcard-title mcard-title-center">About</div>\r\n        <div id="details-region" class="mcard-content row">\r\n            <p>sdkhgslakvjbds;v.kjab;nsdlvka;sldfhbv;asjfdbvajksvb;</p>\r\n        </div>\r\n    </div>\r\n</div>';return __p}},{}],7:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.ItemView.extend({template:e("./layout_template.tpl"),className:"container row"})},{"./layout_template.tpl":6,"backbone.marionette":"backbone.marionette"}],8:[function(e,t,n){var i=e("backbone.marionette"),o=e("./show");t.exports=i.Object.extend({initialize:function(e){this.showController=new o(e),this.showFooter(),this.listenTo(this.showController,"show:about",function(){this.trigger("show:about")})},showFooter:function(){this.showController.show()}})},{"./show":9,"backbone.marionette":"backbone.marionette"}],9:[function(e,t,n){var i=e("backbone.marionette"),o=e("./show_view");t.exports=i.Object.extend({initialize:function(e){this.view=new o;var t=this;this.view.on("link:about",function(){t.trigger("show:about")}),this.region=e.region},show:function(){this.region.show(this.view)}})},{"./show_view":11,"backbone.marionette":"backbone.marionette"}],10:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div class="container">\r\n    <p class="pull-left">© 2016 - Site Built By <a href="https://github.com/vinitm" target="_blank">Vinit</a></p>\r\n    <a href="#about" class="aboutLink pull-right">About</a>\r\n</div>';return __p}},{}],11:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.ItemView.extend({template:e("./layout_template.tpl"),className:"navbar navbar-default",ui:{about:".aboutLink"},events:{"click @ui.about":"onAboutClick"},onAboutClick:function(e){e.preventDefault(),this.trigger("link:about")}})},{"./layout_template.tpl":10,"backbone.marionette":"backbone.marionette"}],12:[function(e,t,n){var i=e("backbone.marionette"),o=e("./show");t.exports=i.Object.extend({initialize:function(e){this.showController=new o(e),this.showHeader(),this.listenTo(this.showController,"brand:clicked",function(){this.trigger("brand:clicked")}),this.listenTo(this.showController,"suggestion:select",function(e){this.trigger("suggestion:select",e.get("suggestion"))})},setSearchVisibility:function(e){this.showController.setSearchVisible(e)},showHeader:function(){this.showController.show()}})},{"./show":16,"backbone.marionette":"backbone.marionette"}],13:[function(e,t,n){var i=e("backbone.marionette"),o=e("./ExpandableSearchBar_view.js"),r=e("common");t.exports=i.Object.extend({initialize:function(e){this.region=e.region,this.view=new o},events:{"click button.btn":"onSearchButtonClick"},onSearchButtonClick:function(){this.hideSearch()},show:function(){this.region.show(this.view);var e=new r.Typeahead({scale:.1});this.view.searchRegion.show(e),e.hide(),this.view.on("search:click",function(t){t.preventDefault(),e.toggleVisibility()}),this.view.on("suggestion:select",function(e,t){this.trigger("suggestion:select",e)}.bind(this))},hideComponent:function(){this.view.$el.hide()},showComponent:function(){this.view.$el.show()},hideSearch:function(){this.searchRegion.currentView.hide()},showSearch:function(){this.searchRegion.currentView.show()}})},{"./ExpandableSearchBar_view.js":14,"backbone.marionette":"backbone.marionette",common:49}],14:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.LayoutView.extend({template:e("./layout_template.tpl"),tagName:"div",className:"row",regions:{searchRegion:"#searchRegion"},events:{"click button.btn":"onSearchButtonClick"},childEvents:{"suggestion:select":"onSuggestionSelect"},onSearchButtonClick:function(e){this.trigger("search:click",e)},onSuggestionSelect:function(e,t){this.trigger("suggestion:select",t)}})},{"./layout_template.tpl":15,"backbone.marionette":"backbone.marionette"}],15:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<span class="col-xs-11" id="searchRegion"></span>\r\n<!--<div class="input-group-btn">-->\r\n<button class="btn col-xs-1">\r\n    <i class="fa fa-search" aria-hidden="true"></i>\r\n</button>\r\n<!--</div>-->';return __p}},{}],16:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("./show_view"),a=e("./ExpandableSearchBar/ExpandableSearchBar_component"),s={};t.exports=o.Object.extend({addComponent:function(e,t){s[e]=t},removeComponent:function(e){delete s[e]},getComponent:function(e){return s[e]},initialize:function(e){this.view=new r;var t=this;this.view.on("brand:clicked",function(){t.trigger("brand:clicked")}),this.region=e.region},show:function(){var e=this;this.region.show(this.view);var t=new a({region:this.view.inputRegion});t.on("suggestion:select",function(t){var n=new i.Model(t);e.trigger("suggestion:select",n)}),this.addComponent("expandableSearchBar",t),t.show()},setSearchVisible:function(e){e?this.getComponent("expandableSearchBar").showComponent():this.getComponent("expandableSearchBar").hideComponent()}})},{"./ExpandableSearchBar/ExpandableSearchBar_component":13,"./show_view":18,backbone:"backbone","backbone.marionette":"backbone.marionette"}],17:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div class="container" style="position: relative">\r\n    <div class="navbar-header pull-left">\r\n        <a class="navbar-brand" href="/">\r\n            <img alt="Brand" width="30" height="30" src="navbar_icon.png">\r\n            <span>MedAlt</span>\r\n        </a>\r\n    </div>\r\n    <div id="inputRegion">\r\n    </div>\r\n</div>';return __p}},{}],18:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.LayoutView.extend({template:e("./show_template.tpl"),className:"navbar navbar-default navbar-fixed-top",regions:{inputRegion:"#inputRegion",buttonRegion:"#buttonRegion"},events:{"click a.navbar-brand":"brandClicked"},brandClicked:function(e){e.preventDefault(),this.trigger("brand:clicked")}})},{"./show_template.tpl":17,"backbone.marionette":"backbone.marionette"}],19:[function(e,t,n){var i=e("backbone.marionette"),o=e("backbone.radio"),r=o.channel("medicine"),a=o.channel("nav"),s=e("./search/search_app"),c=e("./show/show_app"),l=e("./router");t.exports=i.Object.extend({initialize:function(e){this.showController=new c(e),this.searchController=new s(e),this.router=new l({controller:this}),this._listenToControllers()},_listenToControllers:function(){var e=this;this.listenTo(this.searchController,"suggestion:select",function(t){e.showMedicine(t.get&&t.get("suggestion")||t)}),this.listenTo(this.showController,"suggestion:select",function(t){e.showMedicine(t.get&&t.get("suggestion")||t)})},showSearchOption:function(){a.request("navigate",""),this.searchController.showSearchOption(),this.trigger("search")},showMedicine:function(e){a.request("navigate","medicines/show/"+encodeURIComponent(e)),r.request("add:recentlyViewed",e),this.showController.showMedicine(e),this.trigger("show",e)}})},{"./router":20,"./search/search_app":21,"./show/show_app":38,"backbone.marionette":"backbone.marionette","backbone.radio":55}],20:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.AppRouter.extend({appRoutes:{"":"showSearchOption","medicines/show/*id":"showMedicine"}})},{"backbone.marionette":"backbone.marionette"}],21:[function(e,t,n){var i=e("backbone.marionette"),o=e("./search_view");t.exports=i.Object.extend({initialize:function(e){this.region=e.region},showSearchOption:function(){var e=this;this.view=new o,this.view.on("suggestion:select",function(t){e.trigger("suggestion:select",t)}),this.region.show(this.view)}})},{"./search_view":23,"backbone.marionette":"backbone.marionette"}],22:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div id=\'search\'>\r\n    <img src="plus_icon.png" style="display: block;margin:auto;height:175px;width:175px;margin-bottom: 40px;" alt="background image">\r\n    <div id=\'inputRegion\'>\r\n\r\n    </div>\r\n</div>';return __p}},{}],23:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("common");t.exports=o.LayoutView.extend({template:e("./search_template.tpl"),id:"searchContainer",regions:{inputRegion:"#inputRegion"},childEvents:{"suggestion:select":"onChildSuggestionSelect"},onChildSuggestionSelect:function(e,t){var n=new i.Model(t);this.trigger("suggestion:select",n)},onShow:function(){var e=new r.Typeahead;this.inputRegion.show(e),this.inputRegion.$el.addClass("row"),e.$el.parent().addClass("col-xs-12 col-md-offset-4 col-md-4")}})},{"./search_template.tpl":22,backbone:"backbone","backbone.marionette":"backbone.marionette",common:49}],24:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<div id="chart-region" class="col-sm-12">\r\n\r\n</div>\r\n<span class="text-success" style="display: inline-block;width: 100%;text-align: center;"><i class="fa fa-thumbs-up"></i><span> '+(null==(__t=(100*(1-cheapestAlternatives[0].medicine.unit_price/medicine.unit_price)).toFixed(2))?"":__t)+"% Cheaper</span></span>\r\n\r\n\r\n\r\n\r\n\r\n\r\n";return __p}},{}],25:[function(e,t,n){var i=e("backbone.marionette"),o=e("common"),r=e("./cheapest-substitute_view.js");t.exports=i.Object.extend({initialize:function(e){this.region=e.region,this.model=e.model},show:function(){if(0===this.model.get("cheapestAlternatives").length)this.view=new o.EmptyView({message:"No substitutes found"});else{this.view=new r({model:this.model});var e=this;this.view.on("link:click",function(t){e.trigger("link:click",t)})}this.region.show(this.view)}})},{"./cheapest-substitute_view.js":26,"backbone.marionette":"backbone.marionette",common:49}],26:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("common"),a=o.ItemView.extend({tagName:"li",template:e("./listItem_template.tpl"),initialize:function(e){var t=i.Model.extend({mutators:{url:function(){return"#medicines/show/"+encodeURI(this.get("brand"))}},parse:function(e){return e.model.get("medicine")}});this.model=new t(e,{parse:!0})},events:{"click a":"linkClicked"},linkClicked:function(e){e.preventDefault(),this.trigger("link:clicked")}}),s=o.CollectionView.extend({tagName:"ul",className:"material-list",childView:a,onChildviewLinkClicked:function(e){this.triggerMethod("brand:clicked",e.model.get("brand"))}}),c=o.LayoutView.extend({template:e("./chart_template.tpl"),regions:{chartRegion:"#chart-region"},initialize:function(e){this.model=e.model},onShow:function(){var e=new r.Chart({set:this.model.get("medicine").unit_price,subset:this.model.get("medicine").unit_price-this.model.get("cheapestAlternatives")[0].medicine.unit_price});this.chartRegion.show(e)}});t.exports=o.LayoutView.extend({template:e("./layout_template.tpl"),tagName:"div",id:"cheapest_substitute",regions:{chartRegion:"#chart-region",listRegion:"#substitutes-list-region"},initialize:function(e){this.model=e.model},childEvents:{"brand:clicked":"onChildBrandClicked"},onChildBrandClicked:function(e,t){this.trigger("link:click",t)},onShow:function(){var e=new c({model:this.model});this.chartRegion.show(e);var t=new s({collection:new i.Collection(this.model.get("cheapestAlternatives"))});this.listRegion.show(t)}})},{"./chart_template.tpl":24,"./layout_template.tpl":27,"./listItem_template.tpl":28,backbone:"backbone","backbone.marionette":"backbone.marionette",common:49}],27:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div id="chart-region" class="col-sm-6">\r\n\r\n</div>\r\n<div id="substitutes-list-region" class="col-sm-6">\r\n\r\n</div>';return __p}},{}],28:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+="<a href='"+(null==(__t=url)?"":__t)+"'>\r\n    <h4>"+(null==(__t=brand)?"":__t)+'</h4>\r\n</a>\r\n<i class="fa fa-inr"></i>\r\n'+(null==(__t=unit_price)?"":__t)+"/unit";return __p}},{}],29:[function(e,t,n){var i=e("backbone.marionette"),o=e("./details_view.js");t.exports=i.Object.extend({initialize:function(e){this.region=e.region,this.model=e.model},show:function(){this.view=new o({model:this.model}),this.region.show(this.view)}})},{"./details_view.js":30,"backbone.marionette":"backbone.marionette"}],30:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.ItemView.extend({template:e("./template.tpl"),tagName:"div",id:"details"})},{"./template.tpl":31,"backbone.marionette":"backbone.marionette"}],31:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+="<span class=\"details-item col-sm-6\"><span class='tag'>Brand:</span>\r\n"+(null==(__t=medicine.brand)?"":__t)+"\r\n    </span>\r\n    <span class=\"details-item col-sm-6\"><span class='tag'>Manufacturer:</span>\r\n    "+(null==(__t=medicine.manufacturer)?"":__t)+'\r\n        </span>\r\n        <span class="details-item col-sm-6"><span class=\'tag\'>Price:</span>\r\n        <i class="fa fa-inr"></i>\r\n        '+(null==(__t=medicine.package_price)?"":__t)+"\r\n            </span>\r\n            <span class=\"details-item col-sm-6\"><span class='tag'>Package Quantity:</span>\r\n            "+(null==(__t=medicine.package_qty)?"":__t)+"\r\n                </span>\r\n                <div class=\"details-item col-sm-12\">\r\n                    <span class='tag'>Constituents(Strength):&nbsp;</span>\r\n                    <div class='constituents'>\r\n                        "+(null==(__t=constituents.map(function(e){return"<span class='constituent'>"+e.name.trim()+"("+e.strength.trim()+")</span>"}).join(""))?"":__t)+"</div>\r\n                </div>";return __p}},{}],32:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<section id="sidebar" class="col-sm-3">\r\n    <div class="mcard-container">\r\n        <div class="mcard">\r\n            <div class="mcard-title mcard-title-center">Recently Viewed</div>\r\n            <div id="recently-viewed-region" class="mcard-content row"></div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<section id="content" class="row col-sm-9">\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div id="title-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Details</div>\r\n                <div id="details-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Cheapest Substitutes</div>\r\n                <div id="cheapest_substitutes-region" class="mcard-content clearfix"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-xs-12">\r\n        <div class="mcard-container">\r\n            <div class="mcard">\r\n                <div class="mcard-title mcard-title-center">Substitutes</div>\r\n                <div id="substitutes-region" class="mcard-content row"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>';return __p}},{}],33:[function(e,t,n){var i=(e("MedicineManager"),e("common"));t.exports=i.Loading.extend({attributes:{style:"height: 100%;width: 100%;position: absolute;top: 0px;left: 0px;"}})},{MedicineManager:1,common:49}],34:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div id="list-region">\r\n\r\n</div>';return __p}},{}],35:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<a href="'+(null==(__t=url)?"":__t)+'" class="show">\r\n    '+(null==(__t=medicine)?"":__t)+"\r\n</a>";return __p}},{}],36:[function(e,t,n){var i=e("backbone.marionette"),o=e("./recently-viewed_view.js");t.exports=i.Object.extend({initialize:function(e){this.region=e.region,this.collection=e.collection},show:function(){this.view=new o({collection:this.collection});var e=this;this.view.on("link:click",function(t){e.trigger("link:click",t)}),this.region.show(this.view)}})},{"./recently-viewed_view.js":37,"backbone.marionette":"backbone.marionette"}],37:[function(e,t,n){var i=e("backbone.marionette"),o=e("jquery"),r=i.ItemView.extend({template:e("./listItem_template.tpl"),tagName:"li",events:{"click .show":"linkClicked"},linkClicked:function(e){e.preventDefault(),e.stopPropagation();var t=o(e.currentTarget).text().trim();this.trigger("link:click",t)}}),a=i.CollectionView.extend({childView:r,tagName:"ul",className:"material-list",id:"recently-viewed",onChildviewLinkClick:function(e,t){this.triggerMethod("link:click",t)}});t.exports=i.LayoutView.extend({template:e("./layout_template.tpl"),regions:{listRegion:"#list-region"},initialize:function(e){e.collection=this.collection},childEvents:{"link:click":"onChildLinkClick"},onChildLinkClick:function(e,t){this.trigger("link:click",t)},onShow:function(){var e=new a({collection:this.collection});this.listRegion.show(e)}})},{"./layout_template.tpl":34,"./listItem_template.tpl":35,"backbone.marionette":"backbone.marionette",jquery:"jquery"}],38:[function(e,t,n){var i=e("backbone.marionette"),o=e("jquery"),r=e("backbone.radio"),a=r.channel("medicine"),s=e("./show_view"),c=e("./loader/loader_view"),l=e("./recently-viewed/recently-viewed_component"),u=e("./title/title_component"),d=e("./details/details_component"),h=e("./substitutes/substitutes_component"),p=e("./cheapest-substitutes/cheapest-substitute_component");t.exports=i.Object.extend({initialize:function(e){this.region=e.region},showMedicine:function(e){this.view=new s,this.region.show(this.view);var t=a.request("details",e),n=a.request("recentlyViewed");this.view.regionManager.each(function(e){var t=new c({width:20});e.show(t)});var i=new l({region:this.view.recentlyViewedRegion,collection:n});this.listenTo(i,"link:click",this.showSubstitute),i.show(),t.then(function(e){if(o.contains(document,this.view.$el[0])){var t=new u({region:this.view.titleRegion,model:e});t.show();var n=new d({region:this.view.detailsRegion,model:e});n.show();var i=new h({region:this.view.substitutesRegion,model:e});this.listenTo(i,"link:click",this.showSubstitute),i.show();var r=new p({region:this.view.cheapestSubstitutesRegion,model:e});this.listenTo(r,"link:click",this.showSubstitute),r.show()}}.bind(this))},showSubstitute:function(e){this.trigger("suggestion:select",e)}})},{"./cheapest-substitutes/cheapest-substitute_component":25,"./details/details_component":29,"./loader/loader_view":33,"./recently-viewed/recently-viewed_component":36,"./show_view":39,"./substitutes/substitutes_component":43,"./title/title_component":46,"backbone.marionette":"backbone.marionette","backbone.radio":55,jquery:"jquery"}],39:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.LayoutView.extend({template:e("./layout_template.tpl"),tagName:"div",id:"main",className:"row",regions:{titleRegion:"#title-region",detailsRegion:"#details-region",cheapestSubstitutesRegion:"#cheapest_substitutes-region",substitutesRegion:"#substitutes-region",recentlyViewedRegion:"#recently-viewed-region"},childEvents:{"substitute:show":"onChildSubstituteShow"},onChildSubstituteShow:function(e,t){this.trigger("substitute:show",t)}})},{"./layout_template.tpl":32,"backbone.marionette":"backbone.marionette"}],40:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<span class="',__p+=difference>=0?"text-success":"text-danger",__p+='">\r\n',__p+=difference>=0?"\r\n<span>"+(null==(__t=difference)?"":__t)+"% </span>\r\n":"\r\n<span>"+(null==(__t=-1*difference)?"":__t)+"% </span>\r\n",__p+='\r\n<i class="fa ',__p+=difference>=0?"fa-thumbs-up":"fa-thumbs-down",__p+='"></i></span>';return __p}},{}],41:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div id="table-region">\r\n\r\n</div>';return __p}},{}],42:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<i class="fa fa-inr"></i><span>'+(null==(__t=price)?"":__t)+"</span>";return __p}},{}],43:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("common"),a=e("./substitutes_view.js");e("Backbone.Mutators");t.exports=o.Object.extend({initialize:function(e){this.region=e.region,this._generateCollection(e.model)},_generateCollection:function(e){var t=i.Model.extend({mutators:{url:function(){return"#medicines/show/"+encodeURI(this.get("brand"))},cheaperOrCostlierPercentage:function(){var t=e.get("medicine").unit_price,n=this.get("unit_price"),i=(100*(1-n/t)).toFixed(2);return i}},parse:function(e){return e.medicine}}),n=i.Collection.extend({model:t});this.collection=new n(e.get("alternatives"),{parse:!0})},show:function(){if(0===this.collection.length)this.view=new r.EmptyView({message:"No substitutes found"});else{this.view=new a({collection:this.collection});var e=this;this.view.on("link:click",function(t){e.trigger("link:click",t)})}this.region.show(this.view)}})},{"./substitutes_view.js":44,"Backbone.Mutators":54,backbone:"backbone","backbone.marionette":"backbone.marionette",common:49}],44:[function(e,t,n){var i=e("backbone.marionette"),o=e("jquery");e("bootstrap"),e("datatables.net-responsive")(),e("datatables.net-bs")(window,o);var r=i.ItemView.extend({template:!1,className:"table table-striped table-bordered dt-responsive",tagName:"table",id:"substituteTable",events:{"click .show":"linkClicked"},linkClicked:function(e){e.preventDefault(),e.stopPropagation();var t=o(e.currentTarget).text();this.triggerMethod("link:click",t)},attributes:function(){return{width:"100%"}},onShow:function(){this.$el.DataTable({responsive:!0,data:this.collection.toJSON(),columns:[{data:"brand",render:function(e,t,n){return"<a class='show' href='#medicines/show/"+encodeURI(e)+"'>"+e+"</a>"},title:"Brand"},{data:"package_qty",title:"Pack"},{data:"package_price",title:"Price",render:function(t,n,i){var o=e("./price-column_template.tpl");return o({price:t})}.bind(this)},{title:"Cheaper/Costlier",data:"cheaperOrCostlierPercentage",render:function(t,n,i){var o=e("./cheaper-costlier-column_template.tpl");return o({difference:t})}.bind(this)}]})}});t.exports=i.LayoutView.extend({template:e("./layout_template.tpl"),tagName:"div",id:"cheapest_substitute",regions:{tableRegion:"#table-region"},childEvents:{"link:click":"onChildLinkClick"},onChildLinkClick:function(e,t){this.trigger("link:click",t)},initialize:function(e){this.collection=e.collection},onShow:function(){var e=new r({collection:this.collection});this.tableRegion.show(e)}})},{"./cheaper-costlier-column_template.tpl":40,"./layout_template.tpl":41,"./price-column_template.tpl":42,"backbone.marionette":"backbone.marionette",bootstrap:"bootstrap","datatables.net-bs":"datatables.net-bs","datatables.net-responsive":"datatables.net-responsive",jquery:"jquery"}],45:[function(require,module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<h3><i class="text-primary fa fa-medkit" aria-hidden="true"></i>&nbsp;'+(null==(__t=medicine.brand)?"":__t)+' <span class="label label-warning">'+(null==(__t=medicine.category)?"":__t)+"</span></h3>";return __p}},{}],46:[function(e,t,n){var i=e("backbone.marionette"),o=e("./title_view.js");t.exports=i.Object.extend({initialize:function(e){this.region=e.region,this.model=e.model},show:function(){this.view=new o({model:this.model}),this.region.show(this.view)}})},{"./title_view.js":47,"backbone.marionette":"backbone.marionette"}],47:[function(e,t,n){var i=e("backbone.marionette");t.exports=i.ItemView.extend({template:e("./template.tpl"),tagName:"div",id:"title"})},{"./template.tpl":45,"backbone.marionette":"backbone.marionette"}],48:[function(require,module,exports){module.exports=function(obj){var __p="";Array.prototype.join;with(obj||{})__p+='<div class="empty-message text-danger">\r\n    No Result\r\n</div>';return __p}},{}],49:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("underscore"),a=e("chart.js"),s=e("typeahead.js-browserify"),c=e("spin.js"),l=s.Bloodhound;s.loadjQueryPlugin();var u=o.ItemView.extend({template:!1,initialize:function(e){this.options=e},onRender:function(){var e=r.extend({length:28,width:14,radius:42,scale:.12,className:"spinner",top:"50%",left:"50%"},this.options);new c(e).spin(this.$el.get(0))}}),d=o.ItemView.extend({template:r.template("<p style='text-align:center'><%=message%></p>"),className:"col-xs-12 text-danger",initialize:function(e){this.model=new i.Model({message:e.message})}}),h=o.ItemView.extend({template:!1,tagName:"input",placeholder:"Search",className:"searchInput",loaderClass:"Typeahead-spinner",initialize:function(e){this.loaderOptions=e},events:{"typeahead:select":"onTypeheadSelect"},reset:function(){this.$el.typeahead("val","")},onTypeheadSelect:function(e,t){this.reset(),this.triggerMethod("suggestion:select",t)},hide:function(){this.$el.parent(".twitter-typeahead").hide()},show:function(){this.$el.parent(".twitter-typeahead").show()},toggleVisibility:function(){this.$el.parent(".twitter-typeahead").toggle()},_addPlaceholder:function(){this.$el.attr("placeholder",this.placeholder)},_addLoader:function(){var e=new u(this.loaderOptions).render().$el;e.addClass(this.loaderClass),this.$el.parent().append(e),e.hide()},onShow:function(){var t=new l({datumTokenizer:function(e){return l.tokenizers.whitespace(e.suggestion)},queryTokenizer:l.tokenizers.whitespace,remote:{url:"/medicine_suggestions/?id=%QUERY",wildcard:"%QUERY"}}),n=this;this.$el.typeahead({hint:!0,highlight:!0},{limit:1/0,displayKey:"suggestion",name:"suggestions",source:t,templates:{empty:e("./empty_typeahead.tpl")}}).on("typeahead:asyncrequest",function(){n.$el.parent().find(".Typeahead-spinner").show()}).on("typeahead:asynccancel typeahead:asyncreceive",function(){n.$el.parent().find(".Typeahead-spinner").hide()}),this._addLoader(),this._addPlaceholder()}}),p=o.ItemView.extend({template:!1,tagName:"canvas",id:"chartContainer",initialize:function(e){this.set=e.set,this.subset=e.subset},onShow:function(){a.defaults.global.responsive=!0,a.defaults.global.showTooltips=!1;var e=this.$el.get(0).getContext("2d"),t=[{value:this.set-this.subset,color:"#bdc3c7",label:"Grey"},{value:this.subset,color:"#009688",label:"Green"}];this.chart=new a(e).Pie(t)},onDestroy:function(){this.chart.destroy()}});t.exports={Loading:u,EmptyView:d,Typeahead:h,Chart:p}},{"./empty_typeahead.tpl":48,backbone:"backbone","backbone.marionette":"backbone.marionette","chart.js":"chart.js","spin.js":"spin.js","typeahead.js-browserify":"typeahead.js-browserify",underscore:"underscore"}],50:[function(e,t,n){var i=e("backbone"),o=e("backbone.marionette"),r=e("../helpers/cache")(15),a=e("backbone.radio").channel("medicine"),s=i.Model.extend({fetch:function(e){e=e||{};var t=e.success,n=r.get(this.url);return void 0!==n?(this.set(this.parse(n,e),e),t&&t(this,n,e),Promise.resolve(n)):i.Model.prototype.fetch.apply(this,e).then(function(e){return r.add(this.url,e),e})}});t.exports=o.Object.extend({initialize:function(){var e=this;a.reply("details",function(t){return e.getDetail(t)})},getDetail:function(e){var t=new s;return t.url="/medicine_details/?id="+encodeURIComponent(e),t.fetch().then(function(){return t})}})},{"../helpers/cache":52,backbone:"backbone","backbone.marionette":"backbone.marionette","backbone.radio":55}],51:[function(e,t,n){var i=e("backbone");i.LocalStorage=e("backbone.localstorage");var o=e("backbone.marionette"),r=(e("Backbone.Mutators"),e("backbone.radio").channel("medicine")),a=i.Model.extend({mutators:{url:function(){return"#medicines/show/"+encodeURI(this.get("medicine"))}},"default":{medicine:null}}),s=i.Collection.extend({model:a,localStorage:new i.LocalStorage("RecentlyViewed"),comparator:function(e,t){return e.get("time")<=t.get("time")}}),c=5,l=new s;t.exports=o.Object.extend({initialize:function(){var e=this;r.reply("recentlyViewed",function(){return e.getRecentlyViewed()}),r.reply("add:recentlyViewed",function(t){e.addItem(t)})},getRecentlyViewed:function(){return l},addItem:function(e){l.fetch();var t=l.findWhere({medicine:e});t?t.destroy():l.length==c&&l.at(l.length-1).destroy(),t=new a({medicine:e,time:(new Date).getTime()}),l.unshift(t),t.save()}})},{"Backbone.Mutators":54,backbone:"backbone","backbone.localstorage":"backbone.localstorage","backbone.marionette":"backbone.marionette","backbone.radio":55}],52:[function(e,t,n){t.exports=function(e){var t={},n=function(e){return void 0!==t[e]};return{get:function(e){return t[e]},add:function(i,o){n(i)&&(delete t[i],t[i]=o);var r=Object.keys(t);r.length<e?t[i]=o:(delete t[r[e-1]],t[i]=o)}}}},{}],53:[function(e,t,n){(function(t){var n=(t.jQuery=e("jquery"),e("./app")),i=e("backbone"),o=e("./app_layout"),r=e("./entities/details"),a=e("./entities/recently-viewed"),s=e("./apps/header/header_app"),c=e("./apps/footer/footer_app"),l=e("./apps/medicines/medicines_app"),u=e("./apps/about/about_app"),d=new n,h=new o;d.addService("detailsService",{serviceClass:r}),d.addService("recentlyViewedService",{serviceClass:a
}),d.addSubApp("headerApp",{subAppClass:s,region:h.getRegion("headerRegion")}),d.addSubApp("footerApp",{subAppClass:c,region:h.getRegion("footerRegion")}),d.addSubApp("aboutApp",{subAppClass:u,region:h.getRegion("mainRegion")}),d.addSubApp("medicineApp",{subAppClass:l,region:h.getRegion("mainRegion")});var p=d.getSubApp("headerApp"),b=d.getSubApp("medicineApp"),m=d.getSubApp("footerApp"),g=d.getSubApp("aboutApp"),f=d.getService("recentlyViewedService");d.listenTo(p,"brand:clicked",function(){b.showSearchOption()}),d.listenTo(p,"suggestion:select",function(e){b.showMedicine(e)}),d.listenTo(m,"show:about",function(){g.show()}),d.listenTo(b,"search",function(){p.setSearchVisibility(!1)}),d.listenTo(b,"show",function(e){p.setSearchVisibility(!0),f.addItem(e)}),i.history.start()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./app":1,"./app_layout":2,"./apps/about/about_app":3,"./apps/footer/footer_app":8,"./apps/header/header_app":12,"./apps/medicines/medicines_app":19,"./entities/details":50,"./entities/recently-viewed":51,backbone:"backbone",jquery:"jquery"}],54:[function(e,t,n){!function(i,o,r){"use strict";"object"==typeof n?t.exports=o(e("underscore"),e("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],function(e,t){return e=e===r?i._:e,t=t===r?i.Backbone:t,i.returnExportsGlobal=o(e,t,i)}):i.returnExportsGlobal=o(i._,i.Backbone)}(this,function(e,t,n,i){"use strict";t=t===i?n.Backbone:t,e=e===i?n._:e;var o=function(){},r=t.Model.prototype.get,a=t.Model.prototype.set,s=t.Model.prototype.toJSON;return o.prototype.mutators={},o.prototype.get=function(t){var n=this.mutators!==i;return n===!0&&e.isFunction(this.mutators[t])===!0?this.mutators[t].call(this):n===!0&&e.isObject(this.mutators[t])===!0&&e.isFunction(this.mutators[t].get)===!0?this.mutators[t].get.call(this):r.call(this,t)},o.prototype.set=function(t,n,o){var r=this.mutators!==i,s=null,c=null;return s=a.call(this,t,n,o),e.isObject(t)||null===t?(c=t,o=n):(c={},c[t]=n),r===!0&&e.isObject(this.mutators[t])===!0&&(e.isFunction(this.mutators[t].set)===!0?s=this.mutators[t].set.call(this,t,c[t],o,e.bind(a,this)):e.isFunction(this.mutators[t])&&(s=this.mutators[t].call(this,t,c[t],o,e.bind(a,this)))),r===!0&&e.isObject(c)&&e.each(c,e.bind(function(t,n){if(e.isObject(this.mutators[n])===!0){var r=this.mutators[n];e.isFunction(r.set)&&(r=r.set),e.isFunction(r)&&((o===i||e.isObject(o)===!0&&o.silent!==!0&&o.mutators!==i&&o.mutators.silent!==!0)&&this.trigger("mutators:set:"+n),r.call(this,n,t,o,e.bind(a,this)))}},this)),s},o.prototype.toJSON=function(t){var n,i,o=s.call(this);return e.each(this.mutators,e.bind(function(r,a){e.isObject(this.mutators[a])===!0&&e.isFunction(this.mutators[a].get)?(n=this.isSaving?this.isSaving(t,r,a):e.has(t||{},"emulateHTTP"),i=this.mutators[a]["transient"],n&&i||(o[a]=e.bind(this.mutators[a].get,this)())):e.isFunction(this.mutators[a])&&(o[a]=e.bind(this.mutators[a],this)())},this)),o},o.prototype.escape=function(t){var n=this.get(t);return e.escape(null==n?"":""+n)},e.extend(t.Model.prototype,o.prototype),t.Mutators=o,o})},{backbone:"backbone",underscore:"underscore"}],55:[function(e,t,n){!function(i,o){"object"==typeof n&&"undefined"!=typeof t?t.exports=o(e("underscore"),e("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],o):(i.Backbone=i.Backbone||{},i.Backbone.Radio=o(i._,i.Backbone))}(this,function(e,t){"use strict";function n(e,t,n,i){var o=e[t];return n&&n!==o.callback&&n!==o.callback._callback||i&&i!==o.context?void 0:(delete e[t],!0)}function i(t,i,o,r){t||(t={});for(var a=i?[i]:e.keys(t),s=!1,c=0,l=a.length;l>c;c++)i=a[c],t[i]&&n(t,i,o,r)&&(s=!0);return s}function o(t){return u[t]||(u[t]=e.partial(c.log,t))}function r(t){return e.isFunction(t)?t:function(){return t}}e="default"in e?e["default"]:e,t="default"in t?t["default"]:t;var a={};a["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};var s=t.Radio,c=t.Radio={};c.VERSION="1.0.4",c.noConflict=function(){return t.Radio=s,this},c.DEBUG=!1,c._debugText=function(e,t,n){return e+(n?" on the "+n+" channel":"")+': "'+t+'"'},c.debugLog=function(e,t,n){c.DEBUG&&console&&console.warn&&console.warn(c._debugText(e,t,n))};var l=/\s+/;c._eventsApi=function(t,n,i,o){if(!i)return!1;var r={};if("object"===("undefined"==typeof i?"undefined":a["typeof"](i))){for(var s in i){var c=t[n].apply(t,[s,i[s]].concat(o));l.test(s)?e.extend(r,c):r[s]=c}return r}if(l.test(i)){for(var u=i.split(l),d=0,h=u.length;h>d;d++)r[u[d]]=t[n].apply(t,[u[d]].concat(o));return r}return!1},c._callHandler=function(e,t,n){var i=n[0],o=n[1],r=n[2];switch(n.length){case 0:return e.call(t);case 1:return e.call(t,i);case 2:return e.call(t,i,o);case 3:return e.call(t,i,o,r);default:return e.apply(t,n)}};var u={};e.extend(c,{log:function(t,n){if("undefined"!=typeof console){var i=e.drop(arguments,2);console.log("["+t+'] "'+n+'"',i)}},tuneIn:function(e){var t=c.channel(e);return t._tunedIn=!0,t.on("all",o(e)),this},tuneOut:function(e){var t=c.channel(e);return t._tunedIn=!1,t.off("all",o(e)),delete u[e],this}}),c.Requests={request:function(t){var n=e.rest(arguments),i=c._eventsApi(this,"request",t,n);if(i)return i;var o=this.channelName,r=this._requests;if(o&&this._tunedIn&&c.log.apply(this,[o,t].concat(n)),r&&(r[t]||r["default"])){var a=r[t]||r["default"];return n=r[t]?n:arguments,c._callHandler(a.callback,a.context,n)}c.debugLog("An unhandled request was fired",t,o)},reply:function(e,t,n){return c._eventsApi(this,"reply",e,[t,n])?this:(this._requests||(this._requests={}),this._requests[e]&&c.debugLog("A request was overwritten",e,this.channelName),this._requests[e]={callback:r(t),context:n||this},this)},replyOnce:function(t,n,i){if(c._eventsApi(this,"replyOnce",t,[n,i]))return this;var o=this,a=e.once(function(){return o.stopReplying(t),r(n).apply(this,arguments)});return this.reply(t,a,i)},stopReplying:function(e,t,n){return c._eventsApi(this,"stopReplying",e)?this:(e||t||n?i(this._requests,e,t,n)||c.debugLog("Attempted to remove the unregistered request",e,this.channelName):delete this._requests,this)}},c._channels={},c.channel=function(e){if(!e)throw new Error("You must provide a name for the channel.");return c._channels[e]?c._channels[e]:c._channels[e]=new c.Channel(e)},c.Channel=function(e){this.channelName=e},e.extend(c.Channel.prototype,t.Events,c.Requests,{reset:function(){return this.off(),this.stopListening(),this.stopReplying(),this}});var d,h,p=[t.Events,c.Requests];return e.each(p,function(t){e.each(t,function(t,n){c[n]=function(t){return h=e.rest(arguments),d=this.channel(t),d[n].apply(d,h)}})}),c.reset=function(t){var n=t?[this._channels[t]]:this._channels;e.invoke(n,"reset")},c})},{backbone:"backbone",underscore:"underscore"}]},{},[53]);