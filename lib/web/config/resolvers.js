"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var path_1 = __importDefault(require("path"));
function all(options) {
    return {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: __assign(__assign({}, (options.isStatic ? {} : { 'react-dom': require.resolve('@hot-loader/react-dom') })), { immediate: require.resolve('immediate'), worker: 'worker-plugin/loader?esModule' }),
        modules: [
            path_1.default.resolve(options.mainDir),
            path_1.default.resolve(options.mainDir, 'node_modules'),
            path_1.default.resolve(options.contextDir),
            path_1.default.resolve(options.contextDir, 'node_modules'),
            path_1.default.resolve(options.stackDir),
            path_1.default.resolve(options.stackDir, 'node_modules'),
            "node_modules"
        ]
    };
}
exports.all = all;
//# sourceMappingURL=resolvers.js.map