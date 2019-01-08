const config = require('config');
const debug = require('debug')('BEER:Auth');

const authRoute = async (req, res, next) => {
  debug('Checking API KEY');
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return next(new Error('403:noAPIKEY'));
  try {
    // const isValid = await User().auth(apiKey);
    debug('API KEY validated');
    if (isValid) {
      return next();
    }
    throw 'No valid API KEY';
  } catch (e) {
    return next(new Error('403:noAPIKEYVerified'));
  }
};

module.exports = authRoute;
