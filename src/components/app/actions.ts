import urlTemplate from 'url-template';
import { getMtgGraphqlUrl, getRequestInit } from '../../services'
import { Action, CardSearchGraphQLResponse, CardContainer } from './types'
import { Dispatch } from 'redux'
import {
  CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
, GET_APP_CONTENT_STARTED
, GET_APP_CONTENT_SUCCESS
, GET_APP_CONTENT_FAILURE
, SET_FORM_CARD_NAME
, SET_GRAPHQL_CARD_SEARCH_RESULT_LIST} from './constants'

export const getAppContentStarted = (): Action => ({
    type: GET_APP_CONTENT_STARTED
})

export const getAppContentSuccess = (): Action => ({
  type: GET_APP_CONTENT_SUCCESS
})

export const getAppContentFailure = (): Action => ({
  type: GET_APP_CONTENT_FAILURE
})


export const setFormCardName = (formValue: string): Action => ({
  type: SET_FORM_CARD_NAME
, payload: { value: formValue }
})

export const clearGraphQLCardSearchResult = (): Action => ({
  type: CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
})
export const setGraphQLCardSearchResult = (cardSearchResults: CardContainer[]): Action => ({
  type: SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
, payload: { value: cardSearchResults }
})

const getHeaders = (): Headers => {
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    return headers
}

export const cardSearch = async (query: string): Promise<Response> => {
  const getGraphqlTemplate = urlTemplate.parse('graphql')
  const relativeURL = getGraphqlTemplate.expand({})
  const baseURL = getMtgGraphqlUrl()

  const input = new URL(relativeURL, baseURL).href

  const body = JSON.stringify({ query })

  const init = getRequestInit('POST', getHeaders(), body)

  const response = await fetch(input, init)

  return response
}

export const queryCardSearch = (dispatch: Dispatch) => async (query: string) => {
  dispatch(getAppContentStarted())

  try {
    const getAppContentResponse: Response = await cardSearch(query)

    if (getAppContentResponse.status === 200) {
      const getAppContentData: CardSearchGraphQLResponse = await getAppContentResponse.json()

      dispatch(setGraphQLCardSearchResult(getAppContentData.data.getCardByCardName))

      dispatch(getAppContentSuccess())
    } else {
      throw 'Internal Server Error'
    }
  } catch (error) {
    dispatch(getAppContentFailure())
  }
}
