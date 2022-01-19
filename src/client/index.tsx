import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, useRoutes } from 'react-router-dom'

import { PLACEHOLDER } from '../config'
import { createClientStore } from '../helpers/createStore'
import { Routes } from '../routes'

interface AppProps {}

const placeholder = document.querySelector(`#${PLACEHOLDER}`)
const store = createClientStore(process.env.NODE_ENV)

const App: React.FunctionComponent<AppProps> = ({}) => {
  return useRoutes(Routes);
}

const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

hydrate(jsx, placeholder)
