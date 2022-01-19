import { ConnectedProps } from 'react-redux'
import { Record, List } from 'immutable'
// import { RouteComponentProps } from 'react-router-dom'

import { ToImmutable } from '../../helpers/types'

// import { makeConnector, makeContainer } from './container'
import {GET_PEOPLE_STARTED
, SET_READY
} from './constants'

export interface GetPeopleStartedAction {
  type: typeof GET_PEOPLE_STARTED
}

export interface SetReadyAction {
  payload: boolean
  type: typeof SET_READY
}

export type Action = GetPeopleStartedAction | SetReadyAction

export type OwnProps = {}

export type PathParams = {
  userId: string
}

// export type OwnPropsWithRouter = OwnProps & RouteComponentProps<PathParams>
export type OwnPropsWithRouter = OwnProps
export type Props = OwnProps //& ConnectedProps<ReturnType<typeof makeConnector>>

// export type Container = ReturnType<typeof makeContainer>

export enum FormTypes {
  MODIFY
  , CREATE
  , DELETE
}

export type User = {
  id: string
}

export type CardSearchPageDefinition = {}

export type CardSearchPageDefinitionRecord = ToImmutable<CardSearchPageDefinition>

export type StateInterface = {
  cardSearchPage: CardSearchPageDefinition
}

export type StateInterfaceRecord = {
  cardSearchPage: CardSearchPageDefinitionRecord
}

export interface State extends Record<StateInterfaceRecord>, StateInterfaceRecord {}
