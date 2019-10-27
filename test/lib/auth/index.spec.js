const { google } = require('googleapis')

const {
  readFile,
  writeFile
} = require('sacred-fs')

const {
  getCredentials,
  setCredentials,
  getCredentialsToken,
  setCredentialsToken,
  getCredentialsTokenForAuthCode,
  getAuthFor,
  getAuth
} = require('@sequencemedia/gmail-api/lib/auth')

const {
  /**
   *  Path
   */
  getCredentialsPath,
  getCredentialsTokenPath,
  /**
   *  Json
   */
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
} = require('@sequencemedia/gmail-api/lib/parameters')

jest.mock('googleapis', () => ({
  google: {
    auth: {
      OAuth2: jest.fn(() => ({
        setCredentials: jest.fn()
      }))
    }
  }
}))

jest.mock('debug', () => jest.fn(() => jest.fn()))

jest.mock('sacred-fs', () => ({
  readFile: jest.fn(() => Promise.resolve()),
  writeFile: jest.fn(() => Promise.resolve())
}))

jest.mock('@sequencemedia/gmail-api/lib/parameters', () => ({
  /**
   * Path
   */
  getCredentialsPath: jest.fn(),
  getCredentialsTokenPath: jest.fn(),
  /**
   * Json
   */
  hasCredentialsJson: jest.fn(),
  getCredentialsJson: jest.fn(),
  hasCredentialsTokenJson: jest.fn(),
  getCredentialsTokenJson: jest.fn()
}))

describe('`@sequencemedia/gmail-api/lib/auth`', () => {
  describe('Always', () => {
    it('exports `getCredentials`', () => {
      expect(getCredentials)
        .toEqual(expect.any(Function))
    })

    it('exports `setCredentials`', () => {
      expect(setCredentials)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsToken`', () => {
      expect(getCredentialsToken)
        .toEqual(expect.any(Function))
    })

    it('exports `setCredentialsToken`', () => {
      expect(setCredentialsToken)
        .toEqual(expect.any(Function))
    })

    it('exports `getCredentialsTokenForAuthCode`', () => {
      expect(getCredentialsTokenForAuthCode)
        .toEqual(expect.any(Function))
    })

    it('exports `getAuth`', () => {
      expect(getAuth)
        .toEqual(expect.any(Function))
    })
  })

  describe('`getAuthFor`', () => {
    describe('with credentials', () => {
      it('invokes `google.auth.OAuth2` with a client ID, a client secret, and a redirect URI', () => {
        getAuthFor({
          installed: {
            client_id: 'MOCK CLIENT ID',
            client_secret: 'MOCK CLIENT SECRET',
            redirect_uris: [
              'MOCK REDIRECT URI'
            ]
          }
        })

        expect(google.auth.OAuth2)
          .toBeCalledWith('MOCK CLIENT ID', 'MOCK CLIENT SECRET', 'MOCK REDIRECT URI')
      })
    })

    describe('without credentials', () => {
      it('invokes `google.auth.OAuth2` without a client ID, a client secret, or a redirect URI', () => {
        getAuthFor()

        expect(google.auth.OAuth2)
          .toBeCalledWith(undefined, undefined, undefined)
      })
    })
  })

  describe('`getCredentials()`', () => {
    beforeEach(() => {
      readFile.mockResolvedValue('MOCK CREDENTIALS FILE')

      /**
       * JSON doesn't like to be spied on so temporarily overwrite it
       */
      global.JSON = {
        parse: jest.fn().mockReturnValue('MOCK CREDENTIALS OBJECT')
      }
    })

    afterEach(() => {
      readFile.mockReset()

      /**
         * Delete the overwritten JSON object
         */
      delete global.JSON
    })

    describe('`hasCredentialsJson()` returns true', () => {
      beforeEach(() => {
        hasCredentialsJson.mockReturnValue(true)
        getCredentialsJson.mockReturnValue('MOCK CREDENTIALS JSON')
      })

      afterEach(() => {
        hasCredentialsJson.mockReset()
        getCredentialsJson.mockReset()
      })

      it('does not read the credentials from the file system', async () => {
        await getCredentials()

        expect(readFile)
          .not.toBeCalled()
      })

      it('transforms the credentials to an object', async () => {
        await getCredentials()

        expect(JSON.parse)
          .toBeCalledWith('MOCK CREDENTIALS JSON')
      })

      it('returns the credentials as an object', async () => {
        const credentials = await getCredentials()

        expect(credentials)
          .toBe('MOCK CREDENTIALS OBJECT')
      })
    })

    describe('`hasCredentialsJson()` returns false', () => {
      beforeEach(() => {
        hasCredentialsJson.mockReturnValue(false)
      })

      afterEach(() => {
        hasCredentialsJson.mockReset()
      })

      it('reads the credentials from the file system', async () => {
        await getCredentials()

        expect(readFile)
          .toBeCalled()
      })

      it('transforms the credentials to an object', async () => {
        await getCredentials()

        expect(JSON.parse)
          .toBeCalledWith('MOCK CREDENTIALS FILE')
      })

      it('returns the credentials as an object', async () => {
        const credentials = await getCredentials()

        expect(credentials)
          .toBe('MOCK CREDENTIALS OBJECT')
      })
    })
  })

  describe('`setCredentials()`', () => {
    beforeEach(() => {
      writeFile.mockResolvedValue(undefined)

      /**
         * JSON doesn't like to be spied on so temporarily overwrite it
         */
      global.JSON = {
        stringify: jest.fn().mockReturnValue('MOCK CREDENTIALS STRING')
      }
    })

    afterEach(() => {
      writeFile.mockReset()

      /**
         * Delete the overwritten JSON object
         */
      delete global.JSON
    })

    describe('`hasCredentialsJson()` returns true', () => {
      beforeEach(() => {
        hasCredentialsJson.mockReturnValue(true)
        getCredentialsJson.mockReturnValue('MOCK CREDENTIALS JSON')
      })

      afterEach(() => {
        hasCredentialsJson.mockReset()
        getCredentialsJson.mockReset()
      })

      it('does not transform the credentials to a string', async () => {
        await setCredentials({})

        expect(JSON.stringify)
          .not.toBeCalled()
      })

      it('does not write the credentials to the file system', async () => {
        await setCredentials({})

        expect(writeFile)
          .not.toBeCalled()
      })
    })

    describe('`hasCredentialsJson()` returns false', () => {
      beforeEach(() => {
        hasCredentialsJson.mockReturnValue(false)
        getCredentialsPath.mockReturnValue('MOCK CREDENTIALS PATH')
      })

      afterEach(() => {
        hasCredentialsJson.mockReset()
        getCredentialsPath.mockReset()
      })

      it('transforms the credentials to a string', async () => {
        await setCredentials({})

        expect(JSON.stringify)
          .toBeCalledWith({})
      })

      it('writes the credentials to the file system', async () => {
        await setCredentials({})

        expect(writeFile)
          .toBeCalledWith('MOCK CREDENTIALS PATH', 'MOCK CREDENTIALS STRING')
      })
    })
  })

  describe('`getCredentialsToken()`', () => {
    beforeEach(() => {
      readFile.mockResolvedValue('MOCK CREDENTIALS TOKEN FILE')

      /**
         * JSON doesn't like to be spied on so temporarily overwrite it
         */
      global.JSON = {
        parse: jest.fn().mockReturnValue('MOCK CREDENTIALS TOKEN OBJECT')
      }
    })

    afterEach(() => {
      readFile.mockReset()

      /**
         * Delete the overwritten JSON object
         */
      delete global.JSON
    })

    describe('`hasCredentialsTokenJson()` returns true', () => {
      beforeEach(() => {
        hasCredentialsTokenJson.mockReturnValue(true)
        getCredentialsTokenJson.mockReturnValue('MOCK CREDENTIALS TOKEN JSON')
      })

      afterEach(() => {
        hasCredentialsTokenJson.mockReset()
        getCredentialsTokenJson.mockReset()
      })

      it('does not reads the credentials token from the file system', async () => {
        await getCredentialsToken()

        expect(readFile)
          .not.toBeCalled()
      })

      it('transforms the credentials token to an object', async () => {
        await getCredentialsToken()

        expect(JSON.parse)
          .toBeCalledWith('MOCK CREDENTIALS TOKEN JSON')
      })

      it('returns the credentials token as an object', async () => {
        const credentialsToken = await getCredentialsToken()

        expect(credentialsToken)
          .toBe('MOCK CREDENTIALS TOKEN OBJECT')
      })
    })

    describe('`hasCredentialsTokenJson()` returns false', () => {
      beforeEach(() => {
        hasCredentialsTokenJson.mockReturnValue(false)
        getCredentialsTokenPath.mockReturnValue('MOCK CREDENTIALS TOKEN PATH')
      })

      afterEach(() => {
        hasCredentialsTokenJson.mockReset()
        getCredentialsTokenPath.mockReset()
      })

      it('reads the credentials token from the file system', async () => {
        await getCredentialsToken()

        expect(readFile)
          .toBeCalledWith('MOCK CREDENTIALS TOKEN PATH')
      })

      it('transforms the credentials token to an object', async () => {
        await getCredentialsToken()

        expect(JSON.parse)
          .toBeCalledWith('MOCK CREDENTIALS TOKEN FILE')
      })

      it('returns the credentials token as an object', async () => {
        const credentialsToken = await getCredentialsToken()

        expect(credentialsToken)
          .toBe('MOCK CREDENTIALS TOKEN OBJECT')
      })
    })
  })

  describe('`setCredentialsToken()`', () => {
    beforeEach(() => {
      /**
       * JSON doesn't like to be spied on so temporarily overwrite it
       */
      global.JSON = {
        stringify: jest.fn().mockReturnValue('MOCK CREDENTIALS TOKEN JSON')
      }
    })

    afterEach(() => {
      writeFile.mockReset()

      /**
       * Delete the overwritten JSON object
       */
      delete global.JSON
    })

    describe('`hasCredentialsTokenJson()` returns true', () => {
      beforeEach(() => {
        hasCredentialsTokenJson.mockReturnValue(true)
        getCredentialsTokenJson.mockReturnValue('MOCK CREDENTIALS TOKEN JSON')
      })

      afterEach(() => {
        hasCredentialsTokenJson.mockReset()
        getCredentialsTokenJson.mockReset()
      })

      it('does not transform the credentials token to a string', async () => {
        await setCredentialsToken({})

        expect(JSON.stringify)
          .not.toBeCalled()
      })

      it('does not write the credentials token to the file system', async () => {
        await setCredentialsToken({})

        expect(writeFile)
          .not.toBeCalled()
      })
    })

    describe('`hasCredentialsTokenJson()` returns false', () => {
      beforeEach(() => {
        hasCredentialsTokenJson.mockReturnValue(false)
        getCredentialsTokenPath.mockReturnValue('MOCK CREDENTIALS TOKEN PATH')
      })

      afterEach(() => {
        hasCredentialsTokenJson.mockReset()
        getCredentialsTokenPath.mockReset()
      })

      it('transforms the credentials token to a string', async () => {
        await setCredentialsToken({})

        expect(JSON.stringify)
          .toBeCalledWith({})
      })

      it('writes the credentials token to the file system', async () => {
        await setCredentialsToken({})

        expect(writeFile)
          .toBeCalledWith('MOCK CREDENTIALS TOKEN PATH', 'MOCK CREDENTIALS TOKEN JSON')
      })
    })
  })
})
