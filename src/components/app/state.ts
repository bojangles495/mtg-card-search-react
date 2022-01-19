import { Record, List } from 'immutable'
import { State, StateInterface } from './types'

export const makeState = (props: StateInterface): State => Record({ ...props })()

export const makeImmutableArray = <T>(anArray: T[]): List<T> => List(anArray)

const cardSearchResult = makeImmutableArray([])

export const INITIAL_STATE: State = makeState({
  loading: false
, form: { cardName: { value: "" } }
, cardSearchResult
})
