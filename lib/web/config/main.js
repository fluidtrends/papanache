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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var config = __importStar(require("."));
function Config(options) {
    return __assign({ context: path_1.default.resolve(options.contextDir), entry: __spreadArrays(config.dev.entries(options), [path_1.default.resolve(options.entryFile)]), mode: options.isStatic ? 'production' : 'development', devtool: 'source-map', target: 'web', output: {
            filename: "app.js",
            path: path_1.default.resolve(options.destDir),
            libraryTarget: 'umd',
            publicPath: '/'
        }, resolve: __assign({}, config.resolvers.all(options)), module: {
            rules: config.rules.all(options)
        }, optimization: options.isStatic ? {
            minimizer: [new terser_webpack_plugin_1.default({}), new optimize_css_assets_webpack_plugin_1.default({})],
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'app',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true,
                    }
                }
            },
        } : {}, plugins: config.plugins.all(options) }, config.dev.server(options));
}
exports.Config = Config;
//# sourceMappingURL=main.js.map