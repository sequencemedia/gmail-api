const { google } = require('googleapis')

const {
  getAuth
} = require('@sequencemedia/gmail-api/lib/auth')

const getGmail = require('@sequencemedia/gmail-api/lib/gmail')

jest.mock('googleapis', () => ({
  google: { gmail: jest.fn().mockReturnValue('MOCK GMAIL') }
}))

jest.mock('debug', () => jest.fn(() => jest.fn()))

jest.mock('@sequencemedia/gmail-api/lib/auth', () => ({
  getAuth: jest.fn().mockResolvedValue('MOCK AUTH')
}))

describe('`@sequencemedia/gmail-api/lib/gmail`', () => {
  describe('Always', () => {
    it('exports `getGmail`', () => {
      expect(getGmail)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getGmail()`', () => {
    it('gets authorisation', async () => {
      await getGmail()

      expect(getAuth)
        .toHaveBeenCalled()
    })

    it('gets an authorised gmail object', async () => {
      await getGmail()

      expect(google.gmail)
        .toHaveBeenCalledWith({ version: 'v1', auth: 'MOCK AUTH' })
    })

    it('returns the authorised gmail object', async () => {
      const gmail = await getGmail()

      expect(gmail)
        .toBe('MOCK GMAIL')
    })
  })
})
