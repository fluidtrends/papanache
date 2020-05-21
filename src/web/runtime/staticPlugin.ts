import { WebPlugin } from './webPlugin'
import requireFromString from 'require-from-string'
import jsdom from 'jsdom'

const _global:any = global

export class StaticPlugin extends WebPlugin {
  protected _mainModule?: any;

  constructor (context: any) {
    super(context)
  }

  loadMainModule (compilation: any) {
    if (this._mainModule) {
      return this._mainModule
    }

    // We're only loading chunky once
    const bundle = compilation.assets[`${this.context.name}.js`]
    const source = bundle.source()
    // const header = `var self = {}; global.document = { querySelector: Function.prototype }; global.window = {}; global.window.navigator = {};`

    try {
      const { JSDOM } = jsdom
      const __DOM = new JSDOM("<!DOCTYPE html><div/>")
      const { window } = __DOM
      _global.window = __DOM.window
      _global.document = window.document
      const header = `global.__DOM = true`
      this._mainModule = requireFromString(`${header}; ${source}`)
      return this._mainModule
    } catch (e) {
    }
  }

  onPageGeneration (compilation: any, data: any, done: any) {
    const main = this.loadMainModule(compilation)

    if (!main) {
      done(new Error('Could not load main module'))
      return
    }

    const route = data.plugin.options.route

    main.renderStaticPage(route)
         .then((html: string) => done(null, this.resolveHtml(data, html)))
         .catch((error: Error) => done(error))
  }
}
