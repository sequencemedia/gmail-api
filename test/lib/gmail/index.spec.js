const getGmail = require('@sequencemedia/gmail-api/lib/gmail')

describe('`@sequencemedia/gmail-api/lib/gmail`', () => {
  describe('Always', () => {
    it('exports `getGmail`', () => {
      expect(getGmail)
        .toEqual(expect.any(Function))
    })
  })
})
