"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var path_1 = __importDefault(require("path"));
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var __1 = require("..");
function all(options) {
    var assetsDir = path_1.default.resolve(options.contextDir, 'carmel', 'assets');
    var targetAssetsDir = path_1.default.resolve(options.destDir, 'assets');
    var copyAssets = [{
            from: assetsDir, to: targetAssetsDir, type: "dir", force: true
        }];
    var all = [
        new webpack_1.default.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.carmel': JSON.stringify(options)
        }),
        new webpack_1.default.NamedModulesPlugin(),
        new webpack_1.default.NoEmitOnErrorsPlugin(),
        new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new copy_webpack_plugin_1.default(copyAssets),
    ];
    options.chunks.map(function (chunkId) {
        var chunk = require(options.mainDir + "/carmel/chunks/" + chunkId + "/chunk.json");
        var chunkRoot = chunk.path.substring(1);
        all.push(new html_webpack_plugin_1.default({
            filename: "" + chunkRoot + (chunkRoot.length === 0 ? '' : '/') + "index.html",
            template: path_1.default.resolve(options.templateFile),
            compile: false,
            chunk: chunk,
            chunks: ['__main', chunk.name],
            inject: true,
            minify: {
                collapseWhitespace: true,
                preserveLineBreaks: true
            }
        }));
    });
    if (options.isStatic) {
        all.push(new __1.StaticPlugin(options));
        all.push(new mini_css_extract_plugin_1.default({
            filename: 'app.css'
        }));
    }
    else {
        all.push(new webpack_1.default.HotModuleReplacementPlugin());
    }
    return all;
}
exports.all = all;
//# sourceMappingURL=plugins.js.map