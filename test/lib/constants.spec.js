const {
  hasCredentialsPath: hasCredentialsPathArgValue,
  getCredentialsPath: getCredentialsPathArgValue,
  hasCredentialsTokenPath: hasCredentialsTokenPathArgValue,
  getCredentialsTokenPath: getCredentialsTokenPathArgValue
} = require('@sequencemedia/gmail-api/lib/argv')

const {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
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
} = require('@sequencemedia/gmail-api/lib/constants')

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

describe('`@sequencemedia/gmail-api/lib/constants`', () => {
  describe('Always', () => {
    it('exports `SCOPES`', () => {
      expect(SCOPES)
        .toEqual(expect.any(Array))
    })

    it('exports `ENOENT_CREDENTIALS`', () => {
      expect(ENOENT_CREDENTIALS)
        .toEqual(expect.any(String))
    })

    it('exports `ENOENT_CREDENTIALS_TOKEN`', () => {
      expect(ENOENT_CREDENTIALS_TOKEN)
        .toEqual(expect.any(String))
    })

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
      let credentialsPath

      beforeEach(() => {
        hasCredentialsPathArgValue.mockReturnValue(true)
        getCredentialsPathArgValue.mockReturnValue('MOCK CREDENTIALS PATH COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        credentialsPath = getCredentialsPath()
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
        expect(credentialsPath)
          .toBe('MOCK CREDENTIALS PATH COMMAND LINE ARGUMENT')
      })
    })

    describe('A credentials path has not been supplied as a command line argument', () => {
      describe('A credentials path has been supplied as an environment variable', () => {
        let credentialsPath

        beforeEach(() => {
          hasCredentialsPathArgValue.mockReturnValue(false)
          getCredentialsPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)
          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS PATH ENVIRONMENT VARIABLE')

          credentialsPath = getCredentialsPath()
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
          expect(credentialsPath)
            .toBe('MOCK CREDENTIALS PATH ENVIRONMENT VARIABLE')
        })
      })

      describe('A credentials path has not been supplied as an environment variable', () => {
        let credentialsPath

        beforeEach(() => {
          hasCredentialsPathArgValue.mockReturnValue(false)
          getCredentialsPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)
          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          credentialsPath = getCredentialsPath()
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
          expect(credentialsPath)
            .toBe(CREDENTIALS_PATH)
        })
      })
    })
  })

  describe('`getCredentialsTokenPath()`', () => {
    describe('A credentials token path has been supplied as a command line argument', () => {
      let credentialsTokenPath

      beforeEach(() => {
        hasCredentialsTokenPathArgValue.mockReturnValue(true)
        getCredentialsTokenPathArgValue.mockReturnValue('MOCK CREDENTIALS TOKEN PATH COMMAND LINE ARGUMENT')

        jest.spyOn(Reflect, 'has').mockReturnValue(false)
        jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

        credentialsTokenPath = getCredentialsTokenPath()
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
        expect(credentialsTokenPath)
          .toBe('MOCK CREDENTIALS TOKEN PATH COMMAND LINE ARGUMENT')
      })
    })

    describe('A credentials token path has not been supplied as a command line argument', () => {
      describe('A credentials token path has been supplied as an environment variable', () => {
        let credentialsTokenPath

        beforeEach(() => {
          hasCredentialsTokenPathArgValue.mockReturnValue(false)
          getCredentialsTokenPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(true)
          jest.spyOn(Reflect, 'get').mockReturnValue('MOCK CREDENTIALS TOKEN PATH ENVIRONMENT VARIABLE VALUE')

          credentialsTokenPath = getCredentialsTokenPath()
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
          expect(credentialsTokenPath)
            .toBe('MOCK CREDENTIALS TOKEN PATH ENVIRONMENT VARIABLE VALUE')
        })
      })

      describe('A credentials token path has not been supplied an environment variable', () => {
        let credentialsTokenPath

        beforeEach(() => {
          hasCredentialsTokenPathArgValue.mockReturnValue(false)
          getCredentialsTokenPathArgValue.mockReturnValue(undefined)

          jest.spyOn(Reflect, 'has').mockReturnValue(false)
          jest.spyOn(Reflect, 'get').mockReturnValue(undefined)

          credentialsTokenPath = getCredentialsTokenPath()
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
          expect(credentialsTokenPath)
            .toBe(CREDENTIALS_TOKEN_PATH)
        })
      })
    })
  })
})
