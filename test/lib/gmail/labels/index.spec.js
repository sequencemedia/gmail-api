const {
  getLabel
} = require('@sequencemedia/gmail-api/lib/gmail/labels')

describe('`@sequencemedia/gmail-api/lib/gmail/labels`', () => {
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

      returnValue = await getLabel({ users: { labels: { get: getSpy } } }, { user: 'MOCK USER ID', id: 'MOCK LABEL ID' })
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
