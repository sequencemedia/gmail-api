import * as constants from './constants.mjs'
import * as parameters from './parameters.mjs'
import * as argv from './argv/index.mjs'
import * as auth from './auth/index.mjs'
import getGmail from './gmail/index.mjs'
import * as drafts from './gmail/drafts/index.mjs'
import * as draftsList from './gmail/drafts/list/index.mjs'
import * as messages from './gmail/messages/index.mjs'
import * as messagesList from './gmail/messages/list/index.mjs'
import * as messagesAttachments from './gmail/messages/attachments/index.mjs'

export default {
  constants,
  parameters,
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
