import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'
import App from '../components/App'

const render = (request) => {
  const sheet = new ServerStyleSheet()
  // Try to change the order or collectStyles/collectChunks or use compose
  return {
    renderStream: sheet.interleaveWithNodeStream(
      renderToNodeStream(
        <StaticRouter location={request.req.url} context={{}}>
          {sheet.collectStyles(<App />)}
        </StaticRouter>,
      ),
    ),
  }
}

export default render
