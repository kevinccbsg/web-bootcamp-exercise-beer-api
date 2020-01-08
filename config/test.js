
module.exports = {
  ddbb: {
    url: process.env.DB_URL || 'mongodb://node:node@localhost:27017/beerapi',
    dbName: 'beerapi',
    type: 'mongodb',
  },
};
