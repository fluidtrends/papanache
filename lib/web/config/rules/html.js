"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.(html)$/,
        use: {
            loader: 'html-loader',
            options: {}
        }
    }, {
        test: /\.css$/,
        use: ['style-loader', {
                loader: 'css-loader',
                options: { modules: true }
            }]
    }]; });
//# sourceMappingURL=html.js.map