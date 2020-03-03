/* eslint-disable no-unused-expressions */

const savor = require('savor')
const start = require('../../src/web/start')
const path = require('path')
const fs = require('fs-extra')

savor.

add('initial', (context, done) => {
  savor.addAsset('assets/app', 'app', context)

  const indexFile = path.resolve(context.dir, 'app', 'index.html')
  const startFile = path.resolve(context.dir, 'app', 'index.js')
  const dir =  context.dir
  const root =  path.resolve(__dirname, '../..')
  const assetsGlob = `${path.resolve(context.dir, 'app', 'resources')}/**/*`

  const srcDirs = [
    path.resolve(context.dir, 'app')
  ]

  const options = {
    name: 'test',
    dir,
    assetsGlob,
    root,
    port: 9999,
    srcDirs,
    page: {
      dev: indexFile
    },
    startScript: {
      dev: startFile
    },
    sections: [{
      name: "intro"
    }]
  }


   savor.promiseShouldSucceed(start(options), done, (data) => {
     console.log(data)
   })
}).


run('[Pananache] start')
