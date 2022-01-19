import React from 'react'
import { Store } from 'redux'

import { htmlTemplate } from './template'
import SSRRootComponent from './root-component'
import { ServerContext } from './ssr'
import { generateAssets } from './template/generate-assets'
import { PageType } from './template/types'

const content = async (rootPath: string = '', url: string = '/', store: Store, context: ServerContext, res: Express.Response) => {
  let assets = await generateAssets(rootPath, res)
  const page: PageType = {
    meta: [],
    assets: assets
  }

  const RootComponent = <SSRRootComponent config={{ context, store, url }} />
  const html = htmlTemplate(RootComponent, store.getState(), page)

  return html
}

export default content
