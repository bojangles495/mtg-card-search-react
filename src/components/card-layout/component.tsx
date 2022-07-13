import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { List } from 'immutable'

import { CardElement } from '../card-element'
import { CardElementContainerRecord } from '../application-types/component-related-types/card-element-specific-types/types'

interface CardsLayoutProps  {
  cardSearchFormResults: List<CardElementContainerRecord>
}

const Component: React.FunctionComponent<CardsLayoutProps> = (props) => {
  const renderContent = (props: CardsLayoutProps) => {
    return (
      <Row xs={1} md={2} className="g-4">
        {
          props.cardSearchFormResults
            .map((cardElementContainerRecord: CardElementContainerRecord) => {
              return (
                <CardElement
                  key={`card-element-${cardElementContainerRecord.cardName}`}
                  cardElementContainerRecord={cardElementContainerRecord}
                />
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
