/**
 * Transform user-defined parameters to parameters for the Gmail API
 *
 * @param {object} User-defined parameters
 * @returns {object} Transformed parameters for the Gmail API
 */
const transformToLabelsListParameters = ({ user, token, query, limit }) => ({ userId: user })

/**
 * Get the response from Google using the Gmail API
 *
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getLabelsList = async ({ gmail: { users: { labels } }, ...parameters }) => labels.list(transformToLabelsListParameters(parameters))

/**
 * Map the response to the labels
 *
 * @param {object} Response from Gmail API
 * @returns {Promise<array>} Returns a promise resolving to an array
 */
const mapLabelsList = async ({ data: { labels = [] } = {} } = {}) => labels

/**
 * Get a list of labels from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<array>} Returns a promise resolving to an array
 */
const getLabels = async (gmail, { user = 'me' } = {}) => mapLabelsList(await getLabelsList({ gmail, user }))

module.exports = {
  getLabels
}
