const { MongoClient } = require('mongodb');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useUnifiedTopology: true });
  return {
    createIndex: async () => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        await col.createIndex('beerId', { unique: false });
        await col.createIndex('apiKey', { unique: false });
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    getBeers: async (search, limit, apiKey) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        let query = {
          apiKey,
        };
        if (search) {
          query = {
            ...query,
            $or: [
              {
                name: new RegExp(`${search}`, 'i'),
              },
              {
                description: new RegExp(`${search}`, 'i'),
              },
            ]
          };
        }
        const cursor = await col.find(query, { _id: 0 });
        if (limit) cursor.limit(Number(limit));
        const beers = await cursor.toArray()
        return beers;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    deleteBeerLike: async (id, apiKey) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        let query = {
          apiKey,
          beerId: id,
        };
        const beer = await col.update(query, { $set: { likes: 0 } }, { _id: 0 });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    getBeer: async (id, apiKey) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        const beer = await col.findOne({ beerId: id, apiKey }, { _id: 0 });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    saveBeers: async (items, collection = 'beers') => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
        const { insertedIds } = await col.insertMany([].concat(items));
        return insertedIds;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    addLike: async (id, apiKey) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        await col.updateOne({ beerId: id, apiKey }, { $inc: { likes: 1 } });
        const beer = await col.findOne({ beerId: id });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    addComment: async (id, apiKey, comment) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        await col.update({
          beerId: id,
          apiKey,
        }, {
          $push: {
            comments: {
              comment,
              dateComment: new Date(),
            },
          },
        });
        const beer = await col.findOne({ beerId: id });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    deleteAll: async (collection = 'beers') => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection(collection);
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
