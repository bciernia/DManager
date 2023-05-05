const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');

client.connect();

const db = client.db('DManager');

const characters = db.collection('characters');
const teams = db.collection('teams');
const campaigns = db.collection('campaigns');
const sessions = db.collection('sessions');
const scenarios = db.collection('scenarios');
const handouts = db.collection('handouts');
const locations = db.collection('locations');

module.exports = {
    db,
    characters,
    teams,
    client,
    scenarios,
    campaigns,
    sessions,
    handouts,
    locations,
};