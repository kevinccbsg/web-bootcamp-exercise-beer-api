const express = require('express');
const { getBeers, getBeer, addComment, addLike, deleteBeerLike } = require('../controllers/beer');
const { login, register } = require('../controllers/user');
const authRoute = require('./authRoute');

const router = express.Router();

router.get('/v1/beers', authRoute(['user', 'admin']), getBeers);
router.get('/v1/beers/:id', authRoute(['user', 'admin']), getBeer);
router.post('/v1/beers/:id/comment', authRoute(['user', 'admin']), addComment);
router.post('/v1/beers/:id/like', authRoute(['user', 'admin']), addLike);
router.delete('/v1/beers/:id/resetlike', authRoute(['user', 'admin']), deleteBeerLike);
router.post('/v1/user/login', login);
router.post('/v1/user/register', authRoute(['admin']), register);

module.exports = router;
