const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const config = require('../config')
const copyfiles = require('copyfiles')
const bs = require('browser-sync').create()

module.exports = (options) => new Promise((resolve, reject) => {
    const dir = path.resolve(options.dir, `.${options.name}`, 'web')

    if (!fs.existsSync(dir)) {
        reject(new Error("Make sure you build the app first"))
        return 
    }

    bs.init({
        server: dir
    })
    bs.reload("index.html")
})
