export default (opts?: any) => [{
    test: /\.ts(x?)$/,
    use: {
        loader: require.resolve("ts-loader")
    }
}, {
    test: /\.js$/,
    loader: require.resolve('source-map-loader'),
    enforce: 'pre'
}]