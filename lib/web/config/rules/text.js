"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.md$/,
        use: [
            {
                loader: require.resolve('html-loader')
            },
            {
                loader: require.resolve('markdown-loader'),
                options: {}
            }
        ]
    }]; });
//# sourceMappingURL=text.js.map