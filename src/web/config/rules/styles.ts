import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default (opts?: any) => opts?.isStatic ? [{
    test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              reloadAll: true,
            },
          },
          require.resolve('css-loader'),
        ],
}, {
    test: /\.less$/,
    use: [{
        loader: MiniCssExtractPlugin.loader
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
}] : [{
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