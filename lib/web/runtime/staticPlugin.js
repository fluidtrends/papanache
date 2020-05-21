"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticPlugin = void 0;
var webPlugin_1 = require("./webPlugin");
var require_from_string_1 = __importDefault(require("require-from-string"));
var jsdom_1 = __importDefault(require("jsdom"));
var _global = global;
var StaticPlugin = /** @class */ (function (_super) {
    __extends(StaticPlugin, _super);
    function StaticPlugin(context) {
        return _super.call(this, context) || this;
    }
    StaticPlugin.prototype.loadMainModule = function (compilation) {
        if (this._mainModule) {
            return this._mainModule;
        }
        // We're only loading chunky once
        var bundle = compilation.assets[this.context.name + ".js"];
        var source = bundle.source();
        // const header = `var self = {}; global.document = { querySelector: Function.prototype }; global.window = {}; global.window.navigator = {};`
        try {
            var JSDOM = jsdom_1.default.JSDOM;
            var __DOM = new JSDOM("<!DOCTYPE html><div/>");
            var window_1 = __DOM.window;
            _global.window = __DOM.window;
            _global.document = window_1.document;
            var header = "global.__DOM = true";
            this._mainModule = require_from_string_1.default(header + "; " + source);
            return this._mainModule;
        }
        catch (e) {
        }
    };
    StaticPlugin.prototype.onPageGeneration = function (compilation, data, done) {
        var _this = this;
        var main = this.loadMainModule(compilation);
        if (!main) {
            done(new Error('Could not load main module'));
            return;
        }
        var route = data.plugin.options.route;
        main.renderStaticPage(route)
            .then(function (html) { return done(null, _this.resolveHtml(data, html)); })
            .catch(function (error) { return done(error); });
    };
    return StaticPlugin;
}(webPlugin_1.WebPlugin));
exports.StaticPlugin = StaticPlugin;
//# sourceMappingURL=staticPlugin.js.map