const {characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CharacterRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.characterClass = obj.characterClass;
        this.playerName = obj.playerName;
        this.exp = obj.exp;
        this.isAlive = obj.isAlive;
        this.teamId = obj.teamId;
    }

    _validate() {
        if (this.name.trim().length < 2) {
            throw new Error("Character name should be at least 3 characters.");
        }

        if (this.name.length > 30) {
            throw new Error("Character name can not be longer than 150 characters.");
        }
    }

    async insert() {
        const {insertedId} = await characters.insertOne({
            _id: this._id,
            name: this.name.toString(),
            characterClass: this.characterClass.toString(),
            playerName: this.playerName.toString(),
            exp: this.exp,
            isAlive: this.isAlive,
            teamId: this.teamId,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await characters.replaceOne({
            _id: this._id,
        }, {
            name: this.name.toString(),
            exp: this.exp,
        });
    }

    async delete() {
        await characters.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const character = await characters.findOne({_id: new ObjectId(String(id))});
        return new CharacterRecord(character) ?? null;
    }

    static async findAll() {
        const result = await characters.find();
        const characterArray = await result.toArray();
        const ourArray = characterArray.map(obj => new CharacterRecord(obj));

        return ourArray;
    }

    static async findAllByTeamId(teamId){
        const result = await characters.find();
        const characterArray = await result.toArray();
        const ourArray = characterArray.filter(obj => obj.teamId.toString() === teamId)
            .map(obj => new CharacterRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return characters.find();
    }
}

module.exports = {
    CharacterRecord,
}