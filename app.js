const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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
    </div>
  `);
});

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

app.listen(PORT, () => debug(`Listening on PORT: ${PORT}`))
