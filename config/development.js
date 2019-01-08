
module.exports = {
  ddbb: {
    url: process.env.DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'nodepop',
    type: process.env.DB_TYPE || 'mongodb',
  },
};
