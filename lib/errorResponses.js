
module.exports = (errorType, t) => {
  const types = {
    '403:noAPIKEY': { status: 403, error: '403 API KEY INVALID' },
    '403:noAPIKEYVerified': { status: 403, error: '403 API KEY INVALID' },
    401: { status: 401, error: '401 Unauthorized' },
    400: { status: 400, error: '400 Bad request' },
    '400:email': { status: 400, error: '400 Bad request Email invalid' },
    404: { status: 404, error: '404 Not found' },
    500: { status: 500, error: '500 Internal server error' },
  };
  return types[errorType || '500'] || types['500'];
};
