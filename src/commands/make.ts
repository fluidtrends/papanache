import path from 'path'
import fs from 'fs-extra'
import webpack from 'webpack'
import { ProdConfig as config } from '../config'
import copyfiles from 'copyfiles'

export async function make (options: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const dir = path.resolve(options.dir, `.${options.name}`, 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirSync(dir)

    const setup = config(options)

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
