const { google } = require('googleapis')

const debug = require('debug')

const getAuth = require('../auth')

const error = debug('@sequencemedia/gmail-api:gmail:error')

/**
 *  Get an `auth` instance and return a `gmail` object
 *
 *  @return {Promise<object>} A promise resolving to a `gmail` object
 */
async function getGmail () {
  try {
    const auth = await getAuth()

    return google.gmail({ version: 'v1', auth })
  } catch (e) {
    const {
      code
    } = e

    if (Number(code) === 401) error('Not authorised')
    else {
      const {
        message
      } = e

      if (code) error(code, message)
      else { error(message) }
    }
  }
}

module.exports = getGmail
