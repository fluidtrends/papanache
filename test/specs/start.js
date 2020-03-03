/* eslint-disable no-unused-expressions */

const savor = require('savor')
const start = require('../../src/web/start')
const path = require('path')
const fs = require('fs-extra')

savor.

add('initial', (context, done) => {
  const dir =  context.dir
  const root =  path.resolve(__dirname, '../..')

  const indexFile = path.resolve(root, 'test', 'assets', 'app', 'index.html')
  const startFile = path.resolve(root, 'test', 'assets', 'app', 'index.js')

  const assetsGlob = `${path.resolve(root, 'test', 'assets', 'app', 'resources')}/**/*`

  const srcDirs = [
    path.resolve(context.dir, 'app')
  ]

  const options = {
    name: 'test',
    once: true, 
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