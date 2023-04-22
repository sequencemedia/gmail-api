import {
  jest
} from '@jest/globals'

import argsMap from '#argv/args-map'

import {
  hasCredentialsPath,
  getCredentialsPath,
  hasCredentialsTokenPath,
  getCredentialsTokenPath,
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
} from '#argv'

jest.unstable_mockModule('#argv/args-map', () => ({
  has: jest.fn(),
  get: jest.fn()
}))

describe('`#argv`', () => {
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

  xdescribe('`hasCredentialsPath()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`getCredentialsPath()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`hasCredentialsTokenPath()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`getCredentialsTokenPath()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`hasCredentialsJson()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`getCredentialsJson()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`hasCredentialsTokenJson()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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

  xdescribe('`getCredentialsTokenJson()`', () => {
    beforeEach(() => {
      argsMap.has.mockReset()
      argsMap.get.mockReset()
    })

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
