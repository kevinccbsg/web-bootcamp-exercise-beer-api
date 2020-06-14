const express = require('express');
const { getBeers, getBeer, addComment, addLike, deleteBeerLike } = require('../controllers/beer');
const { login, register } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

/**
 * GET /v1/beers
 * @summary This endpoint retrieves beers
 * @tags Beers - Everything about Beers
 * @param {string} search.query.required - search filter query param
 * @param {number} limit.query.required - limit filter query param
 * @return {Beers} 200 - Success response
 * @return {Error} 400 - Invalid parameter
 * @return {Error} 403 - Unauthorized
 * @return {Error} default - Error
 * @security apiKeyAuth
 */
router.get('/v1/beers', authRoute(['user', 'admin']), getBeers);

/**
 * GET /v1/beers/{id}
 * @summary This endpoint retrieves one beer by Id
 * @tags Beers - Everything about Beers
 * @param {number} id.path.required - Beer Id
 * @return {Beer} 200 - Success response
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - forbiden. wrong API Key
 * @return {Error} 404 - Not found
 * @return {Error} 500 - Internal server Error
 * @security apiKeyAuth
 */
router.get('/v1/beers/:id', authRoute(['user', 'admin']), getBeer);

/**
 * POST /v1/beers/{id}/comment
 * @summary This endpoint add one comment for one beer
 * @tags Beers - Everything about Beers
 * @param {number} id.path.required - Beer Id
 * @param {Comment} request.body.required - New comment body
 * @return {SuccessBeer} 202 - Success response
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - forbiden. wrong API Key
 * @return {Error} 404 - Not found
 * @return {Error} 500 - Internal server Error
 * @security apiKeyAuth
 */
router.post('/v1/beers/:id/comment', authRoute(['user', 'admin']), addComment);

/**
 * POST /v1/beers/{id}/like
 * @summary This endpoint add one like for one beer
 * @tags Beers - Everything about Beers
 * @param {number} id.path.required - Beer Id
 * @param {Comment} request.body.required - New comment body
 * @return {SuccessBeer} 202 - Success response
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - forbiden. wrong API Key
 * @return {Error} 404 - Not found
 * @return {Error} 500 - Internal server Error
 * @security apiKeyAuth
 */
router.post('/v1/beers/:id/like', authRoute(['user', 'admin']), addLike);

/**
 * DELETE /v1/beers/{id}/resetlike
 * @summary This endpoint removes one like for one beer
 * @tags Beers - Everything about Beers
 * @param {number} id.path.required - Beer Id
 * @return {SuccessBeer} 202 - Success response
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - forbiden. wrong API Key
 * @return {Error} 404 - Not found
 * @return {Error} 500 - Internal server Error
 * @security apiKeyAuth
 */
router.delete('/v1/beers/:id/resetlike', authRoute(['user', 'admin']), deleteBeerLike);

/**
 * POST /v1/user/login
 * @summary This endpoint allows one user to login
 * @tags Users - Everything about Users
 * @param {UserLogin} request.body.required - New comment body
 * @return {UserAccess} 200 - Success response
 * @return {Error} 400 - Bad request
 * @return {Error} 403 - forbiden. wrong API Key
 * @return {Error} 404 - Not found
 * @return {Error} 500 - Internal server Error
 */
router.post('/v1/user/login', login);

/**
 * POST /v1/user/register
 * @summary This endpoint register one user
 * @tags Users - Everything about Users
 * @param {User} request.body.required - New comment body
 * @return {UserAccess} 201 - Success response
 * @return {Error} 400 - Bad request or bad email
 * @return {Error} 404 - User not found
 * @return {Error} 500 - Internal server Error
 * @security apiKeyAuth
 */
router.post('/v1/user/register', authRoute(['admin']), register);

module.exports = router;
