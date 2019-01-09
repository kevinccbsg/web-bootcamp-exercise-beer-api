const { MongoClient } = require('mongodb');
const uuidAPIKey = require('uuid-apikey');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    register: async (user, Beer) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        const beer_col = db.collection('beer_default');
        const { uuid, apiKey } = uuidAPIKey.create();
        const beers = await beer_col.find({}).toArray();
        const userEncripted = {
          ...user,
          uuid,
          apiKey,
        };
        await col.insertOne(userEncripted);
        const userBeers = beers.map(beer => ({ ...beer, apiKey }));
        await Beer(config).saveBeers(userBeers);
        return { email: user.email, apiKey };
      } catch (e) {
        if (e.message.includes('E11000')) throw 'E11000';
        throw e;
      } finally {
        client.close();
      }
    },
    login: async (email) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        col.createIndex('email', { unique: true });
        const user = await col.findOne({ email });
        if (!user) throw '404';
        return { email: user.email, apiKey: user.apiKey };
      } catch (e) {
        if (e.message && e.message.includes('E11000')) throw 'E11000';
        throw e;
      } finally {
        client.close();
      }
    },
    isAuth: async (apiKey) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        col.createIndex('apiKey', { unique: true });
        const user = await col.findOne({ apiKey });
        if (!user) throw '403:noAPIKEYVerified';
        return true;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    deleteAll: async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        await col.deleteMany({});
        return;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
  };
};
