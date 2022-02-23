import { INITIAL_STATE } from './state'
import { State, Action } from './types'
import {
  CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
, GET_APP_CONTENT_STARTED
, GET_APP_CONTENT_SUCCESS
, SET_FORM_CARD_NAME
, SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
, SET_USER_CATALOG_RECORDS
} from './constants'
import { List } from 'immutable';

export const reducer = (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST: {
      return state;
    }

    case GET_APP_CONTENT_STARTED: {
      return state.set('loading', true)
    }

    case GET_APP_CONTENT_SUCCESS: {
      return state.set('loading', false)
    }

    case SET_FORM_CARD_NAME: {
      return state.setIn(['form', 'cardName', 'value'], action.payload.value)
    }

    case SET_GRAPHQL_CARD_SEARCH_RESULT_LIST: {
      return state.set('cardSearchResult', List(action.payload.value))
    }

    case SET_USER_CATALOG_RECORDS: {
      return state.set('userCatalogResult', List(action.payload.value))
    }

    default: return state
  }
}
