import {
    Configuration,
    ICompiler
} from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

export enum PackingEventStatus {
    START_COMPILING = "startCompiling",
    STOP_COMPILING = "stopCompiling"
}

export interface IRunner {
    run(): Promise<any>;
}

export interface PackingOptions {
    watch: boolean
    name: string
    dir: string
    stack: string
    port: number
}

export interface PackingInstance {
    config: Configuration
    compiler: ICompiler
    devServer?: WebpackDevServer
}

export interface PackingEvent {
    error?: string
    status: PackingEventStatus
}

export interface IWebPacker {
    readonly opts: PackingOptions
    readonly buildDir: string;
    readonly productDir: string;

    initialize (): Promise<IWebPacker>;
    listen(compiler: ICompiler, trigger: (event: PackingEvent) => void): Promise<ICompiler>;
    compile(compiler: ICompiler): Promise<ICompiler>;
    startDevServer(compiler: ICompiler, config: Configuration): Promise<WebpackDevServer>;
    pack (handler: (event: PackingEvent) => void): Promise<PackingInstance>;
}