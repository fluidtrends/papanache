"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.(html)$/,
        use: {
            loader: require.resolve('html-loader'),
            options: {}
        }
    }, {
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: { modules: true }
            }]
    }]; });
//# sourceMappingURL=html.js.map