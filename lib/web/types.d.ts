import { Configuration, ICompiler } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
export declare enum PackingEventStatus {
    START_COMPILING = "startCompiling",
    STOP_COMPILING = "stopCompiling"
}
export interface IRunner {
    run(): Promise<any>;
}
export interface PackingOptions {
    watch: boolean;
    templateFile: string;
    destDir: string;
    chunks: string[];
    stackConfig: any;
    target: string;
    entry: any;
    mainDir: string;
    entryFile: string;
    stackDir: string;
    contextDir: string;
    isStatic: boolean;
    port: number;
}
export interface PackingInstance {
    config: Configuration;
    compiler: ICompiler;
    devServer?: WebpackDevServer;
}
export interface PackingEvent {
    error?: string;
    status: PackingEventStatus;
}
export interface IWebPacker {
    readonly opts: PackingOptions;
    initialize(): Promise<IWebPacker>;
    listen(compiler: ICompiler, trigger: (event: PackingEvent) => void): Promise<ICompiler>;
    compile(compiler: ICompiler): Promise<ICompiler>;
    startDevServer(compiler: ICompiler, config: Configuration): Promise<WebpackDevServer>;
    pack(handler: (event: PackingEvent) => void): Promise<PackingInstance>;
}
