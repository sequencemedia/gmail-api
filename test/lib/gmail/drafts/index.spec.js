require('module-alias/register')

const chai = require('chai')

const {
  getDraftFormatFull,
  getDraftFormatMinimal,
  getDraftFormatRaw,
  getDraftFormatMetadata,
  getDraft
} = require('@sequencemedia/gmail-api/lib/gmail/drafts')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/drafts`', () => {
  describe('Always', () => {
    it('exports `getDraftFormatFull`', () => {
      expect(getDraftFormatFull)
        .to.be.a('function')
    })

    it('exports `getDraftFormatMinimal`', () => {
      expect(getDraftFormatMinimal)
        .to.be.a('function')
    })

    it('exports `getDraftFormatRaw`', () => {
      expect(getDraftFormatRaw)
        .to.be.a('function')
    })

    it('exports `getDraftFormatMetadata`', () => {
      expect(getDraftFormatMetadata)
        .to.be.a('function')
    })

    it('exports `getDraft`', () => {
      expect(getDraft)
        .to.be.a('function')
    })
  })
})
