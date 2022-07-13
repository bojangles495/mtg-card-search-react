import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, Col, Dropdown, DropdownButton, ButtonToolbar, ButtonGroup, Button, Form } from 'react-bootstrap'
import { CardElementContainerRecord, UniqueInfoBySetRecord } from '../application-types/component-related-types/card-element-specific-types/types'

interface CardElementProps  {
  cardElementContainerRecord: CardElementContainerRecord
}

const isActive = (cardElementContainerRecord: CardElementContainerRecord, uniqueInfoBySetRecord: UniqueInfoBySetRecord): boolean => {
  return cardElementContainerRecord.activeSelectedSet.uuid === uniqueInfoBySetRecord.uuid &&
    cardElementContainerRecord.activeSelectedSet.setCode === uniqueInfoBySetRecord.setCode
}

const getCardTitle = (cardElementContainerRecord: CardElementContainerRecord): string => {
  const cardName: string = cardElementContainerRecord.cardName
  const setName: string = cardElementContainerRecord.activeSelectedSet.setName
  const totalQuantity: number = cardElementContainerRecord.totalOwnedQuantity
  return `${cardName} (${setName}) Total Quantity: (${totalQuantity})`
}

const getCardText = (cardElementContainerRecord: CardElementContainerRecord): String => {
  if(null !== cardElementContainerRecord.activeSelectedSet.originalText) {
    return cardElementContainerRecord.activeSelectedSet.originalText
  } else if(null !== cardElementContainerRecord.activeSelectedSet.genericText) {
    return cardElementContainerRecord.activeSelectedSet.genericText
  } else {
    return "*No Text Available*"
  }
}

const Component: React.FunctionComponent<CardElementProps> = (props) => {
  return (
    <Col key={props.cardElementContainerRecord.cardName}>
      <Card key={props.cardElementContainerRecord.cardName}>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>{getCardTitle(props.cardElementContainerRecord)}</Card.Title>
          <Card.Text>
            { getCardText(props.cardElementContainerRecord) }
          </Card.Text>

          <ButtonToolbar>

            <ButtonGroup className="me-2" aria-label="First group">
              <DropdownButton id="dropdown-basic-button" title="Card Sets" key={props.cardElementContainerRecord.cardName} >
                <div style={{ height: "120px", overflowY: "auto" }}>
                  {
                    props.cardElementContainerRecord.setInfo
                      .map((uniqueInfoBySetRecord: UniqueInfoBySetRecord) => {
                        return (
                          <Dropdown.Item
                            key={uniqueInfoBySetRecord.uuid}
                            active={ isActive(props.cardElementContainerRecord, uniqueInfoBySetRecord) }
                            onClick={() => {
                              // props.updateActiveCardBySet({set: renderCardElement.set, cardName: props.renderCardElements.name, uuid: renderCardElement.uuid})
                            }}
                          >
                              { uniqueInfoBySetRecord.setName } ({ uniqueInfoBySetRecord.setCode } - {uniqueInfoBySetRecord.uuid} ({uniqueInfoBySetRecord.ownedQuantity}) )
                          </Dropdown.Item>
                        )
                      })
                  }
                </div>
              </DropdownButton>
            </ButtonGroup>

            <Form.Group className="me-2" controlId="formBasicNumberInput" style={{width: "40%", backgroundColor: "#0d6efd"}}>
              <Form.Label style={{textAlign: "right", clear: "both", float: "left", marginRight: "15px", marginLeft: "5px", marginTop: "10px"}}>
                Quantity:
              </Form.Label>
              <Form.Control
                style={{width: "25%", marginTop: "4px", marginBottom: "4px"}}
                type="number"
                placeholder="0"
                value={props.cardElementContainerRecord.activeSelectedSet.modifiedOwnedQuantity}
                onChange={(event) => {
                  console.log("VALUE:::::", event.target.value)
                }} />
            </Form.Group>

            <ButtonGroup className="me-2" aria-label="Four group">
              <Button>Update</Button>
            </ButtonGroup>

          </ButtonToolbar>

        </Card.Body>
      </Card>
    </Col>
  )
}

export default Component

