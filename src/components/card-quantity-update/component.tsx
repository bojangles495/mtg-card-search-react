import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, ButtonGroup, Button } from 'react-bootstrap'

import {} from '../app'

interface CardQuantityUpdateProps  {

}

const Component: React.FunctionComponent<CardQuantityUpdateProps> = (props) => {
  console.log("GOT IN THIS CARD QUANTITY UPDATE")
  const renderContent = (props: CardQuantityUpdateProps) => {
    console.log("GOT IN THE RENDER CONTENT")

    return (
      <>
        <Form.Group className="">
          <Form.Label>Card Quantity Change:</Form.Label>
          <Form.Control placeholder="card name" onChange={(event) => {}} />
          <Button variant="secondary" onClick={() => {}}>Save</Button>
        </Form.Group>
      </>
    )
  }

  return (
    <React.Fragment>
      {renderContent(props)}
    </React.Fragment>
  )
}

export default Component
