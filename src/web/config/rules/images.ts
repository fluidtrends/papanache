export default (opts?: any) => [{
  test: /\.r.png$/,
  use: [{
    loader:  require.resolve('responsive-loader'),
    options: {
      sizes: [600, 2000],
      placeholder: true,
      placeholderSize: 50
    }
}]}, {
  test: /\.(png|jpg|gif)$/,
  use: {
    loader:  require.resolve('file-loader'),
    options: {}
  }
},{
  test: /\.(svg|ttf|eot|woff)$/,
  use: {
    loader:  require.resolve('raw-loader')
  }
}]