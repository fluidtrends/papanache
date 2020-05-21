import { WebPlugin } from './webPlugin';
export declare class StaticPlugin extends WebPlugin {
    protected _mainModule?: any;
    constructor(context: any);
    loadMainModule(compilation: any): any;
    onPageGeneration(compilation: any, data: any, done: any): void;
}
