const WebPlugin = require('./webPlugin')
const requireFromString = require('require-from-string')
const ejs = require('ejs')

class Plugin extends WebPlugin {

  constructor (context) {
    super(context)
  }

  loadMainModule (compilation) {
    if (this._mainModule) {
      return this._mainModule
    }

    // We're only loading chunky once
    const bundle = compilation.assets[`${this.context.name}.js`]
    const source = bundle.source()
    // const header = `var self = {}; global.document = { querySelector: Function.prototype }; global.window = {}; global.window.navigator = {};`
    const header = `
    const jsdom = require("jsdom"); 
    const { JSDOM } = jsdom; 
    const __DOM = new JSDOM("<!DOCTYPE html><div/>");
    const { window, document } = __DOM;
    `
    
    try {
      this._mainModule = requireFromString(`${header}; ${source}`)
      return this._mainModule
    } catch (e) {
      console.log(e)
    }
  }

  onPageGeneration (compilation, data, done) {
    const main = this.loadMainModule(compilation)

    if (!main) {
      done(new Error('Could not load main module'))
      return
    }

    const route = data.plugin.options.route

    main.renderStaticPage(route)
         .then(html => done(null, this.resolveHtml(data, html, true)))
         .catch((error) => done(error))
  }
}

module.exports = Plugin
