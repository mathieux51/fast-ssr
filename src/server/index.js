import path from 'path'
import createCacheStream from './createCacheStream'
// import redis from './redis'
import { htmlStart, htmlEnd } from './html'

// Fix me
// const { NODE_ENV } = process.env
// const isProd = typeof NODE_ENV === 'undefined' || NODE_ENV === 'production'
// const isDev = !isProd

const server = (fastify, opts, next) => {
  // fastify.register(require('fastify-static'), {
  //   root: path.join(__dirname, '/..', '/..', '/public'),
  //   prefix: '/public/',
  // })
  // fastify.get('/app.js', async (request, reply) => {
  //   const fs = require('fs')
  //   const stream = fs.createReadStream(`${process.cwd()}/app.js`, 'utf8')
  //   reply.type('application/javascript; charset=utf-8')
  //   reply.code(200).send(stream)
  // })

  fastify.get('*', async (request, reply) => {
    //   // const cachedHtml = await redis.get(request.path)
    //   // if (cachedHtml) {
    //   //   reply.type('text/html').send(cachedHtml)
    //   // } else {
    console.log('Hi')
    const json = reply.res.locals.webpackStats.toJson()
    const css = json.assetsByChunkName.main.filter(p => p.endsWith('.css'))
    const js = json.assetsByChunkName.main.filter(p => p.endsWith('.js'))
    const stream = createCacheStream(request.req.url)
    stream.write(htmlStart(css, json.publicPath))
    const { default: render } = require('./render') // eslint-disable-line global-require
    const { renderStream } = render(request)
    renderStream.pipe(
      stream,
      { end: false },
    )
    renderStream.on('end', () => {
      stream.end(htmlEnd(js, json.publicPath))
    })
    reply.type('text/html').send(stream)
    // }
    next()
  })
}
export default server
