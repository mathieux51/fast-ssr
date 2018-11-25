import path from 'path'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'
import App from '../components/App'

const statsFile = path.resolve('dist/public/loadable-stats.json')
const chunkExtractor = new ChunkExtractor({ statsFile })

const render = () => {
  const sheet = new ServerStyleSheet()
  const jsx = chunkExtractor.collectChunks(sheet.collectStyles(<App />))
  return { renderStream: sheet.interleaveWithNodeStream(renderToNodeStream(jsx)), chunkExtractor }
}

export default render
