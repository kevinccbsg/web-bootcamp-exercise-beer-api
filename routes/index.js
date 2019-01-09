const express = require('express');
const { getBeers, getBeer, addComment, addLike } = require('../controllers/beer');
const { login, register } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

router.get('/v1/beers', authRoute, getBeers);
router.get('/v1/beers/:id', authRoute, getBeer);
router.post('/v1/beers/:id/comment', authRoute, addComment);
router.post('/v1/beers/:id/like', authRoute, addComment);
router.post('/v1/user/login', login);
router.post('/v1/user/register', register);

module.exports = router;
