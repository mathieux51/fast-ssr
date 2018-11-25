// import path from 'path'
import createCacheStream from './createCacheStream'
// import redis from './redis'
import html from './html'

// const { NODE_ENV } = process.env
// const isProd = typeof NODE_ENV === 'undefined' || NODE_ENV === 'production'
// const isDev = !isProd

const server = (fastify, opts, next) => {
  // fastify.register(require('fastify-static'), {
  //   root: path.join(__dirname, '/..', '/..', '/public'),
  //   prefix: '/public/',
  // })

  fastify.get('*', async (request, reply) => {
    // const cachedHtml = await redis.get(request.path)
    // if (cachedHtml) {
    //   reply.type('text/html').send(cachedHtml)
    // } else {
    const stream = createCacheStream(request.req.url)
    stream.write(html)

    // Do "hot-reloading" on the server
    const { default: render } = await import('./render')
    const { renderStream, chunkExtractor } = render()
    renderStream.pipe(
      stream,
      { end: false },
    )
    renderStream.on('end', () => {
      stream.end(`</div>${chunkExtractor.getScriptTags()}</body></html>`)
    })

    reply.type('text/html').send(stream)
    // }

    next()
  })
}

export default server
