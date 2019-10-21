/**
 * Get a message in the `full` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessageFormatFull = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id, format: 'full' })

/**
 * Get a message in the `minimal` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessageFormatMinimal = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id, format: 'minimal' })

/**
 * Get a message in the `raw` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessageFormatRaw = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id, format: 'raw' })

/**
 * Get a message in the `metadata` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessageFormatMetadata = async ({ users: { messages } }, { user = 'me', id, headers = [] } = {}) => messages.get({ userId: user, id, format: 'metadata', metadataHeaders: headers })

/**
 * Get a message by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getMessage = async ({ users: { messages } }, { user = 'me', id } = {}) => messages.get({ userId: user, id })

module.exports = {
  getMessageFormatFull,
  getMessageFormatMinimal,
  getMessageFormatRaw,
  getMessageFormatMetadata,
  getMessage
}
