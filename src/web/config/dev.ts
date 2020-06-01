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
    context: path.resolve(options.contextDir),
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.resolve(options.entryFile)
    ],
    mode: 'development',    
    output: {
      filename: `app.js`,
      path: path.resolve(options.destDir),
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
      }
      // modules: [
      //   'node_modules'
      // ]
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

    .concat(pages(options)),
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
      contentBase: path.resolve(options.destDir),
      historyApiFallback: true,
      watchContentBase: true,
      hot: true
    }
  }
}

// host: '0.0.0.0',
//       compress: false,
//       inline: true,
//       liveReload: true,
//       port: options.port,
//       contentBase: path.resolve(options.productDir, '.web'),
//       historyApiFallback: true,
//       clientLogLevel: 'silent',
//       stats: 'none',
//       noInfo: true,
//       watchContentBase: true,
//       hot: true