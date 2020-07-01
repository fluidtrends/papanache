declare const _default: (opts?: any) => ({
    test: RegExp;
    use: (string | {
        loader: string;
        options: {
            modules: boolean;
        };
    })[];
} | {
    test: RegExp;
    use: ({
        loader: string;
        options?: undefined;
    } | {
        loader: string;
        options: {
            lessOptions: {
                modifyVars: any;
                javascriptEnabled: boolean;
            };
        };
    })[];
})[];
export default _default;
