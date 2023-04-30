const {campaigns} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CampaignRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.campaignName = obj.campaignName;
        this.campaignSetting = obj.campaignSetting;
        this.campaignDescription = obj.campaignDescription;
        this.campaignScenarios = [];
    }

    async insert() {
        const {insertedId} = await campaigns.insertOne({
            _id: this._id,
            campaignName: this.campaignName.toString(),
            campaignSetting: this.campaignSetting.toString(),
            campaignDescription: this.campaignDescription.toString(),
            campaignScenarios: this.campaignScenarios,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await campaigns.replaceOne({
            _id: this._id,
        }, {
            campaignName: this.campaignName.toString(),
            campaignSetting: this.campaignSetting.toString(),
            campaignDescription: this.campaignDescription.toString(),
        });
    }

    async delete() {
        await campaigns.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const team = await campaigns.findOne({_id: new ObjectId(String(id))});
        return new CampaignRecord(team) ?? null;
    }

    static async findAll() {
        const result = await campaigns.find();
        const sessionsArray = await result.toArray();
        const ourArray = sessionsArray.map(obj => new CampaignRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return campaigns.find();
    }
}

module.exports = {
    CampaignRecord,
}