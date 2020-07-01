export default (opts?: any) => [{
  test: /\.(html)$/,
  use: {
      loader:  require.resolve('html-loader'),
      options: {
      }
  }
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