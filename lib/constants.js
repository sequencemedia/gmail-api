const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]

const ENOENT_CREDENTIALS = 'Unable to read the credentials file'
const ENOENT_CREDENTIALS_TOKEN = 'Unable to read the credentials token file'

const {
  CREDENTIALS_PATH = 'credentials.json',
  CREDENTIALS_TOKEN_PATH = 'credentials-token.json'
} = process.env

module.exports = {
  SCOPES,
  ENOENT_CREDENTIALS,
  ENOENT_CREDENTIALS_TOKEN,
  CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH
}
