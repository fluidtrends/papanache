"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPlugin = void 0;
var ejs_1 = __importDefault(require("ejs"));
var WebPlugin = /** @class */ (function () {
    function WebPlugin(context) {
        this._context = context;
        this._done = false;
    }
    Object.defineProperty(WebPlugin.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlugin.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPlugin.prototype, "isDone", {
        get: function () {
            return this._done;
        },
        enumerable: false,
        configurable: true
    });
    WebPlugin.prototype.onStart = function (data) {
        if (this.startTime) {
            return;
        }
        this._startTime = new Date().getTime();
    };
    WebPlugin.prototype.onModuleStart = function (module) {
        if (!module.resource) {
            // Ignore context logging
            return;
        }
    };
    WebPlugin.prototype.onModuleFailure = function (module) {
        if (!module.resource) {
            // Ignore context logging
            return;
        }
    };
    WebPlugin.prototype.onModuleSuccess = function (module) {
        if (!module.resource) {
            // Ignore context logging
            return;
        }
        if (module.errors && module.errors.length > 0) {
            // fail
            return;
        }
    };
    WebPlugin.prototype.endTime = function (startTime) {
        var time = new Date().getTime() - startTime;
        return (time < 1000 ? time + 'ms' : ((time / 1000).toFixed(2) + 's'));
    };
    WebPlugin.prototype.resolveHtml = function (data, html) {
        var route = Object.assign({}, data.plugin.options.route, html ? { html: html } : {});
        var info = this.context.config.info;
        var scripts = this.context.dev ? null : this.context.config.scripts.web;
        var styles = this.context.config.styles.web;
        var vars = JSON.stringify({ route: data.plugin.options.route });
        var app = { route: route, info: info, vars: vars, scripts: scripts, styles: styles };
        data.html = ejs_1.default.render(data.html, { app: app });
        return data;
    };
    WebPlugin.prototype.onPageGeneration = function (compilation, data, done) {
        done(null, this.resolveHtml(data));
    };
    WebPlugin.prototype.onDone = function (stats) {
        if (stats.compilation.errors && stats.compilation.errors.length > 0) {
            stats.compilation.errors.map(function (error) {
                // fail
            });
            return;
        }
        if (this.context.dev && !this.isDone) {
            return;
        }
        var time = this.endTime(this.startTime);
        this._startTime = undefined;
        // succeed
    };
    WebPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.assetEmitted.tap(this.constructor.name, function (file, props) {
            var _a = file.split("."), id = _a[0], type = _a[1], ext = _a[2];
            if (type === 'hot-update' && ext === 'json') {
                _this._done = true;
            }
        });
        compiler.hooks.compile.tap(this.constructor.name, function (data) { return _this.onStart(data); });
        compiler.hooks.compilation.tap(this.constructor.name, function (compilation) {
            compilation.hooks.buildModule.tap(_this.constructor.name, function (module) { return _this.onModuleStart(module); });
            compilation.hooks.succeedModule.tap(_this.constructor.name, function (module) { return _this.onModuleSuccess(module); });
            compilation.hooks.failedModule.tap(_this.constructor.name, function (module) { return _this.onModuleFailure(module); });
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(_this.constructor.name, function (data, done) { return _this.onPageGeneration(compilation, data, done); });
        });
        compiler.hooks.done.tap(this.constructor.name, function (stats) { return _this.onDone(stats); });
    };
    return WebPlugin;
}());
exports.WebPlugin = WebPlugin;
//# sourceMappingURL=webPlugin.js.map