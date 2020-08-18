var $__build_47_js_47_app_46_js__ = function() {
    "use strict";
    var __moduleName = "build/js/app.js";
    (function(searchString, position) {
        fetchData().then(bootstrapApplication);

        function fetchData() {
            var initInjector = angular.injector(["ng"]);
            var $http = initInjector.get("$http");
            return $http.get("assets/maps/weathercheck.txt").then(function(response) {
                angular.module("orsApp").value("weathercheck", response.data)
            }, function(errorResponse) {
                angular.module("orsApp").value("weathercheck", "")
            })
        }

        function bootstrapApplication() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ["orsApp"])
            })
        }
        var orsApp = angular.module("orsApp", ["orsApp.ors-nav", "orsApp.ors-panel-routing", "orsApp.ors-panel-accessibilityanalysis", "orsApp.ors-header", "orsApp.ors-error", "orsApp.ors-loading", "orsApp.ors-modal", "ui.sortable", "orsApp.messaging-service", "orsApp.map-service", "orsApp.objects-service", "orsApp.locations-service", "orsApp.fuel-service", "orsApp.params-service", "orsApp.request-service", "orsApp.settings-service", "orsApp.utils-service", "orsApp.route-service", "orsApp.landmark-service", "orsApp.cookies-service", "orsApp.aa-service", "orsApp.apikey-factory", "orsApp.GeoFileHandler-service", "ngCookies", "rzModule", "ngAnimate", "ngSanitize", "pascalprecht.translate", "angular-loading-bar", "720kb.tooltips", "orsApp.ors-filters", "orsApp.ors-route-extras", "config", "ngclipboard"]).config(function($locationProvider, $httpProvider) {
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push(function($q, $document, $injector, lists, orsNamespaces, ENV, orsApikeyFactory, weathercheck) {
                return {
                    request: function(config) {
                        var apiKey = ENV.key !== undefined ? ENV.key : orsApikeyFactory.getApiKey() === undefined ? weathercheck : orsApikeyFactory.getApiKey();
                        var ak = "?api_key=" + apiKey;
                        if (config.url === ENV.geocode + "/search" || config.url === ENV.geocode + "/reverse" || config.url === ENV.directions || config.url === ENV.isochrones || config.url === ENV.pois || config.url === ENV.matrix || config.url === ENV.mapsurfer || config.url === ENV.fuel) {
                            config.url += ak
                        }
                        return config || $q.when(config)
                    },
                    response: function(response) {
                        return response
                    },
                    requestError: function(rejection) {
                        return $q.reject(rejection)
                    },
                    responseError: function(rejection) {
                        var messagingService = $injector.get("orsMessagingService");
                        switch (rejection.status) {
                            case 400:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 401:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 403:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 404:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 405:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 413:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 500:
                                messagingService.messageSubject.onNext({
                                    text: "Code " + rejection.data.error.code + ": " + rejection.data.error.message,
                                    color: 0
                                });
                                break;
                            case 503:
                                messagingService.messageSubject.onNext(lists.errors.CONNECTION);
                                break;
                            case 0:
                                messagingService.messageSubject.onNext(lists.errors.CONNECTION);
                                break;
                            default:
                        }
                        return $q.reject(rejection)
                    }
                }
            })
        }).config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeBar = true;
            cfpLoadingBarProvider.includeSpinner = false
        }]).config(["tooltipsConfProvider", function configConf(tooltipsConfProvider) {
            tooltipsConfProvider.configure({
                smart: true,
                size: "small",
                speed: "fast",
                tooltipTemplateUrlCache: false
            })
        }]).config(["$translateProvider", "lists", function($translateProvider, lists) {
            $translateProvider.useSanitizeValueStrategy("sanitizeParameters");
            $translateProvider.useStaticFilesLoader({
                prefix: "languages/",
                suffix: ".json"
            });
            $translateProvider.preferredLanguage("en-US");
            $translateProvider.registerAvailableLanguageKeys(lists.userOptions.languages.all);
            $translateProvider.useLoaderCache("$templateCache")
        }]).controller("RootController", function(orsSettingsFactory, orsObjectsFactory, orsMapFactory, $route, $interval, $http) {
            var ctrl = this;
            ctrl.myOrsMap = orsMapFactory.initMap("map")
        }).run(function($animate, $injector) {
            $animate.enabled(true);
            $injector.get("orsApikeyFactory").setApiKeyInterval()
        });
        angular.module("orsApp").directive("selectOnClick", ["$window", function($window) {
            return {
                restrict: "A",
                link: function(scope, element, attrs) {
                    element.focus(function() {
                        if (!$window.getSelection().toString()) {
                            this.setSelectionRange(0, this.value.length)
                        }
                    })
                }
            }
        }]);
        angular.module("orsApp").directive("indeterminate", [function() {
            return {
                require: "?ngModel",
                link: function(scope, el, attrs, ctrl) {
                    var truthy = true;
                    var falsy = false;
                    var nully = null;
                    ctrl.$formatters = [];
                    ctrl.$parsers = [];
                    ctrl.$render = function() {
                        var d = ctrl.$viewValue;
                        el.data("checked", d);
                        switch (d) {
                            case truthy:
                                el.prop("indeterminate", false);
                                el.prop("checked", true);
                                break;
                            case falsy:
                                el.prop("indeterminate", false);
                                el.prop("checked", false);
                                break;
                            default:
                                el.prop("indeterminate", true);
                                el.prop("checked", false)
                        }
                    };
                    el.bind("click", function() {
                        var d;
                        switch (el.data("checked")) {
                            case falsy:
                                d = truthy;
                                break;
                            default:
                                d = falsy
                        }
                        ctrl.$setViewValue(d);
                        scope.$apply(ctrl.$render)
                    })
                }
            }
        }])
    })();
    return {}
}();
var $__build_47_js_47_filters_46_js__ = function() {
    "use strict";
    var __moduleName = "build/js/filters.js";
    angular.module("orsApp.ors-filters", []).filter("trusted", function($sce) {
        return function(html) {
            return $sce.trustAsHtml(html)
        }
    }).filter("duration", function() {
        return function(input) {
            var hours = Math.floor(input / 3600);
            input %= 3600;
            var minutes = Math.floor(input / 60);
            var seconds = input % 60;
            if (hours < 1 && minutes < 1) {
                return "<b>" + "< 1" + "</b>" + " min"
            } else {
                var HHMM = [];
                if (hours.toString().length == 1) HHMM.push("0" + hours);
                else HHMM.push(hours);
                if (minutes.toString().length == 1) HHMM.push("0" + minutes);
                else HHMM.push(minutes);
                return "<b>" + HHMM.join(":") + "</b>"
            }
        }
    }).filter("distance", ["orsSettingsFactory", function(orsSettingsFactory) {
        function distance(input, round) {
            input = parseInt(input);
            var units = orsSettingsFactory.getUserOptions().units;
            if (units == "km") {
                units = " m";
                if (input >= 1e3) {
                    if (round) {
                        input = (input / 1e3).toFixed()
                    } else {
                        if (input >= 1e6) input = (input / 1e3).toFixed();
                        else input = (input / 1e3).toFixed(1)
                    }
                    units = " km"
                } else {
                    input = input.toFixed()
                }
            } else if (units == "mi") {
                if (round) {
                    input = (input * .000621371192).toFixed()
                } else {
                    input = (input * .000621371192).toFixed(1)
                }
                if (input < .5 && input > .2) {
                    input = (input * 1760).toFixed();
                    units = " yd"
                } else if (input <= .1) {
                    input = (input * 1760 * 3).toFixed();
                    units = " ft"
                }
            }
            input = "<b>" + input + "</b>" + units;
            return input
        }
        distance.$stateful = true;
        return distance
    }]).filter("area", ["orsSettingsFactory", function(orsSettingsFactory) {
        function distance(input, round) {
            input = parseInt(input);
            var units = orsSettingsFactory.getUserOptions().units;
            if (units == "km") {
                input = (input / 1e6).toFixed(2)
            } else if (units == "mi") {
                input = (input / 2589988.11034).toFixed(2)
            }
            input = input + " " + units + "<sup>2</sup>";
            return input
        }
        distance.$stateful = true;
        return distance
    }]).filter("contains", function() {
        return function(array, needle) {
            return array.indexOf(needle) >= 0
        }
    }).filter("round", function() {
        return function(input) {
            var units = arguments[1] !== void 0 ? arguments[1] : "";
            return "<b>" + input.toFixed(1) + "</b>" + units
        }
    }).filter("capitalize", function() {
        return function(str) {
            str = str.split(" ");
            for (var i = 0, x = str.length; i < x; i++) {
                str[i] = str[i][0].toUpperCase() + str[i].substr(1)
            }
            return str.join(" ")
        }
    });
    return {}
}();
var $__build_47_js_47_config_46_js__ = function() {
    "use strict";
    var __moduleName = "build/js/config.js";
    angular.module("config", []).constant("ENV", {
        name: "production",
        geocode: "https://api.openrouteservice.org/pgeocode",
        directions: "https://api.openrouteservice.org/pdirections",
        isochrones: "https://api.openrouteservice.org/pisochrones",
        matrix: "https://api.openrouteservice.org/pmatrix",
        pois: "https://api.openrouteservice.org/ppois",
        shortenlink: "https://api-ssl.bitly.com/v3/shorten",
        landmarks: "https://landmarks-api.openrouteservice.org/",
        mapsurfer: "https://api.openrouteservice.org/pmapsurfer/{z}/{x}/{y}.png",
        fuel: "https://api.openrouteservice.org/pfuel"
    });
    return {}
}();
var $__build_47_js_47_templates_46_js__ = function() {
    "use strict";
    var __moduleName = "build/js/templates.js";
    angular.module("orsApp").run(["$templateCache", function($templateCache) {
        "use strict";
        $templateCache.put("components/ors-error/ors-error.html", '<div ng-attr-class="{{ \'ui message fade \' + $ctrl.message.color }}" ng-if="$ctrl.show" ng-show="$ctrl.show">\r' + "\n" + '    <i class="fa fa-close flright" data-ng-click="$ctrl.show = !$ctrl.show">\r' + "\n" + "    </i>\r" + "\n" + '    <div class="header" ng-bind-html="(\'NOTICE\' | translate)">\r' + "\n" + "    </div>\r" + "\n" + '    <div class="list">\r' + "\n" + '        <span ng-if="$ctrl.message.translate" ng-bind-html="($ctrl.message.translate | translate)">\r' + "\n" + "        </span>\r" + "\n" + '        <span ng-if="$ctrl.message.text" ng-bind-html="$ctrl.message.text">\r' + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("components/ors-header/ors-header.html", "<ul>\r" + "\n" + '    <li style="float: left">\r' + "\n" + '        <a class="brand" href="https://maps.openrouteservice.org">\r' + "\n" + '            <img height="auto" ng-src="https://udukonline.000webhostapp.com/assets/maps/img/logo_white.png" style="margin: -4px 0 0 0;" width="80px"/>\r' + "\n" + "        </a>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <div class="ui simple dropdown item" ng-click="$ctrl.showSettings = !$ctrl.showSettings" tooltips tooltip-template="{{(\'SETTINGS\' | translate)}}" tooltip-side="bottom">\r' + "\n" + '            <i class="fa fa-cog fa-lg">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <div class="ui simple dropdown item">\r' + "\n" + '            <i class="fa fa-lg fa-info-circle">\r' + "\n" + "            </i>\r" + "\n" + '            <div class="menu">\r' + "\n" + '                <a class="item" ng-click="$ctrl.showInfo = !$ctrl.showInfo">\r' + "\n" + '                    <i class="fa fa-fw fa-info">\r' + "\n" + "                    </i>\r" + "\n" + "                    <span ng-bind-html=\"'About <strong>openrouteservice.org</strong>'\">\r" + "\n" + "                    </span>\r" + "\n" + "                </a>\r" + "\n" + '                <a class="item" href="https://openrouteservice.org" target="_blank">\r' + "\n" + '                    <i class="fa fa-fw fa-code">\r' + "\n" + "                    </i>\r" + "\n" + "                    <span ng-bind-html=\"'Openrouteservice API'\">\r" + "\n" + "                    </span>\r" + "\n" + "                </a>\r" + "\n" + '                <a class="item" href="https://disaster.openrouteservice.org" target="_blank">\r' + "\n" + '                    <i class="fa fa-fw fa-fire">\r' + "\n" + "                    </i>\r" + "\n" + "                    <span ng-bind-html=\"'Openrouteservice for disasters'\">\r" + "\n" + "                    </span>\r" + "\n" + "                </a>\r" + "\n" + '                <a class="item" href="https://ask.openrouteservice.org" target="_blank">\r' + "\n" + '                    <i class="fa fa-fw fa-question-circle">\r' + "\n" + "                    </i>\r" + "\n" + "                    <span ng-bind-html=\"'Ask Openrouteservice'\">\r" + "\n" + "                    </span>\r" + "\n" + "                </a>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </li>\r" + "\n" + "</ul>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showSettings" show="$ctrl.showSettings">\r' + "\n" + "    <div ng-include=\"'includes/settings.html'\">\r" + "\n" + "    </div>\r" + "\n" + "</ors-modal>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showInfo" show="$ctrl.showInfo">\r' + "\n" + "    <div ng-include=\"'includes/info.html'\">\r" + "\n" + "    </div>\r" + "\n" + "</ors-modal>");
        $templateCache.put("components/ors-loading/ors-loading.html", '<div class="ors-loading" ng-show="$ctrl.requesting">\r' + "\n" + '\t<div class="ui active mini centered inline loader"></div>\r' + "\n" + "</div>");
        $templateCache.put("components/ors-map/directive-templates/ors-aa-popup.html", '<div class="cm-popup-option" ng-click="add(0)" ng-bind-html="(\'CENTER\' | translate)">\r' + "\n" + "</div>\r" + "\n" + '<div class="cm-popup-option" ng-click="addMarker()" ng-bind-html="(\'CUSTOM_MARKER\' | translate)">\r' + "\n" + "</div>");
        $templateCache.put("components/ors-map/directive-templates/ors-here-popup.html", '<div ng-attr-class="{{ \'ui message ors-map-message fade white\' }}" ng-show="hereShow">\r' + "\n" + '    <div class="flright textcenter"\r' + "\n" + '         data-ng-click="hereShow = !hereShow; mapModel.geofeatures.layerHereMarkers.clearLayers();"\r' + "\n" + "         ng-style=\"{'width': 13 + 'px', 'height': 15 + 'px'}\">\r" + "\n" + '        <i class="fa fa-close">\r' + "\n" + "        </i>\r" + "\n" + "    </div>\r" + "\n" + '    <div tooltips tooltip-template="source: {{address.info.properties.source}}">\r' + "\n" + '        <div class="header" ng-bind-html="address.info.processed.primary">\r' + "\n" + "        </div>\r" + "\n" + '        <div ng-bind-html="address.info.processed.secondary">\r' + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="list">\r' + "\n" + '        <span ng-bind-html="address.position">\r' + "\n" + "        </span>\r" + "\n" + '        <span tooltips tooltip-template="{{(\'COPYYX\' | translate)}}" tooltip-side="top">\r' + "\n" + '            <button class="ors-button" ngclipboard data-clipboard-text="{{address.latLng}}">\r' + "\n" + '                <i class="fa fa-copy"></i>\r' + "\n" + "            </button>\r" + "\n" + "        </span>\r" + "\n" + '        <span tooltips tooltip-template="{{(\'COPYXY\' | translate)}}" tooltip-side="top">\r' + "\n" + '            <button class="ors-button" ngclipboard data-clipboard-text="{{address.lngLat}}">\r' + "\n" + '                <i class="fa fa-copy fa-mirror"></i>\r' + "\n" + "            </button>\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-map/directive-templates/ors-popup.html", '<div class="cm-popup-option" ng-bind-html="(\'START\' | translate)" ng-click="add(0)">\r' + "\n" + "</div>\r" + "\n" + '<div class="cm-popup-option" ng-bind-html="(\'VIA\' | translate)" ng-click="add(1)">\r' + "\n" + "</div>\r" + "\n" + '<div class="cm-popup-option" ng-bind-html="(\'DESTINATION\' | translate)" ng-click="add(2)">\r' + "\n" + "</div>\r" + "\n" + '<div class="cm-popup-option" ng-bind-html="(\'WHATSHERE\' | translate)" ng-click="here()">\r' + "\n" + "</div>");
        $templateCache.put("components/ors-map/directive-templates/ors-route-point-popup.html", '<div class="ors-route-point-popup">\r' + "\n" + '    <div class="item">\r' + "\n" + '        <span class="left">\r' + "\n" + "            <i class=\"fa fa-lg fa-arrows-h\" tooltip-side=\"top\" tooltip-template=\"{{('DISTANCE' | translate)}}{{' ('}}{{('DURATION' | translate)}}{{')'}}\" tooltips=\"\">\r" + "\n" + "            </i>\r" + "\n" + "        </span>\r" + "\n" + '        <span class="right" ng-bind-html="(distanceAtInterpolatedPoint | distance)">\r' + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="item">\r' + "\n" + '        <span class="left">\r' + "\n" + "            <i class=\"fa fa-lg fa-road\" tooltip-side=\"top\" tooltip-template=\"{{ ('waytypes' | translate)}}{{' ('}}{{('SURFACE' | translate)}}{{' | '}}{{('suitability' | translate)}}{{')'}}\" tooltips=\"\">\r" + "\n" + "            </i>\r" + "\n" + "        </span>\r" + "\n" + "        <span class=\"right\" ng-bind-html=\"'<strong>' + (interpolatedRoutePoint.extras.surface | translate) + '</strong> (' + (interpolatedRoutePoint.extras.waytypes | translate) +  ' | ' + interpolatedRoutePoint.extras.suitability + ')' \">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="item" ng-if="interpolatedRoutePoint.heights">\r' + "\n" + '        <span class="left">\r' + "\n" + '            <i class="fa fa-lg fa-area-chart" tooltip-side="top" tooltip-template="{{(\'height\' | translate)}}{{\' & \'}}{{(\'steepness\' | translate)}}" tooltips="">\r' + "\n" + "            </i>\r" + "\n" + "        </span>\r" + "\n" + '        <span class="right" ng-bind-html="(interpolatedRoutePoint.heights.height | distance)">\r' + "\n" + "        </span>\r" + "\n" + '        <span class="right" ng-bind-html="(interpolatedRoutePoint.extras.steepness | trusted)">\r' + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-navigation/ors-nav.html", '<div class="ors-navigation">\r' + "\n" + '    <div class="ors-features">\r' + "\n" + "        <ul>\r" + "\n" + "            <li>\r" + "\n" + '                <button tooltips tooltip-template="{{(\'ROUTING\' | translate)}}" tooltip-side="right" class="ors-button" ng-click="$ctrl.activeMenu = \'/directions\'" ng-link=\'["Directions"]\'>\r' + "\n" + '                    <i class="fa fa-lg fa-road" ng-class="{active : $ctrl.activeMenu === \'/directions\'}">\r' + "\n" + "                    </i>\r" + "\n" + "                </button>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <button tooltips tooltip-template="{{(\'AA\' | translate)}}" tooltip-side="right" class="ors-button" ng-click="$ctrl.activeMenu = \'/reach\'" ng-link=\'["Reach"]\'>\r' + "\n" + '                    <i class="fa fa-lg fa-bullseye" ng-class="{active : $ctrl.activeMenu === \'/reach\'}">\r' + "\n" + "                    </i>\r" + "\n" + "                </button>\r" + "\n" + "            </li>\r" + "\n" + "        </ul>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ors-version">\r' + "\n" + '        <a href="https://github.com/GIScience/openrouteservice-app/tree/master">{{$ctrl.version}}</a>\r' + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<ng-outlet class="ors-outlet">\r' + "\n" + "</ng-outlet>\r" + "\n" + '<ors-error class="ors-error">\r' + "\n" + "</ors-error>");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-controls/ors-aa-controls.html", '<div class="ors-aa-controls">\r' + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.callOptions()" tooltip-side="top" tooltip-template="{{(\'OPTIONS\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-sliders">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + "        <button ng-class=\"{'tiny teal ui button': !$ctrl.disabled, 'tiny teal ui button loading': $ctrl.requesting, 'tiny teal ui button disabled': $ctrl.disabled}\" ng-click=\"$ctrl.calculate()\">\r" + "\n" + '            <i class="fa fa-bullseye">\r' + "\n" + "            </i>\r" + "\n" + "            <span ng-bind-html=\"('GENERATE_ISOCHRONES' | translate)\">\r" + "\n" + "            </span>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="container ors-aa-options" ng-show="$ctrl.showOptions">\r' + "\n" + '    <ors-aa-sliders active-subgroup="$ctrl.activeSubgroup" current-options="$ctrl.currentOptions">\r' + "\n" + "    </ors-aa-sliders>\r" + "\n" + '    <ors-options active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup">\r' + "\n" + "    </ors-options>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-queries.html", '<div ng-repeat="isochroneResponse in $ctrl.aaQueries track by isochroneResponse.info.timestamp;">\r' + "\n" + '    <ors-aa-query attributes="isochroneResponse" intervals-length="$ctrl.aaQueries[$index].features.length" isochrone-idx="$index" on-add="$ctrl.add(obj)" on-de-emph="$ctrl.deEmph()" on-delete="$ctrl.deleteQuery(isoidx)" on-download="$ctrl.downloadQuery(isoidx)" on-emph="$ctrl.emph(isoidx,isonum)" on-share="$ctrl.shareQuery(shareUrl)" on-toggle="$ctrl.toggle(obj)" on-toggle-interval="$ctrl.toggleInterval(obj)" on-zoom="$ctrl.zoomTo(isoidx, isonum)">\r' + "\n" + "    </ors-aa-query>\r" + "\n" + "</div>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showExport" show="$ctrl.showExport">\r' + "\n" + '    <ors-export-query isochrone-data="$ctrl.selectedIsochroneData">\r' + "\n" + "    </ors-export-query>\r" + "\n" + "</ors-modal>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showShare" show="$ctrl.showShare">\r' + "\n" + '    <ors-share share-url="$ctrl.shareUrl">\r' + "\n" + "    </ors-share>\r" + "\n" + "</ors-modal>\r" + "\n");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-query/ors-aa-query.html", '<div class="ors-aa-query">\r' + "\n" + '    <div class="segment">\r' + "\n" + '        <div class="summary" ng-mouseout="$ctrl.deEmph();" ng-mouseover="$ctrl.emph();">\r' + "\n" + '            <div class="ui label tiny block margin-bottom-3" ng-switch="$ctrl.attributes.info.query.range_type">\r' + "\n" + '                <span ng-bind-html="$ctrl.isochroneIdx + 1">\r' + "\n" + "                </span>\r" + "\n" + "                <span ng-bind-html=\"'-'\">\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(\'TIMEDISTANCE\' | translate)" ng-switch-when="time">\r' + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(\'DISTANCE\' | translate)" ng-switch-when="distance">\r' + "\n" + "                </span>\r" + "\n" + '                <div class="detail">\r' + "\n" + '                    <span ng-bind-html="($ctrl.attributes.info.query.ranges[$ctrl.attributes.info.query.ranges.length-1] | distance:true)" ng-switch-when="distance">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="$ctrl.attributes.info.query.ranges[$ctrl.attributes.info.query.ranges.length-1]/60" ng-switch-when="time">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="\'min\'" ng-switch-when="time">\r' + "\n" + "                    </span>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="controls">\r' + "\n" + '            <span ng-click="$ctrl.remove();">\r' + "\n" + '                <i ,="" class="fa fa-remove" tooltip-append-to-body="true" tooltip-hide-trigger="click mouseleave" tooltip-side="top" tooltip-template="{{(\'REMOVE\' | translate)}}" tooltips="">\r' + "\n" + "                </i>\r" + "\n" + "            </span>\r" + "\n" + '            <span ng-click="$ctrl.toggle();">\r' + "\n" + '                <i ng-class="$ctrl.show()" tooltip-append-to-body="true" tooltip-side="top" tooltip-template="{{(\'TOGGLESHOW\' | translate)}}" tooltips="">\r' + "\n" + "                </i>\r" + "\n" + "            </span>\r" + "\n" + '            <span ng-click="$ctrl.zoomTo($ctrl.attributes.info.query.ranges.length-1);">\r' + "\n" + '                <i class="fa fa-expand" tooltip-append-to-body="true" tooltip-side="top" tooltip-template="{{(\'EXPAND\' | translate)}}" tooltips="">\r' + "\n" + "                </i>\r" + "\n" + "            </span>\r" + "\n" + '            <span ng-click="$ctrl.download();">\r' + "\n" + '                <i class="fa fa-download" tooltip-append-to-body="true" tooltip-side="top" tooltip-template="{{(\'DOWNLOAD\' | translate)}}" tooltips="">\r' + "\n" + "                </i>\r" + "\n" + "            </span>\r" + "\n" + '            <span ng-click="$ctrl.share();">\r' + "\n" + '                <i class="fa fa-share-alt" tooltip-append-to-body="true" tooltip-side="top" tooltip-template="{{(\'SHARE_LINK\' | translate)}}" tooltips="">\r' + "\n" + "                </i>\r" + "\n" + "            </span>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="segment" ng-mouseout="$ctrl.deEmph();" ng-mouseover="$ctrl.emph();">\r' + "\n" + '        <div class="icon" ng-switch="$ctrl.attributes.info.query.profile">\r' + "\n" + '            <div ng-switch-when="driving-car">\r' + "\n" + '                <i class="fa fa-lg fa-car">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + '            <div ng-switch-when="cycling-regular|cycling-road|cycling-safe|cycling-mountain|cycling-tour" ng-switch-when-separator="|">\r' + "\n" + '                <i class="fa fa-lg fa-bicycle">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + '            <div ng-switch-when="driving-hgv">\r' + "\n" + '                <i class="fa fa-lg fa-bus">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + '            <div ng-switch-when="wheelchair">\r' + "\n" + '                <i class="fa fa-lg fa-wheelchair">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + '            <div ng-switch-when="foot-walking ||� foot-hiking">\r' + "\n" + '                <i class="fa fa-lg fa-male">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="waypoint">\r' + "\n" + '            <h4 ng-bind-html="$ctrl.attributes.info.address">\r' + "\n" + "            </h4>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="opacitySlider">\r' + "\n" + '            <rzslider rz-slider-model="$ctrl.isochroneOpacitySlider.value" rz-slider-options="$ctrl.isochroneOpacitySlider.options" >\r' + "\n" + "            </rzslider>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="margin-bottom-10 pointer" ng-click="showIsochrones = !showIsochrones">\r' + "\n" + '        <i ng-class="$ctrl.getClass(showIsochrones)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('ISOCHRONES' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: showIsochrones }">\r' + "\n" + '        <table class="ui celled teal compact small table">\r' + "\n" + "            <thead>\r" + "\n" + '                <tr ng-switch="$ctrl.attributes.info.query.range_type">\r' + "\n" + "                    <th>\r" + "\n" + "                        <span ng-bind-html=\"('RANGE' | translate)\">\r" + "\n" + "                        </span>\r" + "\n" + "                    </th>\r" + "\n" + "                    <th>\r" + "\n" + "                        <span ng-bind-html=\"('AREA' | translate)\">\r" + "\n" + "                        </span>\r" + "\n" + "                    </th>\r" + "\n" + '                    <th ng-switch-when="time">\r' + "\n" + "                        <span ng-bind-html=\"('REACHFACTOR' | translate)\">\r" + "\n" + "                        </span>\r" + "\n" + "                    </th>\r" + "\n" + "                    <th>\r" + "\n" + "                        <span ng-bind-html=\"('TOTALPOP' | translate)\"\r" + "\n" + "                    </th>\r" + "\n" + "                    <th>\r" + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-check"></i>\r' + "\n" + "                        </span>\r" + "\n" + "                    </th>\r" + "\n" + "                </tr>\r" + "\n" + "            </thead>\r" + "\n" + '            <tbody align="right">\r' + "\n" + '                <tr class="pointer" ng-class="{highlight: hover}" ng-click="$ctrl.zoomTo($index); $event.stopPropagation();" ng-mouseout="$ctrl.deEmph(); hover=false;" ng-mouseover="$ctrl.emph($index); hover=true;" ng-repeat="isochrone in $ctrl.attributes.info.query.ranges" ng-switch="$ctrl.attributes.info.query.range_type">\r' + "\n" + "                    <td>\r" + "\n" + '                        <span ng-bind-html="(isochrone | distance:true)" ng-switch-when="distance">\r' + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(isochrone/60)" ng-switch-when="time">\r' + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="\'min\'" ng-switch-when="time">\r' + "\n" + "                        </span>\r" + "\n" + "                    </td>\r" + "\n" + "                    <td>\r" + "\n" + '                        <span ng-bind-html="($ctrl.attributes.features[$index].properties.area | area)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </td>\r" + "\n" + '                    <td ng-switch-when="time">\r' + "\n" + '                        <span ng-bind-html="($ctrl.attributes.features[$index].properties.reachfactor | number: 2)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </td>\r" + "\n" + "                    <td>\r" + "\n" + '                        <span ng-bind-html="($ctrl.attributes.features[$index].properties.total_pop)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </td>\r" + "\n" + "                    <td>\r" + "\n" + '                        <span ng-click="$ctrl.deEmph(); $ctrl.toggleInterval($index, $event, ctrl.showIntervals[$index]);">\r' + "\n" + "                        <i ng-class=\"$ctrl.showIntervals[$index] ? 'fa fa-toggle-on': 'fa fa-toggle-off'\"></i>\r" + "\n" + "                        </span>\r" + "\n" + "                    </td>\r" + "\n" + "                </tr>\r" + "\n" + "            </tbody>\r" + "\n" + "        </table>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-export-query/ors-export-query.html", "<header>\r" + "\n" + "    <h1 ng-bind-html=\"('DOWNLOAD_ISOCHRONES' | translate)\">\r" + "\n" + "    </h1>\r" + "\n" + "</header>\r" + "\n" + "<section>\r" + "\n" + "    <div>\r" + "\n" + "        <label ng-bind-html=\"('FILE_NAME' | translate)\">\r" + "\n" + "        </label>\r" + "\n" + '        <div class="ui input">\r' + "\n" + '            <input ng-model="$ctrl.filename" required="" select-on-click="">\r' + "\n" + "            </input>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + "        <label ng-bind-html=\"('FILE_FORMAT' | translate)\">\r" + "\n" + "            File Format\r" + "\n" + "        </label>\r" + "\n" + '        <select ng-change="$ctrl.change_fileFormat($ctrl.selected_fileformat)" ng-model="$ctrl.selected_fileformat" ng-options="fileFormatOpt.text for fileFormatOpt in $ctrl.fileFormat">\r' + "\n" + "        </select>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + '    <button ng-bind-html="(\'DOWNLOAD\' | translate)" ng-click="$ctrl.exportRoute()">\r' + "\n" + "    </button>\r" + "\n" + "</section>");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-sliders/ors-aa-sliders.html", "<div class=\"options-box\" ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'Bicycle' || $ctrl.activeSubgroup == 'Wheelchair' || $ctrl.activeSubgroup == 'HeavyVehicle' || $ctrl.activeSubgroup == 'Pedestrian'\">\r" + "\n" + '    <div class="pointer" ng-click="aaSlidersOptions = !aaSlidersOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(aaSlidersOptions);">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('ISOCHRONE_OPTIONS' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: aaSlidersOptions }">\r' + "\n" + '        <div class="ors-options-menu"> \r' + "\n" + '            <div class="ui label tiny margin-bottom-10">\r' + "\n" + "                <span ng-bind-html=\"('ISOCHRONEMETHOD' | translate)\">\r" + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui form">\r' + "\n" + '                <div class="inline fields">\r' + "\n" + '                    <div class="field">\r' + "\n" + '                        <div class="ui radio checkbox">\r' + "\n" + '                            <input id="method-time" name="frequency" ng-click="$ctrl.changeOptions(true)" ng-model="$ctrl.currentOptions.analysis_options.method" ng-value="$ctrl.optionList.methodOptions.TIME.id" type="radio">\r' + "\n" + '                                <label for="method-time" ng-bind-html="(\'METHODTIME\' | translate)">\r' + "\n" + "                                </label>\r" + "\n" + "                            </input>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="field">\r' + "\n" + '                        <div class="ui radio checkbox">\r' + "\n" + '                            <input id="method-unpaved" name="frequency" ng-click="$ctrl.changeOptions(true)" ng-model="$ctrl.currentOptions.analysis_options.method" ng-value="$ctrl.optionList.methodOptions.DISTANCE.id" type="radio">\r' + "\n" + '                                <label for="method-unpaved" ng-bind-html="(\'METHODDISTANCE\' | translate)">\r' + "\n" + "                                </label>\r" + "\n" + "                            </input>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="reverse-flow" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.analysis_options.reverseflow" type="checkbox">\r' + "\n" + '                    <label for="reverse-flow" ng-bind-html="(\'REVERSEFLOW\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <div class="ui label tiny" ng-switch="$ctrl.currentOptions.analysis_options.method">\r' + "\n" + '                <span ng-bind-html="(\'TIMEDISTANCE\' | translate)" ng-switch-when="0">\r' + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(\'DISTANCE\' | translate)" ng-switch-when="1">\r' + "\n" + "                </span>\r" + "\n" + '                <div class="detail">\r' + "\n" + '                    <span ng-bind-html="($ctrl.isochroneMinutesSlider.value*1000 | distance:true)" ng-switch-when="1">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="$ctrl.isochroneMinutesSlider.value" ng-switch-when="0">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="\'min\'" ng-switch-when="0">\r' + "\n" + "                    </span>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.isochroneMinutesSlider.value" rz-slider-options="$ctrl.isochroneMinutesSlider.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <div class="ui label tiny" ng-switch="$ctrl.currentOptions.analysis_options.method">\r' + "\n" + "                <span ng-bind-html=\"('ISOCHRONEINTERVAL' | translate)\">\r" + "\n" + "                </span>\r" + "\n" + '                <div class="detail">\r' + "\n" + '                    <span ng-bind-html="($ctrl.isochroneIntervalSlider.value*1000 | distance: true)" ng-switch-when="1">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="$ctrl.isochroneIntervalSlider.value" ng-switch-when="0">\r' + "\n" + "                    </span>\r" + "\n" + '                    <span ng-bind-html="\'min\'" ng-switch-when="0">\r' + "\n" + "                    </span>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.isochroneIntervalSlider.value" rz-slider-options="$ctrl.isochroneIntervalSlider.options">\r' + "\n" + "            </rzslider>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoint/ors-aa-waypoint.html", '<div class="ors-wp-item">\r' + "\n" + '    <div class="wp-aa-input">\r' + "\n" + '        <div class="ui left icon fluid input">\r' + "\n" + '            <i class="fa fa-search icon">\r' + "\n" + "            </i>\r" + "\n" + '            <input ng-click="$ctrl.callGeocodingPanel()" ng-model="$ctrl.waypoint._address" placeholder="{{$ctrl.getPlaceholder()}}" type="text" ng-readonly="true">\r' + "\n" + "            </input>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoints.html", '<div ng-model="$ctrl.waypoints" class="ors-wp-list">\r' + "\n" + '     <div ng-repeat="waypoint in $ctrl.waypoints" ng-show="$ctrl.collapseWp($index)" class="ors-wp-container">\r' + "\n" + '     \t<ors-aa-waypoint idx="$index" on-delete="$ctrl.deleteWaypoint(idx)" on-waypoints-changed="$ctrl.waypointsChanged()" waypoint="waypoint" waypoints="$ctrl.waypoints" show-add="$ctrl.showAdd" show-geocoding-panel="$ctrl.showGeocodingPanel">\r' + "\n" + "\t\t</ors-aa-waypoint>\r" + "\n" + "\t</div>\r" + "\n" + "</div>\r" + "\n" + '<div class="bottom-border"></div>\r' + "\n" + '<ors-aa-controls on-calculate="$ctrl.calculate()" active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" current-options="$ctrl.currentOptions"></ors-aa-controls>\r' + "\n" + '<div class="bottom-border"></div>');
        $templateCache.put("components/ors-panel-accessibilityanalysis/ors-panel-accessibilityanalysis.html", '<ors-profiles-options active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" class="ors-profiles-options" ng-show="!$ctrl.showGeocodingPanel" ors-params="$ctrl.routeParams" profiles="$ctrl.profiles" show-options="$ctrl.showOptions">\r' + "\n" + "</ors-profiles-options>\r" + "\n" + '<div class="ors-analysis-settings" ng-show="!$ctrl.showGeocodingPanel">\r' + "\n" + '    <ors-aa-waypoints active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" current-options="$ctrl.currentOptions" ors-map="$ctrl.parent.orsMap" ors-params="$ctrl.routeParams" show-geocoding-panel="$ctrl.showGeocodingPanel" show-options="$ctrl.showOptions">\r' + "\n" + "    </ors-aa-waypoints>\r" + "\n" + "</div>\r" + "\n" + '<div class="ors-routing-inner" ng-show="!$ctrl.showGeocodingPanel">\r' + "\n" + "    <ors-aa-queries>\r" + "\n" + "    </ors-aa-queries>\r" + "\n" + "</div>\r" + "\n" + '<ors-addresses ng-if="$ctrl.showGeocodingPanel" show-geocoding-panel="$ctrl.showGeocodingPanel">\r' + "\n" + "</ors-addresses>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-addresses/ors-addresses.html", '<div class="ors-addresses-input">\r' + "\n" + '    <div class="ui left icon input">\r' + "\n" + '        <input ng-change="$ctrl.addressChanged()" ng-model="$ctrl.waypoint._address" ng-model-options="{debounce: 1000}" placeholder="{{$ctrl.getPlaceholder()}}" focus-if select-on-click="" type="text">\r' + "\n" + "        </input>\r" + "\n" + '        <i class="fa fa-search icon">\r' + "\n" + "        </i>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="tiny ui basic button ors-control-button" ng-class="{show: hoverInput}" ng-click="$ctrl.showGeocodingPanel = !$ctrl.showGeocodingPanel">\r' + "\n" + '            <i class="fa fa-lg fa-remove">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="bottom-border">\r' + "\n" + "</div>\r" + "\n" + "<div>\r" + "\n" + "    <ors-loading>\r" + "\n" + "    </ors-loading>\r" + "\n" + "</div>\r" + "\n" + '<div class="ors-addresses-container">\r' + "\n" + '    <div class="addresses-list" ng-if="!$ctrl.isLoading">\r' + "\n" + '        <div ng-click="$ctrl.select(feature)" ng-repeat="feature in $ctrl.addresses">\r' + "\n" + '            <div class="content" tooltip-side="{{$index == 0 ? \'bottom\' : \'top\'}}" tooltip-template="source: {{feature.properties.source}}"  tooltips="">\r' + "\n" + '                <div class="left" ng-switch="" on="feature.processed.place_type">\r' + "\n" + '                    <div ng-switch-when="address|street|neighbourhood" ng-switch-when-separator="|">\r' + "\n" + '                        <i class="fa fa-lg fa-map-marker">\r' + "\n" + "                        </i>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-switch-when="venue">\r' + "\n" + '                        <i class="fa fa-lg fa-building">\r' + "\n" + "                        </i>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-switch-when="localadmin|locality" ng-switch-when-separator="|">\r' + "\n" + '                        <i class="fa fa-lg fa-image">\r' + "\n" + "                        </i>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-switch-when="country|macrocountry|region|macroregion" ng-switch-when-separator="|">\r' + "\n" + '                        <i class="fa fa-lg fa-globe">\r' + "\n" + "                        </i>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-switch-default="">\r' + "\n" + '                        <i class="fa fa-lg fa-circle">\r' + "\n" + "                        </i>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="right">\r' + "\n" + "                    <div>\r" + "\n" + '                        <h3 ng-bind-html="feature.processed.primary">\r' + "\n" + "                        </h3>\r" + "\n" + "                    </div>\r" + "\n" + "                    <div>\r" + "\n" + '                        <span ng-bind-html="feature.processed.secondary">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="bottom-border">\r' + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-export-route/ors-export-route.html", "<header>\r" + "\n" + "    <h1 ng-bind-html=\"('DOWNLOAD_ROUTE' | translate)\">\r" + "\n" + "    </h1>\r" + "\n" + "</header>\r" + "\n" + "<section>\r" + "\n" + "    <div>\r" + "\n" + "        <label ng-bind-html=\"('FILE_NAME' | translate)\">\r" + "\n" + "        </label>\r" + "\n" + '        <div class="ui input">\r' + "\n" + '            <input ng-model="$ctrl.filename" required="" select-on-click="">\r' + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + "        <label ng-bind-html=\"('FILE_FORMAT' | translate)\">\r" + "\n" + "        </label>\r" + "\n" + '        <select class="ui selection dropdown" ng-change="$ctrl.change_fileFormat($ctrl.selected_fileformat)"\r' + "\n" + '                ng-model="$ctrl.selected_fileformat"\r' + "\n" + '                ng-options="fileFormatOpt.text for fileFormatOpt in $ctrl.fileFormat">\r' + "\n" + "        </select>\r" + "\n" + "    </div>\r" + "\n" + '    <div ng-if="$ctrl.geojsonOptShow">\r' + "\n" + "        <br>\r" + "\n" + '        <div class="ui checkbox">\r' + "\n" + '            <input type="checkbox" id="elevation" data-ng-model="$ctrl.elevation"\r' + "\n" + '                   ng-click="$ctrl.elevation != $ctrl.elevation"/>\r' + "\n" + '            <label for="elevation" ng-bind-html="(\'ELEVATION\' | translate)"></label>\r' + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div ng-if="$ctrl.gpxOptShow">\r' + "\n" + "        <br>\r" + "\n" + '        <div class="field ors-inline">\r' + "\n" + '            <div class="ui radio checkbox">\r' + "\n" + '                <input ng-model="$ctrl.toGpx"\r' + "\n" + '                       ng-value=true type="radio">\r' + "\n" + '                <label ng-click="$ctrl.toGpx = true">togpx\r' + "\n" + "                </label>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="field ors-inline">\r' + "\n" + '            <div class="ui radio checkbox">\r' + "\n" + '                <input  ng-model="$ctrl.toGpx"\r' + "\n" + '                        ng-value=false type="radio">\r' + "\n" + '                <label ng-click="$ctrl.toGpx = false">Ors API\r' + "\n" + "                </label>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div ng-if="!$ctrl.toGpx">\r' + "\n" + "            <br>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input type="checkbox" id="instructions" data-ng-model="$ctrl.instructions"\r' + "\n" + '                       ng-click="$ctrl.instructions != $ctrl.instructions">\r' + "\n" + '                <label for="instructions" ng-bind-html="(\'INCLUDE_INSTRUCTIONS\' | translate)"></label>\r' + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + '    <button class="ui mini button" ng-bind-html="(\'DOWNLOAD\' | translate)" ng-click="$ctrl.exportRoute()">\r' + "\n" + "    </button>\r" + "\n" + "</section>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-import-route/import_route_tpl.html", "<header>\r" + "\n" + "    <h1 ng-bind-html=\"('IMPORT_ROUTE' | translate)\">\r" + "\n" + "    </h1>\r" + "\n" + "</header>\r" + "\n" + "<section>\r" + "\n" + '    <label class="ui icon mini button" for="importFiles">\r' + "\n" + '        <i class="fa fa-fw fa-upload icon">\r' + "\n" + "        </i>\r" + "\n" + "        {{'SELECT_FILES' | translate}}\r" + "\n" + "    </label>\r" + "\n" + '    <input accept=".gpx,.tcx,.gml,.kml,.geojson" id="importFiles" multiple="" name="file" onchange="angular.element(this).scope().$ctrl.fileNameChanged(this)" style="display: none;" type="file">\r' + "\n" + "    </input>\r" + "\n" + "</section>\r" + "\n" + '<div class="ui divider">\r' + "\n" + "</div>\r" + "\n" + '<section ng-show="$ctrl.uploadedFiles.length > 0">\r' + "\n" + "    <div>\r" + "\n" + '        <table class="ui celled striped table">\r' + "\n" + "            <thead>\r" + "\n" + "                <tr>\r" + "\n" + "                    <th ng-bind-html=\"('FILE_NAME' | translate)\">\r" + "\n" + "                    </th>\r" + "\n" + "                    <th ng-bind-html=\"('PREVIEW' | translate)\">\r" + "\n" + "                    </th>\r" + "\n" + "                    <th ng-bind-html=\"('IMPORT_TRACK' | translate)\">\r" + "\n" + "                    </th>\r" + "\n" + "                </tr>\r" + "\n" + "            </thead>\r" + "\n" + "            <tbody>\r" + "\n" + '                <tr ng-repeat="file in $ctrl.uploadedFiles">\r' + "\n" + '                    <td ng-bind-html="file.name">\r' + "\n" + "                    </td>\r" + "\n" + "                    <td>\r" + "\n" + '                        <div class="ui fluid checkbox">\r' + "\n" + '                            <input ng-change="$ctrl.previewRoute(file)" ng-model="file.preview" type="checkbox">\r' + "\n" + "                                <label ng-bind-html=\"('TOGGLESHOW' | translate)\">\r" + "\n" + "                                </label>\r" + "\n" + "                            </input>\r" + "\n" + "                        </div>\r" + "\n" + "                    </td>\r" + "\n" + "                    <td>\r" + "\n" + '                        <button class="ui mini button" ng-bind-html="(\'IMPORT\' | translate)" ng-click="$ctrl.importRoute(file)" type="submit">\r' + "\n" + "                        </button>\r" + "\n" + "                    </td>\r" + "\n" + "                </tr>\r" + "\n" + "            </tbody>\r" + "\n" + "        </table>\r" + "\n" + "    </div>\r" + "\n" + "</section>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-instructions/ors-instructions.html", '<div class="ors-instructions-summary">\r' + "\n" + '    <div class="header">\r' + "\n" + '        <div class="left">\r' + "\n" + '            <div class="pointer" ng-click="$ctrl.showInstructions()">\r' + "\n" + '                <i class="fa fa-lg fa-arrow-left">\r' + "\n" + "                </i>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="right">\r' + "\n" + "            <div>\r" + "\n" + "                <span ng-bind-html=\"('FROM' | translate)\">\r" + "\n" + "                </span>\r" + "\n" + "                <span ng-bind-html=\"'<b>' + $ctrl.waypoints[0]._address + '</b>'\">\r" + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + "            <div>\r" + "\n" + "                <span ng-bind-html=\"('TO' | translate)\">\r" + "\n" + "                </span>\r" + "\n" + "                <span ng-bind-html=\"'<b>' + $ctrl.waypoints[$ctrl.waypoints.length-1]._address + '</b>'\">\r" + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "    <ors-loading>\r" + "\n" + "    </ors-loading>\r" + "\n" + '    <div ng-if="!$ctrl.isLoading" ng-include="\'includes/route-summary.html\'">\r' + "\n" + "    </div>\r" + "\n" + '    <div class="bottom-border"></div>\r' + "\n" + '    <div class="options-box" ng-if="$ctrl.route.extras">\r' + "\n" + '        <div class="pointer margin-bottom-6" ng-click="showRouteExtras = !showRouteExtras">\r' + "\n" + '            <i ng-class="$ctrl.getClass(showRouteExtras)">\r' + "\n" + "            </i>\r" + "\n" + "            <span ng-bind-html=\"('EXTRAS' | translate)\">\r" + "\n" + "            </span>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="collapsable" ng-class="{ showMe: showRouteExtras }">\r' + "\n" + '            <ors-route-extras current-route="$ctrl.route" ng-if="$ctrl.route.extras" route-index="$ctrl.routeIndex">\r' + "\n" + "            </ors-route-extras>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="bottom-border"></div>\r' + "\n" + '<div class="ors-instructions-inner" ng-if="!$ctrl.isLoading">\r' + "\n" + "    <div ng-include=\"'includes/route-instructions.html'\">\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<ors-modal data-ng-show="$ctrl.showExport" show="$ctrl.showExport">\r' + "\n" + "    <ors-export-route-controls>\r" + "\n" + "    </ors-export-route-controls>\r" + "\n" + "</ors-modal>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showShare" show="$ctrl.showShare">\r' + "\n" + "    <ors-share>\r" + "\n" + "    </ors-share>\r" + "\n" + "</ors-modal>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-panel-routing.html", '<ors-profiles-options active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" class="ors-profiles-options" ng-show="$ctrl.shouldDisplayRouteDetails == false && $ctrl.showGeocodingPanel == false" ors-params="$ctrl.routeParams" profiles="$ctrl.profiles">\r' + "\n" + "</ors-profiles-options>\r" + "\n" + '<div class="ors-routing-inner" ng-show="$ctrl.shouldDisplayRouteDetails == false && $ctrl.showGeocodingPanel == false">\r' + "\n" + "    <div>\r" + "\n" + '        <ors-waypoints active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" ors-map="$ctrl.parent.orsMap" ors-params="$ctrl.routeParams" show-options="$ctrl.showOptions" show-geocoding-panel="$ctrl.showGeocodingPanel" show-geocoding-panel-idx="$ctrl.showGeocodingPanelIdx">\r' + "\n" + "        </ors-waypoints>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + "        <ors-loading>\r" + "\n" + "        </ors-loading>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <ors-summaries should-display-route-details="$ctrl.shouldDisplayRouteDetails" show-instructions="$ctrl.showInstructions()">\r' + "\n" + "        </ors-summaries>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<ors-instructions ng-if="$ctrl.shouldDisplayRouteDetails" should-display-route-details="$ctrl.shouldDisplayRouteDetails" show-instructions="$ctrl.showInstructions()">\r' + "\n" + "</ors-instructions>\r" + "\n" + '<ors-addresses ng-if="$ctrl.showGeocodingPanel" show-geocoding-panel-idx="$ctrl.showGeocodingPanelIdx" show-geocoding-panel="$ctrl.showGeocodingPanel">\r' + "\n" + "</ors-addresses>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-route-extras/ors-route-extras-map/ors-route-extras-map.html", '<div ng-click="$ctrl.updateExtrasColor($ctrl.checkboxes[$ctrl.i])" tooltip-side="left" tooltip-template="{{(\'ADD_EXTRAS\' | translate)}}"" tooltips="">\r' + "\n" + "    <i ng-class=\"{ 'fa fa-map-o': !$ctrl.checkboxes[$ctrl.i] , 'fa fa-map': $ctrl.checkboxes[$ctrl.i]  }\">\r" + "\n" + "    </i>\r" + "\n" + "</div>\r" + "\n" + "\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-route-extras/ors-route-extras.html", '<div class="ui-divider">\r' + "\n" + "</div>\r" + "\n" + '<div class="ors-extras" ng-repeat="obj in $ctrl.routeExtras">\r' + "\n" + '\t<div class="extras-item">\r' + "\n" + '\t    <ors-bars-chart key="obj.type" obj="obj.data" route-index="obj.routeIndex" types-order="obj.typesOrder">\r' + "\n" + "\t    </ors-bars-chart>\r" + "\n" + '\t     <div class="ors-extras-button">\r' + "\n" + '\t        <ors-route-extras-map checkboxes="$ctrl.checkboxes" extra="obj.type" i="$index" route-index="obj.routeIndex"  types="obj.data">\r' + "\n" + "\t        </ors-route-extras-map>\r" + "\n" + "\t    </div>\r" + "\n" + "\t</div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-panel-routing/ors-summary/ors-summary.html", '<div class="ors-summary">\r' + "\n" + "    <ul>\r" + "\n" + '        <li data-ng-repeat="route in $ctrl.data.routes">\r' + "\n" + '            \x3c!-- <div ng-include="\'includes/route-summary.html\'" ng-mouseout="$ctrl.DeEmphRoute()" ng-mouseover="$ctrl.EmphRoute($index)">\r' + "\n" + "            </div> --\x3e\r" + "\n" + "            <div ng-include=\"'includes/route-summary.html'\">\r" + "\n" + "            </div>\r" + "\n" + '            <div class="bottom-border">\r' + "\n" + "            </div>\r" + "\n" + '            <div class="options-box" ng-if="route.extras">\r' + "\n" + '                <div class="pointer margin-bottom-6" ng-click="showRouteExtras = !showRouteExtras" ng-init="showRouteExtras = true;">\r' + "\n" + "                    <span>\r" + "\n" + '                        <i ng-class="$ctrl.getClass(showRouteExtras)">\r' + "\n" + "                        </i>\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"('EXTRAS' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + '                    <span tooltip-side="top" tooltip-template="{{(\'LOCALE_EXTRAS_HELP\' | translate)}}" tooltips="">\r' + "\n" + '                        <i class="fa fa-fw fa-info-circle">\r' + "\n" + "                        </i>\r" + "\n" + "                    </span>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="collapsable" ng-class="{ showMe: showRouteExtras }">\r' + "\n" + '                    <ors-route-extras checkboxes="$ctrl.checkboxes" current-route="route" route-index="$index">\r' + "\n" + "                    </ors-route-extras>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="bottom-border">\r' + "\n" + "            </div>\r" + "\n" + '            <div class="options-box" ng-if="route.summary.ofs">\r' + "\n" + '                <div class="margin-bottom-6" ng-click="showFuelInfo = !showFuelInfo" ng-init="showFuelInfo = true;">\r' + "\n" + "                    <span>\r" + "\n" + '                        <i ng-class="$ctrl.getClass(showFuelInfo)">\r' + "\n" + "                        </i>\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"('FUEL_CONSUMPTION' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + "                </div>\r" + "\n" + "                <div style=\"color: grey; font-style: italic\" ng-if=\"showFuelInfo\" ng-bind-html=\"('_FOR' | translate) + ' ' + route.summary.ofs.request_id + ':'\"></div>\r" + "\n" + "                <br>\r" + "\n" + '                <div ng-repeat="(vehicleClass, info) in route.summary.ofs[\'fuel_stats\']" ng-if="showFuelInfo">\r' + "\n" + "                    <div ng-if=\"$ctrl.classInQuery(route.summary.ofs, vehicleClass) || (vehicleClass==='individual' && $first)\">\r" + "\n" + "                        <div ng-if=\"info['category_info']['calculation_errors'] !== 'No Errors'\">\r" + "\n" + "                            <div>Not enough data to calculate category {{$ctrl.carCategories[vehicleClass].en}}</div>\r" + "\n" + "                        </div>\r" + "\n" + "                        <div ng-if=\"info['category_info']['calculation_errors'] === 'No Errors'\">\r" + "\n" + '                            <div ng-if="heading !== \'route\'" ng-repeat="(heading, content) in info">\r' + "\n" + '                                <table class="ui celled teal compact small table">\r' + "\n" + "                                    <thead>\r" + "\n" + "                                        <tr>\r" + "\n" + "                                            <th ng-bind-html=\"heading.split('_').join(' ') | capitalize\"></th><th></th>\r" + "\n" + "                                        </tr>\r" + "\n" + "                                    </thead>\r" + "\n" + '                                    <tbody align="right">\r' + "\n" + '                                    <tr ng-repeat="(key,value) in content">\r' + "\n" + "                                        <td class=\"entry\" ng-bind-html=\"key.split('_').join(' ').replace('per','/')\"></td>\r" + "\n" + '                                        <td class="entry">{{value}}</td>\r' + "\n" + "                                    </tr>\r" + "\n" + "                                    </tbody>\r" + "\n" + "                                </table>\r" + "\n" + "                                <br>\r" + "\n" + "                            </div>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div ng-if="route.summary.ofs[\'attributions\'] && showFuelInfo" style="color: grey; font-style: italic">\r' + "\n" + "                    <div >Attributions:</div>\r" + "\n" + "                    <div ng-repeat=\"source in route.summary.ofs['attributions']\">{{source}}</div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="bottom-border">\r' + "\n" + "            </div>\r" + "\n" + "        </li>\r" + "\n" + "    </ul>\r" + "\n" + "</div>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showExport" show="$ctrl.showExport">\r' + "\n" + "    <ors-export-route-controls>\r" + "\n" + "    </ors-export-route-controls>\r" + "\n" + "</ors-modal>\r" + "\n" + '<ors-modal data-ng-if="$ctrl.showShare" show="$ctrl.showShare">\r' + "\n" + "    <ors-share>\r" + "\n" + "    </ors-share>\r" + "\n" + "</ors-modal>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-options/ors-options.html", '<div class="options-box" ng-if="$ctrl.routing">\r' + "\n" + '    <div class="pointer" ng-click="routeweightOptions = !routeweightOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(routeweightOptions)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('PREFERENCE' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: routeweightOptions }">\r' + "\n" + '        <div class="ors-options-menu">\r' + "\n" + '            <div class="ui label tiny flleft">\r' + "\n" + "                <span ng-bind-html=\"('WEIGHT' | translate)\">\r" + "\n" + "                </span>\r" + "\n" + '                <div class="detail" ng-bind-html="($ctrl.weightSlider.value | translate)">\r' + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.weightSlider.value" rz-slider-options="$ctrl.weightSlider.options">\r' + "\n" + "            </rzslider>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + "<div class=\"options-box\" ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'Bicycle' || $ctrl.activeSubgroup == 'Wheelchair' || $ctrl.activeSubgroup == 'HeavyVehicle' || $ctrl.activeSubgroup == 'Pedestrian'\">\r" + "\n" + '    <div class="pointer" ng-click="avoidablesOptions = !avoidablesOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(avoidablesOptions)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('AVOIDTYPES' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: avoidablesOptions }">\r' + "\n" + '        <ul class="ors-options-menu">\r' + "\n" + "            <li ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'Bicycle' || $ctrl.activeSubgroup == 'Wheelchair' || $ctrl.activeSubgroup == 'HeavyVehicle' || $ctrl.activeSubgroup == 'Pedestrian'\">\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="ferries" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.avoidables.ferry" type="checkbox">\r' + "\n" + '                        <label for="ferries" ng-bind-html="(\'FERRIES\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "\r" + "\n" + "            <li ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'Pedestrian' || $ctrl.activeSubgroup == 'Bicycle' || $ctrl.activeSubgroup == 'HeavyVehicle'\">\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="fords" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.avoidables.fords" type="checkbox">\r' + "\n" + '                        <label for="fords" ng-bind-html="(\'FORDS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li ng-show=\"$ctrl.activeSubgroup == 'Bicycle' || $ctrl.activeSubgroup == 'Pedestrian' || $ctrl.activeSubgroup == 'Wheelchair'\">\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="steps" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.avoidables.steps" type="checkbox">\r' + "\n" + '                        <label for="steps" ng-bind-html="(\'STEPS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'HeavyVehicle'\">\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="highways" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.avoidables.highways" type="checkbox">\r' + "\n" + '                        <label for="highways" ng-bind-html="(\'HIGHWAYS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'HeavyVehicle'\">\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="tollroads" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.avoidables.tollroads" type="checkbox">\r' + "\n" + '                        <label for="tollroads" ng-bind-html="(\'TOLLROADS\' |� translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "        </ul>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + "<div class=\"options-box\" ng-show=\"$ctrl.activeSubgroup == 'Car' || $ctrl.activeSubgroup == 'HeavyVehicle'\">\r" + "\n" + '    <div class="pointer" ng-click="avoidBorders = !avoidBorders">\r' + "\n" + '        <i ng-class="$ctrl.getClass(avoidBorders)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('AVOIDBORDERS' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: avoidBorders }">\r' + "\n" + '        <ul class="ors-options-menu">\r' + "\n" + "            <li>\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="borders" name="orsRouteAvoidablesInput" ng-change="$ctrl.passBordersToOptions()" ng-disable="$ctrl.avoidCountries || $ctrl.currentOptions.borders.controlled" ng-model="$ctrl.currentOptions.borders.all" type="checkbox">\r' + "\n" + '                        <label for="borders" ng-bind-html="(\'BORDERS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="controlledborders" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-disabled="$ctrl.currentOptions.borders.all" ng-model="$ctrl.currentOptions.borders.controlled" type="checkbox">\r' + "\n" + '                        <label for="controlledborders" ng-bind-html="(\'CONTROLLEDBORDERS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="bottom-border">\r' + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <span class="ui checkbox">\r' + "\n" + '                    <input id="av_countries" name="orsRouteAvoidablesCountries" ng-disabled="$ctrl.currentOptions.borders.all" ng-model="$ctrl.avoidCountries" ng-change="$ctrl.passBordersToOptions()" type="checkbox">\r' + "\n" + '                        <label for="av_countries" ng-bind-html="(\'COUNTRYBORDERS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </span>\r" + "\n" + '                <span tooltip-side="right" tooltip-template="{{(\'RESET\' | translate)}}" tooltips="">\r' + "\n" + '                    <button class="ors-controls-button" ng-disabled="$ctrl.currentOptions.borders.all" ng-click="$ctrl.removeCountries()">\r' + "\n" + '                        <i class="fa fa-remove">\r' + "\n" + "                        </i>\r" + "\n" + "                    </button>\r" + "\n" + "                </span>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="row ui input">\r' + "\n" + '                    <input focus-if="avoidBorders" ng-disabled="$ctrl.currentOptions.borders.all" ng-model="$ctrl.queryCountries" ng-model-options="{debounce: 300}" placeholder="{{(\'SEARCHAVOIDCOUNTRIES\' | translate)}}" select-on-click="" type="text">\r' + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="row">\r' + "\n" + '                    <table id="results">\r' + "\n" + "                        <tbody>\r" + "\n" + '                        <tr ng-repeat="country in $ctrl.countries | filter: checked ">\r' + "\n" + "                            <td>\r" + "\n" + '                                <input class="ui checkbox" id="c_{{country.cid}}" name="orsRouteAvoidablesCountries"\r' + "\n" + '                                       ng-change="$ctrl.toggleCountries(country.id)"\r' + "\n" + '                                       ng-disabled="!$ctrl.avoidCountries || $ctrl.currentOptions.borders.all"\r' + "\n" + '                                       ng-model="$ctrl.countries[country.id].check" type="checkbox">\r' + "\n" + "                                </input>\r" + "\n" + "                            </td>\r" + "\n" + '                            <td id="cname">\r' + "\n" + "                                {{country[$ctrl.language]}}\r" + "\n" + "                            </td>\r" + "\n" + '                            <td id="ename">\r' + "\n" + "                                <i>\r" + "\n" + "                                    <small>\r" + "\n" + "                                        ({{country.official_en_name}})\r" + "\n" + "                                    </small>\r" + "\n" + "                                </i>\r" + "\n" + "                            </td>\r" + "\n" + "                        </tr>\r" + "\n" + '                        <tr ng-if="$ctrl.queryCountries" ng-repeat="country in $ctrl.countries | filter: search ">\r' + "\n" + "                            <td>\r" + "\n" + '                                <input class="ui checkbox" id="c_{{country.cid}}" name="orsRouteAvoidablesCountries"\r' + "\n" + '                                       ng-change="$ctrl.toggleCountries(country.id)"\r' + "\n" + '                                       ng-disabled="$ctrl.currentOptions.borders.all"\r' + "\n" + '                                       ng-model="$ctrl.countries[country.id].check" type="checkbox">\r' + "\n" + "                                </input>\r" + "\n" + "                            </td>\r" + "\n" + '                            <td id="cname">\r' + "\n" + "                                {{country[$ctrl.language]}}\r" + "\n" + "                            </td>\r" + "\n" + '                            <td align="right" hidden="" id="cid">\r' + "\n" + "                                ({{country.cid}})\r" + "\n" + "                            </td>\r" + "\n" + '                            <td id="ename">\r' + "\n" + "                                <i>\r" + "\n" + "                                    <small>\r" + "\n" + "                                        ({{country.official_en_name}})\r" + "\n" + "                                    </small>\r" + "\n" + "                                </i>\r" + "\n" + "                            </td>\r" + "\n" + '                            <td hidden="" id="nname">\r' + "\n" + "                                {{country.native_names}}\r" + "\n" + "                            </td>\r" + "\n" + '                            <td hidden="" id="ccode">\r' + "\n" + "                                {{country.country_code}}\r" + "\n" + "                            </td>\r" + "\n" + "                        </tr>\r" + "\n" + "                        </tbody>\r" + "\n" + "                    </table>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "        </ul>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="options-box" ng-if="$ctrl.routing && $ctrl.carBrands" ng-show="$ctrl.activeSubgroup == \'Car\'">\r' + "\n" + '    <div class="pointer" ng-click="fuelSettings = !fuelSettings">\r' + "\n" + '        <i ng-class="$ctrl.getClass(fuelSettings)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('FUEL_CONSUMPTION' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: fuelSettings }">\r' + "\n" + '        <ul class="ors-options-menu">\r' + "\n" + "            <li>\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + "                    <input\r" + "\n" + '                            id="brandCheck"\r' + "\n" + '                            name="orsCarBrands"\r' + "\n" + "                            ng-click=\"$ctrl.toggleSource('brand')\"\r" + "\n" + '                            ng-model="$ctrl.brandCheck" type="checkbox">\r' + "\n" + '                    <label for="brandCheck"\r' + "\n" + "                           ng-style=\"!$ctrl.brandCheck ? {color:'grey'} : undefined\"\r" + "\n" + "                           ng-bind-html=\"('CAR_BRAND' | translate)\"\r" + "\n" + "                           ng-click=\"$ctrl.toggleSource('brand')\">\r" + "\n" + "                    </label>\r" + "\n" + "                </div>\r" + "\n" + '                <div ng-if="$ctrl.brandCheck">\r' + "\n" + "                    <div>\r" + "\n" + '                        <label for="brandInput"></label>\r' + "\n" + '                        <div class="ors-options-input ui input" id="brandInput">\r' + "\n" + '                            <input ng-model="$ctrl.queryBrand"\r' + "\n" + '                                   ng-model-options="{debounce: 300}"\r' + "\n" + "                                   ng-change=\"$ctrl.queryModel = ''\"\r" + "\n" + '                                   ng-focus="$ctrl.focusBrand = true"\r' + "\n" + '                                   placeholder="{{(\'SEARCH\' | translate)}} {{(\'CAR_BRAND\' | translate)}}" select-on-click="" type="text">\r' + "\n" + "                        </div>\r" + "\n" + '                        <span tooltip-side="right" tooltip-template="{{(\'_RESET\' | translate)}} {{(\'CAR_BRAND\' | translate)}}" tooltips="">\r' + "\n" + '                        <button class="ors-controls-button"\r' + "\n" + '                                ng-click="$ctrl.focusBrand = false; $ctrl.queryBrand = undefined; $ctrl.carResponse = undefined; $ctrl.showModel = false; $ctrl.showYear = false; $ctrl.showType = false">\r' + "\n" + '                            <i class="fa fa-remove">\r' + "\n" + "                            </i>\r" + "\n" + "                        </button>\r" + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="row" ng-if="$ctrl.focusBrand">\r' + "\n" + '                        <table id="brandResults">\r' + "\n" + "                            <tbody>\r" + "\n" + '                            <tr ng-repeat="brand in $ctrl.carBrands | filter: searchBrand">\r' + "\n" + "                                <td>\r" + "\n" + '                                    <div ng-click="$ctrl.queryBrand = brand;$ctrl.requestCars(brand);$ctrl.focusBrand = false;$ctrl.showModel = true; $ctrl.yearCheck = false; $ctrl.typeCheck = false">{{brand}}</div>\r' + "\n" + "                                </td>\r" + "\n" + "                            </tr>\r" + "\n" + "                            </tbody>\r" + "\n" + "                        </table>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + '            <li ng-if="$ctrl.showModel">\r' + "\n" + '                <div ng-if="$ctrl.brandCheck">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + "                        <input\r" + "\n" + '                                id="modelCheck"\r' + "\n" + "                                ng-click=\"$ctrl.toggleSource('model')\"\r" + "\n" + '                                ng-model="$ctrl.modelCheck" type="checkbox">\r' + "\n" + '                        <label for="modelCheck"\r' + "\n" + "                               ng-bind-html=\"('CAR_MODEL' | translate)\"\r" + "\n" + "                               ng-click=\"$ctrl.toggleSource('model')\">\r" + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-if="$ctrl.modelCheck">\r' + "\n" + '                        <div class="ors-select-tooltip">\r' + "\n" + '                            <label for="modelInput"></label>\r' + "\n" + '                            <div class="ors-options-input ui input" id="modelInput">\r' + "\n" + '                                <select class="ui selection dropdown no-wrap"\r' + "\n" + '                                        ng-model="$ctrl.queryModel"\r' + "\n" + "                                        ng-change=\"$ctrl.queryYear = ''; $ctrl.set('carYears'); $ctrl.carTypes = []; $ctrl.showYear = true\"\r" + "\n" + '                                        ng-focus="$ctrl.focusModel = true"\r' + "\n" + '                                        ng-options="model for model in $ctrl.carModels"\r' + "\n" + '                                        type="text"></select>\r' + "\n" + "                            </div>\r" + "\n" + '                            <span style="padding-top: 9px" tooltip-side="right" tooltip-template="{{(\'_RESET\' | translate)}} {{(\'CAR_MODEL\' | translate)}}" tooltips="">\r' + "\n" + '                            <button class="ors-controls-button"\r' + "\n" + '                                    ng-click="$ctrl.queryModel = undefined; $ctrl.showYear = false; $ctrl.showType = false">\r' + "\n" + '                                <i class="fa fa-remove">\r' + "\n" + "                                </i>\r" + "\n" + "                            </button>\r" + "\n" + "                            </span>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + '            <li ng-if="$ctrl.showYear">\r' + "\n" + '                <div ng-if="$ctrl.modelCheck && $ctrl.brandCheck">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + "                    <input\r" + "\n" + '                            id="yearCheck"\r' + "\n" + "                            ng-click=\"$ctrl.toggleSource('year')\"\r" + "\n" + '                            ng-model="$ctrl.yearCheck" type="checkbox">\r' + "\n" + '                    <label for="yearCheck"\r' + "\n" + "                           ng-bind-html=\"('CAR_YEAR' | translate)\"\r" + "\n" + "                           ng-click=\"$ctrl.toggleSource('year')\">\r" + "\n" + "                    </label>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-if="$ctrl.yearCheck">\r' + "\n" + '                        <div class="ors-select-tooltip">\r' + "\n" + '                            <label for="yearInput"></label>\r' + "\n" + '                            <div class="ors-options-input ui input" id="yearInput">\r' + "\n" + '                                <select class="ui selection dropdown no-wrap"\r' + "\n" + '                                        ng-model="$ctrl.queryYear"\r' + "\n" + "                                        ng-change=\"$ctrl.queryType = ''; $ctrl.showType = true; $ctrl.set('carTypes');$ctrl.focusYear = false\"\r" + "\n" + '                                        ng-focus="$ctrl.focusYear = true"\r' + "\n" + '                                        ng-options="year for year in $ctrl.filterOutAll($ctrl.carYears)" type="text"></select>\r' + "\n" + "                            </div>\r" + "\n" + '                            <span tooltip-side="right" tooltip-template="{{(\'_RESET\' | translate)}} {{(\'CAR_YEAR\' | translate)}}" tooltips="">\r' + "\n" + '                            <button class="ors-controls-button"\r' + "\n" + '                                    ng-click="$ctrl.queryYear = undefined; $ctrl.showType = false">\r' + "\n" + '                                <i class="fa fa-remove">\r' + "\n" + "                                </i>\r" + "\n" + "                            </button>\r" + "\n" + "                            </span>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + '            <li ng-if="$ctrl.showType">\r' + "\n" + '                <div ng-if="$ctrl.modelCheck && $ctrl.brandCheck && $ctrl.yearCheck">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + "                        <input\r" + "\n" + '                                id="typeCheck"\r' + "\n" + "                                ng-click=\"$ctrl.toggleSource('type')\"\r" + "\n" + '                                ng-model="$ctrl.typeCheck" type="checkbox">\r' + "\n" + '                        <label for="typeCheck"\r' + "\n" + "                               ng-bind-html=\"('CAR_TYPE' | translate)\"\r" + "\n" + "                               ng-click=\"$ctrl.toggleSource('type')\">\r" + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div ng-if="$ctrl.typeCheck">\r' + "\n" + '                        <div class="ors-select-tooltip">\r' + "\n" + '                            <label for="typeInput"></label>\r' + "\n" + '                            <div class="ors-options-input ui input" id="typeInput">\r' + "\n" + '                                <select class="ui selection dropdown"\r' + "\n" + '                                        ng-model="$ctrl.queryType"\r' + "\n" + '                                        ng-options="type for type in $ctrl.filterOutAll($ctrl.carTypes)"\r' + "\n" + "                                        ng-change=\"$ctrl.set('carTypes');\"\r" + "\n" + '                                        type="text"></select>\r' + "\n" + "                            </div>\r" + "\n" + '                            <span tooltip-side="right" tooltip-template="{{( \'_RESET\' | translate)}} {{( \'CAR_TYPE\' | translate)}}" tooltips="">\r' + "\n" + '                                <button class="ors-controls-button"\r' + "\n" + '                                        ng-click="$ctrl.queryType = undefined">\r' + "\n" + '                                    <i class="fa fa-remove">\r' + "\n" + "                                    </i>\r" + "\n" + "                                </button>\r" + "\n" + "                            </span>\r" + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input type="checkbox"\r' + "\n" + '                           id="categoryCheck"\r' + "\n" + '                           ng-model="$ctrl.categoryCheck"\r' + "\n" + "                           ng-click=\"$ctrl.toggleSource('category')\"\r" + "\n" + "                    >\r" + "\n" + '                    <label for="categoryCheck"\r' + "\n" + "                           ng-style=\"!$ctrl.categoryCheck ? {color:'grey'} : undefined\"\r" + "\n" + "                           ng-bind-html=\"('VEHICLE_CATEGORY' | translate) + ': '\"\r" + "\n" + "                           ng-click=\"$ctrl.toggleSource('category')\">\r" + "\n" + "                    </label>\r" + "\n" + "                </div>\r" + "\n" + '                <div ng-if="$ctrl.categoryCheck">\r' + "\n" + '                    <label for="vehicleCategory">\r' + "\n" + "                    </label>\r" + "\n" + '                    <select class="ors-options-input ui selection dropdown no-wrap"\r' + "\n" + '                            id="vehicleCategory"\r' + "\n" + '                            ng-model="$ctrl.ofs.filters.vehicle_categories[0]"\r' + "\n" + '                            ng-change="$ctrl.chooseCategory()"\r' + "\n" + '                            ng-options="category.short as category.en for category in $ctrl.carCategories"></select>\r' + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + "                <div>\r" + "\n" + "                    <label for=\"fuelType\" ng-bind-html=\"('FUEL_TYPE' | translate) + ': '\">\r" + "\n" + "                    </label>\r" + "\n" + '                    <select class="ors-options-input ui selection dropdown"\r' + "\n" + '                            id="fuelType" ng-model="$ctrl.ofs.filters.fuel_type"\r' + "\n" + "                            ng-options=\"fueltype for fueltype in ['gasoline','diesel']\"></select>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + "                <span>\r" + "\n" + "                    <label for=\"drivingSpeed\" ng-bind-html=\"('DRIVING_SPEED' | translate) + ': '\">\r" + "\n" + "                    </label>\r" + "\n" + '                    <span class="row ui input">\r' + "\n" + '                        <input id="drivingSpeed"\r' + "\n" + '                               ng-model="$ctrl.ofs.filters.driving_speed"\r' + "\n" + '                               style="width: 60px"\r' + "\n" + "                        >\r" + "\n" + "                    </span>\r" + "\n" + "                </span>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="ui divider">\r' + "\n" + "                </div>\r" + "\n" + "                <div>\r" + "\n" + '                    <p class="-italic" ng-bind-html="(\'OPTIONAL_PARAMS\' | translate)"></p>\r' + "\n" + "                </div>\r" + "\n" + "                <div>\r" + "\n" + '                    <span class="ui checkbox">\r' + "\n" + '                        <input id="consumptionCheck" type="checkbox" value="$ctrl.fuelConsumption" ng-model="$ctrl.fuelConsumption"\r' + "\n" + '                           ng-click="$ctrl.fuelConsumption != $ctrl.fuelConsumption">\r' + "\n" + '                        <label for="consumptionCheck" class="ors-options-label"></label>\r' + "\n" + "                    </span>\r" + "\n" + "                    <label for=\"fuelConsumption\" ng-bind-html=\"('SPECIFIC_FUEL_CONSUMPTION' | translate) + ': '\">\r" + "\n" + "                    </label>\r" + "\n" + '                    <span class="row ui input">\r' + "\n" + '                        <input id="fuelConsumption"\r' + "\n" + '                               ng-disabled="!$ctrl.fuelConsumption"\r' + "\n" + '                               ng-model="$ctrl.ofs.filters.fuel_consumptions[$ctrl.ofs.filters.vehicle_categories[0]]"\r' + "\n" + '                               style="width: 60px"\r' + "\n" + "                        >\r" + "\n" + "                    </span>\r" + "\n" + "                    <div>\r" + "\n" + "                        in litres per 100 km\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + "                <div>\r" + "\n" + '                    <span class="ui checkbox">\r' + "\n" + '                        <input id="tankSizeCheck" type="checkbox" value="$ctrl.tankSize" ng-model="$ctrl.tankSize"\r' + "\n" + '                           ng-click="$ctrl.tankSize != $ctrl.tankSize">\r' + "\n" + '                        <label for="tankSizeCheck" class="ors-options-label"></label>\r' + "\n" + "                    </span>\r" + "\n" + "                    <label for=\"tankSize\" ng-bind-html=\"('TANK_SIZE' | translate) + ': '\">\r" + "\n" + "                    </label>\r" + "\n" + '                    <span class="row ui input">\r' + "\n" + '                        <input id="tankSize"\r' + "\n" + '                               ng-disabled="!$ctrl.tankSize"\r' + "\n" + '                               ng-model="$ctrl.ofs.filters.tank_sizes[$ctrl.ofs.filters.vehicle_categories[0]]"\r' + "\n" + '                               style="width : 60px"\r' + "\n" + "                        >\r" + "\n" + "                    </span>\r" + "\n" + "                     liters\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "            <li>\r" + "\n" + '                <div class="ui divider">\r' + "\n" + "                </div>\r" + "\n" + "                <span>\r" + "\n" + '                    <button ng-class="{\r' + "\n" + "                                'tiny teal ui button disabled': !(($ctrl.categoryCheck)||($ctrl.modelCheck && $ctrl.queryModel && $ctrl.queryBrand)),\r" + "\n" + "                                'tiny teal ui button': !$ctrl.requesting && (($ctrl.categoryCheck)||($ctrl.modelCheck && $ctrl.queryModel && $ctrl.queryBrand)),\r" + "\n" + "                                'tiny teal ui button loading': $ctrl.requesting}\"\r" + "\n" + '                            ng-click="$ctrl.requestConsumption()"\r' + "\n" + '                            class="tiny teal ui button">\r' + "\n" + '                        <i class="fa gas-pump">\r' + "\n" + "                        </i>\r" + "\n" + '                        <span ng-bind-html="(\'CALC_CONSUMPTION\' | translate)" class="ng-binding"></span>\r' + "\n" + "                    </button>\r" + "\n" + "                </span>\r" + "\n" + '                <span class="ui checkbox">\r' + "\n" + '                        <input id="autoCall" type="checkbox" value="$ctrl.autoCall" ng-model="$ctrl.autoCall"\r' + "\n" + '                               ng-click="$ctrl.toggleAutoCall()"/>\r' + "\n" + '                        <label for="autoCall" class="ors-options-label">{{( "ON_ROUTE_CHANGE" | translate)}}</label>\r' + "\n" + "                </span>\r" + "\n" + "            </li>\r" + "\n" + "        </ul>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="options-box" ng-show="$ctrl.activeSubgroup == \'HeavyVehicle\'">\r' + "\n" + '    <div class="pointer" ng-click="hgvOptions = !hgvOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(hgvOptions)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('HGVSETTINGS' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: hgvOptions }">\r' + "\n" + '        <div class="ors-options-menu">\r' + "\n" + '            <rzslider rz-slider-model="$ctrl.hgvSliders.Length.value" rz-slider-options="$ctrl.hgvSliders.Length.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="hgv-length-cb" name="orsRouteHgvOpts" ng-change="$ctrl.toggleHgvOptSlider(\'length\')" ng-model="$ctrl.hgvLengthCb" type="checkbox">\r' + "\n" + '                    <label for="hgv-length-cb" ng-bind-html="(\'HGVLENGTH\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.hgvSliders.Width.value" rz-slider-options="$ctrl.hgvSliders.Width.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="hgv-width-cb" name="orsRouteHgvOpts" ng-change="$ctrl.toggleHgvOptSlider(\'width\')" ng-model="$ctrl.hgvWidthCb" type="checkbox">\r' + "\n" + '                    <label for="hgv-width-cb" ng-bind-html="(\'HGVWIDTH\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.hgvSliders.Height.value" rz-slider-options="$ctrl.hgvSliders.Height.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="hgv-height-cb" name="orsRouteHgvOpts" ng-change="$ctrl.toggleHgvOptSlider(\'height\')" ng-model="$ctrl.hgvHeightCb" type="checkbox">\r' + "\n" + '                    <label for="hgv-weight-cb" ng-bind-html="(\'HGVHEIGHT\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.hgvSliders.Weight.value" rz-slider-options="$ctrl.hgvSliders.Weight.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="hgv-weight-cb" name="orsRouteHgvOpts" ng-change="$ctrl.toggleHgvOptSlider(\'hgvWeight\')" ng-model="$ctrl.hgvWeightCb" type="checkbox">\r' + "\n" + '                    <label for="hgv-weight-cb" ng-bind-html="(\'HGVWEIGHT\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="ui divider">\r' + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.hgvSliders.AxleLoad.value" rz-slider-options="$ctrl.hgvSliders.AxleLoad.options">\r' + "\n" + "            </rzslider>\r" + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="hgv-axleload-cb" name="orsRouteHgvOpts" ng-change="$ctrl.toggleHgvOptSlider(\'axleload\')" ng-model="$ctrl.hgvAxleloadCb" type="checkbox">\r' + "\n" + '                    <label for="hgv-axleload-cb" ng-bind-html="(\'HGVAXLELOAD\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="ui divider">\r' + "\n" + "        </div>\r" + "\n" + '        <ul class="ors-options-menu">\r' + "\n" + "            <li>\r" + "\n" + '                <div class="ui checkbox">\r' + "\n" + '                    <input id="hazmat" name="orsRouteAvoidablesInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.hazmat" type="checkbox">\r' + "\n" + '                        <label for="hazmat" ng-bind-html="(\'HGVHAZMAT\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </input>\r" + "\n" + "                </div>\r" + "\n" + "            </li>\r" + "\n" + "        </ul>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="options-box" ng-show="$ctrl.activeSubgroup == \'Pedestrian\'">\r' + "\n" + '    <div class="pointer" ng-click="additionalOptions = !additionalOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(additionalOptions)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('ADDITIONALSETTINGS' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: additionalOptions }">\r' + "\n" + '        <div class="ors-options-menu" ng-show="$ctrl.activeSubgroup == \'Pedestrian\'">\r' + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="landmarks" name="orsLandmarkInput" ng-change="$ctrl.changeOptions()" ng-model="$ctrl.currentOptions.landmarks" type="checkbox">\r' + "\n" + '                    <label for="landmarks" ng-bind-html="(\'SHOWLANDMARKS\' | translate)">\r' + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="ors-options-menu" ng-show="$ctrl.activeSubgroup == \'Pedestrian\'">\r' + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="greenrouting" name="orsRouteGreenRoutingInput" ng-change="$ctrl.toggleGreenSlider()"\r' + "\n" + '                       ng-model="$ctrl.greenActive" type="checkbox">\r' + "\n" + '                <label for="greenrouting" ng-bind-html="(\'GREEN_ROUTING\' | translate)">\r' + "\n" + "                </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.greenSlider.value" rz-slider-options="$ctrl.greenSlider.options">\r' + "\n" + "            </rzslider>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="ors-options-menu" ng-show="$ctrl.activeSubgroup == \'Pedestrian\'">\r' + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input id="quietrouting" name="orsRouteQuietRoutingInput" ng-change="$ctrl.toggleQuietSlider()"\r' + "\n" + '                       ng-model="$ctrl.quietActive" type="checkbox">\r' + "\n" + '                <label for="quietrouting" ng-bind-html="(\'QUIET_ROUTING\' | translate)">\r' + "\n" + "                </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + '            <rzslider rz-slider-model="$ctrl.quietSlider.value" rz-slider-options="$ctrl.quietSlider.options">\r' + "\n" + "            </rzslider>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="options-box" ng-show="$ctrl.activeSubgroup == \'Wheelchair\'">\r' + "\n" + '    <div class="pointer" ng-click="wheelchairOptions = !wheelchairOptions">\r' + "\n" + '        <i ng-class="$ctrl.getClass(wheelchairOptions)">\r' + "\n" + "        </i>\r" + "\n" + "        <span ng-bind-html=\"('WHEELCHAIRSETTINGS' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="collapsable" ng-class="{ showMe: wheelchairOptions }">\r' + "\n" + '        <div class="ors-options-menu">\r' + "\n" + '            <div class="ors-options-menu">\r' + "\n" + '                <div class="ui label tiny flleft">\r' + "\n" + "                    <span ng-bind-html=\"('SURFACE' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"':'\">\r" + "\n" + "                    </span>\r" + "\n" + '                    <div class="detail" ng-bind="$ctrl.optionList.wheelchair.Surface[$ctrl.wheelchairSliders.Surface.value].name">\r' + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <rzslider rz-slider-model="$ctrl.wheelchairSliders.Surface.value" rz-slider-options="$ctrl.wheelchairSliders.Surface.options">\r' + "\n" + "                </rzslider>\r" + "\n" + '                <div class="ui divider">\r' + "\n" + "                </div>\r" + "\n" + '                <div class="ui label tiny flleft">\r' + "\n" + "                    <span ng-bind-html=\"('INCLINE' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"':'\">\r" + "\n" + "                    </span>\r" + "\n" + '                    <div class="detail" ng-bind="$ctrl.optionList.wheelchair.Incline[$ctrl.wheelchairSliders.Incline.value].name">\r' + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <rzslider rz-slider-model="$ctrl.wheelchairSliders.Incline.value" rz-slider-options="$ctrl.wheelchairSliders.Incline.options">\r' + "\n" + "                </rzslider>\r" + "\n" + '                <div class="ui divider">\r' + "\n" + "                </div>\r" + "\n" + '                <div class="ui label tiny flleft">\r' + "\n" + "                    <span ng-bind-html=\"('CURB' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"':'\">\r" + "\n" + "                    </span>\r" + "\n" + '                    <div class="detail" ng-bind="$ctrl.optionList.wheelchair.Curb[$ctrl.wheelchairSliders.Curb.value].name">\r' + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <rzslider rz-slider-model="$ctrl.wheelchairSliders.Curb.value" rz-slider-options="$ctrl.wheelchairSliders.Curb.options">\r' + "\n" + "                </rzslider>\r" + "\n" + '                <div class="ui label tiny flleft">\r' + "\n" + "                    <span ng-bind-html=\"('WHEELCHAIR_WIDTH' | translate)\">\r" + "\n" + "                    </span>\r" + "\n" + "                    <span ng-bind-html=\"':'\">\r" + "\n" + "                    </span>\r" + "\n" + '                    <div class="detail" ng-bind="$ctrl.optionList.wheelchair.Width[$ctrl.wheelchairSliders.Width.value].name">\r' + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <rzslider rz-slider-model="$ctrl.wheelchairSliders.Width.value" rz-slider-options="$ctrl.wheelchairSliders.Width.options">\r' + "\n" + "                </rzslider>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-route-controls.html", '<div class="ors-route-controls">\r' + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.add()" ng-show="$ctrl.showAdd" tooltip-side="right" tooltip-template="{{(\'ADD\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-plus" s="">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.reset()" tooltip-side="top" tooltip-template="{{(\'RESET\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-remove">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.reversing()" tooltip-side="top" tooltip-template="{{(\'REVERSE\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-retweet">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.zoom()" tooltip-side="top" tooltip-template="{{(\'EXPAND\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-expand">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" data-ng-click="$ctrl.showImport = !$ctrl.showImport" tooltip-side="top" tooltip-template="{{(\'UPLOAD\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-upload">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "    <div>\r" + "\n" + '        <button class="ors-controls-button" ng-click="$ctrl.callOptions()" tooltip-side="left" tooltip-template="{{(\'OPTIONS\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-sliders">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n" + '<div class="ors-routing-options container" ng-show="$ctrl.showOptions">\r' + "\n" + '    <ors-options active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup" show-options="$ctrl.showOptions">\r' + "\n" + "    </ors-options>\r" + "\n" + "</div>\r" + "\n" + '<ors-modal data-ng-show="$ctrl.showImport" show="$ctrl.showImport">\r' + "\n" + "    <ors-import-route-controls>\r" + "\n" + "    </ors-import-route-controls>\r" + "\n" + "</ors-modal>\r" + "\n");
        $templateCache.put("components/ors-panel-routing/ors-waypoints/ors-waypoint/ors-waypoint.html", '<div class="ors-wp-item">\r' + "\n" + '    <div class="wp-idx" ng-mouseout="$ctrl.deEmph()" ng-mouseover="$ctrl.emph()">\r' + "\n" + '        <i aria-hidden="true" class="fa fa-ellipsis-v">\r' + "\n" + "        </i>\r" + "\n" + '        <span ng-bind-html="$ctrl.getIdx()">\r' + "\n" + "        </span>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="wp-input">\r' + "\n" + '        <div class="ui right labeled fluid input" ng-mouseout="hoverInput=false;" ng-mouseover="hoverInput=true;">\r' + "\n" + '            <input ng-click="$ctrl.callGeocodingPanel()" ng-model="$ctrl.waypoint._address" placeholder="{{$ctrl.getPlaceholder()}}" type="text" ng-readonly="true">\r' + "\n" + '                <div class="ui basic label wp-input-label">\r' + "\n" + '                    <button class="tiny ui basic button ors-control-button" ng-class="{show: hoverInput}" ng-click="$ctrl.delete()">\r' + "\n" + '                        <i class="fa fa-trash">\r' + "\n" + "                        </i>\r" + "\n" + "                    </button>\r" + "\n" + "                </div>\r" + "\n" + "            </input>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("components/ors-panel-routing/ors-waypoints/ors-waypoints.html", '<div class="flright" style="margin-right: 15px; margin-top:3px; color: rgba(0, 0, 0, 0.6);" ng-show="$ctrl.waypoints.length > 2" ng-click="$ctrl.collapse()">\r' + "\n" + '\t<i ng-class="$ctrl.collapseIcon"></i>\r' + "\n" + "</div>\r" + "\n" + '<div ui-sortable="$ctrl.sortableOptions" ng-model="$ctrl.waypoints" class="ors-wp-list">\r' + "\n" + '     <div ng-repeat="waypoint in $ctrl.waypoints" ng-show="$ctrl.collapseWp($index)" class="ors-wp-container">\r' + "\n" + '     \t<ors-waypoint idx="$index" on-delete="$ctrl.deleteWaypoint(idx)" waypoint="waypoint" waypoints="$ctrl.waypoints" show-add="$ctrl.showAdd" show-geocoding-panel="$ctrl.showGeocodingPanel" show-geocoding-panel-idx="$ctrl.showGeocodingPanelIdx">\r' + "\n" + "\t\t</ors-waypoint>\r" + "\n" + '\t\t<div class="ui horizontal divider ors-wp-divider" ng-show="$ctrl.showViapoints($index)">\r' + "\n" + '\t\t    <a class="ui circular label ors-label">\r' + "\n" + "\t\t    \t{{$ctrl.waypoints.length - 2}}\r" + "\n" + "\t\t  \t</a>\r" + "\n" + "\t\t </div>\r" + "\n" + "\t</div>\r" + "\n" + "</div>\r" + "\n" + '<div class="bottom-border"></div>\r' + "\n" + '<ors-route-controls show-add="$ctrl.showAdd" on-add="$ctrl.addWaypoint()" on-reverse="$ctrl.reverseWaypoints()" on-reset="$ctrl.resetWaypoints()" on-waypoints-changed="$ctrl.waypointsChanged()" active-profile="$ctrl.activeProfile" active-subgroup="$ctrl.activeSubgroup">\r' + "\n" + "</ors-route-controls>\r" + "\n" + '<div class="bottom-border"></div>');
        $templateCache.put("components/ors-profiles-options/ors-profiles-options.html", '<ul class="ors-nav-menu">\r' + "\n" + "    <li>\r" + "\n" + '        <button tooltips tooltip-template="{{(\'CAR\' | translate)}}" tooltip-side="bottom" class="ors-button flleft" ng-click="$ctrl.changeProfile($ctrl.profiles.Car.name)">\r' + "\n" + '            <i class="fa fa-lg fa-car" ng-class="{active : $ctrl.activeSubgroup === $ctrl.profiles.Car.name}">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <button tooltips tooltip-template="{{(\'HGV\' | translate)}}" tooltip-side="bottom"  class="ors-button flleft" ng-click="$ctrl.changeProfile($ctrl.profiles.hgv.name)">\r' + "\n" + '            <i class="fa fa-lg fa-bus" ng-class="{active : $ctrl.activeSubgroup === $ctrl.profiles.hgv.subgroup}">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "        <span>\r" + "\n" + '            <i class="fa fa-caret-down" style="margin-top: 20px;">\r' + "\n" + "            </i>\r" + "\n" + '            <ul class="ors-nav-submenu">\r' + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.hgv.name" type="radio" id="hgv">\r' + "\n" + '                        <label for="hgv" ng-bind-html="(\'HEAVYVEHICLENORMAL\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.goods.name" type="radio" id="goods">\r' + "\n" + '                        <label for="goods" ng-bind-html="(\'HEAVYVEHICLEGOODS\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.bus.name" type="radio" id="bus">\r' + "\n" + '                        <label for="bus" ng-bind-html="(\'HEAVYVEHICLEBUS\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.agricultural.name" type="radio" id="agricultural">\r' + "\n" + '                        <label for="agricultural" ng-bind-html="(\'HEAVYVEHICLEAGRICULTURAL\' | translate)">Agricultural</label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.forestry.name" type="radio" id="forestry">\r' + "\n" + '                        <label for="forestry" ng-bind-html="(\'HEAVYVEHICLEFORESTRY\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileHGV" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.delivery.name" type="radio" id="delivery">\r' + "\n" + '                        <label for="delivery" ng-bind-html="(\'HEAVYVEHICLEDELIVERY\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "            </ul>\r" + "\n" + "        </span>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <button tooltips tooltip-template="{{(\'BICYCLE\' | translate)}}" tooltip-side="bottom" class="ors-button flleft" ng-click="$ctrl.changeProfile($ctrl.profiles.Bicycle.name)">\r' + "\n" + '            <i class="fa fa-lg fa-bicycle" ng-class="{active : $ctrl.activeSubgroup === $ctrl.profiles.Bicycle.name}">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "        <span>\r" + "\n" + '            <i class="fa fa-caret-down" style="margin-top: 20px;">\r' + "\n" + "            </i>\r" + "\n" + '            <ul class="ors-nav-submenu">\r' + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileBicycle" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.Bicycle.name" type="radio" id="bicycle">\r' + "\n" + '                        <label for="bicycle" ng-bind-html="(\'BICYCLENORMAL\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileBicycle" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.BicycleMTB.name" type="radio" id="mtb">\r' + "\n" + '                        <label for="mtb" ng-bind-html="(\'BICYCLEMTB\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileBicycle" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.BicycleRacer.name" type="radio" id="racing">\r' + "\n" + '                        <label for="racing" ng-bind-html="(\'BICYCLERACING\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfileBicycle" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.BicycleElectro.name" type="radio" id="electro">\r' + "\n" + '                        <label for="electro" ng-bind-html="(\'BICYCLEELECTRO\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "            </ul>\r" + "\n" + "        </span>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <button tooltips tooltip-template="{{(\'PEDESTRIAN\' | translate)}}" tooltip-side="bottom"  class="ors-button flleft" ng-click="$ctrl.changeProfile($ctrl.profiles.Pedestrian.name)">\r' + "\n" + '            <i class="fa fa-lg fa-male" ng-class="{active : $ctrl.activeSubgroup === $ctrl.profiles.Pedestrian.name}">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "        <span>\r" + "\n" + '            <i class="fa fa-caret-down" style="margin-top: 20px;">\r' + "\n" + "            </i>\r" + "\n" + '            <ul class="ors-nav-submenu">\r' + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfilePedestrian" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.Pedestrian.name" type="radio" id="pedestrian">\r' + "\n" + '                        <label for="pedestrian" ng-bind-html="(\'PEDESTRIANNORMAL\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "                <li>\r" + "\n" + '                    <div class="ui radio checkbox">\r' + "\n" + '                        <input name="orsProfilePedestrian" ng-change="$ctrl.changeProfile()" ng-model="$ctrl.currentProfile.type" ng-value="$ctrl.profiles.PedestrianHiking.name" type="radio" id="hiking">\r' + "\n" + '                        <label for="hiking" ng-bind-html="(\'PEDESTRIANHIKING\' | translate)"></label>\r' + "\n" + "                    </div>\r" + "\n" + "                </li>\r" + "\n" + "            </ul>\r" + "\n" + "        </span>\r" + "\n" + "    </li>\r" + "\n" + "    <li>\r" + "\n" + '        <button tooltips tooltip-template="{{(\'WHEELCHAIR\' | translate)}}" tooltip-side="bottom"  class="ors-button flleft" ng-click="$ctrl.changeProfile($ctrl.profiles.Wheelchair.name)">\r' + "\n" + '            <i class="fa fa-lg fa-wheelchair-alt" ng-class="{active : $ctrl.activeSubgroup === $ctrl.profiles.Wheelchair.name}">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </li>\r" + "\n" + "</ul>\r" + "\n");
        $templateCache.put("components/ors-share/ors-share.html", "<header>\r" + "\n" + "    <h1 ng-bind-html=\"('SHARE_LINK' | translate)\">\r" + "\n" + "    </h1>\r" + "\n" + "</header>\r" + "\n" + "<section>\r" + "\n" + '    <form class="ui form">\r' + "\n" + '        <div class="field">\r' + "\n" + '            <div class="ui checkbox">\r' + "\n" + '                <input name="shortenlink" type="checkbox" ng-change="$ctrl.shortenLink()" ng-model="$ctrl.shortenLinkBool">\r' + "\n" + "                    <label ng-bind-html=\"('SHORTEN' | translate)\">\r" + "\n" + "                    </label>\r" + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="field">\r' + "\n" + '            <div class="ui input">\r' + "\n" + '                <input type="text" ng-model="$ctrl.linkText" select-on-click="">\r' + "\n" + "                </input>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "        <span ng-bind-html=\"('SHORTEN_HINT' | translate)\">\r" + "\n" + "        </span>\r" + "\n" + "    </form>\r" + "\n" + "</section>");
        $templateCache.put("includes/info.html", '<header style="margin-top: 0">\r' + "\n" + '    <img height="auto" src="https://udukonline.000webhostapp.com/assets/maps/img/logo@2x.png" width="200px"/>\r' + "\n" + "</header>\r" + "\n" + '<div class="ui divider">\r' + "\n" + "</div>\r" + "\n" + "\x3c!-- Openrouteservice allows you to approximate your geographic location, when accessed via (mobile) browser. To provide service, OpenRouteService must record your route information, including your point of origin, the address of your destination, and the route you are instructed to follow. We do not share this aggregated location information or connect this information with your personal information.--\x3e\r" + "\n" + "<section>\r" + "\n" + '    <div class="ui positive message textleft">\r' + "\n" + '        <div class="header" ng-bind-html="(\'DONATE\' | translate)">\r' + "\n" + "        </div>\r" + "\n" + '        <span class="textjustify" ng-bind-html="(\'DONATE_TEXT\' | translate)">\r' + "\n" + "        </span>\r" + "\n" + '        <a class="link" href="http://www.OpenStreetMap.org" target="_blank">\r' + "\n" + "            OpenStreetMap.org\r" + "\n" + "        </a>\r" + "\n" + "    </div>\r" + "\n" + '    <p class="textjustify" ng-bind-html="(\'INFO_I\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui positive message textleft">\r' + "\n" + '        <div class="header">\r' + "\n" + "            {{ 'INFO_SUPPORT' | translate }}\r" + "\n" + "        </div>\r" + "\n" + '        <div class="textjustify">\r' + "\n" + '            <a class="link" href="https://openrouteservice.org/donations/" target="_blank">{{ \'INFO_SUPPORT_TEXT\' | translate }}</a>\r' + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + '    <p class="textjustify" ng-bind-html="(\'INFO_II\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + "</section>\r" + "\n" + '<div class="ui divider">\r' + "\n" + "</div>\r" + "\n" + "<section>\r" + "\n" + "    <h4 ng-bind-html=\"'Software & Libraries'\">\r" + "\n" + "    </h4>\r" + "\n" + "    <p>\r" + "\n" + "        MapSurfer Background Layer:\r" + "\n" + '        <a class="link" href="https://korona.geog.uni-heidelberg.de/contact.html" target="_blank">\r' + "\n" + "            OpenMapSurfer Tiles & WMS\r" + "\n" + "        </a>\r" + "\n" + "    </p>\r" + "\n" + '    <p class="textjustify" ng-bind-html="(\'INFO_III\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + '     <p class="textjustify" ng-bind-html="(\'INFO_VI\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + '    <p class="info" ng-bind-html="(\'INFO_II_I\' | translate)"></p>\r' + "\n" + "    <p ng-bind-html=\"('INFO_II_II' | translate)\"></p>\r" + "\n" + "</section>\r" + "\n" + '<div class="ui divider">\r' + "\n" + "</div>\r" + "\n" + "<section>\r" + "\n" + '    <a href="http://www.geog.uni-heidelberg.de/gis/heigit_en.html" target="_blank">\r' + "\n" + '        <img height="auto" ng-src="https://udukonline.000webhostapp.com/assets/maps/img/brand.png" style="float: left; margin: 0 20px 40px 0;" width="150px"/>\r' + "\n" + "    </a>\r" + "\n" + '    <p class="textjustify" ng-bind-html="(\'INFO_IV\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + "    <span>\r" + "\n" + '        <a style="color: #b5152b;text-decoration: none;" href="https://ask.openrouteservice.org" target="_blank">\r' + "\n" + '            <i class="fa fa-2x fa-question-circle"></i>\r' + "\n" + '            <span style="font-size: larger; padding: 0 0 5px 5px;position: relative;top: -3px;" ng-bind-html="\'Ask Openrouteservice\'">\r' + "\n" + "            </span>\r" + "\n" + "        </a>\r" + "\n" + "    </span>\r" + "\n" + '    <p class="textjustify" ng-bind-html="(\'INFO_V\' | translate)">\r' + "\n" + "    </p>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + "    <h4>\r" + "\n" + '        <a class="link" href="https://www.uni-heidelberg.de/privacypolicy_web.html" target="_blank">Privacy Policy</a>\r' + "\n" + "    </h4>\r" + "\n" + "</section>\r" + "\n");
        $templateCache.put("includes/route-instructions.html", '<div class="ors-route-segments">\r' + "\n" + '    <div class="ors-segment-card" data-ng-repeat="segment in route.segments">\r' + "\n" + '        <div class="info" ng-class="{highlight: hover}" ng-click="$ctrl.zoomTo($index);" ng-mouseenter="$ctrl.EmphSegment($index); hover=true;" ng-mouseleave="$ctrl.DeEmph(); hover=false;">\r' + "\n" + '            <div class="heading">\r' + "\n" + '                <div class="icon pointer" ng-click="steps = !steps; $event.stopPropagation();">\r' + "\n" + '                    <i ng-class="$ctrl.getClass(steps)">\r' + "\n" + "                    </i>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="icon">\r' + "\n" + '                    <i class="fa fa-lg fa-home" ng-if="$index == 0">\r' + "\n" + "                    </i>\r" + "\n" + '                    <i class="fa fa-lg fa-map-marker" ng-if="$index > 0">\r' + "\n" + "                    </i>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="waypoint">\r' + "\n" + '                    <h4 class="pointer" ng-bind-html="$ctrl.waypoints[$index]._address">\r' + "\n" + "                    </h4>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary">\r' + "\n" + '                <div class="group">\r' + "\n" + '                    <div class="summary-item">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-clock-o">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(segment.duration | duration)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="summary-item">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-arrows-h">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(segment.distance | distance)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="summary-item" ng-if="segment.ascent">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-long-arrow-up">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(segment.ascent | distance)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="summary-item" ng-if="segment.descent">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-long-arrow-down">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(segment.descent | distance)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="group">\r' + "\n" + '                    <div class="summary-item" ng-if="segment.detourfactor" tooltip-side="top" tooltip-template="{{(\'DETOUR_FACTOR\' | translate)}}" tooltips="">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-lastfm">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + "                        <span ng-bind-html=\"'<b>' + (route.summary.distance  / (segment.detourfactor * route.summary.distance) | number: 1 ) + '</b>'\">\r" + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="summary-item" ng-if="segment.percentage" tooltip-side="top" tooltip-template="{{(\'PERCENTAGE_OF_ROUTE\' | translate)}}" tooltips="">\r' + "\n" + "                        <span>\r" + "\n" + '                            <i class="fa fa-percent">\r' + "\n" + "                            </i>\r" + "\n" + "                        </span>\r" + "\n" + "                        <span ng-bind-html=\"'<b>' + segment.percentage + '</b>'\">\r" + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <div class="steps">\r' + "\n" + '            <div class="collapsable" ng-class="{ showMe: steps }">\r' + "\n" + '                <div class="step" data-ng-repeat="step in segment.steps" ng-class="{highlight: hoverStep}" ng-click="$ctrl.zoomToStep(step.way_points);" ng-if="step.type !== 10" ng-mouseout="$ctrl.DeEmph(); hoverStep=false; $ctrl.DeEmphStepLm(step.landmarks);" ng-mouseover="$ctrl.EmphStep(step.way_points); hoverStep=true; $ctrl.EmphStepLm(step.landmarks);">\r' + "\n" + '                    <div class="header">\r' + "\n" + '                        <div class="icon">\r' + "\n" + '                            <i ng-class="$ctrl.getIcon(step.type)">\r' + "\n" + "                            </i>\r" + "\n" + "                        </div>\r" + "\n" + '                        <div class="text" ng-bind-html="step.instruction">\r' + "\n" + "                        </div>\r" + "\n" + "                    </div>\r" + "\n" + '                    <div class="summary">\r' + "\n" + '                        <span ng-bind-html="(step.distance | distance)">\r' + "\n" + "                        </span>\r" + "\n" + '                        <span class="pipe">\r' + "\n" + "                            |\r" + "\n" + "                        </span>\r" + "\n" + '                        <span ng-bind-html="(step.duration | duration)">\r' + "\n" + "                        </span>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ors-segment-card" ng-show="route.segments">\r' + "\n" + '        <div class="info" ng-class="{highlight: hover}" ng-click="$ctrl.zoomTo(route.segments.length, true);" ng-mouseenter="hover=true;" ng-mouseleave="hover=false;">\r' + "\n" + '            <div class="heading">\r' + "\n" + '                <div class="icon">\r' + "\n" + '                    <i class="fa fa-lg fa-flag">\r' + "\n" + "                    </i>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="waypoint">\r' + "\n" + '                    <h4 ng-bind-html="$ctrl.waypoints[$ctrl.waypoints.length-1]._address">\r' + "\n" + "                    </h4>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + "</div>");
        $templateCache.put("includes/route-summary.html", '<div class="ors-route-card">\r' + "\n" + '    <div class="left" ng-switch="$ctrl.data.info.query.profile">\r' + "\n" + '        <div ng-switch-when="driving-car">\r' + "\n" + '            <i class="fa fa-lg fa-car">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + '        <div ng-switch-when="cycling-regular|cycling-road|cycling-safe|cycling-mountain|cycling-tour|cycling-electric" ng-switch-when-separator="|">\r' + "\n" + '            <i class="fa fa-lg fa-bicycle">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + '        <div ng-switch-when="driving-hgv">\r' + "\n" + '            <i class="fa fa-lg fa-bus">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + '        <div ng-switch-when="wheelchair">\r' + "\n" + '            <i class="fa fa-lg fa-wheelchair">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + '        <div ng-switch-when="foot-walking|foot-hiking" ng-switch-when-separator="|">\r' + "\n" + '            <i class="fa fa-lg fa-male">\r' + "\n" + "            </i>\r" + "\n" + "        </div>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="right">\r' + "\n" + "        <div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.duration" tooltip-side="top" tooltip-template="{{(\'DURATION\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-clock-o">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.duration | duration)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.distance" tooltip-side="top" tooltip-template="{{(\'DISTANCE\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-arrows-h">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.distance | distance)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.distance_actual" tooltip-side="top" tooltip-template="{{(\'ACTUALDISTANCE\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-ellipsis-h">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.distance_actual | distance)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "        <div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.ascent" tooltip-side="top" tooltip-template="{{(\'ASCENT\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-long-arrow-up">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.ascent | distance)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.descent" tooltip-side="top" tooltip-template="{{(\'DESCENT\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-long-arrow-down">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.descent | distance)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.consumption" tooltip-side="top" tooltip-template="{{(\'CONSUMPTION\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-tint">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + "                <span ng-bind-html=\"(route.summary.consumption | round: ' l')\">\r" + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "        <div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.emission" tooltip-side="top" tooltip-template="{{(\'EMISSION\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-cloud-upload">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + "                <span ng-bind-html=\"(route.summary.emission | round: ' kg CO<sub>2</sub>')\">\r" + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="summary-item" ng-if="route.summary.fuelCost" tooltip-side="top" tooltip-template="{{(\'FUEL_COSTS\' | translate)}}" tooltips="">\r' + "\n" + "                <span>\r" + "\n" + '                    <i class="fa fa-eur">\r' + "\n" + "                    </i>\r" + "\n" + "                </span>\r" + "\n" + '                <span ng-bind-html="(route.summary.fuelCost | round)">\r' + "\n" + "                </span>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + '        <button class="summary-select" data-ng-click="$ctrl.setIdx($index); $ctrl.showInstructions();" ng-bind-html="(\'DETAILS\' | translate)" ng-show="!$ctrl.shouldDisplayRouteDetails">\r' + "\n" + "            >\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="right-2">\r' + "\n" + '        <button class="ors-controls-button flright" data-ng-click="$ctrl.showShare = !$ctrl.showShare" tooltip-side="left" tooltip-template="{{(\'SHARE_LINK\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-share-alt">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + '        <button class="ors-controls-button flright" data-ng-click="$ctrl.showExport = !$ctrl.showExport" tooltip-side="left" tooltip-template="{{(\'EXPORT\' | translate)}}" tooltips="">\r' + "\n" + '            <i class="fa fa-download">\r' + "\n" + "            </i>\r" + "\n" + "        </button>\r" + "\n" + "    </div>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("includes/settings.html", '<div class="ors-settings">\r' + "\n" + "    <header>\r" + "\n" + "        <h1 ng-bind-html=\"('SETTINGS' | translate)\">\r" + "\n" + "        </h1>\r" + "\n" + "    </header>\r" + "\n" + '    <div class="locale-settings">\r' + "\n" + '        <section class="">\r' + "\n" + "            <h2 ng-bind-html=\"('UNITS' | translate)\">\r" + "\n" + "            </h2>\r" + "\n" + '            <div class="field ors-inline">\r' + "\n" + '                <div class="ui radio checkbox">\r' + "\n" + '                    <input name="orsUnits" ng-change="$ctrl.changeOptions(\'units\')"\r' + "\n" + '                           ng-model="$ctrl.currentOptions.units"\r' + "\n" + '                           ng-value="$ctrl.optionList.units.km" type="radio">\r' + "\n" + "                    <label ng-bind-html=\"('KILOMETERS' | translate)\">\r" + "\n" + "                    </label>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + '            <div class="field ors-inline">\r' + "\n" + '                <div class="ui radio checkbox">\r' + "\n" + "                    <input\r" + "\n" + '                            name="orsUnits" ng-change="$ctrl.changeOptions(\'units\')"\r' + "\n" + '                            ng-model="$ctrl.currentOptions.units"\r' + "\n" + '                            ng-value="$ctrl.optionList.units.mi" type="radio">\r' + "\n" + "                    <label ng-bind-html=\"('MILES' | translate)\">\r" + "\n" + "                    </label>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </section>\r" + "\n" + "    </div>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + "    <section>\r" + "\n" + "        <h2 ng-bind-html=\"('LANGUAGE' | translate)\">\r" + "\n" + "        </h2>\r" + "\n" + '        <label for="language"\r' + "\n" + "               ng-bind-html=\"('CHOOSELANG' | translate)\">\r" + "\n" + "        </label>\r" + "\n" + '        <select id="language"\r' + "\n" + '                data-ng-model="$ctrl.currentOptions.language"\r' + "\n" + '                data-ng-options="(language) for language in $ctrl.optionList.languages.all" name="language"\r' + "\n" + "                ng-change=\"$ctrl.changeOptions('language')\">\r" + "\n" + "        </select>\r" + "\n" + "    </section>\r" + "\n" + '    <div class="ui divider">\r' + "\n" + "    </div>\r" + "\n" + "    <section>\r" + "\n" + "        <h2 ng-bind-html=\"('LANGROUTING' | translate)\">\r" + "\n" + "        </h2>\r" + "\n" + "        <label ng-bind-html=\"('CHOOSELANG' | translate)\">\r" + "\n" + "        </label>\r" + "\n" + '        <select data-ng-model="$ctrl.currentOptions.routinglang"\r' + "\n" + '                data-ng-options="(language) for language in $ctrl.optionList.routinglanguages.all"\r' + "\n" + '                name="routinglanguage" ng-change="$ctrl.changeOptions(\'routinglang)">\r' + "\n" + "        </select>\r" + "\n" + "    </section>\r" + "\n" + "    <section>\r" + "\n" + "        <h2 ng-bind-html=\"('LOCALE_MAP_SETTINGS' | translate)\">\r" + "\n" + "        </h2>\r" + "\n" + '        <div class="ui form align-left">\r' + "\n" + '            <div class="grouped fields">\r' + "\n" + '                <div class="field">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.currentOptions.randomIsoColor" id="isochronescolors"\r' + "\n" + '                               ng-change="$ctrl.changeOptions(\'randomIsoColor\')" type="checkbox">\r' + "\n" + '                        <label for="isochronescolors" ng-bind-html="(\'LOCALE_ISOCHRONE_RANDOMIZE_COLORS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.currentOptions.distanceMarkers" id="distancemarkers"\r' + "\n" + '                               ng-change="$ctrl.changeOptions(\'distanceMarkers\')" type="checkbox">\r' + "\n" + '                        <label for="distancemarkers" ng-bind-html="(\'LOCALE_DISTANCE_MARKERS\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.currentOptions.showHeightgraph" id="heightgraph"\r' + "\n" + '                               ng-change="$ctrl.changeOptions(\'heightgraph\')" type="checkbox">\r' + "\n" + '                        <label for="heightgraph" ng-bind-html="(\'LOCALE_HEIGHTGRAPH\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </section>\r" + "\n" + "    <section>\r" + "\n" + "        <h2 ng-bind-html=\"('EXTRA_INFORMATION' | translate)\">\r" + "\n" + "        </h2>\r" + "\n" + '        <div class="ui form align-left">\r' + "\n" + '            <div class="grouped fields">\r' + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.steepness | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.steepness" id="steepness_exin" type="checkbox"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()">\r' + "\n" + '                        <label for="steepness_exin" ng-bind-html="(\'steepness\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.surface | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.surface" id="surface_exin"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()" type="checkbox">\r' + "\n" + '                        <label for="surface_exin" ng-bind-html="(\'surface\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.waytype | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.waytype" id="waytype_exin"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()" type="checkbox">\r' + "\n" + '                        <label for="waytype_exin" ng-bind-html="(\'waytypes\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.suitability | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.suitability" id="suitability_exin"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()" type="checkbox">\r' + "\n" + '                        <label for="suitability_exin" ng-bind-html="(\'suitability\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.tollways | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.tollways" id="tollways_exin"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()" type="checkbox">\r' + "\n" + '                        <label for="tollways_exin" ng-bind-html="(\'tollways\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.green | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.green" id="green_exin" ng-change="$ctrl.changeExtras()"\r' + "\n" + '                               type="checkbox">\r' + "\n" + '                        <label for="green_exin" ng-bind-html="(\'green\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field" ng-if="$ctrl.lists_extra_info.noise | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.noise" id="noise_exin" ng-change="$ctrl.changeExtras()"\r' + "\n" + '                               type="checkbox">\r' + "\n" + '                        <label for="noise_exin" ng-bind-html="(\'noise\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + '                <div class="field"\r' + "\n" + '                     ng-if="$ctrl.lists_extra_info.TrailDifficulty | contains:$ctrl.getActiveProfile().type">\r' + "\n" + '                    <div class="ui checkbox">\r' + "\n" + '                        <input data-ng-model="$ctrl.extra_infos.TrailDifficulty" id="traildifficulty_exin"\r' + "\n" + '                               ng-change="$ctrl.changeExtras()" type="checkbox">\r' + "\n" + '                        <label for="traildifficulty_exin" ng-bind-html="(\'traildifficulty\' | translate)">\r' + "\n" + "                        </label>\r" + "\n" + "                    </div>\r" + "\n" + "                </div>\r" + "\n" + "            </div>\r" + "\n" + "        </div>\r" + "\n" + "    </section>\r" + "\n" + '    <button class="ors-button pull-left" ng-click="$ctrl.showDev = !$ctrl.showDev">\r' + "\n" + '        <i class="fa fa-cog fa-lg" style="opacity: 0.05">\r' + "\n" + "        </i>\r" + "\n" + "    </button>\r" + "\n" + '    <section ng-show="$ctrl.showDev">\r' + "\n" + "        <h2 ng-bind-html=\"('DEVELOPER_SETTINGS' | translate)\">\r" + "\n" + "        </h2>\r" + "\n" + "        <label>Auto Fill: </label>\r" + "\n" + "        <button ng-click=\"$ctrl.presetEndpoints('local'); $ctrl.api = false\">Local</button>\r" + "\n" + "        <button ng-click=\"$ctrl.presetEndpoints('api'); $ctrl.api = true\">Api</button>\r" + "\n" + "        <button ng-click=\"$ctrl.presetEndpoints('default'); $ctrl.api = false\">Default</button>\r" + "\n" + "        <br>\r" + "\n" + "        <label ng-bind-html=\"'BaseUrl: '\"></label>\r" + "\n" + '        <input data-ng-model="$ctrl.envBase"\r' + "\n" + '               id="baseUrl"\r' + "\n" + '               name="baseUrl" ng-change="$ctrl.changeOptions(\'baseUrl\'); $ctrl.setDefaultValues($ctrl.envBase)"\r' + "\n" + '               ng-model-options="{debounce: 500}"\r' + "\n" + '               style="width: 50%"/>\r' + "\n" + '        <button ng-click="$ctrl.editEndpoints = !$ctrl.editEndpoints">Specify Endpoints</button>\r' + "\n" + "        <br>\r" + "\n" + '        <div ng-show="$ctrl.editEndpoints">\r' + "\n" + "            <label ng-bind-html=\"'Geocode: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.geocode"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('geocode')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "            <br>\r" + "\n" + "            <label ng-bind-html=\"'Directions: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.directions"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('directions')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "            <br>\r" + "\n" + "            <label ng-bind-html=\"'Isochrones: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.isochrones"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('isochrones')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "            <br>\r" + "\n" + "            <label ng-bind-html=\"'Matrix: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.matrix"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('matrix')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "            <br>\r" + "\n" + "            <label ng-bind-html=\"'Pois: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.pois"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('pois')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "            <br>\r" + "\n" + "            <label ng-bind-html=\"'Fuel: '\"></label>\r" + "\n" + '            <input data-ng-model="$ctrl.currentOptions.env.fuel"\r' + "\n" + '                   ng-model-options="{debounce: 500}"\r' + "\n" + "                   ng-change=\"$ctrl.changeOptions('fuel')\"\r" + "\n" + '                   style="width: 70%"/>\r' + "\n" + "        </div>\r" + "\n" + '        <div ng-show="$ctrl.api">\r' + "\n" + "            <br>\r" + "\n" + "            <label>Api-Key</label>\r" + "\n" + '            <input data-ng-model="$ctrl.apikey" ng-change="$ctrl.saveKey()"/>\r' + "\n" + "        </div>\r" + "\n" + "        <br>\r" + "\n" + '        <button ng-click="$ctrl.resetEndpoints(); $ctrl.showPopup()">Reset</button>\r' + "\n" + '        <button ng-click="$ctrl.setENV(); $ctrl.saveEndpoints(); $ctrl.showPopup()">Change Endpoints</button>\r' + "\n" + '        <div class="ui checkbox">\r' + "\n" + '            <input data-ng-model="$ctrl.saveCookies" id="saveCookies" type="checkbox">\r' + "\n" + '            <label for="saveCookies" ng-bind-html="\'Save to cookies\'">\r' + "\n" + "            </label>\r" + "\n" + "        </div>\r" + "\n" + "    </section>\r" + "\n" + "</div>\r" + "\n");
        $templateCache.put("languages/de-DE.json", "{\r" + "\n" + '    "BICYCLE": "Fahrrad",\r' + "\n" + '    "CAR": "Auto",\r' + "\n" + '    "HGV": "Schwerkraftwagen",\r' + "\n" + '    "PEDESTRIAN": "Fußgänger",\r' + "\n" + '    "WHEELCHAIR": "Rollstuhlprofil",\r' + "\n" + '    "DISTANCE": "Entfernung",\r' + "\n" + '    "DURATION": "Dauer",\r' + "\n" + '    "SETTINGS": "Einstellungen",\r' + "\n" + '    "DOCUMENTATION": "API-Dokumentation",\r' + "\n" + '    "ROUTING": "Routing",\r' + "\n" + '    "AA": "Isochronen",\r' + "\n" + '    "ADD": "Hinzufügen",\r' + "\n" + '    "RESET": "Zurücksetzen",\r' + "\n" + '    "REVERSE": "Vertauschen",\r' + "\n" + '    "EXPAND": "Zoom",\r' + "\n" + '    "UPLOAD": "Hochladen",\r' + "\n" + '    "TOGGLESHOW": "Zeige/verstecke",\r' + "\n" + '    "DOWNLOAD": "Herunterladen",\r' + "\n" + '    "REMOVE": "Entfernen",\r' + "\n" + '    "OPTIONS": "Optionen",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Isochronen Optionen",\r' + "\n" + '    "EXPORT": "Strecken Exportieren",\r' + "\n" + '    "ACTUALDISTANCE": "Tatsächliche Entfernung",\r' + "\n" + '    "ASCENT": "Positive Steigung",\r' + "\n" + '    "DESCENT": "Negative Steignung",\r' + "\n" + '    "DETAILS": "Details",\r' + "\n" + '    "CALCULATE": "Berechne",\r' + "\n" + '    "PREFERENCE": "Präferenz",\r' + "\n" + '    "WEIGHT": "Gewichtung",\r' + "\n" + '    "AVOIDTYPES": "Straßen vermeiden",\r' + "\n" + '    "FERRIES": "Fähren",\r' + "\n" + '    "UNPAVED": "Ungepflastere Straßen",\r' + "\n" + '    "PAVED": "Gepflasterte Straßen",\r' + "\n" + '    "FORDS": "Furten",\r' + "\n" + '    "STEPS": "Stufen",\r' + "\n" + '    "HIGHWAYS": "Autobahnen",\r' + "\n" + '    "TOLLROADS": "Mautstraßen",\r' + "\n" + '    "TUNNELS": "Tunnel",\r' + "\n" + '    "TRACKS": "Wege",\r' + "\n" + '    "DIFFICULTY": "Schwierigkeitseinstellungen",\r' + "\n" + '    "FITNESS": "Fitness",\r' + "\n" + '    "AVOIDHILLS": "Hügel vermeiden",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Maximale Steigung",\r' + "\n" + '    "HGVSETTINGS": "HGV Einstellungen",\r' + "\n" + '    "HGVLENGTH": "Länge",\r' + "\n" + '    "HGVWIDTH": "Breite",\r' + "\n" + '    "HGVHEIGHT": "Höhe",\r' + "\n" + '    "HGVAXLELOAD": "Achsengewicht",\r' + "\n" + '    "HGVWEIGHT": "Gewicht",\r' + "\n" + '    "HGVHAZMAT": "Gefahrgut",\r' + "\n" + '    "ADDITIONALSETTINGS": "Weitere Einstellungen",\r' + "\n" + '    "MAXIMUMSPEED": "Maximale Geschwindigkeit",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Rollstuhl Einstellungen",\r' + "\n" + '    "SURFACE": "Oberfläche",\r' + "\n" + '    "INCLINE": "Anstieg",\r' + "\n" + '    "CURB": "Bordsteinhöhe",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Mindestbreite",\r' + "\n" + '    "ISOCHRONES": "Isochronen",\r' + "\n" + '    "ISOCHRONEMETHOD": "Isochronen Methode",\r' + "\n" + '    "TIMEDISTANCE": "Distanz",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Intervall",\r' + "\n" + '    "KILOMETERS": "Kilometer",\r' + "\n" + '    "UNITS": "Einheiten",\r' + "\n" + '    "MILES": "Meilen",\r' + "\n" + '    "LANGUAGE": "Sprache",\r' + "\n" + '    "CHOOSELANG": "Wählen Sie eine Sprache",\r' + "\n" + '    "LANGROUTING": "Sprache der Routing Anweisungen",\r' + "\n" + '    "Fastest": "Schnellste",\r' + "\n" + '    "Recommended": "Bevorzugt",\r' + "\n" + '    "Shortest": "Kürzeste",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Sichere Route",\r' + "\n" + '    "BICYCLETOUR": "Trekkingrad",\r' + "\n" + '    "BICYCLEMTB": "Mountainbike",\r' + "\n" + '    "BICYCLERACING": "Rennrad",\r' + "\n" + '    "BICYCLEELECTRO": "E-Bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Schweres Fahrzeug",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Agrarfahrzeug",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Forstfahrzeug",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Lieferfahrzeug",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Güterfahrzeug",\r' + "\n" + '    "PEDESTRIANNORMAL": "Spazieren",\r' + "\n" + '    "PEDESTRIANHIKING": "Wandern",\r' + "\n" + '    "NOTICE": "Hinweis",\r' + "\n" + '    "CONNECTION": "Es besteht keine Internetverbindung.",\r' + "\n" + '    "ROUTE": "Es ist ein Fehler aufgetreten. Für diese Wegpunkte konnte keine Route gefunden werden.",\r' + "\n" + '    "GEOCODE": "Es konnte keine Adresse gefunden werden.",\r' + "\n" + '    "METHODTIME": "Zeit",\r' + "\n" + '    "METHODDISTANCE": "Distanz",\r' + "\n" + '    "DISTANCEUNITS": "km",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Methode",\r' + "\n" + '    "AREA": "Fläche",\r' + "\n" + '    "REACHFACTOR": "Erreichbarkeitsfaktor",\r' + "\n" + '    "REVERSEFLOW": "Erreichbarkeit zum Ziel",\r' + "\n" + '    "RANGE": "Reichweite",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Isochronen herunterladen",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Route herunterladen",\r' + "\n" + '    "FILE_FORMAT": "Datei Format",\r' + "\n" + '    "SELECT_FILES": "Datei(en) auswählen (geojson, gpx, kml oder tcx)",\r' + "\n" + '    "FILE_NAME": "Dateiname",\r' + "\n" + '    "PREVIEW": "Vorschau",\r' + "\n" + '    "IMPORT_TRACK": "Strecke als Route",\r' + "\n" + '    "IMPORT": "Importieren",\r' + "\n" + '    "IMPORT_ROUTE": "Strecken importieren",\r' + "\n" + '    "Cobblestone": "Pflastersteine",\r' + "\n" + '    "Other": "Anderes",\r' + "\n" + '    "StateRoad": "Bundesstraße",\r' + "\n" + '    "Road": "Straße",\r' + "\n" + '    "Street": "Straße",\r' + "\n" + '    "Path": "Pfad",\r' + "\n" + '    "Track": "Weg",\r' + "\n" + '    "Cycleway": "Fahrradstraße",\r' + "\n" + '    "Footway": "Fußgängerweg",\r' + "\n" + '    "Steps": "Stufen",\r' + "\n" + '    "Ferry": "Fähren",\r' + "\n" + '    "Construction": "In Bau",\r' + "\n" + '    "Paved": "Befestigte Straße",\r' + "\n" + '    "Unpaved": "Unbefestige Straße",\r' + "\n" + '    "Asphalt": "Asphalt",\r' + "\n" + '    "Concrete": "Zementierte Straße",\r' + "\n" + '    "Metal": "Metall",\r' + "\n" + '    "Wood": "Holz",\r' + "\n" + '    "Compacted Gravel": "Kompakter Schotter",\r' + "\n" + '    "Fine Gravel": "Feiner Schotter",\r' + "\n" + '    "Gravel": "Schotter",\r' + "\n" + '    "Dirt": "Erde",\r' + "\n" + '    "Ground": "Boden",\r' + "\n" + '    "Ice": "Eis",\r' + "\n" + '    "Salt": "Salz",\r' + "\n" + '    "Sand": "Sand",\r' + "\n" + '    "Woodchips": "Hackgut",\r' + "\n" + '    "Grass": "Gras",\r' + "\n" + '    "Grass Paver": "Rasengitterstein",\r' + "\n" + '    "DESTINATION": "Route hierher",\r' + "\n" + '    "START": "Route von hier",\r' + "\n" + '    "VIA": "Als Wegpunkt hinzufügen",\r' + "\n" + '    "CENTER": "Als Zentrum nutzen",\r' + "\n" + '    "WELCOME": "Willkommen bei Openrouteservice!",\r' + "\n" + '    "WELCOME_MESSAGE": "Oben rechts kannst du vermeidbare Polygone zeichnen. Im linken Menü findest du eine Vielzahl von Optionen zum Individualisieren deiner Route. Unsere neue Service API für Erreichbarkeitsanalysen findest du ebenfalls im linken Menü.",\r' + "\n" + '    "EXTRAS": "Weitere Informationen",\r' + "\n" + '    "WHATSHERE": "Was ist hier?",\r' + "\n" + '    "NO_ADDRESS": "Es konnte keine Adresse gefunden werden.",\r' + "\n" + '    "suitability": "Eignung der Wege",\r' + "\n" + '    "steepness": "Steigung",\r' + "\n" + '    "waytypes": "Wegtypen",\r' + "\n" + '    "surface": "Oberflächenbeschaffenheit",\r' + "\n" + '    "roadaccessrestrictions": "Straßen Beschränkungen",\r' + "\n" + '    "green": "Grünflächen index (Eingeschränkt auf Deutschland)",\r' + "\n" + '    "tollways": "Mautstraßen",\r' + "\n" + '    "FROM": "from",\r' + "\n" + '    "TO": "to",\r' + "\n" + '    "SHARE_LINK": "Link teilen",\r' + "\n" + '    "SHORTEN": "Kurz-URL",\r' + "\n" + '    "SHORTEN_HINT": "Du kannst den Link auch aus der Adressleiste deines Browsers kopieren.",\r' + "\n" + '    "GREEN_ROUTING": "Grünfächen bevorzugen (Eingeschränkt auf Deutschland)",\r' + "\n" + '    "QUIET_ROUTING": "Ruhige Wege bevorzugen (Eingeschränkt auf Deutschland)",\r' + "\n" + '    "DONATE": "Spenden Sie Daten!",\r' + "\n" + '    "DONATE_TEXT": "Helfen Sie mit und fügen Sie Ihre geographischen Daten hinzu auf",\r' + "\n" + '    "INFO_I": "Entwickelt vom Heidelberg Institute for Geoinformation Technology (HeiGIT) bietet openrouteservice.org Routing Services auf Basis nutzergenerierter, gemeinschaftlich erhobener, freier geographischer Daten von OpenStreetMap an. Bitte fügen Sie Ihre geographischen Daten auf openstreetmap.org hinzu!",\r' + "\n" + '    "INFO_II": "Wir verwenden Cookies, System Logs und weitere Datenspeicher-Technologien um (a) Informationen zu speichern, damit der Benutzer diese nicht während des aktuellen oder eines künftigen Besuchs erneut eingeben muss; (b)  Sitzungen für authentifizierter Benutzer aufrecht zu erhalten; und (c) Überwachung der Daten der gesamten Website-Nutzung, z. B. Gesamtzahl der Besucher und besuchten Seiten zu ermöglichen. Falls Sie Cookies deaktivieren könnten Teile der Website nicht richtig funktionieren. Wir erheben und speichern jedoch keine persönlichen Daten, außer Sie teilen uns diese im Rahmen eines direkten Kontaktes mit. Wir geben keine analytischen Daten an Dritte weiter.",\r' + "\n" + "    \"INFO_II_I\": \"Wir verwenden verschiedene Open-Source-Bibliotheken für diese Webanwendung. Diese finden Sie in den entsprechenden Paketdateien auf <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Bugs können auf <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>Github</a> gemeldet werden oder selbst behoben und per Pull-Request eingebunden werden.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Es ist Nutzern untersagt, ohne ausdrückliche schriftliche Genehmigung des CIAT einen kommerziellen, nicht-freien Weiterverkauf oder eine Weiterverbreitung durchzuführen. Originaldaten von Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Lückenlose V4 SRTM-Daten, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "Falls Sie weitere Fragen, Anliegen oder Feedback für uns haben, kontaktieren Sie uns bitte über unser Forum:",\r' + "\n" + '    "INFO_V": "Openrouteservice nimmt sich Zeit für Ihre Anfragen, Probleme, Fragen etc. Wir legen großen Wert darauf Ihnen so schnell wie möglich zu antworten. Nachdem Sie unsere automatische E-Mail erhalten die Ihnen bestätigt, dass wir Ihre Anfrage erhalten haben, werden wir uns bald mit Ihnen in Verbindung setzen. Bitte geben Sie uns etwas Zeit ihre Anfrage zu bearbeiten, da wir sehr viele Anfragen erhalten.",\r' + "\n" + "    \"INFO_VI\": \"Bevölkerungszahlen sind anhand des <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a> berechnet.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Isochronen generieren",\r' + "\n" + '    "DETOUR_FACTOR": "Umwegfaktor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Anteil der Gesamtstrecke",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Karteneinstellungen",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomisierte Farben für Isochronen",\r' + "\n" + '    "DRAGTOADD": "Ziehen für Wegpunkt, klicken für Infos",\r' + "\n" + '    "noise": "Lautstärkeindex (Eingeschränkt auf Deutschland)",\r' + "\n" + '    "height": "Höhe",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distanz-Marker (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Mautfreie Straßen",\r' + "\n" + '    "LOCALE_TOLLWAY": "Mautstraßen",\r' + "\n" + '    "avgspeed": "Durchschnittsgeschwindigkeit",\r' + "\n" + '    "traildifficulty": "Schwierigkeitsgrad",\r' + "\n" + '    "EXTRA_INFORMATION": "Weitere Informationen der Route",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Weitere Informationen können in den Einstellungen hinzugefügt werden",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + "    \"LOCALE_SIGNUP_MESSAGE\": \"If you are satisfied with the features of Openrouteservice please sign up for the free to use API at <strong><a href='https://openrouteservice.org' target='_blank'>https://openrouteservice.org</a></strong>\",\r" + "\n" + '    "AVOIDBORDERS": "Grenzen vermeiden",\r' + "\n" + '    "CONTROLLEDBORDERS": "Kontrollierte Grenzen",\r' + "\n" + '    "BORDERS": "Alle Grenzen",\r' + "\n" + '    "COUNTRYBORDERS": "Ländergrenzen",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Suche zu vermeidende Länder",\r' + "\n" + '    "TOTALPOP": "Einwohnerzahl",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Als Marker hinzufügen",\r' + "\n" + '    "ELEVATION": "Höhe",\r' + "\n" + '    "INFO_SUPPORT": "Unterstützen Sie openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice bietet kostenlose Dienstleistungen an und ist für einen Großteil seiner Finanzierung auf Spenden angewiesen. Wenn Sie die Weiterentwicklung von Features und Serverinfrastruktur unterstützen möchten, sind Spenden sehr willkommen.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Höhenprofil",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Entwickler Optionen",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Kraftstoffverbrauch (experimentell)",\r' + "\n" + '    "FUEL_TYPE": "Kraftstoffart",\r' + "\n" + '    "CAR_BRAND": "Auto Marke",\r' + "\n" + '    "DRIVING_SPEED": "Fahrgeschwindigkeit",\r' + "\n" + '    "VEHICLE_CATEGORY": "Fahrzeugklasse",\r' + "\n" + '    "TANK_SIZE": "Tankgröße",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Spezifischer Kraftstoffverbrauch",\r' + "\n" + '    "CAR_MODEL": "Automodell",\r' + "\n" + '    "CAR_YEAR": "Baujahr",\r' + "\n" + '    "CAR_TYPE": "Spezieller Typ",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/en-GB.json", "{\r" + "\n" + '    "BICYCLE": "Bicycle",\r' + "\n" + '    "CAR": "Car",\r' + "\n" + '    "HGV": "Heavy Vehicle",\r' + "\n" + '    "PEDESTRIAN": "Pedestrian",\r' + "\n" + '    "WHEELCHAIR": "Wheelchair",\r' + "\n" + '    "DISTANCE": "Distance",\r' + "\n" + '    "DURATION": "Time",\r' + "\n" + '    "SETTINGS": "Settings",\r' + "\n" + '    "DOCUMENTATION": "API Documentation",\r' + "\n" + '    "ROUTING": "Routing",\r' + "\n" + '    "AA": "Isochrones",\r' + "\n" + '    "ADD": "Add Waypoint",\r' + "\n" + '    "RESET": "Reset Route",\r' + "\n" + '    "REVERSE": "Reverse Waypoints",\r' + "\n" + '    "EXPAND": "Expand",\r' + "\n" + '    "UPLOAD": "Upload Tracks",\r' + "\n" + '    "TOGGLESHOW": "Toggle",\r' + "\n" + '    "DOWNLOAD": "Download",\r' + "\n" + '    "REMOVE": "Remove",\r' + "\n" + '    "OPTIONS": "Options",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Isochrone Options",\r' + "\n" + '    "EXPORT": "Export Route",\r' + "\n" + '    "ACTUALDISTANCE": "Actual Distance",\r' + "\n" + '    "ASCENT": "Ascent",\r' + "\n" + '    "DESCENT": "Descent",\r' + "\n" + '    "DETAILS": "Details",\r' + "\n" + '    "CALCULATE": "Calculate",\r' + "\n" + '    "PREFERENCE": "Route preference",\r' + "\n" + '    "WEIGHT": "weight",\r' + "\n" + '    "AVOIDTYPES": "Avoid road types",\r' + "\n" + '    "FERRIES": "Ferries",\r' + "\n" + '    "UNPAVED": "Unpaved Roads",\r' + "\n" + '    "PAVED": "Paved Roads",\r' + "\n" + '    "FORDS": "Fords",\r' + "\n" + '    "STEPS": "Steps",\r' + "\n" + '    "HIGHWAYS": "Highways",\r' + "\n" + '    "TOLLROADS": "Toll roads",\r' + "\n" + '    "TUNNELS": "Tunnels",\r' + "\n" + '    "TRACKS": "Tracks",\r' + "\n" + '    "DIFFICULTY": "Difficulty settings",\r' + "\n" + '    "FITNESS": "Fitness",\r' + "\n" + '    "AVOIDHILLS": "Avoid hills",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Maximum steepness",\r' + "\n" + '    "HGVSETTINGS": "HGV settings",\r' + "\n" + '    "HGVLENGTH": "Length",\r' + "\n" + '    "HGVWIDTH": "Width",\r' + "\n" + '    "HGVHEIGHT": "Height",\r' + "\n" + '    "HGVAXLELOAD": "Axle Load",\r' + "\n" + '    "HGVWEIGHT": "Weight",\r' + "\n" + '    "HGVHAZMAT": "Hazardous Goods",\r' + "\n" + '    "ADDITIONALSETTINGS": "Additional settings",\r' + "\n" + '    "MAXIMUMSPEED": "Maximum speed",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Wheelchair settings",\r' + "\n" + '    "SURFACE": "Surface",\r' + "\n" + '    "INCLINE": "Incline",\r' + "\n" + '    "CURB": "Curb",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isochrones",\r' + "\n" + '    "ISOCHRONEMETHOD": "Isochrone method",\r' + "\n" + '    "TIMEDISTANCE": "Time",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Interval",\r' + "\n" + '    "KILOMETERS": "Kilometers",\r' + "\n" + '    "UNITS": "Units",\r' + "\n" + '    "MILES": "Miles",\r' + "\n" + '    "LANGUAGE": "Language",\r' + "\n" + '    "CHOOSELANG": "Choose language",\r' + "\n" + '    "LANGROUTING": "Language Routing Instructions",\r' + "\n" + '    "Fastest": "Fastest",\r' + "\n" + '    "Recommended": "Recommended",\r' + "\n" + '    "Shortest": "Shortest",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Safest Route",\r' + "\n" + '    "BICYCLETOUR": "Touring bike",\r' + "\n" + '    "BICYCLEMTB": "Mountain bike",\r' + "\n" + '    "BICYCLERACING": "Road bike",\r' + "\n" + '    "BICYCLEELECTRO": "e-bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Heavy vehicle",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Agricultural",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Forestry",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Delivery",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Goods",\r' + "\n" + '    "PEDESTRIANNORMAL": "Walking",\r' + "\n" + '    "PEDESTRIANHIKING": "Hiking",\r' + "\n" + '    "NOTICE": "Error",\r' + "\n" + '    "CONNECTION": "Please check your internet connection.",\r' + "\n" + '    "ROUTE": "An error occured. No route could be found for your waypoints.",\r' + "\n" + '    "GEOCODE": "No address could be found.",\r' + "\n" + '    "METHODTIME": "Time",\r' + "\n" + '    "METHODDISTANCE": "Distance",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Method",\r' + "\n" + '    "AREA": "Area",\r' + "\n" + '    "RANGE": "Range",\r' + "\n" + '    "REACHFACTOR": "Reach score",\r' + "\n" + '    "REVERSEFLOW": "Reverse direction",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Download Isochrones",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Download Route",\r' + "\n" + '    "FILE_FORMAT": "File Format",\r' + "\n" + '    "SELECT_FILES": "Select files (geojson, gpx or kml)",\r' + "\n" + '    "FILE_NAME": "Filename",\r' + "\n" + '    "PREVIEW": "Preview",\r' + "\n" + '    "IMPORT_TRACK": "Track to route",\r' + "\n" + '    "IMPORT": "Import",\r' + "\n" + '    "IMPORT_ROUTE": "Import your Tracks",\r' + "\n" + '    "Cobblestone": "Cobblestone",\r' + "\n" + '    "Other": "Other",\r' + "\n" + '    "StateRoad": "State road",\r' + "\n" + '    "Road": "Road",\r' + "\n" + '    "Street": "Street",\r' + "\n" + '    "Path": "Path",\r' + "\n" + '    "Track": "Track",\r' + "\n" + '    "Cycleway": "Cycleway",\r' + "\n" + '    "Footway": "Footway",\r' + "\n" + '    "Steps": "Steps",\r' + "\n" + '    "Ferry": "Ferry",\r' + "\n" + '    "Construction": "Construction",\r' + "\n" + '    "Paved": "Paved",\r' + "\n" + '    "Unpaved": "Unpaved",\r' + "\n" + '    "Asphalt": "Asphalt",\r' + "\n" + '    "Concrete": "Concrete",\r' + "\n" + '    "Metal": "Metal",\r' + "\n" + '    "Wood": "Wood",\r' + "\n" + '    "Compacted Gravel": "Compacted Gravel",\r' + "\n" + '    "Fine Gravel": "Fine Gravel",\r' + "\n" + '    "Gravel": "Gravel",\r' + "\n" + '    "Dirt": "Dirt",\r' + "\n" + '    "Ground": "Ground",\r' + "\n" + '    "Ice": "Ice",\r' + "\n" + '    "Salt": "Salt",\r' + "\n" + '    "Sand": "Sand",\r' + "\n" + '    "Woodchips": "Woodchips",\r' + "\n" + '    "Grass": "Grass",\r' + "\n" + '    "Grass Paver": "Grass Paver",\r' + "\n" + '    "DESTINATION": "Directions to here",\r' + "\n" + '    "START": "Directions from here",\r' + "\n" + '    "VIA": "Add as via point",\r' + "\n" + '    "CENTER": "Use as center",\r' + "\n" + '    "WELCOME": "Welcome to Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "To add avoidable areas please use the control in the top right of the map. Otherwise feel free to browse through the plethora of options in the left panel. Also check out our new Isochrones functionality in the left menu panel.",\r' + "\n" + '    "EXTRAS": "Additional information",\r' + "\n" + '    "WHATSHERE": "What is here?",\r' + "\n" + '    "NO_ADDRESS": "No address could be found.",\r' + "\n" + '    "suitability": "Suitability of ways",\r' + "\n" + '    "steepness": "Steepness",\r' + "\n" + '    "waytypes": "Way types",\r' + "\n" + '    "surface": "Surfaces",\r' + "\n" + '    "roadaccessrestrictions": "Road access restrictions",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "from",\r' + "\n" + '    "TO": "to",\r' + "\n" + '    "SHARE_LINK": "Share link",\r' + "\n" + '    "SHORTEN": "Short URL",\r' + "\n" + '    "SHORTEN_HINT": "You can also copy the link from your browser\'s address bar.",\r' + "\n" + '    "GREEN_ROUTING": "Prefer green areas (for Germany only)",\r' + "\n" + '    "QUIET_ROUTING": "Prefer quiet areas (for Germany only)",\r' + "\n" + '    "DONATE": "Donate!",\r' + "\n" + '    "DONATE_TEXT": "Please donate your geographic data to",\r' + "\n" + '    "INFO_I": "Openrouteservice is being developed and provided by Heidelberg Institute for Geoinformation Technology (HeiGIT) and offers Routing services by using user-generated, collaboratively collected free geographic data from OpenStreetMap. Please donate your geographic data to openstreetmap.org!",\r' + "\n" + '    "INFO_II": "We use cookies, system logs and other data storage technologies to (a) preserve information so you will not have to re-enter it during your visit or in subsequent visits; (b) maintain sessions for authenticated users; and (c) monitor aggregate metrics such as total number of visitors and pages viewed. If you disable cookies parts of the main website may not work as intended. We do not collect or store any personal information about you or personally identifiable information about you, except what you voluntarily provide through direct contact. We do not share analytic data with any service providers or partners.",\r' + "\n" + "    \"INFO_II_I\": \"We use different open source libraries for this web application. These can be found within the corresponding package files on <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Please feel free to report bugs on <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> or fix them by yourself and make a pull request.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT. Original data by Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "In case you have any further questions, concerns or feedback, please contact us via:",\r' + "\n" + '    "INFO_V": "Openrouteservice cares about your inquiries, problems, questions etc. As there will always be a stream of inquiries, we take strong responsibility to respond to you in short time. After you have received our automatic response email to let you know we have received your inquiry, we will usually respond shortly. Please give us time to look into your reported issue properly before getting back.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Generate isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Detour factor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentage of route",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "Population",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/en-US.json", "{\r" + "\n" + '    "BICYCLE": "Bicycle",\r' + "\n" + '    "CAR": "Car",\r' + "\n" + '    "HGV": "Heavy Vehicle",\r' + "\n" + '    "PEDESTRIAN": "Pedestrian",\r' + "\n" + '    "WHEELCHAIR": "Wheelchair",\r' + "\n" + '    "DISTANCE": "Distance",\r' + "\n" + '    "DURATION": "Time",\r' + "\n" + '    "SETTINGS": "Settings",\r' + "\n" + '    "DOCUMENTATION": "API Documentation",\r' + "\n" + '    "ROUTING": "Routing",\r' + "\n" + '    "AA": "Isochrones",\r' + "\n" + '    "ADD": "Add Waypoint",\r' + "\n" + '    "RESET": "Reset Route",\r' + "\n" + '    "REVERSE": "Reverse Waypoints",\r' + "\n" + '    "EXPAND": "Expand",\r' + "\n" + '    "UPLOAD": "Upload Tracks",\r' + "\n" + '    "TOGGLESHOW": "Toggle",\r' + "\n" + '    "DOWNLOAD": "Download",\r' + "\n" + '    "REMOVE": "Remove",\r' + "\n" + '    "OPTIONS": "Options",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Isochrone Options",\r' + "\n" + '    "EXPORT": "Export Route",\r' + "\n" + '    "ACTUALDISTANCE": "Actual Distance",\r' + "\n" + '    "ASCENT": "Ascent",\r' + "\n" + '    "DESCENT": "Descent",\r' + "\n" + '    "DETAILS": "Details",\r' + "\n" + '    "CALCULATE": "Calculate",\r' + "\n" + '    "PREFERENCE": "Route preference",\r' + "\n" + '    "WEIGHT": "weight",\r' + "\n" + '    "AVOIDTYPES": "Avoid road types",\r' + "\n" + '    "FERRIES": "Ferries",\r' + "\n" + '    "UNPAVED": "Unpaved Roads",\r' + "\n" + '    "PAVED": "Paved Roads",\r' + "\n" + '    "FORDS": "Fords",\r' + "\n" + '    "STEPS": "Steps",\r' + "\n" + '    "HIGHWAYS": "Highways",\r' + "\n" + '    "TOLLROADS": "Toll roads",\r' + "\n" + '    "TUNNELS": "Tunnels",\r' + "\n" + '    "TRACKS": "Tracks",\r' + "\n" + '    "DIFFICULTY": "Difficulty settings",\r' + "\n" + '    "FITNESS": "Fitness",\r' + "\n" + '    "AVOIDHILLS": "Avoid hills",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Maximum steepness",\r' + "\n" + '    "HGVSETTINGS": "HGV settings",\r' + "\n" + '    "HGVLENGTH": "Length",\r' + "\n" + '    "HGVWIDTH": "Width",\r' + "\n" + '    "HGVHEIGHT": "Height",\r' + "\n" + '    "HGVAXLELOAD": "Axle Load",\r' + "\n" + '    "HGVWEIGHT": "Weight",\r' + "\n" + '    "HGVHAZMAT": "Hazardous Goods",\r' + "\n" + '    "ADDITIONALSETTINGS": "Additional settings",\r' + "\n" + '    "MAXIMUMSPEED": "Maximum speed",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Wheelchair settings",\r' + "\n" + '    "SURFACE": "Surface",\r' + "\n" + '    "INCLINE": "Incline",\r' + "\n" + '    "CURB": "Curb",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isochrones",\r' + "\n" + '    "ISOCHRONEMETHOD": "Isochrone method",\r' + "\n" + '    "TIMEDISTANCE": "Time",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Interval",\r' + "\n" + '    "KILOMETERS": "Kilometers",\r' + "\n" + '    "UNITS": "Units",\r' + "\n" + '    "MILES": "Miles",\r' + "\n" + '    "LANGUAGE": "Language",\r' + "\n" + '    "CHOOSELANG": "Choose language",\r' + "\n" + '    "LANGROUTING": "Language Routing Instructions",\r' + "\n" + '    "Fastest": "Fastest",\r' + "\n" + '    "Recommended": "Recommended",\r' + "\n" + '    "Shortest": "Shortest",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Safest Route",\r' + "\n" + '    "BICYCLETOUR": "Touring bike",\r' + "\n" + '    "BICYCLEMTB": "Mountain bike",\r' + "\n" + '    "BICYCLERACING": "Road bike",\r' + "\n" + '    "BICYCLEELECTRO": "e-bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Heavy vehicle",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Agricultural",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Forestry",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Delivery",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Goods",\r' + "\n" + '    "PEDESTRIANNORMAL": "Walking",\r' + "\n" + '    "PEDESTRIANHIKING": "Hiking",\r' + "\n" + '    "NOTICE": "Error",\r' + "\n" + '    "CONNECTION": "Please check your internet connection.",\r' + "\n" + '    "ROUTE": "An error occured. No route could be found for your waypoints.",\r' + "\n" + '    "GEOCODE": "No address could be found.",\r' + "\n" + '    "METHODTIME": "Time",\r' + "\n" + '    "METHODDISTANCE": "Distance",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Method",\r' + "\n" + '    "AREA": "Area",\r' + "\n" + '    "RANGE": "Range",\r' + "\n" + '    "REACHFACTOR": "Reach score",\r' + "\n" + '    "REVERSEFLOW": "Reverse direction",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Download Isochrones",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Download Route",\r' + "\n" + '    "FILE_FORMAT": "File Format",\r' + "\n" + '    "SELECT_FILES": "Select files (geojson, gpx or kml)",\r' + "\n" + '    "FILE_NAME": "Filename",\r' + "\n" + '    "PREVIEW": "Preview",\r' + "\n" + '    "IMPORT_TRACK": "Track to route",\r' + "\n" + '    "IMPORT": "Import",\r' + "\n" + '    "IMPORT_ROUTE": "Import your Tracks",\r' + "\n" + '    "Cobblestone": "Cobblestone",\r' + "\n" + '    "Other": "Other",\r' + "\n" + '    "StateRoad": "State road",\r' + "\n" + '    "Road": "Road",\r' + "\n" + '    "Street": "Street",\r' + "\n" + '    "Path": "Path",\r' + "\n" + '    "Track": "Track",\r' + "\n" + '    "Cycleway": "Cycleway",\r' + "\n" + '    "Footway": "Footway",\r' + "\n" + '    "Steps": "Steps",\r' + "\n" + '    "Ferry": "Ferry",\r' + "\n" + '    "Construction": "Construction",\r' + "\n" + '    "Paved": "Paved",\r' + "\n" + '    "Unpaved": "Unpaved",\r' + "\n" + '    "Asphalt": "Asphalt",\r' + "\n" + '    "Concrete": "Concrete",\r' + "\n" + '    "Metal": "Metal",\r' + "\n" + '    "Wood": "Wood",\r' + "\n" + '    "Compacted Gravel": "Compacted Gravel",\r' + "\n" + '    "Fine Gravel": "Fine Gravel",\r' + "\n" + '    "Gravel": "Gravel",\r' + "\n" + '    "Dirt": "Dirt",\r' + "\n" + '    "Ground": "Ground",\r' + "\n" + '    "Ice": "Ice",\r' + "\n" + '    "Salt": "Salt",\r' + "\n" + '    "Sand": "Sand",\r' + "\n" + '    "Woodchips": "Woodchips",\r' + "\n" + '    "Grass": "Grass",\r' + "\n" + '    "Grass Paver": "Grass Paver",\r' + "\n" + '    "DESTINATION": "Directions to here",\r' + "\n" + '    "START": "Directions from here",\r' + "\n" + '    "VIA": "Add as via point",\r' + "\n" + '    "CENTER": "Use as center",\r' + "\n" + '    "WELCOME": "Welcome to Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "To add avoidable areas please use the control in the top right of the map. Otherwise feel free to browse through the plethora of options in the left panel. Also check out our new Isochrones functionality in the left menu panel.",\r' + "\n" + '    "EXTRAS": "Additional information",\r' + "\n" + '    "WHATSHERE": "What is here?",\r' + "\n" + '    "NO_ADDRESS": "No address could be found.",\r' + "\n" + '    "suitability": "Suitability of ways",\r' + "\n" + '    "steepness": "Steepness",\r' + "\n" + '    "waytypes": "Way types",\r' + "\n" + '    "surface": "Surfaces",\r' + "\n" + '    "roadaccessrestrictions": "Road access restrictions",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "from",\r' + "\n" + '    "TO": "to",\r' + "\n" + '    "SHARE_LINK": "Share link",\r' + "\n" + '    "SHORTEN": "Short URL",\r' + "\n" + '    "SHORTEN_HINT": "You can also copy the link from your browser\'s address bar.",\r' + "\n" + '    "GREEN_ROUTING": "Prefer green areas (for Germany only)",\r' + "\n" + '    "QUIET_ROUTING": "Prefer quiet areas (for Germany only)",\r' + "\n" + '    "DONATE": "Donate!",\r' + "\n" + '    "DONATE_TEXT": "Please donate your geographic data to",\r' + "\n" + '    "INFO_I": "Openrouteservice is being developed and provided by Heidelberg Institute for Geoinformation Technology (HeiGIT) and offers Routing services by using user-generated, collaboratively collected free geographic data from OpenStreetMap. Please donate your geographic data to openstreetmap.org!",\r' + "\n" + '    "INFO_II": "We use cookies, system logs and other data storage technologies to (a) preserve information so you will not have to re-enter it during your visit or in subsequent visits; (b) maintain sessions for authenticated users; and (c) monitor aggregate metrics such as total number of visitors and pages viewed. If you disable cookies parts of the main website may not work as intended. We do not collect or store any personal information about you or personally identifiable information about you, except what you voluntarily provide through direct contact. We do not share analytic data with any service providers or partners.",\r' + "\n" + "    \"INFO_II_I\": \"We use different open source libraries for this web application. These can be found within the corresponding package files on <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Please feel free to report bugs on <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> or fix them by yourself and make a pull request.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT. Original data by Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "In case you have any further questions, concerns or feedback, please contact us via:",\r' + "\n" + '    "INFO_V": "Openrouteservice cares about your inquiries, problems, questions etc. As there will always be a stream of inquiries, we take strong responsibility to respond to you in short time. After you have received our automatic response email to let you know we have received your inquiry, we will usually respond shortly. Please give us time to look into your reported issue properly before getting back.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Generate isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Detour factor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentage of route",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "Population",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/es-ES.json", "{\r" + "\n" + '    "BICYCLE": "Bicicleta",\r' + "\n" + '    "CAR": "Coche",\r' + "\n" + '    "HGV": "Vehículo pesado",\r' + "\n" + '    "PEDESTRIAN": "Peatón",\r' + "\n" + '    "WHEELCHAIR": "Silla De Ruedas",\r' + "\n" + '    "DISTANCE": "Distancia",\r' + "\n" + '    "DURATION": "Tiempo",\r' + "\n" + '    "SETTINGS": "Configuraciones",\r' + "\n" + '    "DOCUMENTATION": "Documentación",\r' + "\n" + '    "ROUTING": "Trazar ruta",\r' + "\n" + '    "AA": "Accesibilidad de Análisis",\r' + "\n" + '    "ADD": "Añadir un punto a ruta",\r' + "\n" + '    "RESET": "Reiniciar ruta",\r' + "\n" + '    "REVERSE": "Revertir puntos de ruta",\r' + "\n" + '    "EXPAND": "Ampliar",\r' + "\n" + '    "UPLOAD": "Cargar ruta",\r' + "\n" + '    "TOGGLESHOW": "Toggle",\r' + "\n" + '    "DOWNLOAD": "Descargar",\r' + "\n" + '    "REMOVE": "Remover",\r' + "\n" + '    "OPTIONS": "Opciones",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Opciones de Isóchrone",\r' + "\n" + '    "EXPORT": "Exportar ruta",\r' + "\n" + '    "ACTUALDISTANCE": "Distancia efectiva ",\r' + "\n" + '    "ASCENT": "Ascenso",\r' + "\n" + '    "DESCENT": "Descenso",\r' + "\n" + '    "DETAILS": "Detalles",\r' + "\n" + '    "CALCULATE": "Calcular",\r' + "\n" + '    "PREFERENCE": "Opciones de ruta",\r' + "\n" + '    "WEIGHT": "peso",\r' + "\n" + '    "AVOIDTYPES": "Tipos de ruta evitables",\r' + "\n" + '    "FERRIES": "Transbordadores",\r' + "\n" + '    "UNPAVED": "Carreteras sin pavimentar",\r' + "\n" + '    "PAVED": "Carreteras pavimentadas",\r' + "\n" + '    "FORDS": "Vados",\r' + "\n" + '    "STEPS": "Peldaños",\r' + "\n" + '    "HIGHWAYS": "Autopistas",\r' + "\n" + '    "TOLLROADS": "Carreteras de peaje",\r' + "\n" + '    "TUNNELS": "Túneles",\r' + "\n" + '    "TRACKS": "Caminos",\r' + "\n" + '    "DIFFICULTY": "Opciones de dificultad",\r' + "\n" + '    "FITNESS": "Aptitud física",\r' + "\n" + '    "AVOIDHILLS": "Evitar colinas",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Inclinación máxima",\r' + "\n" + '    "HGVSETTINGS": "Opciones de HGV",\r' + "\n" + '    "HGVLENGTH": "Longitud de HGV",\r' + "\n" + '    "HGVWIDTH": "Ancho de HGV",\r' + "\n" + '    "HGVHEIGHT": "Altura de HGV",\r' + "\n" + '    "HGVAXLELOAD": "Carga por eje",\r' + "\n" + '    "HGVWEIGHT": "Peso",\r' + "\n" + '    "HGVHAZMAT": "Material peligroso",\r' + "\n" + '    "ADDITIONALSETTINGS": "Opciones Adicionales",\r' + "\n" + '    "MAXIMUMSPEED": "Velocidad máxima",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Opciones de silla de ruedas",\r' + "\n" + '    "SURFACE": "Superficie",\r' + "\n" + '    "INCLINE": "Inclinación",\r' + "\n" + '    "CURB": "Bordillo",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isócronas",\r' + "\n" + '    "ISOCHRONEMETHOD": "Metódo para calcular Isócronas",\r' + "\n" + '    "TIMEDISTANCE": "Tiempo de distancia",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Intervalo",\r' + "\n" + '    "KILOMETERS": "Kilómetros",\r' + "\n" + '    "UNITS": "Unidades",\r' + "\n" + '    "MILES": "Millas",\r' + "\n" + '    "LANGUAGE": "Idioma",\r' + "\n" + '    "CHOOSELANG": "Elegir idioma",\r' + "\n" + '    "LANGROUTING": "Opciones de idioma de ruta",\r' + "\n" + '    "Fastest": "Más rápido",\r' + "\n" + '    "Recommended": "Recomendado",\r' + "\n" + '    "Shortest": "Más corto",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Ruta más segura",\r' + "\n" + '    "BICYCLETOUR": "Bicicleta para paseo",\r' + "\n" + '    "BICYCLEMTB": "Bicicleta montañera",\r' + "\n" + '    "BICYCLERACING": "Bicicleta de carretera",\r' + "\n" + '    "BICYCLEELECTRO": "e-bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Vehículo pesado",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Autobús",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "HGV de Agrícola",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Forestal",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Entrega de vehículo pesado",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Bienes y servicios",\r' + "\n" + '    "PEDESTRIANNORMAL": "peaton normal",\r' + "\n" + '    "PEDESTRIANHIKING": "peaton de excursion",\r' + "\n" + '    "NOTICE": "Error",\r' + "\n" + '    "CONNECTION": "Por Favor, comprueba la conexión a Internet.",\r' + "\n" + '    "ROUTE": "Se produjo un error. Ninguna ruta se ha encontrado para los puntos seleccionados.",\r' + "\n" + '    "GEOCODE": "No se ha encontrado la dirección buscada.",\r' + "\n" + '    "METHODTIME": "Tiempo",\r' + "\n" + '    "METHODDISTANCE": "Distancia",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Metódo",\r' + "\n" + '    "AREA": "Área",\r' + "\n" + '    "RANGE": "Alcance",\r' + "\n" + '    "REACHFACTOR": "Puntuación de alcance",\r' + "\n" + '    "REVERSEFLOW": "Invertir la dirección",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Descargar Isócronas",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Descargar ruta",\r' + "\n" + '    "FILE_FORMAT": "Formato de archivo",\r' + "\n" + '    "SELECT_FILES": "Seleccionar archivos (geojson, gpx, kml or tcx)",\r' + "\n" + '    "FILE_NAME": "Nombre de archivo",\r' + "\n" + '    "PREVIEW": "Vista previa",\r' + "\n" + '    "IMPORT_TRACK": "Camino para ruta",\r' + "\n" + '    "IMPORT": "Importar",\r' + "\n" + '    "IMPORT_ROUTE": "Importar caminos",\r' + "\n" + '    "Cobblestone": "adoquín",\r' + "\n" + '    "Other": "Otros",\r' + "\n" + '    "StateRoad": "Carreteras nacionales",\r' + "\n" + '    "Road": "Carretera",\r' + "\n" + '    "Street": "Calle",\r' + "\n" + '    "Path": "Sendero",\r' + "\n" + '    "Track": "Camino",\r' + "\n" + '    "Cycleway": "Ciclovía",\r' + "\n" + '    "Footway": "Senda",\r' + "\n" + '    "Steps": "Peldaños",\r' + "\n" + '    "Ferry": "Transbordador",\r' + "\n" + '    "Construction": "Construcción",\r' + "\n" + '    "Paved": "Pavimentado",\r' + "\n" + '    "Unpaved": "Sin pavimentar",\r' + "\n" + '    "Asphalt": "Asfalto",\r' + "\n" + '    "Concrete": "Hormingón",\r' + "\n" + '    "Metal": "Metal",\r' + "\n" + '    "Wood": "Madera",\r' + "\n" + '    "Compacted Gravel": "Grava compactada",\r' + "\n" + '    "Fine Gravel": "Grava fina",\r' + "\n" + '    "Gravel": "Grava",\r' + "\n" + '    "Dirt": "Tierra",\r' + "\n" + '    "Ground": "Suelo",\r' + "\n" + '    "Ice": "Helado",\r' + "\n" + '    "Salt": "Sal",\r' + "\n" + '    "Sand": "Arena",\r' + "\n" + '    "Woodchips": "Astillas",\r' + "\n" + '    "Grass": "Hierba",\r' + "\n" + '    "Grass Paver": "Pavimentadora de hierba",\r' + "\n" + '    "DESTINATION": "Ruta hasta aquì",\r' + "\n" + '    "START": "ruta desde aquì",\r' + "\n" + '    "VIA": "añadir una destinación intermedia",\r' + "\n" + '    "CENTER": "utilizar como centro",\r' + "\n" + '    "WELCOME": "Bienvenidos a Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "Para añadir � reas evitables, por favour utilize el botón de control en la parte superior derecha del mapa. Tambien pueda explorar las opciónes en el tablero del lado izquierdo. Adem� s hay la posibilidad de ver las funciones de Isochrones en el cuadro de menu de control a lado izquierdo",\r' + "\n" + '    "EXTRAS": "Información suplementaria",\r' + "\n" + '    "WHATSHERE": "¿Qué est�  situado aquì?",\r' + "\n" + '    "NO_ADDRESS": "No se ha encontrado la dirección buscada",\r' + "\n" + '    "suitability": "Aplicabilidad del camino",\r' + "\n" + '    "steepness": "Inclinación",\r' + "\n" + '    "waytypes": "Tipos de camino",\r' + "\n" + '    "surface": "Superficie",\r' + "\n" + '    "roadaccessrestrictions": "Camino restricción",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "desde",\r' + "\n" + '    "TO": "a",\r' + "\n" + '    "SHARE_LINK": "compartir enlace",\r' + "\n" + '    "SHORTEN": "Acortar URL",\r' + "\n" + '    "SHORTEN_HINT": "Usted puede copiar el enlace desde su navegador Internet",\r' + "\n" + '    "GREEN_ROUTING": "Prefirir zona verde (for Germany only)",\r' + "\n" + '    "DONATE": "Donate!",\r' + "\n" + '    "DONATE_TEXT": "Please donate your geographic data to",\r' + "\n" + '    "INFO_I": "Openrouteservice as offers Routing services by using user-generated, collaboratively collected free geographic data from OpenStreetMap. Please donate your geographic data to openstreetmap.org!",\r' + "\n" + '    "INFO_II": "We use cookies, system logs and other data storage technologies to (a) preserve information so you will not have to re-enter it during your visit or in subsequent visits; (b) maintain sessions for authenticated users; and (c) monitor aggregate metrics such as total number of visitors and pages viewed. If you disable cookies parts of the main website may not work as intended. We do not collect or store any personal information about you or personally identifiable information about you, except what you voluntarily provide through direct contact. We do not share analytic data with any service providers or partners.",\r' + "\n" + "    \"INFO_II_I\": \"Usamos diferentes bibliotecas de código abierto para aplicaciones web. Estos se pueden encontrar en los archivos de paquetes correspondientes en <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Por favor, siéntase libre de reportar errores en <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> o arreglarlos usted mismo y hacer una solicitud de extracción.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT. Original data by Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "In case you have any further questions, concerns or feedback, please contact us via:",\r' + "\n" + '    "INFO_V": "Openrouteservice cares about your inquiries, problems, questions etc. As there will always be a stream of inquiries, we take strong responsibility to respond to you in short time. After you have received our automatic response email to let you know we have received your inquiry, we will usually respond shortly. Please give us time to look into your reported issue properly before getting back.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Generate isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Detour factor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentage of route",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "Popolazione",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/fr-FR.json", "{\r" + "\n" + '    "BICYCLE": "Vélo",\r' + "\n" + '    "CAR": "Voiture",\r' + "\n" + '    "HGV": "Poids lourd",\r' + "\n" + '    "PEDESTRIAN": "Piéton",\r' + "\n" + '    "WHEELCHAIR": "Chaise roulante",\r' + "\n" + '    "DISTANCE": "Distance",\r' + "\n" + '    "DURATION": "Temps",\r' + "\n" + '    "SETTINGS": "Réglages",\r' + "\n" + '    "DOCUMENTATION": "Documentation de l\'API",\r' + "\n" + '    "ROUTING": "Itinéraire",\r' + "\n" + '    "AA": "Isochrones",\r' + "\n" + '    "ADD": "Ajouter un point de passage",\r' + "\n" + '    "RESET": "Réinitialiser l\'itinéraire",\r' + "\n" + '    "REVERSE": "Inverser les points de passage",\r' + "\n" + '    "EXPAND": "Agrandir",\r' + "\n" + '    "UPLOAD": "Téléverser les traces",\r' + "\n" + '    "TOGGLESHOW": "Basculer l\'affichage",\r' + "\n" + '    "DOWNLOAD": "Télécharger",\r' + "\n" + '    "REMOVE": "Supprimer",\r' + "\n" + '    "OPTIONS": "Options",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Options isochrones",\r' + "\n" + '    "EXPORT": "Exporter la route",\r' + "\n" + '    "ACTUALDISTANCE": "Actual Distance",\r' + "\n" + '    "ASCENT": "Dénivelé positif",\r' + "\n" + '    "DESCENT": "Dénivelé négatif",\r' + "\n" + '    "DETAILS": "Détails",\r' + "\n" + '    "CALCULATE": "Calculer",\r' + "\n" + '    "PREFERENCE": "Préférence d\'itinéraire",\r' + "\n" + '    "WEIGHT": "weight",\r' + "\n" + '    "AVOIDTYPES": "Types de route �  éviter",\r' + "\n" + '    "FERRIES": "Ferrys",\r' + "\n" + '    "UNPAVED": "Routes non pavées",\r' + "\n" + '    "PAVED": "Routes pavées",\r' + "\n" + '    "FORDS": "Gués",\r' + "\n" + '    "STEPS": "Escaliers",\r' + "\n" + '    "HIGHWAYS": "Autoroutes",\r' + "\n" + '    "TOLLROADS": "Sections �  péage",\r' + "\n" + '    "TUNNELS": "Tunnels",\r' + "\n" + '    "TRACKS": "Pistes",\r' + "\n" + '    "DIFFICULTY": "Réglages de difficulté",\r' + "\n" + '    "FITNESS": "Fitness",\r' + "\n" + '    "AVOIDHILLS": "Éviter les côtes",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Dénivelé maximum",\r' + "\n" + '    "HGVSETTINGS": "Paramètres poids lourds",\r' + "\n" + '    "HGVLENGTH": "Longueur",\r' + "\n" + '    "HGVWIDTH": "Largeur",\r' + "\n" + '    "HGVHEIGHT": "Hauteur",\r' + "\n" + '    "HGVAXLELOAD": "Charge �  l\'essieu",\r' + "\n" + '    "HGVWEIGHT": "Poids",\r' + "\n" + '    "HGVHAZMAT": "Matière dangereuse",\r' + "\n" + '    "ADDITIONALSETTINGS": "Paramètres supplémentaires",\r' + "\n" + '    "MAXIMUMSPEED": "Vitesse maximale",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Réglages fauteuils roulants",\r' + "\n" + '    "SURFACE": "Surface",\r' + "\n" + '    "INCLINE": "Inclinaison",\r' + "\n" + '    "CURB": "Trottoir",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isochrones",\r' + "\n" + '    "ISOCHRONEMETHOD": "Méthode isochrone",\r' + "\n" + '    "TIMEDISTANCE": "Temps",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Intervalle",\r' + "\n" + '    "KILOMETERS": "Kilomètres",\r' + "\n" + '    "UNITS": "Unités",\r' + "\n" + '    "MILES": "Miles",\r' + "\n" + '    "LANGUAGE": "Langue",\r' + "\n" + '    "CHOOSELANG": "Choix de la langue",\r' + "\n" + '    "LANGROUTING": "Langue des instructions de guidage",\r' + "\n" + '    "Fastest": "Le plus rapide",\r' + "\n" + '    "Recommended": "Recommandé",\r' + "\n" + '    "Shortest": "Le plus court",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Route la plus sûre",\r' + "\n" + '    "BICYCLETOUR": "Vélo de randonnée",\r' + "\n" + '    "BICYCLEMTB": "VTT",\r' + "\n" + '    "BICYCLERACING": "Vélo de route",\r' + "\n" + '    "BICYCLEELECTRO": "Vélo électrique",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Poids lourd",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Engin agricole",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Engin forestier",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Véhicule de livraison",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Poids lourd",\r' + "\n" + '    "PEDESTRIANNORMAL": "Marche",\r' + "\n" + '    "PEDESTRIANHIKING": "Randonnée",\r' + "\n" + '    "NOTICE": "Erreur",\r' + "\n" + '    "CONNECTION": "Vérifiez votre connexion Internet.",\r' + "\n" + '    "ROUTE": "Une erreur est survenue. Aucun itinéraire n\'a pu être trouvé pour vos points de passage.",\r' + "\n" + '    "GEOCODE": "Aucune adresse n\'a pu être trouvée.",\r' + "\n" + '    "METHODTIME": "Temps",\r' + "\n" + '    "METHODDISTANCE": "Distance",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Méthode",\r' + "\n" + '    "AREA": "Zone",\r' + "\n" + '    "RANGE": "Plage",\r' + "\n" + '    "REACHFACTOR": "Reach score",\r' + "\n" + '    "REVERSEFLOW": "Inverser la direction",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Télécharger les tracés isochrones",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Télécharger l\'itinéraire",\r' + "\n" + '    "FILE_FORMAT": "Format de fichier",\r' + "\n" + '    "SELECT_FILES": "Sélectionner les fichiers (geojson, gpx ou kml)",\r' + "\n" + '    "FILE_NAME": "Nom du fichier",\r' + "\n" + '    "PREVIEW": "Aperçu",\r' + "\n" + '    "IMPORT_TRACK": "Trace vers itinéraire",\r' + "\n" + '    "IMPORT": "Importer",\r' + "\n" + '    "IMPORT_ROUTE": "Importer vos traces",\r' + "\n" + '    "Cobblestone": "Pavés",\r' + "\n" + '    "Other": "Autre",\r' + "\n" + '    "StateRoad": "Route nationale",\r' + "\n" + '    "Road": "Route",\r' + "\n" + '    "Street": "Rue",\r' + "\n" + '    "Path": "Chemin",\r' + "\n" + '    "Track": "Piste",\r' + "\n" + '    "Cycleway": "Piste cyclable",\r' + "\n" + '    "Footway": "Trottoir",\r' + "\n" + '    "Steps": "Marches",\r' + "\n" + '    "Ferry": "Ferry",\r' + "\n" + '    "Construction": "Construction",\r' + "\n" + '    "Paved": "Pavé",\r' + "\n" + '    "Unpaved": "Non pavé",\r' + "\n" + '    "Asphalt": "Asphalte",\r' + "\n" + '    "Concrete": "Béton",\r' + "\n" + '    "Metal": "Métal",\r' + "\n" + '    "Wood": "Bois",\r' + "\n" + '    "Compacted Gravel": "Gravier stabilisé",\r' + "\n" + '    "Fine Gravel": "Gravier fin",\r' + "\n" + '    "Gravel": "Gravier",\r' + "\n" + '    "Dirt": "Terre",\r' + "\n" + '    "Ground": "Sol",\r' + "\n" + '    "Ice": "Glace",\r' + "\n" + '    "Salt": "Sel",\r' + "\n" + '    "Sand": "Sable",\r' + "\n" + '    "Woodchips": "Copeaux de bois",\r' + "\n" + '    "Grass": "Herbe",\r' + "\n" + '    "Grass Paver": "Herbe pavée",\r' + "\n" + '    "DESTINATION": "Itinéraire vers ce point",\r' + "\n" + '    "START": "Itinéraire depuis ce point",\r' + "\n" + '    "VIA": "Ajouter un point de passage",\r' + "\n" + '    "CENTER": "Utiliser comme centre",\r' + "\n" + '    "WELCOME": "Bienvenue sur Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "Pour ajouter des zones �  éviter, utilisez le bouton en haut �  droite de la carte. Sinon, n\'hésitez pas �  parcourir les nombreuses options du panneau de gauche. Allez également découvrir les nouvelles fonctionnalités isochrones dans le menu du panneau de gauche.",\r' + "\n" + '    "EXTRAS": "Information supplémentaire",\r' + "\n" + '    "WHATSHERE": "Qu\'y a t\'il ici ?",\r' + "\n" + '    "NO_ADDRESS": "Aucune adresse n\'a pu être trouvée.",\r' + "\n" + '    "suitability": "Adéquation du type de voie",\r' + "\n" + '    "steepness": "Pente",\r' + "\n" + '    "waytypes": "Types de voie",\r' + "\n" + '    "surface": "Surfaces",\r' + "\n" + '    "roadaccessrestrictions": "Rue limitation",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "depuis",\r' + "\n" + '    "TO": "vers",\r' + "\n" + '    "SHARE_LINK": "Partager le lien",\r' + "\n" + '    "SHORTEN": "URL raccourcie",\r' + "\n" + '    "SHORTEN_HINT": "Vous pouvez également copier le lien depuis la barre d\'adresse de votre navigateur.",\r' + "\n" + '    "GREEN_ROUTING": "Préférer les zones vertes (for Germany only)",\r' + "\n" + '    "DONATE": "Donnez !",\r' + "\n" + '    "DONATE_TEXT": "Veuillez apporter vos données géographiques � ",\r' + "\n" + '    "INFO_I": "Openrouteservice propose un service de calcul d\'itinéraire en utilisant des données fournies par les utilisateurs de façon collaborative, collectées de OpenStreetMap. Veuillez apporter s\'il-vous-plaît vos données géographiques �  openstreetmap.org !",\r' + "\n" + '    "INFO_II": "Nous utilisons des cookies, logs systèmes et autres technologies de stockage de données pour (a) conserver les informations qui vous permettra de ne pas les entrer �  nouveau durant votre visite ou les visites ultérieurs; (b) conserver les sessions pour les utilisateurs authentifiés; (c) suivre des métriques agrégées comme le nombre total de visiteurs et de pages vues. Si vous désactivez les cookies, le site peut ne pas fonctionner comme prévu. Nous ne collectons pas ni stockons des informations personnelles vous concernant ou des informations personnellement indentifiables �  propos de vous, �  l\'exception de ce que vous fournissez volontairement par contact direct. Nous ne partageons pas de données analytiques avec des fournisseurs de services ou des partenaires.",\r' + "\n" + "    \"INFO_II_I\": \"Nous utilisons différentes bibliothèques open source pour cette application web. Ceux-ci peuvent être trouvés dans les fichiers du paquet correspondant sur <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"N'hésitez pas �  rapporter des bugs sur <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> ou �  les corriger vous-même et �  faire une demande d'extraction.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Il est interdit aux utilisateurs de toute revente commerciale ou non-libre, ou de toute redistribution sans autorisation écrite explicite de CIAT.. Données originales par Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Données SRTM V4 sans soudure remplies de trous, Centro Internacional de Agricultura Tropical (CIAT)\",\r" + "\n" + '    "INFO_IV": "Dans le cas où vous avez d\'autres questions, problèmes ou remarques, veuillez nous contacter via:",\r' + "\n" + '    "INFO_V": "Openrouteservice s\'occupe de vos demandes de renseignements, problèmes, questions etc. Comme il y aura toujours un flot de demande de rensignements, nous prenons la responsabilité de vous répondre le plus vite possible. Après que vous ayez reçu notre email de réponse automatique pour vous indiquer que nous avons bien reçu votre demande, nous répondrons généralemment rapidement. Veuillez s\'il-vous-plaît nous laisser le temps de regarder votre problème correctement avant de revenir vers vous.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "AJouter �  la carte",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Générer les isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Facteur de détour",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Pourcentage d\'itinéraire",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "Population",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/it-IT.json", "{\r" + "\n" + '    "BICYCLE": "Bicicletta",\r' + "\n" + '    "CAR": "Auto",\r' + "\n" + '    "HGV": "Mezzo Pesante",\r' + "\n" + '    "PEDESTRIAN": "Piedi",\r' + "\n" + '    "WHEELCHAIR": "Sedia a rotelle",\r' + "\n" + '    "DISTANCE": "Distanza",\r' + "\n" + '    "DURATION": "tempo",\r' + "\n" + '    "SETTINGS": "Impostazioni",\r' + "\n" + '    "DOCUMENTATION": "Documentazione API",\r' + "\n" + '    "ROUTING": "Navigazione",\r' + "\n" + '    "AA": "Isocrone",\r' + "\n" + '    "ADD": "Aggiungi Waypoint",\r' + "\n" + '    "RESET": "Annulla rotta",\r' + "\n" + '    "REVERSE": "Inverti i Waypoint",\r' + "\n" + '    "EXPAND": "Espandi",\r' + "\n" + '    "UPLOAD": "Carica Tracciati",\r' + "\n" + '    "TOGGLESHOW": "Toggle",\r' + "\n" + '    "DOWNLOAD": "Scarica",\r' + "\n" + '    "REMOVE": "Rimuovi",\r' + "\n" + '    "OPTIONS": "Opzioni",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Opzioni Isocrone",\r' + "\n" + '    "EXPORT": "Esporta rotta",\r' + "\n" + '    "ACTUALDISTANCE": "Distanza attuale",\r' + "\n" + '    "ASCENT": "Salita",\r' + "\n" + '    "DESCENT": "Discesa",\r' + "\n" + '    "DETAILS": "Detagli",\r' + "\n" + '    "CALCULATE": "Calcolo",\r' + "\n" + '    "PREFERENCE": "Preferenze rotta",\r' + "\n" + '    "WEIGHT": "Peso",\r' + "\n" + '    "AVOIDTYPES": "Evita tipi di strada",\r' + "\n" + '    "FERRIES": "Traghetti",\r' + "\n" + '    "UNPAVED": "Strade non asfaltate",\r' + "\n" + '    "PAVED": "Strade asfaltate",\r' + "\n" + '    "FORDS": "Guadi",\r' + "\n" + '    "STEPS": "Gradini",\r' + "\n" + '    "HIGHWAYS": "Autostrade",\r' + "\n" + '    "TOLLROADS": "Strade a pedaggio",\r' + "\n" + '    "TUNNELS": "Tunnel",\r' + "\n" + '    "TRACKS": "Sentieri",\r' + "\n" + '    "DIFFICULTY": "Impostazione difficolt� ",\r' + "\n" + '    "FITNESS": "Fitness",\r' + "\n" + '    "AVOIDHILLS": "Evita pendenze",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Massima pendenza",\r' + "\n" + '    "HGVSETTINGS": "Impostazioni mezzi pesanti",\r' + "\n" + '    "HGVLENGTH": "Lunghezza",\r' + "\n" + '    "HGVWIDTH": "Larghezza",\r' + "\n" + '    "HGVHEIGHT": "Altezza",\r' + "\n" + '    "HGVAXLELOAD": "Carico Asse",\r' + "\n" + '    "HGVWEIGHT": "Peso",\r' + "\n" + '    "HGVHAZMAT": "Trasporto Pericoloso",\r' + "\n" + '    "ADDITIONALSETTINGS": "Altre impostazioni",\r' + "\n" + '    "MAXIMUMSPEED": "Velocit�  massima",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Impostazioni sedie a rotelle",\r' + "\n" + '    "SURFACE": "Superficie",\r' + "\n" + '    "INCLINE": "Inclinazione",\r' + "\n" + '    "CURB": "Ostacoli a gradino",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isocrone",\r' + "\n" + '    "ISOCHRONEMETHOD": "Metodo iscorone",\r' + "\n" + '    "TIMEDISTANCE": "Tempo",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Intervallo",\r' + "\n" + '    "KILOMETERS": "Kilometri",\r' + "\n" + '    "UNITS": "Unit�  di misura",\r' + "\n" + '    "MILES": "Miglia",\r' + "\n" + '    "LANGUAGE": "Lingua",\r' + "\n" + '    "CHOOSELANG": "Scegli la lingua",\r' + "\n" + '    "LANGROUTING": "Lingua Istruzioni di navigazione",\r' + "\n" + '    "Fastest": "Più veloce",\r' + "\n" + '    "Recommended": "Raccomandata",\r' + "\n" + '    "Shortest": "Più corta",\r' + "\n" + '    "BICYCLENORMAL": "Normale",\r' + "\n" + '    "BICYCLESAFEST": "Percorso più sicuro",\r' + "\n" + '    "BICYCLETOUR": "Touring bike",\r' + "\n" + '    "BICYCLEMTB": "Mountain bike",\r' + "\n" + '    "BICYCLERACING": "Biclichetta urbana",\r' + "\n" + '    "BICYCLEELECTRO": "e-bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Mezzo pesante",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Mezzo Agricolo",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Mezzo Forestale",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Mezzo per le consegne",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Mezzo per il trasporto beni",\r' + "\n" + '    "PEDESTRIANNORMAL": "Camminata",\r' + "\n" + '    "PEDESTRIANHIKING": "Escursione",\r' + "\n" + '    "NOTICE": "Errore",\r' + "\n" + '    "CONNECTION": "Per favore controllare la connessione internet.",\r' + "\n" + '    "ROUTE": "È avvenuto un errore.Nessun percorso trovato per i tuoi waypont.",\r' + "\n" + '    "GEOCODE": "Nessun indirizzo è stato trovato.",\r' + "\n" + '    "METHODTIME": "Tempo",\r' + "\n" + '    "METHODDISTANCE": "Distanza",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Metodo",\r' + "\n" + '    "AREA": "Area",\r' + "\n" + '    "RANGE": "Range",\r' + "\n" + '    "REACHFACTOR": "Reach score",\r' + "\n" + '    "REVERSEFLOW": "Inverti direzione",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Scarica Isocrone",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Scarica Rotta",\r' + "\n" + '    "FILE_FORMAT": "Formato File",\r' + "\n" + '    "SELECT_FILES": "Seleziona file (geojson, gpx o kml)",\r' + "\n" + '    "FILE_NAME": "Nome file",\r' + "\n" + '    "PREVIEW": "Anteprima",\r' + "\n" + '    "IMPORT_TRACK": "Da traccia a percorso",\r' + "\n" + '    "IMPORT": "Importa",\r' + "\n" + '    "IMPORT_ROUTE": "Importa i tuoi Tracciati",\r' + "\n" + '    "Cobblestone": "Ciottolato",\r' + "\n" + '    "Other": "Altro",\r' + "\n" + '    "StateRoad": "Strada statale",\r' + "\n" + '    "Road": "Strada",\r' + "\n" + '    "Street": "Via",\r' + "\n" + '    "Path": "Sentiero",\r' + "\n" + '    "Track": "Tracciato",\r' + "\n" + '    "Cycleway": "Ciclabile",\r' + "\n" + '    "Footway": "Pedonale",\r' + "\n" + '    "Steps": "Gradinata",\r' + "\n" + '    "Ferry": "Traghetto",\r' + "\n" + '    "Construction": "Costruzione",\r' + "\n" + '    "Paved": "Pavimentata",\r' + "\n" + '    "Unpaved": "Sterrata",\r' + "\n" + '    "Asphalt": "Asfaltata",\r' + "\n" + '    "Concrete": "Calcestruzzo",\r' + "\n" + '    "Metal": "Metallo",\r' + "\n" + '    "Wood": "Legno",\r' + "\n" + '    "Compacted Gravel": "Ghiaia Compattata",\r' + "\n" + '    "Fine Gravel": "Ghiaia Fine",\r' + "\n" + '    "Gravel": "Ghiaia",\r' + "\n" + '    "Dirt": "Sterrata",\r' + "\n" + '    "Ground": "Terra",\r' + "\n" + '    "Ice": "Ghiaccio",\r' + "\n" + '    "Salt": "Sale",\r' + "\n" + '    "Sand": "Sabbia",\r' + "\n" + '    "Woodchips": "Trucioli di legno",\r' + "\n" + '    "Grass": "Grass",\r' + "\n" + '    "Grass Paver": "Grigliato Erboso",\r' + "\n" + '    "DESTINATION": "Destinazione",\r' + "\n" + '    "START": "Partenza",\r' + "\n" + '    "VIA": "Aggiungi come punto di passaggio",\r' + "\n" + '    "CENTER": "Usa come centro",\r' + "\n" + '    "WELCOME": "Benvenuto in Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "Per aggiungere un\'area da evitare usare il comando in alto a destra della mappa. Altrimenti sentiti libero di navigare nella pletora di opzioni nel pannello a sinistra. Inoltre controlla le nuove funzionalit�  isocrone nel menù a pannello sulla sinistra.",\r' + "\n" + '    "EXTRAS": "Informazioni aggiuntive",\r' + "\n" + '    "WHATSHERE": "Cosa c\'è qui?",\r' + "\n" + '    "NO_ADDRESS": "Nessun indirizzo trovato.",\r' + "\n" + '    "suitability": "Idoneit�  delle strade",\r' + "\n" + '    "steepness": "Ripidezza",\r' + "\n" + '    "waytypes": "Tipi di strade",\r' + "\n" + '    "surface": "Superfici",\r' + "\n" + '    "roadaccessrestrictions": "Via limitazione",\r' + "\n" + '    "green": "Indice di verde (solo in Germania)",\r' + "\n" + '    "tollways": "Strade a pedaggio",\r' + "\n" + '    "FROM": "da",\r' + "\n" + '    "TO": "a",\r' + "\n" + '    "SHARE_LINK": "Condividi link",\r' + "\n" + '    "SHORTEN": "URL breve",\r' + "\n" + '    "SHORTEN_HINT": "Puoi copiare il link anche alla barra degli indirizzi del tuo browser.",\r' + "\n" + '    "GREEN_ROUTING": "Preferire aree verdi (solo in Germania)",\r' + "\n" + '    "QUIET_ROUTING": "Preferire aree silenziose (solo in Germania)",\r' + "\n" + '    "DONATE": "Dona!",\r' + "\n" + '    "DONATE_TEXT": "Per favore dona i tuoi dati geografici a",\r' + "\n" + '    "INFO_I": "Openrouteservice è sviluppato e fornito dal Heidelberg Institute for Geoinformation Technology (HeiGIT) e offre servizi di Navigazione usando dati geografici liberi, generati dagli utenti e collettivamente raccolti su OpenStreetMap. Per favore dona i tuoi dati geografici ad openstreetmap.org!",\r' + "\n" + '    "INFO_II": "Noi usiamo i cookies, i log di sistema a altre tecnologie di conservazione dei dati per (a) preservare informazioni così che tu non debba reniserirle urante la tua visita o per visite successice; (b) mantenere le sessioni degli utenti autenticati; e (c) monitorare i dati aggregati come il numero totale di visitatori e le pagine visualizzate. Se disattivi i cookies parti del sito web principale di Openrouteservice potrebbero non funzionare correttamente. non collezioniamo o conserviamo nessuna informazione personale su di te o informazioni personali a te riconducibili, eccetto quelle che tu volontariamente fornisci tramite contatto diretto. Non condividiamo dati analitici a nessuno provider di servizi o partner.",\r' + "\n" + "    \"INFO_II_I\": \"Utilizziamo diverse librerie open source per questa applicazione web. Questi possono essere trovati all'interno dei file di pacchetto corrispondenti su <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Non esitate a segnalare bug su <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> o correggerli da soli ed effettuare una richiesta di pull.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Agli utenti è vietata qualsiasi rivendita o ridistribuzione commerciale non libera senza esplicita autorizzazione scritta di CIAT. Dati originali di Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Dati SRTM V4 senza fori pieni di fori, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "Se hai qualsiasi ulteriore dubbio, preoccupazione o consiglio, per favore contattaci tramit:",\r' + "\n" + '    "INFO_V": "Openrouteservice è interessato ai tuoi dubbi, problemi domande ecc. In quanto ci sar�  sempre un flusso di dubbi noi prendiamo molto seriamente la responsabilit�  di rispondere nel più breve tempo possibile. Dopo aver ricevuto una risposta email automatica per farvi sapere che abbiamo ricevuto la vostra richiesta, solitamente rispondiamo dopo breve tempo. Per piacere dateci il tempo di controllare la vostra segnalazione in maniera apropriata prima di ricontattarvi.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Aggiungi alla mappa",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Genera isocrone",\r' + "\n" + '    "DETOUR_FACTOR": "Fattore di deviazione",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentuale della rotta",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Impostazioni mappa",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomizza il colore delle isocrone",\r' + "\n" + '    "DRAGTOADD": "Trascina per aggiungere un punto del percorso. Clicca per le info del punto",\r' + "\n" + '    "noise": "Indice di rumore (solo in Germania)",\r' + "\n" + '    "height": "Altezza",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Segnali di distanza (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Strade senza pedaggio",\r' + "\n" + '    "LOCALE_TOLLWAY": "Strade a pedaggio",\r' + "\n" + '    "avgspeed": "Velocit�  media",\r' + "\n" + '    "traildifficulty": "Difficolt�  pista",\r' + "\n" + '    "EXTRA_INFORMATION": "Informazioni aggiuntive",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Aggiungi ulteriori informazioni aggiuntive nelle impostazioni",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Incomincia il tuo viaggio API adesso",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "Se sei soddisfatto delle funzionalit�  di Openrouteservice per piacere iscriviti per le API al <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Evita Confini",\r' + "\n" + '    "CONTROLLEDBORDERS": "Confini controllati",\r' + "\n" + '    "BORDERS": "Tutti i confini",\r' + "\n" + '    "COUNTRYBORDERS": "Confini Nazionali",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Cerca gli stati da evitare",\r' + "\n" + '    "TOTALPOP": "Popolazione",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/pl-PL.json", "{\r" + "\n" + '    "BICYCLE": "Rower",\r' + "\n" + '    "CAR": "Auto",\r' + "\n" + '    "HGV": "Ciężki pojazd",\r' + "\n" + '    "PEDESTRIAN": "Pieszy",\r' + "\n" + '    "WHEELCHAIR": "Na wózku",\r' + "\n" + '    "DISTANCE": "Dystans",\r' + "\n" + '    "DURATION": "Czas",\r' + "\n" + '    "SETTINGS": "Ustawienia",\r' + "\n" + '    "DOCUMENTATION": "Dokumentacja API",\r' + "\n" + '    "ROUTING": "Planowanie",\r' + "\n" + '    "AA": "Izochrony",\r' + "\n" + '    "ADD": "Dodaj punkt",\r' + "\n" + '    "RESET": "Resetuj trasę",\r' + "\n" + '    "REVERSE": "Odwróć kolejność",\r' + "\n" + '    "EXPAND": "Rozwiń",\r' + "\n" + '    "UPLOAD": "Wgraj ślad",\r' + "\n" + '    "TOGGLESHOW": "Przełącz",\r' + "\n" + '    "DOWNLOAD": "Pobierz",\r' + "\n" + '    "REMOVE": "Usuń",\r' + "\n" + '    "OPTIONS": "Opcje",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Opcje izochron",\r' + "\n" + '    "EXPORT": "Eksportuj trasę",\r' + "\n" + '    "ACTUALDISTANCE": "Aktualny dystans",\r' + "\n" + '    "ASCENT": "Podejście",\r' + "\n" + '    "DESCENT": "Zejście",\r' + "\n" + '    "DETAILS": "Szczegóły",\r' + "\n" + '    "CALCULATE": "Przelicz",\r' + "\n" + '    "PREFERENCE": "Preferencje trasy",\r' + "\n" + '    "WEIGHT": "Waga",\r' + "\n" + '    "AVOIDTYPES": "Unikaj typów dróg",\r' + "\n" + '    "FERRIES": "Promy",\r' + "\n" + '    "UNPAVED": "Szutry",\r' + "\n" + '    "PAVED": "Asfalty",\r' + "\n" + '    "FORDS": "Brody",\r' + "\n" + '    "STEPS": "Schody",\r' + "\n" + '    "HIGHWAYS": "Autostrady",\r' + "\n" + '    "TOLLROADS": "Płatne drogi",\r' + "\n" + '    "TUNNELS": "Tunele",\r' + "\n" + '    "TRACKS": "Ślady",\r' + "\n" + '    "DIFFICULTY": "Ustawienia trudności",\r' + "\n" + '    "FITNESS": "Sprawność",\r' + "\n" + '    "AVOIDHILLS": "Unikaj wzniesień",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Maksymalne nachylenie",\r' + "\n" + '    "HGVSETTINGS": "Ustawienia HGV",\r' + "\n" + '    "HGVLENGTH": "Długość",\r' + "\n" + '    "HGVWIDTH": "Szerokość",\r' + "\n" + '    "HGVHEIGHT": "Wysokość",\r' + "\n" + '    "HGVAXLELOAD": "Nacisk na oś",\r' + "\n" + '    "HGVWEIGHT": "Waga",\r' + "\n" + '    "HGVHAZMAT": "Niebezpiecznego materiału",\r' + "\n" + '    "ADDITIONALSETTINGS": "Dodatkowe ustawienia",\r' + "\n" + '    "MAXIMUMSPEED": "Maksymalna prędkość",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Ustawienia dla wózków",\r' + "\n" + '    "SURFACE": "Nawierzchnia",\r' + "\n" + '    "INCLINE": "Nachylenie",\r' + "\n" + '    "CURB": "Garb",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Izochrony",\r' + "\n" + '    "ISOCHRONEMETHOD": "Metoda izochron",\r' + "\n" + '    "TIMEDISTANCE": "Czas",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Interwał",\r' + "\n" + '    "KILOMETERS": "Kilometery",\r' + "\n" + '    "UNITS": "Jednostki",\r' + "\n" + '    "MILES": "Mile",\r' + "\n" + '    "LANGUAGE": "Język",\r' + "\n" + '    "CHOOSELANG": "Wybierz język",\r' + "\n" + '    "LANGROUTING": "Instrucje językowe nawigcji",\r' + "\n" + '    "Fastest": "Najszybsza",\r' + "\n" + '    "Recommended": "Rekomendowana",\r' + "\n" + '    "Shortest": "Najkrótsza",\r' + "\n" + '    "BICYCLENORMAL": "Normalna",\r' + "\n" + '    "BICYCLESAFEST": "Najbezpieczniejsza",\r' + "\n" + '    "BICYCLETOUR": "Rower turystyczny",\r' + "\n" + '    "BICYCLEMTB": "Rower górski",\r' + "\n" + '    "BICYCLERACING": "Rower szosowy",\r' + "\n" + '    "BICYCLEELECTRO": "E-rower",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Ciężki pojazd",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Bus",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Pojazd rolniczy",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Pojazd leśny",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Dostawczy",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Ciężarowy",\r' + "\n" + '    "PEDESTRIANNORMAL": "Spacer",\r' + "\n" + '    "PEDESTRIANHIKING": "Hiking",\r' + "\n" + '    "NOTICE": "Błąd",\r' + "\n" + '    "CONNECTION": "Proszę sprawdzić połączenie internetowe.",\r' + "\n" + '    "ROUTE": "Wystapił błąd. Nie udało się wyznaczyć trasy dla podanych punktów.",\r' + "\n" + '    "GEOCODE": "Żaden adres nie został znaleziony.",\r' + "\n" + '    "METHODTIME": "Czas",\r' + "\n" + '    "METHODDISTANCE": "Dystans",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Metoda",\r' + "\n" + '    "AREA": "Obszar",\r' + "\n" + '    "RANGE": "Zasięg",\r' + "\n" + '    "REACHFACTOR": "Współczynnik celu",\r' + "\n" + '    "REVERSEFLOW": "Odwróć kierunek",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Pobierz izochrony",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Pobierz trasę",\r' + "\n" + '    "FILE_FORMAT": "Format pliku",\r' + "\n" + '    "SELECT_FILES": "Wybierz pliki (geojson, gpx lub kml)",\r' + "\n" + '    "FILE_NAME": "Nazwa pliku",\r' + "\n" + '    "PREVIEW": "Podgląd",\r' + "\n" + '    "IMPORT_TRACK": "Ślad do trasy",\r' + "\n" + '    "IMPORT": "Importuj",\r' + "\n" + '    "IMPORT_ROUTE": "Importuj swoje ślady",\r' + "\n" + '    "Cobblestone": "Bruk",\r' + "\n" + '    "Other": "Inne",\r' + "\n" + '    "StateRoad": "Droga stanowa",\r' + "\n" + '    "Road": "Droga",\r' + "\n" + '    "Street": "Ulica",\r' + "\n" + '    "Path": "Ścieżka",\r' + "\n" + '    "Track": "Ślad",\r' + "\n" + '    "Cycleway": "Ścieżka rowerowa",\r' + "\n" + '    "Footway": "Ścieżka spacerowa",\r' + "\n" + '    "Steps": "Stopnie",\r' + "\n" + '    "Ferry": "Prom",\r' + "\n" + '    "Construction": "Budowa",\r' + "\n" + '    "Paved": "Utwardzona",\r' + "\n" + '    "Unpaved": "Nieutwardzona",\r' + "\n" + '    "Asphalt": "Asfalt",\r' + "\n" + '    "Concrete": "Beton",\r' + "\n" + '    "Metal": "Metal",\r' + "\n" + '    "Wood": "Drewno",\r' + "\n" + '    "Compacted Gravel": "Zbity szutr",\r' + "\n" + '    "Fine Gravel": "Dobry szutr",\r' + "\n" + '    "Gravel": "Szutr",\r' + "\n" + '    "Dirt": "Polna",\r' + "\n" + '    "Ground": "Gruntowa",\r' + "\n" + '    "Ice": "Lód",\r' + "\n" + '    "Salt": "Sól",\r' + "\n" + '    "Sand": "Piasek",\r' + "\n" + '    "Woodchips": "Trociny",\r' + "\n" + '    "Grass": "Trawa",\r' + "\n" + '    "Grass Paver": "Kratka trawnikowa",\r' + "\n" + '    "DESTINATION": "Trasa do tego miejsca",\r' + "\n" + '    "START": "Trasa z tego miejsca",\r' + "\n" + '    "VIA": "Dodaj jako punkt pośredni",\r' + "\n" + '    "CENTER": "Użyj jako środek",\r' + "\n" + '    "WELCOME": "Witaj w planerze!",\r' + "\n" + '    "WELCOME_MESSAGE": "W celu dodanie obszarów wyłączonych z nawigacji proszę użyj opcji w prawym górnym roku mapy. W każdym innym przypadku ciesz się opcjami w lewym panelu. Wypróbuj również nowe opcje izochron na lewej krawędzi panelu.",\r' + "\n" + '    "EXTRAS": "Dodatkowe informacje",\r' + "\n" + '    "WHATSHERE": "Co tu jest?",\r' + "\n" + '    "NO_ADDRESS": "Adres nie został znaleziony.",\r' + "\n" + '    "suitability": "Utrzymanie dróg",\r' + "\n" + '    "steepness": "Nachylenie",\r' + "\n" + '    "waytypes": "Typy dróg",\r' + "\n" + '    "surface": "Nawierzchnie",\r' + "\n" + '    "roadaccessrestrictions": "Ograniczenie ulica",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "od",\r' + "\n" + '    "TO": "do",\r' + "\n" + '    "SHARE_LINK": "Udostępnij",\r' + "\n" + '    "SHORTEN": "Krótki URL",\r' + "\n" + '    "SHORTEN_HINT": "Możesz też skopiować odnośnik z paska adresu przeglądarki.",\r' + "\n" + '    "GREEN_ROUTING": "Prefer green areas (for Germany only)",\r' + "\n" + '    "DONATE": "Donate!",\r' + "\n" + '    "DONATE_TEXT": "Please donate your geographic data to",\r' + "\n" + '    "INFO_I": "Openrouteservice as offers Routing services by using user-generated, collaboratively collected free geographic data from OpenStreetMap. Please donate your geographic data to openstreetmap.org!",\r' + "\n" + '    "INFO_II": "We use cookies, system logs and other data storage technologies to (a) preserve information so you will not have to re-enter it during your visit or in subsequent visits; (b) maintain sessions for authenticated users; and (c) monitor aggregate metrics such as total number of visitors and pages viewed. If you disable cookies parts of the main website may not work as intended. We do not collect or store any personal information about you or personally identifiable information about you, except what you voluntarily provide through direct contact. We do not share analytic data with any service providers or partners.",\r' + "\n" + "    \"INFO_II_I\": \"We use different open source libraries for web application. These can be found within the corresponding package files on <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Please feel free to report bugs on <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> or fix them by yourself and make a pull request.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT. Original data by Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "In case you have any further questions, concerns or feedback, please contact us via:",\r' + "\n" + '    "INFO_V": "Openrouteservice cares about your inquiries, problems, questions etc. As there will always be a stream of inquiries, we take strong responsibility to respond to you in short time. After you have received our automatic response email to let you know we have received your inquiry, we will usually respond shortly. Please give us time to look into your reported issue properly before getting back.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Generate isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Detour factor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentage of route",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "Populacja",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/pt-PT.json", "{\r" + "\n" + '    "BICYCLE": "Bicicleta",\r' + "\n" + '    "CAR": "Carro",\r' + "\n" + '    "HGV": "Veículo pesado",\r' + "\n" + '    "PEDESTRIAN": "Peão",\r' + "\n" + '    "WHEELCHAIR": "Cadeira-de-Rodas",\r' + "\n" + '    "DISTANCE": "Distância",\r' + "\n" + '    "DURATION": "Tempo",\r' + "\n" + '    "SETTINGS": "Definições",\r' + "\n" + '    "DOCUMENTATION": "Documentação",\r' + "\n" + '    "ROUTING": "Traçar rota",\r' + "\n" + '    "AA": "Análise de Acessibilidade",\r' + "\n" + '    "ADD": "Adicionar ponto �  rota",\r' + "\n" + '    "RESET": "Reestabelecer rota",\r' + "\n" + '    "REVERSE": "Inverter pontos da rota",\r' + "\n" + '    "EXPAND": "Expandir",\r' + "\n" + '    "UPLOAD": "Importar rota",\r' + "\n" + '    "TOGGLESHOW": "Alternar",\r' + "\n" + '    "DOWNLOAD": "Transferir",\r' + "\n" + '    "REMOVE": "Remover",\r' + "\n" + '    "OPTIONS": "Definições",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Definições de Isocronas",\r' + "\n" + '    "EXPORT": "Exportar rota",\r' + "\n" + '    "ACTUALDISTANCE": "Distância actual",\r' + "\n" + '    "ASCENT": "Subida",\r' + "\n" + '    "DESCENT": "Descida",\r' + "\n" + '    "DETAILS": "Detalhes",\r' + "\n" + '    "CALCULATE": "Calcular",\r' + "\n" + '    "PREFERENCE": "Definições de rota",\r' + "\n" + '    "WEIGHT": "peso",\r' + "\n" + '    "AVOIDTYPES": "Tipos de estrada a evitar",\r' + "\n" + '    "FERRIES": "Ferryboats ",\r' + "\n" + '    "UNPAVED": "Estradas não pavimentadas",\r' + "\n" + '    "PAVED": "Estradas pavimentadas",\r' + "\n" + '    "FORDS": "Vaus",\r' + "\n" + '    "STEPS": "Degraus",\r' + "\n" + '    "HIGHWAYS": "Auto-estradas",\r' + "\n" + '    "TOLLROADS": "Estradas com portagem",\r' + "\n" + '    "TUNNELS": "Túneis",\r' + "\n" + '    "TRACKS": "Trilhos",\r' + "\n" + '    "DIFFICULTY": "Definições de dificuldade",\r' + "\n" + '    "FITNESS": "Aptidão física",\r' + "\n" + '    "AVOIDHILLS": "Evitar colinas",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Inclinação máxima",\r' + "\n" + '    "HGVSETTINGS": "Definições de HGV",\r' + "\n" + '    "HGVLENGTH": "Comprimento",\r' + "\n" + '    "HGVWIDTH": "Largura",\r' + "\n" + '    "HGVHEIGHT": "Altura",\r' + "\n" + '    "HGVAXLELOAD": "Carga por eixo",\r' + "\n" + '    "HGVWEIGHT": "Peso",\r' + "\n" + '    "HGVHAZMAT": "Material perigoso",\r' + "\n" + '    "ADDITIONALSETTINGS": "Definições adicionais",\r' + "\n" + '    "MAXIMUMSPEED": "Velocidade máxima",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Definições de Cadeira-de-Rodas",\r' + "\n" + '    "SURFACE": "Superfície",\r' + "\n" + '    "INCLINE": "Inclinação",\r' + "\n" + '    "CURB": "Lancil",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Isocronas",\r' + "\n" + '    "ISOCHRONEMETHOD": "Método para cálculo de Isocronas",\r' + "\n" + '    "TIMEDISTANCE": "Tempo",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Intervalo",\r' + "\n" + '    "KILOMETERS": "Quilómetros",\r' + "\n" + '    "UNITS": "Unidades",\r' + "\n" + '    "MILES": "Milhas",\r' + "\n" + '    "LANGUAGE": "Idioma",\r' + "\n" + '    "CHOOSELANG": "Escolher idioma",\r' + "\n" + '    "LANGROUTING": "Definições de idioma de rota",\r' + "\n" + '    "Fastest": "Mais rápido",\r' + "\n" + '    "Recommended": "Recomendado",\r' + "\n" + '    "Shortest": "Mais curto",\r' + "\n" + '    "BICYCLENORMAL": "Normal",\r' + "\n" + '    "BICYCLESAFEST": "Rota mais segura",\r' + "\n" + '    "BICYCLETOUR": "Bicicleta para passeio",\r' + "\n" + '    "BICYCLEMTB": "Bicicleta de montanha",\r' + "\n" + '    "BICYCLERACING": "Bicicleta de estrada",\r' + "\n" + '    "BICYCLEELECTRO": "e-bike",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Veículo pesado",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Autocarro",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Agrícola",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Florestal",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Entregas",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Bens e servicos",\r' + "\n" + '    "PEDESTRIANNORMAL": "Passeio",\r' + "\n" + '    "PEDESTRIANHIKING": "Caminhada",\r' + "\n" + '    "NOTICE": "Erro",\r' + "\n" + '    "CONNECTION": "Por favor, verifique a sua conecção �  Internet.",\r' + "\n" + '    "ROUTE": "Ocorreu um erro. Nenhuma rota foi encontrada para os pontos seleccionados.",\r' + "\n" + '    "GEOCODE": "Não foi possivel obter um endereço.",\r' + "\n" + '    "METHODTIME": "Tempo",\r' + "\n" + '    "METHODDISTANCE": "Distância",\r' + "\n" + '    "DISTANCEUNITS": "mi",\r' + "\n" + '    "MINUTES": "min",\r' + "\n" + '    "METHOD": "Método",\r' + "\n" + '    "AREA": "Área",\r' + "\n" + '    "RANGE": "Alcance",\r' + "\n" + '    "REACHFACTOR": "Factor de alcance",\r' + "\n" + '    "REVERSEFLOW": "Inverter direcção",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Transferir Isocronas",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Transferir rota",\r' + "\n" + '    "FILE_FORMAT": "Formato do ficheiro",\r' + "\n" + '    "SELECT_FILES": "Seleccione ficheiros (geojson, gpx, kml or tcx)",\r' + "\n" + '    "FILE_NAME": "Nome do ficheiro",\r' + "\n" + '    "PREVIEW": "Pré-visualizar",\r' + "\n" + '    "IMPORT_TRACK": "Trilho para rota",\r' + "\n" + '    "IMPORT": "Importar",\r' + "\n" + '    "IMPORT_ROUTE": "Importar os seus trilhos",\r' + "\n" + '    "Cobblestone": "Calçada",\r' + "\n" + '    "Other": "Outros",\r' + "\n" + '    "StateRoad": "Estrada nacional",\r' + "\n" + '    "Road": "Estrada",\r' + "\n" + '    "Street": "Rua",\r' + "\n" + '    "Path": "Caminho",\r' + "\n" + '    "Track": "Trilho",\r' + "\n" + '    "Cycleway": "Ciclovia",\r' + "\n" + '    "Footway": "Passeio",\r' + "\n" + '    "Steps": "Degraus",\r' + "\n" + '    "Ferry": "Ferry / Barco de travessia",\r' + "\n" + '    "Construction": "Construção",\r' + "\n" + '    "Paved": "Pavimentado",\r' + "\n" + '    "Unpaved": "Não pavimentado",\r' + "\n" + '    "Asphalt": "Asfalto",\r' + "\n" + '    "Concrete": "Betão/Cimento",\r' + "\n" + '    "Metal": "Metal",\r' + "\n" + '    "Wood": "Madeira",\r' + "\n" + '    "Compacted Gravel": "Gravilha compactada",\r' + "\n" + '    "Fine Gravel": "Gravilha fina",\r' + "\n" + '    "Gravel": "Gravilha",\r' + "\n" + '    "Dirt": "Terra",\r' + "\n" + '    "Ground": "Aterro",\r' + "\n" + '    "Ice": "Gelo",\r' + "\n" + '    "Salt": "Sal",\r' + "\n" + '    "Sand": "Areia",\r' + "\n" + '    "Woodchips": "Lascas de madeira",\r' + "\n" + '    "Grass": "Relva",\r' + "\n" + '    "Grass Paver": "Pavimento com relva",\r' + "\n" + '    "DESTINATION": "Direcções para aqui",\r' + "\n" + '    "START": "Direcções a partir daqui",\r' + "\n" + '    "VIA": "Adicionar como ponto de via",\r' + "\n" + '    "CENTER": "Usar como centro",\r' + "\n" + '    "WELCOME": "Bem-vindo ao Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "Para adicionar áreas a evitar, use o controlo disponível no canto superior direito do mapa. Explore também as restantes funcionalidades disponibilizadas no painel esquerdo, com destaque para o novo método de cálculo de Isocronas.",\r' + "\n" + '    "EXTRAS": "Informação adicional",\r' + "\n" + '    "WHATSHERE": "O que se encontra aqui?",\r' + "\n" + '    "NO_ADDRESS": "Nenhum endereço foi encontrado.",\r' + "\n" + '    "suitability": "Adequação do caminho �  rota seleccionada",\r' + "\n" + '    "steepness": "Inclinação",\r' + "\n" + '    "waytypes": "Tipos de caminho",\r' + "\n" + '    "surface": "Superfícies",\r' + "\n" + '    "roadaccessrestrictions": "Rua limite",\r' + "\n" + '    "green": "Índice ecológico",\r' + "\n" + '    "tollways": "Portagens",\r' + "\n" + '    "FROM": "de",\r' + "\n" + '    "TO": "para",\r' + "\n" + '    "SHARE_LINK": "Partilhar link",\r' + "\n" + '    "SHORTEN": "URL curto",\r' + "\n" + '    "SHORTEN_HINT": "Pode também copiar o link a partir da barra de endereço do seu navegador Web.",\r' + "\n" + '    "GREEN_ROUTING": "Preferir rotas ecológicas (apenas disponível na Alemanha)",\r' + "\n" + '    "DONATE": "Contribua!",\r' + "\n" + '    "DONATE_TEXT": "Por favor, forneça-nos a sua informação geográfica ",\r' + "\n" + '    "INFO_I": "O Openrouteservice oferece serviços de mobilidade e rotas através da utilização de dados colaborativosd gerados pelos utilizadores. Essa informação geográfica é livre e proveniente do projecto OpenStreetMap. Por favor, contribua com a sua informação geográfica em openstreetmap.org!",\r' + "\n" + '    "INFO_II": "Usamos cookies, registos de sistema e outras tecnologias de armazenamento de dados para (a) preservar a informação de modo a que nao tenha de a reintroduzir novamente; (b) manter abertas as sessões para utilizadores autenticados; (c) monitorização de métricas de utilização tais como o número total de visitantes e visualizações da página. Se os cookies forem desactivados, certas funcionalidades do web site principal poderão nao funcionar como seria pretendido. Nenhuma informação pessoal sobre si ou relacionada com a sua identidade será armazenada, excepto informações providênciadas voluntariamente através de contacto directo. Não partilhamos dados analíticos com parceiros ou outras entidades e serviços.",\r' + "\n" + "    \"INFO_II_I\": \"Usamos diferentes bibliotecas de código aberto para aplicativos da web. Estes podem ser encontrados dentro dos arquivos do pacote correspondente no<a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Por favor, sinta-se livre para reportar bugs no <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> ou consertá-los por si mesmo e fazer um pedido pull.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Os usuários estão proibidos de qualquer revenda comercial ou não gratuita ou redistribuição sem permissão explícita por escrito do CIAT. Dados originais de Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Dados SRTM V4 sem costura preenchidos com buracos, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "Caso tenha mais questões, preocupações ou comentários a fazer, contacte-nos através de:",\r' + "\n" + '    "INFO_V": "A equipa do Openrouteservice da importância aos seus inquéritos, problemas, questões, etc. Embora haja grande afluência de inquéritos provenientes de utilizadores do nosso serviço, tentaremos entrar em contacto consigo o mais rapidamente possível, após receber a nossa resposta automática via e-mail. Por favor, dê-nos algum tempo para analisar o seu problema em detalhe.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Adicionar ao mapa",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Gerar linhas Isocronas",\r' + "\n" + '    "DETOUR_FACTOR": "Factor de atalho",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentagem da rota",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Definições do mapa",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Isocronas com cores aleatórias",\r' + "\n" + '    "DRAGTOADD": "Arraste a linha para adicionar pontos na via. Clique no ponto para obter informação",\r' + "\n" + '    "noise": "Índice sonoro",\r' + "\n" + '    "height": "Altitude",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Marcadores de distância (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Estradas livres de portagem",\r' + "\n" + '    "LOCALE_TOLLWAY": "Estradas com portagem ",\r' + "\n" + '    "avgspeed": "Velocidade média",\r' + "\n" + '    "traildifficulty": "Dificuldade do trilho",\r' + "\n" + '    "EXTRA_INFORMATION": "Informação adicional",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Adicionar informação extra as definições",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Descubra o nosso API",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "Se esta satisfeito com as funcionalidades do Openrouteservice, por favor registe-se na API em <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "População",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/ru-RU.json", "{\r" + "\n" + '    "BICYCLE": "Велосипед",\r' + "\n" + '    "CAR": "Легковой автомобиль",\r' + "\n" + '    "HGV": "Грузовой автомобиль",\r' + "\n" + '    "PEDESTRIAN": "Пешком",\r' + "\n" + '    "WHEELCHAIR": "Инвалидная коляска",\r' + "\n" + '    "DISTANCE": "� асстояние",\r' + "\n" + '    "DURATION": "Время",\r' + "\n" + '    "SETTINGS": "Настройки",\r' + "\n" + '    "DOCUMENTATION": "Документация API",\r' + "\n" + '    "ROUTING": "Прокладка маршрутов",\r' + "\n" + '    "AA": "Зоны доступности",\r' + "\n" + '    "ADD": "Добавить точку",\r' + "\n" + '    "RESET": "Сбросить маршрут",\r' + "\n" + '    "REVERSE": "Поменять местами пункты назначения",\r' + "\n" + '    "EXPAND": "Показать весь маршрут",\r' + "\n" + '    "UPLOAD": "Загрузить треки",\r' + "\n" + '    "TOGGLESHOW": "Переключить видимость",\r' + "\n" + '    "DOWNLOAD": "Загрузить",\r' + "\n" + '    "REMOVE": "Удалить",\r' + "\n" + '    "OPTIONS": "Настройки",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "Параметры",\r' + "\n" + '    "EXPORT": "Экспорт маршрута",\r' + "\n" + '    "ACTUALDISTANCE": "Действительное расстояние",\r' + "\n" + '    "ASCENT": "Подъём",\r' + "\n" + '    "DESCENT": "Спуск",\r' + "\n" + '    "DETAILS": "Посмотреть маршрут",\r' + "\n" + '    "CALCULATE": "� асчитать",\r' + "\n" + '    "PREFERENCE": "Функция расчёта",\r' + "\n" + '    "WEIGHT": "Вес",\r' + "\n" + '    "AVOIDTYPES": "Избегать типов дорог",\r' + "\n" + '    "FERRIES": "Паромы",\r' + "\n" + '    "UNPAVED": "Дороги без покрытия",\r' + "\n" + '    "PAVED": "Дороги с покрытием",\r' + "\n" + '    "FORDS": "Места брода",\r' + "\n" + '    "STEPS": "Ступеньки",\r' + "\n" + '    "HIGHWAYS": "Шоссе",\r' + "\n" + '    "TOLLROADS": "Платные автодороги",\r' + "\n" + '    "TUNNELS": "Тоннели",\r' + "\n" + '    "TRACKS": "Грунтовки",\r' + "\n" + '    "DIFFICULTY": "Установки сожности",\r' + "\n" + '    "FITNESS": "Уровень подготовки",\r' + "\n" + '    "AVOIDHILLS": "Избегать холмов",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "Максимальная крутизна",\r' + "\n" + '    "HGVSETTINGS": "Параметры автосредства",\r' + "\n" + '    "HGVLENGTH": "Длина",\r' + "\n" + '    "HGVWIDTH": "Ширина",\r' + "\n" + '    "HGVHEIGHT": "Высота",\r' + "\n" + '    "HGVAXLELOAD": "Нагрузка на ось",\r' + "\n" + '    "HGVWEIGHT": "Вес",\r' + "\n" + '    "HGVHAZMAT": "Oпасный материал",\r' + "\n" + '    "ADDITIONALSETTINGS": "Дополнительно",\r' + "\n" + '    "MAXIMUMSPEED": "Максимальная скорость",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "Параметры",\r' + "\n" + '    "SURFACE": "Поверхность",\r' + "\n" + '    "INCLINE": "Подъём",\r' + "\n" + '    "CURB": "Бордюр",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "Зоны доступности",\r' + "\n" + '    "ISOCHRONEMETHOD": "Метод расчёта",\r' + "\n" + '    "TIMEDISTANCE": "Время",\r' + "\n" + '    "ISOCHRONEINTERVAL": "Интервал",\r' + "\n" + '    "KILOMETERS": "Километры",\r' + "\n" + '    "UNITS": "Единицы измерения",\r' + "\n" + '    "MILES": "Мили",\r' + "\n" + '    "LANGUAGE": "Язык интерфейса",\r' + "\n" + '    "CHOOSELANG": "Выберите язык",\r' + "\n" + '    "LANGROUTING": "Язык инструкций прокладки маршрутов",\r' + "\n" + '    "Fastest": "Наибыстрейший",\r' + "\n" + '    "Recommended": "� екомендуемый",\r' + "\n" + '    "Shortest": "Кратчайший",\r' + "\n" + '    "BICYCLENORMAL": "Обычный",\r' + "\n" + '    "BICYCLESAFEST": "Безопасный",\r' + "\n" + '    "BICYCLETOUR": "Велотур",\r' + "\n" + '    "BICYCLEMTB": "Горный",\r' + "\n" + '    "BICYCLERACING": "Шоссейный",\r' + "\n" + '    "BICYCLEELECTRO": "Электр́ический",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "Грузовик",\r' + "\n" + '    "HEAVYVEHICLEBUS": "Автобус",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "Сельскохозяйственная техника",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "Техника для лесничества",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "Доставка",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "Товары",\r' + "\n" + '    "PEDESTRIANNORMAL": "Пешком",\r' + "\n" + '    "PEDESTRIANHIKING": "Пеший туризм",\r' + "\n" + '    "NOTICE": "Ошибка",\r' + "\n" + '    "CONNECTION": "Пожалуйста, проверьте Ваше интернет соединение.",\r' + "\n" + '    "ROUTE": "Произошла ошибка. Невозможно найти маршрут для указанных пунктов следование.",\r' + "\n" + '    "GEOCODE": "Невозможно найти адрес.",\r' + "\n" + '    "METHODTIME": "Время",\r' + "\n" + '    "METHODDISTANCE": "Удаленность",\r' + "\n" + '    "DISTANCEUNITS": "мили",\r' + "\n" + '    "MINUTES": "мин",\r' + "\n" + '    "METHOD": "Метод",\r' + "\n" + '    "AREA": "Площадь",\r' + "\n" + '    "RANGE": "Диапазон",\r' + "\n" + '    "REACHFACTOR": "Показатель досягаемоести",\r' + "\n" + '    "REVERSEFLOW": "Обратное направление",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "Скачать зоны доступности",\r' + "\n" + '    "DOWNLOAD_ROUTE": "Скачать маршрут",\r' + "\n" + '    "FILE_FORMAT": "Формат файла",\r' + "\n" + '    "SELECT_FILES": "Выберите формат файла (geojson, gpx или kml)",\r' + "\n" + '    "FILE_NAME": "Имя файла",\r' + "\n" + '    "PREVIEW": "Предпросмотр",\r' + "\n" + '    "IMPORT_TRACK": "Импортировать трек для построение маршрута",\r' + "\n" + '    "IMPORT": "Импортировать",\r' + "\n" + '    "IMPORT_ROUTE": "Импортировать маршрут",\r' + "\n" + '    "Cobblestone": "Булыжник",\r' + "\n" + '    "Other": "Другое",\r' + "\n" + '    "StateRoad": "Дорога регионального значения",\r' + "\n" + '    "Road": "Дорога",\r' + "\n" + '    "Street": "Улица",\r' + "\n" + '    "Path": "Тропа",\r' + "\n" + '    "Track": "Дороги сельхоз назначения",\r' + "\n" + '    "Cycleway": "Велосипедная дорожка",\r' + "\n" + '    "Footway": "Пешеходная дорожка",\r' + "\n" + '    "Steps": "Ступеньки",\r' + "\n" + '    "Ferry": "Паром",\r' + "\n" + '    "Construction": "Строительные работы",\r' + "\n" + '    "Paved": "Твёрдое покрытие",\r' + "\n" + '    "Unpaved": "Без покрытия",\r' + "\n" + '    "Asphalt": "Асфальт",\r' + "\n" + '    "Concrete": "Бетон",\r' + "\n" + '    "Metal": "Металл",\r' + "\n" + '    "Wood": "Дерево",\r' + "\n" + '    "Compacted Gravel": "Гравий с песком",\r' + "\n" + '    "Fine Gravel": "Многослойный гравий",\r' + "\n" + '    "Gravel": "Гравий",\r' + "\n" + '    "Dirt": "Грязь",\r' + "\n" + '    "Ground": "Голая почва",\r' + "\n" + '    "Ice": "Лёд",\r' + "\n" + '    "Salt": "Соль",\r' + "\n" + '    "Sand": "Песок",\r' + "\n" + '    "Woodchips": "Древесная стружка или щепа",\r' + "\n" + '    "Grass": "Трава",\r' + "\n" + '    "Grass Paver": "Мощение с травой",\r' + "\n" + '    "DESTINATION": "Проложить маршрут сюда",\r' + "\n" + '    "START": "Проложить маршрут отсюда",\r' + "\n" + '    "VIA": "Добавить пункт назначения",\r' + "\n" + '    "CENTER": "Использовать как точку отсчёта",\r' + "\n" + '    "WELCOME": "Добро пожаловать на OpenRouteService",\r' + "\n" + '    "WELCOME_MESSAGE": "Используйте широкий набор параметров в панеле слева, для получения оптимального для Вас маршрута. Чтобы указать зоны, которые Вы хотели бы избежать, можно использовать элемент управления, находящийся в правом верхнем углу. Для переключения в режим построения зон доступности, нажмите на кнопку в самой левой вертикальной панели.",\r' + "\n" + '    "EXTRAS": "Дополнительно",\r' + "\n" + '    "WHATSHERE": "Что здесь?",\r' + "\n" + '    "NO_ADDRESS": "Указанный адрес не может быть найден.",\r' + "\n" + '    "suitability": "Пригодность",\r' + "\n" + '    "steepness": "Крутизна",\r' + "\n" + '    "waytypes": "Типы дорог",\r' + "\n" + '    "surface": "Типы покрытия",\r' + "\n" + '    "roadaccessrestrictions": "улица ограничение",\r' + "\n" + '    "green": "Green index (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "FROM": "из",\r' + "\n" + '    "TO": "в",\r' + "\n" + '    "SHARE_LINK": "Поделиться ссылкой",\r' + "\n" + '    "SHORTEN": "Короткий URL",\r' + "\n" + '    "SHORTEN_HINT": "Вы также можете скопировать ссылку в адресной строке вашего браузера.",\r' + "\n" + '    "GREEN_ROUTING": "Prefer green areas (for Germany only)",\r' + "\n" + '    "DONATE": "Donate!",\r' + "\n" + '    "DONATE_TEXT": "Please donate your geographic data to",\r' + "\n" + '    "INFO_I": "Openrouteservice as offers Routing services by using user-generated, collaboratively collected free geographic data from OpenStreetMap. Please donate your geographic data to openstreetmap.org!",\r' + "\n" + '    "INFO_II": "We use cookies, system logs and other data storage technologies to (a) preserve information so you will not have to re-enter it during your visit or in subsequent visits; (b) maintain sessions for authenticated users; and (c) monitor aggregate metrics such as total number of visitors and pages viewed. If you disable cookies parts of the main website may not work as intended. We do not collect or store any personal information about you or personally identifiable information about you, except what you voluntarily provide through direct contact. We do not share analytic data with any service providers or partners.",\r' + "\n" + "    \"INFO_II_I\": \"We use different open source libraries for web application. These can be found within the corresponding package files on <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"Please feel free to report bugs on <a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a> or fix them by yourself and make a pull request.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. Users are prohibited from any commercial, non-free resale, or redistribution without explicit written permission from CIAT. Original data by Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "In case you have any further questions, concerns or feedback, please contact us via:",\r' + "\n" + '    "INFO_V": "Openrouteservice cares about your inquiries, problems, questions etc. As there will always be a stream of inquiries, we take strong responsibility to respond to you in short time. After you have received our automatic response email to let you know we have received your inquiry, we will usually respond shortly. Please give us time to look into your reported issue properly before getting back.",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "Add to map",\r' + "\n" + '    "GENERATE_ISOCHRONES": "Generate isochrones",\r' + "\n" + '    "DETOUR_FACTOR": "Detour factor",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "Percentage of route",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "noise": "Noise index (for Germany only)",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "население",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}");
        $templateCache.put("languages/zh-CN.json", "{\r" + "\n" + '    "BICYCLE": "自行车",\r' + "\n" + '    "CAR": "汽车",\r' + "\n" + '    "HGV": "重型车辆",\r' + "\n" + '    "PEDESTRIAN": "步行者",\r' + "\n" + '    "WHEELCHAIR": "轮椅",\r' + "\n" + '    "DISTANCE": "距离",\r' + "\n" + '    "DURATION": "时间",\r' + "\n" + '    "SETTINGS": "设置",\r' + "\n" + '    "DOCUMENTATION": "文档",\r' + "\n" + '    "ROUTING": "查找路线",\r' + "\n" + '    "AA": "可达性分析",\r' + "\n" + '    "ADD": "添� 途经点",\r' + "\n" + '    "RESET": "重置",\r' + "\n" + '    "REVERSE": "反转途经点",\r' + "\n" + '    "EXPAND": "展开",\r' + "\n" + '    "UPLOAD": "上� 路线",\r' + "\n" + '    "TOGGLESHOW": "切换",\r' + "\n" + '    "DOWNLOAD": "下载",\r' + "\n" + '    "REMOVE": "移除",\r' + "\n" + '    "OPTIONS": "选项",\r' + "\n" + '    "EXPORT": "导出路线",\r' + "\n" + '    "ISOCHRONE_OPTIONS": "等值线选项",\r' + "\n" + '    "ACTUALDISTANCE": "实际距离",\r' + "\n" + '    "ASCENT": "上坡",\r' + "\n" + '    "DESCENT": "下坡",\r' + "\n" + '    "DETAILS": "详细",\r' + "\n" + '    "CALCULATE": "计算",\r' + "\n" + '    "PREFERENCE": "路径偏好",\r' + "\n" + '    "WEIGHT": "权重",\r' + "\n" + '    "AVOIDTYPES": "避开道路类型",\r' + "\n" + '    "FERRIES": "轮渡",\r' + "\n" + '    "UNPAVED": "土路",\r' + "\n" + '    "PAVED": "铺设路面",\r' + "\n" + '    "FORDS": "浅滩",\r' + "\n" + '    "STEPS": "台阶",\r' + "\n" + '    "HIGHWAYS": "公路",\r' + "\n" + '    "TOLLROADS": "收费道路",\r' + "\n" + '    "TUNNELS": "隧道",\r' + "\n" + '    "TRACKS": "轨迹",\r' + "\n" + '    "DIFFICULTY": "难度设置",\r' + "\n" + '    "FITNESS": "健身",\r' + "\n" + '    "AVOIDHILLS": "避开山丘",\r' + "\n" + '    "MAXIMUMSTEEPNESS": "最陡坡度",\r' + "\n" + '    "HGVSETTINGS": "重型车辆设置",\r' + "\n" + '    "HGVLENGTH": "长度",\r' + "\n" + '    "HGVWIDTH": "宽度",\r' + "\n" + '    "HGVHEIGHT": "高度",\r' + "\n" + '    "HGVAXLELOAD": "轴载重",\r' + "\n" + '    "HGVWEIGHT": "重量",\r' + "\n" + '    "HGVHAZMAT": "危险品",\r' + "\n" + '    "ADDITIONALSETTINGS": "其它设置",\r' + "\n" + '    "MAXIMUMSPEED": "最高限速",\r' + "\n" + '    "WHEELCHAIRSETTINGS": "轮椅设置",\r' + "\n" + '    "SURFACE": "路面",\r' + "\n" + '    "INCLINE": "斜坡",\r' + "\n" + '    "CURB": "边道",\r' + "\n" + '    "WHEELCHAIR_WIDTH": "Minimum width",\r' + "\n" + '    "ISOCHRONES": "等值线",\r' + "\n" + '    "ISOCHRONEMETHOD": "等值算法",\r' + "\n" + '    "TIMEDISTANCE": "时间",\r' + "\n" + '    "ISOCHRONEINTERVAL": "间隔",\r' + "\n" + '    "KILOMETERS": "公里",\r' + "\n" + '    "UNITS": "单位",\r' + "\n" + '    "MILES": "英里",\r' + "\n" + '    "LANGUAGE": "语言",\r' + "\n" + '    "CHOOSELANG": "选择语言",\r' + "\n" + '    "LANGROUTING": "引导信息语言",\r' + "\n" + '    "Fastest": "最快",\r' + "\n" + '    "Recommended": "推荐",\r' + "\n" + '    "Shortest": "最短",\r' + "\n" + '    "BICYCLENORMAL": "普通",\r' + "\n" + '    "BICYCLESAFEST": "安全路线",\r' + "\n" + '    "BICYCLETOUR": "休闲自行车",\r' + "\n" + '    "BICYCLEMTB": "山地自行车",\r' + "\n" + '    "BICYCLERACING": "公路自行车",\r' + "\n" + '    "BICYCLEELECTRO": "TO_DO",\r' + "\n" + '    "HEAVYVEHICLENORMAL": "重型车辆",\r' + "\n" + '    "HEAVYVEHICLEBUS": "公交巴士",\r' + "\n" + '    "HEAVYVEHICLEAGRICULTURAL": "农用车",\r' + "\n" + '    "HEAVYVEHICLEFORESTRY": "林业用车",\r' + "\n" + '    "HEAVYVEHICLEDELIVERY": "快递货车",\r' + "\n" + '    "HEAVYVEHICLEGOODS": "货车",\r' + "\n" + '    "PEDESTRIANNORMAL": "步行",\r' + "\n" + '    "PEDESTRIANHIKING": "徒步",\r' + "\n" + '    "NOTICE": "有点小问题",\r' + "\n" + '    "CONNECTION": "请确认一下您的网络还通吗？",\r' + "\n" + '    "ROUTE": "没找到合适的路线",\r' + "\n" + '    "GEOCODE": "没有找到这个地址",\r' + "\n" + '    "METHODTIME": "时间",\r' + "\n" + '    "METHODDISTANCE": "距离",\r' + "\n" + '    "DISTANCEUNITS": "英里",\r' + "\n" + '    "MINUTES": "分钟",\r' + "\n" + '    "METHOD": "等值线算法",\r' + "\n" + '    "AREA": "面积",\r' + "\n" + '    "RANGE": "范围",\r' + "\n" + '    "REACHFACTOR": "可达性指� �",\r' + "\n" + '    "REVERSEFLOW": "切换起止点",\r' + "\n" + '    "DOWNLOAD_ISOCHRONES": "下载等值线",\r' + "\n" + '    "DOWNLOAD_ROUTE": "下载路线",\r' + "\n" + '    "FILE_FORMAT": "文件� �式",\r' + "\n" + '    "SELECT_FILES": "选择文件",\r' + "\n" + '    "FILE_NAME": "文件名",\r' + "\n" + '    "PREVIEW": "预览",\r' + "\n" + '    "IMPORT_TRACK": "导入轨迹",\r' + "\n" + '    "IMPORT": "导入",\r' + "\n" + '    "IMPORT_ROUTE": "导入路线",\r' + "\n" + '    "Cobblestone": "鹅卵石",\r' + "\n" + '    "Other": "其它",\r' + "\n" + '    "StateRoad": "国道",\r' + "\n" + '    "Road": "道路",\r' + "\n" + '    "Street": "街道",\r' + "\n" + '    "Path": "路径",\r' + "\n" + '    "Track": "轨迹",\r' + "\n" + '    "Cycleway": "自行车道",\r' + "\n" + '    "Footway": "人行道",\r' + "\n" + '    "Steps": "台阶",\r' + "\n" + '    "Ferry": "轮渡",\r' + "\n" + '    "Construction": "施工",\r' + "\n" + '    "Paved": "铺设路面",\r' + "\n" + '    "Unpaved": "土路",\r' + "\n" + '    "Asphalt": "沥青路面",\r' + "\n" + '    "Concrete": "水泥路面",\r' + "\n" + '    "Metal": "金属路面",\r' + "\n" + '    "Wood": "木质路面",\r' + "\n" + '    "Compacted Gravel": "密石路面",\r' + "\n" + '    "Fine Gravel": "小石子路面",\r' + "\n" + '    "Gravel": "石子路面",\r' + "\n" + '    "Dirt": "泥土路面",\r' + "\n" + '    "Ground": "地面",\r' + "\n" + '    "Ice": "结冰路面",\r' + "\n" + '    "Salt": "盐碱路面",\r' + "\n" + '    "Sand": "沙土路面",\r' + "\n" + '    "Woodchips": "木屑路面",\r' + "\n" + '    "Grass": "草坪路面",\r' + "\n" + '    "Grass Paver": "平草路面",\r' + "\n" + '    "DESTINATION": "到这里的路线",\r' + "\n" + '    "START": "从这里出发的路线",\r' + "\n" + '    "VIA": "作为途经点",\r' + "\n" + '    "CENTER": "作为中心点",\r' + "\n" + '    "WELCOME": "欢迎使用Openrouteservice",\r' + "\n" + '    "WELCOME_MESSAGE": "使用地图右上角的小工具可以在图上添� 不可通行的区域。左侧的控制面板中提供了大量路径规划的控制选项，请随意使用。那里还有最新发布的可达性分析功能，也可以试试看哦",\r' + "\n" + '    "EXTRAS": "其它信息",\r' + "\n" + '    "WHATSHERE": "这是哪儿？",\r' + "\n" + '    "NO_ADDRESS": "查不到这里的地址",\r' + "\n" + '    "suitability": "通行情况",\r' + "\n" + '    "steepness": "陡峭程度",\r' + "\n" + '    "waytypes": "道路类型",\r' + "\n" + '    "surface": "路面类型",\r' + "\n" + '    "roadaccessrestrictions": "Road access restrictions",\r' + "\n" + '    "green": "绿化程度 (for Germany only)",\r' + "\n" + '    "tollways": "Tollways",\r' + "\n" + '    "noise": "噪声强度 (for Germany only)",\r' + "\n" + '    "FROM": "从",\r' + "\n" + '    "TO": "至",\r' + "\n" + '    "SHARE_LINK": "分享链接",\r' + "\n" + '    "SHORTEN": "短网址",\r' + "\n" + '    "SHORTEN_HINT": "也可以从浏览器地址� �中拷贝链接",\r' + "\n" + '    "GREEN_ROUTING": "更绿色，更健康 (for Germany only)",\r' + "\n" + '    "DONATE": "捐� ",\r' + "\n" + '    "DONATE_TEXT": "请将您的地理数据捐� 给",\r' + "\n" + '    "INFO_I": "Openrouteservice提供路径规划服务的数据来源于免费的开放众包地理信息平台OpenStreetMap。如果可能，非常欢迎您依照所在国家或地区的法律法规向OpenStreetMap.org贡献数据。",\r' + "\n" + '    "INFO_II": "我们使用cookies和系统日志等技术来 (1) 尽可能减少用户在访问本网站时不必要的重复输入； (2) 保存授权用户的会话信息； (3) 统计网站访问数据。 如果您对Openrouteservice禁用了cookies，那么可能会导致其功能异常。我们不采集也不存储任何用户个人隐私信息，除非您与我们联系主动贡献这些信息。我们不与其它任何组织或个人分享我们的访问统计数据。",\r' + "\n" + "    \"INFO_II_I\": \"我们为Web应用程序使用不同的开源库. 这些可以在相应的包文件中找到 <a class='link' href='https://github.com/GIScience/openrouteservice-app/' target='_blank'>github</a>.\",\r" + "\n" + "    \"INFO_II_II\": \"请随时在<a class='link' href='https://github.com/GIScience/openrouteservice-app/issues/new' target='_blank'>github</a>上报告错误，或者自行修复它们并提出请求.\",\r" + "\n" + "    \"INFO_III\": \"Hillshade Layer: <a class='link' href='http://srtm.csi.cgiar.org' target='_blank'>CIAT-CSI SRTM</a>. 未经CIAT明确书面许可，禁止用户进行任何商业，非自由转售或重新分配. Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008 的原始数据, 填充� 缝SRTM V4数据, International Centre for Tropical Agriculture (CIAT)\",\r" + "\n" + '    "INFO_IV": "如果您有任何进一步的问题、咨询或反馈，请联系我们：",\r' + "\n" + '    "INFO_V": "Openrouteservice非常重视用户提出的任何问题、建议、咨询和反馈。尽管咨询数量很多，但我们仍然会努力尽快回复。如果您在给我们发送了问题或咨询之后收到了自动确认邮件，我们通常会随后很快给您答复。在此期间，请您暂时耐心等待。",\r' + "\n" + "    \"INFO_VI\": \"Population data provided by <a class='link' href='https://ghsl.jrc.ec.europa.eu/about.php' target='_blank'>The Global Human Settlement (GHS) frameworks</a>.\",\r" + "\n" + '    "ADD_EXTRAS": "添� 至地图",\r' + "\n" + '    "GENERATE_ISOCHRONES": "生成等值线",\r' + "\n" + '    "DETOUR_FACTOR": "绕道指数",\r' + "\n" + '    "PERCENTAGE_OF_ROUTE": "路段� 比",\r' + "\n" + '    "LOCALE_MAP_SETTINGS": "Map Settings",\r' + "\n" + '    "LOCALE_ISOCHRONE_RANDOMIZE_COLORS": "Randomized isochrone colors",\r' + "\n" + '    "DRAGTOADD": "Drag to add a via point. Click for point info",\r' + "\n" + '    "height": "Height",\r' + "\n" + '    "LOCALE_DISTANCE_MARKERS": "Distance markers (km)",\r' + "\n" + '    "LOCALE_NO_TOLLWAY": "Tollfree roads",\r' + "\n" + '    "LOCALE_TOLLWAY": "Tollroads ",\r' + "\n" + '    "avgspeed": "Average speed",\r' + "\n" + '    "traildifficulty": "Trail difficulty",\r' + "\n" + '    "EXTRA_INFORMATION": "Extra information",\r' + "\n" + '    "LOCALE_EXTRAS_HELP": "Add further extra information in settings",\r' + "\n" + '    "LOCALE_SIGNUP_HEADER": "Start your API journey now",\r' + "\n" + '    "LOCALE_SIGNUP_MESSAGE": "If you are satisfied with the features of Openrouteservice please sign up for the API at <a href=\'https://openrouteservice.org\'>https://openrouteservice.org</a>!",\r' + "\n" + '    "AVOIDBORDERS": "Avoid borders",\r' + "\n" + '    "CONTROLLEDBORDERS": "Controlled Borders",\r' + "\n" + '    "BORDERS": "All borders",\r' + "\n" + '    "COUNTRYBORDERS": "Country borders",\r' + "\n" + '    "SEARCHAVOIDCOUNTRIES": "Search for countries to avoid",\r' + "\n" + '    "TOTALPOP": "人口",\r' + "\n" + '    "COPYYX": "Copy Lat,Lng",\r' + "\n" + '    "COPYXY": "Copy Lng,Lat",\r' + "\n" + '    "SHOWLANDMARKS": "Include landmarks in routing instructions",\r' + "\n" + '    "CUSTOM_MARKER": "Add custom marker to map",\r' + "\n" + '    "ELEVATION": "Elevation",\r' + "\n" + '    "INFO_SUPPORT": "Please Support openrouteservice.org",\r' + "\n" + '    "INFO_SUPPORT_TEXT": "Openrouteservice offers free services and relies on donations for a majority of its funding. If you would like to support the further development of features and server infrastructure donations are very welcome.",\r' + "\n" + '    "LOCALE_HEIGHTGRAPH": "Elevation profile",\r' + "\n" + '    "DEVELOPER_SETTINGS": "Developer Settings",\r' + "\n" + '    "INCLUDE_INSTRUCTIONS": "Include Instructions",\r' + "\n" + '    "FUEL_CONSUMPTION": "Fuel consumption (experimental)",\r' + "\n" + '    "FUEL_TYPE": "Fuel type",\r' + "\n" + '    "CAR_BRAND": "Car brand",\r' + "\n" + '    "DRIVING_SPEED": "Driving speed",\r' + "\n" + '    "VEHICLE_CATEGORY": "Vehicle category",\r' + "\n" + '    "TANK_SIZE": "Tank size",\r' + "\n" + '    "SPECIFIC_FUEL_CONSUMPTION": "Specific fuel consumption",\r' + "\n" + '    "CAR_MODEL": "Car model",\r' + "\n" + '    "CAR_YEAR": "Construction year",\r' + "\n" + '    "CAR_TYPE": "Special type",\r' + "\n" + '    "FUEL_COSTS": "Fuel costs",\r' + "\n" + '    "SEARCH": "Search",\r' + "\n" + '    "OPTIONAL_PARAMS": "Optional parameters:",\r' + "\n" + '    "CALC_CONSUMPTION": "Calculate consumption",\r' + "\n" + '    "_RESET": "Reset",\r' + "\n" + '    "ON_ROUTE_CHANGE": "on route change",\r' + "\n" + '    "FUEL_INFO": "At least a vehicle category or a car brand and model need to be specified.",\r' + "\n" + '    "CONSUMPTION": "Consumption",\r' + "\n" + '    "EMISSION": "Emission",\r' + "\n" + '    "_FOR": "For"\r' + "\n" + "}")
    }]);
    return {}
}();
var $__build_47_constants_47_namespaces_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/namespaces.js";
    angular.module("orsApp").constant("orsNamespaces", {
        schemata: {
            xls: "http://www.opengis.net/xls",
            sch: "http://www.ascc.net/xml/schematron",
            gml: "http://www.opengis.net/gml",
            wps: "http://www.opengis.net/wps/1.0.0",
            ows: "http://www.opengis.net/ows/1.1",
            xlink: "http://www.w3.org/1999/xlink",
            xsi: "http://www.w3.org/2001/XMLSchema-instance",
            ascc: "http://www.ascc.net/xml/schematron",
            aas: "http://www.geoinform.fh-mainz.de/aas",
            gpx: "http://www.topografix.com/GPX/1/1",
            xml: "http://www.w3.org/XML/1998/namespace",
            xsd: "http://www.w3.org/2001/XMLSchema",
            tcx: "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2",
            gml32: "http://www.opengis.net/gml/3.2",
            xs: "http://www.w3.org/2001/XMLSchema",
            kml: "http://www.opengis.net/kml/2.2",
            atom: "http://www.w3.org/2005/Atom",
            xal: "urn:oasis:names:tc:ciq:xsdschema:xAL:2.0",
            gpxService: "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd",
            tcxService: "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd",
            kmlService: "http://www.opengis.net/kml/2.2 http://schemas.opengis.net/kml/2.2.0/ogckml22.xsd"
        },
        metadata: {
            name: "Openrouteservice Route",
            description: "Route exported using GIScience Universität Heidelberg Openrouteservice",
            authorName: "GIScience Universität Heidelberg",
            authorEmailId: "some_person",
            authorEmailDomain: "geog.uni-heidelberg.de",
            copyright: "Openrouteservice - GIScience Universität Heidelberg",
            license: "MIT",
            link: "http://www.geog.uni-heidelberg.de/gis/index_en.html",
            keywords: "Openrouteservice. Routing. GIS. Universität Heidelberg",
            src: "Route point logged using Openrouteservice"
        },
        layerMapSurfer: {
            url: "https://api.openrouteservice.org/mapsurfer/{z}/{x}/{y}.png",
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, powered by <a href="http://mapsurfernet.com/">MapSurfer.NET</a>',
            maxZoom: 18,
            minZoom: 0
        },
        layerHs: "https://korona.geog.uni-heidelberg.de/tiles/asterh/x={x}&y={y}&z={z}",
        layerOSM: {
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        layerOSMCycle: {
            url: "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f",
            attribution: 'Maps &copy; <a href="http://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        layerOSMDark: {
            url: "https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f",
            attribution: 'Maps &copy; <a href="http://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        layerOutdoors: {
            url: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=13efc496ac0b486ea05691c820824f5f",
            attribution: 'Maps &copy; <a href="http://thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        layerStamen: {
            url: "http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png",
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        overlayHillshade: {
            url: "https://korona.geog.uni-heidelberg.de/tiles/asterh/x={x}&y={y}&z={z}"
        },
        layerBkgTopPlus: {
            GetCapabilities: "https://sgx.geodatenzentrum.de/wms_topplus_web_open?request=GetCapabilities&service=wms",
            url: "https://sgx.geodatenzentrum.de/wms_topplus_web_open?"
        }
    });
    return {}
}();
var $__build_47_constants_47_lists_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/lists.js";
    angular.module("orsApp").constant("lists", {
        locationsIcon: {
            className: "ors-icon-locations",
            iconSize: [20, 20]
        },
        locationsIconHighlight: {
            className: "ors-icon-locations-highlight",
            iconSize: [20, 20]
        },
        waypointIcons: {
            0: {
                className: "ors-marker-start",
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            },
            1: {
                className: "ors-marker-via",
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            },
            2: {
                className: "ors-marker-end",
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            },
            3: {
                className: "ors-marker-location",
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            },
            4: {
                className: "ors-marker-highlight",
                iconSize: [45, 45],
                iconAnchor: [22, 45]
            },
            5: {
                className: "ors-marker-hover"
            },
            6: {
                className: "ors-marker-hover-drag"
            }
        },
        customMarkerIcon: {
            className: "ors-marker-custom",
            iconSize: [45, 45],
            iconAnchor: [22, 45]
        },
        landmarkIcon: {
            className: "ors-marker-landmark",
            iconSize: [45, 45],
            iconAnchor: [22, 45]
        },
        landmarkIconEmph: {
            className: "ors-marker-landmark-highlight",
            iconSize: [45, 45],
            iconAnchor: [22, 45]
        },
        profiles: {
            Car: {
                name: "Car",
                elevation: true,
                subgroup: "Car",
                request: "driving-car",
                shortValue: "0"
            },
            Bicycle: {
                name: "Bicycle",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-regular",
                shortValue: "1a"
            },
            BicycleMTB: {
                name: "BicycleMTB",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-mountain",
                shortValue: "1b"
            },
            BicycleRacer: {
                name: "BicycleRacer",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-road",
                shortValue: "1c"
            },
            BicycleTour: {
                name: "BicycleTour",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-tour",
                shortValue: "1d"
            },
            BicycleSafety: {
                name: "BicycleSafety",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-safe",
                shortValue: "1e"
            },
            BicycleElectro: {
                name: "BicycleElectro",
                elevation: true,
                subgroup: "Bicycle",
                request: "cycling-electric",
                shortValue: "1f"
            },
            Pedestrian: {
                name: "Pedestrian",
                elevation: true,
                subgroup: "Pedestrian",
                request: "foot-walking",
                shortValue: "2"
            },
            PedestrianHiking: {
                name: "PedestrianHiking",
                elevation: true,
                subgroup: "Pedestrian",
                request: "foot-hiking",
                shortValue: "2b"
            },
            Wheelchair: {
                name: "Wheelchair",
                elevation: true,
                subgroup: "Wheelchair",
                request: "wheelchair",
                shortValue: "3"
            },
            hgv: {
                name: "hgv",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4a"
            },
            goods: {
                name: "goods",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4b"
            },
            bus: {
                name: "bus",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4c"
            },
            agricultural: {
                name: "agricultural",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4d"
            },
            forestry: {
                name: "forestry",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4e"
            },
            delivery: {
                name: "delivery",
                elevation: true,
                subgroup: "HeavyVehicle",
                request: "driving-hgv",
                shortValue: "4f"
            }
        },
        extra_info: {
            surface: ["Wheelchair", "hgv", "Pedestrian", "Bicycle", "Car"],
            waytype: ["Wheelchair", "hgv", "Pedestrian", "Bicycle", "Car"],
            suitability: ["Wheelchair", "hgv", "Pedestrian", "Bicycle", "Car"],
            tollways: ["hgv", "Car"],
            steepness: ["Wheelchair", "hgv", "Pedestrian", "Bicycle", "Car"],
            green: ["Pedestrian", "Bicycle"],
            noise: ["Pedestrian", "Bicycle"],
            TrailDifficulty: ["Pedestrian", "Bicycle"],
            HeavyVehicle: ["surface", "waytype", "suitability", "tollways", "steepness"],
            Car: ["surface", "waytype", "suitability", "tollways", "steepness"],
            Bicycle: ["surface", "waytype", "suitability", "steepness", "green", "noise", "TrailDifficulty"],
            Pedestrian: ["surface", "waytype", "suitability", "steepness", "green", "noise", "TrailDifficulty"],
            Wheelchair: ["surface", "waytype", "suitability", "steepness", "green", "noise", "TrailDifficulty"]
        },
        optionList: {
            weight: {
                Fastest: {
                    value: "Fastest",
                    shortValue: "0"
                },
                Shortest: {
                    value: "Shortest",
                    shortValue: "1"
                },
                Recommended: {
                    value: "Recommended",
                    shortValue: "2"
                }
            },
            borders: {
                all: {
                    subgroups: ["Car", "HeavyVehicle"]
                },
                controlled: {
                    subgroups: ["Car", "HeavyVehicle"]
                },
                country: {
                    subgroups: ["Car", "HeavyVehicle"]
                }
            },
            avoidables: {
                ferry: {
                    name: "ferries",
                    subgroups: ["Car", "Bicycle", "HeavyVehicle", "Wheelchair", "Pedestrian"]
                },
                fords: {
                    name: "fords",
                    subgroups: ["Car", "Bicycle", "HeavyVehicle", "Wheelchair", "Pedestrian"]
                },
                steps: {
                    name: "steps",
                    subgroups: ["Wheelchair", "Pedestrian", "Bicycle"]
                },
                highways: {
                    name: "highways",
                    subgroups: ["Car", "HeavyVehicle"]
                },
                tollroads: {
                    name: "tollways",
                    subgroups: ["Car", "HeavyVehicle"]
                }
            },
            wheelchair: {
                Surface: {
                    concrete: {
                        name: "Concrete, asphalt",
                        value: "concrete"
                    },
                    "cobblestone:flattened": {
                        name: "Flattened Cobblestone and better",
                        value: "cobblestone:flattened"
                    },
                    cobblestone: {
                        name: "Cobblestone and better",
                        value: "cobblestone"
                    },
                    compacted: {
                        name: "Compacted",
                        value: "compacted"
                    },
                    any: {
                        name: "All traversable surfaces",
                        value: "any"
                    }
                },
                Incline: {
                    3: {
                        name: "Up to 3%",
                        value: 3
                    },
                    6: {
                        name: "Up to 6%",
                        value: 6
                    },
                    10: {
                        name: "Up to 10%",
                        value: 10
                    },
                    15: {
                        name: "Up to 15%",
                        value: 15
                    },
                    31: {
                        name: "Flexible",
                        value: 31
                    }
                },
                Curb: {
                    .03: {
                        name: "Up to 3cm",
                        value: .03
                    },
                    .06: {
                        name: "Up to 6cm",
                        value: .06
                    },
                    .1: {
                        name: "Up to 10cm",
                        value: .1
                    },
                    .31: {
                        name: "Flexible",
                        value: .31
                    }
                },
                Width: {
                    2: {
                        name: "2m",
                        value: 2
                    },
                    1.5: {
                        name: "1.5m",
                        value: 1.5
                    },
                    1: {
                        name: "1m",
                        value: 1
                    },
                    "-1": {
                        name: "Any width (no value set)",
                        value: -1
                    }
                }
            },
            hgvParams: {
                length: {
                    min: 2,
                    max: 15,
                    value: "length"
                },
                height: {
                    min: 2,
                    max: 5,
                    value: "height"
                },
                width: {
                    min: 2,
                    max: 5,
                    value: "width"
                },
                hgvWeight: {
                    min: 1,
                    max: 100,
                    value: "weight"
                },
                axleload: {
                    min: 1,
                    max: 100,
                    value: "axleload"
                }
            },
            green: {
                min: .1,
                max: 1
            },
            quiet: {
                min: .1,
                max: 1
            }
        },
        isochroneOptionList: {
            methodOptions: {
                TIME: {
                    id: 0,
                    name: "Time"
                },
                DISTANCE: {
                    id: 1,
                    name: "Distance"
                }
            },
            reverseFlow: {
                start: "start",
                destination: "destination"
            },
            valueOptions: {
                min: 1,
                max: 100,
                step: 1,
                default: 30
            },
            intervalOptions: {
                min: 1,
                step: 1,
                default: 15
            },
            velocities: {
                Pedestrian: 5,
                Car: 100,
                Bicycle: 20,
                Wheelchair: 5,
                HeavyVehicle: 80
            }
        },
        userOptions: {
            languages: {
                default: "en-US",
                all: ["de-DE", "en-US", "en-GB", "zh-CN", "pt-PT", "es-ES", "ru-RU", "fr-FR", "pl-PL", "it-IT"]
            },
            routinglanguages: {
                default: "en-US",
                all: ["de", "en-US", "pt", "gr", "ru", "hu", "fr", "it", "nl", "zh-CN", "es"]
            },
            units: {
                default: "km",
                km: "km",
                mi: "mi"
            },
            randomIsoColor: {
                default: false
            },
            distanceMarkers: {
                default: false
            }
        },
        permalinkFilters: {
            avoidables: ["ferry", "fords", "steps", "highways", "tollroads"],
            analysis: ["method", "isovalue", "isointerval", "reverseflow"],
            Car: ["type", "weight", "maxspeed"],
            hgv: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            goods: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            bus: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            agricultural: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            forestry: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            delivery: ["type", "weight", "maxspeed", "height", "width", "length", "hgvWeight", "axleload", "hazmat"],
            Bicycle: ["type", "weight"],
            BicycleSafety: ["type", "weight"],
            BicycleMTB: ["type", "weight"],
            BicycleRacer: ["type", "weight"],
            BicycleElectro: ["type", "weight"],
            BicycleTour: ["type", "weight"],
            Pedestrian: ["type", "weight", "green"],
            PedestrianHiking: ["type", "weight", "green"],
            Wheelchair: ["type", "weight", "incline", "curb", "surface", "wheelchairWidth"]
        },
        permalinkKeys: {
            wps: "a",
            type: "b",
            weight: "c",
            hgvWeight: "f1",
            width: "f2",
            height: "f3",
            axleload: "f4",
            length: "f5",
            hazmat: "f6",
            surface: "h1",
            incline: "h2",
            curb: "h3",
            wheelchairWidth: "h4",
            method: "i",
            isovalue: "j1",
            isointerval: "j2",
            reverseflow: "j3",
            routinglang: "k1",
            units: "k2",
            ferry: "l1",
            fords: "l4",
            highways: "l5",
            tollroads: "l6",
            green: "m1",
            lat: "n1",
            lng: "n2",
            zoom: "n3",
            all: "o1",
            controlled: "o2",
            country: "o3"
        },
        reversePermalinkKeys: function(obj) {
            var rev = {};
            for (var key in obj) {
                rev[obj[key]] = key
            }
            return rev
        },
        layers: {
            0: "layerRoutePoints",
            1: "layerRouteLines",
            2: "layerEmph",
            3: "layerAccessibilityAnalysis",
            4: "layerTracks",
            5: "layerAccessibilityAnalysisNumberedMarkers",
            6: "layerRouteNumberedMarkers",
            7: "layerRouteExtras",
            8: "layerLocations",
            9: "layerRouteDrag",
            10: "layerLandmarks",
            11: "layerLandmarksEmph"
        },
        layerStyles: {
            route: function() {
                return {
                    color: "#b5152b",
                    weight: 5,
                    opacity: 1
                }
            },
            routePadding: function() {
                return {
                    color: "#fff",
                    weight: 9,
                    opacity: 1
                }
            },
            routeHovering: function() {
                return {
                    color: "#FFF",
                    weight: 50,
                    opacity: 0
                }
            },
            routeEmph: function() {
                return {
                    color: "#FFF",
                    weight: 3,
                    opacity: 1
                }
            },
            isochroneEmph: function() {
                return {
                    color: "#FFF",
                    weight: 3,
                    opacity: 1
                }
            },
            track: function() {
                return {
                    color: this.get_random_color(),
                    weight: 3,
                    opacity: 1
                }
            },
            trackPadding: function() {
                return {
                    color: "#FFF",
                    weight: 6,
                    opacity: 1
                }
            },
            hoverPoint: function() {
                return {
                    radius: 5,
                    weight: 2,
                    color: "#000",
                    fillColor: "#FFF",
                    fillOpacity: 1,
                    draggable: "true"
                }
            },
            rand: function(min, max) {
                return parseInt(Math.random() * (max - min + 1), 10) + min
            },
            get_random_color: function() {
                var h = this.rand(150, 250);
                var s = this.rand(30, 100);
                var l = this.rand(20, 70);
                return "hsl(" + h + "," + s + "%," + l + "%)"
            },
            getStyle: function(c, w, o) {
                return {
                    color: c,
                    weight: w,
                    opacity: o
                }
            },
            boundary: function() {
                return {
                    color: "#cf5f5f",
                    weight: 10,
                    opacity: 1,
                    fillOpacity: 0
                }
            }
        },
        isochronesColorsRanges: [360, 300, 240, 180, 120, 60],
        errors: {
            CONNECTION: {
                translate: "CONNECTION",
                color: -1
            },
            GEOCODE: {
                translate: "GEOCODE",
                color: 0
            },
            ROUTE: {
                translate: "ROUTE",
                color: 0
            },
            GENERALERROR: {
                translate: "GENERALERROR",
                color: 1
            }
        },
        avoidFlags: {
            Highways: 1,
            Tollways: 2,
            Steps: 2,
            Ferries: 4,
            UnpavedRoads: 8,
            Tracks: 16,
            Tunnels: 32,
            PavedRoads: 64,
            Fords: 128
        },
        locations_icons: {
            100: '<i class="fa fa-hotel"></i>',
            120: '<i class="fa fa-paw"></i>',
            130: '<i class="fa fa-lg fa-paint-brush"></i>',
            150: '<i class="fa fa-lg fa-university"></i>',
            160: '<i class="fa fa-lg fa-building"></i>',
            190: '<i class="fa fa-lg fa-dollar"></i>',
            200: '<i class="fa fa-lg fa-hospital-o"></i>',
            220: '<i class="fa fa-lg fa-fort-awesome"></i>',
            260: '<i class="fa fa-lg fa-film"></i>',
            330: '<i class="fa fa-lg fa-tree"></i>',
            360: '<i class="fa fa-lg fa-map-signs"></i>',
            390: '<i class="fa fa-lg fa-camera"></i>',
            420: '<i class="fa fa-lg fa-shopping-cart"></i>',
            560: '<i class="fa fa-lg fa-cutlery"></i>',
            580: '<i class="fa fa-lg fa-bus"></i>',
            620: '<i class="fa fa-lg fa-suitcase"></i>',
            phone: '<i class="fa fa-phone"></i>',
            address: '<i class="fa fa-address-card"></i>',
            website: '<i class="fa fa-globe"></i>',
            wheelchair: '<i class="fa fa-wheelchair-alt"></i>'
        },
        landmark_icons: {
            arts_centre: '<i class="fa fa-stack-1x fa-paint-brush"></i>',
            artwork: '<i class="fa fa-stack-1x fa-paint-brush"></i>',
            attraction: '<i class="fa fa-stack-1x fa-camera"></i>',
            bank: '<i class="fa fa-stack-1x fa-dollar"></i>',
            bar: '<i class="fa fa-stack-1x fa-glass"</i>>',
            cafe: '<i class="fa fa-stack-1x fa-coffee icon"></i>',
            clock: '<i class="fa fa-stack-1x fa-clock-o"></i>',
            courthouse: '<i class="fa fa-stack-1x fa-legal"></i>',
            embassy: '<i class="fa fa-stack-1x fa-flag"></i>',
            fast_food: '<i class="fa fa-stack-1x fa-cutlery"></i>',
            fuel: '<i class="fa fa-stack-1x fa-car"></i>',
            gallery: '<i class="fa fa-stack-1x fa-photo"></i>',
            hotel: '<i class="fa fa-stack-1x fa-stack-1x fa-hotel"></i>',
            information: '<i class="fa fa-stack-1x fa-info"></i>',
            memorial: '<i class="fa fa-stack-1x fa-institution"></i>',
            monument: '<i class="fa fa-stack-1x fa-institution"></i>',
            museum: '<i class="fa fa-stack-1x fa-institution"></i>',
            park: '<i class="fa fa-stack-1x fa-tree"></i>',
            pharmacy: '<i class="fa fa-stack-1x fa-medkit"></i>',
            pitch: '<i class="fa fa-stack-1x fa-futbol-o"></i>',
            place_of_worship: '<i class="fa fa-stack-1x fa-building"></i>',
            playground: '<i class="fa fa-stack-1x fa-futbol-o"></i>',
            pub: '<i class="fa fa-stack-1x fa-beer"></i>',
            restaurant: '<i class="fa fa-stack-1x fa-cutlery"></i>',
            shop: '<i class="fa fa-stack-1x fa-shopping-bag"></i>',
            sports_centre: '<i class="fa fa-stack-1x fa-futbol-o"></i>',
            station: '<i class="fa fa-stack-1x fa-train"></i>',
            statue: '<i class="fa fa-stack-1x fa-institution"></i>',
            subway_entrance: '<i class="fa fa-stack-1x fa-subway"></i>',
            swimming_pool: '<i class="fa fa-stack-1x fa-dollar-o"></i>',
            theatre: '<i class="fa fa-stack-1x fa-ticket"></i>',
            town_hall: '<i class="fa fa-stack-1x fa-institution"></i>',
            traffic_signals: '<i class="fa fa-stack-1x fa-car"></i>',
            tram_stop: '<i class="fa fa-stack-1x fa-bus"></i>'
        },
        boundary: {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                id: "DEU",
                properties: {
                    name: "Germany"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [9.921906, 54.983104],
                            [9.93958, 54.596642],
                            [10.950112, 54.363607],
                            [10.939467, 54.008693],
                            [11.956252, 54.196486],
                            [12.51844, 54.470371],
                            [13.647467, 54.075511],
                            [14.119686, 53.757029],
                            [14.353315, 53.248171],
                            [14.074521, 52.981263],
                            [14.4376, 52.62485],
                            [14.685026, 52.089947],
                            [14.607098, 51.745188],
                            [15.016996, 51.106674],
                            [14.570718, 51.002339],
                            [14.307013, 51.117268],
                            [14.056228, 50.926918],
                            [13.338132, 50.733234],
                            [12.966837, 50.484076],
                            [12.240111, 50.266338],
                            [12.415191, 49.969121],
                            [12.521024, 49.547415],
                            [13.031329, 49.307068],
                            [13.595946, 48.877172],
                            [13.243357, 48.416115],
                            [12.884103, 48.289146],
                            [13.025851, 47.637584],
                            [12.932627, 47.467646],
                            [12.62076, 47.672388],
                            [12.141357, 47.703083],
                            [11.426414, 47.523766],
                            [10.544504, 47.566399],
                            [10.402084, 47.302488],
                            [9.896068, 47.580197],
                            [9.594226, 47.525058],
                            [8.522612, 47.830828],
                            [8.317301, 47.61358],
                            [7.466759, 47.620582],
                            [7.593676, 48.333019],
                            [8.099279, 49.017784],
                            [6.65823, 49.201958],
                            [6.18632, 49.463803],
                            [6.242751, 49.902226],
                            [6.043073, 50.128052],
                            [6.156658, 50.803721],
                            [5.988658, 51.851616],
                            [6.589397, 51.852029],
                            [6.84287, 52.22844],
                            [7.092053, 53.144043],
                            [6.90514, 53.482162],
                            [7.100425, 53.693932],
                            [7.936239, 53.748296],
                            [8.121706, 53.527792],
                            [8.800734, 54.020786],
                            [8.572118, 54.395646],
                            [8.526229, 54.962744],
                            [9.282049, 54.830865],
                            [9.921906, 54.983104]
                        ]
                    ]
                }
            }]
        },
        measure_locale: {
            "de-DE": "de",
            "en-US": "en",
            "en-GB": "en_UK",
            "zh-CN": "cn",
            "pt-PT": "pt_PT",
            "es-ES": "es",
            "ru-RU": "ru",
            "fr-FR": "fr",
            "pl-PL": "pl"
        }
    });
    return {}
}();
var $__build_47_constants_47_countries_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/countries.js";
    angular.module("orsApp").constant("countries", {
        list: [{
            "en-GB": "Afghanistan",
            official_en_name: "Islamic Republic of Afghanistan",
            cid: "1",
            native_names: "Owganystan, Afghanistan, افغانستان",
            "ru-RU": "Афганистан",
            "en-US": "Afghanistan",
            id: 0,
            "zh-CN": "阿富汗",
            "de-DE": "Afghanistan",
            "fr-FR": "Afghanistan",
            country_code: "AFG",
            "es-ES": "Afganistán",
            "pt-PT": "Afeganistão"
        }, {
            "en-GB": "Albania",
            official_en_name: "Republic of Albania",
            cid: "2",
            native_names: "Shqipëria, Albania",
            "ru-RU": "Албания",
            "en-US": "Albania",
            id: 1,
            "zh-CN": "阿尔巴尼亚",
            "de-DE": "Albanien",
            "fr-FR": "Albanie",
            country_code: "ALB",
            "es-ES": "Albania",
            "pt-PT": "Albânia"
        }, {
            "en-GB": "Algeria",
            official_en_name: "People's Democratic Republic of Algeria",
            cid: "3",
            native_names: "الجزائر, Algeria",
            "ru-RU": "Алжир",
            "en-US": "Algeria",
            id: 2,
            "zh-CN": "阿尔及利亚",
            "de-DE": "Algerien",
            "fr-FR": "Algérie",
            country_code: "DZA",
            "es-ES": "Argelia",
            "pt-PT": "Argélia"
        }, {
            "en-GB": "Andorra",
            official_en_name: "Principality of Andorra",
            cid: "4",
            native_names: "Andorra",
            "ru-RU": "Андорра",
            "en-US": "Andorra",
            id: 3,
            "zh-CN": "安道尔",
            "de-DE": "Andorra",
            "fr-FR": "Andorre",
            country_code: "AND",
            "es-ES": "Andorra",
            "pt-PT": "Andorra"
        }, {
            "en-GB": "Angola",
            official_en_name: "Republic of Angola",
            cid: "5",
            native_names: "Angola",
            "ru-RU": "Ангола",
            "en-US": "Angola",
            id: 4,
            "zh-CN": "安哥拉",
            "de-DE": "Angola",
            "fr-FR": "Angola",
            country_code: "AGO",
            "es-ES": "Angola",
            "pt-PT": "Angola"
        }, {
            "en-GB": "Anguilla",
            official_en_name: "Anguilla",
            "zh-CN": "安圭拉",
            native_names: "Anguilla",
            "ru-RU": "Ангилья",
            "en-US": "Anguilla",
            "pt-PT": "Anguilla",
            "de-DE": "Anguilla",
            cid: "6",
            "fr-FR": "Anguilla",
            country_code: "AIA",
            "es-ES": "Anguilla",
            id: 5
        }, {
            "en-GB": "Antigua and Barbuda",
            official_en_name: "Antigua and Barbuda",
            cid: "7",
            native_names: "Antigua and Barbuda",
            "ru-RU": "Антигуа и Барбуда",
            "en-US": "Antigua and Barbuda",
            id: 6,
            "zh-CN": "安提瓜和巴布达",
            "de-DE": "Antigua und Barbuda",
            "fr-FR": "Antigua-et-Barbuda",
            country_code: "ATG",
            "es-ES": "Antigua y Barbuda",
            "pt-PT": "Antígua e Barbuda"
        }, {
            "en-GB": "Argentina",
            official_en_name: "Argentine Republic",
            cid: "8",
            native_names: "Argentina",
            "ru-RU": "Аргентина",
            "en-US": "Argentina",
            id: 7,
            "zh-CN": "阿� �廷",
            "de-DE": "Argentinien",
            "fr-FR": "Argentine",
            country_code: "ARG",
            "es-ES": "Argentina",
            "pt-PT": "Argentina"
        }, {
            "en-GB": "Armenia",
            official_en_name: "Republic of Armenia",
            cid: "9",
            native_names: "Հայաստան, Armenia",
            "ru-RU": "Армения",
            "en-US": "Armenia",
            id: 8,
            "zh-CN": "亚美尼亚",
            "de-DE": "Armenien",
            "fr-FR": "Arménie",
            country_code: "ARM",
            "es-ES": "Armenia",
            "pt-PT": "Arménia"
        }, {
            "en-GB": "Australia",
            official_en_name: "Commonwealth of Australia",
            cid: "10",
            native_names: "Australia",
            "ru-RU": "Австралия",
            "en-US": "Australia",
            id: 9,
            "zh-CN": "澳大利亚",
            "de-DE": "Australien",
            "fr-FR": "Australie",
            country_code: "AUS",
            "es-ES": "Australia",
            "pt-PT": "Austrália"
        }, {
            "en-GB": "Austria",
            official_en_name: "Republic of Austria",
            cid: "11",
            native_names: "Österreich, Austria",
            "ru-RU": "Австрия",
            "en-US": "Austria",
            id: 10,
            "zh-CN": "奥地利",
            "de-DE": "Österreich",
            "fr-FR": "Autriche",
            country_code: "AUT",
            "es-ES": "Austria",
            "pt-PT": "Áustria"
        }, {
            "en-GB": "Azerbaijan",
            official_en_name: "Republic of Azerbaijan",
            cid: "12",
            native_names: "Азербайджан, Azerbaijan, Azərbaycan",
            "ru-RU": "Азербайджан",
            "en-US": "Azerbaijan",
            id: 11,
            "zh-CN": "阿塞拜疆",
            "de-DE": "Aserbaidschan",
            "fr-FR": "Azerbaïdjan",
            country_code: "AZE",
            "es-ES": "Azerbaiyán",
            "pt-PT": "Azerbeijão"
        }, {
            "en-GB": "Bahrain",
            official_en_name: "Kingdom of Bahrain",
            cid: "13",
            native_names: "‏البحرين, Bahrain",
            "ru-RU": "Бахрейн",
            "en-US": "Bahrain",
            id: 12,
            "zh-CN": "巴林",
            "de-DE": "Bahrain",
            "fr-FR": "Bahreïn",
            country_code: "BHR",
            "es-ES": "Bahrein",
            "pt-PT": "Bahrein"
        }, {
            "en-GB": "Bangladesh",
            official_en_name: "People's Republic of Bangladesh",
            cid: "14",
            native_names: "বাংলাদেশ, Bangladesh",
            "ru-RU": "Бангладеш",
            "en-US": "Bangladesh",
            id: 13,
            "zh-CN": "孟� 拉国",
            "de-DE": "Bangladesch",
            "fr-FR": "Bangladesh",
            country_code: "BGD",
            "es-ES": "Bangladesh",
            "pt-PT": "Bangladesh"
        }, {
            "en-GB": "Barbados",
            official_en_name: "Barbados",
            cid: "15",
            native_names: "Barbados",
            "ru-RU": "Барбадос",
            "en-US": "Barbados",
            id: 14,
            "zh-CN": "巴巴多斯",
            "de-DE": "Barbados",
            "fr-FR": "Barbade",
            country_code: "BRB",
            "es-ES": "Barbados",
            "pt-PT": "Barbados"
        }, {
            "en-GB": "Belarus",
            official_en_name: "Republic of Belarus",
            cid: "16",
            native_names: "Беларусь, Belarus, Белару́сь",
            "ru-RU": "Беларусь",
            "en-US": "Belarus",
            id: 15,
            "zh-CN": "白俄罗斯",
            "de-DE": "Weißrussland",
            "fr-FR": "Biélorussie",
            country_code: "BLR",
            "es-ES": "Bielorrusia",
            "pt-PT": "Bielorússia"
        }, {
            "en-GB": "Belgium",
            official_en_name: "Kingdom of Belgium",
            cid: "17",
            native_names: "Belgique, Belgium, Belgien, België",
            "ru-RU": "Бельгия",
            "en-US": "Belgium",
            id: 16,
            "zh-CN": "比利时",
            "de-DE": "Belgien",
            "fr-FR": "Belgique",
            country_code: "BEL",
            "es-ES": "Bélgica",
            "pt-PT": "Bélgica"
        }, {
            "en-GB": "Belize",
            official_en_name: "Belize",
            cid: "18",
            native_names: "Belice, Belize",
            "ru-RU": "Белиз",
            "en-US": "Belize",
            id: 17,
            "zh-CN": "伯利兹",
            "de-DE": "Belize",
            "fr-FR": "Belize",
            country_code: "BLZ",
            "es-ES": "Belice",
            "pt-PT": "Belize"
        }, {
            "en-GB": "Benin",
            official_en_name: "Republic of Benin",
            cid: "19",
            native_names: "Bénin, Benin",
            "ru-RU": "Бенин",
            "en-US": "Benin",
            id: 18,
            "zh-CN": "贝宁",
            "de-DE": "Benin",
            "fr-FR": "Bénin",
            country_code: "BEN",
            "es-ES": "Benín",
            "pt-PT": "Benin"
        }, {
            "en-GB": "Bermuda",
            official_en_name: "Bermuda",
            cid: "20",
            native_names: "Bermuda",
            "ru-RU": "Бермудские Острова",
            "en-US": "Bermuda",
            id: 19,
            "zh-CN": "百慕大",
            "de-DE": "Bermuda",
            "fr-FR": "Bermudes",
            country_code: "BMU",
            "es-ES": "Bermudas",
            "pt-PT": "Bermudas"
        }, {
            "en-GB": "Bhutan",
            official_en_name: "Kingdom of Bhutan",
            cid: "21",
            native_names: "� བྲུག་ཡུལ་, Bhutan",
            "ru-RU": "Бутан",
            "en-US": "Bhutan",
            id: 20,
            "zh-CN": "不丹",
            "de-DE": "Bhutan",
            "fr-FR": "Bhoutan",
            country_code: "BTN",
            "es-ES": "Bután",
            "pt-PT": "Butão"
        }, {
            "en-GB": "Bolivia",
            official_en_name: "Plurinational State of Bolivia",
            cid: "22",
            native_names: "Wuliwya, Bolivia, Volívia, Buliwya",
            "ru-RU": "Боливия",
            "en-US": "Bolivia",
            id: 21,
            "zh-CN": "玻利维亚",
            "de-DE": "Bolivien",
            "fr-FR": "Bolivie",
            country_code: "BOL",
            "es-ES": "Bolivia",
            "pt-PT": "Bolívia"
        }, {
            "en-GB": "Bosnia and Herzegovina",
            official_en_name: "Bosnia and Herzegovina",
            cid: "23",
            native_names: "Bosna i Hercegovina, Bosnia and Herzegovina, Боснa и Херцеговина",
            "ru-RU": "Босния и Герцеговина",
            "en-US": "Bosnia and Herzegovina",
            id: 22,
            "zh-CN": "波斯尼亚和黑塞哥维那",
            "de-DE": "Bosnien und Herzegowina",
            "fr-FR": "Bosnie-Herzégovine",
            country_code: "BIH",
            "es-ES": "Bosnia y Herzegovina",
            "pt-PT": "Bósnia e Herzegovina"
        }, {
            "en-GB": "Botswana",
            official_en_name: "Republic of Botswana",
            "zh-CN": "博茨瓦纳",
            native_names: "Botswana",
            "ru-RU": "Ботсвана",
            "en-US": "Botswana",
            "pt-PT": "Botswana",
            "de-DE": "Botswana",
            cid: "24",
            "fr-FR": "Botswana",
            country_code: "BWA",
            "es-ES": "Botswana",
            id: 23
        }, {
            "en-GB": "Brazil",
            official_en_name: "Federative Republic of Brazil",
            cid: "25",
            native_names: "Brasil, Brazil",
            "ru-RU": "Бразилия",
            "en-US": "Brazil",
            id: 24,
            "zh-CN": "巴西",
            "de-DE": "Brasilien",
            "fr-FR": "Brésil",
            country_code: "BRA",
            "es-ES": "Brasil",
            "pt-PT": "Brasil"
        }, {
            "en-GB": "British Indian Ocean Territory",
            official_en_name: "British Indian Ocean Territory",
            cid: "26",
            native_names: "British Indian Ocean Territory",
            "ru-RU": "Британская территория в Индийском океане",
            "en-US": "British Indian Ocean Territory",
            id: 25,
            "zh-CN": "英属印度洋领地",
            "de-DE": "Britisches Territorium im Indischen Ozean",
            "fr-FR": "Territoire britannique de l'océan Indien",
            country_code: "IOT",
            "es-ES": "Territorio Británico del Océano Índico",
            "pt-PT": "Território Britânico do Oceano Índico"
        }, {
            "en-GB": "British Virgin Islands",
            official_en_name: "Virgin Islands",
            "zh-CN": "英属维尔京群岛",
            native_names: "British Virgin Islands",
            "ru-RU": "Британские Виргинские острова",
            "en-US": "British Virgin Islands",
            "pt-PT": "Ilhas Virgens",
            "de-DE": "Britische Jungferninseln",
            cid: "28",
            "fr-FR": "Îles Vierges britanniques",
            country_code: "VGB",
            "es-ES": "Islas Vírgenes del Reino Unido",
            id: 26
        }, {
            "en-GB": "Brunei",
            official_en_name: "Nation of Brunei, Abode of Peace",
            cid: "29",
            native_names: "Negara Brunei Darussalam",
            "ru-RU": "Бруней",
            "en-US": "Brunei",
            id: 27,
            "zh-CN": "文莱",
            "de-DE": "Brunei",
            "fr-FR": "Brunei",
            country_code: "BRN",
            "es-ES": "Brunei",
            "pt-PT": "Brunei"
        }, {
            "en-GB": "Bulgaria",
            official_en_name: "Republic of Bulgaria",
            cid: "30",
            native_names: "България, Bulgaria",
            "ru-RU": "Болгария",
            "en-US": "Bulgaria",
            id: 28,
            "zh-CN": "保� 利亚",
            "de-DE": "Bulgarien",
            "fr-FR": "Bulgarie",
            country_code: "BGR",
            "es-ES": "Bulgaria",
            "pt-PT": "Bulgária"
        }, {
            "en-GB": "Burkina Faso",
            official_en_name: "Burkina Faso",
            cid: "31",
            native_names: "Burkina Faso",
            "ru-RU": "Буркина-Фасо",
            "en-US": "Burkina Faso",
            id: 29,
            "zh-CN": "布基纳法索",
            "de-DE": "Burkina Faso",
            "fr-FR": "Burkina Faso",
            country_code: "BFA",
            "es-ES": "Burkina Faso",
            "pt-PT": "Burkina Faso"
        }, {
            "en-GB": "Burundi",
            official_en_name: "Republic of Burundi",
            cid: "32",
            native_names: "Burundi, Uburundi",
            "ru-RU": "Бурунди",
            "en-US": "Burundi",
            id: 30,
            "zh-CN": "布隆迪",
            "de-DE": "Burundi",
            "fr-FR": "Burundi",
            country_code: "BDI",
            "es-ES": "Burundi",
            "pt-PT": "Burundi"
        }, {
            "en-GB": "Cambodia",
            official_en_name: "Kingdom of Cambodia",
            cid: "33",
            native_names: "Kâmpŭchéa, Cambodia",
            "ru-RU": "Камбоджа",
            "en-US": "Cambodia",
            id: 31,
            "zh-CN": "柬埔寨",
            "de-DE": "Kambodscha",
            "fr-FR": "Cambodge",
            country_code: "KHM",
            "es-ES": "Camboya",
            "pt-PT": "Camboja"
        }, {
            "en-GB": "Cameroon",
            official_en_name: "Republic of Cameroon",
            cid: "34",
            native_names: "Cameroun, Cameroon",
            "ru-RU": "Камерун",
            "en-US": "Cameroon",
            id: 32,
            "zh-CN": "喀麦隆",
            "de-DE": "Kamerun",
            "fr-FR": "Cameroun",
            country_code: "CMR",
            "es-ES": "Camerún",
            "pt-PT": "Camarões"
        }, {
            "en-GB": "Canada",
            official_en_name: "Canada",
            cid: "35",
            native_names: "Canada",
            "ru-RU": "Канада",
            "en-US": "Canada",
            id: 33,
            "zh-CN": "� 拿大",
            "de-DE": "Kanada",
            "fr-FR": "Canada",
            country_code: "CAN",
            "es-ES": "Canadá",
            "pt-PT": "Canadá"
        }, {
            "en-GB": "Cape Verde",
            official_en_name: "Republic of Cabo Verde",
            cid: "36",
            native_names: "Cabo Verde, Cape Verde",
            "ru-RU": "Кабо-Верде",
            "en-US": "Cape Verde",
            id: 34,
            "zh-CN": "佛得角",
            "de-DE": "Kap Verde",
            "fr-FR": "Îles du Cap-Vert",
            country_code: "CPV",
            "es-ES": "Cabo Verde",
            "pt-PT": "Cabo Verde"
        }, {
            "en-GB": "Cayman Islands",
            official_en_name: "Cayman Islands",
            cid: "37",
            native_names: "Cayman Islands",
            "ru-RU": "Каймановы острова",
            "en-US": "Cayman Islands",
            id: 35,
            "zh-CN": "开曼群岛",
            "de-DE": "Kaimaninseln",
            "fr-FR": "Îles Caïmans",
            country_code: "CYM",
            "es-ES": "Islas Caimán",
            "pt-PT": "Ilhas Caimão"
        }, {
            "en-GB": "Central African Republic",
            official_en_name: "Central African Republic",
            cid: "38",
            native_names: "République centrafricaine, Central African Republic, Bêafrîka",
            "ru-RU": "Центральноафриканская � еспублика",
            "en-US": "Central African Republic",
            id: 36,
            "zh-CN": "中非共和国",
            "de-DE": "Zentralafrikanische Republik",
            "fr-FR": "République centrafricaine",
            country_code: "CAF",
            "es-ES": "República Centroafricana",
            "pt-PT": "República Centro-Africana"
        }, {
            "en-GB": "Chad",
            official_en_name: "Republic of Chad",
            cid: "39",
            native_names: "تشاد‎, Chad, Tchad",
            "ru-RU": "Чад",
            "en-US": "Chad",
            id: 37,
            "zh-CN": "乍得",
            "de-DE": "Tschad",
            "fr-FR": "Tchad",
            country_code: "TCD",
            "es-ES": "Chad",
            "pt-PT": "Chade"
        }, {
            "en-GB": "Chile",
            official_en_name: "Republic of Chile",
            cid: "40",
            native_names: "Chile",
            "ru-RU": "Чили",
            "en-US": "Chile",
            id: 38,
            "zh-CN": "智利",
            "de-DE": "Chile",
            "fr-FR": "Chili",
            country_code: "CHL",
            "es-ES": "Chile",
            "pt-PT": "Chile"
        }, {
            "en-GB": "China",
            official_en_name: "People's Republic of China",
            cid: "41",
            native_names: "中国, China",
            "ru-RU": "Китай",
            "en-US": "China",
            "pt-PT": "China",
            "de-DE": "China",
            "fr-FR": "Chine",
            country_code: "CHN",
            "es-ES": "China",
            id: 39
        }, {
            "en-GB": "Colombia",
            official_en_name: "Republic of Colombia",
            cid: "42",
            native_names: "Colombia",
            "ru-RU": "Колумбия",
            "en-US": "Colombia",
            id: 40,
            "zh-CN": "哥伦比亚",
            "de-DE": "Kolumbien",
            "fr-FR": "Colombie",
            country_code: "COL",
            "es-ES": "Colombia",
            "pt-PT": "Colômbia"
        }, {
            "en-GB": "Comoros",
            official_en_name: "Union of the Comoros",
            cid: "43",
            native_names: "القمر‎, Comoros, Comores, Komori",
            "ru-RU": "Коморы",
            "en-US": "Comoros",
            id: 41,
            "zh-CN": "科摩罗",
            "de-DE": "Union der Komoren",
            "fr-FR": "Comores",
            country_code: "COM",
            "es-ES": "Comoras",
            "pt-PT": "Comores"
        }, {
            "en-GB": "Republic of the Congo",
            official_en_name: "Republic of the Congo",
            cid: "44",
            native_names: "République du Congo, Republic of the Congo, Republíki ya Kongó, Repubilika ya Kongo",
            "ru-RU": "� еспублика Конго",
            "en-US": "Republic of the Congo",
            id: 42,
            "zh-CN": "刚果",
            "de-DE": "Kongo",
            "fr-FR": "Congo",
            country_code: "COG",
            "es-ES": "Congo",
            "pt-PT": "Congo"
        }, {
            "en-GB": "DR Congo",
            official_en_name: "Democratic Republic of the Congo",
            cid: "45",
            native_names: "Jamhuri ya Kidemokrasia ya Kongo, DR Congo, Ditunga dia Kongu wa Mungalaata, RD Congo, Republiki ya Kongó Demokratiki, Repubilika ya Kongo Demokratiki",
            "ru-RU": "Демократическая � еспублика Конго",
            "en-US": "DR Congo",
            id: 43,
            "zh-CN": "民主刚果",
            "de-DE": "Kongo (Dem. Rep.)",
            "fr-FR": "Congo (Rép. dém.)",
            country_code: "COD",
            "es-ES": "Congo (Rep. Dem.)",
            "pt-PT": "República Democrática do Congo"
        }, {
            "en-GB": "Cook Islands",
            official_en_name: "Cook Islands",
            cid: "46",
            native_names: "Kūki 'Āirani, Cook Islands",
            "ru-RU": "Острова Кука",
            "en-US": "Cook Islands",
            id: 44,
            "zh-CN": "库克群岛",
            "de-DE": "Cookinseln",
            "fr-FR": "Îles Cook",
            country_code: "COK",
            "es-ES": "Islas Cook",
            "pt-PT": "Ilhas Cook"
        }, {
            "en-GB": "Costa Rica",
            official_en_name: "Republic of Costa Rica",
            cid: "47",
            native_names: "Costa Rica",
            "ru-RU": "Коста-� ика",
            "en-US": "Costa Rica",
            id: 45,
            "zh-CN": "哥斯达黎� ",
            "de-DE": "Costa Rica",
            "fr-FR": "Costa Rica",
            country_code: "CRI",
            "es-ES": "Costa Rica",
            "pt-PT": "Costa Rica"
        }, {
            "en-GB": "Ivory Coast",
            official_en_name: "Republic of Côte d'Ivoire",
            "zh-CN": "科特迪瓦",
            native_names: "Côte d'Ivoire, Ivory Coast",
            "ru-RU": "Кот-д’Ивуар",
            "en-US": "Ivory Coast",
            "pt-PT": "Costa do Marfim",
            "de-DE": "Elfenbeinküste",
            cid: "48",
            "fr-FR": "Côte d'Ivoire",
            country_code: "CIV",
            "es-ES": "Costa de Marfil",
            id: 46
        }, {
            "en-GB": "Croatia",
            official_en_name: "Republic of Croatia",
            cid: "49",
            native_names: "Hrvatska, Croatia",
            "ru-RU": "Хорватия",
            "en-US": "Croatia",
            id: 47,
            "zh-CN": "克罗地亚",
            "de-DE": "Kroatien",
            "fr-FR": "Croatie",
            country_code: "HRV",
            "es-ES": "Croacia",
            "pt-PT": "Croácia"
        }, {
            "en-GB": "Cuba",
            official_en_name: "Republic of Cuba",
            cid: "50",
            native_names: "Cuba",
            "ru-RU": "Куба",
            "en-US": "Cuba",
            id: 48,
            "zh-CN": "古巴",
            "de-DE": "Kuba",
            "fr-FR": "Cuba",
            country_code: "CUB",
            "es-ES": "Cuba",
            "pt-PT": "Cuba"
        }, {
            "en-GB": "Cyprus",
            official_en_name: "Republic of Cyprus",
            cid: "51",
            native_names: "Kıbrıs, Cyprus, Κύπρος",
            "ru-RU": "Кипр",
            "en-US": "Cyprus",
            id: 49,
            "zh-CN": "塞浦路斯",
            "de-DE": "Zypern",
            "fr-FR": "Chypre",
            country_code: "CYP",
            "es-ES": "Chipre",
            "pt-PT": "Chipre"
        }, {
            "en-GB": "Czechia",
            official_en_name: "Czech Republic",
            cid: "52",
            native_names: "Česko, Czechia",
            "ru-RU": "Чехия",
            "en-US": "Czechia",
            id: 50,
            "zh-CN": "捷克",
            "de-DE": "Tschechien",
            "fr-FR": "Tchéquie",
            country_code: "CZE",
            "es-ES": "Chequia",
            "pt-PT": "Chéquia"
        }, {
            "en-GB": "Denmark",
            official_en_name: "Kingdom of Denmark",
            cid: "53",
            native_names: "Danmark, Denmark",
            "ru-RU": "Дания",
            "en-US": "Denmark",
            id: 51,
            "zh-CN": "丹麦",
            "de-DE": "Dänemark",
            "fr-FR": "Danemark",
            country_code: "DNK",
            "es-ES": "Dinamarca",
            "pt-PT": "Dinamarca"
        }, {
            "en-GB": "Djibouti",
            official_en_name: "Republic of Djibouti",
            cid: "54",
            native_names: "جيبوتي‎, Djibouti",
            "ru-RU": "Джибути",
            "en-US": "Djibouti",
            id: 52,
            "zh-CN": "吉布提",
            "de-DE": "Dschibuti",
            "fr-FR": "Djibouti",
            country_code: "DJI",
            "es-ES": "Djibouti",
            "pt-PT": "Djibouti"
        }, {
            "en-GB": "Dominica",
            official_en_name: "Commonwealth of Dominica",
            cid: "55",
            native_names: "Dominica",
            "ru-RU": "Доминика",
            "en-US": "Dominica",
            id: 53,
            "zh-CN": "多米尼� ",
            "de-DE": "Dominica",
            "fr-FR": "Dominique",
            country_code: "DMA",
            "es-ES": "Dominica",
            "pt-PT": "Dominica"
        }, {
            "en-GB": "Dominican Republic",
            official_en_name: "Dominican Republic",
            cid: "56",
            native_names: "República Dominicana, Dominican Republic",
            "ru-RU": "Доминиканская � еспублика",
            "en-US": "Dominican Republic",
            id: 54,
            "zh-CN": "多明尼� ",
            "de-DE": "Dominikanische Republik",
            "fr-FR": "République dominicaine",
            country_code: "DOM",
            "es-ES": "República Dominicana",
            "pt-PT": "República Dominicana"
        }, {
            "en-GB": "Timor-Leste",
            official_en_name: "Democratic Republic of Timor-Leste",
            "zh-CN": "东帝汶",
            native_names: "Timór-Leste, Timor-Leste",
            "ru-RU": "Восточный Тимор",
            "en-US": "Timor-Leste",
            "pt-PT": "Timor-Leste",
            "de-DE": "Timor-Leste",
            cid: "57",
            "fr-FR": "Timor oriental",
            country_code: "TLS",
            "es-ES": "Timor Oriental",
            id: 55
        }, {
            "en-GB": "Ecuador",
            official_en_name: "Republic of Ecuador",
            cid: "58",
            native_names: "Ecuador",
            "ru-RU": "Эквадор",
            "en-US": "Ecuador",
            id: 56,
            "zh-CN": "厄瓜多尔",
            "de-DE": "Ecuador",
            "fr-FR": "Équateur",
            country_code: "ECU",
            "es-ES": "Ecuador",
            "pt-PT": "Equador"
        }, {
            "en-GB": "Egypt",
            official_en_name: "Arab Republic of Egypt",
            cid: "59",
            native_names: "مصر, Egypt",
            "ru-RU": "Египет",
            "en-US": "Egypt",
            id: 57,
            "zh-CN": "埃及",
            "de-DE": "Ägypten",
            "fr-FR": "Égypte",
            country_code: "EGY",
            "es-ES": "Egipto",
            "pt-PT": "Egito"
        }, {
            "en-GB": "El Salvador",
            official_en_name: "Republic of El Salvador",
            cid: "60",
            native_names: "El Salvador",
            "ru-RU": "Сальвадор",
            "en-US": "El Salvador",
            id: 58,
            "zh-CN": "萨尔瓦多",
            "de-DE": "El Salvador",
            "fr-FR": "Salvador",
            country_code: "SLV",
            "es-ES": "El Salvador",
            "pt-PT": "El Salvador"
        }, {
            "en-GB": "Equatorial Guinea",
            official_en_name: "Republic of Equatorial Guinea",
            cid: "61",
            native_names: "Guinea Ecuatorial, Equatorial Guinea, Guinée équatoriale, Guiné Equatorial",
            "ru-RU": "Экваториальная Гвинея",
            "en-US": "Equatorial Guinea",
            id: 59,
            "zh-CN": "赤道� 内亚",
            "de-DE": "Äquatorialguinea",
            "fr-FR": "Guinée équatoriale",
            country_code: "GNQ",
            "es-ES": "Guinea Ecuatorial",
            "pt-PT": "Guiné Equatorial"
        }, {
            "en-GB": "Eritrea",
            official_en_name: "State of Eritrea",
            cid: "62",
            native_names: "إرتريا‎, Eritrea, ኤርትራ",
            "ru-RU": "Эритрея",
            "en-US": "Eritrea",
            id: 60,
            "zh-CN": "厄立特里亚",
            "de-DE": "Eritrea",
            "fr-FR": "Érythrée",
            country_code: "ERI",
            "es-ES": "Eritrea",
            "pt-PT": "Eritreia"
        }, {
            "en-GB": "Estonia",
            official_en_name: "Republic of Estonia",
            cid: "63",
            native_names: "Eesti, Estonia",
            "ru-RU": "Эстония",
            "en-US": "Estonia",
            id: 61,
            "zh-CN": "爱沙尼亚",
            "de-DE": "Estland",
            "fr-FR": "Estonie",
            country_code: "EST",
            "es-ES": "Estonia",
            "pt-PT": "Estónia"
        }, {
            "en-GB": "Ethiopia",
            official_en_name: "Federal Democratic Republic of Ethiopia",
            cid: "64",
            native_names: "ኢትዮጵያ, Ethiopia",
            "ru-RU": "Эфиопия",
            "en-US": "Ethiopia",
            id: 62,
            "zh-CN": "埃塞俄比亚",
            "de-DE": "Äthiopien",
            "fr-FR": "Éthiopie",
            country_code: "ETH",
            "es-ES": "Etiopía",
            "pt-PT": "Etiópia"
        }, {
            "en-GB": "Falkland Islands",
            official_en_name: "Falkland Islands",
            "zh-CN": "福克兰群岛",
            native_names: "Falkland Islands",
            "ru-RU": "Фолклендские острова",
            "en-US": "Falkland Islands",
            "pt-PT": "Ilhas Malvinas",
            "de-DE": "Falklandinseln",
            cid: "65",
            "fr-FR": "Îles Malouines",
            country_code: "FLK",
            "es-ES": "Islas Malvinas",
            id: 63
        }, {
            "en-GB": "Faroe Islands",
            official_en_name: "Faroe Islands",
            "zh-CN": "法罗群岛",
            native_names: "Færøerne, Faroe Islands, Føroyar",
            "ru-RU": "Фарерские острова",
            "en-US": "Faroe Islands",
            "pt-PT": "Ilhas Faroé",
            "de-DE": "Färöer-Inseln",
            cid: "66",
            "fr-FR": "Îles Féroé",
            country_code: "FRO",
            "es-ES": "Islas Faroe",
            id: 64
        }, {
            "en-GB": "Micronesia",
            official_en_name: "Federated States of Micronesia",
            "zh-CN": "密克罗尼西亚",
            native_names: "Micronesia",
            "ru-RU": "Федеративные Штаты Микронезии",
            "en-US": "Micronesia",
            "pt-PT": "Micronésia",
            "de-DE": "Mikronesien",
            cid: "67",
            "fr-FR": "Micronésie",
            country_code: "FSM",
            "es-ES": "Micronesia",
            id: 65
        }, {
            "en-GB": "Fiji",
            official_en_name: "Republic of Fiji",
            "zh-CN": "斐济",
            native_names: "Viti, Fiji, फिजी",
            "ru-RU": "Фиджи",
            "en-US": "Fiji",
            "pt-PT": "Fiji",
            "de-DE": "Fidschi",
            cid: "68",
            "fr-FR": "Fidji",
            country_code: "FJI",
            "es-ES": "Fiyi",
            id: 66
        }, {
            "en-GB": "Finland",
            official_en_name: "Republic of Finland",
            "zh-CN": "芬兰",
            native_names: "Finland, Suomi",
            "ru-RU": "Финляндия",
            "en-US": "Finland",
            "pt-PT": "Finlândia",
            "de-DE": "Finnland",
            cid: "69",
            "fr-FR": "Finlande",
            country_code: "FIN",
            "es-ES": "Finlandia",
            id: 67
        }, {
            "en-GB": "France",
            official_en_name: "French Republic",
            "zh-CN": "法国",
            native_names: "France",
            "ru-RU": "Франция",
            "en-US": "France",
            "pt-PT": "França",
            "de-DE": "Frankreich",
            cid: "70",
            "fr-FR": "France",
            country_code: "FRA",
            "es-ES": "Francia",
            id: 68
        }, {
            "en-GB": "Gabon",
            official_en_name: "Gabonese Republic",
            "zh-CN": "� 蓬",
            native_names: "Gabon",
            "ru-RU": "Габон",
            "en-US": "Gabon",
            "pt-PT": "Gabão",
            "de-DE": "Gabun",
            cid: "71",
            "fr-FR": "Gabon",
            country_code: "GAB",
            "es-ES": "Gabón",
            id: 69
        }, {
            "en-GB": "Gambia",
            official_en_name: "Republic of the Gambia",
            "zh-CN": "冈比亚",
            native_names: "Gambia",
            "ru-RU": "Гамбия",
            "en-US": "Gambia",
            "pt-PT": "Gâmbia",
            "de-DE": "Gambia",
            cid: "72",
            "fr-FR": "Gambie",
            country_code: "GMB",
            "es-ES": "Gambia",
            id: 70
        }, {
            "en-GB": "Georgia",
            official_en_name: "Georgia",
            "zh-CN": "� �鲁吉亚",
            native_names: "საქა� თველო, Georgia",
            "ru-RU": "Грузия",
            "en-US": "Georgia",
            "pt-PT": "Geórgia",
            "de-DE": "Georgien",
            cid: "73",
            "fr-FR": "Géorgie",
            country_code: "GEO",
            "es-ES": "Georgia",
            id: 71
        }, {
            "en-GB": "Germany",
            official_en_name: "Federal Republic of Germany",
            "zh-CN": "德国",
            native_names: "Deutschland, Germany",
            "ru-RU": "Германия",
            "en-US": "Germany",
            "pt-PT": "Alemanha",
            "de-DE": "Deutschland",
            cid: "74",
            "fr-FR": "Allemagne",
            country_code: "DEU",
            "es-ES": "Alemania",
            id: 72
        }, {
            "en-GB": "Ghana",
            official_en_name: "Republic of Ghana",
            "zh-CN": "� 纳",
            native_names: "Ghana",
            "ru-RU": "Гана",
            "en-US": "Ghana",
            "pt-PT": "Gana",
            "de-DE": "Ghana",
            cid: "76",
            "fr-FR": "Ghana",
            country_code: "GHA",
            "es-ES": "Ghana",
            id: 73
        }, {
            "en-GB": "Gibraltar",
            official_en_name: "Gibraltar",
            "zh-CN": "直布罗陀",
            native_names: "Gibraltar",
            "ru-RU": "Гибралтар",
            "en-US": "Gibraltar",
            "pt-PT": "Gibraltar",
            "de-DE": "Gibraltar",
            cid: "77",
            "fr-FR": "Gibraltar",
            country_code: "GIB",
            "es-ES": "Gibraltar",
            id: 74
        }, {
            "en-GB": "Greece",
            official_en_name: "Hellenic Republic",
            "zh-CN": "希腊",
            native_names: "Ελλάδα, Greece",
            "ru-RU": "Греция",
            "en-US": "Greece",
            "pt-PT": "Grécia",
            "de-DE": "Griechenland",
            cid: "78",
            "fr-FR": "Grèce",
            country_code: "GRC",
            "es-ES": "Grecia",
            id: 75
        }, {
            "en-GB": "Greenland",
            official_en_name: "Greenland",
            "zh-CN": "� �陵兰",
            native_names: "Kalaallit Nunaat, Greenland",
            "ru-RU": "Гренландия",
            "en-US": "Greenland",
            "pt-PT": "Gronelândia",
            "de-DE": "Grönland",
            cid: "79",
            "fr-FR": "Groenland",
            country_code: "GRL",
            "es-ES": "Groenlandia",
            id: 76
        }, {
            "en-GB": "Grenada",
            official_en_name: "Grenada",
            "zh-CN": "� �林纳达",
            native_names: "Grenada",
            "ru-RU": "Гренада",
            "en-US": "Grenada",
            "pt-PT": "Granada",
            "de-DE": "Grenada",
            cid: "80",
            "fr-FR": "Grenade",
            country_code: "GRD",
            "es-ES": "Grenada",
            id: 77
        }, {
            "en-GB": "Guatemala",
            official_en_name: "Republic of Guatemala",
            "zh-CN": "危地马拉",
            native_names: "Guatemala",
            "ru-RU": "Гватемала",
            "en-US": "Guatemala",
            "pt-PT": "Guatemala",
            "de-DE": "Guatemala",
            cid: "81",
            "fr-FR": "Guatemala",
            country_code: "GTM",
            "es-ES": "Guatemala",
            id: 78
        }, {
            "en-GB": "Guernsey",
            official_en_name: "Bailiwick of Guernsey",
            "zh-CN": "� �西岛",
            native_names: "Guernesey, Guernsey, Dgèrnésiais",
            "ru-RU": "Гернси",
            "en-US": "Guernsey",
            "pt-PT": "Guernsey",
            "de-DE": "Guernsey",
            cid: "82",
            "fr-FR": "Guernesey",
            country_code: "GGY",
            "es-ES": "Guernsey",
            id: 79
        }, {
            "en-GB": "Guinea",
            official_en_name: "Republic of Guinea",
            "zh-CN": "� 内亚",
            native_names: "Guinée, Guinea",
            "ru-RU": "Гвинея",
            "en-US": "Guinea",
            "pt-PT": "Guiné",
            "de-DE": "Guinea",
            cid: "83",
            "fr-FR": "Guinée",
            country_code: "GIN",
            "es-ES": "Guinea",
            id: 80
        }, {
            "en-GB": "Guinea-Bissau",
            official_en_name: "Republic of Guinea-Bissau",
            "zh-CN": "� 内亚比绍",
            native_names: "Guiné-Bissau, Guinea-Bissau",
            "ru-RU": "Гвинея-Бисау",
            "en-US": "Guinea-Bissau",
            "pt-PT": "Guiné-Bissau",
            "de-DE": "Guinea-Bissau",
            cid: "84",
            "fr-FR": "Guinée-Bissau",
            country_code: "GNB",
            "es-ES": "Guinea-Bisáu",
            id: 81
        }, {
            "en-GB": "Guyana",
            official_en_name: "Co-operative Republic of Guyana",
            "zh-CN": "圭亚那",
            native_names: "Guyana",
            "ru-RU": "Гайана",
            "en-US": "Guyana",
            "pt-PT": "Guiana",
            "de-DE": "Guyana",
            cid: "85",
            "fr-FR": "Guyana",
            country_code: "GUY",
            "es-ES": "Guyana",
            id: 82
        }, {
            "en-GB": "Haiti",
            official_en_name: "Republic of Haiti",
            "zh-CN": "海地",
            native_names: "Haïti, Haiti, Ayiti",
            "ru-RU": "Гаити",
            "en-US": "Haiti",
            "pt-PT": "Haiti",
            "de-DE": "Haiti",
            cid: "86",
            "fr-FR": "Haïti",
            country_code: "HTI",
            "es-ES": "Haiti",
            id: 83
        }, {
            "en-GB": "Honduras",
            official_en_name: "Republic of Honduras",
            "zh-CN": "洪都拉斯",
            native_names: "Honduras",
            "ru-RU": "Гондурас",
            "en-US": "Honduras",
            "pt-PT": "Honduras",
            "de-DE": "Honduras",
            cid: "87",
            "fr-FR": "Honduras",
            country_code: "HND",
            "es-ES": "Honduras",
            id: 84
        }, {
            "en-GB": "Hungary",
            official_en_name: "Hungary",
            "zh-CN": "匈牙利",
            native_names: "Magyarország, Hungary",
            "ru-RU": "Венгрия",
            "en-US": "Hungary",
            "pt-PT": "Hungria",
            "de-DE": "Ungarn",
            cid: "88",
            "fr-FR": "Hongrie",
            country_code: "HUN",
            "es-ES": "Hungría",
            id: 85
        }, {
            "en-GB": "Iceland",
            official_en_name: "Iceland",
            "zh-CN": "冰岛",
            native_names: "Ísland, Iceland",
            "ru-RU": "Исландия",
            "en-US": "Iceland",
            "pt-PT": "Islândia",
            "de-DE": "Island",
            cid: "89",
            "fr-FR": "Islande",
            country_code: "ISL",
            "es-ES": "Islandia",
            id: 86
        }, {
            "en-GB": "India",
            official_en_name: "Republic of India",
            "zh-CN": "印度",
            native_names: "இந்தியா, India, भारत",
            "ru-RU": "Индия",
            "en-US": "India",
            "pt-PT": "Índia",
            "de-DE": "Indien",
            cid: "90",
            "fr-FR": "Inde",
            country_code: "IND",
            "es-ES": "India",
            id: 87
        }, {
            "en-GB": "Indonesia",
            official_en_name: "Republic of Indonesia",
            "zh-CN": "印度尼西亚",
            native_names: "Indonesia",
            "ru-RU": "Индонезия",
            "en-US": "Indonesia",
            "pt-PT": "Indonésia",
            "de-DE": "Indonesien",
            cid: "91",
            "fr-FR": "Indonésie",
            country_code: "IDN",
            "es-ES": "Indonesia",
            id: 88
        }, {
            "en-GB": "Iran",
            official_en_name: "Islamic Republic of Iran",
            "zh-CN": "伊朗",
            native_names: "ایران, Iran",
            "ru-RU": "Иран",
            "en-US": "Iran",
            "pt-PT": "Irão",
            "de-DE": "Iran",
            cid: "92",
            "fr-FR": "Iran",
            country_code: "IRN",
            "es-ES": "Iran",
            id: 89
        }, {
            "en-GB": "Iraq",
            official_en_name: "Republic of Iraq",
            "zh-CN": "伊拉克",
            native_names: "العراق, Iraq, ܩܘܼܛܢܵܐ, کۆماری",
            "ru-RU": "Ирак",
            "en-US": "Iraq",
            "pt-PT": "Iraque",
            "de-DE": "Irak",
            cid: "93",
            "fr-FR": "Irak",
            country_code: "IRQ",
            "es-ES": "Irak",
            id: 90
        }, {
            "en-GB": "Ireland",
            official_en_name: "Republic of Ireland",
            "zh-CN": "爱尔兰",
            native_names: "Éire, Ireland",
            "ru-RU": "Ирландия",
            "en-US": "Ireland",
            "pt-PT": "Irlanda",
            "de-DE": "Irland",
            cid: "94",
            "fr-FR": "Irlande",
            country_code: "IRL",
            "es-ES": "Irlanda",
            id: 91
        }, {
            "en-GB": "Isle of Man",
            official_en_name: "Isle of Man",
            "zh-CN": "马恩岛",
            native_names: "Mannin, Isle of Man",
            "ru-RU": "Остров Мэн",
            "en-US": "Isle of Man",
            "pt-PT": "Ilha de Man",
            "de-DE": "Insel Man",
            cid: "95",
            "fr-FR": "Île de Man",
            country_code: "IMN",
            "es-ES": "Isla de Man",
            id: 92
        }, {
            "en-GB": "Israel",
            official_en_name: "State of Israel",
            "zh-CN": "以色列",
            native_names: "إسرائيل, Israel, ישראל",
            "ru-RU": "Израиль",
            "en-US": "Israel",
            "pt-PT": "Israel",
            "de-DE": "Israel",
            cid: "96",
            "fr-FR": "Israël",
            country_code: "ISR",
            "es-ES": "Israel",
            id: 93
        }, {
            "en-GB": "Italy",
            official_en_name: "Italian Republic",
            "zh-CN": "意大利",
            native_names: "Italia, Italy",
            "ru-RU": "Италия",
            "en-US": "Italy",
            "pt-PT": "Itália",
            "de-DE": "Italien",
            cid: "97",
            "fr-FR": "Italie",
            country_code: "ITA",
            "es-ES": "Italia",
            id: 94
        }, {
            "en-GB": "Jamaica",
            official_en_name: "Jamaica",
            "zh-CN": "牙买� ",
            native_names: "Jamaica",
            "ru-RU": "Ямайка",
            "en-US": "Jamaica",
            "pt-PT": "Jamaica",
            "de-DE": "Jamaika",
            cid: "98",
            "fr-FR": "Jamaïque",
            country_code: "JAM",
            "es-ES": "Jamaica",
            id: 95
        }, {
            "en-GB": "Japan",
            official_en_name: "Japan",
            "zh-CN": "日本",
            native_names: "日本, Japan",
            "ru-RU": "Япония",
            "en-US": "Japan",
            "pt-PT": "Japão",
            "de-DE": "Japan",
            cid: "100",
            "fr-FR": "Japon",
            country_code: "JPN",
            "es-ES": "Japón",
            id: 96
        }, {
            "en-GB": "Jersey",
            official_en_name: "Bailiwick of Jersey",
            "zh-CN": "泽西岛",
            native_names: "Jersey, Jèrri",
            "ru-RU": "Джерси",
            "en-US": "Jersey",
            "pt-PT": "Jersey",
            "de-DE": "Jersey",
            cid: "101",
            "fr-FR": "Jersey",
            country_code: "JEY",
            "es-ES": "Jersey",
            id: 97
        }, {
            "en-GB": "Jordan",
            official_en_name: "Hashemite Kingdom of Jordan",
            "zh-CN": "约旦",
            native_names: "الأردن, Jordan",
            "ru-RU": "Иордания",
            "en-US": "Jordan",
            "pt-PT": "Jordânia",
            "de-DE": "Jordanien",
            cid: "102",
            "fr-FR": "Jordanie",
            country_code: "JOR",
            "es-ES": "Jordania",
            id: 98
        }, {
            "en-GB": "Kazakhstan",
            official_en_name: "Republic of Kazakhstan",
            "zh-CN": "哈萨克斯坦",
            native_names: "Қазақстан, Kazakhstan, Казахстан",
            "ru-RU": "Казахстан",
            "en-US": "Kazakhstan",
            "pt-PT": "Cazaquistão",
            "de-DE": "Kasachstan",
            cid: "103",
            "fr-FR": "Kazakhstan",
            country_code: "KAZ",
            "es-ES": "Kazajistán",
            id: 99
        }, {
            "en-GB": "Kenya",
            official_en_name: "Republic of Kenya",
            "zh-CN": "肯尼亚",
            native_names: "Kenya",
            "ru-RU": "Кения",
            "en-US": "Kenya",
            "pt-PT": "Quénia",
            "de-DE": "Kenia",
            cid: "104",
            "fr-FR": "Kenya",
            country_code: "KEN",
            "es-ES": "Kenia",
            id: 100
        }, {
            "en-GB": "Kiribati",
            official_en_name: "Independent and Sovereign Republic of Kiribati",
            "zh-CN": "基里巴斯",
            native_names: "Kiribati",
            "ru-RU": "Кирибати",
            "en-US": "Kiribati",
            "pt-PT": "Kiribati",
            "de-DE": "Kiribati",
            cid: "105",
            "fr-FR": "Kiribati",
            country_code: "KIR",
            "es-ES": "Kiribati",
            id: 101
        }, {
            "en-GB": "Kosovo",
            official_en_name: "Republic of Kosovo",
            "zh-CN": "科索沃",
            native_names: "Kosova, Kosovo, Косово",
            "ru-RU": "� еспублика Косово",
            "en-US": "Kosovo",
            "pt-PT": "Kosovo",
            "de-DE": "Kosovo",
            cid: "106",
            "fr-FR": "Kosovo",
            country_code: "UNK",
            "es-ES": "Kosovo",
            id: 102
        }, {
            "en-GB": "Kuwait",
            official_en_name: "State of Kuwait",
            "zh-CN": "科威特",
            native_names: "الكويت, Kuwait",
            "ru-RU": "Кувейт",
            "en-US": "Kuwait",
            "pt-PT": "Kuwait",
            "de-DE": "Kuwait",
            cid: "107",
            "fr-FR": "Koweït",
            country_code: "KWT",
            "es-ES": "Kuwait",
            id: 103
        }, {
            "en-GB": "Kyrgyzstan",
            official_en_name: "Kyrgyz Republic",
            "zh-CN": "吉尔吉斯斯坦",
            native_names: "Кыргызстан, Kyrgyzstan, Киргизия",
            "ru-RU": "Киргизия",
            "en-US": "Kyrgyzstan",
            "pt-PT": "Quirguistão",
            "de-DE": "Kirgisistan",
            cid: "108",
            "fr-FR": "Kirghizistan",
            country_code: "KGZ",
            "es-ES": "Kirguizistán",
            id: 104
        }, {
            "en-GB": "Laos",
            official_en_name: "Lao People's Democratic Republic",
            "zh-CN": "老挝",
            native_names: "ສປປລາວ, Laos",
            "ru-RU": "Лаос",
            "en-US": "Laos",
            "pt-PT": "Laos",
            "de-DE": "Laos",
            cid: "109",
            "fr-FR": "Laos",
            country_code: "LAO",
            "es-ES": "Laos",
            id: 105
        }, {
            "en-GB": "Latvia",
            official_en_name: "Republic of Latvia",
            "zh-CN": "拉脱维亚",
            native_names: "Latvija, Latvia",
            "ru-RU": "Латвия",
            "en-US": "Latvia",
            "pt-PT": "Letónia",
            "de-DE": "Lettland",
            cid: "110",
            "fr-FR": "Lettonie",
            country_code: "LVA",
            "es-ES": "Letonia",
            id: 106
        }, {
            "en-GB": "Lebanon",
            official_en_name: "Lebanese Republic",
            "zh-CN": "黎巴嫩",
            native_names: "لبنان, Lebanon, Liban",
            "ru-RU": "Ливан",
            "en-US": "Lebanon",
            "pt-PT": "Líbano",
            "de-DE": "Libanon",
            cid: "111",
            "fr-FR": "Liban",
            country_code: "LBN",
            "es-ES": "Líbano",
            id: 107
        }, {
            "en-GB": "Lesotho",
            official_en_name: "Kingdom of Lesotho",
            "zh-CN": "莱索托",
            native_names: "Lesotho",
            "ru-RU": "Лесото",
            "en-US": "Lesotho",
            "pt-PT": "Lesoto",
            "de-DE": "Lesotho",
            cid: "112",
            "fr-FR": "Lesotho",
            country_code: "LSO",
            "es-ES": "Lesotho",
            id: 108
        }, {
            "en-GB": "Liberia",
            official_en_name: "Republic of Liberia",
            "zh-CN": "利比里亚",
            native_names: "Liberia",
            "ru-RU": "Либерия",
            "en-US": "Liberia",
            "pt-PT": "Libéria",
            "de-DE": "Liberia",
            cid: "113",
            "fr-FR": "Liberia",
            country_code: "LBR",
            "es-ES": "Liberia",
            id: 109
        }, {
            "en-GB": "Libya",
            official_en_name: "State of Libya",
            "zh-CN": "利比亚",
            native_names: "‏ليبيا, Libya",
            "ru-RU": "Ливия",
            "en-US": "Libya",
            "pt-PT": "Líbia",
            "de-DE": "Libyen",
            cid: "114",
            "fr-FR": "Libye",
            country_code: "LBY",
            "es-ES": "Libia",
            id: 110
        }, {
            "en-GB": "Liechtenstein",
            official_en_name: "Principality of Liechtenstein",
            "zh-CN": "列支敦士登",
            native_names: "Liechtenstein",
            "ru-RU": "Лихтенштейн",
            "en-US": "Liechtenstein",
            "pt-PT": "Liechtenstein",
            "de-DE": "Liechtenstein",
            cid: "115",
            "fr-FR": "Liechtenstein",
            country_code: "LIE",
            "es-ES": "Liechtenstein",
            id: 111
        }, {
            "en-GB": "Lithuania",
            official_en_name: "Republic of Lithuania",
            "zh-CN": "立陶宛",
            native_names: "Lietuva, Lithuania",
            "ru-RU": "Литва",
            "en-US": "Lithuania",
            "pt-PT": "Lituânia",
            "de-DE": "Litauen",
            cid: "116",
            "fr-FR": "Lituanie",
            country_code: "LTU",
            "es-ES": "Lituania",
            id: 112
        }, {
            "en-GB": "Luxembourg",
            official_en_name: "Grand Duchy of Luxembourg",
            "zh-CN": "卢森� �",
            native_names: "Lëtzebuerg, Luxembourg, Luxemburg",
            "ru-RU": "Люксембург",
            "en-US": "Luxembourg",
            "pt-PT": "Luxemburgo",
            "de-DE": "Luxemburg",
            cid: "117",
            "fr-FR": "Luxembourg",
            country_code: "LUX",
            "es-ES": "Luxemburgo",
            id: 113
        }, {
            "en-GB": "Macedonia",
            official_en_name: "Republic of Macedonia",
            "zh-CN": "马其顿",
            native_names: "Македонија, Macedonia",
            "ru-RU": "� еспублика Македония",
            "en-US": "Macedonia",
            "pt-PT": "Macedónia",
            "de-DE": "Mazedonien",
            cid: "118",
            "fr-FR": "Macédoine",
            country_code: "MKD",
            "es-ES": "Macedonia",
            id: 114
        }, {
            "en-GB": "Madagascar",
            official_en_name: "Republic of Madagascar",
            "zh-CN": "马达� 斯� ",
            native_names: "Madagascar, Madagasikara",
            "ru-RU": "Мадагаскар",
            "en-US": "Madagascar",
            "pt-PT": "Madagáscar",
            "de-DE": "Madagaskar",
            cid: "119",
            "fr-FR": "Madagascar",
            country_code: "MDG",
            "es-ES": "Madagascar",
            id: 115
        }, {
            "en-GB": "Malawi",
            official_en_name: "Republic of Malawi",
            "zh-CN": "马拉维",
            native_names: "Malaŵi, Malawi",
            "ru-RU": "Малави",
            "en-US": "Malawi",
            "pt-PT": "Malawi",
            "de-DE": "Malawi",
            cid: "120",
            "fr-FR": "Malawi",
            country_code: "MWI",
            "es-ES": "Malawi",
            id: 116
        }, {
            "en-GB": "Malaysia",
            official_en_name: "Malaysia",
            "zh-CN": "马来西亚",
            native_names: "مليسيا, Malaysia",
            "ru-RU": "Малайзия",
            "en-US": "Malaysia",
            "pt-PT": "Malásia",
            "de-DE": "Malaysia",
            cid: "121",
            "fr-FR": "Malaisie",
            country_code: "MYS",
            "es-ES": "Malasia",
            id: 117
        }, {
            "en-GB": "Maldives",
            official_en_name: "Republic of the Maldives",
            "zh-CN": "马尔代夫",
            native_names: "ދިވެހިރާއްޖޭގެ, Maldives",
            "ru-RU": "Мальдивы",
            "en-US": "Maldives",
            "pt-PT": "Maldivas",
            "de-DE": "Malediven",
            cid: "122",
            "fr-FR": "Maldives",
            country_code: "MDV",
            "es-ES": "Maldivas",
            id: 118
        }, {
            "en-GB": "Mali",
            official_en_name: "Republic of Mali",
            "zh-CN": "马里",
            native_names: "Mali",
            "ru-RU": "Мали",
            "en-US": "Mali",
            "pt-PT": "Mali",
            "de-DE": "Mali",
            cid: "123",
            "fr-FR": "Mali",
            country_code: "MLI",
            "es-ES": "Mali",
            id: 119
        }, {
            "en-GB": "Malta",
            official_en_name: "Republic of Malta",
            "zh-CN": "马耳他",
            native_names: "Malta",
            "ru-RU": "Мальта",
            "en-US": "Malta",
            "pt-PT": "Malta",
            "de-DE": "Malta",
            cid: "124",
            "fr-FR": "Malte",
            country_code: "MLT",
            "es-ES": "Malta",
            id: 120
        }, {
            "en-GB": "Marshall Islands",
            official_en_name: "Republic of the Marshall Islands",
            "zh-CN": "马绍尔群岛",
            native_names: "M̧ajeļ, Marshall Islands",
            "ru-RU": "Маршалловы Острова",
            "en-US": "Marshall Islands",
            "pt-PT": "Ilhas Marshall",
            "de-DE": "Marshallinseln",
            cid: "125",
            "fr-FR": "Îles Marshall",
            country_code: "MHL",
            "es-ES": "Islas Marshall",
            id: 121
        }, {
            "en-GB": "Mauritania",
            official_en_name: "Islamic Republic of Mauritania",
            "zh-CN": "毛里塔尼亚",
            native_names: "موريتانيا, Mauritania",
            "ru-RU": "Мавритания",
            "en-US": "Mauritania",
            "pt-PT": "Mauritânia",
            "de-DE": "Mauretanien",
            cid: "126",
            "fr-FR": "Mauritanie",
            country_code: "MRT",
            "es-ES": "Mauritania",
            id: 122
        }, {
            "en-GB": "Mauritius",
            official_en_name: "Republic of Mauritius",
            "zh-CN": "毛里求斯",
            native_names: "Maurice, Mauritius, Moris",
            "ru-RU": "Маврикий",
            "en-US": "Mauritius",
            "pt-PT": "Maurício",
            "de-DE": "Mauritius",
            cid: "127",
            "fr-FR": "Île Maurice",
            country_code: "MUS",
            "es-ES": "Mauricio",
            id: 123
        }, {
            "en-GB": "Mexico",
            official_en_name: "United Mexican States",
            "zh-CN": "墨西哥",
            native_names: "México, Mexico",
            "ru-RU": "Мексика",
            "en-US": "Mexico",
            "pt-PT": "México",
            "de-DE": "Mexiko",
            cid: "128",
            "fr-FR": "Mexique",
            country_code: "MEX",
            "es-ES": "México",
            id: 124
        }, {
            "en-GB": "Moldova",
            official_en_name: "Republic of Moldova",
            "zh-CN": "摩尔多瓦",
            native_names: "Moldova",
            "ru-RU": "Молдавия",
            "en-US": "Moldova",
            "pt-PT": "Moldávia",
            "de-DE": "Moldawie",
            cid: "129",
            "fr-FR": "Moldavie",
            country_code: "MDA",
            "es-ES": "Moldavia",
            id: 125
        }, {
            "en-GB": "Monaco",
            official_en_name: "Principality of Monaco",
            "zh-CN": "摩纳哥",
            native_names: "Monaco",
            "ru-RU": "Монако",
            "en-US": "Monaco",
            "pt-PT": "Mónaco",
            "de-DE": "Monaco",
            cid: "130",
            "fr-FR": "Monaco",
            country_code: "MCO",
            "es-ES": "Mónaco",
            id: 126
        }, {
            "en-GB": "Mongolia",
            official_en_name: "Mongolia",
            "zh-CN": "蒙古",
            native_names: "Монгол улс, Mongolia",
            "ru-RU": "Монголия",
            "en-US": "Mongolia",
            "pt-PT": "Mongólia",
            "de-DE": "Mongolei",
            cid: "131",
            "fr-FR": "Mongolie",
            country_code: "MNG",
            "es-ES": "Mongolia",
            id: 127
        }, {
            "en-GB": "Montenegro",
            official_en_name: "Montenegro",
            "zh-CN": "黑山",
            native_names: "Црна Гора, Montenegro",
            "ru-RU": "Черногория",
            "en-US": "Montenegro",
            "pt-PT": "Montenegro",
            "de-DE": "Montenegro",
            cid: "132",
            "fr-FR": "Monténégro",
            country_code: "MNE",
            "es-ES": "Montenegro",
            id: 128
        }, {
            "en-GB": "Montserrat",
            official_en_name: "Montserrat",
            "zh-CN": "蒙特塞拉特",
            native_names: "Montserrat",
            "ru-RU": "Монтсеррат",
            "en-US": "Montserrat",
            "pt-PT": "Montserrat",
            "de-DE": "Montserrat",
            cid: "133",
            "fr-FR": "Montserrat",
            country_code: "MSR",
            "es-ES": "Montserrat",
            id: 129
        }, {
            "en-GB": "Morocco",
            official_en_name: "Kingdom of Morocco",
            "zh-CN": "摩洛哥",
            native_names: "ⵍⵎⴰⵖⵔⵉⴱ, Morocco, المغرب",
            "ru-RU": "Марокко",
            "en-US": "Morocco",
            "pt-PT": "Marrocos",
            "de-DE": "Marokko",
            cid: "134",
            "fr-FR": "Maroc",
            country_code: "MAR",
            "es-ES": "Marruecos",
            id: 130
        }, {
            "en-GB": "Mozambique",
            official_en_name: "Republic of Mozambique",
            "zh-CN": "莫桑比克",
            native_names: "Moçambique, Mozambique",
            "ru-RU": "Мозамбик",
            "en-US": "Mozambique",
            "pt-PT": "Moçambique",
            "de-DE": "Mosambik",
            cid: "135",
            "fr-FR": "Mozambique",
            country_code: "MOZ",
            "es-ES": "Mozambique",
            id: 131
        }, {
            "en-GB": "Myanmar",
            official_en_name: "Republic of the Union of Myanmar",
            "zh-CN": "缅甸",
            native_names: "မြန်မာ, Myanmar",
            "ru-RU": "Мьянма",
            "en-US": "Myanmar",
            "pt-PT": "Myanmar",
            "de-DE": "Myanmar",
            cid: "136",
            "fr-FR": "Birmanie",
            country_code: "MMR",
            "es-ES": "Myanmar",
            id: 132
        }, {
            "en-GB": "Namibia",
            official_en_name: "Republic of Namibia",
            "zh-CN": "纳米比亚",
            native_names: "Namibia, Namibië",
            "ru-RU": "Намибия",
            "en-US": "Namibia",
            "pt-PT": "Namíbia",
            "de-DE": "Namibia",
            cid: "138",
            "fr-FR": "Namibie",
            country_code: "NAM",
            "es-ES": "Namibia",
            id: 133
        }, {
            "en-GB": "Nauru",
            official_en_name: "Republic of Nauru",
            "zh-CN": "瑙鲁",
            native_names: "Nauru",
            "ru-RU": "Науру",
            "en-US": "Nauru",
            "pt-PT": "Nauru",
            "de-DE": "Nauru",
            cid: "139",
            "fr-FR": "Nauru",
            country_code: "NRU",
            "es-ES": "Nauru",
            id: 134
        }, {
            "en-GB": "Nepal",
            official_en_name: "Federal Democratic Republic of Nepal",
            "zh-CN": "尼泊尔",
            native_names: "नेपाल, Nepal",
            "ru-RU": "Непал",
            "en-US": "Nepal",
            "pt-PT": "Nepal",
            "de-DE": "Népal",
            cid: "140",
            "fr-FR": "Népal",
            country_code: "NPL",
            "es-ES": "Nepal",
            id: 135
        }, {
            "en-GB": "Netherlands",
            official_en_name: "Netherlands",
            "zh-CN": "荷兰",
            native_names: "Nederland, Netherlands",
            "ru-RU": "Нидерланды",
            "en-US": "Netherlands",
            "pt-PT": "Holanda",
            "de-DE": "Niederlande",
            cid: "141",
            "fr-FR": "Pays-Bas",
            country_code: "NLD",
            "es-ES": "Países Bajos",
            id: 136
        }, {
            "en-GB": "New Zealand",
            official_en_name: "New Zealand",
            "zh-CN": "新西兰",
            native_names: "New Zealand, Aotearoa",
            "ru-RU": "Новая Зеландия",
            "en-US": "New Zealand",
            "pt-PT": "Nova Zelândia",
            "de-DE": "Neuseeland",
            cid: "142",
            "fr-FR": "Nouvelle-Zélande",
            country_code: "NZL",
            "es-ES": "Nueva Zelanda",
            id: 137
        }, {
            "en-GB": "Nicaragua",
            official_en_name: "Republic of Nicaragua",
            "zh-CN": "尼� 拉瓜",
            native_names: "Nicaragua",
            "ru-RU": "Никарагуа",
            "en-US": "Nicaragua",
            "pt-PT": "Nicarágua",
            "de-DE": "Nicaragua",
            cid: "143",
            "fr-FR": "Nicaragua",
            country_code: "NIC",
            "es-ES": "Nicaragua",
            id: 138
        }, {
            "en-GB": "Niger",
            official_en_name: "Republic of Niger",
            "zh-CN": "尼日尔",
            native_names: "Niger",
            "ru-RU": "Нигер",
            "en-US": "Niger",
            "pt-PT": "Níger",
            "de-DE": "Niger",
            cid: "144",
            "fr-FR": "Niger",
            country_code: "NER",
            "es-ES": "Níger",
            id: 139
        }, {
            "en-GB": "Nigeria",
            official_en_name: "Federal Republic of Nigeria",
            "zh-CN": "尼日利亚",
            native_names: "Nigeria",
            "ru-RU": "Нигерия",
            "en-US": "Nigeria",
            "pt-PT": "Nigéria",
            "de-DE": "Nigeria",
            cid: "145",
            "fr-FR": "Nigéria",
            country_code: "NGA",
            "es-ES": "Nigeria",
            id: 140
        }, {
            "en-GB": "Niue",
            official_en_name: "Niue",
            "zh-CN": "纽埃",
            native_names: "Niuē, Niue",
            "ru-RU": "Ниуэ",
            "en-US": "Niue",
            "pt-PT": "Niue",
            "de-DE": "Niue",
            cid: "146",
            "fr-FR": "Niue",
            country_code: "NIU",
            "es-ES": "Niue",
            id: 141
        }, {
            "en-GB": "North Korea",
            official_en_name: "Democratic People's Republic of Korea",
            "zh-CN": "朝鲜",
            native_names: "북한, North Korea",
            "ru-RU": "Северная Корея",
            "en-US": "North Korea",
            "pt-PT": "Coreia do Norte",
            "de-DE": "Nordkorea",
            cid: "147",
            "fr-FR": "Corée du Nord",
            country_code: "PRK",
            "es-ES": "Corea del Norte",
            id: 142
        }, {
            "en-GB": "Norway",
            official_en_name: "Kingdom of Norway",
            "zh-CN": "挪威",
            native_names: "Noreg, Norway, Norgga, Norge",
            "ru-RU": "Норвегия",
            "en-US": "Norway",
            "pt-PT": "Noruega",
            "de-DE": "Norwegen",
            cid: "148",
            "fr-FR": "Norvège",
            country_code: "NOR",
            "es-ES": "Noruega",
            id: 143
        }, {
            "en-GB": "Oman",
            official_en_name: "Sultanate of Oman",
            "zh-CN": "阿曼",
            native_names: "عمان, Oman",
            "ru-RU": "Оман",
            "en-US": "Oman",
            "pt-PT": "Omã",
            "de-DE": "Oman",
            cid: "149",
            "fr-FR": "Oman",
            country_code: "OMN",
            "es-ES": "Omán",
            id: 144
        }, {
            "en-GB": "Pakistan",
            official_en_name: "Islamic Republic of Pakistan",
            "zh-CN": "巴基斯坦",
            native_names: "پاكستان, Pakistan",
            "ru-RU": "Пакистан",
            "en-US": "Pakistan",
            "pt-PT": "Paquistão",
            "de-DE": "Pakistan",
            cid: "150",
            "fr-FR": "Pakistan",
            country_code: "PAK",
            "es-ES": "Pakistán",
            id: 145
        }, {
            "en-GB": "Palau",
            official_en_name: "Republic of Palau",
            "zh-CN": "帕劳",
            native_names: "Belau, Palau",
            "ru-RU": "Палау",
            "en-US": "Palau",
            "pt-PT": "Palau",
            "de-DE": "Palau",
            cid: "151",
            "fr-FR": "Palaos (Palau)",
            country_code: "PLW",
            "es-ES": "Palau",
            id: 146
        }, {
            "en-GB": "Panama",
            official_en_name: "Republic of Panama",
            "zh-CN": "巴拿马",
            native_names: "Panamá, Panama",
            "ru-RU": "Панама",
            "en-US": "Panama",
            "pt-PT": "Panamá",
            "de-DE": "Panama",
            cid: "153",
            "fr-FR": "Panama",
            country_code: "PAN",
            "es-ES": "Panamá",
            id: 147
        }, {
            "en-GB": "Papua New Guinea",
            official_en_name: "Independent State of Papua New Guinea",
            "zh-CN": "巴布亚新� 内亚",
            native_names: "Papua Niu Gini, Papua New Guinea, Papua Niugini",
            "ru-RU": "Папуа — Новая Гвинея",
            "en-US": "Papua New Guinea",
            "pt-PT": "Papua Nova Guiné",
            "de-DE": "Papua-Neuguinea",
            cid: "154",
            "fr-FR": "Papouasie-Nouvelle-Guinée",
            country_code: "PNG",
            "es-ES": "Papúa Nueva Guinea",
            id: 148
        }, {
            "en-GB": "Paraguay",
            official_en_name: "Republic of Paraguay",
            "zh-CN": "巴拉圭",
            native_names: "Paraguái, Paraguay",
            "ru-RU": "Парагвай",
            "en-US": "Paraguay",
            "pt-PT": "Paraguai",
            "de-DE": "Paraguay",
            cid: "155",
            "fr-FR": "Paraguay",
            country_code: "PRY",
            "es-ES": "Paraguay",
            id: 149
        }, {
            "en-GB": "Peru",
            official_en_name: "Republic of Peru",
            "zh-CN": "秘鲁",
            native_names: "Piruw, Peru, Perú",
            "ru-RU": "Перу",
            "en-US": "Peru",
            "pt-PT": "Perú",
            "de-DE": "Peru",
            cid: "156",
            "fr-FR": "Pérou",
            country_code: "PER",
            "es-ES": "Perú",
            id: 150
        }, {
            "en-GB": "Philippines",
            official_en_name: "Republic of the Philippines",
            "zh-CN": "菲律宾",
            native_names: "Pilipinas, Philippines",
            "ru-RU": "Филиппины",
            "en-US": "Philippines",
            "pt-PT": "Filipinas",
            "de-DE": "Philippinen",
            cid: "157",
            "fr-FR": "Philippines",
            country_code: "PHL",
            "es-ES": "Filipinas",
            id: 151
        }, {
            "en-GB": "Pitcairn Islands",
            official_en_name: "Pitcairn Group of Islands",
            "zh-CN": "皮特凯恩群岛",
            native_names: "Pitcairn Islands",
            "ru-RU": "Острова Питкэрн",
            "en-US": "Pitcairn Islands",
            "pt-PT": "Ilhas Pitcairn",
            "de-DE": "Pitcairn",
            cid: "158",
            "fr-FR": "Îles Pitcairn",
            country_code: "PCN",
            "es-ES": "Islas Pitcairn",
            id: 152
        }, {
            "en-GB": "Poland",
            official_en_name: "Republic of Poland",
            "zh-CN": "波兰",
            native_names: "Polska, Poland",
            "ru-RU": "Польша",
            "en-US": "Poland",
            "pt-PT": "Polónia",
            "de-DE": "Polen",
            cid: "159",
            "fr-FR": "Pologne",
            country_code: "POL",
            "es-ES": "Polonia",
            id: 153
        }, {
            "en-GB": "Portugal",
            official_en_name: "Portuguese Republic",
            "zh-CN": "葡萄牙",
            native_names: "Portugal",
            "ru-RU": "Португалия",
            "en-US": "Portugal",
            "pt-PT": "Portugal",
            "de-DE": "Portugal",
            cid: "160",
            "fr-FR": "Portugal",
            country_code: "PRT",
            "es-ES": "Portugal",
            id: 154
        }, {
            "en-GB": "Qatar",
            official_en_name: "State of Qatar",
            "zh-CN": "卡塔尔",
            native_names: "قطر, Qatar",
            "ru-RU": "Катар",
            "en-US": "Qatar",
            "pt-PT": "Catar",
            "de-DE": "Katar",
            cid: "161",
            "fr-FR": "Qatar",
            country_code: "QAT",
            "es-ES": "Catar",
            id: 155
        }, {
            "en-GB": "Romania",
            official_en_name: "Romania",
            "zh-CN": "罗马尼亚",
            native_names: "România, Romania",
            "ru-RU": "� умыния",
            "en-US": "Romania",
            "pt-PT": "Roménia",
            "de-DE": "Rumänien",
            cid: "162",
            "fr-FR": "Roumanie",
            country_code: "ROU",
            "es-ES": "Rumania",
            id: 156
        }, {
            "en-GB": "Russia",
            official_en_name: "Russian Federation",
            "zh-CN": "俄罗斯",
            native_names: "� оссия, Russia",
            "ru-RU": "� оссия",
            "en-US": "Russia",
            "pt-PT": "Rússia",
            "de-DE": "Russland",
            cid: "163",
            "fr-FR": "Russie",
            country_code: "RUS",
            "es-ES": "Rusia",
            id: 157
        }, {
            "en-GB": "Rwanda",
            official_en_name: "Republic of Rwanda",
            "zh-CN": "卢旺达",
            native_names: "Rwanda",
            "ru-RU": "� уанда",
            "en-US": "Rwanda",
            "pt-PT": "Ruanda",
            "de-DE": "Ruanda",
            cid: "164",
            "fr-FR": "Rwanda",
            country_code: "RWA",
            "es-ES": "Ruanda",
            id: 158
        }, {
            "en-GB": "Western Sahara",
            official_en_name: "Sahrawi Arab Democratic Republic",
            "zh-CN": "西撒哈拉",
            native_names: "Western Sahara, Sahara Occidental, الصحراء الغربية",
            "ru-RU": "Западная Сахара",
            "en-US": "Western Sahara",
            "pt-PT": "Saara Ocidental",
            "de-DE": "Westsahara",
            cid: "165",
            "fr-FR": "Sahara Occidental",
            country_code: "ESH",
            "es-ES": "Sahara Occidental",
            id: 159
        }, {
            "en-GB": "Saint Kitts and Nevis",
            official_en_name: "Federation of Saint Christopher and Nevisa",
            "zh-CN": "圣基茨和尼维斯",
            native_names: "Saint Kitts and Nevis",
            "ru-RU": "Сент-Китс и Невис",
            "en-US": "Saint Kitts and Nevis",
            "pt-PT": "São Cristóvão e Nevis",
            "de-DE": "Saint Christopher und Nevis",
            cid: "167",
            "fr-FR": "Saint-Christophe-et-Niévès",
            country_code: "KNA",
            "es-ES": "San Cristóbal y Nieves",
            id: 160
        }, {
            "en-GB": "Saint Lucia",
            official_en_name: "Saint Lucia",
            "zh-CN": "圣卢西亚",
            native_names: "Saint Lucia",
            "ru-RU": "Сент-Люсия",
            "en-US": "Saint Lucia",
            "pt-PT": "Santa Lúcia",
            "de-DE": "Saint Lucia",
            cid: "168",
            "fr-FR": "Sainte-Lucie",
            country_code: "LCA",
            "es-ES": "Santa Lucía",
            id: 161
        }, {
            "en-GB": "Saint Vincent and the Grenadines",
            official_en_name: "Saint Vincent and the Grenadines",
            "zh-CN": "圣文森特和� �林纳丁斯",
            native_names: "Saint Vincent and the Grenadines",
            "ru-RU": "Сент-Винсент и Гренадины",
            "en-US": "Saint Vincent and the Grenadines",
            "pt-PT": "São Vincente e Granadinas",
            "de-DE": "Saint Vincent und die Grenadinen",
            cid: "169",
            "fr-FR": "Saint-Vincent-et-les-Grenadines",
            country_code: "VCT",
            "es-ES": "San Vicente y Granadinas",
            id: 162
        }, {
            "en-GB": "Samoa",
            official_en_name: "Independent State of Samoa",
            "zh-CN": "萨摩亚",
            native_names: "Sāmoa, Samoa",
            "ru-RU": "Самоа",
            "en-US": "Samoa",
            "pt-PT": "Samoa",
            "de-DE": "Samoa",
            cid: "170",
            "fr-FR": "Samoa",
            country_code: "WSM",
            "es-ES": "Samoa",
            id: 163
        }, {
            "en-GB": "San Marino",
            official_en_name: "Most Serene Republic of San Marino",
            "zh-CN": "圣马力诺",
            native_names: "San Marino",
            "ru-RU": "Сан-Марино",
            "en-US": "San Marino",
            "pt-PT": "San Marino",
            "de-DE": "San Marino",
            cid: "171",
            "fr-FR": "Saint-Marin",
            country_code: "SMR",
            "es-ES": "San Marino",
            id: 164
        }, {
            "en-GB": "São Tomé and Príncipe",
            official_en_name: "Democratic Republic of São Tomé and Príncipe",
            "zh-CN": "圣多美和普林西比",
            native_names: "São Tomé e Príncipe, São Tomé and Príncipe",
            "ru-RU": "Сан-Томе и Принсипи",
            "en-US": "São Tomé and Príncipe",
            "pt-PT": "São Tomé e Príncipe",
            "de-DE": "São Tomé und Príncipe",
            cid: "172",
            "fr-FR": "São Tomé et Príncipe",
            country_code: "STP",
            "es-ES": "Santo Tomé y Príncipe",
            id: 165
        }, {
            "en-GB": "Saudi Arabia",
            official_en_name: "Kingdom of Saudi Arabia",
            "zh-CN": "沙特阿拉伯",
            native_names: "العربية السعودية, Saudi Arabia",
            "ru-RU": "Саудовская Аравия",
            "en-US": "Saudi Arabia",
            "pt-PT": "Arábia Saudita",
            "de-DE": "Saudi-Arabien",
            cid: "173",
            "fr-FR": "Arabie Saoudite",
            country_code: "SAU",
            "es-ES": "Arabia Saudí",
            id: 166
        }, {
            "en-GB": "Senegal",
            official_en_name: "Republic of Senegal",
            "zh-CN": "塞内� 尔",
            native_names: "Sénégal, Senegal",
            "ru-RU": "Сенегал",
            "en-US": "Senegal",
            "pt-PT": "Senegal",
            "de-DE": "Senegal",
            cid: "174",
            "fr-FR": "Sénégal",
            country_code: "SEN",
            "es-ES": "Senegal",
            id: 167
        }, {
            "en-GB": "Serbia",
            official_en_name: "Republic of Serbia",
            "zh-CN": "塞尔维亚",
            native_names: "Србија, Serbia",
            "ru-RU": "Сербия",
            "en-US": "Serbia",
            "pt-PT": "Sérvia",
            "de-DE": "Serbien",
            cid: "175",
            "fr-FR": "Serbie",
            country_code: "SRB",
            "es-ES": "Serbia",
            id: 168
        }, {
            "en-GB": "Seychelles",
            official_en_name: "Republic of Seychelles",
            "zh-CN": "塞舌尔",
            native_names: "Sesel, Seychelles",
            "ru-RU": "Сейшельские Острова",
            "en-US": "Seychelles",
            "pt-PT": "Seicheles",
            "de-DE": "Seychellen",
            cid: "176",
            "fr-FR": "Seychelles",
            country_code: "SYC",
            "es-ES": "Seychelles",
            id: 169
        }, {
            "en-GB": "Sierra Leone",
            official_en_name: "Republic of Sierra Leone",
            "zh-CN": "塞拉利昂",
            native_names: "Sierra Leone",
            "ru-RU": "Сьерра-Леоне",
            "en-US": "Sierra Leone",
            "pt-PT": "Serra Leoa",
            "de-DE": "Sierra Leone",
            cid: "177",
            "fr-FR": "Sierra Leone",
            country_code: "SLE",
            "es-ES": "Sierra Leone",
            id: 170
        }, {
            "en-GB": "Singapore",
            official_en_name: "Republic of Singapore",
            cid: "178",
            native_names: "சிங்கப்பூர், Singapore, Singapura, 新� 坡",
            "ru-RU": "Сингапур",
            "en-US": "Singapore",
            "pt-PT": "Singapura",
            "de-DE": "Singapur",
            "fr-FR": "Singapour",
            country_code: "SGP",
            "es-ES": "Singapur",
            id: 171
        }, {
            "en-GB": "Slovakia",
            official_en_name: "Slovak Republic",
            "zh-CN": "斯洛伐克",
            native_names: "Slovensko, Slovakia",
            "ru-RU": "Словакия",
            "en-US": "Slovakia",
            "pt-PT": "Eslováquia",
            "de-DE": "Slowakei",
            cid: "179",
            "fr-FR": "Slovaquie",
            country_code: "SVK",
            "es-ES": "República Eslovaca",
            id: 172
        }, {
            "en-GB": "Slovenia",
            official_en_name: "Republic of Slovenia",
            "zh-CN": "斯洛文尼亚",
            native_names: "Slovenija, Slovenia",
            "ru-RU": "Словения",
            "en-US": "Slovenia",
            "pt-PT": "Eslovénia",
            "de-DE": "Slowenien",
            cid: "180",
            "fr-FR": "Slovénie",
            country_code: "SVN",
            "es-ES": "Eslovenia",
            id: 173
        }, {
            "en-GB": "Solomon Islands",
            official_en_name: "Solomon Islands",
            "zh-CN": "所罗门群岛",
            native_names: "Solomon Islands",
            "ru-RU": "Соломоновы Острова",
            "en-US": "Solomon Islands",
            "pt-PT": "Ilhas Salomão",
            "de-DE": "Salomonen",
            cid: "181",
            "fr-FR": "Îles Salomon",
            country_code: "SLB",
            "es-ES": "Islas Salomón",
            id: 174
        }, {
            "en-GB": "Somalia",
            official_en_name: "Federal Republic of Somalia",
            "zh-CN": "索马里",
            native_names: "الصومال‎‎, Somalia, Soomaaliya",
            "ru-RU": "Сомали",
            "en-US": "Somalia",
            "pt-PT": "Somália",
            "de-DE": "Somalia",
            cid: "182",
            "fr-FR": "Somalie",
            country_code: "SOM",
            "es-ES": "Somalia",
            id: 175
        }, {
            "en-GB": "South Africa",
            official_en_name: "Republic of South Africa",
            "zh-CN": "南非",
            native_names: "Aforika Borwa, South Africa, Afrika Dzonga, Ningizimu Afrika, Afrika-Borwa, Mzantsi Afrika, Afrika Borwa, Sewula Afrika, Afurika Tshipembe",
            "ru-RU": "Южно-Африканская � еспублика",
            "en-US": "South Africa",
            "pt-PT": "África do Sul",
            "de-DE": "Republik Südafrika",
            cid: "183",
            "fr-FR": "Afrique du Sud",
            country_code: "ZAF",
            "es-ES": "República de Sudáfrica",
            id: 176
        }, {
            "en-GB": "South Georgia",
            official_en_name: "South Georgia and the South Sandwich Islands",
            "zh-CN": "南乔治亚",
            native_names: "South Georgia",
            "ru-RU": "Южная Георгия и Южные Сандвичевы острова",
            "en-US": "South Georgia",
            "pt-PT": "Ilhas Geórgia do Sul e Sandwich do Sul",
            "de-DE": "Südgeorgien und die Südlichen Sandwichinseln",
            cid: "184",
            "fr-FR": "Géorgie du Sud-et-les Îles Sandwich du Sud",
            country_code: "SGS",
            "es-ES": "Islas Georgias del Sur y Sandwich del Sur",
            id: 177
        }, {
            "en-GB": "South Korea",
            official_en_name: "Republic of Korea",
            "zh-CN": "韩国",
            native_names: "대한민국, South Korea",
            "ru-RU": "Южная Корея",
            "en-US": "South Korea",
            "pt-PT": "Coreia do Sul",
            "de-DE": "Südkorea",
            cid: "185",
            "fr-FR": "Corée du Sud",
            country_code: "KOR",
            "es-ES": "Corea del Sur",
            id: 178
        }, {
            "en-GB": "South Sudan",
            official_en_name: "Republic of South Sudan",
            "zh-CN": "南苏丹",
            native_names: "South Sudan",
            "ru-RU": "Южный Судан",
            "en-US": "South Sudan",
            "pt-PT": "Sudão do Sul",
            "de-DE": "Südsudan",
            cid: "186",
            "fr-FR": "Soudan du Sud",
            country_code: "SSD",
            "es-ES": "Sudán del Sur",
            id: 179
        }, {
            "en-GB": "Spain",
            official_en_name: "Kingdom of Spain",
            "zh-CN": "西班牙",
            native_names: "España, Spain",
            "ru-RU": "Испания",
            "en-US": "Spain",
            "pt-PT": "Espanha",
            "de-DE": "Spanien",
            cid: "187",
            "fr-FR": "Espagne",
            country_code: "ESP",
            "es-ES": "España",
            id: 180
        }, {
            "en-GB": "Sri Lanka",
            official_en_name: "Democratic Socialist Republic of Sri Lanka",
            "zh-CN": "斯里兰卡",
            native_names: "இலங்கை, Sri Lanka, ශ්‍රී ලංකාව",
            "ru-RU": "Шри-Ланка",
            "en-US": "Sri Lanka",
            "pt-PT": "Sri Lanka",
            "de-DE": "Sri Lanka",
            cid: "188",
            "fr-FR": "Sri Lanka",
            country_code: "LKA",
            "es-ES": "Sri Lanka",
            id: 181
        }, {
            "en-GB": "Sudan",
            official_en_name: "Republic of the Sudan",
            "zh-CN": "苏丹",
            native_names: "السودان, Sudan",
            "ru-RU": "Судан",
            "en-US": "Sudan",
            "pt-PT": "Sudão",
            "de-DE": "Sudan",
            cid: "189",
            "fr-FR": "Soudan",
            country_code: "SDN",
            "es-ES": "Sudán",
            id: 182
        }, {
            "en-GB": "Suriname",
            official_en_name: "Republic of Suriname",
            "zh-CN": "苏里南",
            native_names: "Suriname",
            "ru-RU": "Суринам",
            "en-US": "Suriname",
            "pt-PT": "Suriname",
            "de-DE": "Suriname",
            cid: "190",
            "fr-FR": "Surinam",
            country_code: "SUR",
            "es-ES": "Surinam",
            id: 183
        }, {
            "en-GB": "Swaziland",
            official_en_name: "Kingdom of Swaziland",
            "zh-CN": "斯威士兰",
            native_names: "Swaziland",
            "ru-RU": "Свазиленд",
            "en-US": "Swaziland",
            "pt-PT": "Suazilândia",
            "de-DE": "Swasiland",
            cid: "191",
            "fr-FR": "Swaziland",
            country_code: "SWZ",
            "es-ES": "Suazilandia",
            id: 184
        }, {
            "en-GB": "Sweden",
            official_en_name: "Kingdom of Sweden",
            "zh-CN": "瑞典",
            native_names: "Sverige, Sweden",
            "ru-RU": "Швеция",
            "en-US": "Sweden",
            "pt-PT": "Suécia",
            "de-DE": "Schweden",
            cid: "192",
            "fr-FR": "Suède",
            country_code: "SWE",
            "es-ES": "Suecia",
            id: 185
        }, {
            "en-GB": "Switzerland",
            official_en_name: "Swiss Confederation",
            "zh-CN": "瑞士",
            native_names: "Svizra, Switzerland, Suisse, Schweiz, Svizzera",
            "ru-RU": "Швейцария",
            "en-US": "Switzerland",
            "pt-PT": "Suíça",
            "de-DE": "Schweiz",
            cid: "193",
            "fr-FR": "Suisse",
            country_code: "CHE",
            "es-ES": "Suiza",
            id: 186
        }, {
            "en-GB": "Syria",
            official_en_name: "Syrian Arab Republic",
            "zh-CN": "叙利亚",
            native_names: "سوريا, Syria",
            "ru-RU": "Сирия",
            "en-US": "Syria",
            "pt-PT": "Síria",
            "de-DE": "Syrien",
            cid: "194",
            "fr-FR": "Syrie",
            country_code: "SYR",
            "es-ES": "Siria",
            id: 187
        }, {
            "en-GB": "Taiwan",
            official_en_name: "Republic of China (Taiwan)",
            cid: "195",
            native_names: "台灣, Taiwan",
            "ru-RU": "Тайвань",
            "en-US": "Taiwan",
            "pt-PT": "Ilha Formosa",
            "de-DE": "Taiwan",
            "fr-FR": "Taïwan",
            country_code: "TWN",
            "es-ES": "Taiwán",
            id: 188
        }, {
            "en-GB": "Tajikistan",
            official_en_name: "Republic of Tajikistan",
            "zh-CN": "塔吉克斯坦",
            native_names: "Таджикистан, Tajikistan, Тоҷикистон",
            "ru-RU": "Таджикистан",
            "en-US": "Tajikistan",
            "pt-PT": "Tajiquistão",
            "de-DE": "Tadschikistan",
            cid: "196",
            "fr-FR": "Tadjikistan",
            country_code: "TJK",
            "es-ES": "Tayikistán",
            id: 189
        }, {
            "en-GB": "Tanzania",
            official_en_name: "United Republic of Tanzania",
            "zh-CN": "坦桑尼亚",
            native_names: "Tanzania",
            "ru-RU": "Танзания",
            "en-US": "Tanzania",
            "pt-PT": "Tanzânia",
            "de-DE": "Tansania",
            cid: "197",
            "fr-FR": "Tanzanie",
            country_code: "TZA",
            "es-ES": "Tanzania",
            id: 190
        }, {
            "en-GB": "Thailand",
            official_en_name: "Kingdom of Thailand",
            "zh-CN": "泰国",
            native_names: "ประเทศไทย, Thailand",
            "ru-RU": "Таиланд",
            "en-US": "Thailand",
            "pt-PT": "Tailândia",
            "de-DE": "Thailand",
            cid: "198",
            "fr-FR": "Thaïlande",
            country_code: "THA",
            "es-ES": "Tailandia",
            id: 191
        }, {
            "en-GB": "Bahamas",
            official_en_name: "Commonwealth of the Bahamas",
            cid: "199",
            native_names: "Bahamas",
            "ru-RU": "Багамские Острова",
            "en-US": "Bahamas",
            id: 192,
            "zh-CN": "巴哈马",
            "de-DE": "Bahamas",
            "fr-FR": "Bahamas",
            country_code: "BHS",
            "es-ES": "Bahamas",
            "pt-PT": "Bahamas"
        }, {
            "en-GB": "Togo",
            official_en_name: "Togolese Republic",
            "zh-CN": "多哥",
            native_names: "Togo",
            "ru-RU": "Того",
            "en-US": "Togo",
            "pt-PT": "Togo",
            "de-DE": "Togo",
            cid: "201",
            "fr-FR": "Togo",
            country_code: "TGO",
            "es-ES": "Togo",
            id: 193
        }, {
            "en-GB": "Tokelau",
            official_en_name: "Tokelau",
            "zh-CN": "托克劳",
            native_names: "Tokelau",
            "ru-RU": "Токелау",
            "en-US": "Tokelau",
            "pt-PT": "Tokelau",
            "de-DE": "Tokelau",
            cid: "202",
            "fr-FR": "Tokelau",
            country_code: "TKL",
            "es-ES": "Islas Tokelau",
            id: 194
        }, {
            "en-GB": "Tonga",
            official_en_name: "Kingdom of Tonga",
            "zh-CN": "汤� ",
            native_names: "Tonga",
            "ru-RU": "Тонга",
            "en-US": "Tonga",
            "pt-PT": "Tonga",
            "de-DE": "Tonga",
            cid: "203",
            "fr-FR": "Tonga",
            country_code: "TON",
            "es-ES": "Tonga",
            id: 195
        }, {
            "en-GB": "Trinidad and Tobago",
            official_en_name: "Republic of Trinidad and Tobago",
            "zh-CN": "特立尼达和多巴哥",
            native_names: "Trinidad and Tobago",
            "ru-RU": "Тринидад и Тобаго",
            "en-US": "Trinidad and Tobago",
            "pt-PT": "Trinidade e Tobago",
            "de-DE": "Trinidad und Tobago",
            cid: "204",
            "fr-FR": "Trinité-et-Tobago",
            country_code: "TTO",
            "es-ES": "Trinidad y Tobago",
            id: 196
        }, {
            "en-GB": "Tunisia",
            official_en_name: "Tunisian Republic",
            "zh-CN": "突尼斯",
            native_names: "تونس, Tunisia",
            "ru-RU": "Тунис",
            "en-US": "Tunisia",
            "pt-PT": "Tunísia",
            "de-DE": "Tunesien",
            cid: "205",
            "fr-FR": "Tunisie",
            country_code: "TUN",
            "es-ES": "Túnez",
            id: 197
        }, {
            "en-GB": "Turkey",
            official_en_name: "Republic of Turkey",
            "zh-CN": "土耳其",
            native_names: "Türkiye, Turkey",
            "ru-RU": "Турция",
            "en-US": "Turkey",
            "pt-PT": "Turquia",
            "de-DE": "Türkei",
            cid: "206",
            "fr-FR": "Turquie",
            country_code: "TUR",
            "es-ES": "Turquía",
            id: 198
        }, {
            "en-GB": "Turkmenistan",
            official_en_name: "Turkmenistan",
            "zh-CN": "土库曼斯坦",
            native_names: "Туркмения, Turkmenistan, Türkmenistan",
            "ru-RU": "Туркмения",
            "en-US": "Turkmenistan",
            "pt-PT": "Turquemenistão",
            "de-DE": "Turkmenistan",
            cid: "207",
            "fr-FR": "Turkménistan",
            country_code: "TKM",
            "es-ES": "Turkmenistán",
            id: 199
        }, {
            "en-GB": "Turks and Caicos Islands",
            official_en_name: "Turks and Caicos Islands",
            "zh-CN": "特克斯和凯科斯群岛",
            native_names: "Turks and Caicos Islands",
            "ru-RU": "Теркс и Кайкос",
            "en-US": "Turks and Caicos Islands",
            "pt-PT": "Ilhas Turks e Caicos",
            "de-DE": "Turks-und Caicosinseln",
            cid: "208",
            "fr-FR": "Îles Turques-et-Caïques",
            country_code: "TCA",
            "es-ES": "Islas Turks y Caicos",
            id: 200
        }, {
            "en-GB": "Tuvalu",
            official_en_name: "Tuvalu",
            "zh-CN": "图瓦卢",
            native_names: "Tuvalu",
            "ru-RU": "Тувалу",
            "en-US": "Tuvalu",
            "pt-PT": "Tuvalu",
            "de-DE": "Tuvalu",
            cid: "209",
            "fr-FR": "Tuvalu",
            country_code: "TUV",
            "es-ES": "Tuvalu",
            id: 201
        }, {
            "en-GB": "Uganda",
            official_en_name: "Republic of Uganda",
            "zh-CN": "乌干达",
            native_names: "Uganda",
            "ru-RU": "Уганда",
            "en-US": "Uganda",
            "pt-PT": "Uganda",
            "de-DE": "Uganda",
            cid: "210",
            "fr-FR": "Ouganda",
            country_code: "UGA",
            "es-ES": "Uganda",
            id: 202
        }, {
            "en-GB": "Ukraine",
            official_en_name: "Ukraine",
            "zh-CN": "乌克兰",
            native_names: "Україна, Ukraine",
            "ru-RU": "Украина",
            "en-US": "Ukraine",
            "pt-PT": "Ucrânia",
            "de-DE": "Ukraine",
            cid: "211",
            "fr-FR": "Ukraine",
            country_code: "UKR",
            "es-ES": "Ucrania",
            id: 203
        }, {
            "en-GB": "United Arab Emirates",
            official_en_name: "United Arab Emirates",
            "zh-CN": "阿拉伯联合酋长国",
            native_names: "دولة الإمارات العربية المتحدة, United Arab Emirates",
            "ru-RU": "Объединённые Арабские Эмираты",
            "en-US": "United Arab Emirates",
            "pt-PT": "Emirados Árabes Unidos",
            "de-DE": "Vereinigte Arabische Emirate",
            cid: "212",
            "fr-FR": "Émirats arabes unis",
            country_code: "ARE",
            "es-ES": "Emiratos Árabes Unidos",
            id: 204
        }, {
            "en-GB": "United Kingdom",
            official_en_name: "United Kingdom of Great Britain and Northern Ireland",
            "zh-CN": "英国",
            native_names: "United Kingdom",
            "ru-RU": "Великобритания",
            "en-US": "United Kingdom",
            "pt-PT": "Reino Unido",
            "de-DE": "Vereinigtes Königreich",
            cid: "213",
            "fr-FR": "Royaume-Uni",
            country_code: "GBR",
            "es-ES": "Reino Unido",
            id: 205
        }, {
            "en-GB": "United States",
            official_en_name: "United States of America",
            "zh-CN": "美国",
            native_names: "United States",
            "ru-RU": "Соединённые Штаты Америки",
            "en-US": "United States",
            "pt-PT": "Estados Unidos",
            "de-DE": "Vereinigte Staaten von Amerika",
            cid: "214",
            "fr-FR": "États-Unis",
            country_code: "USA",
            "es-ES": "Estados Unidos",
            id: 206
        }, {
            "en-GB": "Uruguay",
            official_en_name: "Oriental Republic of Uruguay",
            "zh-CN": "乌拉圭",
            native_names: "Uruguay",
            "ru-RU": "Уругвай",
            "en-US": "Uruguay",
            "pt-PT": "Uruguai",
            "de-DE": "Uruguay",
            cid: "215",
            "fr-FR": "Uruguay",
            country_code: "URY",
            "es-ES": "Uruguay",
            id: 207
        }, {
            "en-GB": "Uzbekistan",
            official_en_name: "Republic of Uzbekistan",
            "zh-CN": "乌兹别克斯坦",
            native_names: "Узбекистан, Uzbekistan, O‘zbekiston",
            "ru-RU": "Узбекистан",
            "en-US": "Uzbekistan",
            "pt-PT": "Uzbequistão",
            "de-DE": "Usbekistan",
            cid: "216",
            "fr-FR": "Ouzbékistan",
            country_code: "UZB",
            "es-ES": "Uzbekistán",
            id: 208
        }, {
            "en-GB": "Vanuatu",
            official_en_name: "Republic of Vanuatu",
            "zh-CN": "瓦努阿图",
            native_names: "Vanuatu",
            "ru-RU": "Вануату",
            "en-US": "Vanuatu",
            "pt-PT": "Vanuatu",
            "de-DE": "Vanuatu",
            cid: "217",
            "fr-FR": "Vanuatu",
            country_code: "VUT",
            "es-ES": "Vanuatu",
            id: 209
        }, {
            "en-GB": "Vatican City",
            official_en_name: "Vatican City State",
            "zh-CN": "梵蒂冈",
            native_names: "Vaticanæ, Vatican City, Vaticano",
            "ru-RU": "Ватикан",
            "en-US": "Vatican City",
            "pt-PT": "Cidade do Vaticano",
            "de-DE": "Vatikanstadt",
            cid: "218",
            "fr-FR": "Cité du Vatican",
            country_code: "VAT",
            "es-ES": "Ciudad del Vaticano",
            id: 210
        }, {
            "en-GB": "Venezuela",
            official_en_name: "Bolivarian Republic of Venezuela",
            "zh-CN": "委内瑞拉",
            native_names: "Venezuela",
            "ru-RU": "Венесуэла",
            "en-US": "Venezuela",
            "pt-PT": "Venezuela",
            "de-DE": "Venezuela",
            cid: "219",
            "fr-FR": "Venezuela",
            country_code: "VEN",
            "es-ES": "Venezuela",
            id: 211
        }, {
            "en-GB": "Vietnam",
            official_en_name: "Socialist Republic of Vietnam",
            "zh-CN": "越南",
            native_names: "Việt Nam, Vietnam",
            "ru-RU": "Вьетнам",
            "en-US": "Vietnam",
            "pt-PT": "Vietname",
            "de-DE": "Vietnam",
            cid: "220",
            "fr-FR": "Viêt Nam",
            country_code: "VNM",
            "es-ES": "Vietnam",
            id: 212
        }, {
            "en-GB": "Yemen",
            official_en_name: "Republic of Yemen",
            "zh-CN": "也门",
            native_names: "اليَمَن, Yemen",
            "ru-RU": "Йемен",
            "en-US": "Yemen",
            "pt-PT": "Iémen",
            "de-DE": "Jemen",
            cid: "221",
            "fr-FR": "Yémen",
            country_code: "YEM",
            "es-ES": "Yemen",
            id: 213
        }, {
            "en-GB": "Zambia",
            official_en_name: "Republic of Zambia",
            "zh-CN": "赞比亚",
            native_names: "Zambia",
            "ru-RU": "Замбия",
            "en-US": "Zambia",
            "pt-PT": "Zâmbia",
            "de-DE": "Sambia",
            cid: "222",
            "fr-FR": "Zambie",
            country_code: "ZMB",
            "es-ES": "Zambia",
            id: 214
        }, {
            "en-GB": "Zimbabwe",
            official_en_name: "Republic of Zimbabwe",
            "zh-CN": "津巴布韦",
            native_names: "Zimbabwe",
            "ru-RU": "Зимбабве",
            "en-US": "Zimbabwe",
            "pt-PT": "Zimbabwe",
            "de-DE": "Simbabwe",
            cid: "223",
            "fr-FR": "Zimbabwe",
            country_code: "ZWE",
            "es-ES": "Zimbabue",
            id: 215
        }]
    });
    return {}
}();
var $__build_47_constants_47_carBrands_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/carBrands.js";
    angular.module("orsApp").constant("carBrands", ["Abarth", "Alfa Romeo", "Aston Martin", "Audi", "BMW", "Bentley", "Cadillac", "Chevrolet", "Citroën", "Dacia", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lamborghini", "Land Rover", "Lexus", "Lotus", "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Morgan Motor", "Nissan", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Seat", "Smart", "SsangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "VW", "Vauxhall", "Volvo", "� koda"]);
    return {}
}();
var $__build_47_constants_47_carCategories_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/carCategories.js";
    angular.module("orsApp").constant("carCategories", {
        a: {
            de: "Kleinstwagen",
            en: "mini cars",
            short: "a"
        },
        b: {
            de: "Kleinwagen",
            en: "small cars",
            short: "b"
        },
        c: {
            de: "Mittelklasse",
            en: "medium cars",
            short: "c"
        },
        d: {
            de: "Obere Mittelklasse",
            en: "large cars",
            short: "d"
        },
        e: {
            de: "Oberklasse",
            en: "executive cars",
            short: "e"
        },
        f: {
            de: "Luxusklasse",
            en: "luxury cars",
            short: "f"
        },
        j: {
            de: "SUV",
            en: "SUV",
            short: "j"
        },
        lcv: {
            de: "Nutzfahrzeuge",
            en: "Utilities",
            short: "lcv"
        },
        m: {
            de: "Van",
            en: "MiniVaN - multi purpose cars",
            short: "m"
        },
        pu: {
            de: "Pick-up",
            en: "Pick-up",
            short: "pu"
        },
        s: {
            de: "Sportwagen",
            en: "sport coupés",
            short: "s"
        }
    });
    return {}
}();
var $__build_47_constants_47_mappings_46_js__ = function() {
    "use strict";
    var __moduleName = "build/constants/mappings.js";
    angular.module("orsApp").constant("mappings", {
        default: {
            "-1": {
                text: "default",
                color: "grey"
            }
        },
        steepness: {
            "-5": {
                text: "16%+",
                type: "-1",
                color: "#028306"
            },
            "-4": {
                text: "10-15%",
                type: "-1",
                color: "#2AA12E"
            },
            "-3": {
                text: "7-9%",
                type: "-1",
                color: "#53BF56"
            },
            "-2": {
                text: "4-6%",
                type: "-1",
                color: "#7BDD7E"
            },
            "-1": {
                text: "1-3%",
                type: "-1",
                color: "#A4FBA6"
            },
            0: {
                text: "0%",
                type: "0",
                color: "#ffcc99"
            },
            1: {
                text: "1-3%",
                type: "1",
                color: "#F29898"
            },
            2: {
                text: "4-6%",
                type: "1",
                color: "#E07575"
            },
            3: {
                text: "7-9%",
                type: "1",
                color: "#CF5352"
            },
            4: {
                text: "10-15%",
                type: "1",
                color: "#BE312F"
            },
            5: {
                text: "16%+",
                type: "1",
                color: "#AD0F0C"
            }
        },
        waytypes: {
            0: {
                text: "Other",
                color: "#30959e"
            },
            1: {
                text: "StateRoad",
                color: "#3f9da6"
            },
            2: {
                text: "Road",
                color: "#4ea5ae"
            },
            3: {
                text: "Street",
                color: "#5baeb5"
            },
            4: {
                text: "Path",
                color: "#67b5bd"
            },
            5: {
                text: "Track",
                color: "#73bdc4"
            },
            6: {
                text: "Cycleway",
                color: "#7fc7cd"
            },
            7: {
                text: "Footway",
                color: "#8acfd5"
            },
            8: {
                text: "Steps",
                color: "#96d7dc"
            },
            9: {
                text: "Ferry",
                color: "#a2dfe5"
            },
            10: {
                text: "Construction",
                color: "#ade8ed"
            }
        },
        surface: {
            0: {
                text: "Other",
                color: "#ddcdeb"
            },
            1: {
                text: "Paved",
                color: "#cdb8df"
            },
            2: {
                text: "Unpaved",
                color: "#d2c0e3"
            },
            3: {
                text: "Asphalt",
                color: "#bca4d3"
            },
            4: {
                text: "Concrete",
                color: "#c1abd7"
            },
            5: {
                text: "Cobblestone",
                color: "#c7b2db"
            },
            6: {
                text: "Metal",
                color: "#e8dcf3"
            },
            7: {
                text: "Wood",
                color: "#eee3f7"
            },
            8: {
                text: "Compacted Gravel",
                color: "#d8c6e7"
            },
            9: {
                text: "Fine Gravel",
                color: "#8f9de4"
            },
            10: {
                text: "Gravel",
                color: "#e3d4ef"
            },
            11: {
                text: "Dirt",
                color: "#99a6e7"
            },
            12: {
                text: "Ground",
                color: "#a3aeeb"
            },
            13: {
                text: "Ice",
                color: "#acb6ee"
            },
            14: {
                text: "Paving Stones",
                color: "#b6c0f2"
            },
            15: {
                text: "Sand",
                color: "#c9d1f8"
            },
            16: {
                text: "Woodchips",
                color: "#c0c8f5"
            },
            17: {
                text: "Grass",
                color: "#d2dafc"
            },
            18: {
                text: "Grass Paver",
                color: "#dbe3ff"
            }
        },
        suitability: {
            3: {
                text: "3/10",
                color: "#3D3D3D"
            },
            4: {
                text: "4/10",
                color: "#4D4D4D"
            },
            5: {
                text: "5/10",
                color: "#5D5D5D"
            },
            6: {
                text: "6/10",
                color: "#6D6D6D"
            },
            7: {
                text: "7/10",
                color: "#7C7C7C"
            },
            8: {
                text: "8/10",
                color: "#8D8D8D"
            },
            9: {
                text: "9/10",
                color: "#9D9D9D"
            },
            10: {
                text: "10/10",
                color: "#ADADAD"
            }
        },
        green: {
            3: {
                text: "10/10",
                color: "#8ec639"
            },
            4: {
                text: "9/10",
                color: "#99c93c"
            },
            5: {
                text: "8/10",
                color: "#a4cc40"
            },
            6: {
                text: "7/10",
                color: "#afcf43"
            },
            7: {
                text: "6/10",
                color: "#bbd246"
            },
            8: {
                text: "5/10",
                color: "#c6d54a"
            },
            9: {
                text: "4/10",
                color: "#d1d84e"
            },
            10: {
                text: "3/10",
                color: "#dcdc51"
            }
        },
        noise: {
            7: {
                text: "7/10",
                color: "#F8A056"
            },
            8: {
                text: "8/10",
                color: "#EA7F27"
            },
            9: {
                text: "9/10",
                color: "#A04900"
            },
            10: {
                text: "10/10",
                color: "#773600"
            }
        },
        tollways: {
            0: {
                text: "LOCALE_NO_TOLLWAY",
                color: "#6ca97b"
            },
            1: {
                text: "LOCALE_TOLLWAY",
                color: "#ffb347"
            }
        },
        avgspeed: {
            3: {
                text: "3 km/h",
                color: "#f2fdff",
                rangeBot: "0",
                rangeTop: "4"
            },
            4: {
                text: "4 km/h",
                color: "#D8FAFF",
                rangeBot: "4",
                rangeTop: "5"
            },
            5: {
                text: "5 km/h",
                color: "bff7ff",
                rangeBot: "5",
                rangeTop: "6"
            },
            6: {
                text: "6-8 km/h",
                color: "#f2f7ff",
                rangeBot: "5",
                rangeTop: "9"
            },
            9: {
                text: "9-12 km/h",
                color: "#d8e9ff",
                rangeBot: "9",
                rangeTop: "13"
            },
            13: {
                text: "13-16 km/h",
                color: "#bedaff",
                rangeBot: "13",
                rangeTop: "17"
            },
            17: {
                text: "17-20 km/h",
                color: "#a5cbff",
                rangeBot: "17",
                rangeTop: "21"
            },
            21: {
                text: "21-24 km/h",
                color: "#8cbcff",
                rangeBot: "21",
                rangeTop: "25"
            },
            25: {
                text: "25-29 km/h",
                color: "#72aeff",
                rangeBot: "25",
                rangeTop: "30"
            },
            30: {
                text: "30-34 km/h",
                color: "#599fff",
                rangeBot: "30",
                rangeTop: "35"
            },
            35: {
                text: "35-39 km/h",
                color: "#3f91ff",
                rangeBot: "35",
                rangeTop: "40"
            },
            40: {
                text: "40-44 km/h",
                color: "#2682ff",
                rangeBot: "40",
                rangeTop: "45"
            },
            45: {
                text: "45-49 km/h",
                color: "#0d73ff",
                rangeBot: "45",
                rangeTop: "50"
            },
            50: {
                text: "50-59 km/h",
                color: "#0067f2",
                rangeBot: "50",
                rangeTop: "60"
            },
            60: {
                text: "60-69 km/h",
                color: "#005cd9",
                rangeBot: "60",
                rangeTop: "70"
            },
            70: {
                text: "70-79 km/h",
                color: "#0051c0",
                rangeBot: "70",
                rangeTop: "80"
            },
            80: {
                text: "80-99 km/h",
                color: "#0046a6",
                rangeBot: "80",
                rangeTop: "100"
            },
            100: {
                text: "100-119 km/h",
                color: "#003c8d",
                rangeBot: "100",
                rangeTop: "120"
            },
            120: {
                text: "+120 km/h",
                color: "#003174",
                rangeBot: "120",
                rangeTop: "300"
            }
        },
        traildifficulty: {
            0: {
                text: "Missing SAC tag",
                text_hiking: "Missing SAC tag",
                color: "#dfecec"
            },
            1: {
                text: "S0",
                text_hiking: "T1",
                color: "#9fc6c6"
            },
            2: {
                text: "S1",
                text_hiking: "T2",
                color: "#80b3b3"
            },
            3: {
                text: "S2",
                text_hiking: "T3",
                color: "#609f9f"
            },
            4: {
                text: "S3",
                text_hiking: "T4",
                color: "#4d8080"
            },
            5: {
                text: "S4",
                text_hiking: "T5",
                color: "#396060"
            },
            6: {
                text: "S5",
                text_hiking: "T6",
                color: "#264040"
            },
            7: {
                text: ">S5",
                color: "#132020"
            }
        },
        roadaccessrestrictions: {
            0: {
                text: "None (there are no restrictions)",
                color: "#fe7f6c"
            },
            1: {
                text: "No",
                color: "#FE7F9C"
            },
            2: {
                text: "Customers",
                color: "#FDAB9F"
            },
            4: {
                text: "Destination",
                color: "#FF66CC"
            },
            8: {
                text: "Delivery",
                color: "#FDB9C8"
            },
            16: {
                text: "Private",
                color: "#F64A8A"
            },
            32: {
                text: "Permissive",
                color: "#E0115F"
            }
        }
    });
    return {}
}();
var $__build_47_values_47_globals_46_js__ = function() {
    "use strict";
    var __moduleName = "build/values/globals.js";
    angular.module("orsApp").value("globals", {
        showHeightgraph: true
    });
    return {}
}();
var $__build_47_infrastructure_47_ors_45_settings_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-settings-service.js";
    angular.module("orsApp.settings-service", []).factory("orsSettingsFactory", ["$timeout", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsRouteService", "orsAaService", "orsMessagingService", "lists", "weathercheck", "orsFuelService", function($timeout, orsObjectsFactory, orsUtilsService, orsRequestService, orsRouteService, orsAaService, orsMessagingService, lists, weathercheck, orsFuelService) {
        var orsSettingsFactory = {};
        orsSettingsFactory.routingWaypointsSubject = new Rx.BehaviorSubject({});
        orsSettingsFactory.routingSettingsSubject = new Rx.BehaviorSubject({
            waypoints: []
        });
        orsSettingsFactory.aaWaypointsSubject = new Rx.BehaviorSubject({});
        orsSettingsFactory.aaSettingsSubject = new Rx.BehaviorSubject({
            waypoints: []
        });
        orsSettingsFactory.userOptionsSubject = new Rx.BehaviorSubject({});
        orsSettingsFactory.mapOptionsInitSubject = new Rx.ReplaySubject(1);
        orsSettingsFactory.ngRouteSubject = new Rx.BehaviorSubject(undefined);
        orsSettingsFactory.requestSubject = new Rx.Subject;
        var currentSettingsObj, currentWaypointsObj;
        orsSettingsFactory.isInitialized = false;
        orsSettingsFactory.focusIdx = true;
        orsSettingsFactory.setSettings = function(set) {
            orsSettingsFactory[currentSettingsObj].onNext(set)
        };
        orsSettingsFactory.setUserOptions = function(params) {
            if (params === undefined) return;
            var set = orsSettingsFactory.userOptionsSubject.getValue();
            for (var k in params) {
                set[k] = params[k]
            }
            orsSettingsFactory.userOptionsSubject.onNext(set);
            orsSettingsFactory.mapOptionsInitSubject.onNext(set)
        };
        orsSettingsFactory.getUserOptions = function() {
            return orsSettingsFactory.userOptionsSubject.getValue()
        };
        orsSettingsFactory.getActiveProfile = function() {
            return orsSettingsFactory[currentSettingsObj].getValue().profile
        };
        orsSettingsFactory.getActiveOptions = function() {
            return orsSettingsFactory[currentSettingsObj].getValue().profile.options
        };
        orsSettingsFactory.setActiveOptions = function(options, fireRequest) {
            orsSettingsFactory[currentSettingsObj].getValue().profile.options = options;
            if (fireRequest) orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue());
            if (orsSettingsFactory.isInitialized) {
                orsUtilsService.parseSettingsToPermalink(orsSettingsFactory[currentSettingsObj].getValue(), orsSettingsFactory.getUserOptions())
            }
        };
        orsSettingsFactory.getSettings = function() {
            return orsSettingsFactory[currentSettingsObj].getValue()
        };
        orsSettingsFactory.subscribeToWaypoints = function(o) {
            return orsSettingsFactory.routingWaypointsSubject.subscribe(o)
        };
        orsSettingsFactory.subscribeToAaWaypoints = function(o) {
            return orsSettingsFactory.aaWaypointsSubject.subscribe(o)
        };
        orsSettingsFactory.subscribeToNgRoute = function(o) {
            return orsSettingsFactory.ngRouteSubject.subscribe(o)
        };
        orsSettingsFactory.subscribeToRouteRequest = function(o) {
            return orsSettingsFactory.requestSubject.subscribe(o)
        };
        orsSettingsFactory.getWaypoints = function() {
            return orsSettingsFactory[currentSettingsObj].getValue().waypoints
        };
        orsSettingsFactory.initWaypoints = function(n) {
            orsSettingsFactory[currentSettingsObj].getValue().waypoints = [];
            var wp;
            for (var i = 1; i <= n; i++) {
                wp = orsObjectsFactory.createWaypoint("", new L.latLng);
                orsSettingsFactory[currentSettingsObj].getValue().waypoints.push(wp)
            }
            orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue());
            return orsSettingsFactory[currentSettingsObj].getValue().waypoints
        };
        orsSettingsFactory.updateWaypoint = function(idx, address, pos) {
            var fireRequest = arguments[3] !== void 0 ? arguments[3] : true;
            orsSettingsFactory.focusIdx = false;
            orsSettingsFactory[currentSettingsObj].getValue().waypoints[idx]._latlng = pos;
            orsSettingsFactory[currentSettingsObj].getValue().waypoints[idx]._address = address;
            if (fireRequest) orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue())
        };
        orsSettingsFactory.updateWaypoints = function() {
            orsSettingsFactory[currentWaypointsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue().waypoints)
        };
        orsSettingsFactory.setAvoidableAreas = function(avoidablePolygons) {
            orsSettingsFactory[currentSettingsObj].getValue().avoidable_polygons = avoidablePolygons;
            orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue())
        };
        orsSettingsFactory.updateNgRoute = function(newRoute) {
            currentSettingsObj = orsSettingsFactory.getCurrentSettings(newRoute);
            currentWaypointsObj = orsSettingsFactory.getCurrentWaypoints(newRoute);
            orsAaService.aaRequests.clear();
            orsRouteService.routingRequests.clear();
            orsRequestService.geocodeRequests.clear();
            orsSettingsFactory.ngRouteSubject.onNext(newRoute)
        };
        orsSettingsFactory.handleRoutePresent = function(settings, num) {
            var sum = 0,
                routePresent = false;
            angular.forEach(settings.waypoints, function(waypoint) {
                sum += waypoint._set;
                if (sum == num) {
                    routePresent = true;
                    return
                }
            });
            return routePresent
        };
        orsSettingsFactory.routingSettingsSubject.subscribe(function(settings) {
            var isRoutePresent = orsSettingsFactory.handleRoutePresent(settings, 2);
            if (isRoutePresent) {
                orsSettingsFactory.requestSubject.onNext(true);
                orsRouteService.routingRequests.clear();
                orsRouteService.resetRoute();
                var userOptions = orsSettingsFactory.getUserOptions();
                var payload = orsUtilsService.routingPayload(settings, userOptions);
                var request = orsRouteService.fetchRoute(payload);
                orsRouteService.routingRequests.requests.push(request);
                request.promise.then(function(response) {
                    orsSettingsFactory.requestSubject.onNext(false);
                    var profile = settings.profile.type;
                    orsRouteService.processResponse(response, profile, orsSettingsFactory.focusIdx, settings.profile.options.landmarks);
                    var ofsSettings = profile === "Car" ? settings.profile.options.ofs : undefined;
                    if (ofsSettings) {
                        orsFuelService.getConsumption(ofsSettings)
                    }
                }, function(response) {
                    orsSettingsFactory.requestSubject.onNext(false)
                })
            }
        });
        orsSettingsFactory.aaSettingsSubject.subscribe(function(settings) {
            var isAaPresent = orsSettingsFactory.handleRoutePresent(settings, 1);
            if (isAaPresent) {
                orsSettingsFactory.requestSubject.onNext(true);
                orsAaService.aaRequests.clear();
                var payload = orsUtilsService.isochronesPayload(settings);
                var request = orsAaService.getIsochrones(payload);
                orsAaService.aaRequests.requests.push(request);
                request.promise.then(function(response) {
                    orsAaService.processResponse(response, settings);
                    orsSettingsFactory.requestSubject.onNext(false)
                }, function(response) {
                    orsSettingsFactory.requestSubject.onNext(false)
                })
            }
        });
        orsSettingsFactory.getAddress = function(pos, idx, init) {
            var fromHover = arguments[3] !== void 0 ? arguments[3] : false;
            if (!fromHover) {
                if (!init) {
                    var set = orsSettingsFactory[currentSettingsObj].getValue();
                    if (idx === 0) {
                        idx = 0
                    } else if (idx == 2) {
                        idx = set.waypoints.length - 1
                    } else if (idx == 1) {
                        idx = set.waypoints.length - 2
                    }
                }
            }
            var latLngString = orsUtilsService.parseLatLngString(pos);
            var lngLatString = orsUtilsService.parseLngLatString(pos);
            orsSettingsFactory.updateWaypointAddress(idx, latLngString, init);
            var payload = orsUtilsService.geocodingPayload(lngLatString, true);
            var request = orsRequestService.geocode(payload, true);
            var requestsQue = orsSettingsFactory.ngRouteSubject.getValue() == "directions" ? "routeRequests" : "aaRequests";
            orsRequestService.geocodeRequests.updateRequest(request, idx, requestsQue);
            request.promise.then(function(data) {
                if (data.features.length > 0) {
                    var addressData = orsUtilsService.addShortAddresses(data.features)[0];
                    var addressStrings = [addressData.processed.primary, addressData.processed.secondary];
                    addressStrings = addressStrings.join(", ");
                    orsSettingsFactory.updateWaypointAddress(idx, addressStrings, init)
                } else {
                    orsMessagingService.messageSubject.onNext(lists.errors.GEOCODE)
                }
            }, function(response) {})
        };
        orsSettingsFactory.updateWaypointAddress = function(idx, address, init) {
            var set = orsSettingsFactory[currentSettingsObj].getValue();
            set.waypoints[idx]._address = address
        };
        orsSettingsFactory.setWaypoints = function(waypoints) {
            var fireRequest = arguments[1] !== void 0 ? arguments[1] : true;
            orsSettingsFactory[currentSettingsObj].getValue().waypoints = waypoints;
            if (fireRequest) orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue());
            orsSettingsFactory[currentWaypointsObj].onNext(waypoints);
            orsUtilsService.parseSettingsToPermalink(orsSettingsFactory[currentSettingsObj].getValue(), orsSettingsFactory.getUserOptions())
        };
        orsSettingsFactory.setWaypoint = function(waypoint, idx) {
            var fireRequest = arguments[2] !== void 0 ? arguments[2] : true;
            orsSettingsFactory[currentSettingsObj].getValue().waypoints[idx] = waypoint;
            if (fireRequest) orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue());
            orsSettingsFactory[currentWaypointsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue().waypoints);
            orsUtilsService.parseSettingsToPermalink(orsSettingsFactory[currentSettingsObj].getValue(), orsSettingsFactory.getUserOptions())
        };
        orsSettingsFactory.insertWaypointFromMap = function(idx, wp) {
            var fireRequest = arguments[2] !== void 0 ? arguments[2] : true;
            var fromHover = arguments[3] !== void 0 ? arguments[3] : false;
            if (fromHover) {
                orsSettingsFactory[currentSettingsObj].value.waypoints.splice(idx, 0, wp);
                orsSettingsFactory.focusIdx = false
            } else {
                if (idx === 0) {
                    orsSettingsFactory[currentSettingsObj].value.waypoints[idx] = wp
                } else if (idx == 2) {
                    orsSettingsFactory[currentSettingsObj].value.waypoints[orsSettingsFactory[currentSettingsObj].value.waypoints.length - 1] = wp
                } else if (idx == 1) {
                    orsSettingsFactory[currentSettingsObj].value.waypoints.splice(orsSettingsFactory[currentSettingsObj].value.waypoints.length - 1, 0, wp);
                    orsSettingsFactory.focusIdx = false
                }
            }
            orsSettingsFactory[currentWaypointsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue().waypoints);
            if (fireRequest) orsSettingsFactory[currentSettingsObj].onNext(orsSettingsFactory[currentSettingsObj].getValue())
        };
        orsSettingsFactory.getCurrentSettings = function(path) {
            var settingsObject;
            if (path == "directions") {
                settingsObject = "routingSettingsSubject"
            } else if (path == "reach") {
                settingsObject = "aaSettingsSubject"
            }
            return settingsObject
        };
        orsSettingsFactory.getCurrentWaypoints = function(path) {
            var waypointsObject;
            if (path == "directions") {
                waypointsObject = "routingWaypointsSubject"
            } else if (path == "reach") {
                waypointsObject = "aaWaypointsSubject"
            }
            return waypointsObject
        };
        orsSettingsFactory.getIconIdx = function(idx) {
            var iconIdx;
            if (idx === 0) {
                iconIdx = 0
            } else if (idx == orsSettingsFactory[currentSettingsObj].getValue().waypoints.length - 1) {
                iconIdx = 2
            } else {
                iconIdx = 1
            }
            return iconIdx
        };
        orsSettingsFactory.setProfile = function(currentProfile) {
            orsUtilsService.parseSettingsToPermalink(orsSettingsFactory[currentSettingsObj].getValue(), orsSettingsFactory.getUserOptions());
            var set = orsSettingsFactory[currentSettingsObj].getValue();
            set.profile.type = currentProfile.type;
            var isAaPanel = orsSettingsFactory.ngRouteSubject.getValue() == "reach" ? true : false;
            if (!isAaPanel) orsSettingsFactory[currentSettingsObj].onNext(set)
        };
        orsUtilsService.getApiKey = function() {
            return weathercheck
        };
        return orsSettingsFactory
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_objects_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-objects-service.js";
    angular.module("orsApp.objects-service", []).factory("orsObjectsFactory", function() {
        var point = function() {
            function point(lat, lng) {
                this.type = "Feature";
                this.properties = {};
                this.geometry = {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
            return $traceurRuntime.createClass(point, {}, {})
        }();
        var waypoint = function() {
            function waypoint(address, latlng, set) {
                this._address = address;
                this._latlng = latlng;
                this._set = set
            }
            return $traceurRuntime.createClass(waypoint, {}, {})
        }();
        var mapAction = function() {
            function mapAction(aCode, layerCode, geometry, fId, style, extraInformation) {
                this._actionCode = aCode;
                this._package = {
                    layerCode: layerCode,
                    geometry: geometry,
                    featureId: fId,
                    style: style,
                    extraInformation: extraInformation
                }
            }
            return $traceurRuntime.createClass(mapAction, {}, {})
        }();
        return {
            createPoint: function(lat, lng) {
                return new point(lat, lng)
            },
            createWaypoint: function(address, latlng) {
                var set = arguments[2] !== void 0 ? arguments[2] : 0;
                return new waypoint(address, latlng, set)
            },
            createMapAction: function(actionCode, layerCode) {
                var geometry = arguments[2];
                var featureId = arguments[3];
                var style = arguments[4];
                var extraInformation = arguments[5];
                return new mapAction(actionCode, layerCode, geometry, featureId, style, extraInformation)
            }
        }
    });
    return {}
}();
var $__build_47_infrastructure_47_ors_45_map_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-map-service.js";
    angular.module("orsApp.map-service", []).factory("orsMapFactory", [function() {
        var mapServiceSubject = new Rx.Subject;
        var subscribeToMapFunctions = function(o) {
            return mapServiceSubject.subscribe(o)
        };
        return {
            subscribeToMapFunctions: subscribeToMapFunctions,
            mapServiceSubject: mapServiceSubject,
            initMap: function(element) {
                var southWest = L.latLng(-89.98155760646617, -180),
                    northEast = L.latLng(89.99346179538875, 180);
                var bounds = L.latLngBounds(southWest, northEast);
                return L.map(element, {
                    zoomControl: false,
                    layerControl: true,
                    tap: true,
                    editable: true,
                    maxBounds: bounds,
                    minZoom: 2,
                    maxZoom: 17
                })
            }
        }
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_request_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-request-service.js";
    angular.module("orsApp.request-service", []).factory("orsRequestService", ["$q", "$http", "orsUtilsService", "orsObjectsFactory", "orsMapFactory", "lists", "orsNamespaces", "ENV", function($q, $http, orsUtilsService, orsObjectsFactory, orsMapFactory, lists, orsNamespaces, ENV) {
        var orsRequestService = {};
        orsRequestService.geocodeRequests = {};
        orsRequestService.geocodeRequests.aaRequests = [];
        orsRequestService.geocodeRequests.routeRequests = [];
        orsRequestService.requestSubject = new Rx.Subject;
        orsRequestService.savedRequests = {
            directions: [],
            geocoding: []
        };
        orsRequestService.subscribeToGeocodingRequest = function(o) {
            return orsRequestService.requestSubject.subscribe(o)
        };
        orsRequestService.geocodeRequests.updateRequest = function(request, idx, requestsQue) {
            if (typeof orsRequestService.geocodeRequests[requestsQue][idx] === "undefined") {
                orsRequestService.geocodeRequests[requestsQue][idx] = request
            } else {
                orsRequestService.geocodeRequests[requestsQue][idx].cancel("Cancel last request");
                orsRequestService.geocodeRequests[requestsQue][idx] = request
            }
        };
        orsRequestService.geocodeRequests.removeRequest = function(idx, requestsQue) {
            if (typeof orsRequestService.geocodeRequests[requestsQue][idx] !== "undefined") {
                orsRequestService.geocodeRequests[requestsQue][idx].cancel("Cancel last request");
                orsRequestService.geocodeRequests[requestsQue].splice(idx, 1)
            }
        };
        orsRequestService.geocodeRequests.clear = function() {
            var $__4 = true;
            var $__5 = false;
            var $__6 = undefined;
            try {
                for (var $__2 = void 0, $__1 = orsRequestService.geocodeRequests.routeRequests[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                    var req = $__2.value; {
                        if ("cancel" in req) req.cancel("Cancel last request")
                    }
                }
            } catch ($__7) {
                $__5 = true;
                $__6 = $__7
            } finally {
                try {
                    if (!$__4 && $__1.return != null) {
                        $__1.return()
                    }
                } finally {
                    if ($__5) {
                        throw $__6
                    }
                }
            }
            var $__11 = true;
            var $__12 = false;
            var $__13 = undefined;
            try {
                for (var $__9 = void 0, $__8 = orsRequestService.geocodeRequests.aaRequests[Symbol.iterator](); !($__11 = ($__9 = $__8.next()).done); $__11 = true) {
                    var req$__15 = $__9.value; {
                        if ("cancel" in req$__15) req$__15.cancel("Cancel last request")
                    }
                }
            } catch ($__14) {
                $__12 = true;
                $__13 = $__14
            } finally {
                try {
                    if (!$__11 && $__8.return != null) {
                        $__8.return()
                    }
                } finally {
                    if ($__12) {
                        throw $__13
                    }
                }
            }
        };
        orsRequestService.zoomTo = function(geom) {
            var action = orsObjectsFactory.createMapAction(0, lists.layers[0], geom, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRequestService.geocode = function(requestData) {
            var reverse = arguments[1] !== void 0 ? arguments[1] : false;
            var url = ENV.geocode;
            reverse ? url += "/reverse" : url += "/search";
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: requestData,
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsRequestService.processResponse = function(response) {
            var data = response.data;
            return data
        };
        return orsRequestService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_utils_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-utils-service.js";
    angular.module("orsApp.utils-service", []).factory("orsUtilsService", ["$q", "$http", "$timeout", "$location", "$injector", "lists", "mappings", "ENV", function($q, $http, $timeout, $location, $injector, lists, mappings, ENV) {
        var orsUtilsService = {};
        orsUtilsService.trimCoordinates = function(coords, length) {
            var coordsTrimmed = [];
            for (var i = 0; i < coords.length; i++) {
                var pair = coords[i];
                if (pair !== undefined) {
                    var ptA = pair[0].toString().split(".");
                    var ptB = pair[1].toString().split(".");
                    ptA = ptA[0] + "." + ptA[1].substr(0, 5);
                    ptB = ptB[0] + "." + ptB[1].substr(0, 5);
                    coordsTrimmed.push([ptA, ptB])
                }
            }
            return coordsTrimmed
        };
        orsUtilsService.setExtraInformation = function(obj) {
            orsUtilsService.extra_information = obj
        };
        orsUtilsService.getExtraInformation = function() {
            return orsUtilsService.extra_information
        };
        orsUtilsService.isInt = function(n) {
            return Number(n) === n && n % 1 === 0
        };
        orsUtilsService.isFloat = function(n) {
            return Number(n) === n && n % 1 !== 0
        };
        orsUtilsService.isCoordinate = function(lat, lng) {
            var ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
            var ck_lng = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
            var validLat = ck_lat.test(lat);
            var validLon = ck_lng.test(lng);
            if (validLat && validLon) {
                return true
            } else {
                return false
            }
        };
        orsUtilsService.roundCoordinate = function(coord) {
            coord = Math.round(coord * 1e6) / 1e6;
            return coord
        };
        orsUtilsService.parseLatLngString = function(latlng) {
            return Math.round(latlng.lat * 1e6) / 1e6 + ", " + Math.round(latlng.lng * 1e6) / 1e6
        };
        orsUtilsService.parseLngLatString = function(latlng) {
            return Math.round(latlng.lng * 1e6) / 1e6 + ", " + Math.round(latlng.lat * 1e6) / 1e6
        };
        orsUtilsService.decodePolyline = function(str, elevation, precision) {
            var index = 0,
                lat = 0,
                lng = 0,
                coordinates = [],
                shift = 0,
                result = 0,
                byte = null,
                latitude_change, longitude_change, factor = Math.pow(10, precision || 5);
            while (index < str.length) {
                byte = null;
                shift = 0;
                result = 0;
                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 31) << shift;
                    shift += 5
                } while (byte >= 32);
                latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
                shift = result = 0;
                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 31) << shift;
                    shift += 5
                } while (byte >= 32);
                longitude_change = result & 1 ? ~(result >> 1) : result >> 1;
                lat += latitude_change;
                lng += longitude_change;
                coordinates.push([lat / factor, lng / factor])
            }
            return coordinates
        };
        orsUtilsService.getShortenlink = function(location) {
            var requestData = {
                access_token: "d9c484e2c240975de02bfd2f2f4211ad3a0bab6d",
                longUrl: location
            };
            var url = ENV.shortenlink;
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: requestData,
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsUtilsService.routingPayload = function(settings, userSettings) {
            var payload;
            payload = {
                profile: lists.profiles[settings.profile.type].request,
                preference: settings.profile.options.weight.toLowerCase(),
                language: userSettings.routinglang,
                geometry_format: "geojson",
                instructions: true,
                geometry: true,
                units: "m",
                attributes: "detourfactor|percentage",
                instructions_format: "html",
                elevation: lists.profiles[settings.profile.type].elevation,
                options: JSON.stringify(orsUtilsService.generateOptions(settings))
            };
            if (payload.options.length == 2) delete payload.options;
            var subgroup = lists.profiles[settings.profile.type].subgroup;
            var waypoints = [];
            angular.forEach(settings.waypoints, function(waypoint) {
                if (waypoint._set == 1) waypoints.push(waypoint)
            });
            payload.coordinates = "";
            for (var j = 0, i = 0; i < waypoints.length; i++) {
                payload.coordinates += orsUtilsService.roundCoordinate(waypoints[i]._latlng.lng) + "," + orsUtilsService.roundCoordinate(waypoints[i]._latlng.lat) + "|"
            }
            payload.coordinates = payload.coordinates.slice(0, -1);
            payload.extra_info = [];
            var extra_infos = orsUtilsService.getExtraInformation();
            angular.forEach(extra_infos, function(value, key) {
                if (value && lists.extra_info[lists.profiles[settings.profile.type].subgroup].indexOf(key) >= 0) payload.extra_info.push(key)
            });
            payload.extra_info = payload.extra_info.join("|");
            if (payload.extra_info.length == 0) delete payload.extra_info;
            return payload
        };
        orsUtilsService.geocodingPayload = function(obj) {
            var reverse = arguments[1] !== void 0 ? arguments[1] : false;
            var language = arguments[2] !== void 0 ? arguments[2] : "en-US";
            var limit = arguments[3] !== void 0 ? arguments[3] : 5;
            var payload;
            var orsSettingsFactory = $injector.get("orsSettingsFactory");
            if (!reverse) {
                payload = {
                    text: obj,
                    lang: language,
                    size: limit,
                    "focus.point.lat": orsSettingsFactory.getUserOptions().lat,
                    "focus.point.lon": orsSettingsFactory.getUserOptions().lng
                }
            } else {
                payload = {
                    "point.lat": obj.split(", ")[1],
                    "point.lon": obj.split(", ")[0],
                    lang: language,
                    size: 1
                }
            }
            return payload
        };
        orsUtilsService.generateOptions = function(settings) {
            var subgroup = lists.profiles[settings.profile.type].subgroup;
            var options = {
                avoid_features: "",
                avoid_borders: "",
                avoid_countries: "",
                profile_params: {
                    weightings: {},
                    restrictions: {}
                }
            };
            angular.forEach(settings.profile.options.avoidables, function(value, key) {
                if (value === true) {
                    var avSubgroups = lists.optionList.avoidables[key].subgroups;
                    if (avSubgroups.indexOf(subgroup) !== -1) {
                        options.avoid_features += lists.optionList.avoidables[key].name + "|"
                    }
                }
            });
            if (subgroup === "Bicycle") {
                if (!angular.isUndefined(settings.profile.options.difficulty)) {
                    if (settings.profile.options.difficulty.avoidhills === true) options.avoid_features += "hills" + "|"
                }
            }
            if (options.avoid_features.length === 0) {
                delete options.avoid_features
            } else {
                options.avoid_features = options.avoid_features.slice(0, -1)
            }
            if (subgroup === "Car" || subgroup === "HeavyVehicle") {
                if (!angular.isUndefined(settings.profile.options.borders)) {
                    var borders = settings.profile.options.borders;
                    if (borders.all) {
                        options.avoid_borders = "all"
                    } else {
                        options.avoid_borders = borders.controlled ? "controlled" : "";
                        options.avoid_countries = borders.country;
                        if (!angular.isUndefined(borders.country)) options.avoid_countries = borders.country
                    }
                }
            }
            if (angular.equals(options.avoid_borders, "")) delete options.avoid_borders;
            if (angular.equals(options.avoid_countries, "")) delete options.avoid_countries;
            if (subgroup === "HeavyVehicle") {
                var vt = 0;
                if (!angular.isUndefined(settings.profile.options.width)) {
                    options.profile_params.restrictions.width = settings.profile.options.width.toString();
                    ++vt
                }
                if (!angular.isUndefined(settings.profile.options.height)) {
                    options.profile_params.restrictions.height = settings.profile.options.height.toString();
                    ++vt
                }
                if (!angular.isUndefined(settings.profile.options.hgvWeight)) {
                    options.profile_params.restrictions.weight = settings.profile.options.hgvWeight.toString();
                    ++vt
                }
                if (!angular.isUndefined(settings.profile.options.length)) {
                    options.profile_params.restrictions.length = settings.profile.options.length.toString();
                    ++vt
                }
                if (!angular.isUndefined(settings.profile.options.axleload)) {
                    options.profile_params.restrictions.axleload = settings.profile.options.axleload.toString();
                    ++vt
                }
                if (!angular.isUndefined(settings.profile.options.hazmat) && settings.profile.options.hazmat) {
                    options.profile_params.restrictions.hazmat = settings.profile.options.hazmat;
                    ++vt
                }
                if (vt !== 0) options.vehicle_type = settings.profile.type
            }
            if (settings.profile.options.maxspeed) options.maximum_speed = settings.profile.options.maxspeed.toString();
            if (subgroup === "Bicycle") {
                if (settings.profile.options.steepness > 0 & settings.profile.options.steepness <= 15) {
                    options.profile_params.restrictions.gradient = settings.profile.options.steepness.toString()
                }
                if (settings.profile.options.fitness >= 0 & settings.profile.options.fitness <= 3) {
                    options.profile_params.weightings.steepness_difficulty = {
                        level: settings.profile.options.fitness.toString()
                    }
                }
            }
            if (subgroup === "Pedestrian") {
                if (settings.profile.options.green) {
                    options.profile_params.weightings.green = {
                        factor: settings.profile.options.green
                    }
                }
                if (settings.profile.options.quiet) {
                    options.profile_params.weightings.quiet = {
                        factor: settings.profile.options.quiet
                    }
                }
            }
            if (settings.avoidable_polygons && settings.avoidable_polygons.coordinates.length > 0) {
                options.avoid_polygons = settings.avoidable_polygons
            }
            if (subgroup === "Wheelchair") {
                if (settings.profile.options.surface) options.profile_params.restrictions.surface_type = settings.profile.options.surface.toString();
                if (settings.profile.options.curb) options.profile_params.restrictions.maximum_sloped_kerb = settings.profile.options.curb.toString();
                if (settings.profile.options.incline) options.profile_params.restrictions.maximum_incline = settings.profile.options.incline.toString();
                if (settings.profile.options.wheelchairWidth) options.profile_params.restrictions.minimum_width = settings.profile.options.wheelchairWidth.toString()
            }
            if (angular.equals(options.profile_params.weightings, {})) delete options.profile_params.weightings;
            if (angular.equals(options.profile_params.restrictions, {})) delete options.profile_params.restrictions;
            if (angular.equals(options.profile_params, {})) delete options.profile_params;
            return JSON.parse(JSON.stringify(options))
        };
        orsUtilsService.isochronesPayload = function(settings) {
            var payload;
            payload = {
                format: "json",
                locations: orsUtilsService.roundCoordinate(settings.waypoints[0]._latlng.lng) + "," + orsUtilsService.roundCoordinate(settings.waypoints[0]._latlng.lat),
                range_type: parseInt(settings.profile.options.analysis_options.method) === 0 ? "time" : "distance",
                range: parseInt(settings.profile.options.analysis_options.method) === 0 ? settings.profile.options.analysis_options.isovalue * 60 : settings.profile.options.analysis_options.isovalue * 1e3,
                interval: parseInt(settings.profile.options.analysis_options.method) === 0 ? settings.profile.options.analysis_options.isointerval * 60 : settings.profile.options.analysis_options.isointerval * 1e3,
                location_type: settings.profile.options.analysis_options.reverseflow === true ? lists.isochroneOptionList.reverseFlow.destination : lists.isochroneOptionList.reverseFlow.start,
                profile: lists.profiles[settings.profile.type].request,
                attributes: "area|reachfactor|total_pop",
                options: JSON.stringify(orsUtilsService.generateOptions(settings))
            };
            if (payload.options.length == 2) delete payload.options;
            if (settings.avoidable_polygons && settings.avoidable_polygons.coordinates.length > 0) {
                payload.options.avoid_polygons = settings.avoidable_polygons
            }
            return payload
        };
        orsUtilsService.locationsCategoryPayload = function() {
            var payload;
            payload = {
                request: "list"
            };
            return payload
        };
        orsUtilsService.locationsPayload = function(settings) {
            var payload;
            payload = {
                request: "pois",
                geometry: {
                    bbox: settings.bbox
                },
                limit: 2e3,
                filters: {}
            };
            if (settings.categories.length > 0) payload.filters.category_group_ids = settings.categories.map(Number);
            if (settings.subCategories.length > 0) payload.filters.category_ids = settings.subCategories.map(Number);
            return payload
        };
        orsUtilsService.addShortAddresses = function(features) {
            angular.forEach(features, function(feature) {
                var properties = feature.properties;
                feature.processed = {};
                if ("name" in properties && properties.name.indexOf(properties.street) == -1 && properties.name !== properties.street) {
                    feature.processed.primary = properties.name;
                    if ("street" in properties) {
                        feature.processed.primary += ", " + properties.street;
                        if ("housenumber" in properties) {
                            feature.processed.primary += " " + properties.housenumber
                        }
                    }
                } else if ("street" in properties) {
                    var streetAddress = [];
                    streetAddress.push(properties.street);
                    if ("housenumber" in properties) {
                        streetAddress.push(properties.housenumber)
                    }
                    if (streetAddress.length > 0) {
                        feature.processed.primary = streetAddress.join(" ")
                    }
                } else if ("locality" in properties) {
                    feature.processed.primary = properties.locality
                }
                var secondary = [];
                if ("postalcode" in properties) {
                    secondary.push(properties.postalcode)
                }
                if ("neighbourhood" in properties) {
                    secondary.push(properties.neighbourhood)
                }
                if ("borough" in properties) {
                    secondary.push(properties.borough)
                }
                if ("locality" in properties && properties.locality !== properties.name) {
                    secondary.push(properties.locality)
                }
                if ("municipality" in properties && properties.municipality !== properties.name && properties.municipality !== properties.locality) {
                    secondary.push(properties.municipality)
                }
                if ("county" in properties && properties.county !== properties.name && properties.county !== properties.locality) {
                    secondary.push(properties.county)
                }
                if ("region" in properties && properties.region !== properties.name) {
                    secondary.push(properties.region)
                }
                if ("country" in properties && properties.country !== properties.name) {
                    secondary.push(properties.country)
                }
                if (secondary.length <= 1 && properties.country !== properties.name) secondary.push(properties.country);
                feature.processed.secondary = secondary.join(", ");
                feature.processed.place_type = properties.layer
            });
            return features
        };
        orsUtilsService.getElementsByTagNameNS = function(element, ns, tagName, collection) {
            if (element.getElementsByTagNameNS) {
                if (collection) {
                    var collectionArr = [];
                    collectionArr.push(element.getElementsByTagNameNS(ns, tagName));
                    return collectionArr
                }
                return element.getElementsByTagNameNS(ns, tagName)
            }
        };
        orsUtilsService.convertDistanceFormat = function(distance, uom) {
            uom = uom.toLowerCase();
            var origDistance = parseFloat(distance);
            distance = parseFloat(distance);
            if (distance >= 1e3) {
                uom = "km";
                distance = distance / 1e3;
                distance = orsUtilsService.round(distance)
            } else {
                uom = "m"
            }
            distance = orsUtilsService.round(distance);
            return [origDistance, distance, uom]
        };
        orsUtilsService.convertPositionStringToLonLat = function(positionString) {
            var pos = positionString.split(" ");
            pos = L.latLng(pos[1], pos[0]);
            return pos
        };
        orsUtilsService.round = function(distance) {
            var precision = 4;
            if (distance < .3) {
                precision = 3
            }
            if (distance >= .3) {
                precision = 2
            }
            if (distance > 2) {
                precision = 1
            }
            if (distance > 100) {
                precision = 0
            }
            if (distance > 300) {
                precision = -1
            }
            if (distance > 2e3) {
                precision = -2
            }
            var p = Math.pow(10, precision);
            return Math.round(distance * p) / p
        };
        orsUtilsService.parseSettingsToPermalink = function(settings, userOptions) {
            if (settings.profile === undefined) return;
            var link = "";
            if (userOptions.lat && userOptions.lng) {
                link += lists.permalinkKeys.lat + "=" + orsUtilsService.roundCoordinate(userOptions.lat) + "&";
                link += lists.permalinkKeys.lng + "=" + orsUtilsService.roundCoordinate(userOptions.lng) + "&"
            }
            if (userOptions.zoom) {
                link += lists.permalinkKeys.zoom + "=" + userOptions.zoom + "&"
            }
            var profile = angular.fromJson(angular.toJson(settings.profile));
            var waypoints = angular.fromJson(angular.toJson(settings.waypoints));

            function getProp(obj) {
                for (var o in obj) {
                    if ($traceurRuntime.typeof(obj[o]) == "object") {
                        getProp(obj[o])
                    } else {
                        if (lists.optionList.borders[o]) {
                            if (lists.optionList.borders[o].subgroups.includes(lists.profiles[settings.profile.type].subgroup)) {
                                if (o == "country") {
                                    if (obj[o] !== "") {
                                        var c = obj[o].replace(/\|/g, ",");
                                        link += "&" + lists.permalinkKeys[o] + "=" + c
                                    }
                                } else {
                                    if (obj[o] === true) {
                                        link += "&" + lists.permalinkKeys[o] + "=1"
                                    } else if (obj[o] === false) {} else {
                                        link += "&" + lists.permalinkKeys[o] + "=" + obj[o]
                                    }
                                }
                            }
                        } else if (typeof obj[o] !== "function" && o.toString().charAt(0) !== "_" && (lists.permalinkFilters[settings.profile.type].includes(o) || lists.permalinkFilters.analysis.includes(o))) {
                            if (obj[o] in lists.profiles) {
                                link += "&" + lists.permalinkKeys[o] + "=" + lists.profiles[obj[o]].shortValue
                            } else if (obj[o] in lists.optionList.weight) {
                                link += "&" + lists.permalinkKeys[o] + "=" + lists.optionList.weight[obj[o]].shortValue
                            } else if (obj[o] === true) {
                                link += "&" + lists.permalinkKeys[o] + "=1"
                            } else if (obj[o] === false) {} else {
                                link += "&" + lists.permalinkKeys[o] + "=" + obj[o]
                            }
                        }
                        if (lists.optionList.avoidables[o]) {
                            if (lists.optionList.avoidables[o].subgroups.includes(settings.profile.type)) {
                                if (obj[o] === true) {
                                    link += "&" + lists.permalinkKeys[o] + "=1"
                                } else if (obj[o] === false) {} else {
                                    link += "&" + lists.permalinkKeys[o] + "=" + obj[o]
                                }
                            }
                        }
                    }
                }
            }
            var latLngs = [],
                waypointsSet = false;
            var $__4 = true;
            var $__5 = false;
            var $__6 = undefined;
            try {
                for (var $__2 = void 0, $__1 = waypoints[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                    var waypoint = $__2.value; {
                        var lat = void 0,
                            lng = void 0;
                        if (typeof waypoint._latlng.lat === "number" && typeof waypoint._latlng.lng === "number") {
                            lat = Math.round(waypoint._latlng.lat * 1e6) / 1e6;
                            lng = Math.round(waypoint._latlng.lng * 1e6) / 1e6;
                            waypointsSet = true
                        } else {
                            lat = lng = "null"
                        }
                        latLngs.push(lat);
                        latLngs.push(lng)
                    }
                }
            } catch ($__7) {
                $__5 = true;
                $__6 = $__7
            } finally {
                try {
                    if (!$__4 && $__1.return != null) {
                        $__1.return()
                    }
                } finally {
                    if ($__5) {
                        throw $__6
                    }
                }
            }
            if (waypointsSet) link += lists.permalinkKeys.wps + "=" + latLngs.join(",");
            getProp(profile);
            if (userOptions.routinglang !== undefined) link += "&" + lists.permalinkKeys.routinglang + "=" + userOptions.routinglang;
            if (userOptions.units !== undefined) link += "&" + lists.permalinkKeys.units + "=" + userOptions.units;
            $timeout(function() {
                $location.search(link)
            })
        };
        return orsUtilsService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_messaging_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-messaging-service.js";
    angular.module("orsApp.messaging-service", []).factory("orsMessagingService", ["$http", "$timeout", function($http, $timeout) {
        var orsMessagingService = {};
        orsMessagingService.messageSubject = new Rx.BehaviorSubject({});
        orsMessagingService.subscribeToMessage = function(o) {
            return orsMessagingService.messageSubject.subscribe(o)
        };
        return orsMessagingService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_params_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-params-service.js";
    angular.module("orsApp.params-service", []).factory("orsParamsService", ["orsUtilsService", "orsObjectsFactory", "orsRequestService", "orsMapFactory", "lists", function(orsUtilsService, orsObjectsFactory, orsRequestService, orsMapFactory, lists) {
        var orsParamsService = {};
        orsParamsService.importSettings = function(params) {
            var routing = arguments[1] !== void 0 ? arguments[1] : true;
            var settings = {
                waypoints: [],
                profile: {
                    type: "Car",
                    options: {
                        analysis_options: {},
                        avoidables: {},
                        borders: {}
                    }
                }
            };
            var user_options = {};
            angular.forEach(params, function(value, key) {
                if (key == "a") {
                    var wps = value.match(/[^,]+,[^,]+/g);
                    var validWpCnt = 0,
                        idx = 0,
                        waypoints = [],
                        latLngString, latLng;
                    angular.forEach(wps, function(wp) {
                        wp = wp.split(",");
                        if (isNaN(wp[0]) && isNaN(wp[1])) {
                            wp = orsObjectsFactory.createWaypoint("", false, 0)
                        } else {
                            latLng = new L.latLng([parseFloat(wp[0]), parseFloat(wp[1])]);
                            latLngString = orsUtilsService.parseLatLngString(latLng);
                            wp = orsObjectsFactory.createWaypoint(latLngString, latLng, 1);
                            validWpCnt += 1
                        }
                        idx += 1;
                        waypoints.push(wp)
                    });
                    if (idx == 1 && routing === true) {
                        wp = orsObjectsFactory.createWaypoint("", false, 0);
                        waypoints.push(wp)
                    }
                    if (validWpCnt == 1) {
                        var action = orsObjectsFactory.createMapAction(0, undefined, latLng, undefined);
                        orsMapFactory.mapServiceSubject.onNext(action)
                    }
                    settings.waypoints = waypoints
                }
                var permalinkKeysReversed = lists.reversePermalinkKeys(lists.permalinkKeys);
                if (key in permalinkKeysReversed) {
                    if (permalinkKeysReversed[key] == "type") {
                        for (var type in lists.profiles) {
                            if (lists.profiles[type].shortValue == value) {
                                settings.profile.type = lists.profiles[type].name
                            }
                        }
                    }
                    if (permalinkKeysReversed[key] == "weight") {
                        for (var weightType in lists.optionList.weight) {
                            if (lists.optionList.weight[weightType].shortValue == value) {
                                settings.profile.options.weight = lists.optionList.weight[weightType].value
                            }
                        }
                    }
                    if (permalinkKeysReversed[key] == "maxspeed") {
                        settings.profile.options.maxspeed = value
                    }
                    if (permalinkKeysReversed[key] == "hgvWeight") {
                        settings.profile.options.hgvWeight = value
                    }
                    if (permalinkKeysReversed[key] == "width") {
                        settings.profile.options.width = value
                    }
                    if (permalinkKeysReversed[key] == "height") {
                        settings.profile.options.height = value
                    }
                    if (permalinkKeysReversed[key] == "axleload") {
                        settings.profile.options.axleload = value
                    }
                    if (permalinkKeysReversed[key] == "length") {
                        settings.profile.options.length = value
                    }
                    if (permalinkKeysReversed[key] == "hazmat") {
                        settings.profile.options.hazmat = value
                    }
                    if (permalinkKeysReversed[key] == "fitness") {
                        settings.profile.options.fitness = value
                    }
                    if (permalinkKeysReversed[key] == "steepness") {
                        settings.profile.options.steepness = value
                    }
                    if (permalinkKeysReversed[key] == "surface") {
                        settings.profile.options.surface = value
                    }
                    if (permalinkKeysReversed[key] == "incline") {
                        settings.profile.options.incline = value
                    }
                    if (permalinkKeysReversed[key] == "curb") {
                        settings.profile.options.curb = value
                    }
                    if (permalinkKeysReversed[key] == "wheelchairWidth") {
                        settings.profile.options.wheelchairWidth = value
                    }
                    if (permalinkKeysReversed[key] == "method") {
                        settings.profile.options.analysis_options.method = value
                    }
                    if (permalinkKeysReversed[key] == "isovalue") {
                        settings.profile.options.analysis_options.isovalue = value
                    }
                    if (permalinkKeysReversed[key] == "isointerval") {
                        settings.profile.options.analysis_options.isointerval = value
                    }
                    if (permalinkKeysReversed[key] == "reverseflow") {
                        settings.profile.options.analysis_options.reverseflow = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "routinglang") {
                        user_options.routinglang = value
                    }
                    if (permalinkKeysReversed[key] == "units") {
                        user_options.units = value
                    }
                    if (permalinkKeysReversed[key] == "lat") {
                        user_options.lat = value
                    }
                    if (permalinkKeysReversed[key] == "lng") {
                        user_options.lng = value
                    }
                    if (permalinkKeysReversed[key] == "zoom") {
                        user_options.zoom = value
                    }
                    if (permalinkKeysReversed[key] == "ferry") {
                        settings.profile.options.avoidables.ferry = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "unpaved") {
                        settings.profile.options.avoidables.unpaved = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "paved") {
                        settings.profile.options.avoidables.paved = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "fords") {
                        settings.profile.options.avoidables.fords = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "highways") {
                        settings.profile.options.avoidables.highways = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "tollroads") {
                        settings.profile.options.avoidables.tollroads = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "tunnels") {
                        settings.profile.options.avoidables.tunnels = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "tracks") {
                        settings.profile.options.avoidables.tracks = orsParamsService.parseStringToBool(value)
                    }
                    if (permalinkKeysReversed[key] == "all") {
                        if (orsParamsService.parseStringToBool(value)) {
                            settings.profile.options.borders.all = orsParamsService.parseStringToBool(value)
                        }
                    }
                    if (permalinkKeysReversed[key] == "controlled") {
                        if (orsParamsService.parseStringToBool(value)) {
                            settings.profile.options.borders.controlled = orsParamsService.parseStringToBool(value)
                        }
                    }
                    if (permalinkKeysReversed[key] == "country") {
                        settings.profile.options.borders.country = value.replace(/,/g, "|")
                    }
                }
            });
            return {
                settings: settings,
                user_options: user_options
            }
        };
        orsParamsService.parseStringToBool = function(string) {
            if (string == 1) return true;
            else if (string == 0) return false
        };
        return orsParamsService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_route_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-route-service.js";
    angular.module("orsApp.route-service", []).factory("orsRouteService", ["$q", "$http", "orsUtilsService", "orsLandmarkService", "orsMapFactory", "orsObjectsFactory", "lists", "mappings", "ENV", function($q, $http, orsUtilsService, orsLandmarkService, orsMapFactory, orsObjectsFactory, lists, mappings, ENV) {
        var orsRouteService = {};
        orsRouteService.routesSubject = new Rx.BehaviorSubject({});
        orsRouteService.resetRoute = function() {
            orsRouteService.routeObj = {};
            orsRouteService.routesSubject.onNext([]);
            var action = orsObjectsFactory.createMapAction(2, lists.layers[1], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action);
            action = orsObjectsFactory.createMapAction(2, lists.layers[9], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action);
            orsRouteService.DeColor()
        };
        orsRouteService.routingRequests = {};
        orsRouteService.routingRequests.requests = [];
        orsRouteService.routingRequests.clear = function() {
            var $__4 = true;
            var $__5 = false;
            var $__6 = undefined;
            try {
                for (var $__2 = void 0, $__1 = orsRouteService.routingRequests.requests[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                    var req = $__2.value; {
                        if ("cancel" in req) req.cancel("Cancel last request")
                    }
                }
            } catch ($__7) {
                $__5 = true;
                $__6 = $__7
            } finally {
                try {
                    if (!$__4 && $__1.return != null) {
                        $__1.return()
                    }
                } finally {
                    if ($__5) {
                        throw $__6
                    }
                }
            }
            orsRouteService.routingRequests.requests = []
        };
        orsRouteService.fetchRoute = function(requestData) {
            var url = ENV.directions;
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: requestData,
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsRouteService.setCurrentRouteIdx = function(idx) {
            orsRouteService.currentRouteIdx = idx
        };
        orsRouteService.getCurrentRouteIdx = function() {
            return orsRouteService.currentRouteIdx
        };
        orsRouteService.DeEmph = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[2], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.DeColor = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[7], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.Emph = function(geom) {
            var action = orsObjectsFactory.createMapAction(1, lists.layers[2], geom, undefined, lists.layerStyles.routeEmph());
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.EmphLandmark = function(geom) {
            var action = orsObjectsFactory.createMapAction(13, lists.layers[10], geom, undefined, lists.landmarkIconEmph);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.DeEmphLandmark = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[10], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.Color = function(geom, color) {
            var style = lists.layerStyles.getStyle(color, 6, 1);
            var action = orsObjectsFactory.createMapAction(1, lists.layers[7], geom, undefined, style);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.zoomTo = function(geom) {
            var action = orsObjectsFactory.createMapAction(0, lists.layers[2], geom, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsRouteService.addRoute = function(route, focusIdx) {
            var routePadding = orsObjectsFactory.createMapAction(1, lists.layers[1], route.geometry, undefined, lists.layerStyles.routePadding());
            orsMapFactory.mapServiceSubject.onNext(routePadding);
            var routeLine = orsObjectsFactory.createMapAction(40, lists.layers[1], route.geometry, undefined, lists.layerStyles.route());
            orsMapFactory.mapServiceSubject.onNext(routeLine);
            var routeHover = orsObjectsFactory.createMapAction(41, lists.layers[1], route.geometry, undefined, lists.layerStyles.routeHovering(), {
                pointInformation: route.point_information
            });
            orsMapFactory.mapServiceSubject.onNext(routeHover);
            if (focusIdx) {
                var zoomTo = orsObjectsFactory.createMapAction(0, lists.layers[1], route.geometry, undefined, undefined);
                orsMapFactory.mapServiceSubject.onNext(zoomTo)
            }
        };
        orsRouteService.addHeightgraph = function(geometry) {
            var heightgraph = orsObjectsFactory.createMapAction(-1, undefined, geometry, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(heightgraph)
        };
        orsRouteService.removeHeightgraph = function() {
            var heightgraph = orsObjectsFactory.createMapAction(-1, undefined, undefined, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(heightgraph)
        };
        orsRouteService.processResponse = function(data, profile, focusIdx, includeLandmarks) {
            orsRouteService.data = data;
            var cnt = 0;
            angular.forEach(orsRouteService.data.routes, function(route) {
                route.geometryRaw = angular.copy(route.geometry.coordinates);
                var geometry = route.geometry.coordinates;
                for (var i = 0; i < geometry.length; i++) {
                    var lng = geometry[i][0];
                    geometry[i][0] = geometry[i][1];
                    geometry[i][1] = lng
                }
                route.geometry = geometry;
                route.point_information = orsRouteService.processPointExtras(route, profile);
                orsLandmarkService.clearAll();
                if (includeLandmarks) {
                    var lmPayload = orsLandmarkService.prepareQuery(route.geometry, route.segments);
                    var lmRequest = orsLandmarkService.promise(lmPayload);
                    lmRequest.promise.then(function(response) {
                        var lmCnt = 0;
                        for (var i = 0; i < route.segments.length; i++) {
                            var segment = route.segments[i];
                            for (var j = 1; j < segment.steps.length; j++) {
                                var step = segment.steps[j];
                                step["landmarks"] = response[lmCnt];
                                if (step.landmarks && step.landmarks.features && step.landmarks.features.length > 0) {
                                    var lm = step.landmarks.features[0];
                                    var instr = step.instruction;
                                    if (lm.properties.suitability > 0) {
                                        var lmStr = (lm.properties.position === "before" ? "after " : "before ") + "the " + (lm.properties.name && lm.properties.name !== "Unknown" ? "&quot;" + lm.properties.name + "&quot; " : "") + lm.properties.type.replace(/_/, " ");
                                        instr = instr + " " + lmStr;
                                        orsLandmarkService.addLandmark(lm)
                                    }
                                    step.instruction = instr
                                } else {}
                                lmCnt++
                            }
                        }
                    }, function(response) {})
                }
                if (cnt === 0) {
                    if (route.elevation) {
                        var hgGeojson = orsRouteService.processHeightgraphData(route);
                        orsRouteService.addHeightgraph(hgGeojson)
                    } else {
                        orsRouteService.removeHeightgraph()
                    }
                    orsRouteService.addRoute(route, focusIdx)
                }
                cnt += 1
            });
            orsRouteService.routesSubject.onNext(orsRouteService.data)
        };
        orsRouteService.processPointExtras = function(route, profile) {
            var fetchExtrasAtPoint = function(extrasObj, idx) {
                var extrasAtPoint = {};
                angular.forEach(extrasObj, function(values, key) {
                    if (key == "traildifficulty" && profile == "Pedestrian") {
                        extrasAtPoint[key] = mappings[key][values[idx]].text_hiking
                    } else if (mappings[key][values[idx]].type == -1) {
                        extrasAtPoint[key] = '<strong><span style="color: green;">' + "~ " + mappings[key][values[idx]].text + "</span></strong>"
                    } else if (mappings[key][values[idx]].type == 1) {
                        extrasAtPoint[key] = '<strong><span style="color: red;">' + "~ " + mappings[key][values[idx]].text + "</span></strong>"
                    } else if (mappings[key][values[idx]].type === 0) {
                        extrasAtPoint[key] = "<strong><span>" + "~ " + mappings[key][values[idx]].text + "</span></strong>"
                    } else {
                        extrasAtPoint[key] = mappings[key][values[idx]].text
                    }
                });
                return extrasAtPoint
            };
            var extrasObj = {};
            (extrasObj = function() {
                angular.forEach(route.extras, function(val, key) {
                    var list = [];
                    angular.forEach(val.values, function(extraList, keyIdx) {
                        for (var start = extraList[0]; start < extraList[1]; start++) {
                            list.push(extraList[2])
                        }
                    });
                    list.push(val.values[val.values.length - 1][2]);
                    extrasObj[key] = list
                })
            }).call();
            var info_array = [];
            var geometry = route.geometry;
            var segments = route.segments;
            var descent = 0,
                ascent = 0,
                distance = 0,
                segment_distance = 0,
                step_distance = 0,
                point_distance = 0;
            var segment_id = 0,
                step_id = 0,
                point_id = 0;
            for (var i = 0; i < geometry.length; i++) {
                var lat = geometry[i][0];
                var lng = geometry[i][1];
                if (i > route.way_points[segment_id + 1]) {
                    segment_id += 1;
                    step_id = 0
                }
                if (i > 0) {
                    var last_lat = geometry[i - 1][0];
                    var last_lng = geometry[i - 1][1];
                    point_distance = turf.distance(orsObjectsFactory.createPoint(last_lat, last_lng), orsObjectsFactory.createPoint(lat, lng)) * 1e3;
                    step_distance += point_distance;
                    segment_distance += point_distance;
                    distance += point_distance
                }
                if (i == segments[segment_id].steps[step_id].way_points[1]) {
                    segments[segment_id].steps[step_id].distanceTurf = parseFloat(step_distance.toFixed(1));
                    step_id += 1;
                    step_distance = 0
                }
                if (i == route.way_points[segment_id + 1]) {
                    segment_id += 1;
                    segment_distance = 0;
                    step_id = 0;
                    point_id = 0
                }
                var pointobject = {
                    coords: [lat, lng],
                    extras: fetchExtrasAtPoint(extrasObj, i),
                    distance: parseFloat(distance.toFixed(1)),
                    segment_index: segment_id,
                    point_id: i,
                    heights: route.elevation && {
                        height: parseFloat(geometry[i][2].toFixed(1))
                    }
                };
                point_id += 1;
                info_array.push(pointobject)
            }
            return info_array
        };
        orsRouteService.processHeightgraphData = function(route) {
            var routeString = route.geometryRaw;
            var hgData = [];
            var extra = [];
            var chunk = {};
            var geometry = routeString;
            chunk.line = geometry;
            chunk.attributeType = -1;
            extra.push(chunk);
            extra = GeoJSON.parse(extra, {
                LineString: "line",
                extraGlobal: {
                    Creator: "openrouteservice.org",
                    records: extra.length,
                    summary: "default"
                }
            });
            hgData.push(extra);
            for (var key in route.extras) {
                extra = [];
                if (key !== "waycategory") {
                    var $__4 = true;
                    var $__5 = false;
                    var $__6 = undefined;
                    try {
                        for (var $__2 = void 0, $__1 = route.extras[key].values[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                            var item = $__2.value; {
                                var chunk$__8 = {};
                                var from = item[0];
                                var to = item[1];
                                var geometry$__9 = routeString.slice(from, to + 1);
                                chunk$__8.line = geometry$__9;
                                var typenumber = item[2];
                                chunk$__8.attributeType = typenumber;
                                extra.push(chunk$__8)
                            }
                        }
                    } catch ($__7) {
                        $__5 = true;
                        $__6 = $__7
                    } finally {
                        try {
                            if (!$__4 && $__1.return != null) {
                                $__1.return()
                            }
                        } finally {
                            if ($__5) {
                                throw $__6
                            }
                        }
                    }
                    extra = GeoJSON.parse(extra, {
                        LineString: "line",
                        extraGlobal: {
                            Creator: "openrouteservice.org",
                            records: extra.length,
                            summary: key
                        }
                    });
                    hgData.push(extra)
                }
            }
            return hgData
        };
        return orsRouteService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_landmark_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-landmark-service.js";
    angular.module("orsApp.landmark-service", []).factory("orsLandmarkService", ["$q", "$http", "orsUtilsService", "orsObjectsFactory", "orsMapFactory", "lists", "orsNamespaces", "ENV", function($q, $http, orsUtilsService, orsObjectsFactory, orsMapFactory, lists, orsNamespaces, ENV) {
        var orsLandmarkService = {};
        orsLandmarkService.promise = function(requestData) {
            var url = ENV.landmarks;
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.post(url, requestData, {
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsLandmarkService.prepareQuery = function(geom, segments) {
            var wpArrStr = "";
            if (segments.length > 0) {
                var segStrs = [];
                for (var j = 0; j < segments.length; j++) {
                    var segment = segments[j];
                    var wps = [];
                    for (var i = 1; i < segment.steps.length; i++) {
                        var step = segment.steps[i];
                        var pStep = segment.steps[i - 1];
                        var wp = geom[step.way_points[0]];
                        var prevNodes = [];
                        var best = undefined;
                        for (var n = pStep.way_points[0]; n < pStep.way_points[1]; n++) {
                            prevNodes.push(geom[n])
                        }
                        var desired = 5e-4;
                        var endNode = prevNodes[prevNodes.length - 1];
                        for (var node in prevNodes) {
                            var x = Math.pow(endNode[1] - node[1], 2);
                            var y = Math.pow(endNode[0] - node[0], 2);
                            var dist = Math.sqrt(x + y);
                            if (!best) best = {
                                node: node,
                                dist: dist
                            };
                            else {
                                if (dist > desired && dist < best.dist) {
                                    best.node = node;
                                    best.dist = dist
                                } else {
                                    break
                                }
                            }
                        }
                        var pr = best.node;
                        var np = geom[step.way_points[1]];
                        wps.push(pr[0] + "," + pr[1] + "|" + wp[0] + "," + wp[1] + "|" + np[0] + "," + np[1])
                    }
                    segStrs.push(wps.join("||"))
                }
                wpArrStr = segStrs.join("||")
            }
            return {
                coords: wpArrStr
            }
        };
        orsLandmarkService.showLandmarks = function(landmarks) {
            var action = orsObjectsFactory.createMapAction(10, lists.layers[9], landmarks, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLandmarkService.addLandmark = function(landmark) {
            var action = orsObjectsFactory.createMapAction(13, lists.layers[9], landmark, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLandmarkService.clearAll = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[9], undefined, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLandmarkService.processResponse = function(landmarkCandidatesArray) {
            var data = response.data;
            return data
        };
        return orsLandmarkService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_aa_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-aa-service.js";
    angular.module("orsApp.aa-service", []).factory("orsAaService", ["$http", "$q", "orsUtilsService", "orsMapFactory", "orsObjectsFactory", "lists", "ENV", function($http, $q, orsUtilsService, orsMapFactory, orsObjectsFactory, lists, ENV) {
        var orsAaService = {};
        orsAaService.aaSubject = new Rx.Subject;
        orsAaService.aaRequests = {};
        orsAaService.aaRequests.requests = [];
        orsAaService.aaQueries = [];
        orsAaService.aaRequests.clear = function() {
            var $__4 = true;
            var $__5 = false;
            var $__6 = undefined;
            try {
                for (var $__2 = void 0, $__1 = orsAaService.aaRequests.requests[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                    var req = $__2.value; {
                        if ("cancel" in req) req.cancel("Cancel last request")
                    }
                }
            } catch ($__7) {
                $__5 = true;
                $__6 = $__7
            } finally {
                try {
                    if (!$__4 && $__1.return != null) {
                        $__1.return()
                    }
                } finally {
                    if ($__5) {
                        throw $__6
                    }
                }
            }
            orsAaService.aaRequests.requests = []
        };
        orsAaService.DeEmph = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[2], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.Emph = function(geom) {
            var action = orsObjectsFactory.createMapAction(1, lists.layers[2], geom, undefined, lists.layerStyles.isochroneEmph());
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.zoomTo = function(geom) {
            var action = orsObjectsFactory.createMapAction(0, lists.layers[3], geom, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.reshuffle = function() {
            var action;
            action = orsObjectsFactory.createMapAction(33, lists.layers[5], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.toggle = function(idx, toggle) {
            var zoomTo = arguments[2] !== void 0 ? arguments[2] : false;
            var action;
            action = orsObjectsFactory.createMapAction(31, lists.layers[3], undefined, idx, undefined, {
                idx: idx,
                toggle: toggle
            });
            orsMapFactory.mapServiceSubject.onNext(action);
            action = orsObjectsFactory.createMapAction(36, lists.layers[5], undefined, idx, undefined, {
                idx: idx,
                toggle: toggle
            });
            orsMapFactory.mapServiceSubject.onNext(action);
            if (zoomTo) {
                action = orsObjectsFactory.createMapAction(0, lists.layers[5], isochronesObj.features[isochronesObj.features.length - 1].geometry.coordinates, undefined, undefined);
                orsMapFactory.mapServiceSubject.onNext(action)
            }
        };
        orsAaService.toggleInterval = function(idx, revIIdx, toggle) {
            var action;
            action = orsObjectsFactory.createMapAction(32, lists.layers[3], undefined, idx, undefined, {
                toggle: toggle,
                idx: idx,
                revIIdx: revIIdx
            });
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.add = function(idx, isochronesObj) {
            var zoomTo = arguments[2] !== void 0 ? arguments[2] : false;
            var action;
            action = orsObjectsFactory.createMapAction(30, lists.layers[3], isochronesObj.features, idx);
            orsMapFactory.mapServiceSubject.onNext(action);
            action = orsObjectsFactory.createMapAction(34, lists.layers[5], isochronesObj.info.query.locations[0], idx);
            orsMapFactory.mapServiceSubject.onNext(action);
            if (zoomTo) {
                action = orsObjectsFactory.createMapAction(0, lists.layers[5], isochronesObj.features[isochronesObj.features.length - 1].geometry.coordinates, undefined, undefined);
                orsMapFactory.mapServiceSubject.onNext(action)
            }
        };
        orsAaService.remove = function(idx) {
            var action;
            action = orsObjectsFactory.createMapAction(35, lists.layers[3], undefined, idx);
            orsMapFactory.mapServiceSubject.onNext(action);
            action = orsObjectsFactory.createMapAction(2, lists.layers[5], undefined, idx);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsAaService.processResponse = function(data, settings) {
            orsAaService.orsAaObj = data;
            orsAaService.orsAaObj.info.address = settings.waypoints[0]._address;
            for (var i = 0; i < orsAaService.orsAaObj.features.length; i++) {
                for (var j = 0; j < orsAaService.orsAaObj.features[i].geometry.coordinates[0].length; j++) {
                    orsAaService.orsAaObj.features[i].geometry.coordinates[0][j].reverse()
                }
            }
            orsAaService.orsAaObj.info.query.ranges = orsAaService.orsAaObj.info.query.ranges.split(",");
            orsAaService.aaSubject.onNext(orsAaService.orsAaObj)
        };
        orsAaService.subscribeToAaQueries = function(o) {
            return orsAaService.aaSubject.subscribe(o)
        };
        orsAaService.getIsochrones = function(requestData) {
            var url = ENV.isochrones;
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: requestData,
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        return orsAaService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_cookies_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-cookies-service.js";
    angular.module("orsApp.cookies-service", ["ngCookies"]).factory("orsCookiesFactory", ["$cookies", "$window", "$translate", "orsSettingsFactory", "lists", "ENV", function($cookies, $window, $translate, orsSettingsFactory, lists, ENV) {
        var orsCookiesFactory = {};
        orsCookiesFactory.getCookies = function() {
            var routinglang, language, units, showHeightgraph, randomIsoColor, distanceMarkers, env;
            var cookieUserOptions = $cookies.getObject("userOptions") ? $cookies.getObject("userOptions") : {};
            if ("language" in cookieUserOptions) {
                language = cookieUserOptions.language
            } else {
                var locale = orsCookiesFactory.getLocale();
                if ($translate.getAvailableLanguageKeys().indexOf(locale) === -1) {
                    language = lists.userOptions.languages.default
                } else {
                    language = locale
                }
            }
            if ("routinglang" in cookieUserOptions) {
                routinglang = cookieUserOptions.routinglang
            } else {
                routinglang = lists.userOptions.routinglanguages.default
            }
            if ("units" in cookieUserOptions) {
                units = cookieUserOptions.units
            } else {
                units = lists.userOptions.units.default
            }
            if ("showHeightgraph" in cookieUserOptions) {
                showHeightgraph = cookieUserOptions.showHeightgraph
            } else {
                showHeightgraph = angular.element($window).width() > 720
            }
            if ("randomIsoColor" in cookieUserOptions) {
                randomIsoColor = cookieUserOptions.randomIsoColor
            } else {
                randomIsoColor = lists.userOptions.randomIsoColor.default
            }
            if ("distanceMarkers" in cookieUserOptions) {
                distanceMarkers = cookieUserOptions.distanceMarkers
            } else {
                distanceMarkers = lists.userOptions.distanceMarkers.default
            }
            if (typeof ENV.default === "undefined") {
                ENV.default = {
                    geocode: JSON.parse(JSON.stringify(ENV)).geocode,
                    directions: JSON.parse(JSON.stringify(ENV)).directions,
                    isochrones: JSON.parse(JSON.stringify(ENV)).isochrones,
                    matrix: JSON.parse(JSON.stringify(ENV)).matrix,
                    pois: JSON.parse(JSON.stringify(ENV)).pois,
                    fuel: JSON.parse(JSON.stringify(ENV)).fuel
                }
            }
            if ("env" in cookieUserOptions) {
                env = cookieUserOptions.env
            } else {
                env = {
                    geocode: ENV.geocode,
                    directions: ENV.directions,
                    isochrones: ENV.isochrones,
                    matrix: ENV.matrix,
                    pois: ENV.pois,
                    fuel: ENV.fuel
                }
            }
            return {
                language: language,
                routinglang: routinglang,
                units: units,
                showHeightgraph: showHeightgraph,
                randomIsoColor: randomIsoColor,
                distanceMarkers: distanceMarkers,
                env: env
            }
        };
        orsCookiesFactory.getLocale = function() {
            var locale = $window.navigator.language;
            locale = locale.split("-");
            if (locale.length === 1) locale = locale[0] + "-" + locale[0].toUpperCase();
            else locale = locale[0] + "-" + locale[1].toUpperCase();
            return locale
        };
        orsCookiesFactory.setCookieUserOptions = function(options) {
            $cookies.putObject("userOptions", options)
        };
        orsCookiesFactory.setMapOptions = function(options) {
            $cookies.putObject("mapOptions", options)
        };
        orsCookiesFactory.getMapOptions = function() {
            return $cookies.getObject("mapOptions")
        };
        return orsCookiesFactory
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_importexport_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-importexport-service.js";
    angular.module("orsApp.GeoFileHandler-service", ["ngFileSaver"]).factory("orsExportFactory", ["FileSaver", "Blob", "orsNamespaces", "orsRequestService", "orsSettingsFactory", "orsUtilsService", "orsRouteService", function(FileSaver, Blob, orsNamespaces, orsRequestService, orsSettingsFactory, orsUtilsService, orsRouteService) {
        var gpxExportFromMap = function(geometry, filename) {
            var geojsonData = L.polyline(geometry).toGeoJSON();
            geojsonData.properties.name = filename;
            return togpx(geojsonData, {
                creator: "OpenRouteService.org"
            })
        };
        var saveGpxFromApi = function(options, filename) {
            var userOptions = orsSettingsFactory.getUserOptions();
            var settings = orsSettingsFactory.getSettings();
            var payload = orsUtilsService.routingPayload(settings, userOptions);
            payload.format = "gpx";
            if (!options.instructions) payload.instructions = false;
            var request = orsRouteService.fetchRoute(payload);
            orsRouteService.routingRequests.requests.push(request);
            request.promise.then(function(response) {
                var exportData = xml2js(response);
                var metadata = exportData.elements[0].elements[0].elements;
                metadata[0].elements[0].text = filename;
                if (metadata[1].elements == null) {
                    metadata[1].elements = [{
                        text: "",
                        type: "text"
                    }]
                }
                metadata[1].elements[0].text = options.instruction ? "This route and instructions were generated from maps.openrouteservice" : "This route was generated from maps.openrouteservice";
                exportData = js2xml(exportData);
                exportData = new Blob([exportData], {
                    type: "application/xml;charset=utf-8"
                });
                FileSaver.saveAs(exportData, filename + ".gpx")
            }, function(error) {
                orsSettingsFactory.requestSubject.onNext(false);
                void 0
            })
        };
        var orsExportFactory = {};
        orsExportFactory.exportFile = function(geometry, geomType, options, format, filename) {
            var exportData, geojsonData, extension;
            extension = "." + format;
            switch (format) {
                case "gpx":
                    if (options.toGpx) {
                        exportData = gpxExportFromMap(geometry, filename)
                    } else {
                        saveGpxFromApi(options, filename, extension)
                    }
                    break;
                case "kml":
                    geojsonData = L.polyline(geometry).toGeoJSON();
                    exportData = tokml(geojsonData);
                    break;
                case "rawjson":
                    delete geometry.extras;
                    delete geometry.geometryRaw;
                    delete geometry.$$hashKey;
                    delete geometry.point_information;
                    exportData = JSON.stringify(geometry);
                    extension = ".json";
                    break;
                case "geojson":
                    if (geomType === "linestring") {
                        if (!options.elevation) {
                            angular.forEach(geometry, function(value) {
                                value = value.splice(2, 1)
                            })
                        }
                        exportData = JSON.stringify(L.polyline(geometry).toGeoJSON())
                    } else if (geomType === "polygon") {
                        var isochrones = [];
                        for (var i = 0; i < geometry.length; i++) {
                            var properties = geometry[i].properties;
                            properties.id = i;
                            var c = geometry[i].geometry.coordinates;
                            for (var k = 0; k < c[0].length; k++) {
                                var store = c[0][k][0];
                                c[0][k][0] = c[0][k][1];
                                c[0][k][1] = store
                            }
                            var geoJsonPolygon = {
                                type: "Feature",
                                properties: properties,
                                geometry: {
                                    type: "Polygon",
                                    coordinates: c
                                }
                            };
                            isochrones.push(geoJsonPolygon)
                        }
                        exportData = JSON.stringify(isochrones);
                        exportData = '{"type":"FeatureCollection","features":' + exportData + "}"
                    }
                    break;
                default:
            }
            if (!(format === "gpx" && !options.toGpx)) {
                exportData = new Blob([exportData], {
                    type: "application/xml;charset=utf-8"
                });
                FileSaver.saveAs(exportData, filename + extension)
            }
        };
        return orsExportFactory
    }]).factory("orsImportFactory", ["orsNamespaces", function(orsNamespaces) {
        var orsImportFactory = {};
        orsImportFactory.importFile = function(fileExt, fileContent) {
            var latLngs, features, geometry, i;
            switch (fileExt) {
                case "gpx":
                    features = omnivore.gpx.parse(fileContent);
                    break;
                case "kml":
                    features = omnivore.kml.parse(fileContent);
                    break;
                case "geojson":
                    features = L.geoJson(JSON.parse(fileContent));
                    break;
                case "csv":
                    features = omnivore.csv.parse(fileContent);
                    break;
                case "wkt":
                    features = omnivore.wkt.parse(fileContent);
                    break;
                default:
                    void 0
            }
            latLngs = features.getLayers()[0]._latlngs;
            geometry = [];
            if (latLngs[0].constructor === Array) {
                for (i = 0; i < latLngs.length; i++) {
                    for (var j = 0; j < latLngs[i].length; j++) {
                        geometry.push([latLngs[i][j].lat, latLngs[i][j].lng])
                    }
                }
            } else {
                for (i = 0; i < latLngs.length; i++) {
                    geometry.push([latLngs[i].lat, latLngs[i].lng])
                }
            }
            return geometry
        };
        return orsImportFactory
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_locations_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-locations-service.js";
    angular.module("orsApp.locations-service", []).factory("orsLocationsService", ["$q", "$http", "orsUtilsService", "orsMapFactory", "orsObjectsFactory", "lists", "ENV", function($q, $http, orsUtilsService, orsMapFactory, orsObjectsFactory, lists, ENV) {
        var orsLocationsService = {};
        orsLocationsService.requests = [];
        orsLocationsService.clear = function() {
            var $__4 = true;
            var $__5 = false;
            var $__6 = undefined;
            try {
                for (var $__2 = void 0, $__1 = orsLocationsService.requests[Symbol.iterator](); !($__4 = ($__2 = $__1.next()).done); $__4 = true) {
                    var req = $__2.value; {
                        if ("cancel" in req) req.cancel("Cancel last request")
                    }
                }
            } catch ($__7) {
                $__5 = true;
                $__6 = $__7
            } finally {
                try {
                    if (!$__4 && $__1.return != null) {
                        $__1.return()
                    }
                } finally {
                    if ($__5) {
                        throw $__6
                    }
                }
            }
            orsLocationsService.requests = []
        };
        orsLocationsService.fetchLocations = function(requestData) {
            var url = ENV.pois;
            var canceller = $q.defer();
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.post(url, requestData, {
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsLocationsService.panTo = function(geometry) {
            var action = orsObjectsFactory.createMapAction(0, lists.layers[2], {
                lat: geometry[1],
                lng: geometry[0]
            }, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLocationsService.emphPoi = function(geometry, category) {
            var action = orsObjectsFactory.createMapAction(11, lists.layers[2], {
                lat: geometry[1],
                lng: geometry[0]
            }, undefined, category);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLocationsService.DeEmphPoi = function() {
            var action = orsObjectsFactory.createMapAction(2, lists.layers[2], undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(action)
        };
        orsLocationsService.setSubcategoriesLookup = function(dict) {
            orsLocationsService.subcategoriesLookup = dict
        };
        orsLocationsService.getSubcategoriesLookup = function() {
            return orsLocationsService.subcategoriesLookup
        };
        orsLocationsService.addLocationsToMap = function(data) {
            var locations = orsObjectsFactory.createMapAction(10, lists.layers[8], data, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(locations)
        };
        orsLocationsService.clearLocationsToMap = function(data) {
            var locations = orsObjectsFactory.createMapAction(2, lists.layers[8], undefined, undefined, undefined);
            orsMapFactory.mapServiceSubject.onNext(locations)
        };
        return orsLocationsService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_fuel_45_service_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-fuel-service.js";
    angular.module("orsApp.fuel-service", []).factory("orsFuelService", ["$q", "$http", "orsUtilsService", "orsMapFactory", "orsObjectsFactory", "lists", "ENV", "orsRouteService", function($q, $http, orsUtilsService, orsMapFactory, orsObjectsFactory, lists, ENV, orsRouteService) {
        var orsFuelService = {};
        orsFuelService.requests = [];
        orsFuelService.clear = function() {
            var $__5 = true;
            var $__6 = false;
            var $__7 = undefined;
            try {
                for (var $__3 = void 0, $__2 = orsFuelService.requests[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                    var req = $__3.value; {
                        if ("cancel" in req) req.cancel("Cancel last request")
                    }
                }
            } catch ($__8) {
                $__6 = true;
                $__7 = $__8
            } finally {
                try {
                    if (!$__5 && $__2.return != null) {
                        $__2.return()
                    }
                } finally {
                    if ($__6) {
                        throw $__7
                    }
                }
            }
            orsFuelService.requests = []
        };
        orsFuelService.getConsumption = function(ofsSettings) {
            var idx = orsRouteService.getCurrentRouteIdx() === undefined ? 0 : orsRouteService.getCurrentRouteIdx();
            var route;
            if (angular.isDefined(orsRouteService.data) && angular.isDefined(orsRouteService.data.routes)) {
                if (orsRouteService.data.routes.length > 0) {
                    var data = orsRouteService.data;
                    route = data.routes[idx]
                }
            }
            if (route && route.geometryRaw) {
                var geometry = {
                    coordinates: route.geometryRaw,
                    type: "LineString"
                };
                var parameters = {
                    request: "route"
                };
                var url = ENV.fuel;
                var canceller = $q.defer();
                var requestData = {
                    request: "route",
                    geometry: {
                        geojson: geometry,
                        filters: ofsSettings.filters
                    }
                };
                var cancel = function(reason) {
                    canceller.resolve(reason)
                };
                var promise = $http.post(url, requestData, {
                    params: parameters
                }, {
                    timeout: canceller.promise
                }).then(function(response) {
                    var fuelSubject = null;
                    if (Object.keys(response.data.fuel_stats).length === 1 && response.data.fuel_stats.individual) {
                        fuelSubject = response.data.fuel_stats.individual
                    } else {
                        var category = response.data.general.vehicle_categories[0];
                        fuelSubject = response.data.fuel_stats[category]
                    }
                    fuelSubject.total_cost.price_date = fuelSubject.total_cost.price_date.split("T")[0].split("-").reverse().join(".");
                    if (fuelSubject.category_info.calculation_errors === "No Errors") {
                        route.summary.consumption = fuelSubject.total_consumption.liters;
                        route.summary.emission = fuelSubject.total_emissions.co2_kg;
                        route.summary.fuelCost = fuelSubject.total_cost.w_tax_euro
                    }
                    route.summary.ofs = response.data;
                    return response.data
                })
            }
        };
        orsFuelService.getBrands = function() {
            var url = ENV.fuel;
            var canceller = $q.defer();
            var parameters = {
                request: "brands",
                source: "cfd"
            };
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: parameters
            }, {
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        orsFuelService.getCars = function(brand) {
            var url = ENV.fuel;
            var canceller = $q.defer();
            var parameters = {
                request: "cars",
                brand: brand,
                source: "cfd"
            };
            var cancel = function(reason) {
                canceller.resolve(reason)
            };
            var promise = $http.get(url, {
                params: parameters
            }, {
                timeout: canceller.promise
            }).then(function(response) {
                return response.data
            });
            return {
                promise: promise,
                cancel: cancel
            }
        };
        return orsFuelService
    }]);
    return {}
}();
var $__build_47_infrastructure_47_ors_45_apikey_45_factory_46_js__ = function() {
    "use strict";
    var __moduleName = "build/infrastructure/ors-apikey-factory.js";
    angular.module("orsApp.apikey-factory", []).factory("orsApikeyFactory", ["$timeout", "$interval", "$injector", function($timeout, $interval, $injector) {
        var orsApikeyFactory = {};
        orsApikeyFactory.getApiKey = function() {
            return orsApikeyFactory.apiKey
        };
        orsApikeyFactory.setApiKey = function(key) {
            orsApikeyFactory.apiKey = key
        };
        orsApikeyFactory.setApiKeyInterval = function() {
            var httpService = $injector.get("$http");
            $interval(function() {
                return httpService.get("weathercheck.txt").then(function(response) {
                    orsApikeyFactory.setApiKey(response.data)
                }, function(errorResponse) {})
            }, 432e5)
        };
        return orsApikeyFactory
    }]);
    return {}
}();
var $__build_47_components_47_ors_45_navigation_47_ors_45_nav_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-navigation/ors-nav.js";
    angular.module("orsApp.ors-nav", ["ngComponentRouter"]).component("orsSidebar", {
        templateUrl: "components/ors-navigation/ors-nav.html",
        transclude: true,
        bindings: {
            orsMap: "<"
        },
        controller: ["$location", function($location) {
            var ctrl = this;
            if ($location.path() == "/") {
                ctrl.activeMenu = "/directions"
            } else ctrl.activeMenu = $location.path();
            ctrl.version = "0.3.9"
        }],
        $routeConfig: [{
            path: "/directions",
            name: "Directions",
            component: "orsRoute",
            useAsDefault: true
        }, {
            path: "/reach",
            name: "Reach",
            component: "orsAnalysis"
        }]
    }).value("$routerRootComponent", "orsSidebar");
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_panel_45_routing_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-panel-routing.js";
    angular.module("orsApp.ors-panel-routing", ["orsApp.ors-waypoints", "orsApp.ors-profiles-options", "orsApp.ors-options", "orsApp.ors-summary", "orsApp.ors-instructions", "orsApp.ors-addresses"]).component("orsRoute", {
        templateUrl: "components/ors-panel-routing/ors-panel-routing.html",
        controller: ["orsSettingsFactory", "orsParamsService", "orsUtilsService", "orsCookiesFactory", "lists", function(orsSettingsFactory, orsParamsService, orsUtilsService, orsCookiesFactory, lists) {
            var ctrl = this;
            ctrl.$routerCanReuse = function(next, prev) {
                return next.urlPath === prev.urlPath
            };
            ctrl.$onInit = function() {
                ctrl.profiles = lists.profiles
            };
            ctrl.$routerOnActivate = function(next) {
                orsSettingsFactory.isInitialized = true;
                orsSettingsFactory.updateNgRoute(next.urlPath);
                if (orsSettingsFactory.getWaypoints().length == 0) {
                    ctrl.routeParams = next.params;
                    orsSettingsFactory.initWaypoints(2);
                    var importedParams = orsParamsService.importSettings(ctrl.routeParams);
                    orsSettingsFactory.setSettings(importedParams.settings);
                    angular.forEach(importedParams.settings.waypoints, function(wp, idx) {
                        if (wp._latlng !== false) orsSettingsFactory.getAddress(wp._latlng, idx, true)
                    });
                    var userOptionsCookie = orsCookiesFactory.getCookies();
                    var mapOptionsCookie = orsCookiesFactory.getMapOptions();
                    var userOptions = Object.assign({}, userOptionsCookie, mapOptionsCookie, importedParams.user_options);
                    orsSettingsFactory.setUserOptions(userOptions)
                }
                orsSettingsFactory.updateWaypoints();
                ctrl.activeProfile = orsSettingsFactory.getActiveProfile().type;
                ctrl.activeSubgroup = ctrl.profiles[ctrl.activeProfile].subgroup;
                ctrl.shouldDisplayRouteDetails = ctrl.showGeocodingPanel = false;
                ctrl.showGeocodingPanelIdx = null;
                orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), orsSettingsFactory.getUserOptions())
            };
            ctrl.$routerOnReuse = function(next, prev) {};
            ctrl.showInstructions = function() {
                ctrl.shouldDisplayRouteDetails = ctrl.shouldDisplayRouteDetails === true ? false : true
            }
        }],
        require: {
            parent: "^orsSidebar"
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_waypoints_47_ors_45_waypoints_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-waypoints/ors-waypoints.js";
    angular.module("orsApp.ors-waypoints", ["orsApp.ors-waypoint", "orsApp.ors-route-controls"]).component("orsWaypoints", {
        templateUrl: "components/ors-panel-routing/ors-waypoints/ors-waypoints.html",
        bindings: {
            orsMap: "<",
            orsParams: "<",
            activeProfile: "<",
            activeSubgroup: "<",
            showGeocodingPanel: "=",
            showGeocodingPanelIdx: "="
        },
        controller: ["orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRouteService", "orsRequestService", "orsParamsService", "$timeout", function(orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRouteService, orsRequestService, orsParamsService, $timeout) {
            var ctrl = this;
            ctrl.$onInit = function() {
                ctrl.waypoints = orsSettingsFactory.getWaypoints();
                if (ctrl.waypoints.length == 0) {
                    ctrl.waypoints = orsSettingsFactory.initWaypoints(2)
                }
                ctrl.showAdd = true
            };
            orsSettingsFactory.subscribeToWaypoints(function onNext(d) {
                ctrl.waypoints = d
            });
            ctrl.collapsed = false;
            ctrl.collapseIcon = "fa fa-chevron-down";
            ctrl.collapse = function() {
                ctrl.collapsed = ctrl.collapsed === true ? false : true;
                if (ctrl.collapsed === true) {
                    ctrl.sortableOptions.disabled = true;
                    ctrl.collapseIcon = "fa fa-chevron-right"
                }
                if (ctrl.collapsed === false) {
                    ctrl.sortableOptions.disabled = false;
                    ctrl.collapseIcon = "fa fa-chevron-down"
                }
            };
            ctrl.showViapoints = function(idx) {
                if (ctrl.collapsed === true) {
                    if (ctrl.waypoints.length > 2) {
                        if (idx == 0) {
                            return true
                        } else {
                            return false
                        }
                    }
                } else {
                    return false
                }
            };
            ctrl.collapseWp = function(idx) {
                if (ctrl.collapsed == true) {
                    if (idx == 0 || idx == ctrl.waypoints.length - 1) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            };
            ctrl.$doCheck = function() {};
            ctrl.deleteWaypoint = function(idx) {
                var toggleRequest = ctrl.waypoints[idx]._set == 1 ? true : false;
                if (ctrl.waypoints.length == 2) {
                    var wp = orsObjectsFactory.createWaypoint("", new L.latLng);
                    ctrl.waypoints[idx] = wp
                } else {
                    ctrl.waypoints.splice(idx, 1)
                }
                orsRequestService.geocodeRequests.removeRequest(idx, "routeRequests");
                orsSettingsFactory.setWaypoints(ctrl.waypoints, toggleRequest)
            };
            ctrl.reverseWaypoints = function() {
                ctrl.waypoints.reverse();
                orsSettingsFactory.setWaypoints(ctrl.waypoints)
            };
            ctrl.resetWaypoints = function() {
                orsRouteService.resetRoute();
                ctrl.waypoints = orsSettingsFactory.initWaypoints(2);
                orsSettingsFactory.updateWaypoints()
            };
            ctrl.addWaypoint = function() {
                var wp = orsObjectsFactory.createWaypoint("", new L.latLng);
                ctrl.waypoints.splice(ctrl.waypoints.length - 1, 0, wp);
                orsSettingsFactory.setWaypoints(ctrl.waypoints, false)
            };
            ctrl.addressChanged = function() {
                orsSettingsFactory.setWaypoints(ctrl.waypoints, true)
            };
            ctrl.sortableOptions = {
                axis: "y",
                containment: "parent",
                activate: function() {},
                beforeStop: function() {},
                change: function() {},
                create: function() {},
                deactivate: function() {},
                out: function() {},
                over: function() {},
                receive: function() {},
                remove: function() {},
                sort: function() {},
                start: function() {},
                update: function(e, ui) {
                    $timeout(function() {
                        orsSettingsFactory.setWaypoints(ctrl.waypoints, true)
                    }, 100)
                },
                stop: function(e, ui) {}
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_waypoints_47_ors_45_waypoint_47_ors_45_waypoint_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-waypoints/ors-waypoint/ors-waypoint.js";
    angular.module("orsApp.ors-waypoint", []).component("orsWaypoint", {
        templateUrl: "components/ors-panel-routing/ors-waypoints/ors-waypoint/ors-waypoint.html",
        bindings: {
            idx: "<",
            waypoint: "<",
            onDelete: "&",
            onWaypointsChanged: "&",
            onAddressChanged: "&",
            waypoints: "<",
            showAdd: "=",
            addresses: "<",
            showGeocodingPanel: "=",
            showGeocodingPanelIdx: "="
        },
        controller: ["orsSettingsFactory", "orsMapFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsMessagingService", "lists", function(orsSettingsFactory, orsMapFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsMessagingService, lists) {
            var ctrl = this;
            ctrl.callGeocodingPanel = function() {
                ctrl.showGeocodingPanel = !ctrl.showGeocodingPanel;
                ctrl.showGeocodingPanelIdx = ctrl.idx
            };
            ctrl.getIdx = function() {
                if (ctrl.idx == 0) return "A";
                else if (ctrl.idx == ctrl.waypoints.length - 1) return "B";
                else return ctrl.idx
            };
            ctrl.emph = function() {
                var highlightWaypoint = orsObjectsFactory.createMapAction(3, lists.layers[2], ctrl.waypoint._latlng, ctrl.idx, undefined);
                orsMapFactory.mapServiceSubject.onNext(highlightWaypoint)
            };
            ctrl.deEmph = function() {
                var clearHighlightWaypoints = orsObjectsFactory.createMapAction(2, lists.layers[2], undefined, undefined, undefined);
                orsMapFactory.mapServiceSubject.onNext(clearHighlightWaypoints)
            };
            ctrl.getPlaceholder = function() {
                var placeholder;
                if (ctrl.idx == 0) placeholder = "Start";
                else if (ctrl.idx == ctrl.waypoints.length - 1) placeholder = "End";
                else placeholder = "Via";
                return placeholder
            };
            ctrl.delete = function() {
                ctrl.onDelete({
                    idx: ctrl.idx
                });
                ctrl.onWaypointsChanged()
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_summary_47_ors_45_summary_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-summary/ors-summary.js";
    angular.module("orsApp.ors-summary", ["orsApp.ors-exportRoute-controls", "orsApp.ors-share"]).component("orsSummaries", {
        templateUrl: "components/ors-panel-routing/ors-summary/ors-summary.html",
        bindings: {
            showInstructions: "&",
            shouldDisplayRouteDetails: "<"
        },
        controller: ["$rootScope", "orsSettingsFactory", "orsMapFactory", "orsObjectsFactory", "orsRouteService", "lists", "carCategories", function($rootScope, orsSettingsFactory, orsMapFactory, orsObjectsFactory, orsRouteService, lists, carCategories) {
            var ctrl = this;
            ctrl.carCategories = carCategories;
            ctrl.checkboxes = [false, false, false, false];
            ctrl.showShare = false;
            ctrl.showExport = false;
            ctrl.profiles = lists.profiles;
            ctrl.setIdx = function(idx) {
                orsRouteService.setCurrentRouteIdx(idx)
            };
            ctrl.getIdx = function() {
                return orsRouteService.getCurrentRouteIdx()
            };
            ctrl.getClass = function(bool) {
                if (bool === true) return "fa fa-lg fa-fw fa-angle-down";
                else return "fa fa-lg fa-fw fa-angle-right"
            };
            if (angular.isDefined(orsRouteService.data) && angular.isDefined(orsRouteService.data.routes)) {
                if (orsRouteService.data.routes.length > 0) {
                    ctrl.data = orsRouteService.data;
                    var idx = ctrl.getIdx() === undefined ? 0 : ctrl.getIdx();
                    ctrl.route = ctrl.data.routes[idx];
                    if (ctrl.route.elevation) {
                        var hgGeojson = orsRouteService.processHeightgraphData(ctrl.route);
                        orsRouteService.addHeightgraph(hgGeojson)
                    }
                    orsRouteService.addRoute(ctrl.route)
                }
            }
            try {
                if ($rootScope.routeSubscription !== undefined) $rootScope.routeSubscription.dispose()
            } catch (error) {
                void 0
            }
            $rootScope.routeSubscription = orsRouteService.routesSubject.subscribe(function(data) {
                ctrl.data = data;
                orsRouteService.setCurrentRouteIdx(0)
            });
            ctrl.EmphRoute = function(idx) {
                var geometry = ctrl.data.routes[idx].geometry;
                orsRouteService.Emph(geometry)
            };
            ctrl.DeEmphRoute = function() {
                orsRouteService.DeEmph()
            };
            ctrl.classInQuery = function(ofsData, vehicleClass) {
                return ofsData.general.vehicle_categories.indexOf(vehicleClass) > -1
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_waypoints_47_ors_45_route_45_controls_47_ors_45_route_45_controls_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-route-controls.js";
    angular.module("orsApp.ors-route-controls", ["orsApp.ors-importRoute-controls"]).component("orsRouteControls", {
        templateUrl: "components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-route-controls.html",
        controller: ["$location", "orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsMapFactory", "orsCookiesFactory", function($location, orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsMapFactory, orsCookiesFactory) {
            var ctrl = this;
            ctrl.showOptions = true;
            ctrl.add = function() {
                ctrl.onAdd();
                ctrl.showAdd = true
            };
            ctrl.reset = function() {
                ctrl.onReset()
            };
            ctrl.reversing = function() {
                ctrl.onReverse();
                ctrl.onWaypointsChanged()
            };
            ctrl.callOptions = function() {
                ctrl.showOptions = ctrl.showOptions == false ? true : false
            };
            ctrl.zoom = function() {
                var action = orsObjectsFactory.createMapAction(0, undefined, undefined, undefined);
                orsMapFactory.mapServiceSubject.onNext(action)
            }
        }],
        bindings: {
            onAdd: "&",
            onReset: "&",
            onReverse: "&",
            onWaypointsChanged: "&",
            showAdd: "=",
            activeSubgroup: "<",
            activeProfile: "<"
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_waypoints_47_ors_45_route_45_controls_47_ors_45_options_47_ors_45_options_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-options/ors-options.js";
    angular.module("orsApp.ors-options", []).component("orsOptions", {
        templateUrl: "components/ors-panel-routing/ors-waypoints/ors-route-controls/ors-options/ors-options.html",
        bindings: {
            activeSubgroup: "<",
            activeProfile: "<",
            showOptions: "<"
        },
        controller: ["orsSettingsFactory", "orsCookiesFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsParamsService", "orsFuelService", "$scope", "$timeout", "lists", "countries", "carCategories", function(orsSettingsFactory, orsCookiesFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsParamsService, orsFuelService, $scope, $timeout, lists, countries, carCategories) {
            var ctrl = this;
            ctrl.optionList = lists.optionList;
            ctrl.$onInit = function() {
                ctrl.currentOptions = orsSettingsFactory.getActiveOptions();
                if (!ctrl.carBrands) {
                    ctrl.initOFS()
                }
                if (ctrl.routing) ctrl.currentOptions.weight = ctrl.currentOptions.weight !== undefined ? ctrl.currentOptions.weight : ctrl.optionList.weight.Fastest.value;
                ctrl.weightSlider = {
                    value: ctrl.currentOptions.weight,
                    options: {
                        stepsArray: [{
                            value: ctrl.optionList.weight.Fastest.value
                        }, {
                            value: ctrl.optionList.weight.Shortest.value
                        }, {
                            value: ctrl.optionList.weight.Recommended.value
                        }],
                        showTicks: true,
                        showTicksValues: false,
                        hidePointerLabels: true,
                        hideLimitLabels: true,
                        onEnd: function() {
                            ctrl.currentOptions.weight = ctrl.weightSlider.value;
                            ctrl.changeOptions()
                        }
                    }
                };
                ctrl.greenActive = false;
                ctrl.toggleGreenSlider = function() {
                    var fireRequest = arguments[0] !== void 0 ? arguments[0] : true;
                    if (ctrl.greenActive === true) {
                        ctrl.greenSlider.options.disabled = false;
                        ctrl.currentOptions.green = ctrl.greenSlider.value
                    } else if (ctrl.greenActive === false) {
                        ctrl.greenSlider.options.disabled = true;
                        delete ctrl.currentOptions.green
                    }
                    ctrl.refreshSlider();
                    if (fireRequest) ctrl.changeOptions()
                };
                ctrl.greenSlider = {
                    value: ctrl.optionList.green.min,
                    options: {
                        floor: ctrl.optionList.green.min,
                        ceil: ctrl.optionList.green.max,
                        step: .1,
                        precision: 1,
                        translate: function(value) {
                            return value * 10 + "/10 <b>score</b>"
                        },
                        onEnd: function() {
                            ctrl.currentOptions.green = ctrl.greenSlider.value;
                            ctrl.changeOptions()
                        }
                    }
                };
                ctrl.toggleGreenSlider(false);
                ctrl.quietActive = false;
                ctrl.toggleQuietSlider = function() {
                    var fireRequest = arguments[0] !== void 0 ? arguments[0] : true;
                    if (ctrl.quietActive === true) {
                        ctrl.quietSlider.options.disabled = false;
                        ctrl.currentOptions.quiet = ctrl.quietSlider.value
                    } else if (ctrl.quietActive === false) {
                        ctrl.quietSlider.options.disabled = true;
                        delete ctrl.currentOptions.quiet
                    }
                    ctrl.refreshSlider();
                    if (fireRequest) ctrl.changeOptions()
                };
                ctrl.quietSlider = {
                    value: ctrl.optionList.quiet.min,
                    options: {
                        floor: ctrl.optionList.quiet.min,
                        ceil: ctrl.optionList.quiet.max,
                        step: .1,
                        precision: 1,
                        translate: function(value) {
                            return value * 10 + "/10 <b>score</b>"
                        },
                        onEnd: function() {
                            ctrl.currentOptions.quiet = ctrl.quietSlider.value;
                            ctrl.changeOptions()
                        }
                    }
                };
                ctrl.toggleQuietSlider(false);
                ctrl.toggleHgvOptSlider = function(name) {
                    var fireRequest = arguments[1] !== void 0 ? arguments[1] : true;
                    switch (name) {
                        case "height":
                            if (ctrl.hgvHeightCb === true) {
                                ctrl.hgvSliders.Height.options.disabled = false;
                                ctrl.currentOptions.height = ctrl.hgvSliders.Height.value
                            } else if (ctrl.hgvHeightCb === false) {
                                ctrl.hgvSliders.Height.options.disabled = true;
                                delete ctrl.currentOptions.height
                            }
                            break;
                        case "width":
                            if (ctrl.hgvWidthCb === true) {
                                ctrl.hgvSliders.Width.options.disabled = false;
                                ctrl.currentOptions.width = ctrl.hgvSliders.Width.value
                            } else if (ctrl.hgvWidthCb === false) {
                                ctrl.hgvSliders.Width.options.disabled = true;
                                delete ctrl.currentOptions.width
                            }
                            break;
                        case "length":
                            if (ctrl.hgvLengthCb === true) {
                                ctrl.hgvSliders.Length.options.disabled = false;
                                ctrl.currentOptions.length = ctrl.hgvSliders.Length.value
                            } else if (ctrl.hgvLengthCb === false) {
                                ctrl.hgvSliders.Length.options.disabled = true;
                                delete ctrl.currentOptions.length
                            }
                            break;
                        case "hgvWeight":
                            if (ctrl.hgvWeightCb === true) {
                                ctrl.hgvSliders.Weight.options.disabled = false;
                                ctrl.currentOptions.hgvWeight = ctrl.hgvSliders.Weight.value
                            } else if (ctrl.hgvWeightCb === false) {
                                ctrl.hgvSliders.Weight.options.disabled = true;
                                delete ctrl.currentOptions.hgvWeight
                            }
                            break;
                        case "axleload":
                            if (ctrl.hgvAxleloadCb === true) {
                                ctrl.hgvSliders.AxleLoad.options.disabled = false;
                                ctrl.currentOptions.axleload = ctrl.hgvSliders.AxleLoad.value
                            } else if (ctrl.hgvAxleloadCb === false) {
                                ctrl.hgvSliders.AxleLoad.options.disabled = true;
                                delete ctrl.currentOptions.axleload
                            }
                            break;
                        default:
                    }
                    if (fireRequest) ctrl.changeOptions()
                };
                if (ctrl.currentOptions.hazmat !== undefined) ctrl.currentOptions.hazmat = true;
                var hgvParamsInit = {
                    height: {
                        val: ctrl.optionList.hgvParams.height.min,
                        checkbox: "hgvHeightCb"
                    },
                    width: {
                        val: ctrl.optionList.hgvParams.width.min,
                        checkbox: "hgvWidthCb"
                    },
                    hgvWeight: {
                        val: ctrl.optionList.hgvParams.hgvWeight.min,
                        checkbox: "hgvWeightCb"
                    },
                    axleload: {
                        val: ctrl.optionList.hgvParams.axleload.min,
                        checkbox: "hgvAxleloadCb"
                    },
                    length: {
                        val: ctrl.optionList.hgvParams.length.min,
                        checkbox: "hgvLengthCb"
                    }
                };
                angular.forEach(hgvParamsInit, function(val, key) {
                    if (ctrl.currentOptions[key] >= ctrl.optionList.hgvParams[key].min && ctrl.currentOptions[key] <= ctrl.optionList.hgvParams[key].max) {
                        hgvParamsInit[key].val = ctrl.currentOptions[key];
                        ctrl[hgvParamsInit[key].checkbox] = true
                    }
                });
                ctrl.hgvSliders = {
                    Height: {
                        value: hgvParamsInit.height.val,
                        options: {
                            disabled: !ctrl.hgvHeightCb,
                            floor: ctrl.optionList.hgvParams.height.min,
                            ceil: ctrl.optionList.hgvParams.height.max,
                            translate: function(value) {
                                return value + " <b>m</b>"
                            },
                            onEnd: function() {
                                ctrl.currentOptions.height = ctrl.hgvSliders.Height.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Length: {
                        value: hgvParamsInit.length.val,
                        options: {
                            disabled: !ctrl.hgvLengthCb,
                            floor: ctrl.optionList.hgvParams.length.min,
                            ceil: ctrl.optionList.hgvParams.length.max,
                            translate: function(value) {
                                return value + " <b>m</b>"
                            },
                            onEnd: function() {
                                ctrl.currentOptions.length = ctrl.hgvSliders.Length.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Width: {
                        value: hgvParamsInit.width.val,
                        options: {
                            disabled: !ctrl.hgvWidthCb,
                            floor: ctrl.optionList.hgvParams.width.min,
                            ceil: ctrl.optionList.hgvParams.width.max,
                            translate: function(value) {
                                return value + " <b>m</b>"
                            },
                            onEnd: function() {
                                ctrl.currentOptions.width = ctrl.hgvSliders.Width.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    AxleLoad: {
                        value: hgvParamsInit.axleload.val,
                        options: {
                            disabled: !ctrl.hgvAxleloadCb,
                            floor: ctrl.optionList.hgvParams.axleload.min,
                            ceil: ctrl.optionList.hgvParams.axleload.max,
                            translate: function(value) {
                                return value + " <b>t</b>"
                            },
                            onEnd: function() {
                                ctrl.currentOptions.axleload = ctrl.hgvSliders.AxleLoad.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Weight: {
                        value: hgvParamsInit.hgvWeight.val,
                        options: {
                            disabled: !ctrl.hgvWeightCb,
                            floor: ctrl.optionList.hgvParams.hgvWeight.min,
                            ceil: ctrl.optionList.hgvParams.hgvWeight.max,
                            translate: function(value) {
                                return value + " <b>t</b>"
                            },
                            onEnd: function() {
                                ctrl.currentOptions.hgvWeight = ctrl.hgvSliders.Weight.value;
                                ctrl.changeOptions()
                            }
                        }
                    }
                };
                ctrl.toggleHgvOptSlider("", false);
                ctrl.currentOptions.surface = ctrl.currentOptions.surface !== undefined ? ctrl.optionList.wheelchair.Surface[ctrl.currentOptions.surface].value : ctrl.optionList.wheelchair.Surface["any"].value;
                ctrl.currentOptions.incline = ctrl.currentOptions.incline !== undefined ? ctrl.optionList.wheelchair.Incline[ctrl.currentOptions.incline].value : ctrl.optionList.wheelchair.Incline["31"].value;
                ctrl.currentOptions.curb = ctrl.currentOptions.curb !== undefined ? ctrl.optionList.wheelchair.Curb[ctrl.currentOptions.curb].value : ctrl.optionList.wheelchair.Curb["0.31"].value;
                ctrl.currentOptions.wheelchairWidth = ctrl.currentOptions.wheelchairWidth !== undefined ? ctrl.optionList.wheelchair.Width[ctrl.currentOptions.wheelchairWidth].value : ctrl.optionList.wheelchair.Width["-1"].value;
                ctrl.wheelchairSliders = {
                    Surface: {
                        value: ctrl.currentOptions.surface,
                        options: {
                            stepsArray: [{
                                value: ctrl.optionList.wheelchair.Surface["concrete"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Surface["cobblestone:flattened"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Surface["cobblestone"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Surface["compacted"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Surface["any"].value
                            }],
                            showTicks: true,
                            showTicksValues: false,
                            hidePointerLabels: true,
                            hideLimitLabels: true,
                            onEnd: function() {
                                ctrl.currentOptions.surface = ctrl.wheelchairSliders.Surface.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Incline: {
                        value: ctrl.currentOptions.incline,
                        options: {
                            stepsArray: [{
                                value: ctrl.optionList.wheelchair.Incline["3"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Incline["6"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Incline["10"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Incline["15"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Incline["31"].value
                            }],
                            showTicks: true,
                            showTicksValues: false,
                            hidePointerLabels: true,
                            hideLimitLabels: true,
                            onEnd: function() {
                                ctrl.currentOptions.incline = ctrl.wheelchairSliders.Incline.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Curb: {
                        value: ctrl.currentOptions.curb,
                        options: {
                            stepsArray: [{
                                value: ctrl.optionList.wheelchair.Curb["0.03"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Curb["0.06"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Curb["0.1"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Curb["0.31"].value
                            }],
                            showTicks: true,
                            showTicksValues: false,
                            hidePointerLabels: true,
                            hideLimitLabels: true,
                            onEnd: function() {
                                ctrl.currentOptions.curb = ctrl.wheelchairSliders.Curb.value;
                                ctrl.changeOptions()
                            }
                        }
                    },
                    Width: {
                        value: ctrl.currentOptions.wheelchairWidth,
                        options: {
                            stepsArray: [{
                                value: ctrl.optionList.wheelchair.Width["1"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Width["1.5"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Width["2"].value
                            }, {
                                value: ctrl.optionList.wheelchair.Width["-1"].value
                            }],
                            showTicks: true,
                            showTicksValues: false,
                            hidePointerLabels: true,
                            hideLimitLabels: true,
                            onEnd: function() {
                                ctrl.currentOptions.wheelchairWidth = ctrl.wheelchairSliders.Width.value;
                                ctrl.changeOptions()
                            }
                        }
                    }
                };
                if (ctrl.currentOptions.borders.country !== undefined) {
                    var numbers = ctrl.currentOptions.borders.country.split("|");
                    for (var i = 0; i < ctrl.countries.length; i++) {
                        if (numbers.indexOf(ctrl.countries[i].cid) != -1) {
                            ctrl.checkedCountries.push(ctrl.countries[i].id);
                            ctrl.countries[i].check = true;
                            ctrl.avoidCountries = true
                        }
                    }
                }
            };
            ctrl.avoidHillsCheckbox = function() {
                var avoidhillsCheckbox = angular.element(document.querySelector("#cb-avoidhills"));
                var avoidhillsCheckboxInput = angular.element(document.querySelector("#cb-avoidhills-input"));
                if (ctrl.optionList.difficulty.fitness[ctrl.currentOptions.fitness].value >= 0) {
                    avoidhillsCheckbox.addClass("disabled");
                    avoidhillsCheckboxInput.attr("disabled", "disabled")
                } else {
                    avoidhillsCheckbox.removeClass("disabled");
                    avoidhillsCheckboxInput.removeAttr("disabled")
                }
            };
            ctrl.$onChanges = function(changesObj) {
                if (changesObj.showOptions) ctrl.refreshSlider()
            };
            orsSettingsFactory.subscribeToNgRoute(function onNext(route) {
                ctrl.routing = route == "directions" ? true : false
            });
            ctrl.changeOptions = function() {
                if (!ctrl.carBrands) {
                    ctrl.initOFS()
                }
                if (ctrl.currentOptions.difficulty) ctrl.difficultySliders.Fitness.options.disabled = ctrl.currentOptions.difficulty.avoidhills === true;
                orsSettingsFactory.setActiveOptions(ctrl.currentOptions, ctrl.routing)
            };
            ctrl.getClass = function(bool) {
                if (bool === true) return "fa fa-fw fa-chevron-down";
                else return "fa fa-fw fa-chevron-right"
            };
            ctrl.refreshSlider = function() {
                $timeout(function() {
                    $scope.$broadcast("rzSliderForceRender")
                }, 1e3)
            };
            ctrl.reCalcViewDimensions = function() {
                $timeout(function() {
                    $scope.$broadcast("reCalcViewDimensions")
                }, 1e3)
            };
            ctrl.refreshSlider();
            ctrl.getSettingsLanguage = function() {
                ctrl.language = orsCookiesFactory.getCookies().language.toString()
            };
            ctrl.getSettingsLanguage();
            ctrl.checkedCountries = [];
            ctrl.countries = countries.list;
            ctrl.queryCountries = "";
            ctrl.removeCountries = function() {
                for (var i = 0; i < ctrl.checkedCountries.length; i++) {
                    ctrl.countries[ctrl.checkedCountries[i]].check = false
                }
                ctrl.checkedCountries = [];
                ctrl.queryCountries = "";
                ctrl.passBordersToOptions();
                ctrl.avoidCountries = false
            };
            ctrl.toggleCountries = function(idx) {
                if (ctrl.countries[idx].check) {
                    ctrl.checkedCountries.push(idx);
                    ctrl.avoidCountries = true
                } else {
                    var position = ctrl.checkedCountries.indexOf(idx);
                    ctrl.checkedCountries.splice(position, 1)
                }
                ctrl.passBordersToOptions()
            };
            ctrl.passBordersToOptions = function() {
                var cstring = "";
                if (ctrl.avoidCountries) {
                    for (var i = 0; i < ctrl.checkedCountries.length; i++) {
                        var country = ctrl.countries[ctrl.checkedCountries[i]].cid;
                        if (cstring === "") cstring += country;
                        else cstring += "|" + country
                    }
                }
                if (ctrl.currentOptions.borders !== undefined) ctrl.currentOptions.borders.country = cstring;
                else ctrl.currentOptions.borders = {
                    country: cstring
                };
                ctrl.changeOptions()
            };
            $scope.checked = function(row) {
                return !!(row.hasOwnProperty("check") && row.check === true)
            };
            $scope.search = function(row) {
                return !!((row.official_en_name.toLowerCase().indexOf(ctrl.queryCountries.toLowerCase() || "") !== -1 || row.cid.indexOf(ctrl.queryCountries || "") !== -1 || row.country_code.toLowerCase().indexOf(ctrl.queryCountries.toLowerCase() || "") !== -1 || row.native_names.toLowerCase().indexOf(ctrl.queryCountries.toLowerCase() || "") !== -1 || row[ctrl.language].toLowerCase().indexOf(ctrl.queryCountries.toLowerCase() || "") !== -1) && (!row.hasOwnProperty("check") || row.check === false))
            };
            ctrl.initOFS = function() {
                try {
                    var brandsRequest = orsFuelService.getBrands();
                    brandsRequest.promise.then(function(brandsResponse) {
                        ctrl.carBrands = brandsResponse.brands
                    }, function(brandsError) {
                        void 0
                    })
                } catch (e) {
                    ctrl.carBrands = null
                }
            };
            ctrl.carCategories = carCategories;
            ctrl.categoryCheck = true;
            ctrl.carModels = ctrl.carYears = ctrl.carTypes = [];
            ctrl.set = function(list) {
                ctrl[list] = list === "carYears" ? Object.keys(ctrl.carResponse[ctrl.queryModel]) : list === "carTypes" && ctrl.queryYear ? Object.keys(ctrl.carResponse[ctrl.queryModel][ctrl.queryYear]) : list
            };
            ctrl.chooseCategory = function() {
                var renameKey = function(o, newKey) {
                    if (Object.keys(o)[0] !== newKey) {
                        Object.defineProperty(o, newKey, Object.getOwnPropertyDescriptor(o, Object.keys(o)[0]));
                        delete o[Object.keys(o)[0]]
                    }
                };
                if (ctrl.tankSize) renameKey(ctrl.ofs.filters.tank_sizes, ctrl.ofs.filters.vehicle_categories[0]);
                if (ctrl.fuelConsumption) renameKey(ctrl.ofs.filters.fuel_consumptions, ctrl.ofs.filters.vehicle_categories[0])
            };
            ctrl.toggleSource = function(source) {
                if (source === "category") {
                    ctrl.brandCheck = !ctrl.categoryCheck
                } else if (source === "brand") {
                    ctrl.categoryCheck = !ctrl.brandCheck
                }
            };
            ctrl.requestConsumption = function() {
                if (ctrl.brandCheck) {
                    if (ctrl.queryType) {
                        ctrl.ofs.filters.cfd_ids = ctrl.carResponse[ctrl.queryModel][ctrl.queryYear][ctrl.queryType];
                        ctrl.ofs.filters.request_id = ctrl.queryBrand + " - " + ctrl.queryModel + " (" + ctrl.queryYear + ") " + ctrl.queryType
                    } else if (ctrl.queryYear) {
                        ctrl.ofs.filters.cfd_ids = ctrl.carResponse[ctrl.queryModel][ctrl.queryYear].all;
                        ctrl.ofs.filters.request_id = ctrl.queryBrand + " - " + ctrl.queryModel + " (" + ctrl.queryYear + ")"
                    } else if (ctrl.queryModel) {
                        ctrl.ofs.filters.cfd_ids = ctrl.carResponse[ctrl.queryModel].all;
                        ctrl.ofs.filters.request_id = ctrl.queryBrand + " - " + ctrl.queryModel
                    }
                } else {
                    ctrl.ofs.filters.request_id = ctrl.carCategories[ctrl.ofs.filters.vehicle_categories[0]].en
                }
                ctrl.currentOptions.ofs = ctrl.ofs;
                if (ctrl.categoryCheck) {
                    delete ctrl.currentOptions.ofs.filters.cfd_ids
                } else {
                    delete ctrl.currentOptions.ofs.filters.vehicle_categories[0]
                }
                orsSettingsFactory.setActiveOptions(ctrl.currentOptions);
                ctrl.requesting = true;
                orsFuelService.getConsumption(ctrl.currentOptions.ofs);
                ctrl.requesting = false;
                if (!ctrl.autoCall) {
                    ctrl.removeOfsSettings()
                }
            };
            ctrl.filterOutAll = function(list) {
                return list.filter(function(e) {
                    return e !== "all"
                })
            };
            ctrl.removeOfsSettings = function() {
                delete ctrl.currentOptions.ofs;
                orsSettingsFactory.setActiveOptions(ctrl.currentOptions)
            };
            ctrl.requestCars = function() {
                var carRequest = orsFuelService.getCars(ctrl.queryBrand);
                carRequest.promise.then(function(carResponse) {
                    ctrl.carResponse = carResponse;
                    ctrl.carModels = Object.keys(carResponse)
                }, function(carError) {
                    void 0
                })
            };
            ctrl.toggleAutoCall = function() {
                if (!ctrl.autoCall) {
                    ctrl.removeOfsSettings()
                } else {
                    ctrl.currentOptions.ofs = ctrl.ofs;
                    orsSettingsFactory.setActiveOptions(ctrl.currentOptions)
                }
            };
            ctrl.ofs = {
                filters: {
                    data_source: "cfd",
                    fuel_type: "gasoline",
                    vehicle_type: "car",
                    driving_speed: 60,
                    vehicle_categories: ["c"],
                    fuel_consumptions: {},
                    tank_sizes: {},
                    request_id: "medium cars"
                }
            };
            $scope.searchBrand = function(row) {
                return ctrl.queryBrand ? !!(row.toLowerCase().indexOf(ctrl.queryBrand.toLowerCase() || "") !== -1) : row
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_instructions_47_ors_45_instructions_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-instructions/ors-instructions.js";
    angular.module("orsApp.ors-instructions", ["orsApp.ors-exportRoute-controls"]).component("orsInstructions", {
        templateUrl: "components/ors-panel-routing/ors-instructions/ors-instructions.html",
        bindings: {
            showInstructions: "&",
            shouldDisplayRouteDetails: "<"
        },
        controller: ["$rootScope", "$scope", "orsRouteService", "orsSettingsFactory", "orsRequestService", "lists", function($rootScope, $scope, orsRouteService, orsSettingsFactory, orsRequestService, lists) {
            var ctrl = this;
            ctrl.profiles = lists.profiles;
            ctrl.routeIndex = orsRouteService.getCurrentRouteIdx();
            ctrl.data = orsRouteService.data;
            $scope.route = ctrl.route = ctrl.data.routes[ctrl.routeIndex];
            try {
                $rootScope.routeSubscriptionInstructions.dispose()
            } catch (error) {}
            $rootScope.routeSubscriptionInstructions = orsRouteService.routesSubject.subscribe(function(data) {
                ctrl.routeIndex = orsRouteService.getCurrentRouteIdx();
                if (data.routes) {
                    $scope.route = ctrl.route = data.routes[ctrl.routeIndex];
                    ctrl.data = orsRouteService.data;
                    ctrl.isLoading = false
                }
            });
            orsSettingsFactory.subscribeToRouteRequest(function onNext(bool) {
                if (bool === true) {
                    $scope.route = ctrl.route = [];
                    ctrl.data = undefined;
                    ctrl.isLoading = bool
                }
            });
            ctrl.waypoints = orsSettingsFactory.getWaypoints();
            ctrl.getClass = function(bool) {
                if (bool === true) return "fa fa-lg fa-fw fa-angle-down";
                else return "fa fa-lg fa-fw fa-angle-right"
            };
            ctrl.getIcon = function(code) {
                var arrow = "fa fa-arrow-up ";
                var enterRoundabout = "";
                var exitRoundabout = "";
                var uTurn = "";
                var finish = "";
                switch (code) {
                    case 0:
                        arrow += "fa-rotate-270";
                        break;
                    case 1:
                        arrow += "fa-rotate-90";
                        break;
                    case 2:
                        arrow += "fa-rotate-225";
                        break;
                    case 3:
                        arrow += "fa-rotate-135";
                        break;
                    case 4:
                    case 12:
                        arrow += "fa-rotate-315";
                        break;
                    case 5:
                    case 13:
                        arrow += "fa-rotate-45";
                        break;
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                    case 9:
                        break;
                    case 10:
                        break
                }
                return arrow
            };
            ctrl.EmphSegment = function(idx) {
                var segmentStart = $scope.route.way_points[idx];
                var segmentEnd = $scope.route.way_points[idx + 1];
                var routeString = $scope.route.geometry;
                var geometry = routeString.slice(segmentStart, segmentEnd + 1);
                orsRouteService.Emph(geometry)
            };
            ctrl.DeEmph = function() {
                orsRouteService.DeEmph()
            };
            ctrl.EmphStep = function(pair) {
                var routeString = $scope.route.geometry;
                var geometry = routeString.slice(pair[0], pair[1] + 1);
                orsRouteService.Emph(geometry)
            };
            ctrl.EmphStepLm = function(lms) {
                if (lms && lms.features.length > 0) {
                    var lm = lms.features[0];
                    if (lm.properties.suitability > 0) {
                        orsRouteService.EmphLandmark(lm)
                    }
                }
            };
            ctrl.DeEmphStepLm = function() {
                orsRouteService.DeEmphLandmark()
            };
            ctrl.zoomTo = function(idx) {
                var destination = arguments[1] !== void 0 ? arguments[1] : false;
                var routeString = $scope.route.geometry;
                var geometry;
                if (destination) {
                    var segmentEnd = $scope.route.way_points[idx];
                    geometry = [routeString[segmentEnd]]
                } else {
                    var segmentStart = $scope.route.way_points[idx];
                    var segmentEnd$__2 = $scope.route.way_points[idx + 1];
                    geometry = routeString.slice(segmentStart, segmentEnd$__2 + 1)
                }
                orsRouteService.zoomTo(geometry)
            };
            ctrl.zoomToStep = function(pair) {
                var routeString = $scope.route.geometry;
                var geometry = routeString.slice(pair[0], pair[1] + 1);
                orsRouteService.zoomTo(geometry)
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_addresses_47_ors_45_addresses_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-addresses/ors-addresses.js";
    angular.module("orsApp.ors-addresses", ["orsApp.ors-exportRoute-controls", "focus-if"]).component("orsAddresses", {
        templateUrl: "components/ors-panel-routing/ors-addresses/ors-addresses.html",
        bindings: {
            showGeocodingPanel: "=",
            showGeocodingPanelIdx: "<"
        },
        controller: ["orsSettingsFactory", "orsMapFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsMessagingService", "lists", function(orsSettingsFactory, orsMapFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsMessagingService, lists) {
            var ctrl = this;
            ctrl.$onInit = function() {
                ctrl.isDirections = ctrl.showGeocodingPanelIdx !== undefined;
                if (ctrl.isDirections) {
                    ctrl.waypoint = orsSettingsFactory.getWaypoints()[ctrl.showGeocodingPanelIdx];
                    ctrl.addresses = orsRequestService.savedRequests.directions[ctrl.showGeocodingPanelIdx]
                } else {
                    ctrl.waypoint = orsSettingsFactory.getWaypoints()[0];
                    ctrl.addresses = orsRequestService.savedRequests.geocoding[0]
                }
            };
            ctrl.addressChanged = function() {
                if (ctrl.waypoint._address != "") {
                    var addressString = ctrl.waypoint._address;
                    addressString = addressString.split(/[\s,;]+/);
                    if (addressString.length == 2) {
                        var lat = addressString[0];
                        var lng = addressString[1];
                        if (orsUtilsService.isCoordinate(lat, lng)) {
                            var position = L.latLng(lat, lng);
                            var positionString = orsUtilsService.parseLatLngString(position);
                            ctrl.addresses = [{
                                geometry: {
                                    coordinates: [lng, lat]
                                },
                                processed: {
                                    primary: positionString,
                                    secondary: ""
                                }
                            }]
                        } else {
                            ctrl.constructPayLoad()
                        }
                    } else {
                        ctrl.constructPayLoad()
                    }
                } else {
                    ctrl.addresses = []
                }
            };
            ctrl.constructPayLoad = function() {
                ctrl.addresses = [];
                var payload = orsUtilsService.geocodingPayload(ctrl.waypoint._address);
                var request = orsRequestService.geocode(payload);
                orsRequestService.geocodeRequests.updateRequest(request, ctrl.idx, "routeRequests");
                orsRequestService.requestSubject.onNext(true);
                request.promise.then(function(data) {
                    if (data.features.length > 0) {
                        ctrl.addresses = orsUtilsService.addShortAddresses(data.features);
                        if (ctrl.isDirections) {
                            orsRequestService.savedRequests.directions[ctrl.showGeocodingPanelIdx] = ctrl.addresses
                        } else {
                            orsRequestService.savedRequests.geocoding[0] = ctrl.addresses
                        }
                    } else {
                        orsMessagingService.messageSubject.onNext(lists.errors.GEOCODE)
                    }
                    orsRequestService.requestSubject.onNext(false)
                }, function(response) {
                    orsRequestService.requestSubject.onNext(false)
                })
            };
            ctrl.select = function(address) {
                ctrl.showGeocodingPanel = !ctrl.showGeocodingPanel;
                var addressStrings;
                if (address.processed.secondary.length > 0) {
                    addressStrings = [address.processed.primary, address.processed.secondary]
                } else {
                    addressStrings = [address.processed.primary]
                }
                ctrl.waypoint._address = addressStrings.join(", ");
                ctrl.waypoint._latlng = L.latLng(address.geometry.coordinates[1], address.geometry.coordinates[0]);
                ctrl.waypoint._set = 1;
                var idx = ctrl.showGeocodingPanelIdx === undefined ? 0 : ctrl.showGeocodingPanelIdx;
                orsSettingsFactory.setWaypoint(ctrl.waypoint, idx, true);
                orsRequestService.zoomTo([
                    [address.geometry.coordinates[1], address.geometry.coordinates[0]]
                ])
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_route_45_extras_47_ors_45_route_45_extras_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-route-extras/ors-route-extras.js";
    angular.module("orsApp.ors-route-extras", ["orsApp.ors-bars-chart", "orsApp.ors-route-extras-map"]).component("orsRouteExtras", {
        templateUrl: "components/ors-panel-routing/ors-route-extras/ors-route-extras.html",
        bindings: {
            currentRoute: "<",
            routeIndex: "<",
            checkboxes: "<"
        },
        controller: ["$scope", "mappings", "orsRouteService", "orsUtilsService", function($scope, mappings, orsRouteService, orsUtilsService) {
            var ctrl = this;
            ctrl.mappings = mappings;
            ctrl.processExtras = function(currentRoute, key) {
                var totalDistance = currentRoute.summary.distance;
                var extras = {};
                angular.forEach(currentRoute.extras[key].values, function(elem, i) {
                    var fr = elem[0],
                        to = elem[1];
                    if (fr !== to) {
                        var typeNumber;
                        typeNumber = parseInt(elem[2]);
                        var routeSegment = currentRoute.geometry.slice(fr, to);
                        if (typeNumber in extras) {
                            extras[typeNumber].intervals.push([fr, to])
                        } else {
                            var text;
                            if (key === "traildifficulty" && orsRouteService.data.info.query.profile.substring(0, 4) === "foot") {
                                text = ctrl.mappings[key][typeNumber].text_hiking
                            } else {
                                text = ctrl.mappings[key][typeNumber].text
                            }
                            var color = ctrl.mappings[key][typeNumber].color;
                            extras[typeNumber] = {
                                type: text,
                                intervals: [
                                    [fr, to]
                                ],
                                color: color
                            }
                        }
                    }
                });
                var y0 = 0;
                var typesOrder = [];
                currentRoute.extras[key].summary.sort(function(a, b) {
                    return parseFloat(a.value) - parseFloat(b.value)
                });
                for (var i = 0; i < currentRoute.extras[key].summary.length; i++) {
                    var extra = currentRoute.extras[key].summary[i];
                    extras[extra.value].distance = extra.distance;
                    extras[extra.value].percentage = extra.amount;
                    extras[extra.value].y0 = y0;
                    extras[extra.value].y1 = y0 += +extra.amount;
                    typesOrder.push(extra.value)
                }
                return {
                    extras: extras,
                    typesOrder: typesOrder
                }
            };
            ctrl.routeExtras = [];
            $scope.$watch("$ctrl.currentRoute", function(route) {
                ctrl.routeExtras = [];
                for (var key in route.extras) {
                    var data = ctrl.processExtras(route, key);
                    ctrl.routeExtras.push({
                        data: data.extras,
                        typesOrder: data.typesOrder,
                        type: key,
                        routeIndex: ctrl.routeIndex,
                        checkboxes: ctrl.checkboxes
                    })
                }
            })
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_route_45_extras_47_ors_45_bars_45_chart_47_ors_45_bars_45_chart_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-route-extras/ors-bars-chart/ors-bars-chart.js";
    angular.module("orsApp.ors-bars-chart", []).directive("orsBarsChart", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                key: "<",
                typesOrder: "<",
                obj: "<",
                routeIndex: "<"
            },
            template: '<div class="ors-bars"></div>',
            link: function(scope, element, attrs, fn) {
                var tip = d3.tip().attr("class", "d3-tip").offset([-10, 0]).html(function(d) {
                    return d.percentage + "% " + scope.translateFilter(d.type) + " (" + scope.distanceFilter(d.distance) + ")"
                });
                var data = [];
                angular.forEach(scope.typesOrder, function(type) {
                    data.push(scope.obj[type])
                });
                var margin = {
                        top: 0,
                        right: 10,
                        bottom: 0,
                        left: 10
                    },
                    width = 320 - margin.left - margin.right,
                    height = 50 - margin.top - margin.bottom;
                var y = d3.scaleLinear().rangeRound([height, 0]);
                var x = d3.scaleLinear().rangeRound([0, width]);
                var xAxis = d3.axisBottom().scale(x);
                var yAxis = d3.axisLeft().scale(y);
                var svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height);
                y.domain([0]);
                x.domain([0, data[data.length - 1].y1]);
                svg.append("g").selectAll("rect").data(data).enter().append("rect").attr("height", 22).attr("x", function(d) {
                    return x(d.y0) / 1
                }).attr("width", function(d) {
                    return x(d.y1) / 1 - x(d.y0) / 1
                }).attr("title", function(d) {
                    return d.y1 - d.y0 + "% : " + d.type
                }).style("fill", function(d, i) {
                    return d.color
                }).on("mouseover", function(d) {
                    scope.EmphSegment(d.intervals);
                    tip.show(d)
                }).on("mouseout", function(d) {
                    scope.DeEmphSegment();
                    tip.hide(d)
                }).on("click", function(d) {
                    scope.ZoomToSegment(d.intervals)
                });
                var legendRectSize = 5;
                var legendSpacing = 7;
                var legendTotalHeight = 0;
                var legendContainer = svg.append("g");
                var legendData = data.sort(function(a, b) {
                    return a.percentage < b.percentage
                });
                var legend = legendContainer.selectAll(".chart-legend").data(legendData).enter().append("g").attr("class", ".chart-legend").attr("transform", function(d, i) {
                    var legendHeight = legendRectSize + legendSpacing;
                    var vert = height + i * legendHeight;
                    legendTotalHeight += legendHeight;
                    return "translate(" + 0 + "," + vert + ")"
                });
                legend.append("rect").attr("width", legendRectSize).attr("height", legendRectSize).style("fill", function(d, i) {
                    return d.color
                });
                legendContainer.append("text").style("font-size", "12px").attr("x", 0).attr("y", 35).text(scope.translateFilter(scope.key));
                legend.append("text").style("font-size", "11px").attr("x", legendRectSize + legendSpacing).attr("y", legendRectSize).text(function(d) {
                    return scope.translateFilter(d.type) + " (" + d.percentage + "%)"
                });
                legend.on("mouseover", function(d) {
                    scope.EmphSegment(d.intervals)
                });
                legend.on("mouseout", function(d) {
                    scope.DeEmphSegment()
                });
                svg.attr("height", 40);
                if (scope.typesOrder.length >= 1) {
                    var show = false;
                    var expand = svg.append("path").attr("transform", "translate(290,32) rotate(90)").attr("class", "pointer").style("fill", "#444").attr("d", d3.symbol().type(d3.symbolTriangle).size(35)).style("font-size", "11px").on("click", function() {
                        show = show === false ? true : false;
                        if (show === true) {
                            svg.attr("height", legendTotalHeight + height);
                            expand.attr("transform", "translate(290,32) rotate(180)")
                        } else {
                            svg.attr("height", 40);
                            expand.attr("transform", "translate(290,32) rotate(90)")
                        }
                    })
                }
                svg.call(tip)
            },
            controller: ["$scope", "$filter", "orsRouteService", function($scope, $filter, orsRouteService) {
                $scope.distanceFilter = $filter("distance");
                $scope.translateFilter = $filter("translate");
                $scope.EmphSegment = function(segments) {
                    angular.forEach(segments, function(pair) {
                        var routeString = orsRouteService.data.routes[$scope.routeIndex].geometry;
                        var geometry = routeString.slice(pair[0], pair[1] + 1);
                        orsRouteService.Emph(geometry)
                    })
                };
                $scope.DeEmphSegment = function() {
                    orsRouteService.DeEmph()
                };
                $scope.ZoomToSegment = function() {}
            }]
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_route_45_extras_47_ors_45_route_45_extras_45_map_47_ors_45_route_45_extras_45_map_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-route-extras/ors-route-extras-map/ors-route-extras-map.js";
    angular.module("orsApp.ors-route-extras-map", []).component("orsRouteExtrasMap", {
        templateUrl: "components/ors-panel-routing/ors-route-extras/ors-route-extras-map/ors-route-extras-map.html",
        bindings: {
            routeIndex: "<",
            i: "<",
            extra: "<",
            types: "<",
            checkboxes: "<"
        },
        controller: ["orsRouteService", function(orsRouteService) {
            var ctrl = this;
            var currentRoute = orsRouteService.data.routes;
            ctrl.$onInit = function() {
                angular.forEach(ctrl.checkboxes, function(checked, idx) {
                    if (ctrl.i == idx) {
                        if (checked) {
                            angular.forEach(ctrl.types, function(value, key) {
                                var color = value.color;
                                angular.forEach(ctrl.types[key].intervals, function(v, k) {
                                    var geom = currentRoute[ctrl.routeIndex].geometry.slice(v[0], v[1] + 1);
                                    orsRouteService.Color(geom, color)
                                })
                            })
                        }
                    }
                })
            };
            ctrl.updateExtrasColor = function() {
                ctrl.checkboxes[ctrl.i] = !ctrl.checkboxes[ctrl.i];
                angular.forEach(ctrl.checkboxes, function(checked, idx) {
                    if (ctrl.i == idx) {
                        if (ctrl.checkboxes[ctrl.i]) {
                            angular.forEach(ctrl.types, function(value, key) {
                                var color = value.color;
                                angular.forEach(ctrl.types[key].intervals, function(v, k) {
                                    var geom = currentRoute[ctrl.routeIndex].geometry.slice(v[0], v[1] + 1);
                                    orsRouteService.Color(geom, color)
                                })
                            })
                        } else {
                            orsRouteService.DeColor()
                        }
                    } else {
                        ctrl.checkboxes[idx] = false
                    }
                })
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_profiles_45_options_47_ors_45_profiles_45_options_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-profiles-options/ors-profiles-options.js";
    angular.module("orsApp.ors-profiles-options", []).component("orsProfilesOptions", {
        templateUrl: "components/ors-profiles-options/ors-profiles-options.html",
        bindings: {
            orsParams: "<",
            activeProfile: "=",
            activeSubgroup: "=",
            showOptions: "=",
            profiles: "<"
        },
        controller: ["orsSettingsFactory", "$window", function(orsSettingsFactory, $window) {
            var ctrl = this;
            ctrl.currentProfile = {};
            ctrl.$onInit = function() {
                ctrl.currentProfile = orsSettingsFactory.getActiveProfile();
                ctrl.activeSubgroup = ctrl.profiles[ctrl.currentProfile.type].subgroup;
                ctrl.activeProfile = ctrl.currentProfile.type
            };
            ctrl.changeProfile = function(profile) {
                if (profile) ctrl.currentProfile.type = profile;
                ctrl.activeProfile = ctrl.currentProfile.type;
                ctrl.activeSubgroup = ctrl.profiles[ctrl.currentProfile.type].subgroup;
                orsSettingsFactory.setProfile(ctrl.currentProfile)
            };
            ctrl.$onChanges = function(changes) {};
            ctrl.callOptions = function() {
                ctrl.showOptions = ctrl.showOptions == false ? true : false
            };
            ctrl.callUrl = function(link) {
                $window.location.href = link
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_share_47_ors_45_share_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-share/ors-share.js";
    angular.module("orsApp.ors-share", []).component("orsShare", {
        templateUrl: "components/ors-share/ors-share.html",
        bindings: {
            shareUrl: "<"
        },
        controller: ["orsUtilsService", "$location", function(orsUtilsService, $location) {
            var ctrl = this;
            ctrl.shortenLinkBool = false;
            if (ctrl.shareUrl) ctrl.linkText = ctrl.shareUrl;
            else ctrl.linkText = $location.absUrl();
            ctrl.shortenLink = function() {
                if (ctrl.shortenLinkBool === true) {
                    var request = orsUtilsService.getShortenlink(ctrl.linkText);
                    request.promise.then(function(response) {
                        if (response.data.url) ctrl.linkText = response.data.url
                    }, function(response) {
                        ctrl.linkText = $location.absUrl()
                    })
                } else {
                    ctrl.linkText = $location.absUrl()
                }
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_panel_45_accessibilityanalysis_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-panel-accessibilityanalysis.js";
    angular.module("orsApp.ors-panel-accessibilityanalysis", ["orsApp.ors-aa-controls", "orsApp.ors-aa-waypoints", "orsApp.ors-aa-sliders", "orsApp.ors-aa-queries"]).component("orsAnalysis", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-panel-accessibilityanalysis.html",
        controller: ["$scope", "$location", "orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsParamsService", "orsCookiesFactory", "orsMapFactory", "lists", function($scope, $location, orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsParamsService, orsCookiesFactory, orsMapFactory, lists) {
            var ctrl = this;
            ctrl.$routerCanReuse = function(next, prev) {
                return next.urlPath === prev.urlPath
            };
            ctrl.$onInit = function() {
                ctrl.profiles = lists.profiles
            };
            ctrl.$routerOnActivate = function(next) {
                orsSettingsFactory.isInitialized = true;
                orsSettingsFactory.updateNgRoute(next.urlPath);
                if (orsSettingsFactory.getWaypoints().length == 0) {
                    ctrl.routeParams = next.params;
                    orsSettingsFactory.initWaypoints(1);
                    var importedParams = orsParamsService.importSettings(ctrl.routeParams, false);
                    orsSettingsFactory.setSettings(importedParams.settings);
                    angular.forEach(importedParams.settings.waypoints, function(wp, idx) {
                        orsSettingsFactory.getAddress(wp._latlng, idx, true)
                    });
                    var userOptionsCookie = orsCookiesFactory.getCookies();
                    var mapOptionsCookie = orsCookiesFactory.getMapOptions();
                    var userOptions = Object.assign({}, userOptionsCookie, mapOptionsCookie, importedParams.user_options);
                    orsSettingsFactory.setUserOptions(userOptions)
                }
                orsSettingsFactory.updateWaypoints();
                ctrl.currentOptions = orsSettingsFactory.getActiveOptions();
                ctrl.activeProfile = orsSettingsFactory.getActiveProfile().type;
                ctrl.activeSubgroup = ctrl.profiles[ctrl.activeProfile].subgroup;
                ctrl.showGeocodingPanel = false;
                orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), orsSettingsFactory.getUserOptions())
            };
            ctrl.$routerOnReuse = function(next, prev) {}
        }],
        require: {
            parent: "^orsSidebar"
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_controls_47_ors_45_aa_45_controls_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-controls/ors-aa-controls.js";
    angular.module("orsApp.ors-aa-controls", []).component("orsAaControls", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-controls/ors-aa-controls.html",
        controller: ["orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsMapFactory", function(orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsMapFactory) {
            var ctrl = this;
            ctrl.calculate = function() {
                ctrl.onCalculate()
            };
            ctrl.callOptions = function() {
                ctrl.showOptions = ctrl.showOptions === false ? true : false
            };
            ctrl.$onInit = function() {
                ctrl.showOptions = true
            };
            ctrl.disabled = true;
            orsSettingsFactory.subscribeToRouteRequest(function onNext(bool) {
                ctrl.disabled = ctrl.requesting = bool === true ? true : false
            });
            orsSettingsFactory.subscribeToAaWaypoints(function onNext(d) {
                if (d.length > 0) ctrl.disabled = false
            })
        }],
        bindings: {
            onCalculate: "&",
            activeSubgroup: "<",
            activeProfile: "<",
            currentOptions: "<"
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_waypoints_47_ors_45_aa_45_waypoints_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoints.js";
    angular.module("orsApp.ors-aa-waypoints", ["orsApp.ors-aa-waypoint"]).component("orsAaWaypoints", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoints.html",
        bindings: {
            orsMap: "<",
            orsParams: "<",
            activeProfile: "<",
            activeSubgroup: "<",
            currentOptions: "<",
            showGeocodingPanel: "="
        },
        controller: ["$scope", "orsSettingsFactory", "orsAaService", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsParamsService", function($scope, orsSettingsFactory, orsAaService, orsObjectsFactory, orsUtilsService, orsRequestService, orsParamsService) {
            var ctrl = this;
            ctrl.$onInit = function() {
                ctrl.waypoints = orsSettingsFactory.getWaypoints();
                if (ctrl.waypoints.length == 0) {
                    ctrl.waypoints = orsSettingsFactory.initWaypoints(1)
                }
                ctrl.showAdd = true
            };
            ctrl.collapsed = false;
            ctrl.collapseIcon = "fa fa-minus-circle";
            ctrl.collapse = function() {
                ctrl.collapsed = ctrl.collapsed == true ? false : true;
                if (ctrl.collapsed == true) {
                    ctrl.sortableOptions = {
                        disabled: true
                    };
                    ctrl.collapseIcon = "fa fa-plus-circle"
                }
                if (ctrl.collapsed == false) {
                    ctrl.sortableOptions = {
                        disabled: false
                    };
                    ctrl.collapseIcon = "fa fa-minus-circle"
                }
            };
            ctrl.collapseWp = function(idx) {
                if (ctrl.collapsed == true) {
                    if (idx == 0 || idx == ctrl.waypoints.length - 1) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return true
                }
            };
            ctrl.$doCheck = function() {};
            ctrl.waypointsChanged = function() {};
            ctrl.resetWaypoints = function() {
                ctrl.waypoints = orsSettingsFactory.initWaypoints(1);
                orsAaService.initAaObj();
                orsSettingsFactory.updateWaypoints()
            };
            ctrl.addressChanged = function() {
                orsSettingsFactory.setWaypoints(ctrl.waypoints, false)
            };
            ctrl.calculate = function() {
                orsSettingsFactory.setActiveOptions(ctrl.currentOptions, true)
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_waypoints_47_ors_45_aa_45_waypoint_47_ors_45_aa_45_waypoint_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoint/ors-aa-waypoint.js";
    angular.module("orsApp.ors-aa-waypoint", []).component("orsAaWaypoint", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-waypoints/ors-aa-waypoint/ors-aa-waypoint.html",
        bindings: {
            idx: "<",
            waypoint: "<",
            onDelete: "&",
            onWaypointsChanged: "&",
            waypoints: "<",
            showAdd: "=",
            addresses: "<",
            showGeocodingPanel: "="
        },
        controller: ["orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsMessagingService", "lists", function(orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsMessagingService, lists) {
            var ctrl = this;
            ctrl.getPlaceholder = function() {
                var placeholder = "Area center";
                return placeholder
            };
            ctrl.callGeocodingPanel = function() {
                ctrl.showGeocodingPanel = !ctrl.showGeocodingPanel
            };
            ctrl.delete = function() {
                ctrl.onDelete({
                    idx: ctrl.idx
                });
                ctrl.onWaypointsChanged()
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_sliders_47_ors_45_aa_45_sliders_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-sliders/ors-aa-sliders.js";
    angular.module("orsApp.ors-aa-sliders", []).component("orsAaSliders", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-sliders/ors-aa-sliders.html",
        controller: ["$filter", "$scope", "$timeout", "orsSettingsFactory", "orsObjectsFactory", "orsUtilsService", "orsRequestService", "orsParamsService", "lists", function($filter, $scope, $timeout, orsSettingsFactory, orsObjectsFactory, orsUtilsService, orsRequestService, orsParamsService, lists) {
            var ctrl = this;
            ctrl.currentOptions = orsSettingsFactory.getActiveOptions();
            ctrl.optionList = lists.isochroneOptionList;
            ctrl.currentOptions.analysis_options.method = ctrl.currentOptions.analysis_options.method !== undefined ? ctrl.currentOptions.analysis_options.method : ctrl.optionList.methodOptions.TIME.id;
            ctrl.currentOptions.analysis_options.isovalue = ctrl.currentOptions.analysis_options.isovalue !== undefined ? ctrl.currentOptions.analysis_options.isovalue : ctrl.optionList.valueOptions.default;
            ctrl.currentOptions.analysis_options.isointerval = ctrl.currentOptions.analysis_options.isointerval !== undefined ? ctrl.currentOptions.analysis_options.isointerval : ctrl.optionList.intervalOptions.default;
            ctrl.currentOptions.analysis_options.reverseflow = ctrl.currentOptions.analysis_options.reverseflow !== undefined ? ctrl.currentOptions.analysis_options.reverseflow : false;
            ctrl.$onInit = function() {
                ctrl.initSliders();
                ctrl.updateSliderDimensions()
            };
            ctrl.$onChanges = function(changes) {
                if (changes.activeSubgroup) {
                    if (changes.activeSubgroup.currentValue !== changes.activeSubgroup.previousValue) {
                        ctrl.changeOptions(true)
                    }
                }
            };
            ctrl.getClass = function(bool) {
                if (bool === true) return "fa fa-fw fa-chevron-down";
                else return "fa fa-fw fa-chevron-right"
            };
            ctrl.updateSliderDimensions = function() {
                var changedProfile = arguments[0] !== void 0 ? arguments[0] : false;
                if (ctrl.isochroneMinutesSlider && ctrl.isochroneIntervalSlider) {
                    if (ctrl.currentOptions.analysis_options.method == 0) {
                        ctrl.isochroneMinutesSlider.options.ceil = ctrl.optionList.valueOptions.max / ctrl.optionList.velocities[ctrl.activeSubgroup] * 60
                    } else if (ctrl.currentOptions.analysis_options.method == 1) {
                        ctrl.isochroneMinutesSlider.options.ceil = ctrl.optionList.valueOptions.max
                    }
                    ctrl.isochroneMinutesSlider.options.floor = ctrl.optionList.valueOptions.min;
                    if (ctrl.isochroneMinutesSlider.value > ctrl.isochroneMinutesSlider.options.ceil) {
                        ctrl.isochroneMinutesSlider.value = ctrl.isochroneMinutesSlider.options.ceil
                    }
                    ctrl.isochroneIntervalSlider.options.floor = Math.ceil(ctrl.isochroneMinutesSlider.value / 10);
                    ctrl.isochroneIntervalSlider.options.ceil = ctrl.isochroneMinutesSlider.value;
                    if (parseInt(ctrl.isochroneIntervalSlider.value) < parseInt(ctrl.isochroneIntervalSlider.options.floor)) {
                        ctrl.isochroneIntervalSlider.value = ctrl.isochroneIntervalSlider.options.floor
                    } else if (parseInt(ctrl.isochroneIntervalSlider.value) > ctrl.isochroneIntervalSlider.options.ceil) {
                        ctrl.isochroneIntervalSlider.value = ctrl.isochroneIntervalSlider.options.ceil
                    }
                    ctrl.currentOptions.analysis_options.isointerval = ctrl.isochroneIntervalSlider.value;
                    ctrl.currentOptions.analysis_options.isovalue = ctrl.isochroneMinutesSlider.value
                }
                ctrl.refreshSliders();
                ctrl.reCalcViewDimensions()
            };
            ctrl.initSliders = function() {
                ctrl.isochroneMinutesSlider = {
                    value: ctrl.currentOptions.analysis_options.isovalue,
                    options: {
                        floor: null,
                        ceil: null,
                        step: ctrl.optionList.valueOptions.step,
                        translate: function(value) {
                            if (ctrl.currentOptions.analysis_options.method == 0) {
                                return value + " " + $filter("translate")("MINUTES")
                            } else {
                                return $filter("distance")(value * 1e3, true)
                            }
                        },
                        onEnd: function() {
                            ctrl.currentOptions.analysis_options.isovalue = ctrl.isochroneMinutesSlider.value;
                            ctrl.currentOptions.analysis_options.isointerval = ctrl.isochroneIntervalSlider.value;
                            ctrl.changeOptions(false)
                        },
                        onChange: function() {
                            if (ctrl.isochroneMinutesSlider.value >= 1) {
                                ctrl.isochroneIntervalSlider.options.ceil = ctrl.isochroneMinutesSlider.value;
                                ctrl.isochroneIntervalSlider.options.floor = Math.ceil(ctrl.isochroneMinutesSlider.value / 10)
                            }
                            if (ctrl.isochroneIntervalSlider.value > ctrl.isochroneIntervalSlider.options.ceil) {
                                ctrl.isochroneIntervalSlider.value = ctrl.isochroneIntervalSlider.options.ceil
                            } else if (ctrl.isochroneIntervalSlider.value < ctrl.isochroneIntervalSlider.options.ceil) {
                                ctrl.isochroneIntervalSlider.value = ctrl.isochroneIntervalSlider.options.floor
                            }
                        },
                        hidePointerLabels: true
                    }
                };
                ctrl.currentOptions.analysis_options.isointerval = ctrl.currentOptions.analysis_options.isointerval !== undefined ? ctrl.currentOptions.analysis_options.isointerval : ctrl.optionList.intervalOptions.default;
                ctrl.isochroneIntervalSlider = {
                    value: ctrl.currentOptions.analysis_options.isointerval,
                    options: {
                        floor: null,
                        ceil: null,
                        step: ctrl.optionList.intervalOptions.step,
                        translate: function(value) {
                            if (ctrl.currentOptions.analysis_options.method == 0) {
                                return value + " " + $filter("translate")("MINUTES")
                            } else {
                                return $filter("distance")(value * 1e3, true)
                            }
                        },
                        onEnd: function() {
                            ctrl.currentOptions.analysis_options.isointerval = ctrl.isochroneIntervalSlider.value;
                            ctrl.changeOptions(false)
                        },
                        hidePointerLabels: true
                    }
                }
            };
            ctrl.changeOptions = function(changeDimensions) {
                if (changeDimensions) ctrl.updateSliderDimensions();
                orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), orsSettingsFactory.getUserOptions());
                ctrl.refreshSliders()
            };
            ctrl.refreshSliders = function() {
                $timeout(function() {
                    $scope.$broadcast("rzSliderForceRender")
                })
            };
            ctrl.reCalcViewDimensions = function() {
                $timeout(function() {
                    $scope.$broadcast("reCalcViewDimensions")
                })
            }
        }],
        require: {
            parent: "^orsSidebar"
        },
        bindings: {
            currentOptions: "=",
            activeSubgroup: "<"
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_queries_47_ors_45_export_45_query_47_ors_45_export_45_query_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-export-query/ors-export-query.js";
    angular.module("orsApp.ors-export-query", []).component("orsExportQuery", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-export-query/ors-export-query.html",
        bindings: {
            isochroneData: "<"
        },
        controller: ["orsExportFactory", "orsAaService", function(orsExportFactory, orsRouteService) {
            var ctrl = this;
            ctrl.filename = "ors-export-polygon";
            ctrl.geojsonOptShow = false;
            ctrl.fileFormat = [{
                text: "GeoJSON (.geojson)",
                value: "geojson"
            }];
            ctrl.selected_fileformat = ctrl.fileFormat[0];
            ctrl.currentFileFormat = ctrl.selected_fileformat.value;
            ctrl.change_fileFormat = function(fileformat) {
                switch (fileformat.value) {
                    case "geojson":
                        ctrl.geojsonOptShow = true;
                        break
                }
                ctrl.currentFileFormat = fileformat.value
            };
            ctrl.exportRoute = function() {
                var options;
                switch (ctrl.currentFileFormat) {
                    case "geojson":
                        options = {};
                        break
                }
                orsExportFactory.exportFile(ctrl.isochroneData.features, "polygon", options, ctrl.currentFileFormat, ctrl.filename)
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_queries_47_ors_45_aa_45_queries_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-queries.js";
    angular.module("orsApp.ors-aa-queries", ["orsApp.ors-aa-query", "orsApp.ors-export-query"]).component("orsAaQueries", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-queries.html",
        bindings: {},
        controller: ["$rootScope", "orsMessagingService", "orsAaService", function($rootScope, orsMessagingService, orsAaService) {
            var ctrl = this;
            ctrl.aaQueries = orsAaService.aaQueries;
            ctrl.showExport = false;
            ctrl.showShare = false;
            try {
                if ($rootScope.isochronesSubscription !== undefined) $rootScope.isochronesSubscription.dispose()
            } catch (error) {}
            $rootScope.isochronesSubscription = orsAaService.subscribeToAaQueries(function onNext(d) {
                ctrl.aaQueries.push(d)
            });
            ctrl.deleteQuery = function(isoidx) {
                ctrl.removeQuery(isoidx);
                ctrl.aaQueries.splice(isoidx, 1);
                orsAaService.reshuffle()
            };
            ctrl.add = function(obj) {
                orsAaService.add(obj.isoidx, ctrl.aaQueries[obj.isoidx], obj.zoom)
            };
            ctrl.toggle = function(obj) {
                orsAaService.toggle(obj.isoidx, obj.toggle, obj.zoom)
            };
            ctrl.toggleInterval = function(obj) {
                orsAaService.toggleInterval(obj.isoidx, obj.revIsoIidx, obj.toggle)
            };
            ctrl.removeQuery = function(isoidx) {
                orsAaService.remove(isoidx)
            };
            ctrl.downloadQuery = function(isoidx) {
                ctrl.selectedIsochroneData = ctrl.aaQueries[isoidx];
                ctrl.showExport = !ctrl.showExport
            };
            ctrl.shareQuery = function(shareUrl) {
                ctrl.shareUrl = shareUrl;
                ctrl.showShare = !ctrl.showShare
            };
            ctrl.zoomTo = function(isoidx) {
                var isonum = arguments[1] !== void 0 ? arguments[1] : -1;
                var geometry;
                geometry = ctrl.aaQueries[isoidx].features[isonum].geometry.coordinates[0];
                orsAaService.zoomTo(geometry)
            };
            ctrl.emph = function(isoidx) {
                var isonum = arguments[1] !== void 0 ? arguments[1] : -1;
                var geometry;
                if (isonum > -1) {
                    geometry = ctrl.aaQueries[isoidx].features[isonum].geometry.coordinates[0]
                } else {
                    var isolargest = ctrl.aaQueries[isoidx].features.length - 1;
                    geometry = ctrl.aaQueries[isoidx].features[isolargest].geometry.coordinates[0]
                }
                orsAaService.Emph(geometry)
            };
            ctrl.deEmph = function() {
                orsAaService.DeEmph()
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_accessibilityanalysis_47_ors_45_aa_45_queries_47_ors_45_aa_45_query_47_ors_45_aa_45_query_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-query/ors-aa-query.js";
    angular.module("orsApp.ors-aa-query", []).component("orsAaQuery", {
        templateUrl: "components/ors-panel-accessibilityanalysis/ors-aa-queries/ors-aa-query/ors-aa-query.html",
        bindings: {
            isochroneIdx: "<",
            isochroneTotal: "<",
            attributes: "<",
            onDelete: "&",
            onToggle: "&",
            onToggleInterval: "&",
            onDownload: "&",
            onShare: "&",
            onEmph: "&",
            onDeEmph: "&",
            onZoom: "&",
            onAdd: "&",
            intervalsLength: "<"
        },
        controller: ["orsMessagingService", "orsAaService", "$timeout", "$location", "$scope", "$rootScope", function(orsMessagingService, orsAaService, $timeout, $location, $scope, $rootScope) {
            var ctrl = this;
            ctrl.intervalsHidden = [];
            ctrl.isochroneOpacitySlider = {
                value: 50,
                options: {
                    floor: 0,
                    ceil: 100,
                    step: 5,
                    vertical: true,
                    translate: function(value) {
                        return value / 100
                    },
                    onChange: function() {
                        $rootScope.$broadcast("isoOpacityChange", {
                            idx: ctrl.isochroneIdx,
                            opacity: ctrl.isochroneOpacitySlider.value
                        })
                    },
                    hideLimitLabels: true,
                    hidePointerLabels: true
                }
            };
            ctrl.$onInit = function() {
                ctrl.refreshSlider();
                ctrl.showOnMap = true;
                ctrl.showIntervals = Array.apply(null, Array(ctrl.intervalsLength)).map(function() {
                    return true
                });
                ctrl.onAdd({
                    obj: {
                        isoidx: ctrl.isochroneIdx,
                        zoom: true
                    }
                });
                ctrl.shareUrl = $location.absUrl()
            };
            ctrl.getClass = function(bool) {
                if (bool === true) return "fa fa-fw fa-chevron-down";
                else return "fa fa-fw fa-chevron-right"
            };
            ctrl.show = function() {
                if (ctrl.showOnMap === true) return "fa fa-toggle-on";
                else return "fa fa-toggle-off"
            };
            ctrl.zoomTo = function(isonum) {
                if (ctrl.showOnMap) {
                    ctrl.onZoom({
                        isoidx: ctrl.isochroneIdx,
                        isonum: isonum
                    })
                }
            };
            ctrl.toggle = function() {
                ctrl.onToggle({
                    obj: {
                        isoidx: ctrl.isochroneIdx,
                        toggle: ctrl.showOnMap,
                        zoom: false
                    }
                });
                ctrl.intervalsHidden = [];
                if (ctrl.showOnMap === true) {
                    for (var i = 0; i < ctrl.intervalsLength; i++) {
                        ctrl.intervalsHidden.push(i)
                    }
                    ctrl.showIntervals = Array.apply(null, Array(ctrl.intervalsLength)).map(function() {
                        return false
                    });
                    ctrl.showOnMap = false
                } else {
                    ctrl.showIntervals = Array.apply(null, Array(ctrl.intervalsLength)).map(function() {
                        return true
                    });
                    ctrl.showOnMap = true
                }
            };
            ctrl.toggleInterval = function(intervalIdx, event) {
                event.preventDefault();
                event.stopPropagation();
                var reverseIndex = ctrl.attributes.info.query.ranges.length - 1 - intervalIdx;
                ctrl.onToggleInterval({
                    obj: {
                        isoidx: ctrl.isochroneIdx,
                        isoIidx: intervalIdx,
                        revIsoIidx: reverseIndex,
                        toggle: ctrl.showIntervals[intervalIdx]
                    }
                });
                ctrl.showIntervals[intervalIdx] = ctrl.showIntervals[intervalIdx] !== true;
                if (ctrl.intervalsHidden.indexOf(intervalIdx) === -1) {
                    ctrl.intervalsHidden.push(intervalIdx)
                } else {
                    var index = ctrl.intervalsHidden.indexOf(intervalIdx);
                    ctrl.intervalsHidden.splice(index, 1)
                }
                if (ctrl.intervalsHidden.length === ctrl.intervalsLength) {
                    ctrl.showOnMap = false
                } else {
                    ctrl.showOnMap = true
                }
                ctrl.show()
            };
            ctrl.refreshSlider = function() {
                $timeout(function() {
                    $scope.$broadcast("rzSliderForceRender")
                })
            };
            ctrl.download = function() {
                ctrl.onDownload({
                    isoidx: ctrl.isochroneIdx
                })
            };
            ctrl.share = function() {
                ctrl.onShare({
                    shareUrl: ctrl.shareUrl
                })
            };
            ctrl.remove = function() {
                ctrl.onDelete({
                    isoidx: ctrl.isochroneIdx
                })
            };
            ctrl.emph = function(isonum) {
                if (ctrl.showOnMap && ctrl.intervalsHidden.indexOf(isonum) == -1) {
                    ctrl.onEmph({
                        isoidx: ctrl.isochroneIdx,
                        isonum: isonum
                    })
                }
            };
            ctrl.deEmph = function() {
                if (ctrl.showOnMap) {
                    ctrl.onDeEmph()
                }
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_header_47_ors_45_header_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-header/ors-header.js";
    angular.module("orsApp.ors-header", []).component("orsHeader", {
        templateUrl: "components/ors-header/ors-header.html",
        controller: ["$rootScope", "$timeout", "$translate", "orsUtilsService", "orsSettingsFactory", "orsCookiesFactory", "lists", "ENV", function($rootScope, $timeout, $translate, orsUtilsService, orsSettingsFactory, orsCookiesFactory, lists, ENV) {
            var ctrl = this;
            ctrl.$onInit = function() {
                ctrl.currentOptions.env = orsCookiesFactory.getCookies().env;
                ctrl.setENV();
                ctrl.envBase = ctrl.currentOptions.env.directions.split("/").slice(0, 3).join("/");
                ctrl.backup = JSON.parse(JSON.stringify(ctrl.currentOptions.env));
                ctrl.extra_infos = {
                    steepness: true,
                    waytype: true,
                    surface: true
                };
                ctrl.lists_extra_info = lists.extra_info;
                ctrl.getActiveProfile = orsSettingsFactory.getActiveProfile;
                ctrl.optionList = lists.userOptions;
                ctrl.changeExtras()
            };
            ctrl.changeExtras = function() {
                orsUtilsService.setExtraInformation(ctrl.extra_infos)
            };
            ctrl.presetEndpoints = function(fill) {
                if (fill === "local") {
                    angular.forEach(Object.keys(ctrl.currentOptions.env), function(key) {
                        ctrl.envBase = "http://localhost:8082/openrouteservice-4.5.0";
                        ctrl.currentOptions.env[key] = key === "directions" ? ctrl.envBase + "/routes" : ctrl.envBase + "/" + key
                    })
                } else if (fill === "api") {
                    angular.forEach(Object.keys(ctrl.currentOptions.env), function(key) {
                        ctrl.envBase = "https://api.openrouteservice.org";
                        ctrl.currentOptions.env[key] = ctrl.envBase + "/" + key
                    })
                } else if (fill === "default") {
                    angular.forEach(Object.keys(ctrl.currentOptions.env), function(key) {
                        ctrl.currentOptions.env[key] = ENV.default[key]
                    });
                    ctrl.envBase = ctrl.currentOptions.env.directions.split("/").slice(0, 3).join("/")
                }
            };
            ctrl.setDefaultValues = function(value) {
                angular.forEach(Object.keys(ctrl.currentOptions.env), function(key) {
                    var pre = ctrl.currentOptions.env[key].split("/");
                    ctrl.currentOptions.env[key] = [value, pre[pre.length - 1]].join("/")
                })
            };
            ctrl.setENV = function() {
                ENV.directions = ctrl.currentOptions.env.directions;
                ENV.isochrones = ctrl.currentOptions.env.isochrones;
                ENV.geocode = ctrl.currentOptions.env.geocode;
                ENV.matrix = ctrl.currentOptions.env.matrix;
                ENV.pois = ctrl.currentOptions.env.pois;
                ENV.fuel = ctrl.currentOptions.env.fuel
            };
            ctrl.showPopup = function() {
                void 0
            };
            ctrl.saveEndpoints = function() {
                if (ctrl.saveCookies) orsCookiesFactory.setCookieUserOptions(ctrl.currentOptions)
            };
            ctrl.resetEndpoints = function() {
                ctrl.currentOptions.env = JSON.parse(JSON.stringify(ctrl.backup));
                ctrl.envBase = ctrl.currentOptions.env.directions.split("/").slice(0, 3).join("/");
                if (ctrl.saveCookies) orsCookiesFactory.setCookieUserOptions(ctrl.currentOptions)
            };
            ctrl.saveKey = function() {
                ENV.key = ctrl.apikey
            };
            orsSettingsFactory.userOptionsSubject.subscribe(function(settings) {
                ctrl.currentOptions = settings;
                $translate.use(ctrl.currentOptions.language)
            });
            ctrl.changeOptions = function(setting) {
                if (setting === "language") $translate.use(ctrl.currentOptions.language);
                orsSettingsFactory.setUserOptions(ctrl.currentOptions);
                if (!ctrl.saveCookies) {
                    var withoutEnv = JSON.parse(JSON.stringify(ctrl.currentOptions));
                    delete withoutEnv.env;
                    orsCookiesFactory.setCookieUserOptions(withoutEnv)
                } else {
                    orsCookiesFactory.setCookieUserOptions(ctrl.currentOptions)
                }
                orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), orsSettingsFactory.getUserOptions());
                var payload = {
                    options: ctrl.currentOptions,
                    setting: setting
                };
                $rootScope.$broadcast("changeOptions", payload);
                $timeout(function() {
                    $rootScope.$broadcast("rzSliderForceRender")
                })
            }
        }],
        bindings: {}
    });
    return {}
}();
var $__build_47_components_47_ors_45_error_47_ors_45_error_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-error/ors-error.js";
    angular.module("orsApp.ors-error", []).component("orsError", {
        templateUrl: "components/ors-error/ors-error.html",
        controller: ["$translate", "$timeout", "orsMessagingService", function($translate, $timeout, orsMessagingService) {
            var ctrl = this;
            ctrl.show = false;
            ctrl.$onInit = function() {};
            orsMessagingService.subscribeToMessage(function onNext(message) {
                if (message.color >= -1) {
                    ctrl.show = true;
                    ctrl.message = {};
                    if (message.translate) ctrl.message.translate = message.translate;
                    if (message.text) ctrl.message.text = message.text;
                    switch (message.color) {
                        case -1:
                            ctrl.message.color = "red";
                            break;
                        case 0:
                            ctrl.message.color = "orange";
                            break;
                        case 1:
                            ctrl.message.color = "blue";
                            break;
                        case 2:
                            ctrl.message.color = "green";
                            break;
                        default:
                            break
                    }
                    $timeout(function() {
                        ctrl.show = false
                    }, 5e3)
                }
            })
        }],
        bindings: {}
    });
    return {}
}();
var $__build_47_components_47_ors_45_loading_47_ors_45_loading_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-loading/ors-loading.js";
    angular.module("orsApp.ors-loading", []).component("orsLoading", {
        templateUrl: "components/ors-loading/ors-loading.html",
        controller: ["orsSettingsFactory", "orsRequestService", function(orsSettingsFactory, orsRequestService) {
            var ctrl = this;
            ctrl.requesting = false;
            orsSettingsFactory.subscribeToRouteRequest(function onNext(bool) {
                ctrl.requesting = bool === true ? true : false
            });
            orsRequestService.subscribeToGeocodingRequest(function onNext(bool) {
                ctrl.requesting = bool === true ? true : false
            })
        }],
        bindings: {}
    });
    return {}
}();
var $__build_47_components_47_ors_45_modal_47_ors_45_modal_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-modal/ors-modal.js";
    angular.module("orsApp.ors-modal", []).component("orsModal", {
        template: '\n\t\t\t<div class="ors-modal-container" ng-show="$ctrl.show">\n\t\t\t\t<form class="ors-dialog">\n\t\t\t\t<ng-transclude></ng-transclude>\n\t\t\t\t<button class="ors-button close" data-ng-click="$ctrl.show = !$ctrl.show">\n\t\t\t\t    <i class="fa fa-lg fa-remove">\n\t\t\t\t    </i>\n\t\t\t\t</button>\n\t\t\t\t</form>\n\t\t\t</div>\n    ',
        transclude: true,
        bindings: {
            show: "="
        },
        controller: function() {
            var ctrl = this
        }
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_export_45_route_47_ors_45_export_45_route_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-export-route/ors-export-route.js";
    angular.module("orsApp.ors-exportRoute-controls", []).component("orsExportRouteControls", {
        templateUrl: "components/ors-panel-routing/ors-export-route/ors-export-route.html",
        controller: ["orsExportFactory", "orsRouteService", function(orsExportFactory, orsRouteService) {
            var ctrl = this;
            ctrl.elevation = true;
            ctrl.instructions = false;
            ctrl.toGpx = true;
            ctrl.filename = "ors-export-linestring";
            ctrl.gpxOptShow = true;
            ctrl.tcxOptShow = false;
            ctrl.kmlOptShow = false;
            ctrl.gmlOptShow = false;
            ctrl.geojsonOptShow = false;
            ctrl.fileFormat = [{
                text: "GPS eXchange Format (.gpx)",
                value: "gpx"
            }, {
                text: "Keyhole Markup Language (.kml)",
                value: "kml"
            }, {
                text: "GeoJSON (.geojson)",
                value: "geojson"
            }, {
                text: "RawJSON (.json)",
                value: "rawjson"
            }];
            ctrl.selected_fileformat = ctrl.fileFormat[0];
            ctrl.currentFileFormat = ctrl.selected_fileformat.value;
            ctrl.change_fileFormat = function(fileformat) {
                switch (fileformat.value) {
                    case "gpx":
                        ctrl.gpxOptShow = true;
                        ctrl.tcxOptShow = false;
                        ctrl.kmlOptShow = false;
                        ctrl.gmlOptShow = false;
                        ctrl.geojsonOptShow = false;
                        break;
                    case "tcx":
                        ctrl.gpxOptShow = false;
                        ctrl.tcxOptShow = true;
                        ctrl.kmlOptShow = false;
                        ctrl.gmlOptShow = false;
                        ctrl.geojsonOptShow = false;
                        break;
                    case "kml":
                        ctrl.gpxOptShow = false;
                        ctrl.tcxOptShow = false;
                        ctrl.kmlOptShow = true;
                        ctrl.gmlOptShow = false;
                        ctrl.geojsonOptShow = false;
                        break;
                    case "gml":
                        ctrl.gpxOptShow = false;
                        ctrl.tcxOptShow = false;
                        ctrl.kmlOptShow = false;
                        ctrl.gmlOptShow = true;
                        ctrl.geojsonOptShow = false;
                        break;
                    case "geojson":
                    case "rawjson":
                        ctrl.gpxOptShow = false;
                        ctrl.tcxOptShow = false;
                        ctrl.kmlOptShow = false;
                        ctrl.gmlOptShow = false;
                        ctrl.geojsonOptShow = true;
                        break;
                    case "csv":
                        ctrl.gpxOptShow = false;
                        ctrl.tcxOptShow = false;
                        ctrl.kmlOptShow = false;
                        ctrl.gmlOptShow = false;
                        ctrl.geojsonOptShow = false;
                        break;
                    default:
                }
                ctrl.currentFileFormat = fileformat.value
            };
            ctrl.exportRoute = function() {
                var options = {
                    elevation: ctrl.elevation,
                    instructions: ctrl.instructions,
                    toGpx: ctrl.toGpx
                };
                var currentRoute = null;
                if (ctrl.currentFileFormat === "rawjson") {
                    currentRoute = orsRouteService.data.routes[orsRouteService.getCurrentRouteIdx()]
                } else {
                    currentRoute = orsRouteService.data.routes[orsRouteService.getCurrentRouteIdx()].geometry
                }
                orsExportFactory.exportFile(currentRoute, "linestring", options, ctrl.currentFileFormat, ctrl.filename)
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_panel_45_routing_47_ors_45_import_45_route_47_ors_45_import_45_route_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-panel-routing/ors-import-route/ors-import-route.js";
    angular.module("orsApp.ors-importRoute-controls", []).component("orsImportRouteControls", {
        templateUrl: "components/ors-panel-routing/ors-import-route/import_route_tpl.html",
        controller: ["$scope", "orsImportFactory", "orsObjectsFactory", "orsUtilsService", "orsMapFactory", "orsSettingsFactory", "lists", function($scope, orsImportFactory, orsObjectsFactory, orsUtilsService, orsMapFactory, orsSettingsFactory, lists) {
            var ctrl = this;
            ctrl.showCSVopt = false;
            ctrl.showXY = false;
            ctrl.showXYZ = false;
            ctrl.showWKT = false;
            ctrl.isCsv = false;
            ctrl.loadedPreviewLayers = [];
            ctrl.fileNameChanged = function(fileName) {
                var uploadedFiles = [];
                var fileArrayLength = fileName.files.length;
                var processedCount = 0;
                for (var i = 0; i < fileArrayLength; i++) {
                    setupReader(fileName.files[i])
                }

                function setupReader(file) {
                    var reader = new FileReader;
                    reader.onload = function(e) {
                        onLoadHandler(reader.result, file.name, processedCount, uploadedFiles);
                        onLoadEndHandler()
                    };
                    reader.readAsText(file, "UTF-8")
                }
                var onLoadHandler = function(result, name, processedCount, uploadedFiles) {
                    uploadedFiles[processedCount] = {
                        name: name,
                        extension: name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2),
                        index: processedCount,
                        content: result,
                        preview: false
                    }
                };
                var onLoadEndHandler = function() {
                    processedCount++;
                    if (processedCount == fileArrayLength) {
                        ctrl.uploadedFiles = uploadedFiles;
                        $scope.$apply()
                    }
                }
            };
            ctrl.previewRoute = function(file) {
                if (file.preview) {
                    var geometry = orsImportFactory.importFile(file.extension, file.content);
                    var trackPadding = orsObjectsFactory.createMapAction(1, lists.layers[4], geometry, file.index, lists.layerStyles.trackPadding());
                    orsMapFactory.mapServiceSubject.onNext(trackPadding);
                    var track = orsObjectsFactory.createMapAction(1, lists.layers[4], geometry, file.index, lists.layerStyles.track());
                    orsMapFactory.mapServiceSubject.onNext(track);
                    var action_zoomToLayer = orsObjectsFactory.createMapAction(0, lists.layers[4], undefined, file.index);
                    orsMapFactory.mapServiceSubject.onNext(action_zoomToLayer)
                } else {
                    var action_removeLayer = orsObjectsFactory.createMapAction(2, lists.layers[4], undefined, file.index);
                    orsMapFactory.mapServiceSubject.onNext(action_removeLayer)
                }
            };
            ctrl.importRoute = function(file) {
                var geometry = orsImportFactory.importFile(file.extension, file.content);
                var linestring = turf.helpers.lineString(geometry);
                var tolerance = turf.lineDistance(linestring, "kilometers") > 100 ? .015 : .007;
                linestring = turf.simplify(linestring, tolerance, true);
                var waypoints = [];
                var $__5 = true;
                var $__6 = false;
                var $__7 = undefined;
                try {
                    for (var $__3 = void 0, $__2 = linestring.geometry.coordinates[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
                        var coord = $__3.value; {
                            var latLng = new L.latLng([parseFloat(coord[0]), parseFloat(coord[1])]);
                            var latLngString = orsUtilsService.parseLatLngString(latLng);
                            var wpObj = orsObjectsFactory.createWaypoint(latLngString, latLng, 1);
                            waypoints.push(wpObj)
                        }
                    }
                } catch ($__8) {
                    $__6 = true;
                    $__7 = $__8
                } finally {
                    try {
                        if (!$__5 && $__2.return != null) {
                            $__2.return()
                        }
                    } finally {
                        if ($__6) {
                            throw $__7
                        }
                    }
                }
                orsSettingsFactory.setWaypoints(waypoints);
                angular.forEach(waypoints, function(wp, idx) {
                    orsSettingsFactory.getAddress(wp._latlng, idx, true)
                })
            }
        }]
    });
    return {}
}();
var $__build_47_components_47_ors_45_map_47_ors_45_map_46_js__ = function() {
    "use strict";
    var __moduleName = "build/components/ors-map/ors-map.js";
    angular.module("orsApp").directive("orsMap", function() {
        return {
            restrict: "E",
            transclude: true,
            scope: {
                orsMap: "="
            },
            link: function(scope, element, attrs) {},
            controller: ["$rootScope", "$scope", "$filter", "$compile", "$timeout", "$window", "orsSettingsFactory", "orsLocationsService", "orsObjectsFactory", "orsRequestService", "orsMessagingService", "orsUtilsService", "orsMapFactory", "orsCookiesFactory", "lists", "globals", "mappings", "orsNamespaces", "orsRouteService", "orsApikeyFactory", "ENV", "weathercheck", function($rootScope, $scope, $filter, $compile, $timeout, $window, orsSettingsFactory, orsLocationsService, orsObjectsFactory, orsRequestService, orsMessagingService, orsUtilsService, orsMapFactory, orsCookiesFactory, lists, globals, mappings, orsNamespaces, orsRouteService, orsApikeyFactory, ENV, weathercheck) {
                var apiKey = ENV.key !== undefined ? ENV.key : orsApikeyFactory.getApiKey() === undefined ? weathercheck : orsApikeyFactory.getApiKey();
                var ak = "?api_key=" + apiKey;
                $scope.translateFilter = $filter("translate");
                var mapsurfer = L.tileLayer(ENV.mapsurfer + ak, {
                    attribution: orsNamespaces.layerMapSurfer.attribution,
                    id: 0,
                    minZoom: orsNamespaces.layerMapSurfer.minZoom,
                    maxZoom: orsNamespaces.layerMapSurfer.maxZoom
                });
                var bkgtopplus = L.tileLayer.wms(orsNamespaces.layerBkgTopPlus.url, {
                    layers: "web",
                    format: "image/png",
                    attribution: '© <a href="http://www.bkg.bund.de">Bundesamt für Kartographie und Geodäsie</a> 2017, <a href="https://sgx.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf">Datenquellen</a>',
                    id: 1
                });
                var bkgtopplusgrey = L.tileLayer.wms(orsNamespaces.layerBkgTopPlus.url, {
                    layers: "web_grau",
                    format: "image/png",
                    attribution: '© <a href="http://www.bkg.bund.de">Bundesamt für Kartographie und Geodäsie</a> 2017, <a href="https://sgx.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf">Datenquellen</a>',
                    id: 2
                });
                var openstreetmap = L.tileLayer(orsNamespaces.layerOSM.url, {
                    attribution: orsNamespaces.layerOSM.attribution,
                    id: 3
                });
                var opencyclemap = L.tileLayer(orsNamespaces.layerOSMCycle.url, {
                    attribution: orsNamespaces.layerOSMCycle.attribution,
                    id: 4
                });
                var transportdark = L.tileLayer(orsNamespaces.layerOSMDark.url, {
                    attribution: orsNamespaces.layerOSMDark.attribution,
                    id: 5
                });
                var outdoors = L.tileLayer(orsNamespaces.layerOutdoors.url, {
                    attribution: orsNamespaces.layerOutdoors.attribution,
                    id: 6
                });
                $scope.geofeatures = {
                    layerLocationMarker: L.featureGroup(),
                    layerRoutePoints: L.featureGroup(),
                    layerRouteLines: L.featureGroup(),
                    layerAvoid: L.featureGroup(),
                    layerAccessibilityAnalysis: L.featureGroup(),
                    layerAccessibilityAnalysisNumberedMarkers: L.featureGroup(),
                    layerEmph: L.featureGroup(),
                    layerTracks: L.featureGroup(),
                    layerRouteNumberedMarkers: L.featureGroup(),
                    layerRouteExtras: L.featureGroup(),
                    layerRouteDrag: L.featureGroup(),
                    layerLandmarks: L.featureGroup(),
                    layerLandmarksEmph: L.featureGroup(),
                    layerHereMarkers: L.featureGroup(),
                    layerLocations: new L.MarkerClusterGroup({
                        showCoverageOnHover: false,
                        disableClusteringAtZoom: 14,
                        spiderLegPolylineOptions: {
                            weight: 1.5,
                            color: "#222",
                            opacity: .5,
                            distanceMarkers: {
                                lazy: true
                            }
                        }
                    }),
                    layerTmcMarker: L.featureGroup(),
                    layerCustomMarkers: L.featureGroup()
                };
                $scope.mapModel = {
                    map: $scope.orsMap,
                    geofeatures: $scope.geofeatures
                };
                $scope.locateControl = L.control.locate({
                    locateOptions: {
                        enableHighAccuracy: true,
                        showPopup: false,
                        strings: {
                            title: ""
                        }
                    }
                }).addTo($scope.mapModel.map);
                $scope.hg = L.control.heightgraph({
                    width: 800,
                    height: 280,
                    margins: {
                        top: 10,
                        right: 30,
                        bottom: 55,
                        left: 50
                    },
                    position: "bottomright",
                    mappings: mappings
                });
                $scope.$on("changeOptions", function(func, payload) {
                    var options = payload.options;
                    var setting = payload.setting;
                    if (setting === "heightgraph") {
                        if (options.showHeightgraph) {
                            $scope.showHeightgraph = true;
                            if (Object.keys($scope.mapModel.geofeatures.layerRouteLines["_layers"]).length !== undefined && orsSettingsFactory.ngRouteSubject.getValue() === "directions") {
                                $scope.hg.options.expand = globals.showHeightgraph;
                                $scope.mapModel.map.addControl($scope.hg);
                                var toggle = angular.element(document.querySelector(".heightgraph-toggle-icon"));
                                var close = angular.element(document.querySelector(".heightgraph-close-icon"));
                                toggle.bind("click", function() {
                                    globals.showHeightgraph = true
                                });
                                close.bind("click", function() {
                                    globals.showHeightgraph = false
                                });
                                var idx = orsRouteService.getCurrentRouteIdx() === undefined ? 0 : orsRouteService.getCurrentRouteIdx();
                                if (angular.isDefined(orsRouteService.data) && angular.isDefined(orsRouteService.data.routes)) {
                                    if (orsRouteService.data.routes.length > 0) {
                                        var data = orsRouteService.data;
                                        var route = data.routes[idx];
                                        if (route.elevation) {
                                            var hgGeojson = orsRouteService.processHeightgraphData(route);
                                            orsRouteService.addHeightgraph(hgGeojson)
                                        }
                                    }
                                } else {
                                    $scope.hg.remove()
                                }
                            }
                        } else {
                            $scope.showHeightgraph = false;
                            $scope.hg.remove()
                        }
                    }
                    if (setting === "distanceMarkers") {
                        var lines = $scope.mapModel.geofeatures.layerRouteLines["_layers"];
                        var route$__5 = lines[Object.keys(lines)[0]];
                        if (options.distanceMarkers === true) {
                            route$__5.addDistanceMarkers()
                        } else {
                            route$__5.removeDistanceMarkers()
                        }
                    }
                });
                L.FullwidthControl = L.Control.extend({
                    options: {
                        position: "topleft"
                    },
                    onAdd: function(map) {
                        var container = L.DomUtil.create("div", "leaflet-bar leaflet-control", container),
                            link = L.DomUtil.create("a", "leaflet-fullwidth", container);
                        link.href = "#";
                        link.title = "Hide/show menu";
                        L.DomEvent.on(link, "click", L.DomEvent.stop).on(link, "click", function() {
                            var orsLeft = document.getElementsByClassName("ors-left");
                            orsLeft = angular.element(orsLeft);
                            if (orsLeft.css("display") == "none") {
                                orsLeft.show()
                            } else {
                                orsLeft.hide()
                            }
                            map.invalidateSize()
                        });
                        return container
                    }
                });
                $scope.zoomControl = new L.Control.Zoom({
                    position: "topright"
                }).addTo($scope.mapModel.map);
                L.control.scale().addTo($scope.mapModel.map);
                L.NewPolygonControl = L.Control.extend({
                    options: {
                        position: "topright"
                    },
                    onAdd: function(map) {
                        var container = L.DomUtil.create("div", "leaflet-bar leaflet-control", container),
                            link = L.DomUtil.create("a", "leaflet-avoid-area", container);
                        link.href = "#";
                        link.title = "Create a new area avoid polygon";
                        L.DomEvent.on(link, "click", L.DomEvent.stop).on(link, "click", function() {
                            $scope.mapModel.map.avoidPolygons = true;
                            map.editTools.startPolygon()
                        });
                        return container
                    }
                });
                var measureControlOptions = {
                    position: "bottomleft",
                    primaryLengthUnit: "meters",
                    secondaryLengthUnit: "kilometers",
                    primaryAreaUnit: "hectares",
                    secondaryAreaUnit: "sqmeters",
                    activeColor: "#cf5f5f",
                    completedColor: "#e29f9f",
                    background: "#FFF",
                    localization: "en",
                    popupOptions: {
                        className: "leaflet-measure-resultpopup",
                        autoPanPadding: [10, 10]
                    }
                };
                $scope.measureControl = new L.control.measure(measureControlOptions).addTo($scope.mapModel.map);
                orsSettingsFactory.userOptionsSubject.subscribe(function(settings) {
                    if (settings.language) {
                        $scope.mapModel.map.removeControl($scope.measureControl);
                        measureControlOptions.localization = lists.measure_locale[settings.language];
                        $scope.measureControl = L.control.measure(measureControlOptions).addTo($scope.mapModel.map);
                        var el$__6 = angular.element(document.querySelector(".js-toggle")).empty()
                    }
                });
                $scope.mapStyleId = orsCookiesFactory.getMapOptions() && orsCookiesFactory.getMapOptions().msi ? orsCookiesFactory.getMapOptions().msi : 0;
                var mapInitSubject = orsSettingsFactory.mapOptionsInitSubject.subscribe(function(settings) {
                    $scope.showHeightgraph = angular.isDefined(settings.showHeightgraph) ? settings.showHeightgraph : !$scope.smallScreen;
                    if (settings.lat && settings.lng && settings.zoom) {
                        $scope.orsMap.setView({
                            lat: settings.lat,
                            lng: settings.lng
                        }, settings.zoom)
                    } else {
                        $scope.orsMap.setView([49.409445, 8.692953], 13);
                        if (orsCookiesFactory.getMapOptions()) {
                            $scope.welcomeMsgBox = L.control({
                                position: "topright"
                            });
                            $scope.welcomeMsgBox.onAdd = function(map) {
                                var div = $compile("<ors-welcome-box></ors-welcome-box>")($scope)[0];
                                return div
                            };
                            $timeout(function() {
                                if (!$scope.smallScreen) $scope.mapModel.map.addControl($scope.welcomeMsgBox)
                            }, 500)
                        }
                    }
                    mapInitSubject.dispose()
                });
                $scope.signupBox = L.control({
                    position: "topleft"
                });
                $scope.signupBox.onAdd = function(map) {
                    var div = $compile("<ors-signup-box></ors-signup-box>")($scope)[0];
                    return div
                };
                $timeout(function() {
                    if (!$scope.smallScreen) $scope.mapModel.map.addControl($scope.signupBox)
                }, 3e5);
                $scope.brand = L.control({
                    position: "topleft"
                });
                $scope.brand.onAdd = function(map) {
                    var divs = L.DomUtil.create("div", "ors-brand-small");
                    divs.innerHTML = '<img src="https://udukonline.000webhostapp.com/assets/maps/img/brand.png">';
                    return divs
                };
                $timeout(function() {
                    $scope.mapModel.map.addControl($scope.brand)
                }, 500);
                var el = angular.element(document.querySelector(".js-toggle")).empty();
                $scope.mapModel.map.addControl(new L.NewPolygonControl);
                $scope.mapModel.map.addControl(new L.FullwidthControl);
                var deleteShape = function(e) {
                    if ((e.originalEvent.altKey || e.originalEvent.metaKey) && this.editEnabled()) {
                        this.editor.deleteShapeAt(e.latlng);
                        $scope.mapModel.geofeatures.layerAvoid.removeLayer(e.target._leaflet_id);
                        if ($scope.geofeatures.layerAvoid.getLayers().length === 0) $scope.layerControls.removeLayer($scope.geofeatures.layerAvoid);
                        setSettings()
                    }
                };
                var deleteVertex = function(e) {
                    e.vertex.delete()
                };
                var setSettings = function() {
                    var polygons = $scope.geofeatures.layerAvoid.toGeoJSON();
                    var avoidPolygons = {
                        type: polygons.features.length > 1 ? "MultiPolygon" : "Polygon"
                    };
                    if (polygons.features.length == 1) {
                        avoidPolygons.coordinates = [orsUtilsService.trimCoordinates(polygons.features[0].geometry.coordinates[0], 5)]
                    } else {
                        avoidPolygons.coordinates = [];
                        for (var i = 0; i < polygons.features.length; i++) {
                            avoidPolygons.coordinates.push([orsUtilsService.trimCoordinates(polygons.features[i].geometry.coordinates[0], 5)])
                        }
                    }
                    orsSettingsFactory.setAvoidableAreas(avoidPolygons)
                };
                var shapeDrawn = function(e) {
                    setSettings()
                };
                $scope.baseLayers = {
                    OpenMapSurfer: mapsurfer,
                    "TopPlus-Web-Open": bkgtopplus,
                    "TopPlus-Web-Open Greyscale": bkgtopplusgrey,
                    OpenStreetMap: openstreetmap,
                    OpenCycleMap: opencyclemap,
                    "Transport Dark": transportdark,
                    Outdoors: outdoors
                };
                $scope.overlays = {};
                $scope.mapModel.map.on("load", function(evt) {
                    angular.forEach($scope.baseLayers, function(value, key) {
                        if (value.options.id == $scope.mapStyleId) {
                            void 0;
                            $scope.baseLayers[key].addTo($scope.orsMap)
                        }
                    });
                    $scope.mapModel.geofeatures.layerRoutePoints.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerCustomMarkers.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerRouteLines.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerRouteNumberedMarkers.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerAvoid.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerAccessibilityAnalysis.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerAccessibilityAnalysisNumberedMarkers.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerEmph.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerTracks.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerRouteExtras.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerLocations.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerRouteDrag.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerLandmarks.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerLandmarksEmph.addTo($scope.mapModel.map);
                    $scope.mapModel.geofeatures.layerHereMarkers.addTo($scope.mapModel.map);
                    $scope.layerControls = L.control.layers($scope.baseLayers, $scope.overlays).addTo($scope.mapModel.map);
                    $scope.mapModel.map.editTools.featuresLayer = $scope.geofeatures.layerAvoid;
                    $scope.mapModel.geofeatures.layerAvoid.on("layeradd", function(e) {
                        if (e.layer instanceof L.Path) e.layer.on("click", L.DomEvent.stop).on("click", deleteShape, e.layer);
                        if (e.layer instanceof L.Path) e.layer.on("dblclick", L.DomEvent.stop).on("dblclick", e.layer.toggleEdit)
                    });
                    $scope.mapModel.map.on("editable:drawing:commit", shapeDrawn);
                    $scope.mapModel.map.on("editable:vertex:deleted", setSettings);
                    $scope.mapModel.map.on("editable:vertex:dragend", setSettings);
                    $scope.mapModel.map.on("editable:vertex:altclick", deleteVertex);
                    $scope.mapModel.map.on("baselayerchange", function(e) {
                        angular.forEach($scope.baseLayers, function(value, key) {
                            if (e.name == key) {
                                $scope.mapStyleId = value.options.id
                            }
                        });
                        $scope.setMapOptions()
                    });
                    var w = angular.element($window);
                    $scope.getWindowDimensions = function() {
                        return {
                            h: w.height(),
                            w: w.width()
                        }
                    };
                    $scope.smallScreen = $scope.getWindowDimensions().w < 720
                });
                $scope.popup = L.popup({
                    minWidth: 150,
                    closeButton: false,
                    className: "cm-popup"
                });
                $scope.pointPopup = L.popup({
                    minWidth: 175,
                    maxHeight: 300,
                    closeButton: true,
                    className: "cm-popup"
                });
                $scope.mapModel.map.on("contextmenu", function(e) {
                    $scope.displayPos = e.latlng;
                    var popupDirective = $scope.routing === true ? "<ors-popup></ors-popup>" : "<ors-aa-popup></ors-aa-popup>";
                    var popupContent = $compile(popupDirective)($scope);
                    $scope.popup.setContent(popupContent[0]).setLatLng($scope.displayPos).openOn($scope.mapModel.map);
                    $timeout(function() {
                        $scope.popup.update()
                    }, 300)
                });
                $scope.mapModel.map.on("zoomend", function(e) {
                    var layerRouteLines = $scope.mapModel.geofeatures.layerRouteLines;
                    var currentZoom = $scope.mapModel.map.getZoom();
                    if (currentZoom >= 15) {
                        d3.select($scope.mapModel.map.getPanes().overlayPane).style("opacity", .5)
                    } else {
                        d3.select($scope.mapModel.map.getPanes().overlayPane).style("opacity", 1)
                    }
                    $scope.setMapOptions()
                });
                $scope.mapModel.map.on("moveend", function(e) {
                    $scope.setMapOptions()
                });
                $scope.setMapOptions = function() {
                    var mapCenter = $scope.mapModel.map.getCenter();
                    var mapZoom = $scope.mapModel.map.getZoom();
                    var mapOptions = {
                        lat: mapCenter.lat,
                        lng: mapCenter.lng,
                        zoom: mapZoom,
                        msi: $scope.mapStyleId
                    };
                    orsCookiesFactory.setMapOptions(mapOptions);
                    var userOptions = orsSettingsFactory.getUserOptions();
                    userOptions.lat = mapCenter.lat;
                    userOptions.lng = mapCenter.lng;
                    userOptions.zoom = mapZoom;
                    orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), userOptions)
                };
                $scope.mapModel.map.on("click", function(e) {
                    if (!$scope.mapModel.map.avoidPolygons) $scope.showHereMessage(e.latlng)
                });
                $scope.mapModel.map.on("editable:vertex:clicked", function(e) {
                    $scope.mapModel.map.avoidPolygons = false
                });
                $scope.processMapWaypoint = function(idx, pos) {
                    var updateWp = arguments[2] !== void 0 ? arguments[2] : false;
                    var fireRequest = arguments[3] !== void 0 ? arguments[3] : true;
                    var fromHover = arguments[4] !== void 0 ? arguments[4] : false;
                    if (updateWp) {
                        orsSettingsFactory.updateWaypoint(idx, "", pos, fireRequest)
                    } else {
                        var waypoint = orsObjectsFactory.createWaypoint("", pos, 1);
                        orsSettingsFactory.insertWaypointFromMap(idx, waypoint, fireRequest, fromHover)
                    }
                    orsSettingsFactory.getAddress(pos, idx, updateWp, fromHover);
                    orsUtilsService.parseSettingsToPermalink(orsSettingsFactory.getSettings(), orsSettingsFactory.getUserOptions());
                    $scope.mapModel.map.closePopup()
                };
                $scope.addNumberedMarker = function(geom, featureId, layerCode) {
                    var isIsochrones = arguments[3] !== void 0 ? arguments[3] : false;
                    var lat = geom[1] || geom.lat;
                    var lng = geom[0] || geom.lng;
                    var textLabelclass;
                    if (isIsochrones) {
                        textLabelclass = "textLabelclass-isochrones"
                    }
                    var marker = L.marker(L.latLng(lat, lng), {
                        icon: createLabelIcon(textLabelclass, parseInt(featureId) + 1),
                        index: featureId
                    });
                    marker.bindPopup("<b>Position</b><br>" + lat + ", " + lng).openPopup();
                    marker.addTo($scope.mapModel.geofeatures[layerCode])
                };
                $scope.addWaypoint = function(idx, iconIdx, pos) {
                    var fireRequest = arguments[3] !== void 0 ? arguments[3] : true;
                    var aaIcon = arguments[4] !== void 0 ? arguments[4] : false;
                    var waypointIcon = aaIcon === true ? L.divIcon(lists.waypointIcons[3]) : L.divIcon(lists.waypointIcons[iconIdx]);
                    var waypointsLength = orsSettingsFactory.getWaypoints().length;
                    if (aaIcon) {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="location-number-circle"><div class="via-number-text"></div></div></i>'
                    } else if (idx > 0 && idx < waypointsLength - 1) {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="via-number-circle"><div class="via-number-text">' + idx + "</div></div></i>"
                    } else if (idx === 0) {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="start-number-circle"><div class="via-number-text"> ' + "A" + " </div></div></i>"
                    } else {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="end-number-circle"><div class="via-number-text"> ' + "B" + " </div></div></i>"
                    }
                    var wayPointMarker = new L.marker(pos, {
                        icon: waypointIcon,
                        draggable: "true",
                        idx: idx,
                        autoPan: true,
                        autoPanPadding: [50, 50],
                        autoPanSpeed: 10
                    });
                    wayPointMarker.addTo($scope.mapModel.geofeatures.layerRoutePoints);
                    wayPointMarker.on("dragend", function(event) {
                        var idx = event.target.options.idx;
                        var pos = event.target._latlng;
                        $scope.processMapWaypoint(idx, pos, true, fireRequest)
                    })
                };
                $scope.addCustomMarker = function(pos) {
                    var customMarkerIcon = L.divIcon(lists.customMarkerIcon);
                    customMarkerIcon.options.html = '<i class="fa fa-map-marker"></i>';
                    var customMarker = new L.marker(pos, {
                        icon: customMarkerIcon
                    });
                    customMarker.addTo($scope.mapModel.geofeatures.layerCustomMarkers).bindTooltip("@ " + orsUtilsService.roundCoordinate(pos.lat) + ", " + orsUtilsService.roundCoordinate(pos.lng), {
                        permanent: true
                    });
                    $scope.mapModel.map.closePopup()
                };
                $scope.clearMap = function() {
                    var switchApp = arguments[0] !== void 0 ? arguments[0] : false;
                    $scope.mapModel.map.closePopup();
                    $scope.mapModel.geofeatures.layerLocationMarker.clearLayers();
                    $scope.mapModel.geofeatures.layerCustomMarkers.clearLayers();
                    $scope.mapModel.geofeatures.layerRouteLines.clearLayers();
                    $scope.mapModel.geofeatures.layerEmph.clearLayers();
                    $scope.mapModel.geofeatures.layerRouteExtras.clearLayers();
                    $scope.mapModel.geofeatures.layerHereMarkers.clearLayers();
                    $scope.mapModel.geofeatures.layerRouteDrag.clearLayers();
                    $scope.mapModel.geofeatures.layerLandmarks.clearLayers();
                    $scope.mapModel.geofeatures.layerLandmarksEmph.clearLayers();
                    if ($scope.hg) $scope.hg.remove();
                    if (switchApp) {
                        $scope.mapModel.geofeatures.layerRoutePoints.clearLayers();
                        $scope.mapModel.geofeatures.layerAvoid.clearLayers();
                        $scope.mapModel.geofeatures.layerAccessibilityAnalysis.clearLayers();
                        $scope.mapModel.geofeatures.layerAccessibilityAnalysisNumberedMarkers.clearLayers()
                    }
                };
                $scope.clearLayer = function(layer) {
                    $scope.mapModel.geofeatures[layer].clearLayers()
                };
                $scope.reAddWaypoints = function(waypoints) {
                    var fireRequest = arguments[1] !== void 0 ? arguments[1] : true;
                    var aaIcon = arguments[2] !== void 0 ? arguments[2] : false;
                    $scope.clearLayer("layerRoutePoints");
                    $scope.clearLayer("layerLandmarks");
                    var setCnt = 0;
                    angular.forEach(waypoints, function(waypoint, idx) {
                        var iconIdx = orsSettingsFactory.getIconIdx(idx);
                        if (waypoint._latlng.lat && waypoint._latlng.lng) {
                            $scope.addWaypoint(idx, iconIdx, waypoint._latlng, fireRequest, aaIcon)
                        }
                        if (waypoint._set == 1) setCnt += 1
                    });
                    if (setCnt == 1) $scope.clearLayer("layerRouteLines")
                };
                $scope.reshuffleIndicesText = function(actionPackage) {
                    var i = 0;
                    $scope.mapModel.geofeatures[actionPackage.layerCode].eachLayer(function(layer) {
                        var markerIcon;
                        markerIcon = actionPackage.layerCode == lists.layers[5] ? createLabelIcon("textLabelclass-isochrones", i + 1) : createLabelIcon("textLabelclass", i + 1);
                        layer.setIcon(markerIcon);
                        layer.options.index = i;
                        i++
                    })
                };
                $scope.zoom = function(actionPackage) {
                    if (typeof actionPackage != "undefined") {
                        if (typeof actionPackage.featureId != "undefined") {
                            $scope.mapModel.geofeatures[actionPackage.layerCode].eachLayer(function(layer) {
                                if (layer.options.index == actionPackage.featureId) {
                                    $scope.orsMap.fitBounds(layer.getBounds())
                                }
                            })
                        } else if (actionPackage.featureId === undefined) {
                            if (actionPackage.geometry !== undefined) {
                                if (actionPackage.geometry.lat && actionPackage.geometry.lng) {
                                    $timeout(function() {
                                        $scope.mapModel.map.panTo(actionPackage.geometry)
                                    }, 100)
                                } else {
                                    var bounds = new L.LatLngBounds(actionPackage.geometry);
                                    $scope.orsMap.fitBounds(bounds)
                                }
                            } else {
                                $scope.orsMap.fitBounds(new L.featureGroup(Object.keys($scope.mapModel.geofeatures).map(function(key) {
                                    return $scope.mapModel.geofeatures[key]
                                })).getBounds())
                            }
                        }
                    } else {
                        $scope.orsMap.fitBounds(new L.featureGroup(Object.keys($scope.mapModel.geofeatures).map(function(key) {
                            return $scope.mapModel.geofeatures[key]
                        })).getBounds())
                    }
                };
                $scope.highlightWaypoint = function(actionPackage) {
                    var waypointIcon = L.divIcon(lists.waypointIcons[4]);
                    var waypointsLength = orsSettingsFactory.getWaypoints().length;
                    if (actionPackage.featureId > 0 && actionPackage.featureId < waypointsLength - 1) {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="highlight-number-circle"><div class="via-number-text">' + actionPackage.featureId + "</div></div></i>"
                    } else if (actionPackage.featureId === 0) {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="highlight-number-circle"><div class="via-number-text">' + "A" + "</div></div></i>"
                    } else {
                        waypointIcon.options.html = '<i class="fa fa-map-marker"><div class="highlight-number-circle"><div class="via-number-text">' + "B" + "</div></div></i>"
                    }
                    var wayPointMarker = new L.marker(actionPackage.geometry, {
                        icon: waypointIcon
                    });
                    wayPointMarker.addTo($scope.mapModel.geofeatures[actionPackage.layerCode])
                };
                $scope.highlightPoi = function(actionPackage) {
                    var locationsIcon = L.divIcon(lists.locationsIconHighlight);
                    locationsIcon.options.html = lists.locations_icons[actionPackage.style];
                    var locationsMarker = L.marker(actionPackage.geometry, {
                        icon: locationsIcon
                    });
                    locationsMarker.addTo($scope.mapModel.geofeatures[actionPackage.layerCode])
                };
                $scope.addLocations = function(actionPackage) {
                    $scope.subcategoriesLookup = orsLocationsService.getSubcategoriesLookup();
                    $scope.mapModel.geofeatures[actionPackage.layerCode].clearLayers();
                    var highlightFeature = function(e) {};
                    var resetHighlight = function(e) {};
                    var onEachFeature = function(feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight
                        });
                        var popupContent = "";
                        var cIds = feature.properties["category_ids"];
                        if (feature.properties["osm_tags"].name) popupContent += "<strong>" + feature.properties["osm_tags"].name + "</strong><br>";
                        else {
                            var noUnderscoreName = cIds[Object.keys(cIds)[0]].category_name.split("_").join(" ");
                            popupContent += "<strong>" + noUnderscoreName + "</strong>";
                            feature.properties["noUnderscoreName"] = noUnderscoreName
                        }
                        feature.properties["categoryGroupId"] = orsLocationsService.getSubcategoriesLookup()[parseInt(Object.keys(cIds)[0])];
                        if (feature.properties["osm_tags"].address) {
                            popupContent += lists.locations_icons.address + " ";
                            if (feature.properties["osm_tags"].address.street) popupContent += feature.properties["osm_tags"].address.street + ", ";
                            if (feature.properties["osm_tags"].address.house_number) popupContent += feature.properties["osm_tags"].address.house_number + ", ";
                            if (feature.properties["osm_tags"].address.postal_code) popupContent += feature.properties["osm_tags"].address.postal_code + ", ";
                            if (feature.properties["osm_tags"].address.locality) popupContent += feature.properties["osm_tags"].address.locality + ", ";
                            if (feature.properties["osm_tags"].address.region) popupContent += feature.properties["osm_tags"].address.region + ", ";
                            if (feature.properties["osm_tags"].address.country) popupContent += feature.properties["osm_tags"].address.country + ", ";
                            popupContent = popupContent.slice(0, -2)
                        }
                        if (feature.properties["osm_tags"].phone) popupContent += "<br>" + lists.locations_icons.phone + " " + feature.properties["osm_tags"].phone;
                        if (feature.properties["osm_tags"].website) popupContent += "<br>" + lists.locations_icons.website + " " + '<a href="' + feature.properties["osm_tags"].website + '" target=_blank>' + feature.properties["osm_tags"].website + "</a>";
                        if (feature.properties["osm_tags"].wheelchair) popupContent += "<br>" + lists.locations_icons.wheelchair;
                        if (feature.properties.osm_type == 1) {
                            popupContent += '<br><br><a href="http://www.openstreetmap.org/node/' + feature.properties.osm_id + '" target=_blank>Edit on OpenStreetMap</a>'
                        } else if (feature.properties.osm_type == 2) {
                            popupContent += '<br><br><a href="http://www.openstreetmap.org/way/' + feature.properties.osm_id + '" target=_blank>Edit on OpenStreetMap</a>'
                        } else {
                            popupContent += '<br><br><a href="http://www.openstreetmap.org/relation/' + feature.properties.osm_id + '" target=_blank>Edit on OpenStreetMap</a>'
                        }
                        popupContent += "<br>Source: © OpenStreetMap-Contributors";
                        layer.bindPopup(popupContent, {
                            className: "location-popup"
                        })
                    };
                    var geojson = L.geoJson(actionPackage.geometry, {
                        pointToLayer: function(feature, latlng) {
                            var locationsIcon = L.divIcon(lists.locationsIcon);
                            locationsIcon.options.html = lists.locations_icons[$scope.subcategoriesLookup[parseInt(Object.keys(feature.properties.category_ids))]];
                            return L.marker(latlng, {
                                icon: locationsIcon
                            })
                        },
                        onEachFeature: onEachFeature
                    }).addTo($scope.mapModel.geofeatures[actionPackage.layerCode])
                };
                $scope.addLandmark = function(actionPackage) {
                    var onEachFeature = function(feature, layer) {
                        var popupContent = "";
                        var type = feature.properties.type.charAt(0).toUpperCase() + feature.properties.type.replace(/_/g, " ").slice(1);
                        if (feature.properties.name && feature.properties.name !== "Unknown") {
                            popupContent = "<strong>" + feature.properties.name + "</strong>";
                            popupContent += "<br/>" + type
                        } else {
                            popupContent = "<strong>" + type + "</strong>"
                        }
                        popupContent += "<br>Source: © OpenStreetMap-Contributors";
                        layer.bindPopup(popupContent, {
                            className: "location-popup"
                        })
                    };
                    var geojson = L.geoJson(actionPackage.geometry, {
                        pointToLayer: function(feature, latlng) {
                            var landmarksIcon = null;
                            if (actionPackage.style) {
                                landmarksIcon = L.divIcon(actionPackage.style)
                            } else {
                                landmarksIcon = L.divIcon(lists.landmarkIcon)
                            }
                            landmarksIcon.options.html = '<span class="fa-stack fa-lg"><i class="fa fa-stack-2x fa-map-marker"></i><i class="fa fa-stack-1x icon-back"></i>' + lists.landmark_icons[feature.properties.type] + "</span>";
                            return L.marker(latlng, {
                                icon: landmarksIcon,
                                draggable: "false"
                            })
                        },
                        onEachFeature: onEachFeature
                    }).addTo($scope.mapModel.geofeatures[actionPackage.layerCode])
                };
                $scope.addFeatures = function(actionPackage) {
                    var isDistanceMarkers = orsSettingsFactory.getUserOptions().distanceMarkers === true;
                    var polyLine = L.polyline(actionPackage.geometry, {
                        index: !(actionPackage.featureId === undefined) ? actionPackage.featureId : null,
                        interactive: false,
                        distanceMarkers: {
                            lazy: !isDistanceMarkers,
                            showAll: 13,
                            offset: 1e3,
                            cssClass: "ors-marker-dist",
                            iconSize: [18, 18]
                        }
                    });
                    polyLine.on("addDistanceMarkers", function() {
                        polyLine.addDistanceMarkers
                    });
                    polyLine.on("removeDistanceMarkers", polyLine.removeDistanceMarkers);
                    polyLine.addTo($scope.mapModel.geofeatures[actionPackage.layerCode]);
                    polyLine.setStyle(actionPackage.style)
                };
                $scope.addPolyline = function(actionPackage) {
                    $scope.mapModel.map.closePopup();
                    var polyLine = L.polyline(actionPackage.geometry, {
                        index: !(actionPackage.featureId === undefined) ? actionPackage.featureId : null,
                        interactive: true,
                        distanceMarkers: {
                            lazy: true
                        }
                    }).addTo($scope.mapModel.geofeatures[actionPackage.layerCode]);
                    polyLine.setStyle(actionPackage.style)
                };
                $scope.locateOnLineCopiedFromGeometryUtil = function(map, polyline, latlng) {
                    var latlngs = polyline.getLatLngs();
                    if (latlng.equals(latlngs[0])) return 0;
                    if (latlng.equals(latlngs[latlngs.length - 1])) return 1;
                    var point = L.GeometryUtil.closest(map, polyline, latlng, false),
                        lengths = L.GeometryUtil.accumulatedLengths(latlngs),
                        total_length = lengths[lengths.length - 1];
                    var portion = 0,
                        found = false,
                        foundIndex = 0;
                    for (var i = 0, n = latlngs.length - 1; i < n; i++) {
                        var l1 = latlngs[i],
                            l2 = latlngs[i + 1];
                        portion = lengths[i];
                        if (L.GeometryUtil.belongsSegment(point, l1, l2)) {
                            portion += l1.distanceTo(point);
                            foundIndex = i;
                            found = true;
                            break
                        }
                    }
                    if (!found) {
                        throw "Could not interpolate " + latlng.toString() + " within " + polyline.toString()
                    }
                    return {
                        factor: portion / total_length,
                        latlng: point,
                        index: foundIndex
                    }
                };
                $scope.addPolylineHover = function(actionPackage) {
                    $scope.mapModel.map.closePopup();
                    $scope.polylineZone = L.polyline(actionPackage.geometry, {
                        distanceMarkers: {
                            lazy: true
                        }
                    }).addTo($scope.mapModel.geofeatures[actionPackage.layerCode]);
                    $scope.polylineZone.setStyle({
                        color: "#FFF",
                        weight: 100,
                        opacity: 0
                    });
                    $scope.polylineZone.on("mouseover", function(e) {
                        if ($scope.hoverPoint) $scope.hoverPoint.removeFrom($scope.mapModel.geofeatures.layerRouteDrag)
                    });
                    $scope.hoverPolyLine = L.polyline(actionPackage.geometry, {
                        interactive: true,
                        distanceMarkers: {
                            lazy: true
                        }
                    }).addTo($scope.mapModel.geofeatures[actionPackage.layerCode]);
                    $scope.hoverPolyLine.setStyle(actionPackage.style);
                    $scope.pointList = actionPackage.extraInformation.pointInformation;
                    $scope.hoverPolyLine.on("mousemove", function(e) {
                        $scope.addHoverPoint($scope.mapModel, $scope.hoverPolyLine, $scope.pointList, e.latlng)
                    })
                };
                $scope.addHoverPoint = function(mapModel, hoverPolyLine, pointList, latlng) {
                    if ($scope.hoverPoint) $scope.hoverPoint.removeFrom($scope.mapModel.geofeatures.layerRouteDrag);
                    var snappedPosition = $scope.locateOnLineCopiedFromGeometryUtil(mapModel.map, hoverPolyLine, latlng);
                    var hoverIcon = L.divIcon(lists.waypointIcons[5]);
                    hoverIcon.options.html = '<i class="fa fa-circle"></i>';
                    $scope.hoverPoint = new L.marker(snappedPosition.latlng, {
                        icon: hoverIcon,
                        draggable: "true"
                    }).addTo(mapModel.geofeatures.layerRouteDrag).on("dragend", function(event) {
                        $scope.processMapWaypoint(pointList[snappedPosition.index].segment_index + 1, event.target._latlng, false, true, true);
                        mapModel.geofeatures.layerRouteDrag.clearLayers()
                    }).on("mousedown", function(event) {
                        hoverPolyLine.off("mousemove");
                        $scope.polylineZone.off("mouseover")
                    }).on("mouseup", function(event) {
                        hoverPolyLine.on("mousemove", function(e) {
                            $scope.addHoverPoint(mapModel, hoverPolyLine, pointList, e.latlng)
                        });
                        $scope.polylineZone.on("mouseover", function(e) {
                            if ($scope.hoverPoint) $scope.hoverPoint.removeFrom($scope.mapModel.geofeatures.layerRouteDrag)
                        })
                    }).on("click", function(e) {
                        $scope.mapModel.map.closePopup();
                        var snappedPosition = $scope.locateOnLineCopiedFromGeometryUtil(mapModel.map, hoverPolyLine, e.latlng);
                        $scope.distanceAtInterpolatedPoint = snappedPosition.factor * pointList[pointList.length - 1].distance;
                        $scope.interpolatedRoutePoint = pointList[snappedPosition.index];
                        var popupDirective = "<ors-route-point-popup></ors-route-point-popup>";
                        var popupContent = $compile(popupDirective)($scope);
                        $scope.pointPopup.setContent(popupContent[0]).setLatLng(e.latlng).openOn($scope.mapModel.map);
                        $timeout(function() {
                            $scope.pointPopup.update()
                        })
                    })
                };
                $scope.addIsochronesMarker = function(actionPackage) {
                    $scope.addNumberedMarker(actionPackage.geometry, actionPackage.featureId, actionPackage.layerCode, true)
                };
                $scope.toggleIsochronesMarker = function(actionPackage) {
                    var idx = actionPackage.extraInformation.idx;
                    var toggle = actionPackage.extraInformation.toggle;
                    var marker = $scope.mapModel.geofeatures[actionPackage.layerCode].getLayers()[idx];
                    if (toggle) angular.element(marker._icon).addClass("hideMarker");
                    else angular.element(marker._icon).removeClass("hideMarker")
                };
                var createLabelIcon = function(labelClass, labelText) {
                    return L.divIcon({
                        className: labelClass,
                        html: labelText,
                        iconSize: L.point(17, 17)
                    })
                };
                $scope.removeIsochrones = function(actionPackage) {
                    var idx = actionPackage.featureId;
                    var layerToRemove = $scope.mapModel.geofeatures[actionPackage.layerCode].getLayers()[idx];
                    layerToRemove.removeFrom($scope.mapModel.geofeatures[actionPackage.layerCode])
                };
                $scope.toggleIsochrones = function(actionPackage) {
                    var toggle = actionPackage.extraInformation.toggle;
                    var idx = actionPackage.extraInformation.idx;
                    $scope.mapModel.geofeatures[actionPackage.layerCode].getLayers()[idx].setStyle({
                        opacity: toggle === true ? 0 : 1,
                        weight: toggle === true ? 0 : 1,
                        fillOpacity: toggle === true ? 0 : 1
                    })
                };
                $scope.toggleIsochroneIntervals = function(actionPackage) {
                    var toggle = actionPackage.extraInformation.toggle;
                    var idx = actionPackage.extraInformation.idx;
                    var revIIdx = actionPackage.extraInformation.revIIdx;
                    $scope.mapModel.geofeatures[actionPackage.layerCode].getLayers()[idx].getLayers()[revIIdx].setStyle({
                        opacity: toggle === true ? 0 : 1,
                        weight: toggle === true ? 0 : 1,
                        fillOpacity: toggle === true ? 0 : 1
                    })
                };
                $scope.getGradientColor = function(rangePos, colorRangeStart) {
                    var hsl = Math.floor(colorRangeStart - 120 * rangePos);
                    return "hsl(" + hsl + ", 100%, 50%" + ")"
                };
                $scope.colorRangeIsochronesRotator = lists.isochronesColorsRanges;
                $scope.addIsochrones = function(actionPackage) {
                    var randomColorsSelected = orsSettingsFactory.getUserOptions().randomIsoColor === true ? true : false;
                    var colorRangeStart = 120;
                    if (randomColorsSelected) {
                        colorRangeStart = $scope.colorRangeIsochronesRotator[0];
                        $scope.colorRangeIsochronesRotator.push(colorRangeStart);
                        $scope.colorRangeIsochronesRotator.splice(0, 1)
                    }
                    var isochrones = [];
                    var isochronesPane = "isochronesPane" + actionPackage.featureId;
                    $scope.mapModel.map.createPane(isochronesPane);
                    for (var i = actionPackage.geometry.length - 1; i >= 0; i--) {
                        var isochrone = L.polygon(actionPackage.geometry[i].geometry.coordinates[0], {
                            fillColor: actionPackage.geometry.length == 1 ? $scope.getGradientColor(1, colorRangeStart) : $scope.getGradientColor(i / (actionPackage.geometry.length - 1), colorRangeStart),
                            color: "#FFF",
                            weight: 1,
                            fillOpacity: 1,
                            index: actionPackage.featureId,
                            pane: isochronesPane
                        });
                        isochrones.push(isochrone)
                    }
                    new L.FeatureGroup(isochrones).addTo($scope.mapModel.geofeatures[actionPackage.layerCode]);
                    $scope.opacityIsochrones()
                };
                $scope.opacityIsochrones = function() {
                    var mapPanes = $scope.mapModel.map.getPanes();
                    for (var pane in mapPanes) {
                        if (pane.startsWith("isochronesPane")) {
                            var svg = d3.select(mapPanes[pane]);
                            svg.style("opacity", .5);
                            svg.selectAll("path").style("stroke-opacity", 1)
                        }
                    }
                };
                $scope.$on("isoOpacityChange", function(event, iso) {
                    var paneName = "isochronesPane" + iso.idx.toString();
                    var currentPanes = $scope.mapModel.map.getPanes();
                    var svg = d3.select(currentPanes[paneName]);
                    svg.style("opacity", iso.opacity / 100)
                });
                $scope.clear = function(actionPackage) {
                    if (!(actionPackage.featureId === undefined)) {
                        $scope.mapModel.geofeatures[actionPackage.layerCode].eachLayer(function(layer) {
                            if (layer.options.index == actionPackage.featureId) {
                                $scope.mapModel.geofeatures[actionPackage.layerCode].removeLayer(layer)
                            }
                        })
                    } else {
                        $scope.mapModel.geofeatures[actionPackage.layerCode].clearLayers()
                    }
                };
                $scope.clearFeaturegroup = function(actionPackage) {
                    $scope.mapModel.geofeatures[actionPackage.layerCode].eachLayer(function(layer) {
                        layer.eachLayer(function(subLayer) {
                            if (subLayer.options.index == actionPackage.featureId) {
                                $scope.mapModel.geofeatures[actionPackage.layerCode].removeLayer(layer);
                                return
                            }
                        })
                    })
                };
                orsSettingsFactory.subscribeToNgRoute(function onNext(route) {
                    $scope.clearMap(true);
                    $scope.routing = route == "directions" ? true : false
                });
                orsSettingsFactory.subscribeToWaypoints(function onNext(d) {
                    var waypoints = d;
                    if (waypoints.length > 0) $scope.reAddWaypoints(waypoints, $scope.routing)
                });
                orsSettingsFactory.subscribeToAaWaypoints(function onNext(d) {
                    var waypoints = d;
                    if (waypoints.length > 0) $scope.reAddWaypoints(waypoints, $scope.routing, true)
                });
                $scope.hereControl = L.control({
                    position: "bottomright"
                });
                $scope.hereControl.onAdd = function(map) {
                    var div = $compile("<ors-here-popup></ors-here-popup>")($scope)[0];
                    L.DomEvent.disableClickPropagation(div);
                    return div
                };
                $scope.showHereMessage = function(pos) {
                    $scope.mapModel.geofeatures.layerHereMarkers.clearLayers();
                    $scope.mapModel.map.closePopup();
                    var lngLatString = orsUtilsService.parseLngLatString(pos);
                    var latLngString = orsUtilsService.parseLatLngString(pos);
                    var payload = orsUtilsService.geocodingPayload(lngLatString, true);
                    var request = orsRequestService.geocode(payload, true);
                    request.promise.then(function(data) {
                        $scope.address = {};
                        if (data.features.length > 0) {
                            $scope.address.info = orsUtilsService.addShortAddresses(data.features)[0];
                            $scope.address.info.processed.secondary = "<i>" + $scope.address.info.processed.secondary + "</i>"
                        } else {
                            $scope.address.info = {
                                processed: {
                                    primary: $scope.translateFilter("NO_ADDRESS")
                                }
                            }
                        }
                        $scope.address.position = "<small>" + latLngString + "</small>";
                        $scope.address.lngLat = lngLatString;
                        $scope.address.latLng = latLngString;
                        $scope.mapModel.map.addControl($scope.hereControl);
                        var circleMarkerOptions = {
                            radius: 5,
                            fillColor: "#FFF",
                            color: "#000",
                            weight: 2,
                            opacity: 1,
                            fillOpacity: .8
                        };
                        L.circleMarker(pos, circleMarkerOptions).addTo($scope.mapModel.geofeatures.layerHereMarkers)
                    }, function(response) {
                        orsMessagingService.messageSubject.onNext(lists.errors.GEOCODE)
                    })
                };
                $scope.locationsControl = function() {
                    return L.control.angular({
                        position: "topright",
                        template: '\n                     <a ng-click="show = !show" class="leaflet-locations">\n                     </a>\n                     <div ng-show="show" class="locations">\n                        <div>\n                            <div class="categories" ng-show="!showSubcategories">\n                                <div class="c-nav">\n                                    <div>\n                                        <div>Locations</div>\n                                    </div>\n                                    <div>\n                                        <div ng-click="clearLocations()">\n                                                <i class="fa fa-trash"></i>\n                                        </div>\n                                        <div ng-click="show = !show">\n                                            <i class="fa fa-remove"></i>\n                                        </div>\n                                    </div>\n                                    \n                                </div>\n                                <div class="c-list">\n                                    <div class="ui grid">\n                                      <div class="four wide column category" ng-repeat="(category, obj) in categories" ng-click="toggleSubcategories(category)">\n                                        <div tooltip-side="top" tooltip-template="{{(obj.name | translate)}}" tooltips="" ng-bind-html="categoryIcons[category]">\n                                        </div>\n                                        <div class="category-checkbox">\n                                            <input type="checkbox" ng-model="obj.selected" ng-click="setSubcategories(category); $event.stopPropagation();" indeterminate/>\n                                            \x3c!--{{obj.selected}}--\x3e    \n                                        </div>\n                                      </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="sub-categories" ng-show="showSubcategories">\n                                <div class="sc-nav">\n                                    <div ng-click="toggleSubcategories()">\n                                        <i class="fa fa-lg fa-arrow-left"></i>\n                                    </div>\n                                    <div>\n                                        <div class="ui compact menu">\n                                          <div class="ui simple dropdown item">\n                                            Categories\n                                            <i class="dropdown icon"></i>\n                                            <div class="menu">\n                                              <div class="item" ng-repeat="(category, obj) in categories" ng-click="selectCategory(category);">{{obj.name}}</div>\n                                            </div>\n                                          </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class="sc-list">\n                                    <ul>\n                                        <li ng-repeat="(scId, scObj) in categories[selectedCategoryId].subCategories">\n                                            <div class="ui checkbox">\n                                                <input id="{{scId}}" name="subcategory" ng-click="verifySubcategory(selectedCategoryId)" ng-model="scObj.selected" type="checkbox">\n                                                    <label for="{{scId}}" ng-bind-html="(scObj.name | translate)">\n                                                    </label>\n                                                </input>\n                                            </div>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="search-input">\n                           \x3c!--<div class="ui fluid action input">\n                                <input ng-model="namefilter" placeholder="{{getPlaceholder()}}" select-on-click="" type="text">  \n                                </input>\n                                <div ng-class="{\'ui primary button\': !loading, \'ui primary loading button\': loading, \'ui primary disabled button\': disabled}" ng-click="callLocations();">Search</div>\n                            </div>--\x3e\n                            <div ng-class="{\'ui primary button\': !loading, \'ui primary loading button\': loading, \'ui primary disabled button\': disabled}" ng-click="callLocations();">Search</div>\n\n                        </div>\n                        <div class="result-list" ng-show="results.length > 0">\n                             <div class="poi-header">\n                                <div>\n                                     <div ng-click="showResults = !showResults">\n                                        <i ng-class="showResults ? \'fa fa-window-minimize\' : \'fa fa-expand\'"></i>\n                                    </div>\n                                </div>\n                                <div>\n                                    <div ng-bind-html="(\'DETAILS\' | translate)"></div>\n                                    <div ng-bind-html="\'OSM\'"></div>\n                                </div>\n                            </div>\n                            <div class="poi-items" ng-show="showResults">\n                                <div class="poi-item" ng-repeat="feature in results" ng-click="panTo(feature.geometry.coordinates);" ng-mouseout="DeEmphPoi();" ng-mouseover="EmphPoi(feature.geometry.coordinates, feature.properties.categoryGroupId);">\n                                    <div class="poi-row">\n                                        <div class="icon" ng-bind-html=\'categoryIcons[feature.properties.categoryGroupId]\'></div>\n                                        <div class="text" ng-if="feature.properties[\'osm_tags\'].name === undefined" ng-bind-html="feature.properties.noUnderscoreName"></div>\n                                        <div class="text" ng-if="feature.properties[\'osm_tags\'].name" ng-bind-html=\'feature.properties["osm_tags"].name\'></div>\n                                        <div class="icon pointer" ng-click="poiDetails = !poiDetails; $event.stopPropagation();" ng-show=\'feature.properties["osm_tags"].address || feature.properties["osm_tags"].phone || feature.properties["osm_tags"].wheelchair || feature.properties["osm_tags"].website\'>\n                                            <i ng-class="getClass(poiDetails)" >\n                                            </i>\n                                        </div>\n                                        <div class="icon pointer">\n                                            <a target="_blank" ng-href="{{makeUrl(feature.properties.osm_id)}}">\n                                                <i class="fa fa-map">\n                                                </i>\n                                            </a> \n                                        </div>\n                                    </div>                                  \n                                    <div class="collapsable poi-details" ng-class="{ showMe: poiDetails }">    \n                                        <div class="poi-row" ng-if="feature.properties[\'osm_tags\'].address">\n                                            <div class="icon">\n                                                <i class="fa fa-address-card"></i>\n                                            </div>\n                                            <div class="text">\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.street ng-bind-html="feature.properties[\'osm_tags\'].address.street + \', \'"></span>\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.house_number ng-bind-html="feature.properties[\'osm_tags\'].address.house_number + \', \'"></span>\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.postal_code ng-bind-html="feature.properties[\'osm_tags\'].address.postal_code + \', \'"></span>\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.locality ng-bind-html="feature.properties[\'osm_tags\'].address.locality + \', \'"></span>\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.region ng-bind-html="feature.properties[\'osm_tags\'].address.region + \', \'"></span>\n                                                <span ng-if=feature.properties[\'osm_tags\'].address.country ng-bind-html="feature.properties[\'osm_tags\'].address.country"></span>\n                                            </div>                                        \n                                        </div>\n                                         <div class="poi-row" ng-if="feature.properties[\'osm_tags\'].phone">\n                                            <div class="icon">\n                                                <i class="fa fa-phone"></i>\n                                            </div>\n                                            <div class="text" ng-bind-html=\'feature.properties["osm_tags"].phone\'></div>\n                                        </div>\n                                         <div class="poi-row" ng-if="feature.properties[\'osm_tags\'].website">\n                                            <div class="icon">\n                                                <i class="fa fa-globe"></i>\n                                            </div> \n                                            <div class="text" ng-bind-html="feature.properties[\'osm_tags\'].website">\n                                            </div>\n                                        </div>\n                                        <div class="poi-row" ng-if="feature.properties[\'osm_tags\'].wheelchair">\n                                             <div ng-if="feature.properties[\'osm_tags\'].wheelchair">\n                                                <i class="fa fa-wheelchair-alt"></i>\n                                            </div>                                       \n                                        </div> \n                                    </div> \n                                    \n                                </div>\n                            </div>     \n                        </div>\n                     </div>\n                     ',
                        controllerAs: "leaflet",
                        controller: function($scope, $element, $map, lists, orsUtilsService, orsLocationsService, $timeout) {
                            $scope.getClass = function(bool) {
                                if (bool === true) return "fa fa-minus";
                                else return "fa fa-plus"
                            };
                            $scope.makeUrl = function(osmId) {
                                return "http://www.openstreetmap.org/node/" + osmId
                            };
                            $scope.clearLocations = function() {
                                $scope.results = [];
                                orsLocationsService.clearLocationsToMap()
                            };
                            $scope.callLocations = function() {
                                $scope.loading = true;
                                var settings = {
                                    categories: [],
                                    subCategories: []
                                };
                                angular.forEach($scope.categories, function(cObj, index) {
                                    if (cObj.selected === true) {
                                        settings.categories.push(index)
                                    }
                                    if (cObj.selected.length === 0) {
                                        angular.forEach(cObj.subCategories, function(scObj, index) {
                                            if (scObj.selected) {
                                                settings.subCategories.push(index)
                                            }
                                        })
                                    }
                                });
                                if ($scope.namefilter && $scope.namefilter.length > 0) settings.nameFilter = $scope.namefilter;
                                var bounds = $map.getBounds().toBBoxString().split(",").map(Number);
                                settings.bbox = [
                                    [bounds[0], bounds[1]],
                                    [bounds[2], bounds[3]]
                                ];
                                orsLocationsService.clear();
                                var payload = orsUtilsService.locationsPayload(settings);
                                var request = orsLocationsService.fetchLocations(payload);
                                orsLocationsService.requests.push(request);
                                request.promise.then(function(response) {
                                    orsLocationsService.addLocationsToMap(response);
                                    $scope.results = response.features;
                                    $scope.showResults = true;
                                    $scope.loading = false
                                }, function(response) {
                                    $scope.loading = false
                                })
                            };
                            $scope.categoryIcons = lists.locations_icons;
                            $scope.getPlaceholder = function() {
                                return "Optional filter, e.g. shell*"
                            };
                            $scope.selectCategory = function(id) {
                                $scope.selectedCategoryId = id
                            };
                            $scope.verifySubcategory = function(selectedCategoryId) {
                                var cnt = 0;
                                angular.forEach($scope.categories[selectedCategoryId].subCategories, function(subCategoryObj, subCategoryId) {
                                    if (subCategoryObj.selected) cnt += 1
                                });
                                var scLength = Object.keys($scope.categories[selectedCategoryId].subCategories).length;
                                if (cnt === scLength) {
                                    $scope.categories[selectedCategoryId].selected = true;
                                    $scope.isIntermediate = false
                                } else if (cnt > 0 && cnt < scLength) {
                                    $scope.categories[selectedCategoryId].selected = "";
                                    $scope.isIntermediate = true
                                } else {
                                    $scope.categories[selectedCategoryId].selected = false;
                                    $scope.isIntermediate = false
                                }
                                $timeout(function() {
                                    $scope.isAnySelected()
                                }, 0)
                            };
                            $scope.setSubcategories = function(categoryId) {
                                angular.forEach($scope.categories[categoryId].subCategories, function(subCategoryObj, subCategoryId) {
                                    if ($scope.isIntermediate) {
                                        subCategoryObj.selected = false
                                    } else {
                                        subCategoryObj.selected = $scope.categories[categoryId].selected
                                    }
                                });
                                $scope.isIntermediate = false;
                                $timeout(function() {
                                    $scope.isAnySelected()
                                }, 0)
                            };
                            $scope.isAnySelected = function() {
                                var inactive = true;
                                angular.forEach($scope.categories, function(categoryObj, categoryName) {
                                    if (categoryObj.selected || categoryObj.selected.length === 0) {
                                        inactive = false
                                    }
                                });
                                $scope.disabled = inactive
                            };
                            $scope.toggleSubcategories = function(categoryId) {
                                if (categoryId) $scope.selectedCategoryId = categoryId;
                                $scope.showSubcategories = $scope.showSubcategories === true ? false : true
                            };
                            $scope.EmphPoi = function(geometry, category) {
                                if ($map.getZoom() >= 14) orsLocationsService.emphPoi(geometry, category)
                            };
                            $scope.DeEmphPoi = function() {
                                orsLocationsService.DeEmphPoi()
                            };
                            $scope.panTo = function(geometry) {
                                orsLocationsService.panTo(geometry)
                            };
                            $scope.onInit = function() {
                                $scope.loading = true;
                                var payload = orsUtilsService.locationsCategoryPayload();
                                var request = orsLocationsService.fetchLocations(payload);
                                request.promise.then(function(response) {
                                    $scope.loading = $scope.showSubcategories = $scope.isIntermediate = false;
                                    $scope.show = $scope.disabled = false;
                                    $scope.categories = {};
                                    $scope.subcategoriesLookup = {};
                                    angular.forEach(response, function(categoryObj, categoryName) {
                                        var subCategories = {};
                                        angular.forEach(categoryObj.children, function(childObj, childName) {
                                            angular.forEach(childObj, function(subCategoryId, subCategoryName) {
                                                $scope.subcategoriesLookup[subCategoryId] = categoryObj.id;
                                                subCategories[subCategoryId] = {
                                                    name: subCategoryName,
                                                    selected: false
                                                }
                                            })
                                        });
                                        $scope.categories[categoryObj.id] = {
                                            name: categoryName,
                                            selected: false,
                                            subCategories: subCategories
                                        }
                                    });
                                    orsLocationsService.setSubcategoriesLookup($scope.subcategoriesLookup)
                                }, function(response) {
                                    $scope.loading = false
                                })
                            };
                            $scope.onInit()
                        }
                    })
                };
                $timeout(function() {
                    if (!$scope.smallScreen) {
                        $scope.mapModel.map.addControl($scope.locationsControl());
                        var lControl = angular.element(document.querySelector(".angular-control-leaflet")).addClass("leaflet-bar")[0];
                        if (!L.Browser.touch) {
                            L.DomEvent.disableClickPropagation(lControl).disableScrollPropagation(lControl)
                        } else {
                            L.DomEvent.disableClickPropagation(lControl).disableScrollPropagation(lControl)
                        }
                    }
                }, 500);
                orsMapFactory.subscribeToMapFunctions(function onNext(params) {
                    switch (params._actionCode) {
                        case -1:
                            if ($scope.showHeightgraph) {
                                $scope.hg.options.expand = globals.showHeightgraph;
                                $scope.mapModel.map.addControl($scope.hg);
                                var toggle = angular.element(document.querySelector(".heightgraph-toggle-icon"));
                                var close = angular.element(document.querySelector(".heightgraph-close-icon"));
                                toggle.bind("click", function(e) {
                                    globals.showHeightgraph = true
                                });
                                close.bind("click", function(e) {
                                    globals.showHeightgraph = false
                                });
                                if (params._package.geometry) {
                                    $scope.hg.addData(params._package.geometry);
                                    if (globals.showHeightgraph) globals.showHeightgraph = true
                                } else {
                                    $scope.hg.remove()
                                }
                            }
                            break;
                        case 0:
                            $scope.zoom(params._package);
                            break;
                        case 1:
                            $scope.addFeatures(params._package);
                            break;
                        case 2:
                            $scope.clear(params._package);
                            break;
                        case 3:
                            $scope.highlightWaypoint(params._package);
                            break;
                        case 5:
                            $scope.clearMap();
                            break;
                        case 7:
                            $scope.clearFeaturegroup(params._package);
                            break;
                        case 10:
                            $scope.addLocations(params._package);
                            break;
                        case 11:
                            $scope.highlightPoi(params._package);
                            break;
                        case 13:
                            $scope.addLandmark(params._package);
                            break;
                        case 30:
                            $scope.addIsochrones(params._package);
                            break;
                        case 31:
                            $scope.toggleIsochrones(params._package);
                            break;
                        case 32:
                            $scope.toggleIsochroneIntervals(params._package);
                            break;
                        case 33:
                            $scope.reshuffleIndicesText(params._package);
                            break;
                        case 34:
                            $scope.addIsochronesMarker(params._package);
                            break;
                        case 35:
                            $scope.removeIsochrones(params._package);
                            break;
                        case 36:
                            $scope.toggleIsochronesMarker(params._package);
                            break;
                        case 40:
                            $scope.addPolyline(params._package);
                            break;
                        case 41:
                            $scope.addPolylineHover(params._package);
                            break;
                        default:
                            break
                    }
                })
            }]
        }
    });
    angular.module("orsApp").directive("orsPopup", ["$compile", "$timeout", "orsSettingsFactory", "orsUtilsService", "orsRequestService", "orsRouteService", "orsFuelService", function($compile, $timeout, orsSettingsFactory, orsUtilsService, orsRequestService, orsRouteService, orsFuelService) {
        return {
            restrict: "E",
            templateUrl: "components/ors-map/directive-templates/ors-popup.html",
            link: function(scope, elem, attr) {
                scope.add = function(idx) {
                    scope.processMapWaypoint(idx, scope.displayPos)
                };
                scope.here = function() {
                    scope.showHereMessage(scope.displayPos)
                }
            }
        }
    }]);
    angular.module("orsApp").directive("orsAaPopup", ["$compile", "$timeout", "orsSettingsFactory", function($compile, $timeout, orsSettingsFactory) {
        return {
            restrict: "E",
            templateUrl: "components/ors-map/directive-templates/ors-aa-popup.html",
            link: function(scope, elem, attr) {
                scope.add = function(idx) {
                    scope.processMapWaypoint(idx, scope.displayPos, false, false)
                };
                scope.addMarker = function() {
                    scope.addCustomMarker(scope.displayPos)
                }
            }
        }
    }]);
    angular.module("orsApp").directive("orsHerePopup", ["$translate", function($translate) {
        return {
            restrict: "E",
            templateUrl: "components/ors-map/directive-templates/ors-here-popup.html",
            link: function(scope, elem, attr) {
                scope.hereShow = true
            }
        }
    }]);
    angular.module("orsApp").directive("orsRoutePointPopup", ["$translate", function($translate) {
        return {
            restrict: "E",
            templateUrl: "components/ors-map/directive-templates/ors-route-point-popup.html",
            link: function(scope, elem, attr) {}
        }
    }]);
    angular.module("orsApp").directive("orsWelcomeBox", ["$translate", function($translate) {
        return {
            restrict: "E",
            template: '<div ng-attr-class="{{ \'ui message ors-map-message fade blue\' }}" ng-show="show">\n            <i class="fa fa-close flright" data-ng-click="show = !show; $event.stopPropagation();"></i>\n            <div class="header" ng-bind-html="(\'WELCOME\' | translate)">\n            </div>\n            <div class="list">\n                <span ng-bind-html="(\'WELCOME_MESSAGE\' | translate)">\n                </span>\n            </div>\n        </div>',
            link: function(scope, elem, attr) {
                scope.show = true
            }
        }
    }]);
    angular.module("orsApp").directive("orsSignupBox", ["$translate", function($translate) {
        return {
            restrict: "E",
            template: '<div ng-attr-class="{{ \'ui message ors-map-message fade green\' }}" ng-show="show">\n            <i class="fa fa-close flright" data-ng-click="show = !show; $event.stopPropagation();"></i>\n            <div class="header" ng-bind-html="(\'LOCALE_SIGNUP_HEADER\' | translate)">\n            </div>\n            <div class="list">\n                <span ng-bind-html="(\'LOCALE_SIGNUP_MESSAGE\' | translate)">\n                </span>\n            </div>\n        </div>',
            link: function(scope, elem, attr) {
                scope.show = true
            }
        }
    }]);
    return {}
}();