import { IWebPacker, PackingEvent, PackingOptions } from '.';
import webpack, { Compiler, Configuration, ICompiler } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
/**
 *
 */
export declare class WebPacker implements IWebPacker {
    /** @internal */
    protected _opts: PackingOptions;
    /** @internal */
    protected _productDir: string;
    /** @internal */
    protected _buildDir: string;
    /**
     *
     * @param opts
     */
    constructor(opts: PackingOptions);
    /**
     *
     */
    get opts(): PackingOptions;
    /**
     *
     */
    get buildDir(): string;
    /**
    *
    */
    get productDir(): string;
    /**
     *
     */
    initialize(): Promise<this>;
    /**
     *
     * @param compiler
     */
    listen(compiler: Compiler, trigger: (event: PackingEvent) => void): Promise<webpack.Compiler>;
    /**
     *
     * @param compiler
     */
    compile(compiler: ICompiler): Promise<webpack.ICompiler>;
    /**
     *
     * @param compiler
     * @param config
     */
    startDevServer(compiler: Compiler, config: Configuration): Promise<WebpackDevServer>;
    /**
     *
     */
    pack(handler: (event: PackingEvent) => void): Promise<{
        config: webpack.Configuration;
        compiler: webpack.Compiler;
        devServer?: undefined;
    } | {
        config: webpack.Configuration;
        compiler: webpack.Compiler;
        devServer: WebpackDevServer;
    }>;
}
