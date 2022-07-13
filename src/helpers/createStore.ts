import { combineReducers, createStore, Middleware, applyMiddleware, compose } from 'redux'
import { Map } from 'immutable'
import { createLogger } from 'redux-logger'

import * as App from './../components/app'
import { toDeepImmutable } from './utils'
import { LOCATION_CHANGE } from './../components/application-types/action-types/constants'

//
const reducer = combineReducers({ appState: App.reducer })

export type State = ReturnType<typeof reducer>

const initialState: State = {
  appState: App.INITIAL_STATE
}

export const createServerStore = (environment: string = 'production') => {
  return createStore(reducer, initialState)
}

export const createClientStore = (environment: string = 'production') => {
  const initialStore = window.__PRELOADED_STATE__ ? toDeepImmutable(window.__PRELOADED_STATE__) : initialState

  const pageview = (action: any) => {
    return ({
      hitType: 'PageView',
      url: action.payload,
    })
  }

  const eventsMap = {
    [LOCATION_CHANGE]: pageview
  }

  const isDevelopment = environment === 'development'

  let enhancer
  if (isDevelopment) {
    // const stateTransformer = (state: State) => Map(state).toJS()
    // const logger = createLogger({ stateTransformer })
    // const middlewares: Middleware[] = [logger]
    const middlewares: Middleware[] = []
    const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    enhancer = composeEnhancers(applyMiddleware(...middlewares))
  }
  const store = isDevelopment ? createStore(reducer, initialStore, enhancer) : createStore(reducer, initialStore)

  return store
}
