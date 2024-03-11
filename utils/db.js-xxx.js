const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI) || new MongoClient('xxx');

let db;
let todos;

const connectToMongo = async () => {
  try {
    if (!db) {
      await client.connect();
      console.log('Connected to MongoDB');

      db = client.db('xxx');
      todos = db.collection('todos');
    }
    return { db, todos, client };
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw new Error('Failed to connect to MongoDB');
  }
};

module.exports = {
  connectToMongo,
};
