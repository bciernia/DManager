const {spells} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class SpellRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.description = obj.description;
        this.level = obj.level;
        this.higherLevelDesc = obj.higherLevelDesc;
        this.dmg = obj.dmg;
        this.availableFor = obj.availableFor;
        this.school = obj.school;
        this.components = obj.components;
        this.materialComponent = obj.materialComponent;
        this.range = obj.range;
        this.duration = obj.duration;
        this.castingTime = obj.castingTime;
    }

    async insert() {

        const {insertedId} = await spells.insertOne({
            _id: this._id,
            name: this.name,
            description: this.description,
            level: this.level,
            higherLevelDesc: this.higherLevelDesc,
            dmg: this.dmg,
            availableFor: this.availableFor,
            school: this.school,
            components: this.components,
            range: this.range,
            duration: this.duration,
            castingTime: this.castingTime,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await spells.replaceOne({
            _id: this._id,
        }, {
            name: this.name,
            description: this.description,
            level: this.level,
            higherLevelDesc: this.higherLevelDesc,
            dmg: this.dmg,
            availableFor: this.availableFor,
            school: this.school,
            components: this.components,
            range: this.range,
            duration: this.duration,
            castingTime: this.castingTime,
        });
    }

    async delete() {
        await spells.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const spell = await spells.findOne({_id: new ObjectId(String(id))});
        return new SpellRecord(spell) ?? null;
    }

    static async findAll() {
        const result = await spells.find();
        const spellsArray = await result.toArray();
        const ourArray = spellsArray.map(obj => new SpellRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return spells.find();
    }
}

module.exports = {
    SpellRecord,
}