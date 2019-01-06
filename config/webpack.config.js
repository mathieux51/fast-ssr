const path = require('path')
const webpack = require('webpack')
const { StatsWriterPlugin } = require('webpack-stats-plugin')

const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'
const isDev = !isProd

module.exports = {
  name: 'client',
  mode: isProd ? 'production' : 'development',
  target: 'web',
  devtool: 'source-map',
  devServer: isDev && {
    port: 3000,
    writeToDisk: true,
    proxy: [
      {
        context: ['**'],
        target: 'http://localhost:4000',
      },
    ],
  },
  entry: [
    // isDev
    //   ? 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false'
    //   : null,
    isDev ? 'react-hot-loader/patch' : null,
    './src/client',
  ].filter(Boolean),
  output: {
    filename: isDev ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDev ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist/public'),
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          isDev ? require('./lib/cacheLoader') : null, // eslint-disable-line
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    new StatsWriterPlugin({
      filename: 'stats.json', // Default
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.IS_WEBPACK': JSON.stringify('true'),
    }),
  ].filter(Boolean),
}
