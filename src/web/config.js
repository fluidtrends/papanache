const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const pages = require('./pages')
const rules = require('./rules')
const StaticPlugin = require('./staticPlugin')

module.exports = (options) => {
  const root = (options.root || options.dir)
  const dir = options.dir
  const templateDir = options.templateDir || options.dir

  return {
    context: path.resolve(root),
    entry: [
      options.script
    ],
    output: {
      filename: `${options.name}.js`,
      path: path.resolve(dir, `.${options.name}`, 'web'),
      publicPath: '/',
      libraryTarget: 'umd'
    },
    mode: 'production',    
    target: "web",
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        moment: 'moment/moment.js'
      },
      modules: [
        path.resolve(dir),
        path.resolve(dir, "node_modules"),
        path.resolve(templateDir),
        path.resolve(templateDir, "node_modules"),
        path.resolve(root),
        path.resolve(root, "node_modules"),
        'node_modules'
      ]
    },

    module: {
      noParse: [/moment.js/],
      rules: rules(options, true)
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),
      new ExtractTextPlugin('style.css'),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        { from: options.assetsGlob, to: 'assets', flatten: 'true',  globOptions: { dot: false } },
        { from: path.resolve(dir, 'assets/**/*'), to: 'assets', flatten: 'true',  globOptions: { dot: false } }
      ])
    ].concat(pages(options)).concat([new StaticPlugin(Object.assign({}, options)),
      new UglifyJsPlugin({
        extractComments: true
      })
    ])
  }
}
