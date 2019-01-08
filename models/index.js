const path = require('path');
const stores = require('require-all')({
  dirname: __dirname,
  filter: fileName => (fileName.toLowerCase() === path.basename(__filename) ? undefined : fileName.replace('.js', '')),
});

module.exports = {
  Beer: config => stores[config.type].Beer(config),
  User: config => stores[config.type].User(config),
};
