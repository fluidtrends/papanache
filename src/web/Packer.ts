import {
  IWebPacker,
  PackingEventStatus,
  PackingEvent,
  PackingOptions
} from '.'

import fs from 'fs-extra'

import webpack, { 
  Compiler, 
  Configuration, 
  ICompiler
} from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import { DevConfig as makeConfig } from './config'

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
      // Start with a clean target
      fs.existsSync(this.opts.contextDir) || fs.removeSync(this.opts.contextDir)
      fs.existsSync(this.opts.destDir) && fs.removeSync(this.opts.destDir)
      fs.mkdirsSync(this.opts.destDir)

      return this
  }


/**
 * 
 * @param compiler 
 */
async listen(compiler: Compiler, trigger: (event: PackingEvent) => void) {
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
  // Make sure we're start with a clean target
  await this.initialize()

  // This is the configuration we want to work with 
  const config = makeConfig(this.opts)

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
  const devServer = await this.startDevServer(compiler, config)

  // Let callers access the goodies
  return { config, compiler, devServer }
}

}