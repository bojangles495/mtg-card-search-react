import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import webpack from 'webpack'

// import 'core-js';
// import 'regenerator-runtime/runtime';

import ssr from './render/ssr'

import {
  getMtgGraphqlBaseUrl
 } from '../services'

const {
  IMAGE_FOLDER
  , PUBLIC_FOLDER
  , PUBLIC_IMAGE_PATH
  , PUBLIC_PATH
} = require('../config')

const configWebpack = require('../../webpack.config.js')(process.env.NODE_ENV, { mode: process.env.NODE_ENV})

export default () => {
  const compiler = webpack(configWebpack)
  const proxy = require('express-http-proxy')

  const staticImageFolder = express.static(IMAGE_FOLDER)

  const app: express.Application = express()

  app.use(compression())
  app.use(cookieParser())
  app.use(PUBLIC_IMAGE_PATH, staticImageFolder)

  // const mtgCardSearchUrl = getMtgGraphqlBaseUrl()
  // app.use('/card-search', proxy(mtgCardSearchUrl, {
  //   proxyReqPathResolver: (req: express.Request) => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(function () {
  //         var updatedPath = '/card-search' + req.url
  //         resolve(updatedPath);
  //       }, 200)
  //     })
  //   }
  // }))

  if (process.env.NODE_ENV === 'development') {
    // CURRENTLY NEVER GETS HERE
    app.use(morgan('dev'))
    const middleware = require('webpack-dev-middleware')
    const instance = middleware(compiler, {
      noInfo: true,
      publicPath: configWebpack.output.publicPath,
      serverSideRender: true,
      watchOptions: {
        poll: true
      },
      writeToDisk: true
    })

    instance.waitUntilValid(() => { console.log('Package is in a valid state') })
  } else {
    const prodPublicImageFolder = express.static(PUBLIC_FOLDER)

    app.use(PUBLIC_PATH, prodPublicImageFolder)
    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        return
      }

      if(stats) {
        console.log(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  }

  app.get('/favicon.ico', (req, res) => {
    res.status(404).send().end()
  })

  app.get('*', ssr)

  return app
}
