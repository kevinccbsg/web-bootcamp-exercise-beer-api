
/**
 * @typedef {object} Error
 * @property {number} statusCode - Error Status code
 * @property {string} error - Error message
 */

/**
 * @typedef {object} Comment
 * @property {string} comment.required - String comment
 */

/**
 * @typedef {object} UserAccess
 * @property {string} email.required - User email - email
 * @property {string} apiKey.required - User apiKey
 */

/**
 * @typedef {object} User
 * @property {string} email - User email - email
 * @property {string} name - User name
 */

/**
 * @typedef {object} UserLogin
 * @property {string} email.required - User email - email
 */

/**
 * @typedef {object} SuccessBeer
 * @property {boolean} success
 * @property {Beer} beer - Beer detail
 */

/**
 * @typedef {object} Beers
 * @property {boolean} success
 * @property {array<Beer>} beers - Beer list
 */

/**
 * @typedef {object} Beer
 * @property {string} name - Beer name
 * @property {string} description - Beer description
 * @property {string} image - Beer image url - uri
 * @property {object} ingredients - Beer ingredients
 * @property {string} firstBrewed - Beer firstBrewed
 * @property {string} brewersTips - Beer brewersTips
 * @property {string} contributedBy - Beer contributedBy
 * @property {number} likes - Beer likes
 * @property {array<Comment>} comments - Beer comments
 */

/**
 * @typedef {object} Comment
 * @property {string} comment - Comment text
 * @property {string} dateComment - Comment date - date
 */
