const {characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CharacterRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.exp = obj.exp;
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
            exp: this.exp,
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
        const resultArray = await result.toArray();
        const ourArray = resultArray.map(obj => new CharacterRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return characters.find();
    }
}

module.exports = {
    CharacterRecord,
}