import {
  Configuration
} from 'webpack'

import { 
  PackingOptions 
} from '..'

import path from 'path'
import * as config from '.'

export function Config (options: PackingOptions): Configuration {
  return {
    context: path.resolve(options.contextDir),
    entry: [...config.dev.entries(options), path.resolve(options.entryFile)],

    mode: options.watch ? 'development' : 'production',   
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
   
    optimization: { 
      nodeEnv: options.watch ? 'development' : 'production'
    },
   
    plugins: config.plugins.all(options),

    ...config.dev.server(options)
  }
}

