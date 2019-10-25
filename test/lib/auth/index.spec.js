require('module-alias/register')

const chai = require('chai')

const {
  getCredentials,
  setCredentials,
  getCredentialsToken,
  setCredentialsToken,
  getCredentialsTokenForAuthCode,
  getAuth
} = require('@sequencemedia/gmail-api/lib/auth')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/auth`', () => {
  describe('Always', () => {
    it('exports `getCredentials`', () => {
      expect(getCredentials)
        .to.be.a('function')
    })

    it('exports `setCredentials`', () => {
      expect(setCredentials)
        .to.be.a('function')
    })

    it('exports `getCredentialsToken`', () => {
      expect(getCredentialsToken)
        .to.be.a('function')
    })

    it('exports `setCredentialsToken`', () => {
      expect(setCredentialsToken)
        .to.be.a('function')
    })

    it('exports `getCredentialsTokenForAuthCode`', () => {
      expect(getCredentialsTokenForAuthCode)
        .to.be.a('function')
    })

    it('exports `getAuth`', () => {
      expect(getAuth)
        .to.be.a('function')
    })
  })
})
