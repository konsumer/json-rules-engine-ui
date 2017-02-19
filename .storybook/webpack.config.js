module.exports = {
  plugins: [
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/i, exclude: /(node_modules)/, loader: 'babel-loader' },
      { test: /\.css?$/, loaders: [ 'style-loader', 'raw-loader' ] }
    ]
  }
}
