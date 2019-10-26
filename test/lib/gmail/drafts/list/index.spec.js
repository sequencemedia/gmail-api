const {
  getDrafts
} = require('@sequencemedia/gmail-api/lib/gmail/drafts/list')

describe('`@sequencemedia/gmail-api/lib/gmail/drafts/list`', () => {
  describe('Always', () => {
    it('exports `getDrafts`', () => {
      expect(getDrafts)
        .toEqual(expect.any(Function))
    })
  })
})
