import React from 'react'
import { Link } from 'react-router-dom'
import { AppContainer } from './components'

const Routes = [
  {
    path: "/",
    element: <AppContainer />,
    children: []
  },
  { path: "home", element: <AppContainer /> },
  { path: "about", element: <AppContainer /> },
  { path: "no-match", element: <AppContainer /> }
]

export { Routes }
