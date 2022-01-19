import express from 'express'
// import { StaticRouterContext } from 'react-router'
import { List } from 'immutable'
// import { matchRoutes } from 'react-router-config'

import {
  PUBLIC_PATH
  , MTG_APP_COOKIE_NAME
} from '../../config'
import { createServerStore } from '../../helpers/createStore'
import renderer from './renderer'
// import { TRACE } from '../../routes/constants'
import { getAppContentStarted } from '../../components/app/actions'

export interface ServerContext { notFound?: boolean }

export default async (req: express.Request, res: express.Response) => {
  try {
    const store = createServerStore()

    store.dispatch(getAppContentStarted())

    const mtgSearchAppCookieValue = req.cookies[MTG_APP_COOKIE_NAME]
    const mtgSearchAppCookie = mtgSearchAppCookieValue ? `${MTG_APP_COOKIE_NAME}=${mtgSearchAppCookieValue}` : undefined

    if (mtgSearchAppCookie) {
      // matchRoutes(Routes, req.url)
      //   .map(({ route }) => {
      //     if(!route.routes) {
      //       const flowPath = TRACE[`${route.path}`]
      //       store.dispatch(updateFlowPath(List(flowPath)))
      //     }
      //   })
    }

    // const promises = matchRoutes(Routes, req.url)
    //   .map(({ route }) => {
    //     return route.loadData ? route.loadData(store, mtgSearchAppCookie) : null
    //     // return null
    //   })
    //   .map(promise => {
    //     if (promise) {
    //       return new Promise((resolve, reject) => {
    //         promise.then(resolve).catch(resolve)
    //       })
    //     }
    //   })

    // Promise
    //   .all(promises)
    //   .then(() => {
    //     const context: ServerContext = {}

    //     renderer(PUBLIC_PATH, req.url, store, context, res)
    //       .then(html => {
    //         const status = context.notFound ? 404 : 200

    //         res.status(status).type('text/html').send(html)
    //       })
    //       .catch(err => console.error(err))
    //   })
    const context: ServerContext = {}

    renderer(PUBLIC_PATH, req.url, store, context, res)
      .then(html => {
        const status = context.notFound ? 404 : 200

        res.status(status).type('text/html').send(html)
      })
      .catch(err => console.error(err))
  } catch (error: any) {
    res.status(500).type('text/plain').send(error.toString())
  }
}
