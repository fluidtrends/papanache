export default (opts?: any) => [{
    test: /\.md$/,
    use: [
      {
        loader: 'html-loader'
      },
      {
        loader: 'markdown-loader',
        options: {
        }
      }
    ]
}]
