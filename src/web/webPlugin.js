let chalk = require('chalk')
let path = require('path')
let Ora = require('ora')
let ejs = require('ejs')
const emotions = require('../../assets/emotions.json')

class Plugin {
  constructor (context) {
    this._context = context

    process.stderr.write = Function.prototype
    this._stderrWrite = process.stderr.write
    this._modulesCounter = 0
    this._spinner = new Ora({ text: chalk.green(`[${this.context.name}] getting ready to start working`), spinner: 'dots', color: 'yellow', stream: process.stdout })
    this.spinner.start()
  }

  emotion (type) {
    if (!emotions || !emotions[type]) {
      return `[${this.context.name}] I'm somewhat confused`
    }

    const expression = emotions[type].expression
    const moods = emotions[type].moods

    const mood = moods[Math.floor(Math.random() * Math.floor(moods.length - 1))]
    return { expression, mood }
  }

  get happy () {
    return this.emotion("happy")
  }

  get working() {
    return this._working
  }

  get context () {
    return this._context
  }

  get spinner () {
    return this._spinner
  }

  get startTime () {
    return this._startTime
  }

  get isDone() {
    return this._done
  }

  get modulesCounter() {
    return this._modulesCounter
  }

  onStart (data) {
    if (this.startTime) {
      return
    }

    this._working = this.emotion("working")
    this._startTime = new Date().getTime()
    this.spinner.start()    
  }

  onModuleStart (module) {
    if (!module.resource) {
      // Ignore context logging
      return
    }

    this.spinner.text = `${chalk.green(`[${this.context.name}]`)} ${chalk.green(this.working.expression)} ${chalk.gray(this.working.mood)}`
  }

  onModuleFailure (module) {
    if (!module.resource) {
        // Ignore context logging
      return
    }

    this.spinner.fail(resource)
    this.spinner.fail(module.error)
  }

  onModuleSuccess (module) {
    if (!module.resource) {
      // Ignore context logging
      return
    }

    if (module.errors && module.errors.length > 0) {
      this.spinner.fail(module.resource)
      this.spinner.fail(module.errors[0])
      return
    }

    

    ++this._modulesCounter
    this.spinner.text = `${chalk.green(`[${this.context.name}]`)} ${chalk.green(this.working.expression)} ${chalk.gray(this.working.mood)}`
  }

  endTime (startTime) {
    const time = new Date().getTime() - startTime
    return (time < 1000 ? time + 'ms' : (parseFloat(time / 1000).toFixed(2) + 's'))
  }

  resolveHtml (data, html, st) {
    const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
    const info = this.context.config.info
    const web = this.context.config.web
    const scripts = st ? this.context.config.scripts : []
    const styles = this.context.config.styles

    const vars = JSON.stringify({ route: data.plugin.options.route })

    const app = { route, info, web, vars, scripts, styles }

    data.html = ejs.render(data.html, { app })

    return data
  }

  onPageGeneration (compilation, data, done) {
    done(null, this.resolveHtml(data))
  }

  onDone (stats) {
    if (!this.isDone) {
      return 
    }

    process.stderr.write = this._stderrWrite
    if (stats.compilation.errors && stats.compilation.errors.length > 0) {
      stats.compilation.errors.map(error => {
        this.spinner.fail(error)
      })

      this.spinner.fail(`${chalk.red(`[${this.context.name}] failed. Oh no, the horror.`)}`)
      return
    }

    const time = this.endTime(this.startTime)
    this._startTime = null
    this.spinner.succeed(`${chalk.green(`[${this.context.name}] finished work in`)} ${chalk.bold(time)} ${chalk.gray(this.happy.expression)}  ${chalk.gray(this.happy.mood)}`)
  }

  apply(compiler) {
    compiler.hooks.assetEmitted.tap(this.constructor.name, (file, { content, source, outputPath, compilation, targetPath }) => {
      const [id, type, ext] = file.split(".")
      const relativeFile = path.relative(process.cwd(), file)

      if (type === 'hot-update' && ext === 'json') {
        this._done = true
      }
    })

    compiler.hooks.compile.tap(this.constructor.name, (data) => this.onStart(data))

    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      compilation.hooks.buildModule.tap(this.constructor.name, (module) => this.onModuleStart(module))
      compilation.hooks.succeedModule.tap(this.constructor.name, (module) => this.onModuleSuccess(module))
      compilation.hooks.failedModule.tap(this.constructor.name, (module) => this.onModuleFailure(module))
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(this.constructor.name, (data, done) => this.onPageGeneration(compilation, data, done))
    })

    compiler.hooks.done.tap(this.constructor.name, (stats) => this.onDone(stats))
  }
}

module.exports = Plugin
