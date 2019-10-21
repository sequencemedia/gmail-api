
const debug = require('debug')

const getGmail = require('./lib/gmail')

const {
  getMessagesList
} = require('./lib/gmail/messages/list')

const {
  getMessage
} = require('./lib/gmail/messages')

const {
  getLabelsList
} = require('./lib/gmail/labels/list')

const {
  getLabel
} = require('./lib/gmail/labels')

const log = debug('@sequencemedia/gmail-api:log')
const error = debug('@sequencemedia/gmail-api:error')

async function app () {
  try {
    const gmail = await getGmail()

    const labelsList = await getLabelsList(gmail)

    log('labelsList', labelsList.length)

    const labels = await Promise.all(labelsList.map((label) => getLabel(gmail, label)))

    labels
      .forEach(({ data = {} } = {}, i) => {
        log(data)
      })

    {
      const messagesList = await getMessagesList(gmail, { max: 1 })

      log('messagesList (1)', messagesList.length)

      const messages = await Promise.all(messagesList.map((message) => getMessage(gmail, message)))

      messages
        .forEach(({ data: { payload } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }

    {
      const messagesList = await getMessagesList(gmail, { query: 'foyles', max: 1 })

      log('messagesList (2)', messagesList.length)

      const messages = await Promise.all(messagesList.map((message) => getMessage(gmail, message)))

      messages
        .forEach(({ data: { payload } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }
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
      else {
        error(message)
      }
    }
  }
}

module.exports = app()
