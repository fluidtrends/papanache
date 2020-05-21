import path from 'path'
import fs from 'fs-extra'
import webpack from 'webpack'
import { DevConfig as config } from '../config'
import WebpackDevServer from 'webpack-dev-server'

export async function start (options: any, callback: any): Promise<any> {
  return new Promise((resolve, reject) => {
    process.env.NODE_ENV = "development"
    process.env.BABEL_ENV = "development"

    const dir = path.resolve(options.dir, `.${options.name}`, 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirsSync(dir)

    const setup = config(options)
    const compiler = webpack(setup as any)

    compiler.plugin('done', (stats: any) => {
      callback && callback(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }))
      resolve({ port: options.port })
    })

    compiler.plugin('compile', (params: any) => {
      callback && callback(Object.assign({}, { compiled: false, compiling: true }))
    })

    if (options.once) {
      compiler.run((err: Error, stats: any) => {
        if (err || stats.hasErrors()) {
          reject(err)
        }
      })
      resolve({ port: options.port })
      return 
    }

    const server = new WebpackDevServer(compiler, setup.devServer)
    server.listen(options.port, '0.0.0.0', (error?: Error) => {
      if (error) {
        reject(error)
        return
      }
    })
  })
}
