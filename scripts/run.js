const fs = require('fs')
const path = require('path')
const fastify = require('fastify')

const server = fastify({
  logger: {
    level: 'info',
  },
})

server.decorate('filename', JSON.parse(fs.readFileSync('stats.json')).filename)
server.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
})
server.register(require('./server').default)

const start = async () => {
  try {
    await server.listen(4000)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start()
