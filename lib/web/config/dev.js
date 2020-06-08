"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevConfig = void 0;
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var config_1 = require("../config");
var runtime_1 = require("../runtime");
function DevConfig(options) {
    // const targetAssetsDir = `${path.resolve(targetDir, 'assets')}/`
    // const assetScripts = templateAssets.map((asset: any) => ({ context: path.resolve(templateDir, asset.path), from: asset.glob }))
    //                      .concat([{ context: path.resolve(dir, 'assets'), from: '**/*' }])
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
            }
            // modules: [
            //   'node_modules'
            // ]
        },
        module: {
            noParse: [/moment.js/],
            rules: config_1.ConfigRules()
        },
        plugins: [
            new webpack_1.default.HotModuleReplacementPlugin(),
            new webpack_1.default.NamedModulesPlugin(),
            new webpack_1.default.NoEmitOnErrorsPlugin(),
            new webpack_1.default.IgnorePlugin(/^\.\/locale$/, /moment$/)
            // new CopyWebpackPlugin(assetScripts.map((asset: any) => Object.assign({}, asset, { to: targetAssetsDir, toType: 'dir', force: true })))
        ]
            .concat(runtime_1.pages(options)),
        // .concat([new WebPlugin()]),
        optimization: {
            nodeEnv: 'development'
        },
        devServer: {
            host: '0.0.0.0',
            compress: false,
            inline: true,
            liveReload: true,
            port: options.port,
            contentBase: path_1.default.resolve(options.destDir),
            historyApiFallback: true,
            watchContentBase: true,
            hot: true
        }
    };
}
exports.DevConfig = DevConfig;
// host: '0.0.0.0',
//       compress: false,
//       inline: true,
//       liveReload: true,
//       port: options.port,
//       contentBase: path.resolve(options.productDir, '.web'),
//       historyApiFallback: true,
//       clientLogLevel: 'silent',
//       stats: 'none',
//       noInfo: true,
//       watchContentBase: true,
//       hot: true
//# sourceMappingURL=dev.js.map