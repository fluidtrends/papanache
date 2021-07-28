import jsdom from 'jsdom'
import requireFromString from 'require-from-string'
import ejs from 'ejs'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

/**
 * 
 */
export class StaticPlugin {
    protected _options: any
    protected _bundles: any 

    constructor (options: any) {
      this._options = options
      this._bundles = {}
    }

    get options() {
        return this._options
    }

    get bundles() {
        return this._bundles
    }

    /**
     * 
     * @param compilation 
     * @param id 
     */
    load (compilation: any, id: string) {
        try {
            const _global:any = global
            const bundle = compilation.assets[id]
            const source = bundle.source()
    
            const { JSDOM } = jsdom
            const __DOM = new JSDOM("<!DOCTYPE html><div/>")
            const { window } = __DOM

            _global.self = __DOM.window
            _global.window = __DOM.window
            _global.document = window.document

            const header = `global.__DOM = true`
            return requireFromString(`${header}; ${source}`)
        } catch (e: any) {
            console.log(e)
        }
    }

    /**
     * 
     * @param compilation 
     * @param data 
     * @param done 
     */
    generate (compilation: any, data: any, done: any) {
        let newData = Object.assign({}, data)
        let rootPath = data.plugin.options.chunk.path

        // console.log("***** CHUNK PATH:", data.plugin.options.chunk.path)
        // console.log(Object.keys(compilation.assets))
        // const app = this.load(compilation, "app.js")
        // console.log(app)

        // console.log("***** newData", newData)
        // newData.assets.js = newData.assets.js.map((asset: string) => path.relative(rootPath, asset))
        // console.log("***** 2.", newData.assets.js)
        // console.log("***** HTML:", newData.html)

        // console.log(data.plugin.options)
        // console.log(newData.assets)

        // const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
        // const info = this.context.config.info
    
        // const scripts = this.context.dev ? null : this.context.config.scripts.web
        // const styles = this.context.config.styles.web
        
        // const vars = JSON.stringify({ route: data.plugin.options.route })
    
        // const app = { route, info, vars, scripts, styles }
        // const app = {}
    
        // data.html = ejs.render(data.html, { app })
        // return data
    
        done(null, newData)
    }
    
    /**
     * 
     * @param compiler 
     */
    apply(compiler: any) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation: any) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'papanache', (data: any, done: any) => this.generate(compilation, data, done) 
              )
        })
    }
}