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

/**
 * Error messages
 */
const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'

/**
 * Default Path
 */
const CREDENTIALS_PATH = 'credentials.json'
const CREDENTIALS_TOKEN_PATH = 'credentials-token.json'

const hasCredentialsPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_PATH')

const hasCredentialsTokenPathEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_TOKEN_PATH')

const getCredentialsPathEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_PATH')

const getCredentialsTokenPathEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_TOKEN_PATH')

const hasCredentialsJsonEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_JSON')

const hasCredentialsTokenJsonEnvValue = ({ env = {} } = process) => Reflect.has(env, 'CREDENTIALS_TOKEN_JSON')

const getCredentialsJsonEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_JSON')

const getCredentialsTokenJsonEnvValue = ({ env = {} } = process) => Reflect.get(env, 'CREDENTIALS_TOKEN_JSON')

const getCredentialsPath = () => hasCredentialsPathArgValue() ? getCredentialsPathArgValue() : hasCredentialsPathEnvValue() ? getCredentialsPathEnvValue() : CREDENTIALS_PATH

const getCredentialsTokenPath = () => hasCredentialsTokenPathArgValue() ? getCredentialsTokenPathArgValue() : hasCredentialsTokenPathEnvValue() ? getCredentialsTokenPathEnvValue() : CREDENTIALS_TOKEN_PATH

const hasCredentialsJson = () => hasCredentialsJsonArgValue() || hasCredentialsJsonEnvValue()

const getCredentialsJson = () => hasCredentialsJsonArgValue() ? getCredentialsJsonArgValue() : getCredentialsJsonEnvValue()

const hasCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() || hasCredentialsTokenJsonEnvValue()

const getCredentialsTokenJson = () => hasCredentialsTokenJsonArgValue() ? getCredentialsTokenJsonArgValue() : getCredentialsTokenJsonEnvValue()

module.exports = {
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
}
