require('module-alias/register')

const chai = require('chai')

const {
  getAttachment
} = require('@sequencemedia/gmail-api/lib/gmail/messages/attachments')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/messages/attachments`', () => {
  describe('Always', () => {
    it('exports `getAttachment`', () => {
      expect(getAttachment)
        .to.be.a('function')
    })
  })
})
