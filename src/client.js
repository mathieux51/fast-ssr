import React from 'react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { hydrate } from 'react-dom'

import App from './components/App'

const render = () => (
  <AppContainer>
    <App />
  </AppContainer>
)

const root = document.getElementById('root')
hydrate(render(), root)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    console.log('🌶')
    hydrate(render(), root)
  })
}
