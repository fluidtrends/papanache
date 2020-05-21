"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevConfig = void 0;
var path_1 = __importDefault(require("path"));
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var config_1 = require("../config");
var runtime_1 = require("../runtime");
function DevConfig(options) {
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
            'react-hot-loader/patch',
            'webpack-dev-server/client',
            'webpack/hot/only-dev-server',
            options.script
        ],
        mode: 'development',
        watch: true,
        output: {
            filename: options.name + ".js",
            path: path_1.default.resolve(dir, "." + options.name, 'web'),
            publicPath: '/',
            libraryTarget: 'umd'
        },
        devtool: 'source-map',
        target: 'web',
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.json'],
            alias: {
                moment: 'moment/moment.js',
                'react-dom': require.resolve('@hot-loader/react-dom')
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
            rules: config_1.ConfigRules(options, true)
        },
        plugins: [
            new webpack_1.default.HotModuleReplacementPlugin(),
            new webpack_1.default.NamedModulesPlugin(),
            new webpack_1.default.NoEmitOnErrorsPlugin(),
            new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new copy_webpack_plugin_1.default(assetScripts.map(function (asset) { return Object.assign({}, asset, { to: targetAssetsDir, toType: 'dir', force: true }); }))
        ]
            .concat(runtime_1.pages(options, true))
            .concat([new runtime_1.WebPlugin(Object.assign({}, options, { dev: true }))]),
        optimization: {
            nodeEnv: 'development'
        },
        devServer: {
            host: '0.0.0.0',
            compress: false,
            inline: true,
            clientLogLevel: 'silent',
            stats: 'none',
            liveReload: true,
            noInfo: true,
            port: options.port,
            contentBase: path_1.default.resolve(dir, "." + options.name, 'web'),
            watchContentBase: true,
            historyApiFallback: true,
            hot: true
        }
    };
}
exports.DevConfig = DevConfig;
//# sourceMappingURL=dev.js.map