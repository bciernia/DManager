const {npcs, characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class SimplyNpcRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.insertDate = new Date();
        this.updateDate = new Date();

        //CHARACTER INFO
        this.characterType = obj.characterType;
        this.characterName = obj.characterName;
        this.characterClass = obj.characterClass;
        this.characterRace = obj.characterRace;
        this.characterAlignment = obj.characterAlignment;
        this.characterDescription = obj.characterDescription;
        this.characterPhoto = obj.characterPhoto;

        //TALENTS
        this.featuresAndTraits = obj.featuresAndTraits;
    }

    async insert() {
        const {insertedId} = await characters.insertOne({
            _id: this._id,
            insertDate: this.insertDate,
            updateDate: this.updateDate,

            characterType: this.characterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterRace: this.characterRace.toString(),
            characterAlignment: this.characterAlignment.toString(),
            characterDescription: this.characterDescription.toString(),

            featuresAndTraits: this.featuresAndTraits,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await npcs.replaceOne({
            _id: this._id,
        }, {
            updateDate: new Date(),

            characterType: this.characterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterClass: this.characterClass,
            characterRace: this.characterRace.toString(),
            characterAlignment: this.characterAlignment.toString(),
            characterDescription: this.characterDescription.toString(),

            featuresAndTraits: this.featuresAndTraits,
        });
    }

    async delete() {
        await npcs.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const npc = await npcs.findOne({_id: new ObjectId(String(id))});
        return new SimplyNpcRecord(npc) ?? null;
    }

    static async findAll() {
        const result = await npcs.find();
        const npcsArray = await result.toArray();
        const ourArray = npcsArray.map(obj => new SimplyNpcRecord(obj));

        return ourArray;
    }

    static async findAllNpcs(){
        const result = await npcs.find();
        const npcArray = await result.toArray();
        const ourArray = npcArray.filter(obj => obj.characterType.toString() === "Simple npc")
            .map(obj => new SimplyNpcRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return npcs.find();
    }
}

module.exports = {
    SimplyNpcRecord,
}