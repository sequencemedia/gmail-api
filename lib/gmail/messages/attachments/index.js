/**
 * Get an attachment for a message by ID and message ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
const getAttachment = async ({ users: { messages: { attachments } } }, { user = 'me', id, messageId } = {}) => attachments.get({ userId: user, id, messageId })

module.exports = {
  getAttachment
}
