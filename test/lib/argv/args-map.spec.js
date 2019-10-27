const argsMap = require('@sequencemedia/gmail-api/lib/argv/args-map')

describe('`@sequencemedia/gmail-api/lib/argv/args-map`', () => {
  it('exports a `Map` instance', () => {
    expect(argsMap)
      .toBeInstanceOf(Map)
  })
})
