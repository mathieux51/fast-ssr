import fastify from 'fastify'

const server = fastify({
  logger: {
    name: 'ssr',
    level: 'info',
  },
})

server.register(async (...args) => {
  const { default: s } = require('./server')
  return s(...args)
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
