"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsImportPluginFactory = require('ts-import-plugin');
exports.default = (function (opts) { return [{
        test: /\.ts(x?)$/,
        loader: require.resolve("ts-loader"),
        options: {
            transpileOnly: true,
            getCustomTransformers: function () { return ({
                before: [tsImportPluginFactory()]
            }); },
            compilerOptions: {
                module: 'es2015'
            }
        },
        exclude: /node_modules/
    }, {
        test: /\.js$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre'
    }]; });
//# sourceMappingURL=ts.js.map