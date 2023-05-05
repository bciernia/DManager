const {locations} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class LocationRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.locationName = obj.locationName;
        this.locationDescription = obj.locationDescription;
        this.locationMap = obj.locationMap;
        this.locationRooms = obj.locationRooms;
    }
    async insert() {
        const {insertedId} = await locations.insertOne({
            _id: this._id,
            locationName: this.locationName,
            locationDescription: this.locationDescription,
            locationMap: this.locationMap,
            locationRooms: this.locationRooms,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await locations.replaceOne({
            _id: this._id,
        }, {
            locationName: this.locationName,
            locationDescription: this.locationDescription,
            locationMap: this.locationMap,
            locationRooms: this.locationRooms,
        });
    }

    async delete() {
        await locations.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const location = await locations.findOne({_id: new ObjectId(String(id))});
        return new LocationRecord(location) ?? null;
    }

    static async findAll() {
        const result = await locations.find();
        const locationArray = await result.toArray();
        const ourArray = locationArray.map(obj => new LocationRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return locations.find();
    }
}

module.exports = {
    LocationRecord,
}