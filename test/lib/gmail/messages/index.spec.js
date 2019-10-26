const {
  getMessageFormatFull,
  getMessageFormatMinimal,
  getMessageFormatRaw,
  getMessageFormatMetadata,
  getMessage
} = require('@sequencemedia/gmail-api/lib/gmail/messages')

describe('`@sequencemedia/gmail-api/lib/gmail/messages`', () => {
  describe('Always', () => {
    it('exports `getMessageFormatFull`', () => {
      expect(getMessageFormatFull)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatMinimal`', () => {
      expect(getMessageFormatMinimal)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatRaw`', () => {
      expect(getMessageFormatRaw)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessageFormatMetadata`', () => {
      expect(getMessageFormatMetadata)
        .toEqual(expect.any(Function))
    })

    it('exports `getMessage`', () => {
      expect(getMessage)
        .toEqual(expect.any(Function))
    })
  })
})
