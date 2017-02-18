import { DefinePlugin, optimize, NoEmitOnErrorsPlugin } from 'webpack'
import { resolve } from 'path'
const { UglifyJsPlugin, OccurrenceOrderPlugin } = optimize

const config = {
  devtool: 'cheap-module-eval-source-map',
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
      { test: /\.json$/i, loaders: ['json-loader'] }
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

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin({sourceMap: false, output: {comments: false}}))
}

export default config
