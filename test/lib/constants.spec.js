require('module-alias/register')

const chai = require('chai')
const sinonChai = require('sinon-chai')

const {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
  CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH,
  CREDENTIALS_JSON,
  CREDENTIALS_TOKEN_JSON
} = require('@sequencemedia/gmail-api/lib/constants')

chai.use(sinonChai)

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/constants`', () => {
  describe('Always', () => {
    it('exports `SCOPES`', () => {
      expect(SCOPES)
        .to.be.an('array')
    })

    it('exports `ENOENT_CREDENTIALS`', () => {
      expect(ENOENT_CREDENTIALS)
        .to.be.a('string')
    })

    it('exports `ENOENT_CREDENTIALS_TOKEN`', () => {
      expect(ENOENT_CREDENTIALS_TOKEN)
        .to.be.a('string')
    })

    it('exports `CREDENTIALS_PATH`', () => {
      expect(CREDENTIALS_PATH)
        .to.be.a('string')
    })

    it('exports `CREDENTIALS_TOKEN_PATH`', () => {
      expect(CREDENTIALS_TOKEN_PATH)
        .to.be.a('string')
    })

    it('exports `CREDENTIALS_JSON`', () => (
      expect(CREDENTIALS_JSON)
        .to.be.undefined
    ))

    it('exports `CREDENTIALS_TOKEN_JSON`', () => (
      expect(CREDENTIALS_TOKEN_JSON)
        .to.be.undefined
    ))
  })
})
