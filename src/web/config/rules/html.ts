export default (opts?: any) => [{
    test: /\.(html)$/,
    use: {
        loader: 'html-loader',
        options: {
        }
}}, {
    test: /\.css$/,
    use: ['style-loader', {
        loader: 'css-loader',
        options: { modules: true }
    }]
}]