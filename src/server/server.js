import createCacheStream from './createCacheStream'
// import redis from './redis'
import { htmlStart, htmlEnd } from './html'
import webpackConfig from '../../config/webpack.config'

const { publicPath } = webpackConfig.output

const server = (fastify, opts, next) => {
  // fastify.register(require('fastify-static'), {
  //   root: path.join(__dirname, '/..', '/..', '/public'),
  //   prefix: '/public/',
  // })

  fastify.get('*', async (request, reply) => {
    //   // const cachedHtml = await redis.get(request.path)
    //   // if (cachedHtml) {
    //   //   reply.type('text/html').send(cachedHtml)
    //   // } else {

    const json = require('../../dist/public/stats.json')
    const css = json.assetsByChunkName.main.filter(p => p.endsWith('.css'))
    const js = json.assetsByChunkName.main.filter(p => p.endsWith('.js'))
    const stream = createCacheStream(request.req.url)
    stream.write(htmlStart(css, publicPath))
    const { default: render } = require('./render')
    const { renderStream } = render(request)
    renderStream.pipe(
      stream,
      { end: false },
    )
    renderStream.on('end', () => {
      stream.end(htmlEnd(js, publicPath))
    })
    reply.type('text/html').send(stream)
    // }
    next()
  })
}
export default server
