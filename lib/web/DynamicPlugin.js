"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicPlugin = void 0;
/**
 *
 */
var DynamicPlugin = /** @class */ (function () {
    function DynamicPlugin(options) {
        this._options = options;
        this._bundles = {};
    }
    Object.defineProperty(DynamicPlugin.prototype, "options", {
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DynamicPlugin.prototype, "bundles", {
        get: function () {
            return this._bundles;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param compiler
     */
    DynamicPlugin.prototype.apply = function (compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, function (compilation) {
        });
    };
    return DynamicPlugin;
}());
exports.DynamicPlugin = DynamicPlugin;
//# sourceMappingURL=DynamicPlugin.js.map