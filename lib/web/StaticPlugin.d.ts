/**
 *
 */
export declare class StaticPlugin {
    protected _options: any;
    protected _bundles: any;
    constructor(options: any);
    get options(): any;
    get bundles(): any;
    /**
     *
     * @param compilation
     * @param id
     */
    load(compilation: any, id: string): any;
    /**
     *
     * @param compilation
     * @param data
     * @param done
     */
    generate(compilation: any, data: any, done: any): void;
    /**
     *
     * @param compiler
     */
    apply(compiler: any): void;
}
