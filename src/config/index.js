'use strict'

const path = require('path')

const env_config = require('./config.json')
const PORT = '3000'
const DEV = 'http://localhost:' + PORT

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: '127.0.0.1',
  PORT,
  MTGSEARCH_BASE_URL: DEV,
  MTG_GRAPHQL_BASE_URL: 'http://localhost:7846',
  MTG_USER_INFO_BASE_URL: 'http://localhost:7888',
  ASSET_PATH: env_config.ASSET_PATH || '/public',
  IMAGE_FOLDER: path.resolve(__dirname, '..', '..', 'src', 'images'),
  PUBLIC_FOLDER: path.resolve(__dirname, '..', '..', 'public'),
  PUBLIC_IMAGE_PATH: '/image/',
  PUBLIC_PATH: '/public',
  MTG_APP_COOKIE_NAME: env_config.MTG_APP_COOKIE_NAME || 'MTGAPPTOKEN',
  PLACEHOLDER: env_config.PLACEHOLDER || 'react-app-placeholder',
  PRELOADED_STATE: env_config.PRELOADED_STATE || '__PRELOADED_STATE__',
  PRELOADED_STATE_PLACEHOLDER_ID: env_config.PRELOADED_STATE_PLACEHOLDER_ID || 'redux-preloaded-state-script-id',
  DEV
}

module.exports = config
