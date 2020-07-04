"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var path_1 = __importDefault(require("path"));
function all(options) {
    var assetsDir = path_1.default.resolve(options.contextDir, 'carmel', 'assets');
    var targetAssetsDir = path_1.default.resolve(options.destDir, 'assets');
    var copyAssets = [{
            from: assetsDir, to: targetAssetsDir, type: "dir", force: true
        }];
    var template = path_1.default.resolve(options.templateFile);
    if (options.isStatic) {
        var PRERENDER = path_1.default.dirname(path_1.default.dirname(require.resolve('prerender-loader')));
        template = "!!" + PRERENDER + "?string!" + template;
    }
    var all = [
        new webpack_1.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.carmel': JSON.stringify(options)
        }),
        new webpack_1.default.HotModuleReplacementPlugin(),
        new webpack_1.default.NamedModulesPlugin(),
        new webpack_1.default.NoEmitOnErrorsPlugin(),
        new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new copy_webpack_plugin_1.default(copyAssets),
    ];
    if (options.isStatic) {
        all.push(new mini_css_extract_plugin_1.default({
            filename: 'app.css'
        }));
        all.push();
    }
    all.push(new html_webpack_plugin_1.default({
        filename: 'index.html',
        template: template,
        compile: false,
        inject: false,
        minify: {
            collapseWhitespace: true,
            preserveLineBreaks: true
        }
    }));
    return all;
}
exports.all = all;
// new UglifyJsPlugin({ extractComments: true })
//# sourceMappingURL=plugins.js.map