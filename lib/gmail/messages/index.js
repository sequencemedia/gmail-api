const transformToMessagesListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

/**
 * @param {number} max - User-defined maximum number of messages to fetch
 * @param {number} i - This iteration (zero based)
 * @return {number} A lower bound of 0 and an upper bound of 500
 */
const getLimit = (max, i = 0) => Math.max(0, Math.min(500 * (i + 1) > max ? max - (500 * i) : 500, max))

/**
 * @param {object} parameters - User-defined arguments
 * @return {Promise<object>} Returns a promise resolving to an object
 */
const getMessagesListPage = async ({ gmail: { users: { messages } }, ...parameters } = {}) => messages.list(transformToMessagesListParameters(parameters))

/**
 * @param {object} parameters - User-defined arguments
 * @param {array} messageList - Accumulator of messages fetched from Gmail
 * @param {number} i - This iteration (zero based)
 * @param {number} n - Next iteration (i + 1 and calculated by default)
 * @return {Function} Returns an async function
 */
function mapMessagesListPage (parameters = {}, messagesList = [], i = 0, n = i + 1) {
  /**
   * @param {object} Gmail `message.list()` response
   * @return {Promise<array>} Returns a promise resolving to an array
   */
  return async function map ({ data: { nextPageToken: token, messages: page = [] } = {} } = {}) {
    /**
     *  Does Gmail have more messages?
     */
    if (token) {
      /**
       *  Yes! Gmail has more messages
       *
       *  From `parameters` get the maximum number of messages to fetch (1 ~ Infinity)
       */
      const {
        max
      } = parameters

      /**
       *  Calculate the number of messages to fetch in the next page (0 ~ 500)
       */
      const limit = getLimit(max, n)

      /**
       *  Can we fetch another page?
       */
      if (limit) { // 1 ~ 500 || 0
        const map = mapMessagesListPage(parameters, messagesList.concat(page), n)

        /**
         *  Fetch another page (1 ~ 500)
         */
        return map(await getMessagesListPage({ ...parameters, token, limit }))
      }

      /**
       *  This is the last page (0)
       */
      return messagesList.concat(page)
    }

    /**
     *  No, Gmail has no more messages
     */
    return messagesList.concat(page)
  }
}

async function getMessagesList (gmail, { user = 'me', query = '', max = Number.POSITIVE_INFINITY } = {}) {
  const map = mapMessagesListPage({ gmail, user, query, max })

  return map(await getMessagesListPage({ gmail, user, query, max, limit: getLimit(max) }))
}
const getMessage = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id })

module.exports = {
  getMessagesList,
  getMessage
}
