
module.exports = {
  ddbb: {
    url: process.env.DB_URL || 'mongodb://node:node@localhost:27017',
    dbName: 'beerapi',
    type: 'mongodb',
  },
  routes: {
    swagger: {
      info: {
        description: 'This documentation for Beer API',
        title: 'Beer API',
        version: '1.0.0',
        contact: {
          name: 'Kevin Martínez',
          email: 'kevinccbsg@gmail.com',
        },
      },
      security: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-KEY',
        },
      },
      servers: [],
      baseDir: process.cwd(),
      filesPattern: './**/routes/**.js',
    },
  },
};
