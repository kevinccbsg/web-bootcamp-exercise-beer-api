const { MongoClient } = require('mongodb');
const uuidAPIKey = require('uuid-apikey');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    register: async (user) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('users');
        const { uuid, apiKey } = uuidAPIKey.create();
        const userEncripted = {
          ...user,
          uuid,
          apiKey,
        };
        await col.insertOne(userEncripted);
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
        return { email: user.email, apiKey };
      } catch (e) {
        if (e.message.includes('E11000')) throw 'E11000';
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
