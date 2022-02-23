import { connect } from 'react-redux'
import { Dispatch, Store } from 'redux'
import { List } from 'immutable'

import { makeComponent } from './component'
import { State, AppRouterProps } from './types'
import { clearGraphQLCardSearchResult
, getAppContentFailure
, getAppContentStarted
, getAppContentSuccess
, queryCardSearch
, setFormCardName} from './actions'

export const makeConnector = <S>(mapStateToSlice: (state: S) => ({ app: State })) => {
  const mapStateToProps = (state: S, routerProps: AppRouterProps) => {
    const slice = mapStateToSlice(state)

    const props = { loading: slice.app.loading
      , form: slice.app.form
      , cardSearchResult: slice.app.cardSearchResult
      , userCatalogResult: slice.app.userCatalogResult
      }

    return props
  }
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      clearGraphQLCardSearchResult: () => dispatch(clearGraphQLCardSearchResult())
    , getAppContentStarted: () => dispatch(getAppContentStarted())
    , getAppContentSuccess: () => dispatch(getAppContentSuccess())
    , queryCardSearch: queryCardSearch(dispatch)
    , setFormCardName: (formValue: string) => dispatch(setFormCardName(formValue))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)
}

export const makeContainer = <S>(mapStateToSlice: (state: S) => ({ app: State })) => makeConnector(mapStateToSlice)(makeComponent())
