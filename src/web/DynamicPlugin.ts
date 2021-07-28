/**
 * 
 */
export class DynamicPlugin {
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
     * @param compiler 
     */
    apply(compiler: any) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation: any) => {
           
        })
    }
}