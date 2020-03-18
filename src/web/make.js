let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('./config')
let copyfiles = require('copyfiles')

function make (options) {
  return new Promise((resolve, reject) => {
    // Start off fresh
    const dir = path.resolve(options.dir, `.${options.name}`, 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirSync(dir)

    const setup = config(options)

    process.noDeprecation = true
    process.env.NODE_ENV = 'production'

    webpack(setup, (error, stats) => {
      if (error) {
          // Looks like webpack failed with a hard error
        reject(error)
        return
      }
      copyfiles(['./web/public/*/**', './web/make'], { up: 2 }, () => resolve())
    })
  })
}

module.exports = make
