import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, ButtonGroup, Button, Card, CardGroup, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'

import { CardContainer, UserCardRecord } from '../app'
import { RenderCardElement, RenderCardElements } from './types'
import { List } from 'immutable'

interface CardsLayoutProps  {
  cardSearchResults: List<CardContainer>
  userCatalogResults: List<UserCardRecord>
}

const Component: React.FunctionComponent<CardsLayoutProps> = (props) => {
  const getCardText = (currentlySelectSet: string, cards: RenderCardElements): String | undefined => {
    if(currentlySelectSet) {
      const filteredCard = cards.details?.find(renderCardElement => currentlySelectSet === renderCardElement.set)

      if(filteredCard) {
        return filteredCard.text
      } else {
        return
      }
    } else {
      const filteredCard = cards.details?.get(0)

      if(filteredCard) {
        return filteredCard.text
      } else {
        return
      }
    }
  }

  const isActive = (currentlySelectSet: string, card: RenderCardElement, currentIndex: number): boolean | undefined => {
    if(currentlySelectSet && card.set) {
      return currentlySelectSet === card.set
    } else if(0 == currentIndex) {
      return true
    } else {
      return false
    }
  }

  const createCardDetailElementKey = (cardName: string | undefined, cardSet: string | undefined, cardNameIndex: number): string => {
    if(cardName && cardSet) {
      return cardName + cardSet + cardNameIndex
    } else if(cardName) {
      return "undefined-"+cardName + cardNameIndex
    } else if(cardSet) {
      return "undefined-"+cardSet + cardNameIndex
    } else {
      return "undefined"
    }
  }

  const createCardElementKey = (cardName: string | undefined, cardNameIndex: number): string => {
    if(cardName) {
      return "undefined-"+cardName+cardNameIndex
    }  else {
      return "undefined"
    }
  }

  const tempCurrSelected = ""

  const renderContent = (props: CardsLayoutProps) => {
    const userCatalogResult = props.userCatalogResults

    const renderList = props.cardSearchResults.valueSeq()
      .reduce((accumulator: List<RenderCardElements>, cardContainer: CardContainer, key: number): List<RenderCardElements> => {
        const cardName: string = cardContainer.card.name
        const foundElement: number = accumulator.findIndex((value: RenderCardElements) => {
          return value.name === cardName
        })

        const quantity: number = userCatalogResult.reduce((accum, value: UserCardRecord, Key) => {
          if(value.name === cardName && value.cardSet === cardContainer.setId && value.uuid == cardContainer.card.uuid) {
            accum = value.quantity
          }

          return accum
        }, 0)

        const uniqueCardDetail: RenderCardElement = {
            uuid: cardContainer.card.uuid
          , set: cardContainer.setId
          , setName: cardContainer.setName
          , originalText: cardContainer.card.originalText
          , text: cardContainer.card.text
          , quantity
        }

        if(-1 == foundElement) {
          const details: List<RenderCardElement> = List([uniqueCardDetail])

          const newElement: RenderCardElements = { name: cardName, details }

          return accumulator.push(newElement)
        } else {
          return accumulator.update(foundElement, (renderCardElements): RenderCardElements => {
            if(renderCardElements?.details) {
              const details: List<RenderCardElement> = renderCardElements?.details?.push(uniqueCardDetail)

              renderCardElements.details = details

              return renderCardElements
            } else {
              return {}
            }
          })
        }
      }, List())

    return (
      <Row xs={1} md={2} className="g-4">
        {
          renderList.valueSeq()
            .map((renderCardElements, cardIndex) => {
              const cardElementKey = createCardElementKey(renderCardElements.name, cardIndex)
              return (
                <Col key={cardElementKey}>
                  <Card key={cardElementKey}>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>{renderCardElements.name}</Card.Title>
                      <Card.Text>
                        { getCardText(tempCurrSelected, renderCardElements) }
                      </Card.Text>
                      <DropdownButton id="dropdown-basic-button" title="Card Sets" key={cardElementKey}>
                        {
                          renderCardElements.details?.valueSeq()
                            .map((renderCardElement, currentIndex) => {
                              return (
                                <Dropdown.Item
                                  key={createCardDetailElementKey(renderCardElements.name, renderCardElement.set, currentIndex)}
                                  active={ isActive(tempCurrSelected, renderCardElement, currentIndex) }
                                  onClick={() => {console.log("CLICKED ON SET:::")}}
                                >
                                    { renderCardElement.setName }
                                </Dropdown.Item>
                              )
                            })
                        }
                      </DropdownButton>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
        }
      </Row>
    )
  }

  return (
    <React.Fragment>
      {renderContent(props)}
    </React.Fragment>
  )
}

export default Component
