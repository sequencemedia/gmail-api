/**
 * Transform user-defined parameters to parameters for the Gmail API
 *
 * @param {object} User-defined parameters
 * @returns {object} Transformed parameters for the Gmail API
 */
const transformToMessagesListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

/**
 * Calculate the maximum number of results to fetch from Google with
 * primitives
 *
 * @param {number} max - User-defined maximum number of messages to fetch
 * @param {number} i - This iteration (zero based)
 * @returns {number} A lower bound of 0 and an upper bound of 500
 */
const getLimit = (max = 0, i = 0) => Math.max(0, Math.min(500 * (i + 1) > max ? max - (500 * i) : 500, max))

/**
 * Calculate the maximum number of results to fetch from Google,
 * destructuring user-defined parameters from an object into primitives
 *
 * @param {object} parameters - User-defined arguments
 * @param {number} i - This iteration (zero based)
 * @returns {(max, i) => number} {@link getLimit}
 */
const getLimitForParameters = ({ max = 0 } = {}, i = 0) => getLimit(max, i)

/**
 * Get the response from Google using the Gmail API
 *
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessagesList = async ({ gmail: { users: { messages } }, ...parameters } = {}) => messages.list(transformToMessagesListParameters(parameters))

/**
 * Curry parameters for an async function which concats a page of messages
 * and fetches another page (or not)
 *
 * @param {object} parameters - User-defined arguments
 * @param {array} messagesList - Accumulator of messages fetched from Gmail
 * @param {number} i - This iteration (zero based)
 * @param {number} n - Next iteration (i + 1 and calculated by default)
 * @returns {Function} Returns an async function
 */
function mapMessagesList (parameters = {}, messagesList = [], i = 0, n = i + 1) {
  /**
   * Map the response from Google to the messages
   *
   * @param {object} Response from Gmail API
   * @returns {Promise<array>} Returns a promise resolving to an array
   */
  return async function map ({ data: { nextPageToken: token = '', messages = [] } = {} } = {}) {
    /**
     *  Does Gmail have more messages?
     */
    if (token) {
      /**
       *  Yes! Gmail has more messages, so calculate the number of messages for another page
       */
      const limit = getLimitForParameters(parameters, n)

      /**
       *  Can we fetch another page?
       */
      if (limit) { // 1 ~ 500 || 0
        const map = mapMessagesList(parameters, messagesList.concat(messages), n)

        /**
         *  Fetch another page (1 ~ 500)
         */
        return map(await getMessagesList({ ...parameters, token, limit }))
      }
    }

    /**
     *  Either: No, Gmail has no more messages
     *  Or: This is the last page (0)
     */
    return messagesList.concat(messages)
  }
}

/**
 * Get a list of message IDs from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<array>} Returns a promise resolving to an array
 */
async function getMessages (gmail, { max = Number.POSITIVE_INFINITY, ...parameters } = {}) {
  const limit = getLimit(max)

  if (limit) {
    const {
      user = 'me',
      query = ''
    } = parameters

    const map = mapMessagesList({ gmail, max, user, query })

    return map(await getMessagesList({ gmail, max, user, query, limit }))
  }

  return []
}

module.exports = {
  getMessages
}
