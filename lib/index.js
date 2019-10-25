const constants = require('./constants')
const argv = require('./argv')
const auth = require('./auth')
const getGmail = require('./gmail')
const drafts = require('./gmail/drafts')
const draftsList = require('./gmail/drafts/list')
const messages = require('./gmail/messages')
const messagesList = require('./gmail/messages/list')
const messagesAttachments = require('./gmail/messages/attachments')

module.exports = {
  constants,
  argv,
  auth,
  gmail: {
    getGmail,
    drafts: {
      ...drafts,
      list: {
        ...draftsList
      }
    },
    messages: {
      ...messages,
      list: {
        ...messagesList
      },
      attachments: {
        ...messagesAttachments
      }
    }
  }
}
