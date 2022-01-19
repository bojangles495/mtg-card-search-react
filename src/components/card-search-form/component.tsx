import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'

import { FormContainer } from '../app'

interface CardSearchFormProps  {
  setFormCardName: Function
  form: FormContainer
}

const Component: React.FunctionComponent<CardSearchFormProps> = (props) => {
  const renderContent = (props: CardSearchFormProps) => {
    return (
      <>
        <Form.Group className="">
          <Form.Label>Card Name:</Form.Label>
          <Form.Control value={props.form.cardName.value} placeholder="card name" onChange={(event) => props.setFormCardName(event.target.value)} />
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
