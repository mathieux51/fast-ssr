// class JunkError extends Error {}

import path from 'path'
// import React from 'react'
import fastify from 'fastify'
import webpack from 'webpack' // eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware' // eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware' // eslint-disable-line
import chokidar from 'chokidar' // eslint-disable-line

import webpackConfig from '../webpack.config'

function emptyCache() {
  Object.keys(require.cache).forEach((file) => {
    // eslint-disable-next-line
    const re = /[\/\\]ssr\/src[\/\\]/
    if (re.test(file)) {
      delete require.cache[file]
      console.log('🗑')
    }
  })
}

const server = fastify({
  logger: {
    level: 'warn',
  },
})
const compiler = webpack(webpackConfig)
const watcher = chokidar.watch('./', {
  ignored: /node_modules|\.git/,
})

watcher.on('ready', () => watcher.on('all', emptyCache))
compiler.hooks.done.tap('client', emptyCache)

server.use(
  webpackDevMiddleware(compiler, {
    logLevel: 'silent',
    noInfo: true,
  }),
)
server.use(webpackHotMiddleware(compiler))
server.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
})

server.get('/', async (request, reply) => {
  // Do "hot-reloading" on the server thanks to chokidar
  const { default: render } = await import('./render')
  const { html, styleTags } = render()

  reply.type('text/html; charset=utf-8')
  reply.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="Description" content="Put your description here.">
      <title>Fast SSR</title>
      ${styleTags}
    </head>
    <body>
      <div id="root">${html}</div>
      <script>window.__ssr = true</script>
      <script src="/main.js"></script>
    </body>
    </html>
  `)
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
