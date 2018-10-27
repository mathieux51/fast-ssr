const path = require('path')

const webpack = require('webpack')

module.exports = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  entry: ['webpack-hot-middleware/client', './src/client'],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'build/client'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
}
