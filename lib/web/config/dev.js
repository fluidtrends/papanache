"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.entries = void 0;
var path_1 = __importDefault(require("path"));
function entries(options) {
    return [
        require.resolve('react-hot-loader/patch'),
        require.resolve('webpack-dev-server/client'),
        require.resolve('webpack/hot/only-dev-server')
    ];
}
exports.entries = entries;
function server(options) {
    return options.watch ? {
        devServer: {
            host: '0.0.0.0',
            compress: false,
            inline: true,
            liveReload: true,
            open: false,
            port: options.port,
            contentBase: path_1.default.resolve(options.destDir),
            historyApiFallback: true,
            watchContentBase: true,
            hot: false
        }
    } : {};
}
exports.server = server;
//# sourceMappingURL=dev.js.map