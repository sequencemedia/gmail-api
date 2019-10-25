require('module-alias/register')

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

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

chai.use(sinonChai)

const {
  expect
} = chai

describe('`@sequencemedia/gmail-api/lib/argv`', () => {
  describe('Always', () => {
    it('exports `hasCredentialsPath`', () => {
      expect(hasCredentialsPath)
        .to.be.a('function')
    })

    it('exports `getCredentialsPath`', () => {
      expect(getCredentialsPath)
        .to.be.a('function')
    })

    it('exports `hasCredentialsTokenPath`', () => {
      expect(hasCredentialsTokenPath)
        .to.be.a('function')
    })

    it('exports `getCredentialsTokenPath`', () => {
      expect(getCredentialsTokenPath)
        .to.be.a('function')
    })

    it('exports `hasCredentialsJson`', () => {
      expect(hasCredentialsJson)
        .to.be.a('function')
    })

    it('exports `getCredentialsJson`', () => {
      expect(getCredentialsJson)
        .to.be.a('function')
    })

    it('exports `hasCredentialsTokenJson`', () => {
      expect(hasCredentialsTokenJson)
        .to.be.a('function')
    })

    it('exports `getCredentialsTokenJson`', () => {
      expect(getCredentialsTokenJson)
        .to.be.a('function')
    })
  })

  describe('`hasCredentialsPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsPath`', () => {
        const mockMap = {
          has: sinon.spy()
        }

        hasCredentialsPath(mockMap)

        expect(mockMap.has)
          .to.be.calledWith('credentialsPath')
      })
    })
  })

  describe('`getCredentialsPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsPath`', () => {
        const mockMap = {
          get: sinon.spy()
        }

        getCredentialsPath(mockMap)

        expect(mockMap.get)
          .to.be.calledWith('credentialsPath')
      })
    })
  })

  describe('`hasCredentialsTokenPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsTokenPath`', () => {
        const mockMap = {
          has: sinon.spy()
        }

        hasCredentialsTokenPath(mockMap)

        expect(mockMap.has)
          .to.be.calledWith('credentialsTokenPath')
      })
    })
  })

  describe('`getCredentialsTokenPath()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsTokenPath`', () => {
        const mockMap = {
          get: sinon.spy()
        }

        getCredentialsTokenPath(mockMap)

        expect(mockMap.get)
          .to.be.calledWith('credentialsTokenPath')
      })
    })
  })

  describe('`hasCredentialsJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsJson`', () => {
        const mockMap = {
          has: sinon.spy()
        }

        hasCredentialsJson(mockMap)

        expect(mockMap.has)
          .to.be.calledWith('credentialsJson')
      })
    })
  })

  describe('`getCredentialsJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsJson`', () => {
        const mockMap = {
          get: sinon.spy()
        }

        getCredentialsJson(mockMap)

        expect(mockMap.get)
          .to.be.calledWith('credentialsJson')
      })
    })
  })

  describe('`hasCredentialsTokenJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `has` on the map instance with the argument `credentialsTokenJson`', () => {
        const mockMap = {
          has: sinon.spy()
        }

        hasCredentialsTokenJson(mockMap)

        expect(mockMap.has)
          .to.be.calledWith('credentialsTokenJson')
      })
    })
  })

  describe('`getCredentialsTokenJson()`', () => {
    describe('A `map` instance is passed as an argument', () => {
      it('invokes `get` on the map instance with the argument `credentialsTokenJson`', () => {
        const mockMap = {
          get: sinon.spy()
        }

        getCredentialsTokenJson(mockMap)

        expect(mockMap.get)
          .to.be.calledWith('credentialsTokenJson')
      })
    })
  })
})
