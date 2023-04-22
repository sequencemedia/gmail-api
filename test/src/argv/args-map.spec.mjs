import argsMap from '#argv/args-map'

describe('`#argv/args-map`', () => {
  it('exports a `Map` instance', () => {
    expect(argsMap)
      .toBeInstanceOf(Map)
  })
})
