"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsImportPluginFactory = require('ts-import-plugin');
var createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
exports.default = (function (opts) { return [{
        test: /\.ts(x?)$/,
        loader: require.resolve("ts-loader"),
        exclude: /node_modules/,
        options: {
            transpileOnly: true,
            getCustomTransformers: function () { return ({
                before: [tsImportPluginFactory(), createStyledComponentsTransformer()]
            }); },
            compilerOptions: {
                module: 'es2015'
            }
        },
    }
]; });
//# sourceMappingURL=ts.js.map