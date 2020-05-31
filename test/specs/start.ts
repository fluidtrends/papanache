import savor, {
  Context, 
  Completion
} from 'savor'

import axios from 'axios'
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

add('starting up and watching', (context: Context, done: Completion) => {
  const srcDir = path.resolve(context.dir, 'app')
  const targetDir = path.resolve(context.dir, 'target')
  const port = 9999
  const watch = true

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
  }

  savor.promiseShouldSucceed(packer.pack(handler), () => {}, (instance: PackingInstance) => {
    context.expect(instance.compiler).to.exist
    context.expect(instance.config).to.exist
    context.expect(instance.devServer).to.exist
  
    axios.get(`http://0.0.0.0:${options.port}`)
         .then((response) => {
           context.expect(response.status).to.equal(200)
           context.expect(response.data).to.exist
           instance.devServer?.close()
           done()
         })
         .catch((error) => done(error))
    })
}).

run('[Pananache] start')
