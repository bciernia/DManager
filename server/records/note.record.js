const {notes} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class NoteRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.note = obj.handoutName;
        this.scenarioId = obj.scenarioId;
    }
    async insert() {
        const {insertedId} = await notes.insertOne({
            _id: this._id,
            note: this.note,
            scenarioId: this.scenarioId,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await notes.replaceOne({
            _id: this._id,
        }, {
            note: this.note,
            scenarioId: this.scenarioId,
        });
    }

    async delete() {
        await notes.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const note = await notes.findOne({_id: new ObjectId(String(id))});
        return new NoteRecord(note) ?? null;
    }

    static async findAll() {
        const result = await notes.find();
        const handoutArray = await result.toArray();
        const ourArray = handoutArray.map(obj => new NoteRecord(obj));

        return ourArray;
    }

    static async findAllByScenarioId(scenarioId) {
        const result = await notes.find();
        const notesArray = await result.toArray();
        const handoutsFromChosenScenario = notesArray.filter(note => note.scenarioId === scenarioId);

        return handoutsFromChosenScenario;
    }

    static async findAllWithCursor() {
        return notes.find();
    }
}

module.exports = {
    NoteRecord,
}