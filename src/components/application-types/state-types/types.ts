import { Record, List } from 'immutable'
import { FormContainer } from '../component-related-types/form-specific-types/types'
import { CardElementContainerRecord } from '../component-related-types/card-element-specific-types/types';

export type StateInterface = {
  loading: boolean
  form: FormContainer
  cardSearchFormResults: List<CardElementContainerRecord>
}

export interface State extends Record<StateInterface>, StateInterface { }
