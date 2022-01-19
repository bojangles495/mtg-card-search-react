export type IGetComponentProps = (props?: object) => object

export type INamespace = (path?: string) => string

export enum AssetTypes {
  LINK = "link",
  SCRIPT = "script"
}

export type MetaType = {
  attribute: string
  value: string
  content: string
}

export type LinkType = {
  type: AssetTypes.LINK
  rel: string
  href: string
  as?: string
}

export type InlineScriptType = {
  type: AssetTypes.SCRIPT
  async?: never
  inline?: true
  src?: never
  content: string
}

export type ExternalScriptType = {
  type: AssetTypes.SCRIPT
  async?: boolean
  inline?: false
  src: string
  content?: never
}

export type ScriptType = InlineScriptType | ExternalScriptType

export type AssetType = LinkType | ScriptType

export type PageType = {
  meta: MetaType[]
  assets: AssetType[]
}
