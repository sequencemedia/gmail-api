const { google } = require('googleapis')

const {
  readFile,
  writeFile
} = require('sacred-fs')

const debug = require('debug')

const readline = require('readline')

const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'
const INVALID_AUTHORISATION_CODE = 'An invalid authorisation code was entered'

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]
const {
  CREDENTIALS_PATH = 'credentials.json',
  CREDENTIALS_TOKEN_PATH = 'x-credentials-token.json'
} = process.env

// const log = debug('fb-gmail-api:log')
const error = debug('fb-gmail-api:error')

function setAuthUrlToTui (authUrl) {
  console.log('Authorise this app at the URL:', authUrl)
}

/**
 *  @return {Promise<string>} A promise resolving to an authorisation code
 */
const getAuthCodeFromTui = () => (
  new Promise((resolve) => {
    const tui = readline.createInterface({ input: process.stdin, output: process.stdout })

    tui.question('Enter the authorisation code: ', (authCode) => tui.close() || resolve(authCode))
  })
)

/**
 *  @return {Promise<object>} A promise resolving to a credentials token
 */
const getCredentialsTokenForAuthCode = (oAuth2, authCode) => (
  new Promise((resolve, reject) => {
    oAuth2.getToken(authCode, (e, token) => (!e) ? resolve(token) : reject(e))
  })
)

/**
 *  Get an `oAuth2` instance
 *
 *  @return {object} An `oAuth2` instance
 */
const getOAuth2 = ({
  installed: {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [
      redirectUri
    ] = []
  } = {}
} = {}) => new google.auth.OAuth2(clientId, clientSecret, redirectUri)

/**
 *  Get an `oAuth2` instance for the credentials and
 *  set the credentials token to the `oAuth2` instance
 *
 *  @return {object} An `oAuth2` instance
 */
async function getOAuth2ForCredentials (credentials) {
  const oAuth2 = getOAuth2(credentials)

  try {
    const credentialsToken = await getCredentialsToken()

    oAuth2.setCredentials(credentialsToken)
  } catch ({ code, ...e }) {
    if (code === 'ENOENT') {
      error(ENOENT_CREDENTIALS_TOKEN)

      const credentialsToken = await generateCredentialsToken(oAuth2)

      oAuth2.setCredentials(credentialsToken)
    } else {
      const {
        message
      } = e

      error(message)
    }
  }

  return oAuth2
}

/**
 *  Read the credentials from the file system
 *
 *  @return {Promise<string>} A promise resolving to file data
 */
const readCredentials = async () => readFile(CREDENTIALS_PATH)

/**
 *  Get the credentials as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentials = async () => (
  JSON.parse(
    await readCredentials()
  )
)

/**
 *  Read the credentials token from the file system
 *
 *  @return {Promise<string>} File data
 */
const readCredentialsToken = async () => readFile(CREDENTIALS_TOKEN_PATH)

/**
 *  Get the credentials token as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentialsToken = async () => (
  JSON.parse(
    await readCredentialsToken()
  )
)

/**
 *  Write the credentials token to the file system
 *
 *  @return {Promise} A promise
 */
const writeCredentialsToken = async (credentialsToken) => writeFile(CREDENTIALS_TOKEN_PATH, credentialsToken)

/**
 *  Set the credentials token as a string
 *
 *  @return {Promise} A promise
 */
const setCredentialsToken = async (credentialsToken) => (
  writeCredentialsToken(
    JSON.stringify(credentialsToken)
  )
)

async function generateCredentialsToken (oAuth2) {
  const authUrl = oAuth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES })

  setAuthUrlToTui(authUrl)

  try {
    const authCode = await getAuthCodeFromTui()
    const credentialsToken = await getCredentialsTokenForAuthCode(oAuth2, authCode)

    await setCredentialsToken(credentialsToken)

    return credentialsToken
  } catch ({ code, ...e }) {
    if (Number(code) === 400) error(INVALID_AUTHORISATION_CODE)
    else {
      const {
        message
      } = e

      error(message)
    }
  }
}

async function getAuth () {
  try {
    const credentials = await getCredentials()

    return getOAuth2ForCredentials(credentials)
  } catch ({ code, ...e }) {
    if (code === 'ENOENT') {
      /**
       *  There are no credentials on the file system
       */
      error(ENOENT_CREDENTIALS)
    } else {
      const {
        message
      } = e

      error(message)
    }
  }
}

module.exports = getAuth
