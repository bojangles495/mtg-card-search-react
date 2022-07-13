import { Record, List } from 'immutable'
import { State, StateInterface } from '../application-types/state-types/types'

export const makeState = (props: StateInterface): State => Record({ ...props })()

export const makeImmutableArray = <T>(anArray: T[]): List<T> => List(anArray)

const cardSearchFormResults = makeImmutableArray([])

export const INITIAL_STATE: State = makeState({
  loading: false
, form: { cardName: { value: "" } }
, cardSearchFormResults
})
