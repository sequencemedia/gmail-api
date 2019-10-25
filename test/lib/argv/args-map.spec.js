require('module-alias/register')

const chai = require('chai')

const argsMap = require('@sequencemedia/gmail-api/lib/argv/args-map')

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/argv/args-map`', () => {
  it('exports a `Map` instance', () => {
    expect(argsMap)
      .to.be.instanceOf(Map)
  })
})
