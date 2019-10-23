require('module-alias/register')

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

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]

const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'

const {
  env: {
    CREDENTIALS_PATH = 'credentials.json',
    CREDENTIALS_TOKEN_PATH = 'credentials-token.json',
    CREDENTIALS_JSON,
    CREDENTIALS_TOKEN_JSON
  }
} = process

module.exports = {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
  CREDENTIALS_PATH: hasCredentialsPath() ? getCredentialsPath() : CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH: hasCredentialsTokenPath() ? getCredentialsTokenPath() : CREDENTIALS_TOKEN_PATH,
  CREDENTIALS_JSON: hasCredentialsJson() ? getCredentialsJson() : CREDENTIALS_JSON,
  CREDENTIALS_TOKEN_JSON: hasCredentialsTokenJson() ? getCredentialsTokenJson() : CREDENTIALS_TOKEN_JSON
}
