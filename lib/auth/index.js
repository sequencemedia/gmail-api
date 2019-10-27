require('module-alias/register')

const { google } = require('googleapis')

const {
  readFile,
  writeFile
} = require('sacred-fs')

const debug = require('debug')

const {
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN
} = require('@sequencemedia/gmail-api/lib/constants')

const {
  getCredentialsPath,
  getCredentialsTokenPath,
  hasCredentialsJson,
  getCredentialsJson,
  hasCredentialsTokenJson,
  getCredentialsTokenJson
} = require('@sequencemedia/gmail-api/lib/parameters')

const error = debug('@sequencemedia/gmail-api:auth:error')

function handleCredentialsError (e) {
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
    else {
      error(message)
    }
  }
}

function handleCredentialsTokenError (e) {
  const {
    code
  } = e

  if (code === 'ENOENT') {
    /**
     *  There is no credentials token on the file system
     */
    error(ENOENT_CREDENTIALS_TOKEN)
  } else {
    const {
      message
    } = e

    error(message)
  }
}

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
const getAuthFor = ({
  installed: {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [
      redirectUri
    ] = []
  } = {}
} = {}) => new google.auth.OAuth2(clientId, clientSecret, redirectUri)

/**
 *  Read the credentials from the file system
 *
 *  @return {Promise<string>} A promise resolving to file data
 */
const readCredentials = async () => readFile(getCredentialsPath())

/**
 *  Write the credentials to the file system
 *
 *  @return {Promise} A promise
 */
const writeCredentials = async (credentials) => writeFile(getCredentialsPath(), credentials)

/**
 *  Get the credentials as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentials = async () => (
  JSON.parse(
    hasCredentialsJson()
      ? getCredentialsJson()
      : await readCredentials()
  )
)

/**
 *  Set the credentials as a string
 *
 *  @return {Promise} A promise
 */
const setCredentials = async (credentials) => {
  if (!hasCredentialsJson()) {
    await writeCredentials(
      JSON.stringify(credentials)
    )
  }
}

/**
 *  Read the credentials token from the file system
 *
 *  @return {Promise<string>} File data
 */
const readCredentialsToken = async () => readFile(getCredentialsTokenPath())

/**
 *  Write the credentials token to the file system
 *
 *  @return {Promise} A promise
 */
const writeCredentialsToken = async (credentialsToken) => writeFile(getCredentialsTokenPath(), credentialsToken)

/**
 *  Get the credentials token as an object
 *
 *  @return {Promise<object>} A promise resolving to file data parsed from JSON
 */
const getCredentialsToken = async () => (
  JSON.parse(
    hasCredentialsTokenJson()
      ? getCredentialsTokenJson()
      : await readCredentialsToken()
  )
)

/**
 *  Set the credentials token as a string
 *
 *  @return {Promise} A promise
 */
const setCredentialsToken = async (credentialsToken) => {
  if (!hasCredentialsTokenJson()) {
    await writeCredentialsToken(
      JSON.stringify(credentialsToken)
    )
  }
}

/**
 *  Get the authorisation object
 *
 *  @return {Promise} A promise
 */
async function getAuth () {
  let credentials
  try {
    credentials = await getCredentials()
  } catch (e) {
    handleCredentialsError(e)
  }

  let credentialsToken
  try {
    credentialsToken = await getCredentialsToken()
  } catch (e) {
    handleCredentialsTokenError(e)
  }

  const oAuth2 = getAuthFor(credentials)

  oAuth2.setCredentials(credentialsToken)

  return oAuth2
}

module.exports = {
  getCredentials,
  setCredentials,
  getCredentialsToken,
  setCredentialsToken,
  getCredentialsTokenForAuthCode,
  getAuthFor,
  getAuth
}
