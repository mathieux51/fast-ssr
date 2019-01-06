import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from '../components/App'

const render = () => {
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<App />)
  return { renderStream: sheet.interleaveWithNodeStream(renderToNodeStream(jsx)) }
}

export default render
