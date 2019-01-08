const config = require('config');
const debug = require('debug')('BEER:User');
const validator = require('validator');
const { User } = require('../models');

module.exports.login = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) throw '400';
    if (!validator.isEmail(email)) throw '400:email';
    const user = await User(config.get('ddbb'))
      .login(email);
    return res.status(201).json({ success: true, user });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};

module.exports.register = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) throw '400';
    if (!validator.isEmail(email)) throw '400:email';
    const user = await User(config.get('ddbb'))
      .register({ name, email });
    return res.status(201).json({ success: true, user });
  } catch (e) {
    debug(e);
    return next(new Error(e));
  }
};
