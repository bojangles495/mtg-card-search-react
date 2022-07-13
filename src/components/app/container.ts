import { connect } from 'react-redux'
import { Dispatch, Store } from 'redux'
import { List } from 'immutable'

import { makeComponent } from './component'
import { AppRouterProps } from './types'
import { clearGraphQLCardSearchResult
, getAppContentFailure
, getAppContentStarted
, getAppContentSuccess
, getCardInformationBySearch
, setFormCardName
, updateActiveCardBySet} from './actions'
import { State } from '../application-types/state-types/types'
import { ActiveCardBySet } from '../application-types/component-related-types/card-element-specific-types/types';

export const makeConnector = <S>(mapStateToSlice: (state: S) => ({ app: State })) => {
  const mapStateToProps = (state: S, routerProps: AppRouterProps) => {
    const slice = mapStateToSlice(state)

    const props = { loading: slice.app.loading
      , form: slice.app.form
      , cardSearchFormResults: slice.app.cardSearchFormResults
      }

    return props
  }
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      clearGraphQLCardSearchResult: () => dispatch(clearGraphQLCardSearchResult())
    , getAppContentStarted: () => dispatch(getAppContentStarted())
    , getAppContentSuccess: () => dispatch(getAppContentSuccess())
    , getCardInformationBySearch: getCardInformationBySearch(dispatch)
    , setFormCardName: (formValue: string) => dispatch(setFormCardName(formValue))
    , updateActiveCardBySet: (activeCardBySet: ActiveCardBySet) => dispatch(updateActiveCardBySet(activeCardBySet))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)
}

export const makeContainer = <S>(mapStateToSlice: (state: S) => ({ app: State })) => makeConnector(mapStateToSlice)(makeComponent())
