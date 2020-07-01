export default (opts?: any) => [{
    test: /\.css$/,
    use: [ require.resolve('style-loader'), {
        loader:  require.resolve('css-loader'),
        options: { modules: true }
    }]
}, {
    test: /\.less$/,
    use: [{
        loader: require.resolve('style-loader'),
    }, {
        loader: require.resolve('css-loader')
    }, {
        loader: require.resolve('less-loader'),
        options: {
        lessOptions: { 
            modifyVars: opts?.theme || {},
            javascriptEnabled: true,
        },
        },
    }]
}]