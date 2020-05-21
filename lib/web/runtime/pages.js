"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
var path_1 = __importDefault(require("path"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var router_1 = require("./router");
function generateDevPage(options, route) {
    return new html_webpack_plugin_1.default({
        filename: 'index.html',
        route: route,
        inject: true,
        template: options.page
    });
}
function generateStaticPage(options, route) {
    var filename = ((route.path && route.path !== '/') ? route.path + '/' : '') + "index.html";
    if (filename[0] === '/') {
        filename = filename.substring(1);
    }
    return new html_webpack_plugin_1.default({
        cache: false,
        route: route,
        inject: true,
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            conservativeCollapse: true,
            removeComments: true
        },
        filename: filename,
        template: options.page
    });
}
function sectionRoutes(section, options) {
    var r = [];
    var _loop_1 = function (routeName) {
        var route = section.routes[routeName];
        if (!route.path || (route.path && route.path.indexOf(':path') < 0)) {
            r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? "" + route.path : '/') }));
            return "break";
        }
        if (!route.pathData) {
            return { value: [] };
        }
        try {
            var variants = require(path_1.default.resolve(options.dir, options.sectionsRoot, section.name, 'data', route.pathData + ".json"));
            if (!variants || variants.length === 0) {
                return { value: [] };
            }
            variants.forEach(function (variant) {
                var newPath = route.path.replace(/:path/g, variant.path);
                r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? "/" + route.path : '/'), path: newPath }, variant));
            });
        }
        catch (e) {
        }
    };
    for (var routeName in section.routes) {
        var state_1 = _loop_1(routeName);
        if (typeof state_1 === "object")
            return state_1.value;
        if (state_1 === "break")
            break;
    }
    return r;
}
function routes(options) {
    var r = [];
    for (var sectionName in options.config.app) {
        var section = options.config.app[sectionName];
        var sectionRoutesBuilder = router_1.createSectionRoutes(section, function (element, section) {
            var appSection;
            options.sections.forEach(function (s) {
                if (s.name === element) {
                    appSection = Object.assign({}, s);
                }
            });
            if (appSection && appSection.routes && Object.keys(appSection.routes).length > 0) {
                r = r.concat(sectionRoutes(appSection, options));
            }
        });
    }
    return r;
}
function pages(options, dev) {
    var r = routes(options);
    if (dev) {
        return [generateDevPage(options, r[0])];
    }
    // Add static pages
    return r.map(function (route) { return generateStaticPage(options, route); });
}
exports.pages = pages;
//# sourceMappingURL=pages.js.map