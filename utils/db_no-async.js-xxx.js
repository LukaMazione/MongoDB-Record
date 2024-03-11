const { MongoClient } = require('mongodb');

const client = new MongoClient('xxx');

client.connect();

const db = client.db('xxx');

const todos = db.collection('todos');

module.exports = {
  db,
  todos,
  client,
};
