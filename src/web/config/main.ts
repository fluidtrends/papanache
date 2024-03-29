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
  let entry: any = {}
  let chunks: any = {}
     
  entry = { __main: path.resolve(options.entryFile) }
  options.chunks.map((chunkId: string) => {
      const chunk = require(`${options.mainDir}/carmel/chunks/${chunkId}/chunk.json`)
      chunks[chunkId] = chunk
      entry[chunkId] = path.resolve(options.stackDir, options.entry.chunk)
  })

  return {
    context: path.resolve(options.contextDir),
    entry,
    mode: options.isStatic ? 'production' : 'development',   
    target: 'web',

    output: {
      filename: (pathData) => {
        if (pathData.chunk.name === '__main') {
          return 'app.js' 
        }

        const chunk = chunks[pathData.chunk.name]
        const chunkRoot = chunk.path.substring(1)
        return `${chunkRoot}${chunkRoot.length === 0 ? '' : '/'}chunk.js`
      },
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
      minimize: false,
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'app',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
        }
      },
    }: {},
   
    plugins: config.plugins.all(options),

    ...config.dev.server(options)
  }
}

