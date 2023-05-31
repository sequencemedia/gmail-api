import {
  google
} from 'googleapis'

import debug from 'debug'

import {
  getAuth
} from '#auth'

const error = debug('@sequencemedia/gmail-api:gmail:error')

function handleGmailError (e) {
  const {
    code
  } = e

  if (Number(code) === 401) error('Not authorised')
  else {
    const {
      message
    } = e

    if (code) error(code, message)
    else {
      error(message)
    }
  }
}

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
    handleGmailError(e)
  }
}

export default getGmail
