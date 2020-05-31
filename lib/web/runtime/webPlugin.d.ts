export declare class WebPlugin {
    protected _context?: any;
    protected _done: boolean;
    protected _startTime?: number;
    constructor(context?: any);
    get context(): any;
    get startTime(): number | undefined;
    get isDone(): boolean;
    onStart(data: any): void;
    onModuleStart(module: any): void;
    onModuleFailure(module: any): void;
    onModuleSuccess(module: any): void;
    endTime(startTime: number): string;
    resolveHtml(data: any, html?: string): any;
    onPageGeneration(compilation: any, data: any, done: any): void;
    onDone(stats: any): void;
    apply(compiler: any): void;
}
