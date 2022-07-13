import { List, Record } from 'immutable'
import { CardContainer } from '../../sever-response-types/graphql-response/types'
import { UserCardRecord } from '../../sever-response-types/user-info-response/types'


export interface CardSearchFormResults {
  cardSearchResults: CardContainer[]
  userCatalogResults: UserCardRecord[]
}

export interface ActiveCardBySet {
  set: string // can remove eventually
  cardName: string // can remove eventually
  setQuantity: number // can remove eventually

  uuid: string
  setName: string
  setCode: string
  originalOwnedQuantity: number
  modifiedOwnedQuantity: number
  isDirty: boolean
}

///////////////////
export type ActiveSelectedCardBySetInterface = {
  uuid: string
  setName: string
  setCode: string
  originalText: string
  genericText: string
  originalOwnedQuantity: number
  modifiedOwnedQuantity: number
  isDirty: boolean
}

export interface ActiveSelectedCardBySetRecord extends Record<ActiveSelectedCardBySetInterface>, ActiveSelectedCardBySetInterface {}

export type UniqueInfoBySetInterface = {
  uuid: string
  setCode: string
  setName: string
  originalText: string
  genericText: string
  ownedQuantity: number
}

export interface UniqueInfoBySetRecord extends Record<UniqueInfoBySetInterface>, UniqueInfoBySetInterface {}

export type CardElementContainerInterface = {
  cardName: string
  totalOwnedQuantity: number
  activeSelectedSet: ActiveSelectedCardBySetRecord
  setInfo: List<UniqueInfoBySetRecord>
}

export interface CardElementContainerRecord extends Record<CardElementContainerInterface>, CardElementContainerInterface {}
