const path = require('path')

const webpack = require('webpack')

const isProd = typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'production'
const isDev = !isProd

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: [
    isDev
      ? 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false'
      : null,
    isDev ? 'react-hot-loader/patch' : null,
    './src/client',
  ].filter(Boolean),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build/client'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // eslint-disable-next-line
        use: [isDev ? require('./lib/cacheLoader') : null, 'babel-loader?cacheDirectory'].filter(
          Boolean,
        ),
      },
    ],
  },
  plugins: [isDev ? new webpack.HotModuleReplacementPlugin() : null].filter(Boolean),
}
