const randomizeStatistics = (min, max) => {
    return (Math.random() * (max-min) + min).toFixed();
}

export const CharacterInitialValues = {
    //CHARACTER INFO
    characterType: '',
    characterName: '',
    characterClass: '',
    characterRace: '',
    characterAlignment: '',
    characterBackground: '',
    characterBackstory: '',
    characterAllies: '',
    characterIdeals: '',
    characterPersonalityTraits: '',
    characterBonds: '',
    characterFlaws: '',
    characterWeakness: '',
    characterTreasure: '',
    characterPhoto: '',
    playerName: '',
    characterLevel: 0,
    exp: 0,
    hasInspiration: false,
    isAlive: true,
    howCharacterDied: '',
    teamId: '',

    //SKILLS
    characterStrength: 0,
    characterDexterity: 0,
    characterConstitution: 0,
    characterIntelligence: 0,
    characterWisdom: 0,
    characterCharisma: 0,
    characterProficiencyBonus: 0,
    characterPassiveWisdom: 0,
    characterSpeed: 0,
    characterHP: 0,
    characterInitiative: 0,

    //SAVING THROWS
    savingThrows: [],

    //SKILLS PROFICIENCY
    skillsProficiency: [],
    languageProficiency: [],
    otherProficiency: [],
    senses: [],

    //DAMAGES
    damageResistances: [],
    damageImmunities: [],
    damageVulnerabilities: [],
    conditionImmunities: [],

    //EQUIPMENT
    armorClass: (Math.random() * (30-1) + 1).toFixed(),

    //TALENTS
    featuresAndTraits: [],
}