declare const _default: (opts?: any) => ({
    test: RegExp;
    use: {
        loader: string;
        options: {
            sizes: number[];
            placeholder: boolean;
            placeholderSize: number;
        };
    }[];
} | {
    test: RegExp;
    use: {
        loader: string;
        options: {};
    };
} | {
    test: RegExp;
    use: {
        loader: string;
        options?: undefined;
    };
})[];
export default _default;
