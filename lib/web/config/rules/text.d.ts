declare const _default: (options?: any) => ({
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
        options: {};
    })[];
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
