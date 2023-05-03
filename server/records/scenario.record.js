const {scenarios} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class ScenarioRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.scenarioName = obj.scenarioName;
        this.scenarioDescription = obj.scenarioDescription;
        this.scenarioSchedule = obj.scenarioSchedule;
        this.scenarioCharacters = obj.scenarioCharacters;
        this.scenarioLocations = obj.scenarioLocations;
        this.scenarioHandouts = obj.scenarioHandouts;
        this.campaignId = obj.campaignId;
    }

    async insert() {
        const {insertedId} = await scenarios.insertOne({
            _id: this._id,
            scenarioName: this.scenarioName.toString(),
            scenarioDescription: this.scenarioDescription.toString(),
            scenarioSchedule: this.scenarioSchedule,
            scenarioCharacters: this.scenarioCharacters,
            scenarioLocations: this.scenarioLocations,
            scenarioHandouts: this.scenarioHandouts,
            campaignId: this.campaignId,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await scenarios.replaceOne({
            _id: this._id,
        }, {
            scenarioName: this.scenarioName.toString(),
            scenarioDescription: this.scenarioDescription.toString(),
            scenarioSchedule: this.scenarioSchedule,
            scenarioCharacters: this.scenarioCharacters,
            scenarioLocations: this.scenarioLocations,
            scenarioHandouts: this.scenarioHandouts,
            campaignId: this.campaignId,
        });
    }

    async delete() {
        await scenarios.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const team = await scenarios.findOne({_id: new ObjectId(String(id))});
        return new ScenarioRecord(team) ?? null;
    }

    static async findAllByCampaignId(campaignId) {
        const result = await scenarios.find();
        const scenariosArray = await result.toArray();
        const scenariosFromChosenCampaign = scenariosArray.filter(scenario => scenario.campaignId === campaignId);

        return scenariosFromChosenCampaign;
    }

    static async findAll() {
        const result = await scenarios.find();
        const sessionsArray = await result.toArray();
        const ourArray = sessionsArray.map(obj => new ScenarioRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return scenarios.find();
    }
}

module.exports = {
    ScenarioRecord,
}