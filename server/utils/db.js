const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

client.connect();

const db = client.db('DManager');

const characters = db.collection('characters');

module.exports = {
    db,
    characters,
    client,
};