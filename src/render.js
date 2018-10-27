import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import App from './components/App'

export default () => {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<App />))
  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
  return {
    html,
    styleTags,
  }
}
