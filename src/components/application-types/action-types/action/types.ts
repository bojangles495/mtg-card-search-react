import { FormInputString } from "../../component-related-types/form-specific-types/types"
import { CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST,
  GET_APP_CONTENT_FAILURE,
  GET_APP_CONTENT_STARTED,
  GET_APP_CONTENT_SUCCESS,
  SET_FORM_CARD_NAME,
  UPDATE_ACTIVE_CARD_BY_SET,
  SET_CARD_SEARCH_FORM_RESULTS} from "../constants"
import { ActiveCardBySetPayload, CardFormSearchResultsPayload } from "../payload/types"

export interface GetAppContentStartedAction {
  type: typeof GET_APP_CONTENT_STARTED
}

export interface GetAppContentSuccessAction {
  type: typeof GET_APP_CONTENT_SUCCESS
}

export interface GetAppContentFailureAction {
  type: typeof GET_APP_CONTENT_FAILURE
}

export interface SetFormCardNameAction {
  type: typeof SET_FORM_CARD_NAME
  payload: FormInputString
}

export interface ClearGraphQLCardSearchResult {
  type: typeof CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST
}

export interface UpdateActiveCardBySetAction {
  type: typeof UPDATE_ACTIVE_CARD_BY_SET
  payload: ActiveCardBySetPayload
}

export interface SetCardSearchFormResultsAction {
  type: typeof SET_CARD_SEARCH_FORM_RESULTS
  payload: CardFormSearchResultsPayload
}

export type Action = ClearGraphQLCardSearchResult
  | GetAppContentStartedAction
  | GetAppContentSuccessAction
  | GetAppContentFailureAction
  | SetFormCardNameAction
  | UpdateActiveCardBySetAction
  | SetCardSearchFormResultsAction
