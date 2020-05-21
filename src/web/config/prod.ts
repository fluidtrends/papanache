import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import path from 'path'

import webpack, {
  Configuration
} from 'webpack'

import {
  ConfigRules
} from '.'
import {
  pages,
  StaticPlugin 
} from '../runtime'

export function ProdConfig (options: any): Configuration {
  const root = (options.root || options.dir)
  const dir = options.dir
  const templateDir = options.templateDir || options.dir

  const targetDir = path.resolve(dir, `.${options.name}`, 'web')
  const targetAssetsDir = `${path.resolve(targetDir, 'assets')}/`

  const templateAssets = options.templateAssets || []
  const assetScripts = templateAssets.map((asset: any) => ({ context: path.resolve(templateDir, asset.path), from: asset.glob }))
                       .concat([{ context: path.resolve(dir, 'assets'), from: '**/*' }])

  return {
    context: path.resolve(root),
    entry: [
      options.script
    ],
    output: {
      filename: `${options.name}.js`,
      path: targetDir,
      publicPath: '/',
      libraryTarget: 'umd'
    },
    mode: 'production',    
    target: "web",
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
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
      rules: ConfigRules(options, true)
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),
      new ExtractTextPlugin('style.css'),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin(assetScripts.map((asset: any) => Object.assign({}, asset, { to: targetAssetsDir, toType: 'dir', force: true })))
    ].concat(pages(options, false)).concat([new StaticPlugin(Object.assign({}, options)),
      new UglifyJsPlugin({
        extractComments: true
      })
    ])
  }
}
