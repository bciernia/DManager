const {characters} = require("../utils/db");
const {v4: uuid} = require('uuid');
const {ObjectId} = require("mongodb");

class MonsterRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.insertDate = new Date();
        this.updateDate = new Date();

        //CHARACTER INFO
        this.characterType = obj.characterType;
        this.characterMonsterType = obj.characterMonsterType;
        this.characterName = obj.characterName;
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
        this.exp = obj.exp;
        this.isAlive = obj.isAlive;
        this.howCharacterDied = obj.howCharacterDied;

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
        this.characterHPDice = obj.characterHPDice;
        this.characterInitiative = obj.characterInitiative;

        //SAVING THROWS ARRAY
        this.savingThrows = obj.savingThrows;

        //IMMUNITIES ARRAYS
        this.damageResistances = obj.damageResistances;
        this.damageImmunities = obj.damageImmunities;
        this.damageVulnerabilities = obj.damageVulnerabilities;
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

    async insert() {
        const {insertedId} = await characters.insertOne({
            _id: this._id,
            insertDate: this.insertDate,
            updateDate: this.updateDate,

            characterType: this.characterType.toString(),
            characterMonsterType: this.characterMonsterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
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
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),

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
            senses: this.senses,

            featuresAndTraits: this.featuresAndTraits,
        });
        this._id = insertedId.toString();

        return insertedId;
    }

    async update() {
        await characters.replaceOne({
            _id: this._id,
        }, {
            updateDate: new Date(),

            characterType: this.characterType.toString(),
            characterMonsterType: this.characterMonsterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
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
            exp: Number(this.exp),
            isAlive: this.isAlive,
            howCharacterDied: this.howCharacterDied.toString(),

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
            senses: this.senses,

            featuresAndTraits: this.featuresAndTraits,
        });
    }

    async delete() {
        await characters.deleteOne({
            _id: this._id,
        });
    }

    static async find(id) {
        const monster = await characters.findOne({_id: new ObjectId(String(id))});
        return new MonsterRecord(monster) ?? null;
    }

    static async findAllMonsters() {
        const result = await characters.find();
        const monsterArray = await result.toArray();
        const ourArray = monsterArray.filter(obj => obj.characterType === "Monster")
            .map(obj => new MonsterRecord(obj));

        return ourArray;
    }

    static async findAllWithCursor() {
        return characters.find();
    }
}

module.exports = {
    MonsterRecord,
}