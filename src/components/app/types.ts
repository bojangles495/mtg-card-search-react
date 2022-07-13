import { ConnectedProps } from 'react-redux'

import { makeConnector, makeContainer } from './container'

export type OwnProps = {}

export type AppProps = OwnProps & ConnectedProps<ReturnType<typeof makeConnector>>

export type AppRouterProps = {}

export type Container = ReturnType<typeof makeContainer>
