const {teams} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class TeamRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.gameSystem = obj.gameSystem;
    }

    _validate() {
        if (this.name.trim().length < 2) {
            throw new Error("Team name should be at least 3 characters.");
        }

        if (this.name.length > 30) {
            throw new Error("Team name can not be longer than 150 characters.");
        }
    }

    async insert() {
        const {insertedId} = await teams.insertOne({
            _id: this._id,
            name: this.name.toString(),
            gameSystem: this.gameSystem.toString(),

        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await teams.replaceOne({
            _id: this._id,
        }, {
            name: this.name.toString(),
            gameSystem: this.gameSystem.toString(),
        });
    }

    async delete() {
        await teams.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const team = await teams.findOne({_id: new ObjectId(String(id))});
        return new TeamRecord(team) ?? null;
    }

    static async findAll() {
        const result = await teams.find();
        const teamsArray = await result.toArray();
        const ourArray = teamsArray.map(obj => new TeamRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return teams.find();
    }
}

module.exports = {
    TeamRecord,
}