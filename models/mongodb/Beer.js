const { MongoClient } = require('mongodb');

module.exports = (config) => {
  if (!config.url || !config.dbName) {
    throw Error('No required MongoDb parameters provided');
  }
  const { url, dbName } = config;
  const client = new MongoClient(url, { useNewUrlParser: true });
  return {
    getBeers: async (search, limit) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        let query = {};
        if (search) {
          query = {
            $or: [
              {
                name: new RegExp(`/${search}/`),
              },
              {
                description: new RegExp(`/${search}/`),
              },
            ]
          };
        }
        const cursor = await col.find(query, { _id: 0 });
        if (limit) cursor.limit(Number(limit));
        cursor.sort({ name: 1 });
        return cursor.toArray();
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    getBeer: async (id) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        const beer = await col.findOne({ beerId: id }, { _id: 0 });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    saveBeer: async (items) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        const { insertedIds } = await col.insertMany([].concat(items));
        return insertedIds;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    addLike: async (id) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        await col.update({ beerId: id }, { $inc: { likes: 1 } });
        const beer = await col.findOne({ beerId: id });
        return beer;
      } catch (e) {
        throw e;
      } finally {
        client.close();
      }
    },
    addComment: async (id, comment) => {
      try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('beers');
        await col.update({ beerId: id }, { $set: { comment, commentDate: new Date() } });
        const beer = await col.findOne({ beerId: id });
        return beer;
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
        const col = db.collection('beers');
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
