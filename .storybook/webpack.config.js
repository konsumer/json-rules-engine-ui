module.exports = {
  plugins: [
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/i, exclude: /(node_modules)/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
}
