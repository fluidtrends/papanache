import CopyPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {
    pages, 
    WebPlugin
  } from '../runtime'
  
  import webpack, {
    Plugin,
    Configuration
  } from 'webpack'
  
  import path from 'path'
  
  import { 
    PackingOptions 
  } from '..'
  
export function all (options: PackingOptions): Plugin[] {
    const assetsDir = path.resolve(options.contextDir, 'carmel', 'assets')
    const targetAssetsDir = path.resolve(options.destDir, 'assets')
    const copyAssets = [{
      from: assetsDir, to: targetAssetsDir, type: "dir", force: true
    }]
  
    return [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.carmel': JSON.stringify(options)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin(copyAssets),
        new HtmlWebpackPlugin({
          cache: false,
          filename: 'index.html',
          inject: false,
          template: path.resolve(options.templateFile)
       })
    ]  
}  

// new WebPlugin()  

// new StaticPlugin(Object.assign({}, options)
// new ExtractTextPlugin('style.css')
// new UglifyJsPlugin({ extractComments: true })
