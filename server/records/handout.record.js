const {handouts, scenarios} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class HandoutRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.handoutName = obj.handoutName;
        this.handoutDescription = obj.handoutDescription;
        this.handoutPhoto = obj.handoutPhoto;
    }
    async insert() {
        const {insertedId} = await handouts.insertOne({
            _id: this._id,
            handoutName: this.handoutName,
            handoutDescription: this.handoutDescription,
            handoutPhoto: this.handoutPhoto,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await handouts.replaceOne({
            _id: this._id,
        }, {
            handoutName: this.handoutName,
            handoutDescription: this.handoutDescription,
            handoutPhoto: this.handoutPhoto,
        });
    }

    async delete() {
        await handouts.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const handout = await handouts.findOne({_id: new ObjectId(String(id))});
        return new HandoutRecord(handout) ?? null;
    }

    static async findAll() {
        const result = await handouts.find();
        const handoutArray = await result.toArray();
        const ourArray = handoutArray.map(obj => new HandoutRecord(obj));

        return ourArray;
    }

    static async findAllByScenarioId(scenarioId) {
        const result = await handouts.find();
        const handoutsArray = await result.toArray();
        const handoutsFromChosenScenario = handoutsArray.filter(scenario => scenario.campaignId === scenarioId);

        return handoutsFromChosenScenario;
    }

    static async findAllWithCursor() {
        return handouts.find();
    }
}

module.exports = {
    HandoutRecord,
}