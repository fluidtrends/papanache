"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var path_1 = __importDefault(require("path"));
// export function entries(options: PackingOptions) {
//   return options.watch ? [
//     require.resolve('react-hot-loader/patch'),
//     require.resolve(`webpack-dev-server/client`),
//     require.resolve('webpack/hot/only-dev-server'),
//     path.resolve(options.stackDir, 'node_modules', '@carmel', 'js', 'src', 'index.ts'),
//   ]: []
// }
function server(options) {
    return options.watch ? {
        devServer: {
            host: 'localhost',
            compress: false,
            stats: { colors: false },
            inline: true,
            liveReload: true,
            publicPath: "/",
            open: false,
            port: options.port,
            writeToDisk: true,
            contentBase: path_1.default.resolve(options.destDir),
            historyApiFallback: true,
            watchContentBase: true,
            https: false,
            hot: true,
            watchOptions: {
                ignored: []
            }
        }
    } : {};
}
exports.server = server;
//# sourceMappingURL=dev.js.map