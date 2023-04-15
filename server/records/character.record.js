const {characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CharacterRecord {
    constructor(obj) {
        //CHARACTER INFO
        this._id = new ObjectId(obj._id);
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
        this.exp = obj.exp;
        this.hasInspiration = obj.hasInspiration;
        this.isAlive = obj.isAlive;
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

        //SAVING THROWS
        this.hasStrenghtSavingThrowProficiency = obj.hasStrenghtSavingThrowProficiency;
        this.hasDexteritySavingThrowProficiency = obj.hasDexteritySavingThrowProficiency;
        this.hasConstitutionSavingThrowProficiency = obj.hasConstitutionSavingThrowProficiency;
        this.hasIntelligenceSavingThrowProficiency = obj.hasIntelligenceSavingThrowProficiency;
        this.hasWisdomSavingThrowProficiency = obj.hasWisdomSavingThrowProficiency;
        this.hasCharismaSavingThrowProficiency = obj.hasCharismaSavingThrowProficiency;

        //SKILLS
        this.hasAcrobatics = obj.hasAcrobatics;
        this.hasAnimalHandling = obj.hasAnimalHandling;
        this.hasArcana = obj.hasArcana;
        this.hasAthletics = obj.hasAthletics;
        this.hasDeception = obj.hasDeception;
        this.hasHistory = obj.hasHistory;
        this.hasInsight = obj.hasInsight;
        this.hasIntimidation = obj.hasIntimidation;
        this.hasInvestigation = obj.hasInvestigation;
        this.hasMedicine = obj.hasMedicine;
        this.hasNature = obj.hasNature;
        this.hasPerception = obj.hasPerception;
        this.hasPerformance = obj.hasPerformance;
        this.hasPersuasion = obj.hasPersuasion;
        this.hasReligion = obj.hasReligion;
        this.hasSleightOfHands = obj.hasSleightOfHands;
        this.hasStealth = obj.hasStealth;
        this.hasSurvival = obj.hasSurvival;

        //EQUIPMENT
        this.armorClass = obj.armorClass;

        //TALENTS
        this.featuresAndTraits = obj.featuresAndTraits;
        this.otherProficienciesAndLanguages = obj.otherProficienciesAndLanguages;
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
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
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
            name: this.characterName.toString(),
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