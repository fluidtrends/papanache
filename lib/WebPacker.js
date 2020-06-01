"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPacker = void 0;
var _1 = require(".");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var config_1 = require("./web/config");
/**
 *
 */
var WebPacker = /** @class */ (function () {
    /**
     *
     * @param opts
     */
    function WebPacker(opts) {
        this._opts = opts;
        this._productDir = path_1.default.resolve(this.opts.dir, this.opts.name);
        this._buildDir = path_1.default.resolve(this.productDir, '.web');
    }
    Object.defineProperty(WebPacker.prototype, "opts", {
        /**
         *
         */
        get: function () {
            return this._opts;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPacker.prototype, "buildDir", {
        /**
         *
         */
        get: function () {
            return this._buildDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebPacker.prototype, "productDir", {
        /**
        *
        */
        get: function () {
            return this._productDir;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     */
    WebPacker.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Start with a clean target
                fs_extra_1.default.existsSync(this.productDir) || fs_extra_1.default.removeSync(this.productDir);
                fs_extra_1.default.existsSync(this.buildDir) && fs_extra_1.default.removeSync(this.buildDir);
                fs_extra_1.default.mkdirsSync(this.buildDir);
                return [2 /*return*/, this];
            });
        });
    };
    /**
     *
     * @param compiler
     */
    WebPacker.prototype.listen = function (compiler, trigger) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                compiler.hooks.compile.tap("papanache", function () {
                    trigger({
                        status: _1.PackingEventStatus.START_COMPILING
                    });
                });
                compiler.hooks.done.tap("papanache", function (stats) {
                    var error = stats.compilation.errors && stats.compilation.errors.length === 0 ? stats.compilation.errors[0] : undefined;
                    trigger(Object.assign({}, error && { error: error }, {
                        status: _1.PackingEventStatus.STOP_COMPILING
                    }));
                });
                return [2 /*return*/, compiler];
            });
        });
    };
    /**
     *
     * @param compiler
     */
    WebPacker.prototype.compile = function (compiler) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        compiler.run(function (err, stats) {
                            if (err || stats.hasErrors()) {
                                reject(err);
                            }
                            resolve(compiler);
                        });
                    })];
            });
        });
    };
    /**
     *
     * @param compiler
     * @param config
     */
    WebPacker.prototype.startDevServer = function (compiler, config) {
        return __awaiter(this, void 0, void 0, function () {
            var server;
            var _this = this;
            return __generator(this, function (_a) {
                server = new webpack_dev_server_1.default(compiler, config.devServer);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        server.listen(_this.opts.port, '0.0.0.0', function (error) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(server);
                        });
                    })];
            });
        });
    };
    /**
     *
     */
    WebPacker.prototype.pack = function (handler) {
        return __awaiter(this, void 0, void 0, function () {
            var config, compiler, devServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Make sure we're start with a clean target
                    return [4 /*yield*/, this.initialize()
                        // This is the configuration we want to work with 
                    ];
                    case 1:
                        // Make sure we're start with a clean target
                        _a.sent();
                        config = config_1.DevConfig(this.opts);
                        compiler = webpack_1.default(config);
                        // Good, so let's listen for compilation events
                        return [4 /*yield*/, this.listen(compiler, handler)];
                    case 2:
                        // Good, so let's listen for compilation events
                        _a.sent();
                        if (!!this.opts.watch) return [3 /*break*/, 4];
                        // Looks like we don't want to watch so let's compile once
                        return [4 /*yield*/, this.compile(compiler)];
                    case 3:
                        // Looks like we don't want to watch so let's compile once
                        _a.sent();
                        return [2 /*return*/, { config: config, compiler: compiler }];
                    case 4: return [4 /*yield*/, this.startDevServer(compiler, config)
                        // Let callers access the goodies
                    ];
                    case 5:
                        devServer = _a.sent();
                        // Let callers access the goodies
                        return [2 /*return*/, { config: config, compiler: compiler, devServer: devServer }];
                }
            });
        });
    };
    return WebPacker;
}());
exports.WebPacker = WebPacker;
//# sourceMappingURL=WebPacker.js.map