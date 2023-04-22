/**
 * Get a draft in the `full` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
export const getDraftFormatFull = async ({ users: { drafts } }, { user = 'me', id } = {}) => drafts.get({ userId: user, id, format: 'full' })

/**
 * Get a draft in the `minimal` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
export const getDraftFormatMinimal = async ({ users: { drafts } }, { user = 'me', id } = {}) => drafts.get({ userId: user, id, format: 'minimal' })

/**
 * Get a draft in the `raw` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
export const getDraftFormatRaw = async ({ users: { drafts } }, { user = 'me', id } = {}) => drafts.get({ userId: user, id, format: 'raw' })

/**
 * Get a draft in the `metadata` format by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
export const getDraftFormatMetadata = async ({ users: { drafts } }, { user = 'me', id, headers = [] } = {}) => drafts.get({ userId: user, id, format: 'metadata', metadataHeaders: headers })

/**
 * Get a draft by ID from Google using the Gmail API
 *
 * @param {object} gmail - Google Gmail API
 * @param {object} parameters - User-defined arguments
 * @returns {Promise<object>} Returns a promise resolving to an object
 */
export const getDraft = async ({ users: { drafts } }, { user = 'me', id } = {}) => drafts.get({ userId: user, id })
