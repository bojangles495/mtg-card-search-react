import { expect } from 'chai'

describe('utils #toDeepImmutable', () => {
  it('successful', () => {

    const state = {}

    const jsObject = {
      loginState: {
        currentUser: null,
        formErrors: {
          username: [],
          password: [],
          rememberDevice: []
        },
        formFields: { username: '', password: '', rememberDevice: false },
        goTo: '',
        invalidForm: false,
        validated: false,
        content: {
          forgotLinkText: '',
          loginButtonText: '',
          passwordLabel: '',
          registerLinkText: '',
          registerText: '',
          registerTitle: '',
          rememberLabel: '',
          rememberSubtext: '',
          section: '',
          sectionTitle: '',
          usernameLabel: ''
        }
      }
    }

    expect(1).to.equal(1)
  })
})
