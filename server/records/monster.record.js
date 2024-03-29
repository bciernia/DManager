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
        this.characterDescription = obj.characterDescription;
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
        this.characterSize = obj.characterSize;
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
        this.characterMovementSpeed = obj.characterMovementSpeed;
        this.characterHP = obj.characterHP;
        this.characterHPDice = obj.characterHPDice;
        this.characterInitiative = obj.characterInitiative;

        //SENSES
        this.monsterBlindsightSense = obj.monsterBlindsightSense;
        this.monsterDarkvisionSense = obj.monsterDarkvisionSense;
        this.monsterTremorsenseSense = obj.monsterTremorsenseSense;
        this.monsterTruesightSense = obj.monsterTruesightSense;

        //MOVEMENT SKILLS
        this.monsterMovementBurrowSpeed = obj.monsterMovementBurrowSpeed;
        this.monsterMovementClimbSpeed = obj.monsterMovementClimbSpeed;
        this.monsterMovementFlySpeed = obj.monsterMovementFlySpeed;
        this.monsterMovementSwimSpeed = obj.monsterMovementSwimSpeed;

        //SAVING THROWS ARRAY
        this.savingThrows = obj.savingThrows;

        //IMMUNITIES ARRAYS
        this.damageResistances = obj.damageResistances;
        this.damageImmunities = obj.damageImmunities;
        this.damageVulnerabilities = obj.damageVulnerabilities;
        this.conditionImmunities = obj.conditionImmunities;

        //SKILLS ARRAY
        this.skillsProficiency = obj.skillsProficiency;
        this.monsterMovementSkill = obj.monsterMovementSkill;

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

    async insert() {
        const {insertedId} = await characters.insertOne({
            _id: this._id,
            insertDate: this.insertDate,
            updateDate: this.updateDate,

            characterType: this.characterType.toString(),
            characterMonsterType: this.characterMonsterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterDescription: this.characterDescription,
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
            characterSize: this.characterSize.toString(),

            characterStrength: Number(this.characterStrength),
            characterDexterity: Number(this.characterDexterity),
            characterConstitution: Number(this.characterConstitution),
            characterIntelligence: Number(this.characterIntelligence),
            characterWisdom: Number(this.characterWisdom),
            characterCharisma: Number(this.characterCharisma),
            characterProficiencyBonus: Number(this.characterProficiencyBonus),
            characterPassiveWisdom: Number(this.characterPassiveWisdom),

            //MONSTER SENSES
            monsterBlindsightSense: Number(this.monsterBlindsightSense),
            monsterDarkvisionSense: Number(this.monsterDarkvisionSense),
            monsterTremorsenseSense: Number(this.monsterTremorsenseSense),
            monsterTruesightSense: Number(this.monsterTruesightSense),

            //MOVEMENT SKILLS
            monsterMovementBurrowSpeed: Number(this.monsterMovementBurrowSpeed),
            monsterMovementClimbSpeed: Number(this.monsterMovementClimbSpeed),
            monsterMovementFlySpeed: Number(this.monsterMovementFlySpeed),
            monsterMovementSwimSpeed: Number(this.monsterMovementSwimSpeed),

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
            monsterMovementSkill: this.monsterMovementSkill,

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
            updateDate: new Date(),

            characterType: this.characterType.toString(),
            characterMonsterType: this.characterMonsterType.toString(),
            characterName: this.characterName.toString(),
            characterPhoto: this.characterPhoto,
            characterDescription: this.characterDescription,
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
            characterSize: this.characterSize.toString(),

            characterStrength: Number(this.characterStrength),
            characterDexterity: Number(this.characterDexterity),
            characterConstitution: Number(this.characterConstitution),
            characterIntelligence: Number(this.characterIntelligence),
            characterWisdom: Number(this.characterWisdom),
            characterCharisma: Number(this.characterCharisma),
            characterProficiencyBonus: Number(this.characterProficiencyBonus),
            characterPassiveWisdom: Number(this.characterPassiveWisdom),

            //MONSTER SENSES
            monsterBlindsightSense: Number(this.monsterBlindsightSense),
            monsterDarkvisionSense: Number(this.monsterDarkvisionSense),
            monsterTremorsenseSense: Number(this.monsterTremorsenseSense),
            monsterTruesightSense: Number(this.monsterTruesightSense),

            //MOVEMENT SKILLS
            monsterMovementBurrowSpeed: Number(this.monsterMovementBurrowSpeed),
            monsterMovementClimbSpeed: Number(this.monsterMovementClimbSpeed),
            monsterMovementFlySpeed: Number(this.monsterMovementFlySpeed),
            monsterMovementSwimSpeed: Number(this.monsterMovementSwimSpeed),

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
            monsterMovementSkill: this.monsterMovementSkill,

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