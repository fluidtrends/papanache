export default (opts?: any) => [{
    test: /\.ts(x?)$/,
    use: {
        loader: "ts-loader"
    }
}, {
    test: /\.js$/,
    loader: 'source-map-loader',
    enforce: 'pre'
}]