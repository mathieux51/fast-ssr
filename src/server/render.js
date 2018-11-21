import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from '../components/App'

const modules = []
export default () => {
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<App />)
  console.log(modules)
  return sheet.interleaveWithNodeStream(renderToNodeStream(jsx))
}
