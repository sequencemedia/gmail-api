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

  describe('`getAttachment()`', () => {
    let getSpy
    let returnValue

    beforeEach(async () => {
      getSpy = jest.fn().mockReturnValue('MOCK ATTACHMENT')

      returnValue = await getAttachment({ users: { messages: { attachments: { get: getSpy } } } }, { user: 'MOCK USER ID', id: 'MOCK ATTACHMENT ID', messageId: 'MOCK MESSAGE ID' })
    })

    it('gets the attachment', () => {
      expect(getSpy)
        .toHaveBeenCalledWith({ userId: 'MOCK USER ID', id: 'MOCK ATTACHMENT ID', messageId: 'MOCK MESSAGE ID' })
    })

    it('returns the attachment', () => {
      expect(returnValue)
        .toBe('MOCK ATTACHMENT')
    })
  })
})
