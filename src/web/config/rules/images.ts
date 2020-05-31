export default (opts?: any) => [{
  test: /\.r.png$/,
  use: [{
    loader: 'responsive-loader',
    options: {
      sizes: [600, 2000],
      placeholder: true,
      placeholderSize: 50
    }
}]}, {
  test: /\.(png|jpg|gif)$/,
  use: {
    loader: 'file-loader',
    options: {}
  }
},{
  test: /\.(svg|ttf|eot|woff)$/,
  use: {
    loader: 'raw-loader'
  }
}]