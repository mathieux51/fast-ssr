// import React from 'react'
// import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import fastify from 'fastify'

import webpackConfig from '../config/webpack.config'

const server = fastify({
  logger: {
    name: 'hmr',
    level: 'info',
  },
})

const compiler = webpack(webpackConfig)
compiler.hooks.done.tap('client', () => console.log('done'))

server.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
    logLevel: 'silent',
    // noInfo: true,
  }),
)
server.use(webpackHotMiddleware(compiler))

server.register(require('fastify-http-proxy'), {
  upstream: 'http://127.0.0.1:4000',
})

const start = async () => {
  try {
    await server.listen(3000)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
