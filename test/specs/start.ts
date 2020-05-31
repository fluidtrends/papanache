import savor, {
  Context, 
  Completion
} from 'savor'

// import axios from 'axios'
import fs from 'fs'
import path from 'path'

import {
  PackingOptions,
  PackingEvent,
  PackingInstance,
  PackingEventStatus,
  WebPacker
} from '../../src'

savor.

add('starting up once', (context: Context, done: Completion) => {
  const srcDir = path.resolve(context.dir, 'app')
  const targetDir = path.resolve(context.dir, 'target')
  const port = 9999
  const watch = false

  const options = {
    srcDir,
    port,
    watch,
    targetDir
  } as PackingOptions
  
  const packer = new WebPacker(options)

  savor.addAsset('assets/app', 'app', context)
  fs.symlinkSync(path.resolve(__dirname, '../..', 'node_modules'), path.resolve(srcDir, 'node_modules'), 'dir')

  const handler = (event: PackingEvent) => {
    context.expect(event).to.exist
    event.status === PackingEventStatus.STOP_COMPILING && done()
  }

  savor.promiseShouldSucceed(packer.pack(handler), () => {}, (instance: PackingInstance) => {
    context.expect(instance.compiler).to.exist
    context.expect(instance.config).to.exist
    context.expect(instance.devServer).to.not.exist
  })
}).

// add('starting up and watching', (context: Context, done: Completion) => {
//   const dir = path.resolve(context.dir, 'app')
//   const page = path.resolve(dir, 'index.html')
//   const script = path.resolve(dir, 'src', 'index.tsx')
//   const assetsGlob = `${path.resolve(dir, 'resources')}/**/*`

//   const opts = Object.assign({}, options, { 
//     dir, 
//     page, 
//     script,
//     assetsGlob,
//     once: false 
//   })
  
//   savor.addAsset('assets/app', 'app', context)
//   fs.symlinkSync(path.resolve(options.root, 'node_modules'), path.resolve(dir, 'node_modules'), 'dir')

//   savor.promiseShouldSucceed(web.start(() => {}), () => {}, (server) => {
//     axios.get(`http://0.0.0.0:${opts.port}`)
//          .then((response) => {
//            context.expect(response.status).to.equal(200)
//            context.expect(response.data).to.exist
//            server.close()
//            done()
//          })
//          .catch((error) => done(error))
//   })
// }).

run('[Pananache] start')
