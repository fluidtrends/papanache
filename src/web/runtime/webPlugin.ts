import ejs from 'ejs'

export class WebPlugin {
  protected _context?: any;
  protected _done: boolean;
  protected _startTime?: number;

  constructor (context?: any) {
    this._context = context
    this._done = false
  }

  get context () {
    return this._context
  }

  get startTime () {
    return this._startTime
  }

  get isDone() {
    return this._done
  }

  onStart (data: any) {
    if (this.startTime) {
      return
    }

    this._startTime = new Date().getTime()
  }

  onModuleStart (module: any) {
    if (!module.resource) {
      // Ignore context logging
      return
    }
  }

  onModuleFailure (module: any) {
    if (!module.resource) {
        // Ignore context logging
      return
    }
  }

  onModuleSuccess (module: any) {
    if (!module.resource) {
      // Ignore context logging
      return
    }

    if (module.errors && module.errors.length > 0) {
      // fail
      return
    }
  }

  endTime (startTime: number) {
    const time = new Date().getTime() - startTime
    return (time < 1000 ? time + 'ms' : ((time / 1000).toFixed(2) + 's'))
  }

  resolveHtml (data: any, html?: string) {
    // const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
    // const info = this.context.config.info

    // const scripts = this.context.dev ? null : this.context.config.scripts.web
    // const styles = this.context.config.styles.web
    
    // const vars = JSON.stringify({ route: data.plugin.options.route })

    // const app = { route, info, vars, scripts, styles }
    const app = {}

    // data.html = ejs.render(data.html, { app })
console.log("??????", data)
    return data
  }

  onPageGeneration (compilation: any, data: any, done: any) {
    done(null, this.resolveHtml(data))
  }

  onDone (stats: any) {
    if (stats.compilation.errors && stats.compilation.errors.length > 0) {
      stats.compilation.errors.map((error: Error) => {
        // fail
      })

      return
    }

    if (this.context.dev && !this.isDone) {
      return 
    }

    const time = this.endTime(this.startTime!)
    this._startTime = undefined
    // succeed
  }

  apply(compiler: any) {
    compiler.hooks.assetEmitted.tap(this.constructor.name, (file: string, props: any) => {
      const [id, type, ext] = file.split(".")
      if (type === 'hot-update' && ext === 'json') {
        this._done = true
      }
    })

    compiler.hooks.compile.tap(this.constructor.name, (data: any) => this.onStart(data))

    compiler.hooks.compilation.tap(this.constructor.name, (compilation: any) => {
      compilation.hooks.buildModule.tap(this.constructor.name, (module: any) => this.onModuleStart(module))
      compilation.hooks.succeedModule.tap(this.constructor.name, (module: any) => this.onModuleSuccess(module))
      compilation.hooks.failedModule.tap(this.constructor.name, (module: any) => this.onModuleFailure(module))
      // compilation.hooks.beforeEmit.tap(this.constructor.name, (data: any, done: any) => this.onPageGeneration(html, data, done))
    })

    compiler.hooks.done.tap(this.constructor.name, (stats: any) => this.onDone(stats))
  }
}