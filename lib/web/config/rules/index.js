"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = void 0;
var images_1 = __importDefault(require("./images"));
var styles_1 = __importDefault(require("./styles"));
var text_1 = __importDefault(require("./text"));
var ts_1 = __importDefault(require("./ts"));
function all(options) {
    return __spreadArrays(images_1.default(options), styles_1.default(options), text_1.default(options), ts_1.default(options));
}
exports.all = all;
//# sourceMappingURL=index.js.map