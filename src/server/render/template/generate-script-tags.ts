import {
  AssetType,
  AssetTypes,
  ExternalScriptType,
  ScriptType
} from './types'

export default (assets: readonly AssetType[] = []): string => assets
  .filter((asset) => asset.type === AssetTypes.SCRIPT)
  .map(asset => {
    const script: ScriptType = (asset as ScriptType)
    if (script.inline) {
      return ""
    }
    const externalScript: ExternalScriptType = (script as ExternalScriptType)

    return `<script type="text/javascript" ${externalScript.async ? 'async' : ""} src=${externalScript.src}></script>`
  }).join('\n')
