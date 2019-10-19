const transformToMessagesListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

// const getLimit = (max, n) => max < 500 ? max : 500 * (n + 1) > max ? max - (500 * n) : 500
const getLimit = (max, n = 0) => Math.min(500 * (n + 1) > max ? max - (500 * n) : 500, max)

const getMessagesListPage = ({ gmail: { users: { messages } }, ...parameters }) => messages.list(transformToMessagesListParameters(parameters))
const getMessagesListPageForPageToken = ({ gmail: { users: { messages } }, ...parameters }) => messages.list(transformToMessagesListParameters(parameters))

const mapMessagesListPage = ({ max, ...parameters }) => getMessagesListPage({ limit: getLimit(max), ...parameters }).then(mapMessagesListPageForPageToken({ ...parameters, max }))
const mapMessagesListPageForPageToken = ({ max, ...parameters }, messagesList = [], n = 0) => ({ data: { nextPageToken: token, messages: page = [] } }) => {
  const limit = getLimit(max, n)

  /**
   *  This is the devil's decision tree
   */
  return (
    /**
     *  Does Google have more results?
     */
    (token)
      /*
       *  Do we want more results?
       */
      ? limit < max
        /*
         *  Can we get the last results?
         */
        ? limit < 500
          /*
           *  Get the last page (< 500)
           */
          ? getMessagesListPageForPageToken({ ...parameters, max, token, limit }).then(({ data: { messages: page = [] } }) => messagesList.concat(page))
          /*
           *  Do we have more pages or one page?
           */
          : (n + 1) * 500 < max
            /*
             *  Get another page (> 500)
             */
            ? getMessagesListPageForPageToken({ ...parameters, max, token, limit }).then(mapMessagesListPageForPageToken({ ...parameters, max }, messagesList.concat(page), n + 1))
            /*
             *  Get the last page (500)
             */
            : getMessagesListPageForPageToken({ ...parameters, max, token, limit }).then(({ data: { messages: page = [] } }) => messagesList.concat(page))
        : messagesList.concat(page)
      : messagesList.concat(page)
  )
}

const getMessagesList = async (gmail, { user = 'me', query = '', max = Number.POSITIVE_INFINITY } = {}) => mapMessagesListPage({ gmail, user, query, max })
const getMessage = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id })

module.exports = {
  getMessagesList,
  getMessage
}
