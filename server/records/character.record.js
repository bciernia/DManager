const {characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CharacterRecord {
    constructor(obj) {
        //CHARACTER INFO
        this._id = new ObjectId(obj._id);
        this.characterType = obj.characterType;
        this.characterName = obj.characterName;
        this.characterClass = obj.characterClass;
        this.characterRace = obj.characterRace;
        this.characterBackground = obj.characterBackground;
        this.characterBackstory = obj.characterBackstory;
        this.characterAllies = obj.characterAllies;
        this.characterIdeals = obj.characterIdeals;
        this.characterPersonalityTraits = obj.characterPersonalityTraits;
        this.characterBonds = obj.characterBonds;
        this.characterFlaws = obj.characterFlaws;
        this.characterTreasure = obj.characterTreasure;
        this.characterPhoto = obj.characterPhoto;
        this.playerName = obj.playerName;
        this.characterLevel = obj.characterLevel,
        this.exp = obj.exp;
        this.hasInspiration = obj.hasInspiration;
        this.isAlive = obj.isAlive;
        this.howCharacterDied = obj.howCharacterDied;
        this.teamId = obj.teamId;

        //STATISTICS
        this.characterStrength = obj.characterStrength;
        this.characterDexterity = obj.characterDexterity;
        this.characterConstitution = obj.characterConstitution;
        this.characterIntelligence = obj.characterIntelligence;
        this.characterWisdom = obj.characterWisdom;
        this.characterCharisma = obj.characterCharisma;
        this.characterProficiencyBonus = obj.characterProficiencyBonus;
        this.characterPassiveWisdom = obj.characterPassiveWisdom;
        this.characterSpeed = obj.characterSpeed;
        this.characterHP = obj.characterHP;
        this.characterInitiative = obj.characterInitiative;

        //SAVING THROWS ARRAY
        this.savingThrows = obj.savingThrows;

        //IMMUNITIES ARRAYS
        this.damageResistances = obj.damageResistances;
        this.damageImmunities = obj.damageImmunities;
        this.conditionImmunities = obj.conditionImmunities;
        this.senses = obj.senses;

        //SKILLS ARRAY
        this.skillsProficiency = obj.skillsProficiency;

        //LANGUAGES ARRAY
        this.languageProficiency = obj.languageProficiency;

        //OTHER PROFICIENCIES ARRAY
        this.otherProficiencies = obj.otherProficiencies;

        //EQUIPMENT
        this.armorClass = obj.armorClass;

        //TALENTS
        this.featuresAndTraits = obj.featuresAndTraits;
    }

    _validate() {
        if (this.characterName.trim().length < 2) {
            throw new Error("Character name should be at least 3 characters.");
        }

        if (this.characterName.length > 30) {
            throw new Error("Character name can not be longer than 150 characters.");
        }
    }

    async insert() {
        const {insertedId} = await characters.insertOne({
            _id: this._id,
            characterType: this.characterType.toString(), //
            characterName: this.characterName.toString(), //
            characterPhoto: this.characterPhoto,
            characterClass: this.characterClass.toString(), //
            playerName: this.playerName.toString(), //
            characterLevel: Number(this.characterLevel), //
            exp: Number(this.exp), //
            isAlive: this.isAlive, //
            howCharacterDied: this.howCharacterDied.toString(),
            teamId: this.teamId.toString(), //TODO dropdown with team id at last page

            characterStrength: Number(this.characterStrength), //
            characterDexterity: Number(this.characterDexterity), //
            characterConstitution: Number(this.characterConstitution), //
            characterIntelligence: Number(this.characterIntelligence), //
            characterWisdom: Number(this.characterWisdom), //
            characterCharisma: Number(this.characterCharisma), //
            characterProficiencyBonus: Number(this.characterProficiencyBonus), //
            characterPassiveWisdom: Number(this.characterPassiveWisdom), //

            characterSpeed: Number(this.characterSpeed), //
            characterHP: Number(this.characterHP), //
            characterInitiative: Number(this.characterInitiative), //
            armorClass: Number(this.armorClass),

            savingThrows: this.savingThrows,
            skillsProficiency: this.skillsProficiency,
            languageProficiency: this.languageProficiency,
            otherProficiency: this.otherProficiencies,

            damageResistances: this.damageResistances.toString(),
            damageImmunities: this.damageImmunities.toString(),
            conditionImmunities: this.conditionImmunities.toString(),
            senses: this.senses.toString(),

            featuresAndTraits: this.featuresAndTraits.toString(),

        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await characters.replaceOne({
            _id: this._id,
        }, {
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterClass: this.characterClass.toString(),
            playerName: this.playerName.toString(),
            characterLevel: Number(this.characterLevel),
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),
            teamId: this.teamId.toString(),

            characterStrength: Number(this.characterStrength),
            characterDexterity: Number(this.characterDexterity),
            characterConstitution: Number(this.characterConstitution),
            characterIntelligence: Number(this.characterIntelligence),
            characterWisdom: Number(this.characterWisdom),
            characterCharisma: Number(this.characterCharisma),
            characterProficiencyBonus: Number(this.characterProficiencyBonus),
            characterPassiveWisdom: Number(this.characterPassiveWisdom),

            characterSpeed: Number(this.characterSpeed),
            characterHP: Number(this.characterHP),
            characterInitiative: Number(this.characterInitiative),
            armorClass: Number(this.armorClass),

            savingThrows: this.savingThrows,
            skillsProficiency: this.skillsProficiency,
            languageProficiency: this.languageProficiency,
            otherProficiency: this.otherProficiencies,

            damageResistances: this.damageResistances.toString(),
            damageImmunities: this.damageImmunities.toString(),
            conditionImmunities: this.conditionImmunities.toString(),
            senses: this.senses.toString(),

            featuresAndTraits: this.featuresAndTraits.toString(),

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

    static async findAllByTeamId(teamId) {
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