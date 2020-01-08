const config = require('config');
const debug = require('debug')('BEER:load');
const fakeBeer = require('./fakeBeer.json');
const { Beer, User } = require('../models');

const load = async () => {
  try {
    debug('<---Deleting Beers DDBB--->');
    await Beer(config.get('ddbb')).deleteAll();
    await User(config.get('ddbb')).deleteAll();
    await Beer(config.get('ddbb')).deleteAll('beer_default');
    debug('<---DDBB Deleted--->');

    debug('<---DDBB CreateIndex--->');
    await Beer(config.get('ddbb')).createIndex();
    await User(config.get('ddbb')).createIndex();
    debug('<---DDBB CreateIndex finished--->');

    const fakeBeerFormated = fakeBeer.map(obj => ({
      beerId: obj.id,
      name: obj.name,
      description: obj.description,
      image: obj.image_url,
      ingredients: obj.ingredients,
      firstBrewed: obj.first_brewed,
      brewersTips: obj.brewers_tips,
      contributedBy: obj.contributed_by,
      likes: 0,
      comments: [],
    }));
    debug('<---Loading Beers--->');
    await Beer(config.get('ddbb')).saveBeers(fakeBeerFormated, 'beer_default');
    debug('<---Beers Loaded--->');
    // const userResponse = await User(config.get('ddbb')).register({ name: 'kevin', email: 'kevinccbsg@gmail.com' }, Beer);
    // debug(userResponse);
    debug('<---Digest data finished--->');
  } catch (e) {
    debug('<---Deleting DDBB--->');
    await Beer(config.get('ddbb')).deleteAll(),
    debug('<---Deleting DDBB--->');
    throw e;
  }
};

module.exports = load;
