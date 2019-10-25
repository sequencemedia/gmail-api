require('module-alias/register')

const chai = require('chai')

const {
  getLabel
} = require('@sequencemedia/gmail-api/lib/gmail/labels')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/gmail/labels`', () => {
  describe('Always', () => {
    it('exports `getLabel`', () => {
      expect(getLabel)
        .to.be.a('function')
    })
  })
})
