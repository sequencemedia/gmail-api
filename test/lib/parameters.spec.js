const {
  hasCredentialsPath: hasCredentialsPathArgValue,
  getCredentialsPath: getCredentialsPathArgValue,
  hasCredentialsTokenPath: hasCredentialsTokenPathArgValue,
  getCredentialsTokenPath: getCredentialsTokenPathArgValue,
  hasCredentialsJson: hasCredentialsJsonArgValue,
  getCredentialsJson: getCredentialsJsonArgValue,
  hasCredentialsTokenJson: hasCredentialsTokenJsonArgValue,
  getCredentialsTokenJson: getCredentialsTokenJsonArgValue
} = require('@sequencemedia/gmail-api/lib/argv')

const {
  /**
   * Default Path
   */
  CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH,
  /**
   * Path
   */
  getCredentialsPath,
  getCredentialsTokenPath,
  /**
   * Json
   */
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
} = require('@sequencemedia/gmail-api/lib/parameters')

jest.mock('@sequencemedia/gmail-api/lib/argv', () => ({
  hasCredentialsPath: jest.fn(false),
  getCredentialsPath: jest.fn(undefined),
  hasCredentialsTokenPath: jest.fn(false),
  getCredentialsTokenPath: jest.fn(undefined),
  hasCredentialsJson: jest.fn(false),
  getCredentialsJson: jest.fn(undefined),
  hasCredentialsTokenJson: jest.fn(false),
  getCredentialsTokenJson: jest.fn(undefined)
}))

describe('`@sequencemedia/gmail-api/lib/parameters`', () => {
  describe('Always', () => {
    it('exports `CREDENTIALS_PATH`', () => {
      expect(CREDENTIALS_PATH)
        .toEqual(expect.any(String))
    })

    it('exports `CREDENTIALS_TOKEN_PATH`', () => {
      expect(CREDENTIALS_TOKEN_PATH)
        .toEqual(expect.any(String))
    })

    it('exports `getCredentialsPath`', () => {
      expect(getCredentialsPath)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsTokenPath`', () => {
      expect(getCredentialsTokenPath)
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

  describe('`getCredentialsPath()`', () => {
    describe('A credentials path has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsPathArgValue.mockReturnValue(true)
        getCredentialsPathArgValue.mockReturnValue('MOCK CREDENTIALS PATH COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        returnValue = getCredentialsPath()
      })

      afterEach(() => {
        hasCredentialsPathArgValue.mockReset()
        getCredentialsPathArgValue.mockReset()

        Reflect.has.mockRestore()
        Reflect.get.mockRestore()
      })

      it('gets the command line argument value', () => {
        expect(hasCredentialsPathArgValue)
          .toHaveBeenCalled()

        expect(getCredentialsPathArgValue)
          .toHaveBeenCalled()
      })

      it('does not get the environment variable value', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()

        expect(Reflect.get)
          .not.toHaveBeenCalled()
      })

      it('returns the command line argument value', () => {
        expect(returnValue)
          .toBe('MOCK CREDENTIALS PATH COMMAND LINE ARGUMENT')
      })
    })

    describe('A credentials path has not been supplied as a command line argument', () => {
      describe('A credentials path has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsPathArgValue.mockReturnValue(false)
          getCredentialsPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)
          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS PATH ENVIRONMENT VARIABLE')

          returnValue = getCredentialsPath()
        })

        afterEach(() => {
          hasCredentialsPathArgValue.mockReset()
          getCredentialsPathArgValue.mockReset()

          Reflect.has.mockRestore()
          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsPathArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsPathArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()

          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns the environment variable value', () => {
          expect(returnValue)
            .toBe('MOCK CREDENTIALS PATH ENVIRONMENT VARIABLE')
        })
      })

      describe('A credentials path has not been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsPathArgValue.mockReturnValue(false)
          getCredentialsPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)
          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          returnValue = getCredentialsPath()
        })

        afterEach(() => {
          hasCredentialsPathArgValue.mockReset()
          getCredentialsPathArgValue.mockReset()

          Reflect.has.mockRestore()
          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsPathArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsPathArgValue)
            .not.toHaveBeenCalled()
        })

        it('does not get the environment variable value', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()

          expect(Reflect.get)
            .not.toHaveBeenCalled()
        })

        it('returns the default value', () => {
          expect(returnValue)
            .toBe(CREDENTIALS_PATH)
        })
      })
    })
  })

  describe('`getCredentialsTokenPath()`', () => {
    describe('A credentials token path has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsTokenPathArgValue.mockReturnValue(true)
        getCredentialsTokenPathArgValue.mockReturnValue('MOCK CREDENTIALS TOKEN PATH COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        returnValue = getCredentialsTokenPath()
      })

      afterEach(() => {
        hasCredentialsTokenPathArgValue.mockReset()
        getCredentialsTokenPathArgValue.mockReset()

        Reflect.has.mockRestore()
        Reflect.get.mockRestore()
      })

      it('gets command line argument value', () => {
        expect(hasCredentialsTokenPathArgValue)
          .toHaveBeenCalled()

        expect(getCredentialsTokenPathArgValue)
          .toHaveBeenCalled()
      })

      it('does not get the environment variable value', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()

        expect(Reflect.get)
          .not.toHaveBeenCalled()
      })

      it('returns the command line argument value', () => {
        expect(returnValue)
          .toBe('MOCK CREDENTIALS TOKEN PATH COMMAND LINE ARGUMENT')
      })
    })

    describe('A credentials token path has not been supplied as a command line argument', () => {
      describe('A credentials token path has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenPathArgValue.mockReturnValue(false)
          getCredentialsTokenPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)
          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS TOKEN PATH ENVIRONMENT VARIABLE VALUE')

          returnValue = getCredentialsTokenPath()
        })

        afterEach(() => {
          hasCredentialsTokenPathArgValue.mockReset()
          getCredentialsTokenPathArgValue.mockReset()

          Reflect.has.mockRestore()
          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsTokenPathArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsTokenPathArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()

          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns the environment variable value', () => {
          expect(returnValue)
            .toBe('MOCK CREDENTIALS TOKEN PATH ENVIRONMENT VARIABLE VALUE')
        })
      })

      describe('A credentials token path has not been supplied an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenPathArgValue.mockReturnValue(false)
          getCredentialsTokenPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)
          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          returnValue = getCredentialsTokenPath()
        })

        afterEach(() => {
          hasCredentialsTokenPathArgValue.mockReset()
          getCredentialsTokenPathArgValue.mockReset()

          Reflect.has.mockRestore()
          Reflect.get.mockRestore()
        })

        it('does not get command line argument value', () => {
          expect(hasCredentialsTokenPathArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsTokenPathArgValue)
            .not.toHaveBeenCalled()
        })

        it('does not get environment variable value', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()

          expect(Reflect.get)
            .not.toHaveBeenCalled()
        })

        it('returns the default value', () => {
          expect(returnValue)
            .toBe(CREDENTIALS_TOKEN_PATH)
        })
      })
    })
  })

  describe('`hasCredentialsJson()`', () => {
    describe('The credentials json has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsJsonArgValue.mockReturnValue(true)

        jest.spyOn(Reflect, 'has')

        returnValue = hasCredentialsJson()
      })

      afterEach(() => {
        hasCredentialsJsonArgValue.mockReset()

        Reflect.has.mockRestore()
      })

      it('interrogates the command line arguments', () => {
        expect(hasCredentialsJsonArgValue)
          .toHaveBeenCalled()
      })

      it('does not interrogate the environment variables', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()
      })

      it('returns true', () => {
        expect(returnValue)
          .toBe(true)
      })
    })

    describe('The credentials json has not been supplied as a command line argument', () => {
      describe('The credentials json has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsJsonArgValue.mockReturnValue(false)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)

          returnValue = hasCredentialsJson()
        })

        afterEach(() => {
          hasCredentialsJsonArgValue.mockReset()

          Reflect.has.mockRestore()
        })

        it('interrogates the command line arguments', () => {
          expect(hasCredentialsJsonArgValue)
            .toHaveBeenCalled()
        })

        it('interrogates the environment variables', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()
        })

        it('returns true', () => {
          expect(returnValue)
            .toBe(true)
        })
      })

      describe('The credentials json has not been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsJsonArgValue.mockReturnValue(false)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)

          returnValue = hasCredentialsJson()
        })

        afterEach(() => {
          hasCredentialsJsonArgValue.mockReset()

          Reflect.has.mockRestore()
        })

        it('interrogates the command line arguments', () => {
          expect(hasCredentialsJsonArgValue)
            .toHaveBeenCalled()
        })

        it('interrogates the environment variables', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()
        })

        it('returns false', () => {
          expect(returnValue)
            .toBe(false)
        })
      })
    })
  })

  describe('`getCredentialsJson()`', () => {
    describe('The credentials json has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsJsonArgValue.mockReturnValue(true)
        getCredentialsJsonArgValue.mockReturnValue('MOCK CREDENTIALS JSON COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        returnValue = getCredentialsJson()
      })

      afterEach(() => {
        hasCredentialsJsonArgValue.mockReset()
        getCredentialsJsonArgValue.mockReset()

        Reflect.has.mockRestore()
        Reflect.get.mockRestore()
      })

      it('gets the command line argument value', () => {
        expect(hasCredentialsJsonArgValue)
          .toHaveBeenCalled()

        expect(getCredentialsJsonArgValue)
          .toHaveBeenCalled()
      })

      it('does not get the environment variable value', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()

        expect(Reflect.get)
          .not.toHaveBeenCalled()
      })

      it('returns the command line argument value', () => {
        expect(returnValue)
          .toBe('MOCK CREDENTIALS JSON COMMAND LINE ARGUMENT')
      })
    })

    describe('The credentials json has not been supplied as a command line argument', () => {
      describe('The credentials json has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsJsonArgValue.mockReturnValue(false)
          getCredentialsJsonArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS JSON ENVIRONMENT VARIABLE')

          returnValue = getCredentialsJson()
        })

        afterEach(() => {
          hasCredentialsJsonArgValue.mockReset()
          getCredentialsJsonArgValue.mockReset()

          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsJsonArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsJsonArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns the environment variable value', () => {
          expect(returnValue)
            .toBe('MOCK CREDENTIALS JSON ENVIRONMENT VARIABLE')
        })
      })

      describe('The credentials json has not been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsJsonArgValue.mockReturnValue(false)
          getCredentialsJsonArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          returnValue = getCredentialsJson()
        })

        afterEach(() => {
          hasCredentialsJsonArgValue.mockReset()
          getCredentialsJsonArgValue.mockReset()

          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsJsonArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsJsonArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns undefined', () => {
          expect(returnValue)
            .toBeUndefined()
        })
      })
    })
  })

  describe('`hasCredentialsTokenJson()`', () => {
    describe('The credentials token json has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsTokenJsonArgValue.mockReturnValue(true)

        jest.spyOn(Reflect, 'has')

        returnValue = hasCredentialsTokenJson()
      })

      afterEach(() => {
        hasCredentialsTokenJsonArgValue.mockReset()

        Reflect.has.mockRestore()
      })

      it('interrogates the command line arguments', () => {
        expect(hasCredentialsTokenJsonArgValue)
          .toHaveBeenCalled()
      })

      it('does not interrogate the environment variables', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()
      })

      it('returns true', () => {
        expect(returnValue)
          .toBe(true)
      })
    })

    describe('The credentials token json has not been supplied as a command line argument', () => {
      describe('The credentials token json has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenJsonArgValue.mockReturnValue(false)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)

          returnValue = hasCredentialsTokenJson()
        })

        afterEach(() => {
          hasCredentialsTokenJsonArgValue.mockReset()

          Reflect.has.mockRestore()
        })

        it('interrogates the command line arguments', () => {
          expect(hasCredentialsTokenJsonArgValue)
            .toHaveBeenCalled()
        })

        it('interrogates the environment variables', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()
        })

        it('returns true', () => {
          expect(returnValue)
            .toBe(true)
        })
      })

      describe('The credentials token json has not been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenJsonArgValue.mockReturnValue(false)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)

          returnValue = hasCredentialsTokenJson()
        })

        afterEach(() => {
          hasCredentialsTokenJsonArgValue.mockReset()

          Reflect.has.mockRestore()
        })

        it('interrogates the command line arguments', () => {
          expect(hasCredentialsTokenJsonArgValue)
            .toHaveBeenCalled()
        })

        it('interrogates the environment variables', () => {
          expect(Reflect.has)
            .toHaveBeenCalled()
        })

        it('returns false', () => {
          expect(returnValue)
            .toBe(false)
        })
      })
    })
  })

  describe('`getCredentialsTokenJson()`', () => {
    describe('The credentials token json has been supplied as a command line argument', () => {
      let returnValue

      beforeEach(() => {
        hasCredentialsTokenJsonArgValue.mockReturnValue(true)
        getCredentialsTokenJsonArgValue.mockReturnValue('MOCK CREDENTIALS TOKEN JSON COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        returnValue = getCredentialsTokenJson()
      })

      afterEach(() => {
        hasCredentialsTokenJsonArgValue.mockReset()
        getCredentialsTokenJsonArgValue.mockReset()

        Reflect.has.mockRestore()
        Reflect.get.mockRestore()
      })

      it('gets the command line argument value', () => {
        expect(hasCredentialsTokenJsonArgValue)
          .toHaveBeenCalled()

        expect(getCredentialsTokenJsonArgValue)
          .toHaveBeenCalled()
      })

      it('does not get the environment variable value', () => {
        expect(Reflect.has)
          .not.toHaveBeenCalled()

        expect(Reflect.get)
          .not.toHaveBeenCalled()
      })

      it('returns the command line argument value', () => {
        expect(returnValue)
          .toBe('MOCK CREDENTIALS TOKEN JSON COMMAND LINE ARGUMENT')
      })
    })

    describe('The credentials token json has not been supplied as a command line argument', () => {
      describe('The credentials token json has been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenJsonArgValue.mockReturnValue(false)
          getCredentialsTokenJsonArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS TOKEN JSON ENVIRONMENT VARIABLE')

          returnValue = getCredentialsTokenJson()
        })

        afterEach(() => {
          hasCredentialsTokenJsonArgValue.mockReset()
          getCredentialsTokenJsonArgValue.mockReset()

          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsTokenJsonArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsTokenJsonArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns the environment variable value', () => {
          expect(returnValue)
            .toBe('MOCK CREDENTIALS TOKEN JSON ENVIRONMENT VARIABLE')
        })
      })

      describe('The credentials token json has not been supplied as an environment variable', () => {
        let returnValue

        beforeEach(() => {
          hasCredentialsTokenJsonArgValue.mockReturnValue(false)
          getCredentialsTokenJsonArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          returnValue = getCredentialsTokenJson()
        })

        afterEach(() => {
          hasCredentialsTokenJsonArgValue.mockReset()
          getCredentialsTokenJsonArgValue.mockReset()

          Reflect.get.mockRestore()
        })

        it('does not get the command line argument value', () => {
          expect(hasCredentialsTokenJsonArgValue)
            .toHaveBeenCalled()

          expect(getCredentialsTokenJsonArgValue)
            .not.toHaveBeenCalled()
        })

        it('gets the environment variable value', () => {
          expect(Reflect.get)
            .toHaveBeenCalled()
        })

        it('returns undefined', () => {
          expect(returnValue)
            .toBeUndefined()
        })
      })
    })
  })
})
