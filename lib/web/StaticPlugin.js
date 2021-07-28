"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticPlugin = void 0;
var jsdom_1 = __importDefault(require("jsdom"));
var require_from_string_1 = __importDefault(require("require-from-string"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
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
            _global.self = __DOM.window;
            _global.window = __DOM.window;
            _global.document = window_1.document;
            var header = "global.__DOM = true";
            return require_from_string_1.default(header + "; " + source);
        }
        catch (e) {
            console.log(e);
        }
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
        // console.log("***** CHUNK PATH:", data.plugin.options.chunk.path)
        // console.log(Object.keys(compilation.assets))
        // const app = this.load(compilation, "app.js")
        // console.log(app)
        // console.log("***** newData", newData)
        // newData.assets.js = newData.assets.js.map((asset: string) => path.relative(rootPath, asset))
        // console.log("***** 2.", newData.assets.js)
        // console.log("***** HTML:", newData.html)
        // console.log(data.plugin.options)
        // console.log(newData.assets)
        // const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
        // const info = this.context.config.info
        // const scripts = this.context.dev ? null : this.context.config.scripts.web
        // const styles = this.context.config.styles.web
        // const vars = JSON.stringify({ route: data.plugin.options.route })
        // const app = { route, info, vars, scripts, styles }
        // const app = {}
        // data.html = ejs.render(data.html, { app })
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
            html_webpack_plugin_1.default.getHooks(compilation).beforeEmit.tapAsync('papanache', function (data, done) { return _this.generate(compilation, data, done); });
        });
    };
    return StaticPlugin;
}());
exports.StaticPlugin = StaticPlugin;
//# sourceMappingURL=StaticPlugin.js.map