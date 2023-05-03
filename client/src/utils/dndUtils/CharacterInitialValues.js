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
    characterLevel: (Math.random() * (20-1) + 1).toFixed(),
    exp: (Math.random() * (400000-1) + 1).toFixed(),
    hasInspiration: false,
    isAlive: true,
    howCharacterDied: '',
    teamId: '',

    //SKILLS
    characterStrength: (Math.random() * (30-1) + 1).toFixed(),
    characterDexterity: (Math.random() * (30-1) + 1).toFixed(),
    characterConstitution: (Math.random() * (30-1) + 1).toFixed(),
    characterIntelligence: (Math.random() * (30-1) + 1).toFixed(),
    characterWisdom: (Math.random() * (30-1) + 1).toFixed(),
    characterCharisma: (Math.random() * (30-1) + 1).toFixed(),
    characterProficiencyBonus: (Math.random() * (30-1) + 1).toFixed(),
    characterPassiveWisdom: (Math.random() * (30-1) + 1).toFixed(),
    characterSpeed: (Math.random() * (500-1) + 1).toFixed(),
    characterHP: (Math.random() * (1000-1) + 1).toFixed(),
    characterInitiative: (Math.random() * (30-1) + 1).toFixed(),

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