const config = require('config');
const debug = require('debug')('BEER:beer');
const validator = require('validator');
const { Beer } = require('../models');

module.exports.getBeers = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const { limit, search } = req.query;
  try {
    if (!apiKey) throw '400';
    const beers = await Beer(config.get('ddbb'))
      .getBeers(search, limit, apiKey);
    return res.status(201).json({ success: true, beers });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.getBeer = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const { id } = req.params;
  try {
    if (!id || !apiKey || isNaN(Number(id))) throw '400';
    const beer = await Beer(config.get('ddbb'))
      .getBeer(Number(id), apiKey);
    return res.status(200).json({ success: true, beer });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.addLike = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const { id } = req.params;
  try {
    if (!id || !apiKey || isNaN(Number(id))) throw '400';
    const beer = await Beer(config.get('ddbb'))
      .addLike(Number(id), apiKey);
    return res.status(202).json({ success: true, beer });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.addComment = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const { id } = req.params;
  const { comment } = req.body;
  try {
    if (!id || !comment || !apiKey || isNaN(Number(id))) throw '400';
    const beer = await Beer(config.get('ddbb'))
      .addComment(Number(id), apiKey, comment);
    return res.status(202).json({ success: true, beer });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

