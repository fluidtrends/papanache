declare const _default: (opts?: any) => {
    test: RegExp;
    loader: string;
    options: {
        transpileOnly: boolean;
        getCustomTransformers: () => {
            before: any[];
        };
        compilerOptions: {
            module: string;
        };
    };
    exclude: RegExp;
}[];
export default _default;
