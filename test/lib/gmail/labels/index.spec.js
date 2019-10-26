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
})
