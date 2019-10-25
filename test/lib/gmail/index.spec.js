require('module-alias/register')

const chai = require('chai')

const getGmail = require('@sequencemedia/gmail-api/lib/gmail')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail`', () => {
  describe('Always', () => {
    it('exports `getGmail`', () => {
      expect(getGmail)
        .to.be.a('function')
    })
  })
})
