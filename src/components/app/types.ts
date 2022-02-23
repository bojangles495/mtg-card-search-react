import { Record, List } from 'immutable'
import { ConnectedProps } from 'react-redux'

import { makeConnector, makeContainer } from './container'
import { CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
, GET_APP_CONTENT_STARTED
, GET_APP_CONTENT_SUCCESS
, GET_APP_CONTENT_FAILURE
, SET_FORM_CARD_NAME
, SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
, SET_USER_CATALOG_RECORDS
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

interface UserCatalogRecordResult {
  value: UserCardRecord[]
}

export interface SetGraphQLCardSearchResult {
  type: typeof SET_GRAPHQL_CARD_SEARCH_RESULT_LIST
  payload: GraphQLCardSearchResult
}

export interface SetUserCatalogRecordsResult {
  type: typeof SET_USER_CATALOG_RECORDS
  payload: UserCatalogRecordResult
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
  | SetUserCatalogRecordsResult


export interface FormContainer {
  cardName: FormInputString
}

export type StateInterface = {
  loading: boolean
  form: FormContainer
  cardSearchResult: List<CardContainer>
  userCatalogResult: List<UserCardRecord>
}

export interface State extends Record<StateInterface>, StateInterface { }

// CARD SEARCH RESULT - START
export interface Card {
  name: string
  uuid: string
  originalText: string
  text: string
}

export interface UserCardRecord {
  userUid: string
  uuid: string
  name: string
  cardSet: string
  quantity: number
}

export interface CardContainer {
  setId: string
  setName: string
  card: Card
}

export interface CardSearchGraphQLData {
  getCardByCardName: CardContainer[]
}

export interface CardSearchGraphQLResponse {
  data: CardSearchGraphQLData
}

interface Link {
  href: string
  rel: string
}

interface RelationLinks {
  self: Link
}

interface Embedded {
  userRecords: UserCardRecord[]
}

export interface CardSearchUserCatalogResponse {
  _embedded: Embedded
  _links?: RelationLinks
  links: string[]
}
// CARD SEARCH RESULT - END
