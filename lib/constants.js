const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly'
]

const {
  CREDENTIALS_PATH = 'credentials.json',
  CREDENTIALS_TOKEN_PATH = 'credentials-token.json'
} = process.env

module.exports = {
  SCOPES,
  CREDENTIALS_PATH,
  CREDENTIALS_TOKEN_PATH
}
