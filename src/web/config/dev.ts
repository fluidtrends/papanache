import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import webpack, {
  Configuration
} from 'webpack'

import {
  ConfigRules 
} from '../config'

import {
  pages, 
  WebPlugin
} from '../runtime'

import { 
  PackingOptions 
} from '../..'

export function DevConfig (options: PackingOptions): Configuration {
  // const targetAssetsDir = `${path.resolve(targetDir, 'assets')}/`
  // const assetScripts = templateAssets.map((asset: any) => ({ context: path.resolve(templateDir, asset.path), from: asset.glob }))
  //                      .concat([{ context: path.resolve(dir, 'assets'), from: '**/*' }])
  
  return {
    context: options.srcDir,
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.resolve(options.srcDir, 'src', 'web', 'main.tsx')
    ],
    mode: 'development',    
    output: {
      filename: `app.js`,
      path: options.targetDir,
      libraryTarget: 'umd',
      publicPath: '/'
    },
    devtool: 'source-map',
    target: 'web',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        moment: 'moment/moment.js',
        'react-dom': require.resolve('@hot-loader/react-dom')
      },
      modules: [
        path.resolve(options.targetDir),
        path.resolve(options.targetDir, "node_modules"),
        path.resolve(options.srcDir),
        path.resolve(options.srcDir, "node_modules"),
        'node_modules'
      ]
    },
   
    module: {
      noParse: [/moment.js/],
      rules: ConfigRules()
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      // new CopyWebpackPlugin(assetScripts.map((asset: any) => Object.assign({}, asset, { to: targetAssetsDir, toType: 'dir', force: true })))
    ]

    .concat(pages()),
    // .concat([new WebPlugin()]),

    optimization: {
      nodeEnv: 'development'
    },

    devServer: {
      host: '0.0.0.0',
      compress: false,
      inline: true,
      liveReload: true,
      port: options.port,
      contentBase: options.targetDir,
      historyApiFallback: true,
      clientLogLevel: 'silent',
      stats: 'none',
      noInfo: true,
      watchContentBase: true,
      hot: true
    }
  }
}

