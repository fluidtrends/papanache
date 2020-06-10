import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'

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
  const assetsDir = path.resolve(options.contextDir, 'carmel', 'assets')
  const targetAssetsDir = path.resolve(options.destDir, 'assets')
  const copyAssets = [{
    from: assetsDir, to: targetAssetsDir, type: "dir", force: true
  }]

  return {
    context: path.resolve(options.contextDir),
    entry: [
      require.resolve('react-hot-loader/patch'),
      require.resolve('webpack-dev-server/client'),
      require.resolve('webpack/hot/only-dev-server'),
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
      },
      modules: [
        path.resolve(options.contextDir),
        path.resolve(options.contextDir, 'node_modules'),
        path.resolve(options.stackDir),
        path.resolve(options.stackDir, 'node_modules'),
        "node_modules"
      ]
    },

    module: {
      noParse: [/moment.js/],
      rules: ConfigRules()
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.carmel': JSON.stringify(options)
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyPlugin(copyAssets)
    ]
    .concat(pages(options)),
    // .concat([new WebPlugin()]),

    optimization: {
      nodeEnv: 'development'
    },

    devServer: {
      clientLogLevel: 'silent',
      stats: 'none',
      noInfo: true,
      host: '0.0.0.0',
      compress: false,
      inline: true,
      liveReload: true,
      open: true,
      port: options.port,
      contentBase: path.resolve(options.destDir),
      historyApiFallback: true,
      watchContentBase: true,
      hot: true
    }
  }
}

