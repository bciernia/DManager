const {npcs, characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class NpcRecord {
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
        this.characterLevel = obj.characterLevel;
        this.exp = obj.exp;
        this.isAlive = obj.isAlive;
        this.howCharacterDied = obj.howCharacterDied;
        this.characterSize = obj.characterSize;

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
            characterWeakness: this.characterWeakness.toString(),
            characterPersonalityTraits: this.characterPersonalityTraits.toString(),
            characterTreasure: this.characterTreasure.toString(),
            characterLevel: Number(this.characterLevel),
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),
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
            characterBackstory: this.characterBackstory.toString(),
            characterBackground: this.characterBackground.toString(),
            characterAllies: this.characterAllies.toString(),
            characterIdeals: this.characterIdeals.toString(),
            characterBonds: this.characterBonds.toString(),
            characterFlaws: this.characterFlaws.toString(),
            characterWeakness: this.characterWeakness.toString(),
            characterPersonalityTraits: this.characterPersonalityTraits.toString(),
            characterTreasure: this.characterTreasure.toString(),
            characterLevel: Number(this.characterLevel),
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),
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

    static async findAllNpcs(){
        const result = await npcs.find();
        const npcArray = await result.toArray();
        const ourArray = npcArray.filter(obj => obj.characterType.toString() === "Non-player character")
            .map(obj => new NpcRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return npcs.find();
    }
}

module.exports = {
    NpcRecord,
}