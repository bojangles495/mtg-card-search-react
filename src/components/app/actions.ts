import urlTemplate from 'url-template';
import { Dispatch } from 'redux'

import { getMtgGraphqlBaseUrl, getMtgUserInfoBaseUrl, getRequestInit } from '../../services'

import { CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST,
  GET_APP_CONTENT_FAILURE, GET_APP_CONTENT_STARTED,
  GET_APP_CONTENT_SUCCESS,
  SET_FORM_CARD_NAME,
  UPDATE_ACTIVE_CARD_BY_SET,
  SET_CARD_SEARCH_FORM_RESULTS
} from '../application-types/action-types/constants';
import { Action } from '../application-types/action-types/action/types';
import { CardSearchGraphQLResponse } from '../application-types/sever-response-types/graphql-response/types';
import { CardSearchUserCatalogResponse } from '../application-types/sever-response-types/user-info-response/types';
import { ActiveCardBySet, CardSearchFormResults } from '../application-types/component-related-types/card-element-specific-types/types';

export const getAppContentStarted = (): Action => ({
    type: GET_APP_CONTENT_STARTED
})

export const getAppContentSuccess = (): Action => ({
  type: GET_APP_CONTENT_SUCCESS
})

export const getAppContentFailure = (): Action => ({
  type: GET_APP_CONTENT_FAILURE
})

export const clearGraphQLCardSearchResult = (): Action => ({
  type: CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
})

export const setFormCardName = (formValue: string): Action => ({
  type: SET_FORM_CARD_NAME
, payload: { value: formValue }
})

export const updateActiveCardBySet = (activeCardBySet: ActiveCardBySet): Action => ({
  type: UPDATE_ACTIVE_CARD_BY_SET
, payload: { value: activeCardBySet }
})

export const setCardSearchFormResults = ({cardSearchResults, userCatalogResults}: CardSearchFormResults): Action => ({
  type: SET_CARD_SEARCH_FORM_RESULTS
, payload: { value: {cardSearchResults, userCatalogResults} }
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

export const getCardInformationBySearch = (dispatch: Dispatch) => async (cardName: string) => {
  const query = `{ getCardByCardName(cardName: "${cardName}") { setId setName card { name uuid originalText text } } }`

  dispatch(getAppContentStarted())

  try {
    const getAppContentResponse: Response = await cardSearchQraphql(query)
    const getAppUserInfoResponse: Response = await cardSearchUserCatalog(cardName)

    const cardSearchFormResults: CardSearchFormResults = {cardSearchResults: [], userCatalogResults: []}

    if(getAppUserInfoResponse.status === 200) {
      const getUserCatalogBody: CardSearchUserCatalogResponse = await getAppUserInfoResponse.json()

      cardSearchFormResults.userCatalogResults = getUserCatalogBody._embedded.userRecords
    }

    if (getAppContentResponse.status === 200) {
      const getAppContentData: CardSearchGraphQLResponse = await getAppContentResponse.json()

      cardSearchFormResults.cardSearchResults = getAppContentData.data.getCardByCardName

      dispatch(getAppContentSuccess())
    } else {
      throw 'Internal Server Error'
    }

    dispatch(setCardSearchFormResults(cardSearchFormResults))
  } catch (error) {
    dispatch(getAppContentFailure())
  }
}
