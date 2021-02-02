import webpack, {
  Configuration
} from 'webpack'

import path from 'path'

import { 
  PackingOptions 
} from '..'

export function entries(options: PackingOptions) {
  return options.watch ? [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-dev-server/client'),
    require.resolve('webpack/hot/only-dev-server')
  ]: []
}

export function server (options: PackingOptions): Configuration {
  return options.watch ? {
    devServer: {
      host: 'localhost',
      compress: false,
      stats: { colors: false },
      inline: true,
      liveReload: false,
      publicPath: "/",
      open: false,
      port: options.port,
      writeToDisk: false,
      contentBase: path.resolve(options.destDir),
      historyApiFallback: true,
      watchContentBase: false,
      https: false,
      hot: true
    }
  } : {}
}
