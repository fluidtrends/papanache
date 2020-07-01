"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.(html)$/,
        use: {
            loader: require.resolve('html-loader'),
            options: {}
        }
    }, {
        test: /\.mdx?$/,
        use: [
            {
                loader: 'babel-loader'
            },
            {
                loader: '@mdx-js/loader',
                options: {
                    remarkPlugins: [require.resolve('remark-images'), require.resolve('remark-emoji')]
                }
            }
        ]
    }]; });
//# sourceMappingURL=text.js.map