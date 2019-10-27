const {
  getAttachment
} = require('@sequencemedia/gmail-api/lib/gmail/messages/attachments')

describe('`@sequencemedia/gmail-api/lib/gmail/messages/attachments`', () => {
  describe('Always', () => {
    it('exports `getAttachment`', () => {
      expect(getAttachment)
        .toEqual(expect.any(Function))
    })
  })
})
