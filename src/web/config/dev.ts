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
    require.resolve(`webpack-dev-server/client`),
    require.resolve('webpack/hot/only-dev-server'),
    path.resolve(options.stackDir, 'node_modules', '@carmel', 'js', 'src', 'index.ts'),
  ]: []
}

export function server (options: PackingOptions): Configuration {
  return options.watch ? {
    devServer: {
      host: 'localhost',
      compress: false,
      stats: { colors: false },
      inline: true,
      liveReload: true,
      publicPath: "/",
      open: false,
      port: options.port,
      writeToDisk: false,
      contentBase: path.resolve(options.destDir),
      historyApiFallback: true,
      watchContentBase: true,
      https: false,
      hot: true,
      watchOptions: {
        ignored: [
            
        ]
      }
    }
  } : {}
}
