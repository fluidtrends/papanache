import {
  IWebPacker,
  PackingEventStatus,
  PackingEvent,
  PackingOptions
} from '.'

import fs from 'fs-extra'
import jsdom from 'jsdom'
import requireFromString from 'require-from-string'
import ejs from 'ejs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

import webpack, { 
  Compiler, 
  Configuration, 
  ICompiler
} from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { Config } from './config'

/**
* 
*/
export class Packer implements IWebPacker {

  /** @internal */
  protected _opts: PackingOptions;

  /**
   * 
   * @param opts 
   */
  constructor(opts: PackingOptions) {
      this._opts = opts
  }

  /**
   * 
   */
  get opts() {
      return this._opts
  }
  /**
   * 
   */
  async initialize () {
      // Start with a clean destination
      fs.existsSync(this.opts.destDir) && fs.removeSync(this.opts.destDir)
      fs.mkdirsSync(this.opts.destDir)

      return this
  }

//   generateSite (compilation: any, data: any, trigger: (event: PackingEvent) => void, done: any) {
//     trigger({ 
//       status: PackingEventStatus.GENERATE_SITE
//     })

//     let newData = Object.assign({}, data)
//     let rootPath = data.plugin.options.chunk.path

//     newData.assets.js = newData.assets.js.map((asset: string) => path.relative(rootPath, asset))

//     console.log(data.plugin.options)
//     console.log(newData.assets)

//     // const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
//     // const info = this.context.config.info

//     // const scripts = this.context.dev ? null : this.context.config.scripts.web
//     // const styles = this.context.config.styles.web
    
//     // const vars = JSON.stringify({ route: data.plugin.options.route })

//     // const app = { route, info, vars, scripts, styles }
//     // const app = {}

//     // data.html = ejs.render(data.html, { app })
//     // return data

//     done(null, newData)
// }


  /**
   * 
   * @param compiler 
   */
  async listen(compiler: Compiler, trigger: (event: PackingEvent) => void) {
    // compiler.hooks.compilation.tap("papanache", (compilation: any) => {
    //   HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
    //       'papanache', (data: any, done: any) => this.generateSite(compilation, data, trigger, done) 
    //     )
    // })

    compiler.hooks.compile.tap("papanache", () => {
      trigger({ 
        status: PackingEventStatus.START_COMPILING
      })
    })
    
    compiler.hooks.done.tap("papanache", (stats: any) => {
      const error = stats.compilation.errors && stats.compilation.errors.length > 0 ? stats.compilation.errors[0] : undefined
      error && delete error.module && delete error.loaderSource
      trigger(Object.assign({}, error && { error }, { 
        status: PackingEventStatus.STOP_COMPILING
      }))
    })

    return compiler
  }

  /**
   * 
   * @param compiler 
   */
  async compile(compiler: ICompiler) {
    return new Promise<ICompiler>((resolve, reject) => {
        compiler.run((err: Error, stats: any) => {
          if (err || stats.hasErrors()) {
            reject(err)
          }
          resolve(compiler)
        })
    })
  }

  /**
   * 
   * @param compiler 
   * @param config 
   */
  async startDevServer(compiler: Compiler, config: Configuration) {
    const server = new WebpackDevServer(compiler, config.devServer)

    return new Promise<WebpackDevServer>((resolve, reject) => {
      server.listen(this.opts.port, '0.0.0.0', (error?: Error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(server)
      })
    })
  }

  /**
   * 
   */
  async pack (handler: (event: PackingEvent) => void) {    
    process.env.NODE_ENV = "production"

    // Make sure we're start with a clean target
    await this.initialize()

    // This is the configuration we want to work with 
    const config = Config(this.opts)

    // Let's get ourselves a compiler
    const compiler = webpack(config)

    // Good, so let's listen for compilation events
    await this.listen(compiler, handler)

    if (!this.opts.watch) {
      // Looks like we don't want to watch so let's compile once
      await this.compile(compiler)
      return { config, compiler }
    }

    // We wanna watch for events so let's build a server
    process.env.NODE_ENV = "development"
    const devServer = await this.startDevServer(compiler, config)

    // Let callers access the goodies
    return { config, compiler, devServer }
  }
}