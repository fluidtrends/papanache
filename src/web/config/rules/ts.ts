const tsImportPluginFactory = require('ts-import-plugin')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

export default (opts?: any) => [{
    test: /\.ts(x?)$/,
    loader: require.resolve("ts-loader"),
    exclude: /node_modules/,
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory(), createStyledComponentsTransformer() ]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
  }
]