import blessed from 'blessed' // neo-blessed
import clipboardy from 'clipboardy'

import debug from 'debug'

import {
  SCOPES,
  ENOENT_CREDENTIALS
} from './src/constants'

import {
  getAuth,
  getCredentialsTokenForAuthCode,
  setCredentialsToken
} from './src/auth'

const error = debug('@sequencemedia/gmail-api:credentials:error')

const AUTHORISATION_URL_CONTENT = 'Copy this URL to your clipboard and visit it to get an authorisation code from Google.'
const CREDENTIALS_TOKEN_CONTENT = 'Paste the authorisation code from Google.'
const INTERSTITIAL_CONTENT = 'Go to Google! With the URL! Then come back here.'

function getTextarea (value = '') {
  return (
    blessed.textarea({
      top: 'center',
      left: 'center',
      width: 76,
      height: 12,
      value,
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
  )
}

function getCopyButton () {
  return (
    blessed.button({
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
  )
}

function getNextButton () {
  return (
    blessed.button({
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
  )
}

function getPasteButton () {
  return (
    blessed.button({
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
  )
}

function getWriteButton () {
  return (
    blessed.button({
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
  )
}

function getDoneButton () {
  return (
    blessed.button({
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
  )
}

function getBox (content) {
  return (
    blessed.box({
      top: 'center',
      left: 'center',
      width: 80,
      height: 28,
      content,
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
  )
}

function renderAuthorisationUrlScreen (screen, authorisationUrl, complete) {
  const box = getBox(AUTHORISATION_URL_CONTENT)

  const textarea = getTextarea(authorisationUrl)
  const copy = getCopyButton()
  const next = getNextButton()

  screen.enableKeys(copy)
  screen.enableKeys(next)

  const buttons = [{ button: copy }, { button: next }]

  async function handleCopy () {
    await clipboardy.write(textarea.getValue())

    box.focus()

    screen.render()
  }

  function handleNext () {
    box.hide()

    complete()
  }

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

  copy.on('click', handleCopy)
  copy.key(['enter'], handleCopy)

  next.on('click', handleNext)
  next.key(['enter'], handleNext)

  box.append(textarea)
  box.append(copy)
  box.append(next)

  screen.append(box)

  box.show()

  screen.render()
}

function renderInterstitial (screen, complete) {
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: 60,
    height: 14,
    content: INTERSTITIAL_CONTENT,
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
      bg: '#660000',
      border: {
        fg: '#990000'
      }
    }
  })

  const next = getNextButton()

  const button = {
    button: next
  }

  function handleNext () {
    box.hide()

    complete()
  }

  screen.key(['escape', 'q', 'C-c'], () => { process.exit() })

  screen.key(['tab'], () => {
    if (button.hasFocus) {
      delete button.hasFocus
      box.focus()
    } else {
      button.hasFocus = true

      const {
        button: next
      } = button

      next.focus()
    }
  })

  next.on('click', handleNext)
  next.key(['enter'], handleNext)

  box.append(next)

  screen.append(box)

  box.show()

  screen.render()
}

function renderInputCredentialsTokenScreen (screen, oAuth2, complete) {
  const box = getBox(CREDENTIALS_TOKEN_CONTENT)

  const textarea = getTextarea()

  const paste = getPasteButton()
  const write = getWriteButton()
  const done = getDoneButton()

  screen.enableKeys(paste)
  screen.enableKeys(write)
  screen.enableKeys(done)

  const buttons = [{ button: paste }, { button: write }, { button: done }]

  async function handlePaste () {
    const value = await clipboardy.read()

    textarea.setValue(value)

    box.focus()

    screen.render()
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

  screen.append(box)

  box.show()

  screen.render()
}

async function app () {
  try {
    const oAuth2 = await getAuth()
    const authorisationUrl = oAuth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES })

    const screen = blessed.screen({
      smartCSR: true,
      title: 'Credentials for Gmail'
    })

    renderAuthorisationUrlScreen(screen, authorisationUrl, function () {
      renderInterstitial(screen, function () {
        renderInputCredentialsTokenScreen(screen, oAuth2, function () {
          process.exit()
        })
      })
    })
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') {
      /**
       *  There are no credentials on the file system
       */
      error(ENOENT_CREDENTIALS)
    } else {
      const {
        message
      } = e

      if (code) error(code, message)
      else { error(message) }
    }
  }
}

module.exports = app()
