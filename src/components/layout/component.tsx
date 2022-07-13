import React, { Key, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'
import { List } from 'immutable'

import {default as CardSearchForm } from '../card-search-form'
import { CardLayout } from '../card-layout'
import { CardContainer } from '../application-types/sever-response-types/graphql-response/types'
import { UserCardRecord } from '../application-types/sever-response-types/user-info-response/types'
import { FormContainer } from '../application-types/component-related-types/form-specific-types/types'
import { ActiveCardBySet, CardElementContainerRecord } from '../application-types/component-related-types/card-element-specific-types/types'

interface LayoutProps  {
  loading: boolean
  cardSearchFormResults: List<CardElementContainerRecord>
  form: FormContainer
  getAppContentStarted: Function
  getAppContentSuccess: Function
  setFormCardName: Function
  getCardInformationBySearch: Function
  updateActiveCardBySet: Function
}

const Component: React.FunctionComponent<LayoutProps> = (props) => {
  const renderHeader = () => {
    return (
      <CardSearchForm setFormCardName={props.setFormCardName} form={props.form} />
    )

  }

  const getContent = () => {
      props.getCardInformationBySearch(props.form.cardName.value)
  }

  const renderContent = (props: LayoutProps) => {
    return (
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={() => getContent()}>Search</Button>
      </ButtonGroup>
    )
  }

  const renderFooter = () => {
    return (
      <CardLayout
        cardSearchFormResults={props.cardSearchFormResults}
      />
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
