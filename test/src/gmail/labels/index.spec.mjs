import {
  jest
} from '@jest/globals'

import {
  getLabel
} from '#gmail/labels'

describe('`#gmail/labels`', () => {
  describe('Always', () => {
    it('exports `getLabel`', () => {
      expect(getLabel)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getLabel()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK LABEL')

      const gmail = { users: { labels: { get: getSpy } } }
      const parameters = { user: 'MOCK USER ID', id: 'MOCK LABEL ID' }

      returnValue = await getLabel(gmail, parameters)
    })

    it('gets the label', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK LABEL ID' })
    })

    it('returns the label', () => {
      expect(returnValue)
        .toBe('MOCK LABEL')
    })
  })
})
