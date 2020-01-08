const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const api = require('./routes');
const errorResponses = require('./lib/errorResponses');

const debug = require('debug')('BEER:Api');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(logger(':method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  debug('Index routes');
  return res.status(200).send(`
    <div>
      <h1>Keepcoding Beer API</h1>
      <ul>
        <li>
          <a href="/api-docs">/api-docs</a>
        </li>
        <li>
          <a href="/api/v1/user/register">POST /api/v1/register</a>
        </li>
        <li>
          <a href="/api/v1/user/login">POST /api/v1/user/login</a>
        </li>
        <li>
          <a href="/api/v1/beers">GET /api/v1/beers</a>
        </li>
        <li>
          <a href="/api/v1/beer/:id/likes">POST /api/v1/tags</a>
        </li>
        <li>
          <a href="/api/v1/beer/:id/like">POST /api/v1/beers/:id/like</a>
        </li>
        <li>
          <a href="/api/v1/beer/:id/comment">POST /api/v1/beers/:id/comment</a>
        </li>
    </div>
  `);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('404');
  err.status = 404;
  return next(err);
});

app.use((err, req, res, next) => { // eslint-disable-line
  debug(err.stack);
  const { status, error } = errorResponses(err.message);
  return res.status(status).json({
    success: false,
    error,
  });
});

module.exports = app;
