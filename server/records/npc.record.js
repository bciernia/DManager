const {npcs} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class NpcRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.npcName = obj.npcName;
        this.npcType = obj.npcType; //TODO dropdown => Monster, Boss, NPC
        this.npcAlignment = obj.npcAlignment;
        this.npcDescription = obj.npcDescription;

        this.npcStrength = obj.npcStrength;
        this.npcDexterity = obj.npcDexterity;
        this.npcConstitution = obj.npcConstitution;
        this.npcIntelligence = obj.npcIntelligence;
        this.npcWisdom = obj.npcWisdom;
        this.npcCharisma = obj.npcCharisma;
        this.npcPassiveWisdom = obj.npcPassiveWisdom;
        this.npcSpeed = obj.npcSpeed;
        this.npcHP = obj.npcHP;
        this.armorClass = obj.armorClass;

        this.npcSkills = obj.npcSkills;
        this.npcExp = obj.npcExp;
    }

    async insert() {
        const {insertedId} = await npcs.insertOne({
            _id: this._id,
            npcName: this.npcName.toString(),
            npcType: this.npcType.toString(),
            npcAlignment: this.npcAlignment.toString(),
            npcDescription: this.npcDescription.toString(),

            npcStrength: Number(this.npcStrength),
            npcDexterity: Number(this.npcDexterity),
            npcConstitution: Number(this.npcConstitution),
            npcIntelligence: Number(this.npcIntelligence),
            npcWisdom: Number(this.npcWisdom),
            npcCharisma: Number(this.npcCharisma),
            npcPassiveWisdom: Number(this.npcPassiveWisdom),
            npcSpeed: Number(this.npcSpeed),
            npcHP: Number(this.npcHP),
            armorClass: Number(this.armorClass),

            npcSkills: this.npcSkills.toString(),
            npcExp: Number(this.npcExp),
        })

        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await npcs.replaceOne({
            _id: this._id,
        }, {
            npcName: this.npcName.toString(),
            npcType: this.npcType.toString(),
            npcAlignment: this.npcAlignment.toString(),
            npcDescription: this.npcDescription.toString(),

            npcStrength: Number(this.npcStrength),
            npcDexterity: Number(this.npcDexterity),
            npcConstitution: Number(this.npcConstitution),
            npcIntelligence: Number(this.npcIntelligence),
            npcWisdom: Number(this.npcWisdom),
            npcCharisma: Number(this.npcCharisma),
            npcPassiveWisdom: Number(this.npcPassiveWisdom),
            npcSpeed: Number(this.npcSpeed),
            npcHP: Number(this.npcHP),
            armorClass: Number(this.armorClass),

            npcSkills: this.npcSkills.toString(),
            npcExp: Number(this.npcExp),
        });
    }

    async delete() {
        await npcs.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const npc = await npcs.findOne({_id: new ObjectId(String(id))});
        return new NpcRecord(npc) ?? null;
    }

    static async findAll() {
        const result = await npcs.find();
        const npcsArray = await result.toArray();
        const ourArray = npcsArray.map(obj => new NpcRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return npcs.find();
    }
}

module.exports = {
    NpcRecord,
}