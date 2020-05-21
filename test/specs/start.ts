import path from 'path'
import savor, {
  Context, 
  Completion
} from 'savor'

import {
  web
} from '../../src'

savor.

add('starting up', (context: Context, done: Completion) => {
  const root =  path.resolve(__dirname, '../..')
  const dir =  context.dir

  const indexFile = path.resolve(root, 'test', 'assets', 'app', 'index.html')
  const startFile = path.resolve(root, 'test', 'assets', 'app', 'index.tsx')
  const assetsGlob = `${path.resolve(root, 'test', 'assets', 'app', 'resources')}/**/*`

  const config = {
    info: {
      test: "hello"
    }
  }

  const options = {
    name: 'test',
    once: true, 
    dir,
    assetsGlob,
    root,
    config,
    port: 9999,
    page: {
      dev: indexFile
    },
    script: startFile,
    sections: [{
      name: "intro"
    }]
  }

   savor.promiseShouldSucceed(web.start(options, (message: any) => {
     console.log(message)
   }), done, (data) => {
     console.log(data)
   })
}).


run('[Pananache] start')
