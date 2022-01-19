import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import {
  AssetType as SsrAssetType,
  AssetTypes as SsrAssetTypes,
} from './types'

import { PUBLIC_FOLDER } from '../../../config'

const fileExists = promisify(fs.exists)

const getAssetsFromManifest = async (res: Express.Response) => {
  const manifest = path.join(PUBLIC_FOLDER, 'inventory.json')
  let assets = {}
  try {
    const exists = await fileExists(manifest)
    if (exists) {
      assets = require(manifest)
    }
    return assets

  } catch (err) {
    console.error(err)
    return assets
  }
}

export const generateAssets = async (rootPath: string, res: Express.Response) => {
  let manifest: { [key: string]: string } = await getAssetsFromManifest(res)
  let assetTypes = Object.values(manifest).flat().reduce((acc, val) => {
    if (val.includes('.map')) {
      return acc
    }
    const assetSplitted = val.split('.')

    return { ...acc, [assetSplitted[0] + '.' + assetSplitted[2]]: val }
  }, {})

  const assetKeys = Object.keys(assetTypes)
  const assets: SsrAssetType[] = []

  assetKeys
    .sort(a => {
      if (a === manifest[a]) {
        return -1
      } else if (a.startsWith('app.')) {
        return 1
      } else {
        return -1
      }
    })
    .forEach((asset) => {
      if (asset.endsWith('.js')) {
        assets.push({
          type: SsrAssetTypes.SCRIPT,
          src: `${rootPath}/${manifest[asset]}`,
          async: true
        })
      } else if (asset.endsWith('.css')) {
        assets.push({
          type: SsrAssetTypes.LINK,
          rel: 'stylesheet',
          href: `${rootPath}/${manifest[asset]}`
        })
      }
    })

  return assets
}
