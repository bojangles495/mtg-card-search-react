import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { useRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import { Routes } from '../../routes'
import { ServerContext } from './ssr'

interface AppProps {}

const App: React.FunctionComponent<AppProps> = ({}) => {
  return useRoutes(Routes);
}

interface ComponentProps {
  config: {
    context: ServerContext
    store: Store
    url: string
  }
}

const Component: React.FunctionComponent<ComponentProps> = ({ config: { context = {}, store, url} }) => {
  return (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

export default Component
