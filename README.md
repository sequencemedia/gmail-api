# @sequencemedia/gmail-api

The `@sequencemedia/gmail-api` package is an `async` interface to the Gmail API by Google.

* It exports functions for querying and requesting Gmail messages, drafts, and labels
* It must be authorised to do so by a human

## Usage

### Messages

```javascript
import getGmail from '@sequencemedia/gmail-api/src/gmail'

import {
  getMessages
} from '@sequencemedia/gmail-api/src/gmail/messages/list'

import {
  getMessage
} from '@sequencemedia/gmail-api/src/gmail/messages'

const gmail = await getGmail()
const messageList = await getMessages(gmail, { max: 100 })
const messages = await Promise.all(messagesList.map((message) => getMessage(gmail, message)))

messages
  .forEach((message) => {
    console.log(message)
  })
```

Labels and drafts follow the same pattern.

### Labels

```javascript
import getGmail from '@sequencemedia/gmail-api/src/gmail'

import {
  getLabels
} from '@sequencemedia/gmail-api/src/gmail/labels/list'

import {
  getLabel
} from '@sequencemedia/gmail-api/src/gmail/labels'

const gmail = await getGmail()
const labelList = await getLabels(gmail)
const labels = await Promise.all(labelsList.map((label) => getLabel(gmail, label)))

labels
  .forEach((label) => {
    console.log(label)
  })
```

See also messages and drafts.

### Drafts
```javascript
import getGmail from '@sequencemedia/gmail-api/src/gmail'

import {
  getDrafts
} from '@sequencemedia/gmail-api/src/gmail/drafts/list'

import {
  getDraft
} from '@sequencemedia/gmail-api/src/gmail/drafts'

const gmail = await getGmail()
const draftList = await getDrafts(gmail, { max: 100 })
const drafts = await Promise.all(draftsList.map((draft) => getDraft(gmail, draft)))

drafts
  .forEach((draft) => {
    console.log(draft)
  })
```

See also labels and messages.


## Credentials

You must supply _public_ or _internal_ `oAuth` 2.0 credentials for an application registered with the [Google developer console](https://console.developers.google.com) which has the Gmail API enabled, and a credentials token authorising the application to access a Gmail account you control. (The credentials identify your application. The credentials token confirms that your application is authorised to access your Gmail account.)

## Configuration

Credentials and credentials tokens can be supplied either as environment variables or as arguments on the command line.

### Environment variables

You can supply paths to files on the file system:

```bash
CREDENTIALS_PATH
CREDENTIALS_TOKEN_PATH
```

Or, you can supply JSON:

```bash
CREDENTIALS_JSON
CREDENTIALS_TOKEN_JSON
```

Credentials and credentials tokens supplied as environment variables containing JSON are _never written to the file system_.

### Command-line arguments

Similarly, you can supply paths to files on the file system:

```bash
--credentials-path
--credentials-token-path
```

Or, you can supply JSON:

```bash
--credentials-json
--credentials-token-json
```

Again, credentials and credentials tokens supplied as command-line arguments containing JSON are _never written to the file system_.

### Precedence

* Command-line arguments supersede environment variables (so if you have supplied both, the command line arguments will be used)
* JSON supersedes paths (so if you have supplied both, the JSON will be used, and nothing will touch the file system)

## Privacy Policy

The `@sequencemedia/gmail-api` package does not store any data from Gmail, not does it gather usage data.
