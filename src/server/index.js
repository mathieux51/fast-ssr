import html from './html'

const server = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    // Do "hot-reloading" on the server
    const { default: render } = await import('./render')
    reply.type('text/html; charset=utf-8')
    reply.send(html(fastify.filename, render()))
  })
  next()
}

export default server
