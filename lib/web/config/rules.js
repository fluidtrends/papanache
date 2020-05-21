"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigRules = void 0;
var path_1 = __importDefault(require("path"));
function ConfigRules(options, dev) {
    var root = (options.root || options.dir);
    var dir = options.dir;
    var templateDir = options.templateDir || options.dir;
    return [{
            test: /\.r.png$/,
            use: [{
                    loader: 'responsive-loader',
                    options: {
                        sizes: [600, 2000],
                        placeholder: true,
                        placeholderSize: 50
                    }
                }]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {}
            }
        },
        {
            test: /\.(svg|ttf|eot|woff)$/,
            use: {
                loader: 'raw-loader'
            }
        },
        {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {}
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', {
                    loader: 'css-loader',
                    options: { modules: true }
                }]
        },
        {
            test: /\.md$/,
            use: [
                {
                    loader: 'html-loader'
                },
                {
                    loader: 'markdown-loader',
                    options: {}
                }
            ]
        }, {
            test: /\.(js|jsx)$/,
            include: [
                path_1.default.resolve(dir),
                path_1.default.resolve(templateDir)
            ],
            use: {
                loader: 'babel-loader',
                options: {
                    configFile: path_1.default.resolve(root, ".babelrc" + (dev ? '.dev' : '') + ".json"),
                    presets: [
                        [path_1.default.resolve(root, 'node_modules', '@babel/preset-env'), {
                                loose: true,
                                modules: false
                            }],
                        path_1.default.resolve(root, 'node_modules', '@babel/preset-react'),
                    ],
                    plugins: [
                        require.resolve('react-hot-loader/babel'),
                        require.resolve('styled-jsx/babel')
                    ]
                }
            }
        }, {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader"
                }
            ]
        },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }];
}
exports.ConfigRules = ConfigRules;
//# sourceMappingURL=rules.js.map