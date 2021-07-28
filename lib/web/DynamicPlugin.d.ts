/**
 *
 */
export declare class DynamicPlugin {
    protected _options: any;
    protected _bundles: any;
    constructor(options: any);
    get options(): any;
    get bundles(): any;
    /**
     *
     * @param compiler
     */
    apply(compiler: any): void;
}
