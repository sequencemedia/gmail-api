const {
  getMessages
} = require('@sequencemedia/gmail-api/lib/gmail/messages/list')

describe('`@sequencemedia/gmail-api/lib/gmail/messages/list`', () => {
  describe('Always', () => {
    it('exports `getMessages`', () => {
      expect(getMessages)
        .toEqual(expect.any(Function))
    })
  })
})
