const transformToMessagesListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

// const getLimit = (max, i) => max < 500 ? max : 500 * (i + 1) > max ? max - (500 * i) : 500
const getLimit = (max, i = 0) => Math.min(500 * (i + 1) > max ? max - (500 * i) : 500, max)

const getMessagesListPage = ({ gmail: { users: { messages } }, ...parameters }) => messages.list(transformToMessagesListParameters(parameters))
const mapMessagesListPage = ({ max, ...parameters }, messagesList = [], i = 0, n = i + 1) => ({ data: { nextPageToken: token, messages: page = [] } }) => (
  /**
   *  Does Google have more results?
   */
  (token)
    /*
     *  Do we want more results?
     */
    ? (n * 500) < max
      /*
       *  Get another page (> 500)
       */
      ? getMessagesListPage({ ...parameters, token, limit: getLimit(max, i) }).then(mapMessagesListPage({ ...parameters, max }, messagesList.concat(page), n))
      /*
       *  Get the last page (~ 500)
       */
      : getMessagesListPage({ ...parameters, token, limit: getLimit(max, i) }).then(({ data: { messages: page = [] } }) => messagesList.concat(page))
    : messagesList.concat(page)
)

const getMessagesList = async (gmail, { user = 'me', query = '', max = Number.POSITIVE_INFINITY } = {}) => getMessagesListPage({ gmail, user, query, max, limit: getLimit(max) }).then(mapMessagesListPage({ gmail, user, query, max }))
const getMessage = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id })

module.exports = {
  getMessagesList,
  getMessage
}
