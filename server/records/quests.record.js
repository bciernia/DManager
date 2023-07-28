const {quests} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class QuestsRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.questName = obj.questName;
        this.questDescription = obj.questDescription;
        this.questReward = obj.questReward ?? [];
        this.questGiver = obj.questGiver;
    }

    async insert() {
        const {insertedId} = await quests.insertOne({
            _id: this._id,
            questName: this.questName.toString(),
            questDescription: this.questDescription.toString(),
            questReward: this.questReward ?? [],
            questGiver: this.questGiver.toString(),
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        const updatedQuest = await quests.replaceOne({
            _id: this._id,
        }, {
            questName: this.questName.toString(),
            questDescription: this.questDescription.toString(),
            questReward: this.questReward ?? [],
            questGiver: this.questGiver.toString(),
        });

        return updatedQuest;
    }

    async delete()  {
        await quests.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const team = await quests.findOne({_id: new ObjectId(String(id))});
        return new ScenarioRecord(team) ?? null;
    }

    static async findAllByCampaignId(campaignId) {
        const result = await quests.find();
        const scenariosArray = await result.toArray();
        const scenariosFromChosenCampaign = scenariosArray.filter(scenario => scenario.campaignId === campaignId);

        return scenariosFromChosenCampaign;
    }

    static async findAll() {
        const result = await quests.find();
        const sessionsArray = await result.toArray();
        const ourArray = sessionsArray.map(obj => new ScenarioRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return quests.find();
    }
}

module.exports = {
    QuestsRecord,
}