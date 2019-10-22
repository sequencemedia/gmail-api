
const debug = require('debug')

const getGmail = require('./lib/gmail')

const {
  getMessages
} = require('./lib/gmail/messages/list')

const {
  getMessage
} = require('./lib/gmail/messages')

const {
  getDrafts
} = require('./lib/gmail/drafts/list')

const {
  getDraft
} = require('./lib/gmail/drafts')

const {
  getLabels
} = require('./lib/gmail/labels/list')

const {
  getLabel
} = require('./lib/gmail/labels')

const log = debug('@sequencemedia/gmail-api:log')
const error = debug('@sequencemedia/gmail-api:error')

async function app () {
  try {
    const gmail = await getGmail()

    {
      const messagesList = await getMessages(gmail, { max: 1 })

      log('messagesList (1)', messagesList.length)

      const messages = await Promise.all(messagesList.map((message) => getMessage(gmail, message)))

      messages
        .forEach(({ data: { payload } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }

    {
      const messagesList = await getMessages(gmail, { query: 'ministryofjustice', max: 1 })

      log('messagesList (2)', messagesList.length)

      const messages = await Promise.all(messagesList.map((message) => getMessage(gmail, message)))

      messages
        .forEach(({ data: { payload } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }

    {
      const draftsList = await getDrafts(gmail, { max: 1 })

      log('draftsList (1)', draftsList.length)

      const drafts = await Promise.all(draftsList.map((draft) => getDraft(gmail, draft)))

      drafts
        .forEach(({ data: { message: { payload } = {} } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }

    {
      const draftsList = await getDrafts(gmail, { query: 'ministryofjustice', max: 1 })

      log('draftsList (2)', draftsList.length)

      const drafts = await Promise.all(draftsList.map((draft) => getDraft(gmail, draft)))

      drafts
        .forEach(({ data: { message: { payload } = {} } = {} } = {}, i) => {
          log(payload.headers.find(({ name }) => name.toLowerCase() === 'subject'), i + 1)
        })
    }

    const labelsList = await getLabels(gmail)

    log('labelsList', labelsList.length)

    const labels = await Promise.all(labelsList.map((label) => getLabel(gmail, label)))

    labels
      .forEach(({ data = {} } = {}, i) => {
        log(data)
      })
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
