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
    var assetsDir = path_1.default.resolve(options.contextDir, 'carmel', 'assets');
    var targetAssetsDir = path_1.default.resolve(options.destDir, 'assets');
    var copyAssets = [{
            from: assetsDir, to: targetAssetsDir, type: "dir", force: true
        }];
    return {
        context: path_1.default.resolve(options.contextDir),
        entry: [
            require.resolve('react-hot-loader/patch'),
            require.resolve('webpack-dev-server/client'),
            require.resolve('webpack/hot/only-dev-server'),
            path_1.default.resolve(options.entryFile)
        ],
        mode: 'development',
        output: {
            filename: "app.js",
            path: path_1.default.resolve(options.destDir),
            libraryTarget: 'umd',
            publicPath: '/'
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
                path_1.default.resolve(options.contextDir),
                path_1.default.resolve(options.contextDir, 'node_modules'),
                path_1.default.resolve(options.stackDir),
                path_1.default.resolve(options.stackDir, 'node_modules'),
                "node_modules"
            ]
        },
        module: {
            noParse: [/moment.js/],
            rules: config_1.ConfigRules()
        },
        plugins: [
            new webpack_1.default.DefinePlugin({
                'process.env.carmel': JSON.stringify(options)
            }),
            new webpack_1.default.HotModuleReplacementPlugin(),
            new webpack_1.default.NamedModulesPlugin(),
            new webpack_1.default.NoEmitOnErrorsPlugin(),
            new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new copy_webpack_plugin_1.default(copyAssets)
        ]
            .concat(runtime_1.pages(options)),
        // .concat([new WebPlugin()]),
        optimization: {
            nodeEnv: 'development'
        },
        devServer: {
            clientLogLevel: 'silent',
            stats: 'none',
            noInfo: true,
            host: '0.0.0.0',
            compress: false,
            inline: true,
            liveReload: true,
            open: true,
            port: options.port,
            contentBase: path_1.default.resolve(options.destDir),
            historyApiFallback: true,
            watchContentBase: true,
            hot: true
        }
    };
}
exports.DevConfig = DevConfig;
//# sourceMappingURL=dev.js.map