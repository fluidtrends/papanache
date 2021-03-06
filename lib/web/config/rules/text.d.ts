declare const _default: (opts?: any) => ({
    test: RegExp;
    use: {
        loader: string;
        options: {};
    };
} | {
    test: RegExp;
    use: ({
        loader: string;
        options?: undefined;
    } | {
        loader: string;
        options: {
            remarkPlugins: string[];
        };
    })[];
})[];
export default _default;
