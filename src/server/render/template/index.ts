import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

import { PLACEHOLDER, PRELOADED_STATE, PRELOADED_STATE_PLACEHOLDER_ID } from '../../../config'
import generateLinkTags from './generate-link-tags'
import generateMetaTags from './generate-meta-tags'
import generateScriptTags from './generate-script-tags'
import { PageType } from './types'
import { State } from '../../../helpers/createStore'

const helmet = Helmet.renderStatic()

export const htmlTemplate = (RootComponent: JSX.Element, reduxState: State, page: PageType) => {
  const reactDOM = renderToString(RootComponent)
  const stateAsString = serialize(reduxState)
  return `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="theme-color" content="#f2a901">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${generateMetaTags(page.meta)}
        ${generateLinkTags(page.assets)}
        <!-- Fix for FOUT
        <script type="text/javascript">
          const root = document.getElementsByTagName('html')[0]
          root.setAttribute( 'class', 'hidden' )
          (() => { htmlTag.setAttribute( 'class', '' ) })
        </script> -->
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id=${PLACEHOLDER}>${reactDOM}</div>
        <div id="modal-root"></div>
        <script id=${PRELOADED_STATE_PLACEHOLDER_ID}>window.${PRELOADED_STATE}=${stateAsString}</script>
        ${generateScriptTags(page.assets)}
      </body>
    </html>
    `
}
