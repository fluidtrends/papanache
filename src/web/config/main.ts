import {
  Configuration
} from 'webpack'
import TerserJSPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import { 
  PackingOptions 
} from '..'

import path from 'path'
import * as config from '.'

export function Config (options: PackingOptions): Configuration {
  return {
    context: path.resolve(options.contextDir),
    entry: [...config.dev.entries(options), path.resolve(options.entryFile)],

    mode: options.isStatic ? 'production' : 'development',   
    devtool: 'source-map',
    target: 'web',

    output: {
      filename: `app.js`,
      path: path.resolve(options.destDir),
      libraryTarget: 'umd',
      publicPath: '/'
    },

    resolve: {
      ...config.resolvers.all(options)
    },

    module: {
      rules: config.rules.all(options)
    },
   
    optimization: options.isStatic ? {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'app',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          }
        }
      },
    }: {},
   
    plugins: config.plugins.all(options),

    ...config.dev.server(options)
  }
}