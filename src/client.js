import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { hydrate } from 'react-dom'

import App from './components/App'

const render = () => (
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
