require('module-alias/register')

const chai = require('chai')

const {
  getMessageFormatFull,
  getMessageFormatMinimal,
  getMessageFormatRaw,
  getMessageFormatMetadata,
  getMessage
} = require('@sequencemedia/gmail-api/lib/gmail/messages')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/messages`', () => {
  describe('Always', () => {
    it('exports `getMessageFormatFull`', () => {
      expect(getMessageFormatFull)
        .to.be.a('function')
    })

    it('exports `getMessageFormatMinimal`', () => {
      expect(getMessageFormatMinimal)
        .to.be.a('function')
    })

    it('exports `getMessageFormatRaw`', () => {
      expect(getMessageFormatRaw)
        .to.be.a('function')
    })

    it('exports `getMessageFormatMetadata`', () => {
      expect(getMessageFormatMetadata)
        .to.be.a('function')
    })

    it('exports `getMessage`', () => {
      expect(getMessage)
        .to.be.a('function')
    })
  })
})
