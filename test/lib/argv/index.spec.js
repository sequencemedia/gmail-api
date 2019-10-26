const argsMap = require('@sequencemedia/gmail-api/lib/argv/args-map')

const {
  hasCredentialsPath,
  getCredentialsPath,
  hasCredentialsTokenPath,
  getCredentialsTokenPath,
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
} = require('@sequencemedia/gmail-api/lib/argv')

jest.mock('@sequencemedia/gmail-api/lib/argv/args-map', () => ({
  has: jest.fn(),
  get: jest.fn()
}))

describe('`@sequencemedia/gmail-api/lib/argv`', () => {
  describe('Always', () => {
    it('exports `hasCredentialsPath`', () => {
      expect(hasCredentialsPath)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsPath`', () => {
      expect(getCredentialsPath)
        .toEqual(expect.any(Function))
    })

    it('exports `hasCredentialsTokenPath`', () => {
      expect(hasCredentialsTokenPath)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsTokenPath`', () => {
      expect(getCredentialsTokenPath)
        .toEqual(expect.any(Function))
    })

    it('exports `hasCredentialsJson`', () => {
      expect(hasCredentialsJson)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsJson`', () => {
      expect(getCredentialsJson)
        .toEqual(expect.any(Function))
    })

    it('exports `hasCredentialsTokenJson`', () => {
      expect(hasCredentialsTokenJson)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsTokenJson`', () => {
      expect(getCredentialsTokenJson)
        .toEqual(expect.any(Function))
    })
  })

  describe('`hasCredentialsPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsPath`', () => {
        hasCredentialsPath(argsMap)

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsPath')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `has` on the default map instance with the argument `credentialsPath`', () => {
        hasCredentialsPath()

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsPath')
      })
    })
  })

  describe('`getCredentialsPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsPath`', () => {
        getCredentialsPath(argsMap)

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsPath')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `get` on the default map instance with the argument `credentialsPath`', () => {
        getCredentialsPath()

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsPath')
      })
    })
  })

  describe('`hasCredentialsTokenPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsTokenPath`', () => {
        hasCredentialsTokenPath(argsMap)

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsTokenPath')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `has` on the default map instance with the argument `credentialsTokenPath`', () => {
        hasCredentialsTokenPath()

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsTokenPath')
      })
    })
  })

  describe('`getCredentialsTokenPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsTokenPath`', () => {
        getCredentialsTokenPath(argsMap)

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsTokenPath')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `get` on the default map instance with the argument `credentialsTokenPath`', () => {
        getCredentialsTokenPath()

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsTokenPath')
      })
    })
  })

  describe('`hasCredentialsJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsJson`', () => {
        hasCredentialsJson(argsMap)

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsJson')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `has` on the default map instance with the argument `credentialsJson`', () => {
        hasCredentialsJson()

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsJson')
      })
    })
  })

  describe('`getCredentialsJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsJson`', () => {
        getCredentialsJson(argsMap)

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsJson')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `get` on the default map instance with the argument `credentialsJson`', () => {
        getCredentialsJson()

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsJson')
      })
    })
  })

  describe('`hasCredentialsTokenJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsTokenJson`', () => {
        hasCredentialsTokenJson(argsMap)

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsTokenJson')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `has` on the default map instance with the argument `credentialsTokenJson`', () => {
        hasCredentialsTokenJson()

        expect(argsMap.has)
          .toHaveBeenCalledWith('credentialsTokenJson')
      })
    })
  })

  describe('`getCredentialsTokenJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsTokenJson`', () => {
        getCredentialsTokenJson(argsMap)

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsTokenJson')
      })
    })

    describe('A `map` instance is not passed as an argument', () => {
      it('invokes `get` on the default map instance with the argument `credentialsTokenJson`', () => {
        getCredentialsTokenJson()

        expect(argsMap.get)
          .toHaveBeenCalledWith('credentialsTokenJson')
      })
    })
  })
})
