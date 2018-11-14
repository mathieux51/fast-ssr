// import React from 'react'
// import path from 'path'
import webpack from 'webpack' // eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware' // eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware' // eslint-disable-line
import fastify from 'fastify'

import cacheClean from './lib/cacheClean'
import webpackConfig from '../config/webpack.config'

const server = fastify({
  logger: {
    level: 'info',
  },
})

const compiler = webpack(webpackConfig)
compiler.hooks.done.tap('client', cacheClean)

server.use(
  webpackDevMiddleware(compiler, {
    logLevel: 'silent',
    noInfo: true,
  }),
)
server.use(webpackHotMiddleware(compiler))

server.register(async (...rest) => {
  const { default: s } = await import('../src/server')
  return s(...rest)
})

const start = async () => {
  try {
    await server.listen(4000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
