export default (opts?: any) => [{
    test: /\.md$/,
    use: [
      {
        loader:  require.resolve('html-loader')
      },
      {
        loader:  require.resolve('markdown-loader'),
        options: {
        }
      }
    ]
}]
