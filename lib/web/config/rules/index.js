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
exports.ConfigRules = void 0;
var images_1 = __importDefault(require("./images"));
var html_1 = __importDefault(require("./html"));
var html_2 = __importDefault(require("./html"));
var ts_1 = __importDefault(require("./ts"));
function ConfigRules() {
    return __spreadArrays(images_1.default(), html_1.default(), html_2.default(), ts_1.default());
}
exports.ConfigRules = ConfigRules;
//# sourceMappingURL=index.js.map