const { google } = require('googleapis')

const getAuth = require('../auth')

async function getGmail () {
  const auth = await getAuth()

  return google.gmail({ version: 'v1', auth })
}

module.exports = getGmail
