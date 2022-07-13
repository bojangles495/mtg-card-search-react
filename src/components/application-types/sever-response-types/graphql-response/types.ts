export interface Card {
  name: string
  uuid: string
  originalText: string
  text: string
}

export interface CardContainer {
  setId: string
  setName: string
  card: Card
}

export interface CardSearchGraphQLData {
  getCardByCardName: CardContainer[]
}

export interface CardSearchGraphQLResponse {
  data: CardSearchGraphQLData
}
