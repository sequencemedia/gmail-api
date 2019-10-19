
const debug = require('debug')

const getGmail = require('./lib/gmail')

const {
  getMessagesList,
  getMessage
} = require('./lib/gmail/messages')

const error = debug('@sequencemedia/gmail-api:error')

async function app () {
  try {
    const gmail = await getGmail()

    {
      const messagesList = await getMessagesList(gmail, { max: 1 })

      console.log('length (1)', messagesList.length)

      Promise.all(messagesList.map((message) => getMessage(gmail, message)))
        .then((messagesList) => {
          messagesList.forEach(({ data: { payload } }) => {
            console.log(payload)
          })
        })
    }

    {
      const messagesList = await getMessagesList(gmail, { query: 'foyles', max: 1 })

      console.log('length (2)', messagesList.length)

      Promise.all(messagesList.map((message) => getMessage(gmail, message)))
        .then((messagesList) => {
          messagesList.forEach(({ data: { payload } }) => {
            console.log(payload)
          })
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
