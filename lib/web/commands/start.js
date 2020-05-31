"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var options = function (dir) { return ({
    watch: true,
    name: 'app',
    port: 9999,
    srcDir: path_1.default.resolve(dir),
    targetDir: path_1.default.resolve(dir, "." + name, 'web')
}); };
var opts = options(process.cwd());
//# sourceMappingURL=start.js.map