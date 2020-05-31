declare const _default: (opts?: any) => ({
    test: RegExp;
    use: {
        loader: string;
        options: {};
    };
} | {
    test: RegExp;
    use: (string | {
        loader: string;
        options: {
            modules: boolean;
        };
    })[];
})[];
export default _default;
