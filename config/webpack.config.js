const path = require('path')

const webpack = require('webpack')

const cacheLoader = require('./lib/cacheLoader')

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    './src/client',
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../build/client'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [cacheLoader, 'babel-loader?cacheDirectory'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
