"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var path_1 = __importDefault(require("path"));
function all(options) {
    return {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: options.watch ? {
            'react-dom': require.resolve('@hot-loader/react-dom')
        } : {},
        modules: [
            path_1.default.resolve(options.mainDir),
            path_1.default.resolve(options.mainDir, 'node_modules'),
            path_1.default.resolve(options.contextDir),
            path_1.default.resolve(options.contextDir, 'node_modules'),
            path_1.default.resolve(options.stackDir),
            path_1.default.resolve(options.stackDir, 'node_modules'),
            "node_modules"
        ]
    };
}
exports.all = all;
//# sourceMappingURL=resolvers.js.map