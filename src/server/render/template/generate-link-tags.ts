import { AssetType, AssetTypes, LinkType } from './types'

export default (assets: readonly AssetType[] = []): string => assets
  .filter((asset) => asset.type === AssetTypes.LINK)
  .map((asset: AssetType) => {
    const link: LinkType = (asset as LinkType)
    return `<link rel=${link.rel} href=${link.href} />`
  })
  .join('\n')
