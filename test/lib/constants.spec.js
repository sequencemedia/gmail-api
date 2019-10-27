const {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN
} = require('@sequencemedia/gmail-api/lib/constants')

jest.mock('@sequencemedia/gmail-api/lib/argv', () => ({
  hasCredentialsPath: jest.fn(false),
  getCredentialsPath: jest.fn(undefined),
  hasCredentialsTokenPath: jest.fn(false),
  getCredentialsTokenPath: jest.fn(undefined),
  hasCredentialsJson: jest.fn(false),
  getCredentialsJson: jest.fn(undefined),
  hasCredentialsTokenJson: jest.fn(false),
  getCredentialsTokenJson: jest.fn(undefined)
}))

describe('`@sequencemedia/gmail-api/lib/constants`', () => {
  describe('Always', () => {
    it('exports `SCOPES`', () => {
      expect(SCOPES)
        .toEqual(expect.any(Array))
    })

    it('exports `ENOENT_CREDENTIALS`', () => {
      expect(ENOENT_CREDENTIALS)
        .toEqual(expect.any(String))
    })

    it('exports `ENOENT_CREDENTIALS_TOKEN`', () => {
      expect(ENOENT_CREDENTIALS_TOKEN)
        .toEqual(expect.any(String))
    })
  })
})
