const {
  getLabels
} = require('@sequencemedia/gmail-api/lib/gmail/labels/list')

describe('`@sequencemedia/gmail-api/lib/gmail/labels/list`', () => {
  describe('Always', () => {
    it('exports `getLabels`', () => {
      expect(getLabels)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getLabels()`', () => {
    let listSpy
    let returnValue

    beforeEach(async () => {
      listSpy = jest.fn()

      const gmail = { users: { labels: { list: listSpy } } }
      const parameters = { user: 'MOCK USER ID' }

      returnValue = await getLabels(gmail, parameters)
    })

    it('returns the labels', () => {
      expect(returnValue)
        .toEqual(expect.any(Array))
    })
  })
})
