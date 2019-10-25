require('module-alias/register')

const chai = require('chai')

const {
  getDrafts
} = require('@sequencemedia/gmail-api/lib/gmail/drafts/list')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/drafts/list`', () => {
  describe('Always', () => {
    it('exports `getDrafts`', () => {
      expect(getDrafts)
        .to.be.a('function')
    })
  })
})
