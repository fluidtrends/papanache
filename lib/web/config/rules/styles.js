"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: { modules: true }
            }]
    }, {
        test: /\.less$/,
        use: [{
                loader: require.resolve('style-loader'),
            }, {
                loader: require.resolve('css-loader')
            }, {
                loader: require.resolve('less-loader'),
                options: {
                    lessOptions: {
                        modifyVars: (opts === null || opts === void 0 ? void 0 : opts.theme) || {},
                        javascriptEnabled: true,
                    },
                },
            }]
    }]; });
//# sourceMappingURL=styles.js.map