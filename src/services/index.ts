const mtgJsonUrl: string = require('../config/index.js').MTGJSON_BASE_URL
const mtgGraphqlSearchUrl: string = require('../config/index.js').MTG_GRAPHQL_BASE_URL

export const inBrowser = () => (typeof document !== 'undefined')

type Method = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH"
type mode = "cors" | "no-cors"

export const getRequestInit = (method: Method, headers?: Headers, body?: BodyInit, mode?: mode, signal?: AbortController ) => {
  const init: RequestInit =
  {
    method
    , headers
    , body
    , mode
    , credentials: 'omit'
    , cache: 'default'
    , redirect: 'follow'
  }
  return init
}

export const getBaseUrl = () => new URL('/',  mtgJsonUrl)
export const getMtgGraphqlUrl = () => new URL('/', mtgGraphqlSearchUrl)
