import { Record, List } from 'immutable'
import { ConnectedProps } from 'react-redux'

import { makeConnector, makeContainer } from './container'
import { CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
, GET_APP_CONTENT_STARTED
, GET_APP_CONTENT_SUCCESS
, GET_APP_CONTENT_FAILURE
, SET_FORM_CARD_NAME
, SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
} from './constants'

export type OwnProps = {}

export type AppProps = OwnProps & ConnectedProps<ReturnType<typeof makeConnector>>

export type AppRouterProps = {}

export type Container = ReturnType<typeof makeContainer>

export interface GetAppContentStartedAction {
  type: typeof GET_APP_CONTENT_STARTED
}

export interface GetAppContentSuccessAction {
  type: typeof GET_APP_CONTENT_SUCCESS
}

export interface GetAppContentFailureAction {
  type: typeof GET_APP_CONTENT_FAILURE
}

export interface SetFormCardName {
  type: typeof SET_FORM_CARD_NAME
  payload: FormInputString
}

interface FormInputString {
  value: string
}

interface GraphQLCardSearchResult {
  value: CardContainer[]
}

export interface SetGraphQLCardSearchResult {
  type: typeof SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
  payload: GraphQLCardSearchResult
}

export interface ClearGraphQLCardSearchResult {
  type: typeof CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
}

export type Action = ClearGraphQLCardSearchResult
  | GetAppContentStartedAction
  | GetAppContentSuccessAction
  | GetAppContentFailureAction
  | SetFormCardName
  | SetGraphQLCardSearchResult


export interface FormContainer {
  cardName: FormInputString
}

export type StateInterface = {
  loading: boolean
  form: FormContainer
  cardSearchResult: List<CardContainer>
}

export interface State extends Record<StateInterface>, StateInterface { }

// CARD SEARCH RESULT - START
export interface Card {
  name: String
  uuid: String
  originalText: String
  text: String
}

export interface CardContainer {
  setId: String
  card: Card
}

export interface CardSearchGraphQLData {
  getCardByCardName: CardContainer[]
}

export interface CardSearchGraphQLResponse {
  data: CardSearchGraphQLData
}
// CARD SEARCH RESULT - END
