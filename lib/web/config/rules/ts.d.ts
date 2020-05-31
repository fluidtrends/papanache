declare const _default: (opts?: any) => ({
    test: RegExp;
    use: {
        loader: string;
    };
    loader?: undefined;
    enforce?: undefined;
} | {
    test: RegExp;
    loader: string;
    enforce: string;
    use?: undefined;
})[];
export default _default;
