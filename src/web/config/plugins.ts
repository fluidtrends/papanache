import CopyPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
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

    let template = path.resolve(options.templateFile)
    
    if (options.isStatic) {
      const PRERENDER = path.dirname(path.dirname(require.resolve('prerender-loader')))
      template = `!!${PRERENDER}?string!${template}`
    } 

    let all = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.carmel': JSON.stringify(options)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin(copyAssets),
    ]  

    if (options.isStatic) {
      all.push(new MiniCssExtractPlugin({
        filename: 'app.css'
      }))
      all.push()
    }

    all.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template,
      compile: false,
      inject: false,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    }))

    return all
}  

// new UglifyJsPlugin({ extractComments: true })
