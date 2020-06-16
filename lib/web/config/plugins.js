"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var path_1 = __importDefault(require("path"));
function all(options) {
    var assetsDir = path_1.default.resolve(options.contextDir, 'carmel', 'assets');
    var targetAssetsDir = path_1.default.resolve(options.destDir, 'assets');
    var copyAssets = [{
            from: assetsDir, to: targetAssetsDir, type: "dir", force: true
        }];
    return [
        new webpack_1.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.carmel': JSON.stringify(options)
        }),
        new webpack_1.default.HotModuleReplacementPlugin(),
        new webpack_1.default.NamedModulesPlugin(),
        new webpack_1.default.NoEmitOnErrorsPlugin(),
        new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new copy_webpack_plugin_1.default(copyAssets),
        new html_webpack_plugin_1.default({
            cache: false,
            filename: 'index.html',
            inject: false,
            template: path_1.default.resolve(options.templateFile)
        })
    ];
}
exports.all = all;
// new WebPlugin()  
// new StaticPlugin(Object.assign({}, options)
// new ExtractTextPlugin('style.css')
// new UglifyJsPlugin({ extractComments: true })
//# sourceMappingURL=plugins.js.map