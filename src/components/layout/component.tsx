import React, { Key, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ButtonGroup, Button, Card } from 'react-bootstrap'
import { List } from 'immutable'

import { FormContainer, CardContainer } from '../app'
import CardSearchForm from '../card-search-form'
import { number } from 'prop-types'

interface LayoutProps  {
  loading: boolean
  cardSearchResult: List<CardContainer>
  form: FormContainer
  getAppContentStarted: Function
  getAppContentSuccess: Function
  setFormCardName: Function
  queryCardSearch: Function
}


interface RenderCardElement {
  uuid?: String
  set?: String
  originalText?: String
  text?: String
}

interface RenderCardElements {
  name?: String
  details?: List<RenderCardElement>
}

const Component: React.FunctionComponent<LayoutProps> = (props) => {
  const renderHeader = () => {
    return (
      <CardSearchForm setFormCardName={props.setFormCardName} form={props.form} />
    )
  }

  const getContent = () => {
      const query = `{ getCardByCardName(cardName: "${props.form.cardName.value}") { setId card { name uuid originalText text } } }`

      const cardResults = props.queryCardSearch(query)
  }

  const renderContent = (props: LayoutProps) => {
    return (
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={() => getContent()}>Search</Button>
      </ButtonGroup>
    )
  }

  const renderFooter = () => {
    const renderList = props.cardSearchResult.valueSeq()
      .reduce((accumulator: List<RenderCardElements>, cardContainer: CardContainer, key: number): List<RenderCardElements> => {
        const cardName: String = cardContainer.card.name
        const foundElement: number = accumulator.findIndex((value: RenderCardElements) => {
          return value.name === cardName
        })

        const uniqueCardDetail: RenderCardElement = { uuid: cardContainer.card.uuid
          , set: cardContainer.setId
          , originalText: cardContainer.card.originalText
          , text: cardContainer.card.text}

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
      <div>
        {
          renderList.valueSeq()
            .map(renderCardElements => {
              return (
                <div key={renderCardElements.name?.toString()}>
                  <br />
                  <div>Name: {renderCardElements.name}</div>
                  {
                    renderCardElements.details?.valueSeq()
                      .map(renderCardElement => {
                        return (
                          <div>
                            <br />
                            <div>SET: {renderCardElement.set}</div>
                            <div>UUID: {renderCardElement.uuid}</div>
                            <div>Original Text: {renderCardElement.originalText}</div>
                            <div>Text: {renderCardElement.text}</div>
                            <br />
                          </div>
                        )
                      })
                  }
                  <br />
                </div>
              )
            })
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      {renderHeader()}
      {renderContent(props)}
      {renderFooter()}
    </React.Fragment>
  )
}

export default Component
