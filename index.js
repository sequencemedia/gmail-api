const getGmail = require('./lib/gmail')

const {
  getMessagesList,
  getMessage
} = require('./lib/gmail/messages')

async function app () {
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
}

module.exports = app()
