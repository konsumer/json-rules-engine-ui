import { DefinePlugin, optimize, NoEmitOnErrorsPlugin } from 'webpack'
import { resolve } from 'path'
const { UglifyJsPlugin, OccurrenceOrderPlugin } = optimize

const config = {
  entry: {
    app: [
      './src/index.js',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: resolve(__dirname, './pub/build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/i, exclude: /(node_modules)/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  plugins: [
    new OccurrenceOrderPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new NoEmitOnErrorsPlugin()
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'cheap-source-map'
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin({sourceMap: false, output: {comments: false}}))
}

export default config
