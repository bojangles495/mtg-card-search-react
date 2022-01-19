import * as App from '../components/app'
import { State } from '../helpers/createStore'

const AppContainer = App.makeContainer((state: State) => ({ app: state.appState }))

export { AppContainer }

