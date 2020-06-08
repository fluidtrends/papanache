export default (opts?: any) => [{
    test: /\.(html)$/,
    use: {
        loader:  require.resolve('html-loader'),
        options: {
        }
}}, {
    test: /\.css$/,
    use: [ require.resolve('style-loader'), {
        loader:  require.resolve('css-loader'),
        options: { modules: true }
    }]
}]