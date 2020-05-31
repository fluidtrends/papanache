"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (opts) { return [{
        test: /\.ts(x?)$/,
        use: {
            loader: "ts-loader"
        }
    }, {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
    }]; });
//# sourceMappingURL=ts.js.map