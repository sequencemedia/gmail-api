require('module-alias/register')

const chai = require('chai')

const {
  getMessages
} = require('@sequencemedia/gmail-api/lib/gmail/messages/list')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/messages/list`', () => {
  describe('Always', () => {
    it('exports `getMessages`', () => {
      expect(getMessages)
        .to.be.a('function')
    })
  })
})
