const {MongoClient} = require('mongodb');
const {ConnectionString} = require('../secrets/Credentials');

//local connection
//const client = new MongoClient('mongodb://127.0.0.1:27017');

const client = new MongoClient(ConnectionString);

client.connect();

const db = client.db('DMsAssistant');

const characters = db.collection('characters');
const teams = db.collection('teams');
const campaigns = db.collection('campaigns');
const sessions = db.collection('sessions');
const scenarios = db.collection('scenarios');
const handouts = db.collection('handouts');
const locations = db.collection('locations');
const notes = db.collection('notes');
const spells = db.collection('spells');
const quests = db.collection('quests');

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
    notes,
    spells,
    quests,
};