import { fromJS, isKeyed, Record } from 'immutable'

export const toDeepImmutable = (jsObject: any) => {
  let state = fromJS(jsObject, (_key, value) => isKeyed(value) ? Record(value.toObject())() : value.toList())

  return state.toObject()
}

export const canUseDOM = () => {
  return !!(typeof window !== 'undefined' && window.document)
}
