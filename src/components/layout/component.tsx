import React, { Key, useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'
import { List } from 'immutable'

import { FormContainer, CardContainer, UserCardRecord } from '../app'
import CardSearchForm from '../card-search-form'
import { CardLayout } from '../card-layout'

interface LayoutProps  {
  loading: boolean
  cardSearchResult: List<CardContainer>
  userCatalogResult: List<UserCardRecord>
  form: FormContainer
  getAppContentStarted: Function
  getAppContentSuccess: Function
  setFormCardName: Function
  queryCardSearch: Function
}

const Component: React.FunctionComponent<LayoutProps> = (props) => {
  const renderHeader = () => {
    return (
      <CardSearchForm setFormCardName={props.setFormCardName} form={props.form} />
    )
  }

  const getContent = () => {
      const query = `{ getCardByCardName(cardName: "${props.form.cardName.value}") { setId setName card { name uuid originalText text } } }`

      const cardResults = props.queryCardSearch(query, props.form.cardName.value)
  }

  const renderContent = (props: LayoutProps) => {
    return (
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={() => getContent()}>Search</Button>
      </ButtonGroup>
    )
  }

  const renderFooter = () => {
    return (<CardLayout cardSearchResults={props.cardSearchResult} userCatalogResults={props.userCatalogResult}></CardLayout>)
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
