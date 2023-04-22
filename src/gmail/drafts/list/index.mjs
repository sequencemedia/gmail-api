/**
 * Transform user-defined parameters to parameters for the Gmail API
 *
 * @param {object} User-defined parameters
 * @returns {object} Transformed parameters for the Gmail API
 */
const transformToDraftsListParameters = ({ user, token, query, limit }) => ({
  userId: user,
  ...(token ? { pageToken: token } : {}),
  ...(query ? { q: query } : {}),
  ...(limit ? { maxResults: limit } : {})
})

/**
 * Calculate the maximum number of results to fetch from Google with
 * primitives
 *
 * @param {number} max - User-defined maximum number of drafts to fetch
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
const getDraftsList = async ({ gmail: { users: { drafts } }, ...parameters } = {}) => drafts.list(transformToDraftsListParameters(parameters))

/**
 * Curry parameters for an async function which concats a page of drafts
 * and fetches another page (or not)
 *
 * @param {object} parameters - User-defined arguments
 * @param {array} draftsList - Accumulator of drafts fetched from Gmail
 * @param {number} i - This iteration (zero based)
 * @param {number} n - Next iteration (i + 1 and calculated by default)
 * @returns {Function} Returns an async function
 */
function mapDraftsList (parameters = {}, draftsList = [], i = 0, n = i + 1) {
  /**
   * Map the response from Google to the drafts
   *
   * @param {object} Response from Gmail API
   * @returns {Promise<array>} Returns a promise resolving to an array
   */
  return async function map ({ data: { nextPageToken: token = '', drafts = [] } = {} } = {}) {
    /**
     *  Does Gmail have more drafts?
     */
    if (token) {
      /**
       *  Yes! Gmail has more drafts, so calculate the number of drafts for another page
       */
      const limit = getLimitForParameters(parameters, n)

      /**
       *  Can we fetch another page?
       */
      if (limit) { // 1 ~ 500 || 0
        const map = mapDraftsList(parameters, draftsList.concat(drafts), n)

        /**
         *  Fetch another page (1 ~ 500)
         */
        return map(await getDraftsList({ ...parameters, token, limit }))
      }
    }

    /**
     *  Either: No, Gmail has no more drafts
     *  Or: This is the last page (0)
     */
    return draftsList.concat(drafts)
  }
}

/**
 * Get a list of draft IDs from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<array>} Returns a promise resolving to an array
 */
export async function getDrafts (gmail, { max = Number.POSITIVE_INFINITY, ...parameters } = {}) {
  const limit = getLimit(max)

  /**
   *  Can we fetch any drafts?
   */
  if (limit) {
    const {
      user = 'me',
      query = ''
    } = parameters

    const map = mapDraftsList({ gmail, max, user, query })

    /**
     *  Fetch `limit` drafts
     */
    return map(await getDraftsList({ gmail, max, user, query, limit }))
  }

  /**
   *  No, we cannot fetch any drafts
   */
  return []
}
