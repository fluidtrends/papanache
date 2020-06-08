const path = require('path')
const {
    WebPacker
} = require('../..')

export default async (stackDir, productDir) => {
  const contextDir = path.resolve(productDir)
  const destDir = path.resolve(contextDir, '.dist', 'web')
  const port = 9999
  const watch = true
  const templateFile = path.resolve(stackDir, 'assets', 'web', 'page.ejs')
  const entryFile = path.resolve(contextDir, 'carmel', '.web', 'main.tsx')

  const options = {
    watch,
    templateFile,
    destDir,
    entryFile,
    stackDir,
    contextDir,
    port
  }

  const packer = new WebPacker(options)

  const handler = (event) => {
    console.log(event)
  }

  const instance = await packer.pack(handler)
  return instance
}