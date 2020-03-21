const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config')
const copyfiles = require('copyfiles')

module.exports = (options) => new Promise((resolve, reject) => {
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
