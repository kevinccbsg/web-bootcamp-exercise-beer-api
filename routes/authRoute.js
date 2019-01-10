const config = require('config');
const debug = require('debug')('BEER:Auth');
const { User } = require('../models');

const authRoute = roles => async (req, res, next) => {
  debug('Checking API KEY');
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return next(new Error('403:noAPIKEY'));
  try {
    const user = await User(config.get('ddbb'))
      .isAuth(apiKey);
    debug('API KEY validated');
    if (user && roles.includes(user.role)) {
      return next();
    }
    throw 'No valid API KEY';
  } catch (e) {
    return next(new Error('403:noAPIKEYVerified'));
  }
};

module.exports = authRoute;
