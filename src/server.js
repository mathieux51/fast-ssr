// class JunkError extends Error {}

const server = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
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
  next()
}

export default server
