const tsImportPluginFactory = require('ts-import-plugin')

export default (opts?: any) => [{
    test: /\.ts(x?)$/,
    loader: require.resolve("ts-loader"),
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory() ]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
    //exclude: /node_modules/
// }, {
//     test: /\.js$/,
//     loader: require.resolve('source-map-loader'),
//     enforce: 'pre'
}]