declare const _default: (opts?: any) => {
    test: RegExp;
    loader: string;
    exclude: RegExp;
    options: {
        transpileOnly: boolean;
        getCustomTransformers: () => {
            before: any[];
        };
        compilerOptions: {
            module: string;
        };
    };
}[];
export default _default;
