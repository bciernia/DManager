const {artifacts} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class ArtifactRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.name = obj.name;
        this.description = obj.description;
        // this.img = obj.img;
        this.type = obj.type;
    }

    async insert() {

        const {insertedId} = await artifacts.insertOne({
            _id: this._id,
            name: this.name,
            description: this.description,
            // img: this.img,
            type: this.type,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await artifacts.replaceOne({
            _id: this._id,
        }, {
            name: this.name,
            description: this.description,
            // img: this.img,
            type: this.type,
        });
    }

    async delete() {
        await artifacts.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const artifact = await artifacts.findOne({_id: new ObjectId(String(id))});
        return new ArtifactRecord(artifact) ?? null;
    }

    static async findAll() {
        const result = await spells.find();
        const artifactsArray = await result.toArray();
        const ourArray = artifactsArray.map(obj => new ArtifactRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return artifacts.find();
    }
}

module.exports = {
    ArtifactRecord,
}