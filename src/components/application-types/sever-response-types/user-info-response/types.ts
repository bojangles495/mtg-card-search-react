interface Link {
  href: string
  rel: string
}

interface RelationLinks {
  self: Link
}

export interface UserCardRecord {
  userUid: string
  uuid: string
  name: string
  cardSet: string
  quantity: number
}

interface Embedded {
  userRecords: UserCardRecord[]
}

export interface CardSearchUserCatalogResponse {
  _embedded: Embedded
  _links?: RelationLinks
  links: string[]
}
