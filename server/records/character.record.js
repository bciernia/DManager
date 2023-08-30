const {characters, notes} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class CharacterRecord {
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
        this.characterBackground = obj.characterBackground;
        this.characterBackstory = obj.characterBackstory;
        this.characterAllies = obj.characterAllies;
        this.characterIdeals = obj.characterIdeals;
        this.characterPersonalityTraits = obj.characterPersonalityTraits;
        this.characterBonds = obj.characterBonds;
        this.characterFlaws = obj.characterFlaws;
        this.characterWeakness = obj.characterWeakness;
        this.characterTreasure = obj.characterTreasure;
        this.characterPhoto = obj.characterPhoto;
        this.playerName = obj.playerName;
        this.characterLevel = obj.characterLevel;
        this.exp = obj.exp;
        this.hasInspiration = obj.hasInspiration;
        this.isAlive = obj.isAlive;
        this.howCharacterDied = obj.howCharacterDied;
        this.teamId = obj.teamId;
        this.characterSize = obj.characterSize;
        // this.characterDescription = obj.characterDescription;

        //STATISTICS
        this.characterStrength = obj.characterStrength;
        this.characterDexterity = obj.characterDexterity;
        this.characterConstitution = obj.characterConstitution;
        this.characterIntelligence = obj.characterIntelligence;
        this.characterWisdom = obj.characterWisdom;
        this.characterCharisma = obj.characterCharisma;
        this.characterProficiencyBonus = obj.characterProficiencyBonus;
        this.characterPassiveWisdom = obj.characterPassiveWisdom;
        this.characterMovementSpeed = obj.characterMovementSpeed;
        this.characterHP = obj.characterHP;
        this.characterHPDice = obj.characterHPDice;
        this.characterInitiative = obj.characterInitiative;

        //SAVING THROWS ARRAY
        this.savingThrows = obj.savingThrows;

        //IMMUNITIES ARRAYS
        this.damageResistances = obj.damageResistances;
        this.damageImmunities = obj.damageImmunities;
        this.damageVulnerabilities = obj.damageVulnerabilities;
        this.conditionImmunities = obj.conditionImmunities;

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

        //SPELLS
        this.spells = obj.spells;

        //SPELL SLOTS
        this.level1 = obj.level1;
        this.level2 = obj.level2;
        this.level3 = obj.level3;
        this.level4 = obj.level4;
        this.level5 = obj.level5;
        this.level6 = obj.level6;
        this.level7 = obj.level7;
        this.level8 = obj.level8;
        this.level9 = obj.level9;

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
            insertDate: this.insertDate,
            updateDate: this.updateDate,

            characterType: this.characterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterClass: this.characterClass,
            characterRace: this.characterRace.toString(),
            characterAlignment: this.characterAlignment.toString(),
            characterBackstory: this.characterBackstory.toString(),
            characterBackground: this.characterBackground.toString(),
            characterAllies: this.characterAllies.toString(),
            characterIdeals: this.characterIdeals.toString(),
            characterBonds: this.characterBonds.toString(),
            characterFlaws: this.characterFlaws.toString(),
            // characterDescription: this.characterDescription.toString(),
            characterWeakness: this.characterWeakness.toString(),

            characterPersonalityTraits: this.characterPersonalityTraits.toString(),
            characterTreasure: this.characterTreasure.toString(),
            playerName: this.playerName.toString(),
            characterLevel: Number(this.characterLevel),
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),
            teamId: this.teamId.toString(), //TODO dropdown with team id at last page
            hasInspiration: this.hasInspiration,
            characterSize: this.characterSize,

            characterStrength: Number(this.characterStrength),
            characterDexterity: Number(this.characterDexterity),
            characterConstitution: Number(this.characterConstitution),
            characterIntelligence: Number(this.characterIntelligence),
            characterWisdom: Number(this.characterWisdom),
            characterCharisma: Number(this.characterCharisma),
            characterProficiencyBonus: Number(this.characterProficiencyBonus),
            characterPassiveWisdom: Number(this.characterPassiveWisdom),

            characterMovementSpeed: Number(this.characterMovementSpeed),
            characterHP: Number(this.characterHP),
            characterHPDice: this.characterHPDice.toString(),
            characterInitiative: Number(this.characterInitiative),
            armorClass: Number(this.armorClass),

            savingThrows: this.savingThrows,
            skillsProficiency: this.skillsProficiency,
            languageProficiency: this.languageProficiency,
            otherProficiency: this.otherProficiencies,

            //ARRAYS
            damageResistances: this.damageResistances,
            damageImmunities: this.damageImmunities,
            damageVulnerabilities: this.damageVulnerabilities,
            conditionImmunities: this.conditionImmunities,

            featuresAndTraits: this.featuresAndTraits,

            //SPELLS
            spells: this.spells,

            //SPELL SLOTS
            level1: this.level1,
            level2: this.level2,
            level3: this.level3,
            level4: this.level4,
            level5: this.level5,
            level6: this.level6,
            level7: this.level7,
            level8: this.level8,
            level9: this.level9,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await characters.replaceOne({
            _id: this._id,
        }, {
            updateDate: this.updateDate,
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterClass: this.characterClass.toString(),
            characterAlignment: this.characterAlignment.toString(),
            // characterDescription: this.characterDescription.toString(),
            playerName: this.playerName.toString(),
            characterLevel: Number(this.characterLevel),
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),
            teamId: this.teamId.toString(),
            characterSize: this.characterSize,

            characterStrength: Number(this.characterStrength),
            characterDexterity: Number(this.characterDexterity),
            characterConstitution: Number(this.characterConstitution),
            characterIntelligence: Number(this.characterIntelligence),
            characterWisdom: Number(this.characterWisdom),
            characterCharisma: Number(this.characterCharisma),
            characterProficiencyBonus: Number(this.characterProficiencyBonus),
            characterPassiveWisdom: Number(this.characterPassiveWisdom),

            characterMovementSpeed: Number(this.characterMovementSpeed),
            characterHP: Number(this.characterHP),
            characterHPDice: this.characterHPDice.toString(),
            characterInitiative: Number(this.characterInitiative),
            armorClass: Number(this.armorClass),

            savingThrows: this.savingThrows,
            skillsProficiency: this.skillsProficiency,
            languageProficiency: this.languageProficiency,
            otherProficiency: this.otherProficiencies,

            damageResistances: this.damageResistances,
            damageImmunities: this.damageImmunities,
            damageVulnerabilities: this.damageVulnerabilities,
            conditionImmunities: this.conditionImmunities,

            featuresAndTraits: this.featuresAndTraits,
            //SPELLS
            spells: this.spells,

            //SPELL SLOTS
            level1: this.level1,
            level2: this.level2,
            level3: this.level3,
            level4: this.level4,
            level5: this.level5,
            level6: this.level6,
            level7: this.level7,
            level8: this.level8,
            level9: this.level9,
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

    static async findAllByIds(characterIdsArray) {
        const result = await characters.find();
        const charactersArray = await result.toArray();
        const charactersForScenario = characterIdsArray.map(id => charactersArray.find(character => character._id.toString() === id));

        return charactersForScenario;
    }

    static async findAllByTeamId(teamId) {
        const result = await characters.find();
        const characterArray = await result.toArray();
        const ourArray = characterArray.filter(obj => obj.teamId.toString() === teamId)
            .map(obj => new CharacterRecord(obj));

        return ourArray;
    }

    static async findAllPlayerCharacters() {
        const result = await characters.find();
        const charactersArray = await result.toArray();
        const ourArray = charactersArray.filter(character => character.characterType.toString() === "Player character");

        return ourArray;
    }

    static async findAllWithCursor() {
        return characters.find();
    }
}

module.exports = {
    CharacterRecord,
}