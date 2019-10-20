const blessed = require('blessed') // neo-blessed
const clipboardy = require('clipboardy')

const {
  SCOPES
} = require('./lib/constants')

const {
  getAuthForCredentials,
  getCredentialsTokenForAuthCode,
  getCredentials,
  setCredentialsToken
} = require('./lib/auth')

const AUTHORISATION_URL_CONTENT = 'Copy this URL to your clipboard and visit it to get an authorisation code from Google.'
const CREDENTIALS_TOKEN_CONTENT = 'Paste the authorisation code from Google.'

function renderAuthorisationUrlScreen (screen, authorisationUrl, complete) {
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: 80,
    height: 28,
    content: AUTHORISATION_URL_CONTENT,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    border: {
      type: 'line'
    },
    style: {
      fg: '#ffffff',
      bg: '#006600',
      border: {
        fg: '#009900'
      }
    }
  })

  const textarea = blessed.textarea({
    top: 'center',
    left: 'center',
    value: authorisationUrl,
    width: 76,
    height: 12,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    border: {
      type: 'line'
    },
    style: {
      bold: true,
      fg: '#000000',
      bg: '#999999',
      border: {
        fg: '#cccccc'
      }
    }
  })

  const copy = blessed.button({
    shrink: true,
    content: 'Copy to clipboard',
    right: 16,
    bottom: 0,
    align: 'center',
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    style: {
      fg: '#000000',
      bg: '#666666',
      hover: {
        bold: true,
        bg: '#ffffff'
      },
      focus: {
        inverse: true
      }
    }
  })

  const next = blessed.button({
    shrink: true,
    content: 'Next',
    right: 0,
    bottom: 0,
    align: 'center',
    width: 15,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    style: {
      fg: '#000000',
      bg: '#666666',
      hover: {
        bold: true,
        bg: '#ffffff'
      },
      focus: {
        inverse: true
      }
    }
  })

  screen.enableKeys(copy)
  screen.enableKeys(next)

  const buttons = [{ button: copy }, { button: next }]

  screen.key(['escape', 'q', 'C-c'], () => { process.exit() })

  screen.key(['tab'], () => {
    const alpha = buttons.find(({ hasFocus }) => hasFocus)
    if (alpha) delete alpha.hasFocus

    const omega = buttons.find((b) => b !== alpha)
    if (omega) {
      const { button } = omega
      button.focus()
      omega.hasFocus = true
    }
  })

  copy.on('click', async () => {
    box.focus()

    await clipboardy.write(textarea.getValue())
  })

  copy.key(['enter'], async () => {
    box.focus()

    await clipboardy.write(textarea.getValue())
  })

  next.on('click', () => {
    box.hide()

    complete()
  })

  next.key(['enter'], () => {
    box.hide()

    complete()
  })

  box.append(textarea)

  box.append(copy)
  box.append(next)

  box.show()

  screen.append(box)
  screen.render()
}

function renderInputCredentialsTokenScreen (screen, oAuth2, complete) {
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: 80,
    height: 28,
    content: CREDENTIALS_TOKEN_CONTENT,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    border: {
      type: 'line'
    },
    style: {
      fg: '#ffffff',
      bg: '#006600',
      border: {
        fg: '#009900'
      }
    }
  })

  const textarea = blessed.textarea({
    parent: box,
    top: 'center',
    left: 'center',
    width: 76,
    height: 12,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    border: {
      type: 'line'
    },
    style: {
      bold: true,
      fg: '#000000',
      bg: '#999999',
      border: {
        fg: '#cccccc'
      }
    }
  })

  const paste = blessed.button({
    shrink: true,
    content: 'Paste from clipboard',
    right: 34,
    bottom: 0,
    align: 'center',
    keys: 'enter',
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    style: {
      fg: '#000000',
      bg: '#666666',
      hover: {
        bold: true,
        bg: '#ffffff'
      },
      focus: {
        inverse: true
      }
    }
  })

  const write = blessed.button({
    shrink: true,
    content: 'Write to file',
    right: 16,
    bottom: 0,
    align: 'center',
    keys: 'enter',
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    style: {
      fg: '#000000',
      bg: '#666666',
      hover: {
        bold: true,
        bg: '#ffffff'
      },
      focus: {
        inverse: true
      }
    }
  })

  const done = blessed.button({
    shrink: true,
    content: 'Done',
    right: 0,
    bottom: 0,
    align: 'center',
    width: 15,
    padding: {
      top: 1,
      right: 2,
      bottom: 1,
      left: 2
    },
    style: {
      fg: '#000000',
      bg: '#666666',
      hover: {
        bold: true,
        bg: '#ffffff'
      },
      focus: {
        inverse: true
      }
    }
  })

  screen.enableKeys(paste)
  screen.enableKeys(write)
  screen.enableKeys(done)

  const buttons = [{ button: paste }, { button: write }, { button: done }]

  screen.key(['escape', 'q', 'C-c'], () => { process.exit() })

  screen.key(['tab'], () => {
    const alpha = buttons.find(({ hasFocus }) => hasFocus)
    if (alpha) {
      delete alpha.hasFocus

      const index = (alpha) ? buttons.findIndex((button) => button === alpha) : 0

      const i = (index + 1 === buttons.length) ? 0 : index + 1

      const omega = buttons[i]
      if (omega) {
        const { button } = omega
        button.focus()
        omega.hasFocus = true
      }
    } else {
      const [
        omega
      ] = buttons

      if (omega) {
        const { button } = omega
        button.focus()
        omega.hasFocus = true
      }
    }
  })

  async function handlePaste () {
    box.focus()

    const value = await clipboardy.read()

    textarea.setValue(value)
  }

  async function handleWrite () {
    box.focus()

    const credentialsToken = await getCredentialsTokenForAuthCode(oAuth2, textarea.getValue())

    await setCredentialsToken(credentialsToken)
  }

  function handleDone () {
    box.hide()

    complete()
  }

  paste.on('click', handlePaste)
  paste.key(['enter'], handlePaste)

  write.on('click', handleWrite)
  write.key(['enter'], handleWrite)

  done.on('click', handleDone)
  done.key(['enter'], handleDone)

  box.append(textarea)
  box.append(paste)
  box.append(write)
  box.append(done)

  box.show()

  screen.append(box)
  screen.render()

  textarea.focus()
}

async function app () {
  try {
    const credentials = await getCredentials()
    const oAuth2 = await getAuthForCredentials(credentials)
    const authorisationUrl = oAuth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES })

    const screen = blessed.screen({
      smartCSR: true,
      title: 'Credentials for Gmail'
    })

    renderAuthorisationUrlScreen(screen, authorisationUrl, function () {
      renderInputCredentialsTokenScreen(screen, oAuth2, function () {
        process.exit()
      })
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = app()
