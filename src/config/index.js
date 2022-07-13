'use strict'

const path = require('path')

const env_config = require('./config.json')

const CLIENT_PORT = '3000'
const GRAPHQL_PORT = '7846'
const USER_CATALOG_PORT = '7888'
const HOST = 'xxx.xxx.x.x'

const createUrlPath = (port) => {
  return `http://${HOST}:${port}`
}

const DEV_BASE_URL = createUrlPath(CLIENT_PORT)
const GRAPHQL_BASE_URL = createUrlPath(GRAPHQL_PORT)
const USER_CATALOG_BASE_URL = createUrlPath(USER_CATALOG_PORT)

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST,
  PORT: CLIENT_PORT,
  MTGSEARCH_BASE_URL: DEV_BASE_URL,
  MTG_GRAPHQL_BASE_URL: GRAPHQL_BASE_URL,
  MTG_USER_INFO_BASE_URL: USER_CATALOG_BASE_URL,
  ASSET_PATH: env_config.ASSET_PATH || '/public',
  IMAGE_FOLDER: path.resolve(__dirname, '..', '..', 'src', 'images'),
  PUBLIC_FOLDER: path.resolve(__dirname, '..', '..', 'public'),
  PUBLIC_IMAGE_PATH: '/image/',
  PUBLIC_PATH: '/public',
  MTG_APP_COOKIE_NAME: env_config.MTG_APP_COOKIE_NAME || 'MTGAPPTOKEN',
  PLACEHOLDER: env_config.PLACEHOLDER || 'react-app-placeholder',
  PRELOADED_STATE: env_config.PRELOADED_STATE || '__PRELOADED_STATE__',
  PRELOADED_STATE_PLACEHOLDER_ID: env_config.PRELOADED_STATE_PLACEHOLDER_ID || 'redux-preloaded-state-script-id',
  DEV: DEV_BASE_URL
}

module.exports = config
