import { Store } from 'redux'
export { }

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    __PRELOADED_STATE__: any
    serviceEndpoint: string
  }
}
declare global {
  type LoadData<T> = (store: Store, mtgSearchAppCookie?: string) => Promise<T>
}

declare global {
  namespace NodeJS {
    interface Global {
      window: Window
    }
  }

  namespace Express {
    interface Response {
      locals: any
    }
  }
}

declare var serviceEndpoint: string

