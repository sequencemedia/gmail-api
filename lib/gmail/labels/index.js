/**
 * Get a label by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getLabel = async ({ users: { labels } }, { user = 'me', id } = {}) => labels.get({ userId: user, id })

module.exports = {
  getLabel
}
