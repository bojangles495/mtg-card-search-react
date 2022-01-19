import React from 'react'
// import { StaticRouterContext } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

interface StaticContext { notFound?: boolean }
interface NotFoundProps { staticContext?: StaticContext }
const Component: React.FunctionComponent<NotFoundProps> = ({ staticContext = {} }) => {
  staticContext.notFound = true
  const location = useLocation()

  return (
    <div>
      <Helmet>
        <title>Page not found</title>
        <meta name="robots" content="noindex"></meta>
      </Helmet>
      <h1>Page Not Found</h1>
      <h2>URL: {location.pathname}</h2>
    </div>
  )
}

export default Component
