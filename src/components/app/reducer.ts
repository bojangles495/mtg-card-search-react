import { INITIAL_STATE } from './state'
import { List, Record } from 'immutable';

import { CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST,
  GET_APP_CONTENT_FAILURE,
  GET_APP_CONTENT_STARTED,
  GET_APP_CONTENT_SUCCESS,
  SET_FORM_CARD_NAME,
  SET_CARD_SEARCH_FORM_RESULTS
} from '../application-types/action-types/constants';

import { ActiveSelectedCardBySetRecord,
  CardElementContainerRecord,
  CardSearchFormResults,
  UniqueInfoBySetRecord
} from '../application-types/component-related-types/card-element-specific-types/types';

import { State } from '../application-types/state-types/types';
import { Action } from '../application-types/action-types/action/types';
import { CardContainer } from '../application-types/sever-response-types/graphql-response/types';
import { UserCardRecord } from '../application-types/sever-response-types/user-info-response/types';

export const reducer = (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case CLEAR_GRAPHQL_CARD_SEARCH_RESULT_LIST: {
      return state;
    }

    case GET_APP_CONTENT_STARTED: {
      return state.set('loading', true)
    }

    case GET_APP_CONTENT_SUCCESS: {
      return state.set('loading', false)
    }

    case SET_FORM_CARD_NAME: {
      return state.setIn(['form', 'cardName', 'value'], action.payload.value)
    }

    case SET_CARD_SEARCH_FORM_RESULTS: {
      const listOfCardElementContainerRecords: List<CardElementContainerRecord> = createListOfCardElementContainers(action.payload.value)

      return state.set("cardSearchFormResults", listOfCardElementContainerRecords)
    }

    default: return state
  }
}

// Create Records
export const makeActiveSelectedCardBySetRecord = (uniqueInfoBySetRecord: UniqueInfoBySetRecord): ActiveSelectedCardBySetRecord => {
  const cardSetCode: string = uniqueInfoBySetRecord.setCode
  const cardSetName: string = uniqueInfoBySetRecord.setName
  const cardSetUuid: string = uniqueInfoBySetRecord.uuid
  const cardOriginalText: string = uniqueInfoBySetRecord.originalText
  const cardGenericText: string = uniqueInfoBySetRecord.genericText

  return Record({ uuid: cardSetUuid
    , setName: cardSetName
    , setCode: cardSetCode
    , originalText: cardOriginalText
    , genericText: cardGenericText
    , originalOwnedQuantity: uniqueInfoBySetRecord.ownedQuantity
    , modifiedOwnedQuantity: uniqueInfoBySetRecord.ownedQuantity
    , isDirty: false
  })()
}

export const makeUniqueInfoBySetRecord = (cardContainer: CardContainer, listOfUserCardRecord : List<UserCardRecord>): UniqueInfoBySetRecord => {
  const cardSetCode: string = cardContainer.setId
  const cardSetName: string = cardContainer.setName
  const cardSetUuid: string = cardContainer.card.uuid
  const cardOriginalText: string = cardContainer.card.originalText
  const cardGeneralText: string = cardContainer.card.text
  const uniqueCardTotalForUserRecord = getuniqueCardTotalFromUserRecordMachingSearchCardIfAvailable(cardContainer, listOfUserCardRecord)

  return Record({ uuid: cardSetUuid
    , setCode: cardSetCode
    , setName: cardSetName
    , originalText: cardOriginalText
    , genericText: cardGeneralText
    , ownedQuantity: uniqueCardTotalForUserRecord
  })()
}

export const makeCardElementContainerRecord = (cardContainer: CardContainer, uniqueInfoBySetRecord: UniqueInfoBySetRecord): CardElementContainerRecord => {
  const cardName: string = cardContainer.card.name

  return Record({ cardName
    , totalOwnedQuantity: uniqueInfoBySetRecord.ownedQuantity
    , activeSelectedSet: makeActiveSelectedCardBySetRecord(uniqueInfoBySetRecord)
    , setInfo: List([uniqueInfoBySetRecord])
  })()
}

// Find Record By Filter
const findCardElementContainerRecordByCardName = (cardName: string, accumulator: List<CardElementContainerRecord>): number => {
  return accumulator.findIndex((value: CardElementContainerRecord) => {
    return cardName === value.cardName
  })
}

const findCorrespondingUserCardRecordForSearchCard = (cardContainer: CardContainer, listOfUserCardRecord : List<UserCardRecord>): UserCardRecord | undefined => {
  return listOfUserCardRecord.find( (userCardRecord: UserCardRecord): boolean => {
    return cardContainer.card.name === userCardRecord.name && cardContainer.setId === userCardRecord.cardSet && cardContainer.card.uuid === userCardRecord.uuid
  })
}

// Auxillary
const getuniqueCardTotalFromUserRecordMachingSearchCardIfAvailable = (cardContainer: CardContainer, listOfUserCardRecord : List<UserCardRecord>): number => {
  const correspondingUserCardRecord = findCorrespondingUserCardRecordForSearchCard(cardContainer, listOfUserCardRecord)

  if(undefined === correspondingUserCardRecord) {
    return 0
  } else {
    return correspondingUserCardRecord.quantity
  }
}

const processCardElement = (cardContainer: CardContainer, listOfUserCardRecord : List<UserCardRecord>, accumulator: List<CardElementContainerRecord>): List<CardElementContainerRecord> => {
  const foundCardElementContainerRecordIndex: number = findCardElementContainerRecordByCardName(cardContainer.card.name, accumulator)
  const uniqueInfoCardRecord: UniqueInfoBySetRecord = makeUniqueInfoBySetRecord(cardContainer, listOfUserCardRecord)
  const newCardElementContainer: CardElementContainerRecord = makeCardElementContainerRecord(cardContainer, uniqueInfoCardRecord)

  if(-1 === foundCardElementContainerRecordIndex) {
    return accumulator.push(newCardElementContainer)
  } else {
    return accumulator.update(foundCardElementContainerRecordIndex
      , newCardElementContainer
      , (cardElementContainerRecord: CardElementContainerRecord): CardElementContainerRecord => {
        return cardElementContainerRecord
          .update("totalOwnedQuantity", (totalOwnedQuantity: number): number => {
            return totalOwnedQuantity + uniqueInfoCardRecord.ownedQuantity
          })
          .update("setInfo", (listOfUniqueInfoRecords: List<UniqueInfoBySetRecord>): List<UniqueInfoBySetRecord> => {
            return listOfUniqueInfoRecords.push(uniqueInfoCardRecord)
          })
      }
    )
  }
}

const createListOfCardElementContainers = (cardSearchFormResults: CardSearchFormResults): List<CardElementContainerRecord> => {
  const listOfCardSearchResults: List<CardContainer> = List(cardSearchFormResults.cardSearchResults)
  const listOfUserCardRecord : List<UserCardRecord> = List(cardSearchFormResults.userCatalogResults)

  return listOfCardSearchResults
    .valueSeq()
    .reduce((accumulator: List<CardElementContainerRecord>, cardContainer: CardContainer, key: number): List<CardElementContainerRecord> => processCardElement(cardContainer, listOfUserCardRecord, accumulator), List())
}
