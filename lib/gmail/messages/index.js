const transformToMessagesListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

const getLimit = (max, i = 0) => Math.max(0, Math.min(500 * (i + 1) > max ? max - (500 * i) : 500, max))

const getMessagesListPage = async ({ gmail: { users: { messages } }, ...parameters }) => messages.list(transformToMessagesListParameters(parameters))
const mapMessagesListPage = (parameters, messagesList = [], i = 0, n = i + 1) => async ({ data: { nextPageToken: token, messages: page = [] } }) => {
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
    return (limit) // 1 ~ 500 || 0
      /**
       *  Fetch another page (1 ~ 500)
       */
      ? getMessagesListPage({ ...parameters, token, limit }).then(mapMessagesListPage(parameters, messagesList.concat(page), n))
      /**
       *  This is the last page (0)
       */
      : messagesList.concat(page)
  }

  /**
   *  No, Gmail has no more messages
   */
  return messagesList.concat(page)
}

const getMessagesList = async (gmail, { user = 'me', query = '', max = Number.POSITIVE_INFINITY } = {}) => getMessagesListPage({ gmail, user, query, max, limit: getLimit(max) }).then(mapMessagesListPage({ gmail, user, query, max }))
const getMessage = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id })

module.exports = {
  getMessagesList,
  getMessage
}
