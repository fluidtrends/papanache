const path = require('path')

export default (options?: any) => [{
  test: /\.(html)$/,
  use: {
      loader:  require.resolve('html-loader'),
      options: {
      }
  }
}, {
  test: /\.md$/,
  use: [
      {
          loader: require.resolve("html-loader")
      },
      {
          loader: require.resolve("markdown-loader"),
          options: {
          }
      }
  ]
}, {
  test: /\.mdx?$/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: '@mdx-js/loader',
      options: {
        remarkPlugins: [require.resolve('remark-images'), require.resolve('remark-emoji')]
      }
    }
  ]
}]