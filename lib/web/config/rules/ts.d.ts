declare const _default: (opts?: any) => ({
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
    enforce?: undefined;
} | {
    test: RegExp;
    loader: string;
    enforce: string;
    options?: undefined;
    exclude?: undefined;
})[];
export default _default;
