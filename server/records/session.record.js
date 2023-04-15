const {sessions} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class SessionRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.sessionName = obj.sessionName;
        this.gameSystem = obj.gameSystem;
        this.campaignId = obj.campaignId;
        this.sessionTimeId = obj.sessionTimeId;
    }

    _validate() {
        //TODO session validate
        if (this.sessionName.trim().length < 2) {
            throw new Error("Team name should be at least 3 characters.");
        }

        if (this.sessionName.length > 30) {
            throw new Error("Team name can not be longer than 150 characters.");
        }
    }

    async insert() {
        const {insertedId} = await sessions.insertOne({
            _id: this._id,
            name: this.sessionName.toString(),
            gameSystem: this.gameSystem.toString(),

        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await sessions.replaceOne({
            _id: this._id,
        }, {
            name: this.sessionName.toString(),
            gameSystem: this.gameSystem.toString(),
        });
    }

    async delete() {
        await sessions.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const team = await sessions.findOne({_id: new ObjectId(String(id))});
        return new SessionRecord(team) ?? null;
    }

    static async findAll() {
        const result = await sessions.find();
        const sessionsArray = await result.toArray();
        const ourArray = sessionsArray.map(obj => new SessionRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return sessions.find();
    }
}

module.exports = {
    SessionRecord,
}