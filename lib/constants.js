const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]

/**
 * Error messages
 */
const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'

module.exports = {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN
}
