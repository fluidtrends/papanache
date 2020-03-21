const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config.dev')
const WebpackDevServer = require('webpack-dev-server')

module.exports = (options, callback) => new Promise((resolve, reject) => {
  // Start off fresh
  process.noDeprecation = true
  process.env.NODE_ENV = "development"
  process.env.BABEL_ENV = "development"

  const dir = path.resolve(options.dir, `.${options.name}`, 'web')
  if (fs.existsSync(dir)) { fs.removeSync(dir) }
  fs.mkdirsSync(dir)

  const setup = config(options)
  const compiler = webpack(setup)

  compiler.plugin('done', (stats) => {
    callback && callback(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }))
    resolve({ port: options.port })
  })
  compiler.plugin('compile', (params) => {
    callback && callback(Object.assign({}, { compiled: false, compiling: true }))
  })

  if (options.once) {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err)
      }
    })
    resolve({ port: options.port })
    return 
  }

  const server = new WebpackDevServer(compiler, setup.devServer)
  server.listen(options.port, '0.0.0.0', (error) => {
    if (error) {
      reject(error)
      return
    }
  })
})
