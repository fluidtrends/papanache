import webpack, {
  Configuration
} from 'webpack'

import path from 'path'

import { 
  PackingOptions 
} from '..'

export function entries(options: PackingOptions) {
  return [
    require.resolve('react-hot-loader/patch'),
    require.resolve('webpack-dev-server/client'),
    require.resolve('webpack/hot/only-dev-server')
  ]
}

export function server (options: PackingOptions): Configuration {
  return options.watch ? {
    devServer: {
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
  } : {}
}
