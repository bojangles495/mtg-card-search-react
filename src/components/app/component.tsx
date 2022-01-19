import React, { useEffect } from 'react'
import { useNavigate, useRoutes, useLocation } from 'react-router-dom'
import { List } from 'immutable'

import Layout from '../layout'

import { AppProps } from './types'
import { Helmet } from 'react-helmet'

export const makeComponent = (): React.FunctionComponent<AppProps> => (props) => {
  return (
    <div className="c-MtgSearchApp">
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <Layout {...props} />
    </div>
  )
}
