"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
exports.default = (function (opts) { return (opts === null || opts === void 0 ? void 0 : opts.isStatic) ? [{
        test: /\.css$/,
        use: [
            {
                loader: mini_css_extract_plugin_1.default.loader,
                options: {
                    hmr: false,
                    reloadAll: true,
                },
            },
            require.resolve('css-loader'),
        ],
    }, {
        test: /\.less$/,
        use: [{
                loader: mini_css_extract_plugin_1.default.loader
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
    }] : [{
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