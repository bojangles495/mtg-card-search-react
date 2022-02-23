import { List } from 'immutable'

export interface RenderCardElement {
  uuid?: string
  set?: string
  setName?: string
  originalText?: string
  text?: string
  quantity: number
}

export interface RenderCardElements {
  name?: string
  details?: List<RenderCardElement>
}
