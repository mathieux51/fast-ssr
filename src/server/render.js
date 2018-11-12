import React from 'react'
// import { renderToString } from 'react-dom/server'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from '../components/App'

export default () => {
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<App />)
  return sheet.interleaveWithNodeStream(renderToNodeStream(jsx))
}
