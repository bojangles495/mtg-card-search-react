import urlTemplate from 'url-template';
import { getMtgGraphqlBaseUrl, getMtgUserInfoBaseUrl, getRequestInit } from '../../services'
import { Action, CardSearchGraphQLResponse, CardSearchUserCatalogResponse, CardContainer, UserCardRecord } from './types'
import { Dispatch } from 'redux'
import {
  CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
, GET_APP_CONTENT_STARTED
, GET_APP_CONTENT_SUCCESS
, GET_APP_CONTENT_FAILURE
, SET_FORM_CARD_NAME
, SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
, SET_USER_CATALOG_RECORDS} from './constants'

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

export const setUserCatalogRecordsResult = (userCatalogResults: UserCardRecord[]): Action => ({
  type: SET_USER_CATALOG_RECORDS
, payload: { value: userCatalogResults }
})

const getHeaders = (): Headers => {
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    return headers
}

export const cardSearchQraphql = async (query: string): Promise<Response> => {
  const getGraphqlTemplate = urlTemplate.parse('graphql')
  const relativeURL = getGraphqlTemplate.expand({})
  const baseURL = getMtgGraphqlBaseUrl()

  const input = new URL(relativeURL, baseURL).href

  const body = JSON.stringify({ query })

  const init = getRequestInit('POST', getHeaders(), body)

  const response = await fetch(input, init)

  return response
}

export const cardSearchUserCatalog = async (cardName: string): Promise<Response> => {
  const getUserInfoTemplate = urlTemplate.parse('card-search/userCardsByName{?cardName}')
  const relativeURL = getUserInfoTemplate.expand({ cardName })
  const baseURL = getMtgUserInfoBaseUrl()

  const input = new URL(relativeURL, baseURL).href

  const init = getRequestInit('GET', getHeaders())

  const response = await fetch(input, init)

  return response
}

export const queryCardSearch = (dispatch: Dispatch) => async (query: string, cardName: string) => {
  dispatch(getAppContentStarted())

  try {
    const getAppContentResponse: Response = await cardSearchQraphql(query)
    const getAppUserInfoResponse: Response = await cardSearchUserCatalog(cardName)

    if(getAppUserInfoResponse.status === 200) {
      const getUserCatalogBody: CardSearchUserCatalogResponse = await getAppUserInfoResponse.json()

      dispatch(setUserCatalogRecordsResult(getUserCatalogBody._embedded.userRecords))
    }

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
