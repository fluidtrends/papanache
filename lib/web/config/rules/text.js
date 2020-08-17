"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
exports.default = (function (options) { return [{
        test: /\.(html)$/,
        use: {
            loader: require.resolve('html-loader'),
            options: {}
        }
    }, {
        test: /\.md$/,
        use: [
            {
                loader: require.resolve("html-loader")
            },
            {
                loader: require.resolve("markdown-loader"),
                options: {}
            }
        ]
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