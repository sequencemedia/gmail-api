import {
  jest
} from '@jest/globals'

import {
  google
} from 'googleapis'

import {
  getAuth
} from '#auth'

import getGmail from '#gmail'

jest.unstable_mockModule('googleapis', () => ({
  google: { gmail: jest.fn().mockReturnValue('MOCK GMAIL') }
}))

jest.mock('debug', () => jest.fn(() => jest.fn()))

jest.unstable_mockModule('#auth', () => ({
  getAuth: jest.fn().mockResolvedValue('MOCK AUTH')
}))

describe('`#gmail`', () => {
  describe('Always', () => {
    it('exports `getGmail`', () => {
      expect(getGmail)
        .toEqual(expect.any(Function))
    })
  })

  xdescribe('`getGmail()`', () => {
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
