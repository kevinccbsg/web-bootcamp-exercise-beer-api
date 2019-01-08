
module.exports = (errorType, t) => {
  const types = {
    ERROR_APIKEY: { status: 401, error: '401 API KEY INVALID' },
    401: { status: 401, error: '401 Unauthorized' },
    400: { status: 400, error: '400 Bad request' },
    404: { status: 404, error: '404 Not found' },
    500: { status: 500, error: '500 Internal server error' },
  };
  return types[errorType || '500'] || types['500'];
};
