"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdConfig = void 0;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var extract_text_webpack_plugin_1 = __importDefault(require("extract-text-webpack-plugin"));
var uglifyjs_webpack_plugin_1 = __importDefault(require("uglifyjs-webpack-plugin"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var _1 = require(".");
var runtime_1 = require("../runtime");
function ProdConfig(options) {
    var root = (options.root || options.dir);
    var dir = options.dir;
    var templateDir = options.templateDir || options.dir;
    var targetDir = path_1.default.resolve(dir, "." + options.name, 'web');
    var targetAssetsDir = path_1.default.resolve(targetDir, 'assets') + "/";
    var templateAssets = options.templateAssets || [];
    var assetScripts = templateAssets.map(function (asset) { return ({ context: path_1.default.resolve(templateDir, asset.path), from: asset.glob }); })
        .concat([{ context: path_1.default.resolve(dir, 'assets'), from: '**/*' }]);
    return {
        context: path_1.default.resolve(root),
        entry: [
            options.script
        ],
        output: {
            filename: options.name + ".js",
            path: targetDir,
            publicPath: '/',
            libraryTarget: 'umd'
        },
        mode: 'production',
        target: "web",
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
                moment: 'moment/moment.js'
            },
            modules: [
                path_1.default.resolve(dir),
                path_1.default.resolve(dir, "node_modules"),
                path_1.default.resolve(templateDir),
                path_1.default.resolve(templateDir, "node_modules"),
                path_1.default.resolve(root),
                path_1.default.resolve(root, "node_modules"),
                'node_modules'
            ]
        },
        module: {
            noParse: [/moment.js/],
            rules: _1.ConfigRules()
        },
        plugins: [
            new webpack_1.default.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
            }),
            new extract_text_webpack_plugin_1.default('style.css'),
            new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new copy_webpack_plugin_1.default(assetScripts.map(function (asset) { return Object.assign({}, asset, { to: targetAssetsDir, toType: 'dir', force: true }); }))
        ].concat(runtime_1.pages()).concat([new runtime_1.StaticPlugin(Object.assign({}, options)),
            new uglifyjs_webpack_plugin_1.default({
                extractComments: true
            })
        ])
    };
}
exports.ProdConfig = ProdConfig;
//# sourceMappingURL=prod.js.map