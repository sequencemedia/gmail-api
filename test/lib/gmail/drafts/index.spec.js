const {
  getDraftFormatFull,
  getDraftFormatMinimal,
  getDraftFormatRaw,
  getDraftFormatMetadata,
  getDraft
} = require('@sequencemedia/gmail-api/lib/gmail/drafts')

describe('`@sequencemedia/gmail-api/lib/gmail/drafts`', () => {
  describe('Always', () => {
    it('exports `getDraftFormatFull`', () => {
      expect(getDraftFormatFull)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatMinimal`', () => {
      expect(getDraftFormatMinimal)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatRaw`', () => {
      expect(getDraftFormatRaw)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraftFormatMetadata`', () => {
      expect(getDraftFormatMetadata)
        .toEqual(expect.any(Function))
    })

    it('exports `getDraft`', () => {
      expect(getDraft)
        .toEqual(expect.any(Function))
    })
  })
})
