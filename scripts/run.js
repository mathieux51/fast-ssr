const path = require('path')
const fastify = require('fastify')({
  logger: {
    level: 'info',
  },
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '/public'),
})
// eslint-disable-next-line import/no-unresolved
// fastify.register(require('./server').default)

const start = async () => {
  try {
    await fastify.listen(4000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
