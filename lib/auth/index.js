require('module-alias/register')

const { google } = require('googleapis')

const {
  readFile,
  writeFile
} = require('sacred-fs')

const debug = require('debug')

const {
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
  CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH,
  CREDENTIALS_JSON,
  CREDENTIALS_TOKEN_JSON
} = require('@sequencemedia/gmail-api/lib/constants')

const error = debug('@sequencemedia/gmail-api:auth:error')

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
 *  @return {Promise<object>} A promise resolving to an `oAuth2` instance
 */
async function getAuthForCredentials (credentials) {
  const oAuth2 = getOAuth2(credentials)

  try {
    const credentialsToken = await getCredentialsToken()

    oAuth2.setCredentials(credentialsToken)
  } catch ({ code, ...e }) {
    if (code === 'ENOENT') {
      error(ENOENT_CREDENTIALS_TOKEN)
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
 *  Write the credentials to the file system
 *
 *  @return {Promise} A promise
 */
const writeCredentials = async (credentials) => writeFile(CREDENTIALS_PATH, credentials)

/**
 *  Get the credentials as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentials = async () => (
  JSON.parse(
    CREDENTIALS_JSON || await readCredentials()
  )
)

/**
 *  Set the credentials as a string
 *
 *  @return {Promise} A promise
 */
const setCredentials = async (credentials) => (
  writeCredentials(
    JSON.stringify(credentials)
  )
)

/**
 *  Read the credentials token from the file system
 *
 *  @return {Promise<string>} File data
 */
const readCredentialsToken = async () => readFile(CREDENTIALS_TOKEN_PATH)

/**
 *  Write the credentials token to the file system
 *
 *  @return {Promise} A promise
 */
const writeCredentialsToken = async (credentialsToken) => writeFile(CREDENTIALS_TOKEN_PATH, credentialsToken)

/**
 *  Get the credentials token as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentialsToken = async () => (
  JSON.parse(
    CREDENTIALS_TOKEN_JSON || await readCredentialsToken()
  )
)

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

/**
 *  Get the authorisation object
 *
 *  @return {Promise} A promise
 */
async function getAuth () {
  try {
    const credentials = await getCredentials()

    return getAuthForCredentials(credentials)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') {
      /**
       *  There are no credentials on the file system
       */
      error(ENOENT_CREDENTIALS)
    } else {
      const {
        message
      } = e

      if (code) error(code, message)
      else { error(message) }
    }
  }
}

module.exports = {
  getCredentials,
  setCredentials,
  getCredentialsToken,
  setCredentialsToken,
  getCredentialsTokenForAuthCode,
  getAuth
}
