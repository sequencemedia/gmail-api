require('module-alias/register')

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

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]

const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'

const CREDENTIALS_PATH = 'credentials.json'
const CREDENTIALS_TOKEN_PATH = 'credentials-token.json'

const {
  env: {
    CREDENTIALS_JSON,
    CREDENTIALS_TOKEN_JSON
  }
} = process

const getCredentialsPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_PATH') ? Reflect.get(env, 'CREDENTIALS_PATH') : CREDENTIALS_PATH

const getCredentialsTokenPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_TOKEN_PATH') ? Reflect.get(env, 'CREDENTIALS_TOKEN_PATH') : CREDENTIALS_TOKEN_PATH

const getCredentialsPath = () => hasCredentialsPathArgValue() ? getCredentialsPathArgValue() : getCredentialsPathEnvValue()

const getCredentialsTokenPath = () => hasCredentialsTokenPathArgValue() ? getCredentialsTokenPathArgValue() : getCredentialsTokenPathEnvValue()

const hasCredentialsJson = () => hasCredentialsJsonArgValue() || !!CREDENTIALS_JSON

const getCredentialsJson = () => hasCredentialsJsonArgValue() ? getCredentialsJsonArgValue() : CREDENTIALS_JSON

const hasCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() || !!CREDENTIALS_TOKEN_JSON

const getCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() ? getCredentialsTokenJsonArgValue() : CREDENTIALS_TOKEN_JSON

module.exports = {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
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
}
