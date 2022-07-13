import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { FormContainer } from '../application-types/component-related-types/form-specific-types/types'

interface CardSearchFormProps {
  form: FormContainer
  setFormCardName: Function
}

const Component: React.FunctionComponent<CardSearchFormProps> = ({...props}) => {
  const renderContent = () => {
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
      {renderContent()}
    </React.Fragment>
  )
}

export default Component
