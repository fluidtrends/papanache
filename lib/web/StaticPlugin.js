"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticPlugin = void 0;
var jsdom_1 = __importDefault(require("jsdom"));
var require_from_string_1 = __importDefault(require("require-from-string"));
var path_1 = __importDefault(require("path"));
/**
 *
 */
var StaticPlugin = /** @class */ (function () {
    function StaticPlugin(options) {
        this._options = options;
        this._bundles = {};
    }
    Object.defineProperty(StaticPlugin.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StaticPlugin.prototype, "bundles", {
        get: function () {
            return this._bundles;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param compilation
     * @param id
     */
    StaticPlugin.prototype.load = function (compilation, id) {
        try {
            var _global = global;
            var bundle = compilation.assets[id];
            var source = bundle.source();
            var JSDOM = jsdom_1.default.JSDOM;
            var __DOM = new JSDOM("<!DOCTYPE html><div/>");
            var window_1 = __DOM.window;
            _global.window = __DOM.window;
            _global.document = window_1.document;
            var header = "global.__DOM = true";
            return require_from_string_1.default(header + "; " + source);
        }
        catch (_a) { }
    };
    /**
     *
     * @param compilation
     * @param data
     * @param done
     */
    StaticPlugin.prototype.generate = function (compilation, data, done) {
        var newData = Object.assign({}, data);
        var rootPath = data.plugin.options.chunk.path;
        newData.assets.js = newData.assets.js.map(function (asset) { return path_1.default.relative(rootPath, asset); });
        // console.log(newData)
        // console.log(newData)
        // const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
        // const info = this.context.config.info
        // const scripts = this.context.dev ? null : this.context.config.scripts.web
        // const styles = this.context.config.styles.web
        // const vars = JSON.stringify({ route: data.plugin.options.route })
        // const app = { route, info, vars, scripts, styles }
        // const app = {}
        // data.html = ejs.render(data.html, { app })
        // console.log("??????", data)
        // return data
        done(null, newData);
    };
    /**
     *
     * @param compiler
     */
    StaticPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.compilation.tap(this.constructor.name, function (compilation) {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(_this.constructor.name, function (data, done) { return _this.generate(compilation, data, done); });
        });
    };
    return StaticPlugin;
}());
exports.StaticPlugin = StaticPlugin;
//# sourceMappingURL=StaticPlugin.js.map